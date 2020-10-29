import React, { PureComponent } from 'react'
import Modal from 'react-modal'
import { BigNumber } from '@0x/utils'

import { FulcrumProviderEvents } from '../services/events/FulcrumProviderEvents'
import { ProviderChangedEvent } from '../services/events/ProviderChangedEvent'
import { FulcrumProvider } from '../services/FulcrumProvider'

import { TradeTokenGrid } from '../components/TradeTokenGrid'
import { TVChartContainer } from '../components/TVChartContainer'
import { TokenGridTabs } from '../components/TokenGridTabs'
import { ITradeTokenGridRowProps } from '../components/TradeTokenGridRow'
import { IOwnTokenGridRowProps } from '../components/OwnTokenGridRow'
import { IHistoryTokenGridRowProps } from '../components/HistoryTokenGridRow'

import { Asset } from '../domain/Asset'
import { ManageCollateralRequest } from '../domain/ManageCollateralRequest'
import { PositionType } from '../domain/PositionType'
import { TradeRequest } from '../domain/TradeRequest'
import { TradeType } from '../domain/TradeType'
import { IBorrowedFundsState } from '../domain/IBorrowedFundsState'
import { IHistoryEvents } from '../domain/IHistoryEvents'
import { TradeEvent } from '../domain/events/TradeEvent'
import { LiquidationEvent } from '../domain/events/LiquidationEvent'
import { CloseWithSwapEvent } from '../domain/events/CloseWithSwapEvent'
import { WithdrawCollateralEvent } from '../domain/events/WithdrawCollateralEvent'
import { DepositCollateralEvent } from '../domain/events/DepositCollateralEvent'
import { AssetsDictionary } from '../domain/AssetsDictionary'

import '../styles/pages/_trade-page.scss'

const ManageTokenGrid = React.lazy(() =>
  import('../components/ManageTokenGrid').then((module) => ({ default: module.ManageTokenGrid }))
)
const TradeForm = React.lazy(() => import('../components/TradeForm'))
const ManageCollateralForm = React.lazy(() => import('../components/ManageCollateralForm'))

export interface ITradePageProps {
  doNetworkConnect: () => void
  isRiskDisclosureModalOpen: () => void
  isLoading: boolean
  isMobileMedia: boolean
}

export interface IMarketPair {
  baseToken: Asset
  quoteToken: Asset
}

interface ITradePageState {
  selectedMarket: IMarketPair
  showMyTokensOnly: boolean
  isTradeModalOpen: boolean
  isShowHistory: boolean
  tradeType: TradeType
  tradePositionType: PositionType
  tradeLeverage: number
  loanId?: string
  loans: IBorrowedFundsState[] | undefined
  isManageCollateralModalOpen: boolean

  openedPositionsLoaded: boolean
  openedPositionsCount: number
  tokenRowsData: ITradeTokenGridRowProps[]
  ownRowsData: IOwnTokenGridRowProps[]
  ownRowsDataAll: IOwnTokenGridRowProps[]
  historyEvents: IHistoryEvents | undefined
  historyRowsData: IHistoryTokenGridRowProps[]
  tradeRequestId: number
  isLoadingTransaction: boolean
  request: TradeRequest | ManageCollateralRequest | undefined
  resultTx: boolean
  isTxCompleted: boolean
  activePositionType: PositionType
}

