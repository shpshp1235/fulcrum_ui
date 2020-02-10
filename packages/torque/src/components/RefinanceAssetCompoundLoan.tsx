import React, { Component } from "react";
import { Asset } from "../domain/Asset";
import { IRefinanceLoan } from "../domain/IRefinanceData";
import { WalletType } from "../domain/WalletType";
import { TorqueProviderEvents } from "../services/events/TorqueProviderEvents";
import { TorqueProvider } from "../services/TorqueProvider";
import { RefinanceAssetCompoundLoanItem } from "./RefinanceAssetCompoundLoanItem";

export interface IRefinanceAssetCompoundLoanProps {
  walletType: WalletType
  onSelectAsset?: (asset: Asset) => void;
}

interface IRefinanceCompoundSelectorItemState {
  asset: Asset,
  refinanceCompoundData: IRefinanceLoan[];
  isLoading: boolean;
}

export class RefinanceAssetCompoundLoan extends Component<IRefinanceAssetCompoundLoanProps, IRefinanceCompoundSelectorItemState> {
  constructor(props: IRefinanceAssetCompoundLoanProps) {
    super(props);
    this.state = {
      asset: Asset.DAI,
      refinanceCompoundData: [],
      isLoading: true,
    };
    TorqueProvider.Instance.eventEmitter.on(TorqueProviderEvents.ProviderAvailable, this.onProviderAvailable);
  }

  private onProviderAvailable = () => {
    // noinspection JSIgnoredPromiseFromCall
    this.derivedUpdate();
  };

  public componentDidMount(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.derivedUpdate();
  }

  private derivedUpdate = async () => {
    const compoundLoans = await TorqueProvider.Instance.getCompoundLoans();
    const soloLoans = await TorqueProvider.Instance.getSoloLoans();
    const loans = compoundLoans.concat(soloLoans);
    this.setState({ ...this.state, refinanceCompoundData: loans });

    if (loans.length) {
      await this.sleep(1000);
      this.setState({ isLoading: false });
    }
  };

  public sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  public render() {
    const refinanceCompound = this.state.refinanceCompoundData;
    let items;
    if (this.props.walletType === WalletType.Web3) {
      items = refinanceCompound.map((e, index) => {
        return (
          <RefinanceAssetCompoundLoanItem key={index} {...e}/>
        );
      });
    } else {
      items = refinanceCompound.map((e, index) => {
        return (
          <RefinanceAssetCompoundLoanItem key={index} {...e}/>
        );
      });
    }
    return <div className="refinance-asset-selector">
      <div className="refinance-page__main-centeredOverlay"
           style={!this.state.isLoading ? { display: `none` } : undefined}>
        <span>Loading...</span>
      </div>
      {items}
    </div>;
  }
}
