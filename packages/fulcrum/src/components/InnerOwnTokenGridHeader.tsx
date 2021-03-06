import React, { Component } from 'react'
import { Asset } from '../domain/Asset'

export interface IInnerOwnTokenGridHeaderProps {
  asset?: Asset
  quoteToken?: Asset
  loader: boolean
  isLoadingTransaction: boolean
}

export class InnerOwnTokenGridHeader extends Component<IInnerOwnTokenGridHeaderProps> {
  public render() {
    return (
      <div className="inner-own-token-grid-header">
        <div
          className={`inner-own-token-grid-header__col-token-image ${
            this.props.isLoadingTransaction && this.props.loader ? `opacity` : `opacityIn`
          }`}>
          <span className="inner-own-token-grid-header__text">{`Position (${this.props.asset}/${this.props.quoteToken})`}</span>
        </div>
        <div
          className={`inner-own-token-grid-header__col-asset-type ${
            this.props.isLoadingTransaction && this.props.loader ? `opacity` : `opacityIn`
          }`}>
          <span className="inner-own-token-grid-header__text">Type</span>
        </div>
        <div
          className={`inner-own-token-grid-header__col-asset-price ${
            this.props.isLoadingTransaction && this.props.loader ? `opacity` : `opacityIn`
          }`}>
          <span className="inner-own-token-grid-header__text">Value</span>
        </div>
        <div
          className={`inner-own-token-grid-header__col-asset-collateral ${
            this.props.isLoadingTransaction && this.props.loader ? `opacity` : `opacityIn`
          }`}>
          <span className="inner-own-token-grid-header__text">Collateral</span>
        </div>
        <div
          className={`inner-own-token-grid-header__col-position-value ${
            this.props.isLoadingTransaction && this.props.loader ? `opacity` : `opacityIn`
          }`}>
          <span className="inner-own-token-grid-header__text">Open Price</span>
        </div>
        <div
          className={`inner-own-token-grid-header__col-liquidation-price ${
            this.props.isLoadingTransaction && this.props.loader ? `opacity` : `opacityIn`
          }`}>
          <span className="inner-own-token-grid-header__text">Liquidation Price</span>
        </div>
        <div
          className={`inner-own-token-grid-header__col-profit ${
            this.props.isLoadingTransaction && this.props.loader ? `opacity` : `opacityIn`
          }`}>
          <span className="inner-own-token-grid-header__text">Profit</span>
        </div>
      </div>
    )
  }
}