export default class TradePage extends PureComponent<ITradePageProps, ITradePageState> {
  private _isMounted: boolean = false
  private apiUrl = 'https://api.bzx.network/v1'
  constructor(props: any) {
    super(props)
    if (process.env.REACT_APP_ETH_NETWORK === 'kovan') {
      this.baseTokens = [Asset.fWETH, Asset.WBTC]
      this.quoteTokens = [Asset.USDC]
    } else if (process.env.REACT_APP_ETH_NETWORK === 'ropsten') {
      // this.baseTokens = [
      // ];
    } else {
      this.baseTokens = [
        Asset.ETH,
        Asset.WBTC,
        Asset.LINK,
        Asset.MKR,
        //Asset.LEND,
        Asset.KNC
      ]
      this.quoteTokens = [Asset.DAI, Asset.USDC, Asset.USDT]
    }
    this.stablecoins = [Asset.DAI, Asset.USDC, Asset.USDT, Asset.SUSD]

    this.state = {
      selectedMarket: {
        baseToken: this.baseTokens[0],
        quoteToken: this.quoteTokens[0]
      },
      loans: undefined,
      showMyTokensOnly: false,
      isShowHistory: false,
      isTradeModalOpen: false,
      tradeType: TradeType.BUY,
      // defaultquoteToken: process.env.REACT_APP_ETH_NETWORK === "kovan" ? Asset.SAI : Asset.DAI,
      tradePositionType: PositionType.SHORT,
      tradeLeverage: 0,
      isManageCollateralModalOpen: false,
      openedPositionsLoaded: false,
      openedPositionsCount: 0,
      tokenRowsData: [],
      ownRowsData: [],
      ownRowsDataAll: [],
      historyEvents: undefined,
      historyRowsData: [],
      tradeRequestId: 0,
      isLoadingTransaction: false,
      resultTx: true,
      isTxCompleted: false,
      request: undefined,
      activePositionType: PositionType.LONG
    }

    FulcrumProvider.Instance.eventEmitter.on(
      FulcrumProviderEvents.ProviderAvailable,
      this.onProviderAvailable
    )
    FulcrumProvider.Instance.eventEmitter.on(
      FulcrumProviderEvents.ProviderChanged,
      this.onProviderChanged
    )
  }
  private readonly defaultLeverageLong: number = 2
  private readonly defaultLeverageShort: number = 1
  private readonly baseTokens: Asset[] = []
  private readonly quoteTokens: Asset[] = []
  private readonly stablecoins: Asset[] = []

  public componentWillUnmount(): void {
    this._isMounted = false
    FulcrumProvider.Instance.eventEmitter.removeListener(
      FulcrumProviderEvents.ProviderAvailable,
      this.onProviderAvailable
    )
    FulcrumProvider.Instance.eventEmitter.removeListener(
      FulcrumProviderEvents.ProviderChanged,
      this.onProviderChanged
    )
  }

  public async componentDidMount() {
    this._isMounted = true
    const provider = FulcrumProvider.getLocalstorageItem('providerType')
    if (!FulcrumProvider.Instance.web3Wrapper && (!provider || provider === 'None')) {
      this.props.doNetworkConnect()
    }

    await this.getTokenRowsData(this.state)
    await this.getOwnRowsData(this.state)
  }

  public async componentDidUpdate(
    prevProps: Readonly<ITradePageProps>,
    prevState: Readonly<ITradePageState>,
    snapshot?: any
  ) {
    if (prevState.selectedMarket !== this.state.selectedMarket) {
      await this.getTokenRowsData(this.state)
      await this.getOwnRowsData(this.state)
    }
    if (
      prevState.isTxCompleted !== this.state.isTxCompleted ||
      prevProps.isMobileMedia !== this.props.isMobileMedia
    ) {
      if (this.state.showMyTokensOnly === true) {
        await this.getOwnRowsDataAll(this.state)
      } else {
        await this.getTokenRowsData(this.state)
        await this.getOwnRowsData(this.state)
      }
    }
    if (
      prevState.showMyTokensOnly !== this.state.showMyTokensOnly &&
      this.state.showMyTokensOnly === true
    ) {
      await this.getOwnRowsDataAll(this.state)
    }
  }

  private async derivedUpdate() {
    await this.getTokenRowsData(this.state)
    await this.getOwnRowsData(this.state)
    await this.getHistoryEvents(this.state)
  }

