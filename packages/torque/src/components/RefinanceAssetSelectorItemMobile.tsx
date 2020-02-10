import { BigNumber } from "@0x/utils";
import React, { ChangeEvent, Component } from "react";
import { Observable, Subject } from "rxjs";
import bgBtc from "../assets/images/ic_token_btc.svg";
import bgDai from "../assets/images/ic_token_dai.svg";
import bgEth from "../assets/images/ic_token_eth.svg";
import bgKnc from "../assets/images/ic_token_knc.svg";
import bgLink from "../assets/images/ic_token_link.svg";
import bgRep from "../assets/images/ic_token_rep.svg";
import bgSai from "../assets/images/ic_token_sai.svg";
import bgUsdc from "../assets/images/ic_token_usdc.svg";
import bgZrx from "../assets/images/ic_token_zrx.svg";
import maker_img from "../assets/images/maker.svg";
import torque_logo from "../assets/images/torque_logo.svg";
import down_arrow from "../assets/images/vector-down-arrow.svg";
import { Asset } from "../domain/Asset";
import { IRefinanceData } from "../domain/IRefinanceData";
import { TorqueProviderEvents } from "../services/events/TorqueProviderEvents";
import { TorqueProvider } from "../services/TorqueProvider";

export interface IRefinanceAssetSelectorItemMobileProps {
  asset: Asset;
  cdpId: BigNumber;
  urn: string;
  ilk: string;
  accountAddress: string;
  proxyAddress: string;
  isProxy: boolean;
  isInstaProxy: boolean;
}

interface IRefinanceAssetSelectorItemMobileState {
  inputAmountText: number;
  borrowAmount: BigNumber;
  refinanceData: IRefinanceData[];
  isLoading: boolean;
  isTrack: boolean;
  fixedApr: BigNumber;
}

export class RefinanceAssetSelectorItemMobile extends Component<IRefinanceAssetSelectorItemMobileProps, IRefinanceAssetSelectorItemMobileState> {
  private _input: HTMLInputElement | null = null;
  private readonly _inputTextChange: Subject<number>;

  constructor(props: IRefinanceAssetSelectorItemMobileProps) {
    super(props);
    this.state = {
      inputAmountText: 0,
      borrowAmount: new BigNumber(0),
      isLoading: false,
      isTrack: false,
      fixedApr: new BigNumber(0),
      refinanceData:
        [{
          collateralType: "",
          collateralAmount: new BigNumber(0),
          debt: new BigNumber(0),
          cdpId: new BigNumber(0),
          accountAddress: "",
          proxyAddress: "",
          isProxy: false,
          isInstaProxy: false,
          isDisabled: false,
          dust: new BigNumber(0),
          isShowCard: false,
          variableAPR: new BigNumber(0)
        }]
    };
    TorqueProvider.Instance.eventEmitter.on(TorqueProviderEvents.ProviderAvailable, this.onProviderAvailable);
    this._inputTextChange = new Subject<number>();
  }

  private rxConvertToBigNumber = (textValue: string): Observable<BigNumber> => {
    return new Observable<BigNumber>(observer => {
      observer.next(new BigNumber(textValue));
    });
  };

  private onProviderAvailable = () => {
    this.derivedUpdate();
  };

  public componentWillUnmount(): void {
    TorqueProvider.Instance.eventEmitter.removeListener(TorqueProviderEvents.ProviderAvailable, this.onProviderAvailable);
  }

  public componentDidMount(): void {
    this.derivedUpdate();
  }

  public componentDidUpdate(
    prevProps: Readonly<IRefinanceAssetSelectorItemMobileProps>,
    prevState: Readonly<IRefinanceAssetSelectorItemMobileState>,
    snapshot?: any
  ): void {
    if (this.props.asset !== prevProps.asset) {
      this.derivedUpdate();
    }
  }

  private _setInputRef = (input: HTMLInputElement) => {
    this._input = input;
  };

