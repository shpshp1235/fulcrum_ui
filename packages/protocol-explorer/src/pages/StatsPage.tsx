import React, { Component } from "react";
import { Search } from "../components/Search";
import { StatsChart } from "../components/StatsChart";
import { TxGrid } from "../components/TxGrid";
import { Header } from "../layout/Header";
import { RouteComponentProps } from "react-router";
import { Asset } from "../domain/Asset";
import { LiquidationEvent } from "../domain/LiquidationEvent";
import { BigNumber } from "@0x/utils";
import { TradeEvent } from "../domain/TradeEvent";
import { CloseWithSwapEvent } from "../domain/CloseWithSwapEvent";
import { CloseWithDepositEvent } from "../domain/CloseWithDepositEvent";
import { BurnEvent } from "../domain/BurnEvent";
import { MintEvent } from "../domain/MintEvent";
import { BorrowEvent } from "../domain/BorrowEvent";
import { ITxRowProps } from "../components/TxRow";
import configProviders from "../config/providers.json";
import { ExplorerProvider } from "../services/ExplorerProvider";
import { ExplorerProviderEvents } from "../services/events/ExplorerProviderEvents";
import { NavService } from '../services/NavService';
import { Loader } from "../components/Loader";


interface MatchParams {
  token: string;
}

interface IStatsPageProps extends RouteComponentProps<MatchParams> {
  doNetworkConnect: () => void;
  isMobileMedia: boolean;
}

interface IStatsPageState {
  asset: Asset;
  events: ITxRowProps[];
  isDataLoading: boolean;
}

export class StatsPage extends Component<IStatsPageProps, IStatsPageState> {
  private _isMounted: boolean;

  constructor(props: any) {
    super(props);
    this.state = {
      asset: this.props.match.params.token.toUpperCase() as Asset,
      events: [],
      isDataLoading: true
    };

    this._isMounted = false;
    ExplorerProvider.Instance.eventEmitter.on(ExplorerProviderEvents.ProviderAvailable, this.onProviderAvailable);
    ExplorerProvider.Instance.eventEmitter.on(ExplorerProviderEvents.ProviderChanged, this.onProviderChanged);
  }


  getLiquidationHistory = async (): Promise<LiquidationEvent[]> => {
    let result: LiquidationEvent[] = [];
    if (!ExplorerProvider.Instance.contractsSource) return result;
    const bzxContractAddress = ExplorerProvider.Instance.contractsSource.getiBZxAddress()
    const etherscanApiKey = configProviders.Etherscan_Api;
    let etherscanApiUrl = `https://api-kovan.etherscan.io/api?module=logs&action=getLogs&fromBlock=10000000&toBlock=latest&address=${bzxContractAddress}&topic0=${LiquidationEvent.topic0}&apikey=${etherscanApiKey}`
    const tradeEventResponse = await fetch(etherscanApiUrl);
    const tradeEventResponseJson = await tradeEventResponse.json();
    if (tradeEventResponseJson.status !== "1") return result;
    const events = tradeEventResponseJson.result;
    result = events.reverse().map((event: any) => {
      const userAddress = event.topics[1].replace("0x000000000000000000000000", "0x");
      const liquidatorAddress = event.topics[2].replace("0x000000000000000000000000", "0x");
      const loanId = event.topics[3];
      const data = event.data.replace("0x", "");
      const dataSegments = data.match(/.{1,64}/g) //split data into 32 byte segments
      if (!dataSegments) return result;
      const lender = dataSegments[0].replace("000000000000000000000000", "0x");

      const loanTokenAddress = dataSegments[1].replace("000000000000000000000000", "0x");
      const collateralTokenAddress = dataSegments[2].replace("000000000000000000000000", "0x");
      const loanToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(loanTokenAddress);
      const collateralToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(collateralTokenAddress);
      const repayAmount = new BigNumber(parseInt(dataSegments[3], 16));
      const collateralWithdrawAmount = new BigNumber(parseInt(dataSegments[4], 16));
      const collateralToLoanRate = new BigNumber(parseInt(dataSegments[5], 16));
      const currentMargin = new BigNumber(parseInt(dataSegments[6], 16));
      const timeStamp = new Date(parseInt(event.timeStamp, 16) * 1000);
      const txHash = event.transactionHash;
      if (loanToken !== this.state.asset)
        return;
      return new LiquidationEvent(
        userAddress,
        liquidatorAddress,
        loanId,
        lender,
        loanToken,
        collateralToken,
        repayAmount,
        collateralWithdrawAmount,
        collateralToLoanRate,
        currentMargin,
        timeStamp,
        txHash
      )

    })
    return result.filter(e => e)
  }