  public render() {
    const tvBaseToken = this.checkWethOrFwethToken(this.state.selectedMarket.baseToken)
    const tvQuoteToken = this.checkWethOrFwethToken(this.state.selectedMarket.quoteToken)
    return (
      <div className="trade-page">
        <main>
          {/* <InfoBlock localstorageItemProp="trade-page-info">
            Currently only our lending, unlending, and closing of position functions are enabled. <br />
              Full functionality will return after a thorough audit of our newly implemented and preexisting smart contracts.
          </InfoBlock> */}
          <TokenGridTabs
            baseTokens={this.baseTokens}
            quoteTokens={this.quoteTokens}
            selectedMarket={this.state.selectedMarket}
            onShowMyTokensOnlyChange={this.onShowMyTokensOnlyChange}
            onShowHistory={this.onShowHistory}
            onMarketSelect={this.onTabSelect}
            isMobile={this.props.isMobileMedia}
            isShowMyTokensOnly={this.state.showMyTokensOnly}
            isShowHistory={this.state.isShowHistory}
            openedPositionsCount={this.state.openedPositionsCount}
          />

          <div className={`chart-wrapper${this.state.showMyTokensOnly ? ' hidden' : ''}`}>
            <TVChartContainer
              symbol={`${tvBaseToken}_${tvQuoteToken}`}
              preset={this.props.isMobileMedia ? 'mobile' : undefined}
            />
          </div>

          {this.state.showMyTokensOnly ? (
            <ManageTokenGrid
              isMobileMedia={this.props.isMobileMedia}
              ownRowsData={this.state.ownRowsDataAll}
              historyEvents={this.state.historyEvents}
              historyRowsData={this.state.historyRowsData}
              isShowHistory={this.state.isShowHistory}
              stablecoins={this.stablecoins}
              baseTokens={this.baseTokens}
              quoteTokens={this.quoteTokens}
              openedPositionsLoaded={this.state.openedPositionsLoaded}
              updateHistoryRowsData={this.updateHistoryRowsData}
            />
          ) : (
            <React.Fragment>
              <TradeTokenGrid
                isMobileMedia={this.props.isMobileMedia}
                tokenRowsData={this.state.tokenRowsData.filter(
                  (e) =>
                    e.baseToken === this.state.selectedMarket.baseToken &&
                    e.quoteToken === this.state.selectedMarket.quoteToken
                )}
                ownRowsData={this.state.ownRowsData.filter(
                  (e) =>
                    (this.checkWethOrFwethToken(e.baseToken) ===
                      this.checkWethOrFwethToken(this.state.selectedMarket.baseToken) ||
                      e.baseToken === this.state.selectedMarket.baseToken) &&
                    (this.checkWethOrFwethToken(e.quoteToken) ===
                      this.checkWethOrFwethToken(this.state.selectedMarket.quoteToken) ||
                      e.quoteToken === this.state.selectedMarket.quoteToken)
                )}
                changeLoadingTransaction={this.changeLoadingTransaction}
                request={this.state.request}
                isLoadingTransaction={this.state.isLoadingTransaction}
                resultTx={this.state.resultTx}
                isTxCompleted={this.state.isTxCompleted}
                changeGridPositionType={this.changeGridPositionType}
                activePositionType={this.state.activePositionType}
              />
            </React.Fragment>
          )}
          <Modal
            isOpen={this.state.isTradeModalOpen}
            onRequestClose={this.onTradeRequestClose}
            className="modal-content-div modal-content-div-form"
            overlayClassName="modal-overlay-div">
            <TradeForm
              stablecoins={this.quoteTokens}
              loan={this.state.loans?.find((e) => e.loanId === this.state.loanId)}
              isMobileMedia={this.props.isMobileMedia}
              tradeType={this.state.tradeType}
              baseToken={this.state.selectedMarket.baseToken}
              positionType={this.state.tradePositionType}
              leverage={this.state.tradeLeverage}
              quoteToken={this.state.selectedMarket.quoteToken}
              onSubmit={this.onTradeConfirmed}
              onCancel={this.onTradeRequestClose}
            />
          </Modal>
          <Modal
            isOpen={this.state.isManageCollateralModalOpen}
            onRequestClose={this.onManageCollateralRequestClose}
            className="modal-content-div"
            overlayClassName="modal-overlay-div">
            <ManageCollateralForm
              loan={this.state.loans?.find((e) => e.loanId === this.state.loanId)}
              request={this.state.request as ManageCollateralRequest}
              onSubmit={this.onManageCollateralConfirmed}
              onCancel={this.onManageCollateralRequestClose}
              isOpenModal={this.state.isManageCollateralModalOpen}
              isMobileMedia={this.props.isMobileMedia}
              changeLoadingTransaction={this.changeLoadingTransaction}
            />
          </Modal>
        </main>
      </div>
    )
  }

  public checkWethOrFwethToken = (token: Asset) => {
    return token === Asset.WETH || token === Asset.fWETH ? Asset.ETH : token
  }

  public onTabSelect = async (baseToken: Asset, quoteToken: Asset) => {
    const marketPair = {
      baseToken,
      quoteToken
    }
    ;(await this._isMounted) &&
      this.setState({ ...this.state, selectedMarket: marketPair, showMyTokensOnly: false })
  }