  private derivedUpdate = async () => {

    if (this.props.cdpId.gt(0)) {
      const refinanceData = await TorqueProvider.Instance.getCdpsVat(this.props.cdpId, this.props.urn, this.props.ilk, this.props.accountAddress, this.props.isProxy, this.props.isInstaProxy, this.props.proxyAddress, this.props.asset);
      this.setState({
        ...this.state,
        refinanceData: refinanceData,
        inputAmountText: parseInt(refinanceData[0].debt.toString(), 10),
        borrowAmount: refinanceData[0].debt
      });
      this._inputTextChange.next(this.state.inputAmountText);
      // @ts-ignore
      const interestRate = await TorqueProvider.Instance.getAssetInterestRate(Asset.DAI);
      this.setState({ ...this.state, fixedApr: interestRate });
    }
  };

  public loanAmountChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // handling different types of empty values
    const amountText = event.target.value ? event.target.value : "0";

    this.setState({
      ...this.state,
      inputAmountText: parseInt(amountText, 10),
      borrowAmount: new BigNumber(amountText)
    }, () => {
      // emitting next event for processing with rx.js
      this._inputTextChange.next(this.state.inputAmountText);
    });
  };

  private checkCdpManager = async () => {
    if (this.state.isTrack) {
      window.location.href = "/#/dashboard/w/";
    } else {
      this.setState({ ...this.state, isLoading: true });
      const refinanceData = await TorqueProvider.Instance.migrateMakerLoan(this.state.refinanceData[0], this.state.borrowAmount);
      if (refinanceData !== null) {
        this.setState({ ...this.state, isLoading: false, isTrack: true });
      } else {
        this.setState({ ...this.state, isLoading: false, isTrack: false });
      }
    }
  };

  public render() {
    const assetsDt: any = this.getAssetsData();
    const btnValue = this.state.isLoading ? "Loading..." : "Refinance with " + this.state.fixedApr.dp(1, BigNumber.ROUND_CEIL).toString() + "% APR Fixed";
    const btnActiveValue = this.state.isTrack ? "Track" : "Refinance with " + this.state.fixedApr.dp(1, BigNumber.ROUND_CEIL).toString() + "% APR Fixed";
    const refRateYear = ((parseFloat(this.state.refinanceData[0].variableAPR.dp(0, BigNumber.ROUND_CEIL).toString()) - parseFloat(this.state.fixedApr.dp(1, BigNumber.ROUND_CEIL).toString())) * parseFloat(this.state.refinanceData[0].debt.dp(3, BigNumber.ROUND_FLOOR).toString())) / 100;
    const refRateMonth = refRateYear / 12;
    const btnCls = this.state.refinanceData[0].variableAPR.gt(this.state.fixedApr) ? "mt30" : "";
    if (this.state.refinanceData[0].isShowCard) {
      return (
        <div className={`refinance-asset-selector-item `}>
          <div className="refinance-asset-block">
            <div className="refinance-asset-selector__title">CDP {this.state.refinanceData[0].cdpId.toFixed(0)}

            </div>
            <div className="refinance-asset-selector__row">
              <div className="refinance-asset-selector__marker">
                <img className="logo__maker" src={maker_img}/>
                {/*<img className="right-icon" src={arrow_right} />*/}

              </div>
              <div
                className="refinance-asset-selector__varapy">{this.state.refinanceData[0].variableAPR.dp(0, BigNumber.ROUND_CEIL).toString()}%
              </div>
              <div className="refinance-asset-selector__variabletxt">Variable APR</div>

            </div>
            <div className="refinance-asset-selector__row mt20">
              <div className="refinance-asset-selector__inputBox">
                <div className="refinance__input-container">
                  <input
                    ref={this._setInputRef}
                    className="refinance__input-container__input-amount"
                    type="number"
                    defaultValue={this.state.refinanceData[0].debt.dp(3, BigNumber.ROUND_FLOOR).toString()}
                    placeholder={`Amount`}
                    disabled={this.state.refinanceData[0].isDisabled}
                    onChange={this.loanAmountChange}
                  />
                  <div className="refinance-asset-selector__loantxt">Loan</div>
                  <div className="refinance-details-msg--warning">
                    {this.state.borrowAmount.lte(0) ? "Please enter value greater than 0" : ""}
                    {this.state.borrowAmount.gt(this.state.refinanceData[0].debt) ? "Please enter value less than or equal to " + this.state.refinanceData[0].debt.dp(3, BigNumber.ROUND_FLOOR).toString() : ""}
                  </div>
                </div>

              </div>
              <div className="refinance-asset-selector__imglogo ">
                <img className="refinance-loan-type__img" src={assetsDt.img}/>
                <div className="refinance-asset-selector__loantxt ml7">{this.props.asset}</div>
              </div>
            </div>
            <div className="refinance-asset-selector__row mb2 mt20">
              <div className="down_arrow">
                <img src={down_arrow} alt="torque-logo"/>
              </div>
            </div>
            <div className="refinance-asset-selector__rowimg">
              <div className="refinance-asset-selector__torque">
                <img className="logo__image" src={torque_logo} alt="torque-logo"/>
              </div>
              <div className="refinance-asset-selector__divtxt">
                <div
                  className="refinance-asset-selector__fixedapy">{this.state.fixedApr.dp(1, BigNumber.ROUND_CEIL).toString()}%
                </div>
                <div className="refinance-asset-selector__aprtxt">Fixed APR</div>
              </div>
            </div>

            <div className="refinance-asset-selector__row mb2 mt20">

              <div className="refinance-asset-selector__loan">
                {this.state.refinanceData[0].debt.dp(3, BigNumber.ROUND_FLOOR).toString()}
                <div className="refinance-asset-selector__loantxt mt11">Loan</div>
              </div>

              <div className="refinance-asset-selector__imglogo">
                <img className="refinance-loan-type__img" src={assetsDt.img}/>
                <div className="refinance-asset-selector__loantxt ml7">{this.props.asset}</div>
              </div>

            </div>
            {this.state.refinanceData[0].isDisabled ? (
              <div className="refinance-asset-selector__row">
                <div className="refinance-asset-selector__loanBlank">
                  <div className="refinance-title-text">Collateralization should be 150%+</div>
                </div>
                <div className="refinance-asset-selector__loan">
                  {this.state.refinanceData[0].collateralAmount.dp(3, BigNumber.ROUND_FLOOR).toString()}
                  <div className="refinance-asset-selector__loantxt">Collateral</div>
                </div>

                <div className="refinance-asset-selector__imglogo">
                  <img className="refinance-loan-type__img" src={bgEth}/>
                  <div
                    className="refinance-asset-selector__loantxt ml7">{this.state.refinanceData[0].collateralType}</div>
                </div>

              </div>
            ) : null}
          </div>
          <div className="linehr"/>
          <div className="refinance-asset-block">
            {this.state.fixedApr.gt(0) && this.state.refinanceData[0].variableAPR.gt(this.state.fixedApr) ?
              <div className="refinance-asset-selector__desc">
                <div className="refinance-asset-selector__simple">Refinancing with <b>FIXED</b> rates could save
                  you &nbsp;</div>
                <div className="refinance-asset-selector__rs">${refRateMonth.toFixed(2)}/mo or
                  ${refRateYear.toFixed(2)}/yr
                </div>
              </div>
              : <div className="refinance-asset-selector__desc"/>
            }
            {this.state.refinanceData[0].isDisabled || this.state.borrowAmount.lte(0) || this.state.borrowAmount.gt(this.state.refinanceData[0].debt) || this.state.isLoading ?
              <div className={`refinance-selector-icons__item refinance-selector-icons-disabled__button ${btnCls}`}>
                {btnValue}
              </div>
              :
              <div className={`refinance-selector-icons__item refinance-selector-icons-bar__button ${btnCls}`}
                   onClick={this.checkCdpManager}>
                {btnActiveValue}
              </div>
            }
          </div>

        </div>
      );
    } else {
      return "";
    }
  }

  private getAssetsData = () => {
    switch (this.props.asset) {
      case Asset.DAI:
        return { name: "Compound", img: bgDai };
      case Asset.SAI:
        return { name: "DX/DY", img: bgSai };
      case Asset.USDC:
        return { name: "Compound", img: bgUsdc };
      case Asset.ETH:
        return { name: "DX/DY", img: bgEth };
      case Asset.WBTC:
        return { name: "Compound", img: bgBtc };
      case Asset.LINK:
        return { name: "DX/DY", img: bgLink };
      case Asset.ZRX:
        return { name: "Compound", img: bgZrx };
      case Asset.REP:
        return { name: "Compound", img: bgRep };
      case Asset.KNC:
        return { name: "DX/DY", img: bgKnc };
    }
  };
}
