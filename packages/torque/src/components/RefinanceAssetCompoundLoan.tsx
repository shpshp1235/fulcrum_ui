import React, { Component } from "react";
import { Asset } from "../domain/Asset";
import { IRefinanceLoan } from "../domain/IRefinanceData";
import { WalletType } from "../domain/WalletType";
import { RefinanceAssetCompoundLoanItem } from "./RefinanceAssetCompoundLoanItem";

export interface IRefinanceAssetCompoundLoanProps {
  walletType: WalletType
  onSelectAsset?: (asset: Asset) => void;
  loans: IRefinanceLoan[]
}

interface IRefinanceCompoundSelectorItemState {
  asset: Asset,
}

export class RefinanceAssetCompoundLoan extends Component<IRefinanceAssetCompoundLoanProps, IRefinanceCompoundSelectorItemState> {
  constructor(props: IRefinanceAssetCompoundLoanProps) {
    super(props);
    this.state = {
      asset: Asset.DAI,
    };
  }

  public render() {
    const { loans } = this.props;
    let items;
    if (this.props.walletType === WalletType.Web3) {
      items = loans.map((e, index) => {
        return (
          <RefinanceAssetCompoundLoanItem key={index} {...e}/>
        );
      });
    } else {
      items = loans.map((e, index) => {
        return (
          <RefinanceAssetCompoundLoanItem key={index} {...e}/>
        );
      });
    }
    return items ? items : "";
  }
}