  public getTradeHistory = async (): Promise<TradeEvent[]> => {
    let result: TradeEvent[] = [];
    if (!ExplorerProvider.Instance.contractsSource) return result;
    const bzxContractAddress = ExplorerProvider.Instance.contractsSource.getiBZxAddress();
    if (!bzxContractAddress) return result
    const etherscanApiKey = configProviders.Etherscan_Api;
    let etherscanApiUrl = `https://api-kovan.etherscan.io/api?module=logs&action=getLogs&fromBlock=10000000&toBlock=latest&address=${bzxContractAddress}&topic0=${TradeEvent.topic0}&apikey=${etherscanApiKey}`
    const tradeEventResponse = await fetch(etherscanApiUrl);
    const tradeEventResponseJson = await tradeEventResponse.json();
    if (tradeEventResponseJson.status !== "1") return result;
    const events = tradeEventResponseJson.result;
    result = events.reverse().map((event: any) => {
      const userAddress = event.topics[1].replace("0x000000000000000000000000", "0x");
      const lender = event.topics[2].replace("0x000000000000000000000000", "0x");
      const loandId = event.topics[3];
      const data = event.data.replace("0x", "");
      const dataSegments = data.match(/.{1,64}/g) //split data into 32 byte segments
      if (!dataSegments) return result;
      const loanTokenAddress = dataSegments[0].replace("000000000000000000000000", "0x");
      const collateralTokenAddress = dataSegments[1].replace("000000000000000000000000", "0x");
      const loanToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(loanTokenAddress);
      const collateralToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(collateralTokenAddress);

      const positionSize = new BigNumber(parseInt(dataSegments[2], 16));
      const borrowedAmount = new BigNumber(parseInt(dataSegments[3], 16));
      const interestRate = new BigNumber(parseInt(dataSegments[4], 16));
      const settlementDate = new Date(parseInt(dataSegments[5], 16) * 1000);
      const entryPrice = new BigNumber(parseInt(dataSegments[6], 16));
      const entryLeverage = new BigNumber(parseInt(dataSegments[7], 16));
      const currentLeverage = new BigNumber(parseInt(dataSegments[8], 16));
      const timeStamp = new Date(parseInt(event.timeStamp, 16) * 1000);
      const txHash = event.transactionHash;
      if (loanToken !== this.state.asset)
        return;
      return new TradeEvent(
        userAddress,
        lender,
        loandId,
        loanToken,
        collateralToken,
        positionSize,
        borrowedAmount,
        interestRate,
        settlementDate,
        entryPrice,
        entryLeverage,
        currentLeverage,
        timeStamp,
        txHash
      )

    })
    return result.filter(e => e)

  }

