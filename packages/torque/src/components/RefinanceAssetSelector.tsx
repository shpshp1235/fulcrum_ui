import React, { Component } from "react";
import { Asset } from "../domain/Asset";
import { IRefinanceMakerLoan } from "../domain/IRefinanceData";
import { WalletType } from "../domain/WalletType";
import { RefinanceAssetSelectorItem } from "./RefinanceAssetSelectorItem";

export interface IRefinanceAssetSelectorProps {
  walletType: WalletType;
  loans: IRefinanceMakerLoan[];
}

interface IRefinanceAssetSelectorItemState {
  asset: Asset,
}

export class RefinanceAssetSelector extends Component<IRefinanceAssetSelectorProps, IRefinanceAssetSelectorItemState> {
  constructor(props: IRefinanceAssetSelectorProps) {
    super(props);
    this.state = {
      asset: Asset.DAI
    };
  }

  public render() {
    const { loans } = this.props;
    const items = loans.map((e, index) => {
      return (
        <RefinanceAssetSelectorItem key={loans[index].urn} asset={Asset.DAI}
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