  private onProviderAvailable = async () => {
    // await this.derivedUpdate()
  }

  private onProviderChanged = async (event: ProviderChangedEvent) => {
    !this.state.isShowHistory
      ? await this.getOwnRowsData(this.state)
      : await this.getHistoryEvents(this.state)
  }

  public onManageCollateralRequested = async (request: ManageCollateralRequest) => {
    if (
      !FulcrumProvider.Instance.contractsSource ||
      !FulcrumProvider.Instance.contractsSource.canWrite
    ) {
      this.props.doNetworkConnect()
      return
    }

    if (request) {
      if (this.state.showMyTokensOnly)
        await this.onTabSelect(request.asset, request.collateralAsset)
      ;(await this._isMounted) &&
        this.setState({
          ...this.state,
          isManageCollateralModalOpen: true,
          loanId: request.loanId
        })
    }
  }

  public onManageCollateralConfirmed = async (request: ManageCollateralRequest) => {
    await FulcrumProvider.Instance.onManageCollateralConfirmed(request)
    this.onManageCollateralRequestClose()
  }

  public onManageCollateralRequestClose = () => {
    this._isMounted &&
      this.setState({
        ...this.state,
        isManageCollateralModalOpen: false
      })
  }

  public onTradeRequested = async (request: TradeRequest) => {
    if (
      !FulcrumProvider.Instance.contractsSource ||
      !FulcrumProvider.Instance.contractsSource.canWrite
    ) {
      this.props.doNetworkConnect()
      return
    }

    if (request) {
      // if (this.state.showMyTokensOnly) await this.onTabSelect(request.asset, request.quoteToken)
      ;(await this._isMounted) &&
        this.setState({
          ...this.state,
          isTradeModalOpen: true,
          tradeType: request.tradeType,
          tradePositionType: request.positionType,
          tradeLeverage: request.leverage,
          loanId: request.loanId,
          tradeRequestId: request.id
        })
    }
  }

  public onTradeConfirmed = (request: TradeRequest) => {
    request.id = this.state.tradeRequestId
    FulcrumProvider.Instance.onTradeConfirmed(request)
    this._isMounted &&
      this.setState({
        ...this.state,
        isTradeModalOpen: false
      })
  }

  public onTradeRequestClose = () => {
    this._isMounted &&
      this.setState({
        ...this.state,
        isTradeModalOpen: false
      })
  }

  public onShowMyTokensOnlyChange = async (value: boolean) => {
    ;(await this._isMounted) &&
      this.setState({
        ...this.state,
        showMyTokensOnly: value
      })
  }

  public onShowHistory = async (value: boolean) => {
    await this.getHistoryEvents(this.state)
    ;(await this._isMounted) &&
      this.setState({
        ...this.state,
        isShowHistory: value
      })
  }