  public getCloseWithSwapHistory = async (): Promise<CloseWithSwapEvent[]> => {
    let result: CloseWithSwapEvent[] = [];
    if (!ExplorerProvider.Instance.contractsSource) return result;
    const bzxContractAddress = ExplorerProvider.Instance.contractsSource.getiBZxAddress()
    if (!bzxContractAddress) return result
    const etherscanApiKey = configProviders.Etherscan_Api;
    let etherscanApiUrl = `https://api-kovan.etherscan.io/api?module=logs&action=getLogs&fromBlock=10000000&toBlock=latest&address=${bzxContractAddress}&topic0=${CloseWithSwapEvent.topic0}&apikey=${etherscanApiKey}`
    const tradeEventResponse = await fetch(etherscanApiUrl);
    const tradeEventResponseJson = await tradeEventResponse.json();
    if (tradeEventResponseJson.status !== "1") return result;
    const events = tradeEventResponseJson.result;
    result = events.reverse().map((event: any) => {
      const userAddress = event.topics[1].replace("0x000000000000000000000000", "0x");
      const lender = event.topics[2].replace("0x000000000000000000000000", "0x");
      const loandId = event.topics[3];
      const data = event.data.replace("0x", "");
      const dataSegments = data.match(/.{1,64}/g) //split data into 32 byte segments
      if (!dataSegments) return result;
      const collateralTokenAddress = dataSegments[0].replace("000000000000000000000000", "0x");
      const loanTokenAddress = dataSegments[1].replace("000000000000000000000000", "0x");
      const collateralToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(collateralTokenAddress);
      const loanToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(loanTokenAddress);
      const closer = dataSegments[2].replace("000000000000000000000000", "0x");
      const positionCloseSize = new BigNumber(parseInt(dataSegments[3], 16));
      const loanCloseAmount = new BigNumber(parseInt(dataSegments[4], 16));
      const exitPrice = new BigNumber(parseInt(dataSegments[5], 16));
      const currentLeverage = new BigNumber(parseInt(dataSegments[6], 16));
      const timeStamp = new Date(parseInt(event.timeStamp, 16) * 1000);
      const txHash = event.transactionHash;
      if (loanToken !== this.state.asset)
        return;
      return new CloseWithSwapEvent(
        userAddress,
        lender,
        loandId,
        collateralToken,
        loanToken,
        closer,
        positionCloseSize,
        loanCloseAmount,
        exitPrice,
        currentLeverage,
        timeStamp,
        txHash
      )

    })
    return result.filter(e => e)

  }

  public getCloseWithDepositHistory = async (): Promise<CloseWithDepositEvent[]> => {
    let result: CloseWithDepositEvent[] = [];
    if (!ExplorerProvider.Instance.contractsSource) return result;
    const bzxContractAddress = ExplorerProvider.Instance.contractsSource.getiBZxAddress()
    if (!bzxContractAddress) return result
    const etherscanApiKey = configProviders.Etherscan_Api;
    let etherscanApiUrl = `https://api-kovan.etherscan.io/api?module=logs&action=getLogs&fromBlock=10000000&toBlock=latest&address=${bzxContractAddress}&topic0=${CloseWithDepositEvent.topic0}&apikey=${etherscanApiKey}`
    const tradeEventResponse = await fetch(etherscanApiUrl);
    const tradeEventResponseJson = await tradeEventResponse.json();
    if (tradeEventResponseJson.status !== "1") return result;
    const events = tradeEventResponseJson.result;
    result = events.reverse().map((event: any) => {
      const userAddress = event.topics[1].replace("0x000000000000000000000000", "0x");
      const lender = event.topics[2].replace("0x000000000000000000000000", "0x");
      const loandId = event.topics[3];
      const data = event.data.replace("0x", "");
      const dataSegments = data.match(/.{1,64}/g) //split data into 32 byte segments
      if (!dataSegments) return result;
      const closer = dataSegments[0].replace("000000000000000000000000", "0x");
      const loanTokenAddress = dataSegments[1].replace("000000000000000000000000", "0x");
      const collateralTokenAddress = dataSegments[2].replace("000000000000000000000000", "0x");
      const loanToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(loanTokenAddress);
      const collateralToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(collateralTokenAddress);
      const repayAmount = new BigNumber(parseInt(dataSegments[3], 16));
      const collateralWithdrawAmount = new BigNumber(parseInt(dataSegments[4], 16));
      const collateralToLoanRate = new BigNumber(parseInt(dataSegments[5], 16));
      const currentMargin = new BigNumber(parseInt(dataSegments[6], 16));
      const timeStamp = new Date(parseInt(event.timeStamp, 16) * 1000);
      const txHash = event.transactionHash;
      if (loanToken !== this.state.asset)
        return;
      return new CloseWithDepositEvent(
        userAddress,
        lender,
        loandId,
        closer,
        loanToken,
        collateralToken,
        repayAmount,
        collateralWithdrawAmount,
        collateralToLoanRate,
        currentMargin,
        timeStamp,
        txHash
      )
    })
    return result.filter(e => e)
  }

