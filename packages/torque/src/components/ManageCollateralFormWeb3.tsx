import { BigNumber } from '@0x/utils'
import React, { ChangeEvent, Component, FormEvent } from 'react'
import { merge, Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { Asset } from '../domain/Asset'
import { AssetDetails } from '../domain/AssetDetails'
import { AssetsDictionary } from '../domain/AssetsDictionary'
import { IBorrowedFundsState } from '../domain/IBorrowedFundsState'
import { ICollateralChangeEstimate } from '../domain/ICollateralChangeEstimate'
import { ManageCollateralRequest } from '../domain/ManageCollateralRequest'
import { TorqueProvider } from '../services/TorqueProvider'
import Slider from 'rc-slider'
import { Loader } from './Loader'

export interface IManageCollateralFormWeb3Props {
  loanOrderState: IBorrowedFundsState

  onSubmit: (request: ManageCollateralRequest) => void
  onClose: () => void
}

interface IManageCollateralFormWeb3State {
  assetDetails: AssetDetails | null

  minValue: number
  maxValue: number
  loanValue: number
  selectedValue: number

  currentValue: number
  assetBalanceValue: number

  collateralAmount: BigNumber
  collateralExcess: BigNumber
  liquidationPrice: BigNumber
  gasAmountNeeded: BigNumber
  collateralizedPercent: BigNumber
  balanceTooLow: boolean

  inputAmountText: string

  didSubmit: boolean
  isLoading: boolean
}

export class ManageCollateralFormWeb3 extends Component<
  IManageCollateralFormWeb3Props,
  IManageCollateralFormWeb3State
> {
  private readonly _inputChange: Subject<string>
  private readonly _selectedValueUpdate: Subject<number>
  private _input: HTMLInputElement | null = null

  constructor(props: IManageCollateralFormWeb3Props, context?: any) {
    super(props, context)

    // console.log(props.loanOrderState);

    this.state = {
      minValue: 0,
      maxValue: 0,
      assetDetails: null,
      selectedValue: 0,
      currentValue: 100,
      loanValue: 0,
      assetBalanceValue: 0,
      liquidationPrice: new BigNumber(0),
      gasAmountNeeded: new BigNumber(0),
      collateralAmount: new BigNumber(0),
      collateralExcess: new BigNumber(0),
      collateralizedPercent: new BigNumber(0),
      balanceTooLow: false,
      inputAmountText: '',
      didSubmit: false,
      isLoading: true
    }

    this._inputChange = new Subject()
    this._selectedValueUpdate = new Subject<number>()

    merge(
      this._inputChange.pipe(
        distinctUntilChanged(),
        debounceTime(100),
        switchMap((value) => this.rxFromInputAmount(value))
      ),
      this._selectedValueUpdate.pipe(distinctUntilChanged())
    )
      .pipe(switchMap((value) => this.rxGetEstimate(value)))
      .subscribe((value: ICollateralChangeEstimate) => {
        this.setState({
          ...this.state,
          liquidationPrice: value.liquidationPrice,
          collateralAmount: value.collateralAmount,
          collateralizedPercent: value.collateralizedPercent,
          inputAmountText: this.formatPrecision(value.collateralAmount.toString())
        })
      })
  }

  public componentDidMount(): void {
    TorqueProvider.Instance.getLoanCollateralManagementParams(this.props.loanOrderState).then(
      (collateralState) => {
        this.setState({
          ...this.state,
          minValue: collateralState.minValue,
          maxValue: collateralState.maxValue,
          assetDetails:
            AssetsDictionary.assets.get(this.props.loanOrderState.collateralAsset) || null
        })

        TorqueProvider.Instance.getLoanCollateralManagementGasAmount().then((gasAmountNeeded) => {
          TorqueProvider.Instance.getCollateralExcessAmount(this.props.loanOrderState).then(
            (collateralExcess) => {
              TorqueProvider.Instance.getAssetTokenBalanceOfUser(
                this.props.loanOrderState.collateralAsset
              ).then((assetBalance) => {
                const collateralizedPercent = this.props.loanOrderState.collateralizedPercent
                  .multipliedBy(100)
                  .plus(100)

                // const marginPremium = TorqueProvider.Instance.getMarginPremiumAmount(this.props.loanOrderState.collateralAsset);

                /*const expectedMinCollateral = this.props.loanOrderState.collateralAmount
              //.multipliedBy(150 + marginPremium)
              .multipliedBy(150)
              .dividedBy(collateralizedPercent);*/

                let minCollateral
                let maxCollateral

                minCollateral = this.props.loanOrderState.collateralAmount.minus(collateralExcess)

                /*if (minCollateral.lt(expectedMinCollateral)) {
              collateralExcess = this.props.loanOrderState.collateralAmount > expectedMinCollateral ?
                this.props.loanOrderState.collateralAmount
                  .minus(expectedMinCollateral) :
                  new BigNumber(0);
              minCollateral = expectedMinCollateral;
            }*/

                minCollateral = minCollateral.times(10 ** 18)

                maxCollateral = minCollateral
                  .times(collateralState.maxValue - collateralState.minValue)
                  .dividedBy(10 ** 20)

                const currentCollateral = this.props.loanOrderState.collateralAmount.times(10 ** 18)

                if (maxCollateral.lt(currentCollateral)) {
                  maxCollateral = currentCollateral.times(1.1)
                }

                // new_v = (new_max - new_min) / (old_max - old_min) * (v - old_min) + new_min
                let currentCollateralNormalizedBN = new BigNumber(
                  collateralState.maxValue - collateralState.minValue
                )
                  .dividedBy(maxCollateral.minus(minCollateral))
                  .times(currentCollateral.minus(minCollateral))
                  .plus(collateralState.minValue)

                if (
                  currentCollateralNormalizedBN
                    .dividedBy(collateralState.maxValue - collateralState.minValue)
                    .lte(0.01)
                ) {
                  currentCollateralNormalizedBN = new BigNumber(collateralState.minValue)
                }

                // console.log(currentCollateralNormalizedBN.toString());

                // check balance
                if (this.props.loanOrderState.collateralAsset === Asset.ETH) {
                  assetBalance = assetBalance.gt(TorqueProvider.Instance.gasBufferForTxn)
                    ? assetBalance.minus(TorqueProvider.Instance.gasBufferForTxn)
                    : new BigNumber(0)
                }
                let assetBalanceNormalizedBN = new BigNumber(
                  collateralState.maxValue - collateralState.minValue
                )
                  .dividedBy(maxCollateral.minus(minCollateral))
                  .times(assetBalance.minus(minCollateral))
                  .plus(collateralState.minValue)

                if (
                  assetBalanceNormalizedBN
                    .dividedBy(collateralState.maxValue - collateralState.minValue)
                    .lte(0.01)
                ) {
                  assetBalanceNormalizedBN = new BigNumber(collateralState.minValue)
                }

                this.setState(
                  {
                    ...this.state,
                    assetDetails:
                      AssetsDictionary.assets.get(this.props.loanOrderState.collateralAsset) ||
                      null,
                    loanValue: currentCollateralNormalizedBN.toNumber(),
                    selectedValue: currentCollateralNormalizedBN.toNumber(),
                    gasAmountNeeded: gasAmountNeeded,
                    collateralizedPercent: collateralizedPercent,
                    collateralExcess: collateralExcess,
                    assetBalanceValue: assetBalanceNormalizedBN.toNumber()
                  },
                  () => {
                    this._selectedValueUpdate.next(this.state.selectedValue)
                  }
                )
              })
            }
          )
        })
      }
    )
  }

  public componentDidUpdate(
    prevProps: Readonly<IManageCollateralFormWeb3Props>,
    prevState: Readonly<IManageCollateralFormWeb3State>,
    snapshot?: any
  ): void {
    if (
      prevProps.loanOrderState.loanId !== this.props.loanOrderState.loanId ||
      prevState.loanValue !== this.state.loanValue
    ) {
      TorqueProvider.Instance.getLoanCollateralManagementGasAmount().then((gasAmountNeeded) => {
        this.setState(
          {
            ...this.state,
            gasAmountNeeded: gasAmountNeeded
          },
          () => {
            this._selectedValueUpdate.next(this.state.selectedValue)
          }
        )
      })
    }
  }

  public render() {
    if (this.state.assetDetails === null) {
      return null
    }

    return (
      <form className="manage-collateral-form" onSubmit={this.onSubmitClick}>
        <section className="dialog-content">
          {this.state.loanValue !== this.state.selectedValue ? (
            <React.Fragment>
              <div className="manage-collateral-form__info-liquidated-at-container">
                <div className="manage-collateral-form__info-liquidated-at-msg">
                  This will make your loan collateralized
                </div>
                <div
                  title={this.state.collateralizedPercent.toFixed()}
                  className="manage-collateral-form__info-liquidated-at-price">
                  <span>{this.state.collateralizedPercent.toFixed(2)}</span>%
                </div>
              </div>
              {this.state.balanceTooLow ? (
                <div className="manage-collateral-form__insufficient-balance">
                  Insufficient {this.state.assetDetails.displayName} balance in your wallet!
                </div>
              ) : null}
            </React.Fragment>
          ) : (
            <div className="manage-collateral-form__info-liquidated-at-container">
              <div className="manage-collateral-form__info-liquidated-at-msg">
                Your loan is collateralized
              </div>

              <div className="manage-collateral-form__info-liquidated-at-price">
                <span>{this.state.collateralizedPercent.toFixed(2)}</span>%
              </div>
            </div>
          )}
          <Slider
            step={0.01}
            min={this.state.minValue}
            max={this.state.maxValue}
            value={this.state.selectedValue}
            onChange={this.onChange}
            onAfterChange={this.onAfterChange}
          />

          <div className="manage-collateral-form__tips">
            <div className="manage-collateral-form__tip">Withdraw</div>
            <div className="manage-collateral-form__tip">Top Up</div>
          </div>

          <div className="manage-collateral-form__info-liquidated-at-msg mb-20">
            You will {this.state.loanValue > this.state.selectedValue ? ' withdraw' : ' top up'}
          </div>

          <div className="input-container">
            <div className="input-row">
              <span className="asset-icon">{this.state.assetDetails.reactLogoSvg.render()}</span>
              {this.state.isLoading ? (
                <Loader quantityDots={4} sizeDots={'middle'} title={''} isOverlay={false} />
              ) : (
                <React.Fragment>
                  <input
                    ref={this._setInputRef}
                    className="input-amount"
                    type="number"
                    step="any"
                    placeholder={`Enter amount`}
                    value={this.state.inputAmountText}
                    onChange={this.onTradeAmountChange}
                  />
                </React.Fragment>
              )}
            </div>
          </div>
        </section>
        <section className="dialog-actions">
          <div className="manage-collateral-form__actions-container">
            {this.state.loanValue === this.state.selectedValue ? (
              <button type="button" className="btn btn-size--small" onClick={this.props.onClose}>
                Close
              </button>
            ) : (
              <button
                type="submit"
                className={`btn btn-size--small ${this.state.didSubmit ? `btn-disabled` : ``}`}>
                {this.state.didSubmit
                  ? 'Submitting...'
                  : this.state.loanValue > this.state.selectedValue
                  ? 'Withdraw'
                  : 'Top Up'}
              </button>
            )}
          </div>
        </section>
      </form>
    )
  }

  private _setInputRef = (input: HTMLInputElement) => {
    this._input = input
  }

  private rxGetEstimate = (selectedValue: number): Observable<ICollateralChangeEstimate> => {
    // console.log(this.state.loanValue, selectedValue);

    let collateralAmount = new BigNumber(0)
    if (this.state.loanValue !== selectedValue && this.props.loanOrderState.loanData) {
      if (selectedValue < this.state.loanValue) {
        collateralAmount = new BigNumber(this.state.loanValue)
          .minus(selectedValue)
          .dividedBy(this.state.loanValue)
          .multipliedBy(this.state.collateralExcess)
      } else {
        collateralAmount = new BigNumber(selectedValue)
          .minus(this.state.loanValue)
          .dividedBy(this.state.maxValue - this.state.loanValue)
          .multipliedBy(this.props.loanOrderState.collateralAmount)
      }
      // console.log(collateralAmount.toString(), this.state.maxValue, this.props.loanOrderState.collateralAmount.toString());
    }

    return new Observable<ICollateralChangeEstimate>((observer) => {
      TorqueProvider.Instance.getLoanCollateralChangeEstimate(
        this.props.loanOrderState,
        collateralAmount,
        selectedValue < this.state.loanValue
      ).then((value) => {
        observer.next(value)
        this.changeStateLoading()
      })
    })
  }

  private rxFromInputAmount = (value: string): Observable<number> => {
    return new Observable<number>((observer) => {
      const collateralAmount = new BigNumber(Math.abs(Number(value)))

      let selectedValue =
        Number(value) > 0
          ? collateralAmount
              .dividedBy(this.props.loanOrderState.collateralAmount)
              .multipliedBy(this.state.maxValue - this.state.loanValue)
              .plus(this.state.loanValue)
              .toNumber()
          : this.state.collateralExcess.isEqualTo(0)
          ? this.state.minValue
          : new BigNumber(this.state.loanValue)
              .minus(
                collateralAmount
                  .dividedBy(this.state.collateralExcess)
                  .multipliedBy(this.state.loanValue)
              )
              .toNumber()

      if (selectedValue < this.state.minValue) {
        selectedValue = this.state.minValue
      }

      this.setState({ ...this.state, selectedValue })
      observer.next(selectedValue)
    })
  }

  private onChange = async (value: number) => {
    this.setState({
      ...this.state,
      selectedValue: value
    })
  }

  private onAfterChange = (value: number) => {
    this._selectedValueUpdate.next(this.state.selectedValue)
  }

  public onSubmitClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // console.log(this.state.collateralAmount.toString(), new BigNumber(this.state.loanValue).dividedBy(10**18).toString(), new BigNumber(this.state.selectedValue).dividedBy(10**18).toString());
    if (!this.state.didSubmit && this.state.collateralAmount.gt(0)) {
      this.setState({ ...this.state, didSubmit: true })

      if (this.state.loanValue < this.state.selectedValue) {
        let assetBalance = await TorqueProvider.Instance.getAssetTokenBalanceOfUser(
          this.props.loanOrderState.collateralAsset
        )
        if (this.props.loanOrderState.collateralAsset === Asset.ETH) {
          assetBalance = assetBalance.gt(TorqueProvider.Instance.gasBufferForTxn)
            ? assetBalance.minus(TorqueProvider.Instance.gasBufferForTxn)
            : new BigNumber(0)
        }
        const precision =
          AssetsDictionary.assets.get(this.props.loanOrderState.collateralAsset)!.decimals || 18
        const amountInBaseUnits = new BigNumber(
          this.state.collateralAmount.multipliedBy(10 ** precision).toFixed(0, 1)
        )
        if (assetBalance.lt(amountInBaseUnits)) {
          this.setState({
            ...this.state,
            balanceTooLow: true,
            didSubmit: false
          })

          return
        } else {
          this.setState({
            ...this.state,
            balanceTooLow: false
          })
        }
      } else {
        this.setState({
          ...this.state,
          balanceTooLow: false
        })
      }

      this.props.onSubmit(
        new ManageCollateralRequest(
          this.props.loanOrderState.loanId,
          this.props.loanOrderState.collateralAsset,
          new BigNumber(this.state.collateralAmount),
          this.state.loanValue > this.state.selectedValue
        )
      )
    }
  }

  public onTradeAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputAmountText =
      this.state.collateralExcess.isEqualTo(0) && Number(event.target.value) < 0
        ? '0'
        : event.target.value
        ? event.target.value
        : ''

    this.setState(
      {
        ...this.state,
        inputAmountText
      },
      () => {
        // emitting next event for processing with rx.js
        Number(inputAmountText) !== 0 && this._inputChange.next(inputAmountText)
      }
    )
  }

  public changeStateLoading = () => {
    if (this.state.collateralAmount) {
      this.setState({ ...this.state, isLoading: false })
    }
  }

  public formatPrecision(outputText: string): string {
    const output = Number(outputText)
    let sign = ''
    if (this.state.loanValue > this.state.selectedValue) sign = '-'
    let n = Math.log(Math.abs(output)) / Math.LN10
    let x = 4 - n
    if (x < 0) x = 0
    if (x > 5) x = 5
    let result = new Number(output.toFixed(x)).toString()
    return result != '0' ? sign + result : result
  }
}