  private getOwnRowDataProps = async (
    loan: IBorrowedFundsState,
    collateralToPrincipalRate?: BigNumber
  ): Promise<IOwnTokenGridRowProps> => {
    const maintenanceMargin = loan.loanData.maintenanceMargin
    const currentCollateralToPrincipalRate = collateralToPrincipalRate
      ? collateralToPrincipalRate
      : await FulcrumProvider.Instance.getSwapRate(loan.collateralAsset, loan.loanAsset)

    const isLoanTokenOnlyInQuoteTokens =
      !this.baseTokens.includes(loan.loanAsset) && this.quoteTokens.includes(loan.loanAsset)
    const isCollateralTokenNotInQuoteTokens =
      this.baseTokens.includes(loan.collateralAsset) &&
      !this.quoteTokens.includes(loan.collateralAsset)
    const positionType =
      isCollateralTokenNotInQuoteTokens || isLoanTokenOnlyInQuoteTokens
        ? PositionType.LONG
        : PositionType.SHORT

    const baseAsset = positionType === PositionType.LONG ? loan.collateralAsset : loan.loanAsset

    const quoteAsset = positionType === PositionType.LONG ? loan.loanAsset : loan.collateralAsset

    let leverage = new BigNumber(10 ** 38).div(loan.loanData.startMargin.times(10 ** 18))
    if (positionType === PositionType.LONG) leverage = leverage.plus(1)

    let positionValue = new BigNumber(0)
    let value = new BigNumber(0)
    let collateral = new BigNumber(0)
    let openPrice = new BigNumber(0)
    let liquidationPrice = new BigNumber(0)
    let profit = new BigNumber(0)

    const loanAssetDecimals = AssetsDictionary.assets.get(loan.loanAsset)!.decimals || 18
    const collateralAssetDecimals =
      AssetsDictionary.assets.get(loan.collateralAsset)!.decimals || 18
    const loanAssetPrecision = new BigNumber(10 ** (18 - loanAssetDecimals))
    const collateralAssetPrecision = new BigNumber(10 ** (18 - collateralAssetDecimals))
    const collateralAssetAmount = loan.loanData.collateral
      .div(10 ** 18)
      .times(collateralAssetPrecision)
    const loanAssetAmount = loan.loanData.principal.div(10 ** 18).times(loanAssetPrecision)
    //liquidation_collateralToLoanRate = ((maintenance_margin * principal / 10^20) + principal) / collateral * 10^18
    //If SHORT -> 10^36 / liquidation_collateralToLoanRate
    const liquidation_collateralToLoanRate = maintenanceMargin
      .times(loan.loanData.principal.times(loanAssetPrecision))
      .div(10 ** 20)
      .plus(loan.loanData.principal.times(loanAssetPrecision))
      .div(loan.loanData.collateral.times(collateralAssetPrecision))
      .times(10 ** 18)

    if (positionType === PositionType.LONG) {
      positionValue = collateralAssetAmount
      value = collateralAssetAmount.times(currentCollateralToPrincipalRate)
      collateral = collateralAssetAmount.times(currentCollateralToPrincipalRate)
      // .minus(loanAssetAmount)

      const deposited = collateralAssetAmount
        .times(currentCollateralToPrincipalRate)
        .minus(loanAssetAmount)
      openPrice = loan.loanData.startRate
        .div(10 ** 18)
        .times(loanAssetPrecision)
        .div(collateralAssetPrecision)
      liquidationPrice = liquidation_collateralToLoanRate.div(10 ** 18)

      const tradeRequest = new TradeRequest(
        loan.loanId,
        TradeType.SELL,
        loan.loanAsset,
        loan.collateralAsset,
        Asset.UNKNOWN,
        positionType,
        leverage.toNumber(),
        await FulcrumProvider.Instance.getMaxTradeValue(
          TradeType.SELL,
          loan.loanAsset,
          loan.collateralAsset,
          Asset.UNKNOWN,
          positionType,
          loan
        ),
        positionType === PositionType.LONG
      )
      const estimatedCollateralReceived = await FulcrumProvider.Instance.getLoanCloseAmount(
        tradeRequest
      )
      const depositAmount = loan.loanData.depositValue.div(10 ** loanAssetDecimals)
      const withdrawAmount = loan.loanData.withdrawalValue.div(10 ** loanAssetDecimals)
      profit =
        estimatedCollateralReceived[1]
              .div(10 ** collateralAssetDecimals)
              .times(currentCollateralToPrincipalRate)
              .minus(depositAmount)
              .plus(withdrawAmount)
          
    } else {
      collateral = collateralAssetAmount

      const shortsDiff = collateralAssetAmount
        .times(currentCollateralToPrincipalRate)
        .minus(loanAssetAmount)
      const deposited = collateralAssetAmount.minus(
        loanAssetAmount.div(currentCollateralToPrincipalRate)
      )

      positionValue = collateralAssetAmount
        .times(currentCollateralToPrincipalRate)
        .minus(shortsDiff)

      value = positionValue.div(currentCollateralToPrincipalRate)
      openPrice = new BigNumber(10 ** 36)
        .div(loan.loanData.startRate.times(loanAssetPrecision).div(collateralAssetPrecision))
        .div(10 ** 18)
      liquidationPrice = new BigNumber(10 ** 36).div(liquidation_collateralToLoanRate).div(10 ** 18)

      const tradeRequest = new TradeRequest(
        loan.loanId,
        TradeType.SELL,
        loan.loanAsset,
        loan.collateralAsset,
        Asset.UNKNOWN,
        positionType,
        leverage.toNumber(),
        await FulcrumProvider.Instance.getMaxTradeValue(
          TradeType.SELL,
          loan.loanAsset,
          loan.collateralAsset,
          Asset.UNKNOWN,
          positionType,
          loan
        ),
        true
      )
      const estimatedCollateralReceived = await FulcrumProvider.Instance.getLoanCloseAmount(
        tradeRequest
      )
      const depositAmount = loan.loanData.depositValue
        .div(10 ** loanAssetDecimals)
        .div(currentCollateralToPrincipalRate)
      const withdrawAmount = loan.loanData.withdrawalValue
        .div(10 ** loanAssetDecimals)
        .div(currentCollateralToPrincipalRate)

      profit =estimatedCollateralReceived[1]
              .div(10 ** collateralAssetDecimals)
              .minus(depositAmount)
              .plus(withdrawAmount)
    }

    return {
      loan: loan,
      baseToken: baseAsset,
      quoteToken: quoteAsset,
      leverage: leverage.toNumber(),
      positionType,
      positionValue,
      value,
      collateral,
      openPrice,
      liquidationPrice,
      profit,
      onTrade: this.onTradeRequested,
      onManageCollateralOpen: this.onManageCollateralRequested,
      changeLoadingTransaction: this.changeLoadingTransaction,
      isTxCompleted: this.state.isTxCompleted
    } as IOwnTokenGridRowProps
  }