  public getBorrowHistory = async (): Promise<BorrowEvent[]> => {
    let result: BorrowEvent[] = [];
    if (!ExplorerProvider.Instance.contractsSource) return result;
    const bzxContractAddress = ExplorerProvider.Instance.contractsSource.getiBZxAddress()
    if (!bzxContractAddress) return result
    const etherscanApiKey = configProviders.Etherscan_Api;
    let etherscanApiUrl = `https://api-kovan.etherscan.io/api?module=logs&action=getLogs&fromBlock=10000000&toBlock=latest&address=${bzxContractAddress}&topic0=${BorrowEvent.topic0}&apikey=${etherscanApiKey}`
    const tradeEventResponse = await fetch(etherscanApiUrl);
    const tradeEventResponseJson = await tradeEventResponse.json();
    if (tradeEventResponseJson.status !== "1") return result;
    const events = tradeEventResponseJson.result;
    result = events.reverse().map((event: any) => {
      const userAddress = event.topics[1].replace("0x000000000000000000000000", "0x");
      const lender = event.topics[2].replace("0x000000000000000000000000", "0x");
      const loandId = event.topics[3];
      const data = event.data.replace("0x", "");
      const dataSegments = data.match(/.{1,64}/g) //split data into 32 byte segments
      if (!dataSegments) return result;
      const loanTokenAddress = dataSegments[0].replace("000000000000000000000000", "0x");
      const collateralTokenAddress = dataSegments[1].replace("000000000000000000000000", "0x");
      const loanToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(loanTokenAddress);
      const collateralToken = ExplorerProvider.Instance.contractsSource!.getAssetFromAddress(collateralTokenAddress);
      const newPrincipal = new BigNumber(parseInt(dataSegments[2], 16));
      const newCollateral = new BigNumber(parseInt(dataSegments[3], 16));
      const interestRate = new BigNumber(parseInt(dataSegments[4], 16));
      const interestDuration = new BigNumber(parseInt(dataSegments[5], 16));
      const collateralToLoanRate = new BigNumber(parseInt(dataSegments[6], 16));
      const currentMargin = new BigNumber(parseInt(dataSegments[7], 16));
      const timeStamp = new Date(parseInt(event.timeStamp, 16) * 1000);
      const txHash = event.transactionHash;
      if (loanToken !== this.state.asset)
        return;
      return new BorrowEvent(
        userAddress,
        lender,
        loandId,
        loanToken,
        collateralToken,
        newPrincipal,
        newCollateral,
        interestRate,
        interestDuration,
        collateralToLoanRate,
        currentMargin,
        timeStamp,
        txHash
      )
    })
    return result.filter(e => e)
  }

  public getBurnHistory = async (): Promise<BurnEvent[]> => {
    let result: BurnEvent[] = [];
    if (!ExplorerProvider.Instance.contractsSource) return result;
    const tokenContractAddress = ExplorerProvider.Instance.contractsSource.getITokenErc20Address(this.state.asset);
    if (!tokenContractAddress) return result
    const etherscanApiKey = configProviders.Etherscan_Api;
    let etherscanApiUrl = `https://api-kovan.etherscan.io/api?module=logs&action=getLogs&fromBlock=10000000&toBlock=latest&address=${tokenContractAddress}&topic0=${BurnEvent.topic0}&apikey=${etherscanApiKey}`
    const tradeEventResponse = await fetch(etherscanApiUrl);
    const tradeEventResponseJson = await tradeEventResponse.json();
    if (tradeEventResponseJson.status !== "1") return result;
    const events = tradeEventResponseJson.result;
    result = events.reverse().map((event: any) => {
      const burner = event.topics[1].replace("0x000000000000000000000000", "0x");
      const data = event.data.replace("0x", "");
      const dataSegments = data.match(/.{1,64}/g) //split data into 32 byte segments
      if (!dataSegments) return result;
      const tokenAmount = new BigNumber(parseInt(dataSegments[0], 16));
      const assetAmount = new BigNumber(parseInt(dataSegments[1], 16));
      const price = new BigNumber(parseInt(dataSegments[2], 16));
      const timeStamp = new Date(parseInt(event.timeStamp, 16) * 1000);
      const txHash = event.transactionHash;
      return new BurnEvent(
        burner,
        tokenAmount,
        assetAmount,
        price,
        timeStamp,
        txHash
      )
    })
    return result.filter(e => e)
  }

