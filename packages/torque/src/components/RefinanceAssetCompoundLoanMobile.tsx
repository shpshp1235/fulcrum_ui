import React, { Component } from "react";
import { Asset } from "../domain/Asset";
import { IRefinanceLoan } from "../domain/IRefinanceData";
import { WalletType } from "../domain/WalletType";
import { RefinanceAssetCompoundLoanItemMobile } from "./RefinanceAssetCompoundLoanItemMobile";

export interface IRefinanceAssetCompoundLoanMobileProps {
  walletType: WalletType
  onSelectAsset?: (asset: Asset) => void;
  loans: IRefinanceLoan[]
}

interface IRefinanceCompoundSelectorItemState {
  asset: Asset,
}

export class RefinanceAssetCompoundLoanMobile extends Component<IRefinanceAssetCompoundLoanMobileProps, IRefinanceCompoundSelectorItemState> {
  constructor(props: IRefinanceAssetCompoundLoanMobileProps) {
    super(props);
    this.state = {
      asset: Asset.DAI
    };
  }

  public render() {
    const { loans } = this.props;
    let items;
    if (this.props.walletType === WalletType.Web3) {
      items = loans.map((e, index) => {
        return (
          <RefinanceAssetCompoundLoanItemMobile key={index} {...e} />
        );
      });
    } else {
      items = loans.map((e, index) => {
        return (
          <RefinanceAssetCompoundLoanItemMobile key={index} {...e} />
        );
      });
    }
    return items ? items : "";
  }
}