  public getOwnRowsDataAll = async (state: ITradePageState) => {
    const ownRowsDataAll: IOwnTokenGridRowProps[] = []
    this._isMounted && this.setState({ ...this.state, openedPositionsLoaded: false })
    let loans: IBorrowedFundsState[] | undefined
    if (
      FulcrumProvider.Instance.web3Wrapper &&
      FulcrumProvider.Instance.contractsSource &&
      FulcrumProvider.Instance.contractsSource.canWrite
    ) {
      loans = await FulcrumProvider.Instance.getUserMarginTradeLoans()

      for (const loan of loans) {
        if (!loan.loanData) continue

        const ownRowDataProps = await this.getOwnRowDataProps(loan)

        ownRowsDataAll.push(ownRowDataProps)
      }
    }

    this._isMounted &&
      this.setState({
        ...this.state,
        openedPositionsLoaded: true,
        ownRowsDataAll,
        openedPositionsCount: loans?.length || 0,
        loans
      })
  }

  public getOwnRowsData = async (state: ITradePageState) => {
    const ownRowsData: IOwnTokenGridRowProps[] = []
    let loans: IBorrowedFundsState[] | undefined
    if (
      !FulcrumProvider.Instance.web3Wrapper ||
      !FulcrumProvider.Instance.contractsSource ||
      !FulcrumProvider.Instance.contractsSource.canWrite
    ) {
      return null
    }

    const loansByPair = await FulcrumProvider.Instance.getUserMarginTradeLoansByPair(
      this.state.selectedMarket.baseToken,
      this.state.selectedMarket.quoteToken
    )

    loans = loansByPair.loans

    const selectMarketBaseToQuoteTokenRate = await FulcrumProvider.Instance.getSwapRate(
      this.state.selectedMarket.baseToken,
      this.state.selectedMarket.quoteToken
    )

    for (const loan of loans) {
      if (!loan.loanData) continue
      const currentCollateralToPrincipalRate =
        this.state.selectedMarket.baseToken === loan.collateralAsset
          ? selectMarketBaseToQuoteTokenRate
          : new BigNumber(1).div(selectMarketBaseToQuoteTokenRate)
      const ownRowDataProps = await this.getOwnRowDataProps(loan, currentCollateralToPrincipalRate)
      ownRowsData.push(ownRowDataProps)
    }

    ;(await this._isMounted) &&
      this.setState({
        ...this.state,
        openedPositionsCount: loansByPair.allUsersLoansCount,
        ownRowsData,
        loans
      })
  }