  public getMintHistory = async (): Promise<MintEvent[]> => {
    let result: MintEvent[] = [];
    if (!ExplorerProvider.Instance.contractsSource) return result;
    const tokenContractAddress = ExplorerProvider.Instance.contractsSource.getITokenErc20Address(this.state.asset);
    if (!tokenContractAddress) return result
    const etherscanApiKey = configProviders.Etherscan_Api;
    let etherscanApiUrl = `https://api-kovan.etherscan.io/api?module=logs&action=getLogs&fromBlock=10000000&toBlock=latest&address=${tokenContractAddress}&topic0=${MintEvent.topic0}&apikey=${etherscanApiKey}`
    const tradeEventResponse = await fetch(etherscanApiUrl);
    const tradeEventResponseJson = await tradeEventResponse.json();
    if (tradeEventResponseJson.status !== "1") return result;
    const events = tradeEventResponseJson.result;
    result = events.reverse().map((event: any) => {
      const minter = event.topics[1].replace("0x000000000000000000000000", "0x");
      const data = event.data.replace("0x", "");
      const dataSegments = data.match(/.{1,64}/g) //split data into 32 byte segments
      if (!dataSegments) return result;
      const tokenAmount = new BigNumber(parseInt(dataSegments[0], 16));
      const assetAmount = new BigNumber(parseInt(dataSegments[1], 16));
      const price = new BigNumber(parseInt(dataSegments[2], 16));
      const timeStamp = new Date(parseInt(event.timeStamp, 16) * 1000);
      const txHash = event.transactionHash;
      return new MintEvent(
        minter,
        tokenAmount,
        assetAmount,
        price,
        timeStamp,
        txHash
      )
    })
    return result.filter(e => e)
  }

  public getGridItems = (events: (LiquidationEvent | TradeEvent | CloseWithSwapEvent | BorrowEvent | BurnEvent | MintEvent | CloseWithDepositEvent)[]): ITxRowProps[] => {
    if (events.length === 0) return [];
    if (!ExplorerProvider.Instance.contractsSource) return [];
    let initialNetworkId = ExplorerProvider.Instance.contractsSource.networkId;
    const etherscanUrl = ExplorerProvider.getWeb3ProviderSettings(initialNetworkId).etherscanURL;
    return events.map(e => {
      if (e instanceof TradeEvent) {
        return {
          hash: e.txHash,
          etherscanTxUrl: `${etherscanUrl}tx/${e.txHash}`,
          age: e.timeStamp,
          account: e.user,
          etherscanAddressUrl: `${etherscanUrl}/address/${e.user}`,
          quantity: e.positionSize.div(10 ** 18),
          action: "Open Fulcrum Loan"
        } as ITxRowProps
      } else if (e instanceof CloseWithSwapEvent) {
        return {
          hash: e.txHash,
          etherscanTxUrl: `${etherscanUrl}tx/${e.txHash}`,
          age: e.timeStamp,
          account: e.user,
          etherscanAddressUrl: `${etherscanUrl}/address/${e.user}`,
          quantity: e.loanCloseAmount.div(10 ** 18),
          action: "Close Fulcrum Loan"
        } as ITxRowProps
      } else if (e instanceof LiquidationEvent) {
        return {
          hash: e.txHash,
          etherscanTxUrl: `${etherscanUrl}tx/${e.txHash}`,
          age: e.timeStamp,
          account: e.user,
          etherscanAddressUrl: `${etherscanUrl}/address/${e.user}`,
          quantity: e.repayAmount.div(10 ** 18),
          action: "Liquidate Fulcrum Loan"
        } as ITxRowProps
      } else if (e instanceof CloseWithDepositEvent) {
        return {
          hash: e.txHash,
          etherscanTxUrl: `${etherscanUrl}tx/${e.txHash}`,
          age: e.timeStamp,
          account: e.user,
          etherscanAddressUrl: `${etherscanUrl}/address/${e.user}`,
          quantity: e.repayAmount.div(10 ** 18),
          action: "Close Torque Loan"
        } as ITxRowProps
      } else if (e instanceof BorrowEvent) {
        return {
          hash: e.txHash,
          etherscanTxUrl: `${etherscanUrl}tx/${e.txHash}`,
          age: e.timeStamp,
          account: e.user,
          etherscanAddressUrl: `${etherscanUrl}/address/${e.user}`,
          quantity: e.newPrincipal.div(10 ** 18),
          action: "Open Torque Loan"
        } as ITxRowProps
      } else if (e instanceof BurnEvent) {
        return {
          hash: e.txHash,
          etherscanTxUrl: `${etherscanUrl}tx/${e.txHash}`,
          age: e.timeStamp,
          account: e.burner,
          etherscanAddressUrl: `${etherscanUrl}/address/${e.burner}`,
          quantity: e.assetAmount.div(10 ** 18),
          action: "Burn Token"
        } as ITxRowProps
      } else {
        return {
          hash: e.txHash,
          etherscanTxUrl: `${etherscanUrl}tx/${e.txHash}`,
          age: e.timeStamp,
          account: e.minter,
          etherscanAddressUrl: `${etherscanUrl}/address/${e.minter}`,
          quantity: e.assetAmount.div(10 ** 18),
          action: "Mint iToken"
        }
      }
    });
  }
  private async derivedUpdate() {
    await this._isMounted && this.setState({
      ...this.state,
      isDataLoading: true
    });

    if (ExplorerProvider.Instance.unsupportedNetwork) {
      await this._isMounted && this.setState({
        events: [],
        isDataLoading: false
      });
      return;
    }

    const provider = ExplorerProvider.getLocalstorageItem('providerType');

    if (!provider || provider === "None" || !ExplorerProvider.Instance.contractsSource || !ExplorerProvider.Instance.contractsSource.canWrite) {
      this.props.doNetworkConnect();
      await this._isMounted && this.setState({
        events: [],
        isDataLoading: false
      });
      return;
    }

    const liquidationEvents = this.getGridItems(await this.getLiquidationHistory());
    const tradeEvents = this.getGridItems(await this.getTradeHistory());
    const closeEvents = this.getGridItems(await this.getCloseWithSwapHistory());
    const mintEvents = this.getGridItems(await this.getMintHistory());
    const burnEvents = this.getGridItems(await this.getBurnHistory());
    const events: ITxRowProps[] = liquidationEvents.concat(closeEvents).concat(tradeEvents).concat(mintEvents).concat(burnEvents);

    await this._isMounted && this.setState({
      ...this.state,
      events,
      isDataLoading: false
    })
  }

