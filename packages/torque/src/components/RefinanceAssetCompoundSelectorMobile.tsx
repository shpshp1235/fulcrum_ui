import React, { Component } from "react";
import { Asset } from "../domain/Asset";
import { BigNumber } from "@0x/utils";
import { WalletType } from "../domain/WalletType";
import { RefinanceAssetCompoundSelectorItemMobile } from "./RefinanceAssetCompoundSelectorItemMobile";
import {TorqueProvider} from "../services/TorqueProvider";
import {TorqueProviderEvents} from "../services/events/TorqueProviderEvents";
import {RefinanceCompoundData} from "../domain/RefinanceData";


export interface IRefinanceAssetCompoundSelectorMobileProps {
  walletType: WalletType

  onSelectAsset?: (asset: Asset) => void;
}

interface IRefinanceCompoundSelectorItemState {
  asset:Asset,
  refinanceCompoundData: RefinanceCompoundData[];
}

export class RefinanceAssetCompoundSelectorMobile extends Component<IRefinanceAssetCompoundSelectorMobileProps, IRefinanceCompoundSelectorItemState> {
  constructor(props: IRefinanceAssetCompoundSelectorMobileProps) {
    super(props);
    this.state = {
      asset: Asset.DAI,
      refinanceCompoundData:
      [{
        collateralAsset:Asset.DAI,
        collateralAmount: new BigNumber(0),
        loanAsset:Asset.DAI,
        loanAmount:  new BigNumber(0),
        variableAPR: new BigNumber(0),
        isDisabled: false,
        isShowCard:false,
        collateralization:0
      }]
    };
    // console.log("this.state=  "+this.state)
    TorqueProvider.Instance.eventEmitter.on(TorqueProviderEvents.ProviderAvailable, this.onProviderAvailable);

  }
  // true includes ENS support
  private onProviderAvailable = () => {

    this.derivedUpdate();
  };

  public componentDidMount(): void {
    this.derivedUpdate();
  }
  private derivedUpdate = async () => {
    const refinanceCompoundData = await TorqueProvider.Instance.checkSoloMargin();
    this.setState({ ...this.state, refinanceCompoundData: refinanceCompoundData });

  };


  public render() {

    // let assetList = Array.from(this.assetsShown.keys());
    let refinanceCompound = this.state.refinanceCompoundData
    let items;
    if (this.props.walletType === WalletType.Web3) {
      if(refinanceCompound[0].collateralAmount.gt(0)) {
      items = refinanceCompound.map((e, index)  => {

          return (

            <RefinanceAssetCompoundSelectorItemMobile key={index} collateralAsset={refinanceCompound[index].collateralAsset}
                                                collateralAmount={refinanceCompound[index].collateralAmount}
                                                loanAsset={refinanceCompound[index].loanAsset}
                                                variableAPR={refinanceCompound[index].variableAPR}
                                                isDisabled={refinanceCompound[index].isDisabled}
                                                isShowCard={refinanceCompound[index].isShowCard}
                                                collateralization={refinanceCompound[index].collateralization}
                                                loanAmount={refinanceCompound[index].loanAmount}/>
          );

      });
      }
    } else {
      // assetList = assetList.sort(e => this.assetsShown.get(e) ? -1 : 1);
      if(refinanceCompound[0].collateralAmount.gt(0)) {
        items = refinanceCompound.map((e, index) => {

          return (
            <RefinanceAssetCompoundSelectorItemMobile key={index} collateralAsset={refinanceCompound[index].collateralAsset}
                                                collateralAmount={refinanceCompound[index].collateralAmount}
                                                loanAsset={refinanceCompound[index].loanAsset}
                                                variableAPR={refinanceCompound[index].variableAPR}
                                                isDisabled={refinanceCompound[index].isDisabled}
                                                isShowCard={refinanceCompound[index].isShowCard}
                                                collateralization={refinanceCompound[index].collateralization}
                                                loanAmount={refinanceCompound[index].loanAmount}/>
          );

        });
      }
    }
    if(refinanceCompound[0].collateralAmount.gt(0)) {
      return <div className="refinance-asset-selector">{items}</div>;
    }else{
      return <div></div>
    }
  }
}