  public getHistoryEvents = async (state: ITradePageState) => {
    const tradeEvents = await FulcrumProvider.Instance.getTradeHistory()
    const closeWithSwapEvents = await FulcrumProvider.Instance.getCloseWithSwapHistory()
    const liquidationEvents = await FulcrumProvider.Instance.getLiquidationHistory()
    const depositCollateralEvents = await FulcrumProvider.Instance.getDepositCollateralHistory()
    const withdrawCollateralEvents = await FulcrumProvider.Instance.getWithdrawCollateralHistory()
    const earnRewardEvents = await FulcrumProvider.Instance.getEarnRewardHistory()
    const payTradingFeeEvents = await FulcrumProvider.Instance.getPayTradingFeeHistory()
    // const tokens = Array.from(new Set(this.baseTokens.concat(this.quoteTokens)));

    // tokens.forEach(async (token) => {
    //   let rate = await FulcrumProvider.Instance.getSwapToUsdRate(token);
    //   tokenRates.push({ token, rate });
    // });

    const groupBy = function(
      xs: (
        | TradeEvent
        | LiquidationEvent
        | CloseWithSwapEvent
        | DepositCollateralEvent
        | WithdrawCollateralEvent
      )[],
      key: any
    ) {
      return xs.reduce(function(rv: any, x: any) {
        ;(rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
      }, {})
    }

    //TODO: remove ts-ignore
    //@ts-ignore
    const events = tradeEvents
      //@ts-ignore
      .concat(closeWithSwapEvents)
      //@ts-ignore
      .concat(liquidationEvents)
      //@ts-ignore
      .concat(depositCollateralEvents)
      //@ts-ignore
      .concat(withdrawCollateralEvents)
    //@ts-ignore
    const groupedEvents = groupBy(
      events.sort((a: any, b: any) => b.timeStamp.getTime() - a.timeStamp.getTime()),
      'loanId'
    )
    const historyEvents = { groupedEvents, earnRewardEvents, payTradingFeeEvents }
    ;(await this._isMounted) && this.setState({ ...this.state, historyEvents })
  }

  public getTokenRowsData = async (state: ITradePageState) => {
    const tokenRowsData: ITradeTokenGridRowProps[] = []

    const yieldAPYRequest = await fetch(`${this.apiUrl}/yield-farimng-apy`)
    const yieldAPYJson = await yieldAPYRequest.json()
    const yieldApr =
      yieldAPYJson.success && yieldAPYJson.data[state.selectedMarket.baseToken.toLowerCase()]
        ? new BigNumber(yieldAPYJson.data[state.selectedMarket.baseToken.toLowerCase()])
        : new BigNumber(0)

    tokenRowsData.push({
      baseToken: state.selectedMarket.baseToken,
      quoteToken: state.selectedMarket.quoteToken,
      positionType: PositionType.LONG,
      defaultLeverage: this.defaultLeverageLong,
      onTrade: this.onTradeRequested,
      changeLoadingTransaction: this.changeLoadingTransaction,
      isTxCompleted: this.state.isTxCompleted,
      changeGridPositionType: this.changeGridPositionType,
      isMobileMedia: this.props.isMobileMedia,
      yieldApr,
      maintenanceMargin: await FulcrumProvider.Instance.getMaintenanceMargin(
        state.selectedMarket.baseToken,
        state.selectedMarket.quoteToken
      )
    })
    tokenRowsData.push({
      baseToken: state.selectedMarket.baseToken,
      quoteToken: state.selectedMarket.quoteToken,
      positionType: PositionType.SHORT,
      defaultLeverage: this.defaultLeverageShort,
      onTrade: this.onTradeRequested,
      changeLoadingTransaction: this.changeLoadingTransaction,
      isTxCompleted: this.state.isTxCompleted,
      changeGridPositionType: this.changeGridPositionType,
      isMobileMedia: this.props.isMobileMedia,
      yieldApr,
      maintenanceMargin: await FulcrumProvider.Instance.getMaintenanceMargin(
        state.selectedMarket.quoteToken,
        state.selectedMarket.baseToken
      )
    })
    ;(await this._isMounted) && this.setState({ ...this.state, tokenRowsData })
  }

  public updateHistoryRowsData = async (historyRowsData: IHistoryTokenGridRowProps[]) => {
    ;(await this._isMounted) && this.setState({ ...this.state, historyRowsData })
  }

  public changeLoadingTransaction = (
    isLoadingTransaction: boolean,
    request: TradeRequest | ManageCollateralRequest | undefined,
    isTxCompleted: boolean,
    resultTx: boolean
  ) => {
    this._isMounted &&
      this.setState({
        ...this.state,
        isLoadingTransaction: isLoadingTransaction,
        request: request,
        isTxCompleted: isTxCompleted,
        resultTx: resultTx
      })
  }

  private changeGridPositionType = async (positionType: PositionType) => {
    ;(await this._isMounted) && this.setState({ ...this.state, activePositionType: positionType })
  }
}
