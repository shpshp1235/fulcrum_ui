import React, { Component } from "react";
import { Asset } from "../domain/Asset";
import { IRefinanceMakerLoan } from "../domain/IRefinanceData";
import { WalletType } from "../domain/WalletType";
import { RefinanceAssetSelectorItemMobile } from "./RefinanceAssetSelectorItemMobile";

export interface IRefinanceAssetSelectorMobileProps {
  walletType: WalletType;
  loans: IRefinanceMakerLoan[];
}

interface IRefinanceAssetSelectorMobileItemState {
  asset: Asset,
}

export class RefinanceAssetSelectorMobile extends Component<IRefinanceAssetSelectorMobileProps, IRefinanceAssetSelectorMobileItemState> {
  constructor(props: IRefinanceAssetSelectorMobileProps) {
    super(props);
    this.state = {
      asset: Asset.DAI
    };
  }

  public render() {
    const { loans } = this.props;
    const items = loans.map((e, index) => {
      return (
        <RefinanceAssetSelectorItemMobile key={loans[index].urn} asset={Asset.DAI}
                                          cdpId={loans[index].cdpId}
                                          urn={loans[index].urn}
                                          accountAddress={loans[index].accountAddress}
                                          proxyAddress={loans[index].proxyAddress}
                                          isProxy={loans[index].isProxy}
                                          isInstaProxy={loans[index].isInstaProxy}
                                          ilk={loans[index].ilk}/>
      );
    });
    return items ? items : "";
  }
}
