import React, { Component } from "react";
import { Asset } from "../domain/Asset";
import { IRefinanceLoan } from "../domain/IRefinanceData";
import { WalletType } from "../domain/WalletType";
import { TorqueProviderEvents } from "../services/events/TorqueProviderEvents";
import { TorqueProvider } from "../services/TorqueProvider";
import { RefinanceAssetCompoundLoanItemMobile } from "./RefinanceAssetCompoundLoanItemMobile";

export interface IRefinanceAssetCompoundLoanMobileProps {
  walletType: WalletType
  onSelectAsset?: (asset: Asset) => void;
}

interface IRefinanceCompoundSelectorItemState {
  asset: Asset,
  refinanceCompoundData: IRefinanceLoan[];
}

export class RefinanceAssetCompoundLoanMobile extends Component<IRefinanceAssetCompoundLoanMobileProps, IRefinanceCompoundSelectorItemState> {
  constructor(props: IRefinanceAssetCompoundLoanMobileProps) {
    super(props);
    this.state = {
      asset: Asset.DAI,
      refinanceCompoundData: []
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
    this.setState({ ...this.state, refinanceCompoundData: compoundLoans.concat(soloLoans) });
  };

  public render() {
    const refinanceCompound = this.state.refinanceCompoundData;
    let items;
    if (this.props.walletType === WalletType.Web3) {
      items = refinanceCompound.map((e, index) => {
        return (
          <RefinanceAssetCompoundLoanItemMobile key={index} {...e} />
        );
      });
    } else {
      items = refinanceCompound.map((e, index) => {
        return (
          <RefinanceAssetCompoundLoanItemMobile key={index} {...e} />
        );
      });
    }
    return <div className="refinance-asset-selector">{items}</div>;
  }
}
