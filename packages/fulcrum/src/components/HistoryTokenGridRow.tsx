import { BigNumber } from "@0x/utils";
import React, { Component } from "react";
import { FulcrumProviderEvents } from "../services/events/FulcrumProviderEvents";
import { FulcrumProvider } from "../services/FulcrumProvider";
import { Preloader } from "./Preloader";
import { PositionEventsGroup } from "../domain/PositionEventsGroup";
import { PositionHistoryData } from "../domain/PositionHistoryData";

export interface IHistoryTokenGridRowProps {
  eventsGroup: PositionEventsGroup
}

interface IHistoryTokenGridRowState {
  assetBalance: BigNumber | null;
  isLoading: boolean;
  isShowCollapse: boolean;
  latestEvent: PositionHistoryData | null;
  otherEvents: PositionHistoryData[] | null;
}

export class HistoryTokenGridRow extends Component<IHistoryTokenGridRowProps, IHistoryTokenGridRowState> {

  private etherscanUrl = FulcrumProvider.Instance.web3ProviderSettings.etherscanURL;

  constructor(props: IHistoryTokenGridRowProps, context?: any) {
    super(props, context);


    this._isMounted = false;

    this.state = {
      assetBalance: new BigNumber(0),
      isLoading: true,
      isShowCollapse: false,
      latestEvent: null,
      otherEvents: null,
    };

    FulcrumProvider.Instance.eventEmitter.on(FulcrumProviderEvents.ProviderAvailable, this.onProviderAvailable);
    FulcrumProvider.Instance.eventEmitter.on(FulcrumProviderEvents.ProviderChanged, this.onProviderChanged);
  }

  private _isMounted: boolean;

  private async derivedUpdate() {

    this._isMounted && this.setState({
      ...this.state,
      isLoading: true
    });
    const latestEvent = this.props.eventsGroup.events[this.props.eventsGroup.events.length - 1];
    const payTradingFeeEvent = latestEvent.payTradingFeeEvent;

    if (payTradingFeeEvent) {
      const swapToUsdHistoryRateRequest = await fetch(`https://api.bzx.network/v1/asset-history-price?asset=${payTradingFeeEvent.token.toLowerCase()}&date=${payTradingFeeEvent.timeStamp.getTime()}`);
      const swapToUsdHistoryRateResponse = (await swapToUsdHistoryRateRequest.json()).data;
      const feeAssetUsdRate = swapToUsdHistoryRateResponse.swapToUSDPrice;
      latestEvent.payTradingFeeEvent!.amount = payTradingFeeEvent.amount.times(feeAssetUsdRate);
    }
    await this._isMounted && this.setState({
      ...this.state,
      latestEvent: latestEvent,
      isLoading: false
    });

  }

  private onProviderAvailable = async () => {
    await this.derivedUpdate();
  };

  private onProviderChanged = async () => {
    await this.derivedUpdate();
  };

  public componentWillUnmount(): void {
    this._isMounted = false;

    FulcrumProvider.Instance.eventEmitter.removeListener(FulcrumProviderEvents.ProviderAvailable, this.onProviderAvailable);
    FulcrumProvider.Instance.eventEmitter.removeListener(FulcrumProviderEvents.ProviderChanged, this.onProviderChanged);
  }

  public componentDidMount(): void {
    this._isMounted = true;

    this.derivedUpdate();
  }

  public componentDidUpdate(prevProps: Readonly<IHistoryTokenGridRowProps>): void {
    if (this.props.eventsGroup != prevProps.eventsGroup)
      this.derivedUpdate();
  }

  private getSwappedEvents = async () => {
    const croppedEvent = this.props.eventsGroup.events.slice(0, -1).reverse();

    const swappedEvent = await Promise.all(croppedEvent.map(async (event) => {
      const payTradingFeeEvent = event.payTradingFeeEvent;

      if (payTradingFeeEvent) {
        const swapToUsdHistoryRateRequest = await fetch(`https://api.bzx.network/v1/asset-history-price?asset=${payTradingFeeEvent.token.toLowerCase()}&date=${payTradingFeeEvent.timeStamp.getTime()}`);
        const swapToUsdHistoryRateResponse = (await swapToUsdHistoryRateRequest.json()).data;
        const feeAssetUsdRate = swapToUsdHistoryRateResponse.swapToUSDPrice;
        const payTradingFeeEventAmount = payTradingFeeEvent.amount.times(feeAssetUsdRate);
        event.payTradingFeeEvent!.amount = payTradingFeeEventAmount;
      }
      return event;
    }));

    this.setState({ ...this.state, otherEvents: swappedEvent });

  }

