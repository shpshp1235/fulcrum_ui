import React, { PureComponent, RefObject } from "react";
import { RouteComponentProps } from "react-router";
import { BorrowDlg } from "../components/BorrowDlg";
import { RefinanceAssetCompoundLoan } from "../components/RefinanceAssetCompoundLoan";
import { RefinanceAssetCompoundLoanMobile } from "../components/RefinanceAssetCompoundLoanMobile";
import { RefinanceAssetSelector } from "../components/RefinanceAssetSelector";
import { RefinanceAssetSelectorMobile } from "../components/RefinanceAssetSelectorMobile";
import { IRefinanceLoan, IRefinanceMakerLoan } from "../domain/IRefinanceData";
import { walletTypeAbbrToWalletType } from "../domain/WalletType";
import { Footer } from "../layout/Footer";
import { HeaderOps } from "../layout/HeaderOps";
import { TorqueProviderEvents } from "../services/events/TorqueProviderEvents";
import { TorqueProvider } from "../services/TorqueProvider";

export interface IRefinancePageRouteParams {
  walletTypeAbbr: string;
}

export interface IRefinancePageParams {
  doNetworkConnect?: (destinationAbbr: string) => void;
  isLoading: boolean;
  isMobileMedia: boolean;
}

interface IRefinancePageState {
  loans: IRefinanceLoan[];
  makerLoans: IRefinanceMakerLoan[];
  isLoading: boolean;
}

export class RefinancePage extends PureComponent<IRefinancePageParams & RouteComponentProps<IRefinancePageRouteParams>, IRefinancePageState> {
  private readonly borrowDlgRef: RefObject<BorrowDlg>;

  public constructor(props: any, context?: any) {
    super(props, context);
    this.state = {
      loans: [],
      makerLoans: [],
      isLoading: true,
    };
    this.borrowDlgRef = React.createRef();

    TorqueProvider.Instance.eventEmitter.on(TorqueProviderEvents.ProviderAvailable, this.onProviderAvailable);
  }

  private onProviderAvailable = () => {
    // noinspection JSIgnoredPromiseFromCall
    this.derivedUpdate();
  };

  private derivedUpdate = async () => {
    this.setState({ isLoading: true });
    const [makerLoans, compoundLoans, soloLoans] = await Promise.all([
      TorqueProvider.Instance.getMakerLoans(),
      TorqueProvider.Instance.getCompoundLoans(),
      TorqueProvider.Instance.getSoloLoans(),
    ]);
    const loans = compoundLoans.concat(soloLoans);
    this.setState({ ...this.state, makerLoans, loans });

    if (loans.length + makerLoans.length > 0) {
      await TorqueProvider.Instance.sleep(1000);
    }

    this.setState({ isLoading: false });
  };

  public render() {
    const walletType = walletTypeAbbrToWalletType(this.props.match.params.walletTypeAbbr);
    const isMobileMedia = this.props.isMobileMedia;

    const isEmpty = (this.state.makerLoans.length + this.state.loans.length) === 0;

    return (
      <React.Fragment>
        <BorrowDlg ref={this.borrowDlgRef}/>
        <div className="refinance-page">
          <HeaderOps isLoading={this.props.isLoading} doNetworkConnect={this.doNetworkConnect}/>
          <div className="refinance-page__main">
            <div className="refinance-asset-selector">
              <div className="refinance-page__main-centeredOverlay"
                   style={!this.state.isLoading ? { display: `none` } : undefined}>
                <span>Loading...</span>
              </div>
              <div className="refinance-page__main-msgCentered" onClick={this.derivedUpdate}
                   style={!isEmpty || this.state.isLoading ? { display: `none` } : undefined}>
                <span>Looks like you don't have any loans available to refinance.</span>
              </div>
              {isMobileMedia ?
                <RefinanceAssetCompoundLoanMobile loans={this.state.loans} walletType={walletType}/>
                :
                <RefinanceAssetCompoundLoan loans={this.state.loans} walletType={walletType}/>
              }
              {isMobileMedia ?
                < RefinanceAssetSelectorMobile loans={this.state.makerLoans} walletType={walletType}/>
                :
                <RefinanceAssetSelector loans={this.state.makerLoans} walletType={walletType}/>
              }
            </div>
          </div>
          <Footer/>
        </div>
      </React.Fragment>
    );
  }

  private doNetworkConnect = () => {
    if (this.props.doNetworkConnect) {
      this.props.doNetworkConnect("r");
    }
  };
}
