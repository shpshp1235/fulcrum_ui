import React, { PureComponent, RefObject } from "react";
import { RouteComponentProps } from "react-router";
import { BorrowDlg } from "../components/BorrowDlg";
import { RefinanceAssetCompoundLoan } from "../components/RefinanceAssetCompoundLoan";
import { RefinanceAssetCompoundLoanMobile } from "../components/RefinanceAssetCompoundLoanMobile";
import { RefinanceAssetSelector } from "../components/RefinanceAssetSelector";
import { RefinanceAssetSelectorMobile } from "../components/RefinanceAssetSelectorMobile";
import { walletTypeAbbrToWalletType } from "../domain/WalletType";
import { Footer } from "../layout/Footer";
import { HeaderOps } from "../layout/HeaderOps";

export interface IRefinancePageRouteParams {
  walletTypeAbbr: string;
}

export interface IRefinancePageParams {
  doNetworkConnect?: (destinationAbbr: string) => void;
  isLoading: boolean;
  isMobileMedia: boolean;
}

export class RefinancePage extends PureComponent<IRefinancePageParams & RouteComponentProps<IRefinancePageRouteParams>> {
  private readonly borrowDlgRef: RefObject<BorrowDlg>;

  public constructor(props: any, context?: any) {
    super(props, context);

    this.borrowDlgRef = React.createRef();
  }

  public render() {
    const walletType = walletTypeAbbrToWalletType(this.props.match.params.walletTypeAbbr);
    const isMobileMedia = this.props.isMobileMedia;
    return (
      <React.Fragment>
        <BorrowDlg ref={this.borrowDlgRef}/>
        <div className="refinance-page">
          <HeaderOps isLoading={this.props.isLoading} doNetworkConnect={this.doNetworkConnect}/>
          <div className="refinance-page__main">
            {isMobileMedia ?
              <RefinanceAssetCompoundLoanMobile walletType={walletType}/>
              :
              <RefinanceAssetCompoundLoan walletType={walletType}/>
            }
            {isMobileMedia ?
              < RefinanceAssetSelectorMobile walletType={walletType}/>
              :
              <RefinanceAssetSelector walletType={walletType}/>
            }
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