  public renderOtherEvents = () => {

    return this.state.otherEvents && this.state.otherEvents.map((event, i) => {

      return (<div key={i} className="history-token-grid-row history-token-grid-row-inner">
        <div className="history-token-grid-row-inner__col history-token-grid-row-inner__col-token-date">
          <span className="label">Date</span>
          {event.date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        </div>

        <div className="history-token-grid-row-inner__col history-token-grid-row-inner__col-result">
          <span className="label">Result</span>
          <span>{event.action.replace(event.loanId, "")}</span>
        </div>
        <div title={event.positionValue.toFixed(18)} className="history-token-grid-row-inner__col history-token-grid-row-inner__col-position">
          <span className="label">Position</span>
          {event.positionValue.toFixed(4)}
        </div>
        <div className="history-token-grid-row-inner__col history-token-grid-row-inner__col-asset-price">
          <span className="label">Trade Price</span>
          {!this.state.isLoading
            ? <React.Fragment>
              <span className="sign-currency">$</span>{event.tradePrice.toFixed(2)}
            </React.Fragment>
            : <Preloader width="74px" />
          }
        </div>
        <div title={event.value.toFixed(18)} className="history-token-grid-row-inner__col history-token-grid-row-inner__col-position-value">
          <span className="label">Value</span>
          {!this.state.isLoading
            ? <React.Fragment>
              <span className="sign-currency">$</span>{event.value.toFixed(2)}
            </React.Fragment>
            : <Preloader width="74px" />


          }
        </div>

        <div title={event.payTradingFeeEvent && event.earnRewardEvent
          && `${event.payTradingFeeEvent.amount.toFixed(18)} / ${event.earnRewardEvent.amount.toFixed(18)}`} className="history-token-grid-row-inner__col history-token-grid-row__col-fee-reward">
          <span className="label">Fee / Rewards <span className="bzrx">BZRX</span></span>
          {!this.state.isLoading
            ? event.payTradingFeeEvent && event.earnRewardEvent ?
              <React.Fragment>
                <span className="sign-currency">$</span>{event.payTradingFeeEvent.amount.toFixed(4)} / {event.earnRewardEvent.amount.toFixed(2)}
              </React.Fragment>
              : "-"
            : <Preloader width="74px" />
          }
        </div>
        <div title={event.profit instanceof BigNumber ? event.profit.toFixed(18) : "-"} className="history-token-grid-row-inner__col history-token-grid-row-inner__col-profit">
          <span className="label">Profit</span>
          {event.profit instanceof BigNumber ? <React.Fragment><span className="sign-currency">$</span>{event.profit.toFixed(3)}</React.Fragment> : "-"}
        </div>
      </div>)
    })
  }

  public render() {

    const profitSum = this.props.eventsGroup.events.reduce((a: BigNumber, b: PositionHistoryData) => a.plus(b.profit instanceof BigNumber ? b.profit : new BigNumber(0) || 0), new BigNumber(0));

    if (!this.state.latestEvent) return null;

    return (
      <div>
        <div className="history-token-grid-row">
          <div className="history-token-grid-row__col history-token-grid-row__col-token-date">
            <span className="label">Date</span>
            <a title={this.state.latestEvent.txHash} href={`${this.etherscanUrl}tx/${this.state.latestEvent.txHash}`} target="blank">
              {this.state.latestEvent.date.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}
            </a>
          </div>
          <div className="history-token-grid-row__col history-token-grid-row__col-token-asset">
            <span className="label">Pair</span>
            {this.props.eventsGroup.baseToken}-{this.props.eventsGroup.quoteToken}
          </div>
          <div className="history-token-grid-row__col history-token-grid-row__col-type">
            <span className="label">Type</span>
            <div className="position-type-marker">
              {`${this.props.eventsGroup.leverage}x ${this.props.eventsGroup.positionType}`}
            </div>
          </div>
          {/* <div className="history-token-grid-row__col-asset-unit">
            {this.props.eventsGroup.quoteToken}
          </div> */}
          <div title={this.state.latestEvent!.positionValue.toFixed(18)} className="history-token-grid-row__col history-token-grid-row__col-position">
            <span className="label">Position</span>
            {this.state.latestEvent.positionValue.toFixed(4)}
          </div>
          <div className="history-token-grid-row__col history-token-grid-row__col-asset-price">
            <span className="label">Trade Price</span>
            {!this.state.isLoading
              ? <React.Fragment>
                <span className="sign-currency">$</span>{this.state.latestEvent.tradePrice.toFixed(2)}
              </React.Fragment>
              : <Preloader width="74px" />
            }
          </div>
          {/* <div className="history-token-grid-row__col-liquidation-price">
        {!this.state.isLoading
          ? this.state.assetBalance
            ? <React.Fragment>
              <span className="sign-currency">$</span>{new BigNumber(0).toFixed(2)}
            </React.Fragment>
            : '$0.00'
          : <Preloader width="74px" />
        }
      </div> */}
          <div title={this.state.latestEvent.value.toFixed(18)} className="history-token-grid-row__col history-token-grid-row__col-position-value">
            <span className="label">Value</span>
            {!this.state.isLoading
              ? <React.Fragment>
                <span className="sign-currency">$</span>{this.state.latestEvent.value.toFixed(2)}
              </React.Fragment>
              : <Preloader width="74px" />
            }
          </div>
          <div title={this.state.latestEvent.payTradingFeeEvent && this.state.latestEvent.earnRewardEvent
            && `${this.state.latestEvent.payTradingFeeEvent.amount.toFixed(18)} / ${this.state.latestEvent.earnRewardEvent.amount.toFixed(18)}`} className="history-token-grid-row__col history-token-grid-row__col-fee-reward">
            <span className="label">Fee / Rewards <span className="bzrx">BZRX</span></span>
            {!this.state.isLoading
              ? this.state.latestEvent.payTradingFeeEvent && this.state.latestEvent.earnRewardEvent ?
                <React.Fragment>
                  <span className="sign-currency">$</span>{this.state.latestEvent.payTradingFeeEvent.amount.toFixed(4)} / {this.state.latestEvent.earnRewardEvent.amount.toFixed(2)}
                </React.Fragment>
                : "-"
              : <Preloader width="74px" />
            }
          </div>
          <div title={!this.state.isShowCollapse ? profitSum.toFixed(18) : this.state.latestEvent.profit instanceof BigNumber ? this.state.latestEvent.profit.toFixed(18) : "-"} className="history-token-grid-row__col history-token-grid-row__col-profit">
            <span className="label">Profit</span>
            {!this.state.isLoading
              ? this.state.latestEvent.profit instanceof BigNumber
                ? <React.Fragment><span className="sign-currency">$</span>{!this.state.isShowCollapse ? profitSum.toFixed(3) : this.state.latestEvent.profit.toFixed(3)}</React.Fragment>
                : "-"
              : <Preloader width="74px" />
            }
          </div>
          <div className={`history-token-grid-row__col history-token-grid-row__col-result ${this.props.eventsGroup.events.length - 1 ? `toggle-collapse` : ``}  ${this.state.isShowCollapse ? `opened-collapse` : ``}`} onClick={this.toggleCollapse}>
            <span className="label">Last event</span>
            <span>{this.state.latestEvent.action}</span>
          </div>
        </div>
        <div className={`collapse ${this.state.isShowCollapse ? `show` : `hide`}`}>
          {this.renderOtherEvents()}
        </div>
      </div>)
  }

  public toggleCollapse = () => {

    if (!this.state.isShowCollapse) {
      this.getSwappedEvents()
    }

    this.setState({ ...this.state, isShowCollapse: !this.state.isShowCollapse })
  }
}