  private onProviderChanged = () => {
    this.derivedUpdate();
  };

  private onProviderAvailable = () => {
    this.derivedUpdate();
  };


  public componentWillUnmount(): void {
    this._isMounted = false;
    ExplorerProvider.Instance.eventEmitter.removeListener(ExplorerProviderEvents.ProviderAvailable, this.onProviderAvailable);
    ExplorerProvider.Instance.eventEmitter.removeListener(ExplorerProviderEvents.ProviderChanged, this.onProviderChanged);
  }

  public componentDidMount(): void {
    this._isMounted = true;
    this.derivedUpdate();
  }

  onSearch = (filter: string) => {
    if (filter === "") {
      return;
    }
    NavService.Instance.History.push(`/search/${filter}`);
  }

  public render() {
    return (
      <React.Fragment>
        <Header isMobileMedia={this.props.isMobileMedia} doNetworkConnect={this.props.doNetworkConnect} />
        <section>
          <div className="container">
            <StatsChart />
            <div className="flex jc-c labels-container">
              <div className="label-chart"><span className="bg-green"></span>Supply APR, %</div>
              <div className="label-chart"><span className="bg-primary"></span>TVL</div>
              <div className="label-chart"><span className="bg-secondary"></span>Utilization, %</div>
            </div>
          </div>
        </section>

        {!ExplorerProvider.Instance.unsupportedNetwork ?
          <React.Fragment>
            {this.state.isDataLoading
              ? <section className="pt-90 pb-45">
                <div className="container">
                  <Loader quantityDots={5} sizeDots={'large'} title={'Loading'} isOverlay={false} />
                </div>
              </section>
              : <React.Fragment>
                <section className="pt-75">
                  <Search onSearch={this.onSearch} />
                </section>
                <section className="pt-90">
                  <div className="container">
                    <TxGrid events={this.state.events} />
                  </div>
                </section>
              </React.Fragment>}
          </React.Fragment> :
          <section className="pt-75">
            <div style={{ textAlign: `center`, fontSize: `2rem`, paddingBottom: `1.5rem` }}>
              <div style={{ cursor: `pointer` }}>
                You are connected to the wrong network.
                      </div>
            </div>
          </section>
        }

      </React.Fragment>
    );
  }
} 
