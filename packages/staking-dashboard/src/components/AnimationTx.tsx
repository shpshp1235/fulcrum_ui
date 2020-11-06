import React, { PureComponent } from 'react'
import Lottie from 'react-lottie'
import stakingProvider from '../services/StakingProvider'
import TxLoaderStep from './TxLoaderStep'

import animationData from '../config/animation-tx.json'

interface IAnimationTxProps {}

interface IAnimationTxState {
  txHash: string
}

export default class AnimationTx extends PureComponent<IAnimationTxProps, IAnimationTxState> {
  constructor(props: IAnimationTxProps) {
    super(props)
    this.state = {
      txHash: ''
    }
  }

  private onTxHash = (txHash: string) => {
    this.setState({ ...this.state, txHash })
  }

  public render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return (
      <div className="animation-tx">
        {this.state.txHash ? (
          <a
            href={`${stakingProvider.web3ProviderSettings.etherscanURL}tx/${this.state.txHash}`}
            target="_blank"
            rel="noopener noreferrer">
            <p className="animation-title">
              <TxLoaderStep onTxHash={this.onTxHash} />
            </p>
            <Lottie options={defaultOptions} height={370} width={370} />
          </a>
        ) : (
          <React.Fragment>
            <p className="animation-title">
              <TxLoaderStep onTxHash={this.onTxHash} />
            </p>
            <Lottie options={defaultOptions} height={370} width={370} />
          </React.Fragment>
        )}
      </div>
    )
  }
}
