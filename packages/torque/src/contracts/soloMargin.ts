// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma whitespace class-name
// tslint:disable:no-unbound-method
// tslint:disable:variable-name
import { BaseContract } from "@0x/base-contract";
import { BlockParam, CallData, ContractAbi, DecodedLogArgs, TxData, TxDataPayable, SupportedProvider } from "ethereum-types";
import { BigNumber, classUtils } from "@0x/utils";
// tslint:enable:no-unused-variable

export type soloMarginEventArgs =
    | soloMarginLogOperatorSetEventArgs
    | soloMarginOwnershipTransferredEventArgs;

export enum soloMarginEvents {
    LogOperatorSet = 'LogOperatorSet',
    OwnershipTransferred = 'OwnershipTransferred',
}

// tslint:disable-next-line:interface-name
export interface soloMarginLogOperatorSetEventArgs extends DecodedLogArgs {
    owner: string;
    operator: string;
    trusted: boolean;
}

// tslint:disable-next-line:interface-name
export interface soloMarginOwnershipTransferredEventArgs extends DecodedLogArgs {
    previousOwner: string;
    newOwner: string;
}


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class soloMarginContract extends BaseContract {
    public ownerSetSpreadPremium = {
        async sendTransactionAsync(
            marketId: BigNumber,
            spreadPremium: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetSpreadPremium(uint256,{uint256})', [marketId,
    spreadPremium
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetSpreadPremium.estimateGasAsync.bind(
                    self,
                    marketId,
                    spreadPremium
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            marketId: BigNumber,
            spreadPremium: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetSpreadPremium(uint256,{uint256})', [marketId,
    spreadPremium
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            marketId: BigNumber,
            spreadPremium: {value: BigNumber},
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetSpreadPremium(uint256,{uint256})', [marketId,
    spreadPremium
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            marketId: BigNumber,
            spreadPremium: {value: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetSpreadPremium(uint256,{uint256})', [marketId,
        spreadPremium
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetSpreadPremium(uint256,{uint256})');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getIsGlobalOperator = {
        async callAsync(
            operator: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getIsGlobalOperator(address)', [operator
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getIsGlobalOperator(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketTokenAddress = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketTokenAddress(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketTokenAddress(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerSetInterestSetter = {
        async sendTransactionAsync(
            marketId: BigNumber,
            interestSetter: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetInterestSetter(uint256,address)', [marketId,
    interestSetter
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetInterestSetter.estimateGasAsync.bind(
                    self,
                    marketId,
                    interestSetter
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            marketId: BigNumber,
            interestSetter: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetInterestSetter(uint256,address)', [marketId,
    interestSetter
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            marketId: BigNumber,
            interestSetter: string,
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetInterestSetter(uint256,address)', [marketId,
    interestSetter
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            marketId: BigNumber,
            interestSetter: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetInterestSetter(uint256,address)', [marketId,
        interestSetter
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetInterestSetter(uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getAccountValues = {
        async callAsync(
            account: {owner: string;number: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[{value: BigNumber}, {value: BigNumber}]
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getAccountValues((address,uint256))', [account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getAccountValues((address,uint256))');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[{value: BigNumber}, {value: BigNumber}]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketPriceOracle = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketPriceOracle(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketPriceOracle(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketInterestSetter = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketInterestSetter(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketInterestSetter(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketSpreadPremium = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketSpreadPremium(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketSpreadPremium(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getNumMarkets = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getNumMarkets()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getNumMarkets()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerWithdrawUnsupportedTokens = {
        async sendTransactionAsync(
            token: string,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerWithdrawUnsupportedTokens(address,address)', [token,
    recipient
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerWithdrawUnsupportedTokens.estimateGasAsync.bind(
                    self,
                    token,
                    recipient
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            token: string,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerWithdrawUnsupportedTokens(address,address)', [token,
    recipient
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            token: string,
            recipient: string,
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerWithdrawUnsupportedTokens(address,address)', [token,
    recipient
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            token: string,
            recipient: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerWithdrawUnsupportedTokens(address,address)', [token,
        recipient
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerWithdrawUnsupportedTokens(address,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerSetMinBorrowedValue = {
        async sendTransactionAsync(
            minBorrowedValue: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetMinBorrowedValue({uint256})', [minBorrowedValue
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetMinBorrowedValue.estimateGasAsync.bind(
                    self,
                    minBorrowedValue
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            minBorrowedValue: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetMinBorrowedValue({uint256})', [minBorrowedValue
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            minBorrowedValue: {value: BigNumber},
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetMinBorrowedValue({uint256})', [minBorrowedValue
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            minBorrowedValue: {value: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetMinBorrowedValue({uint256})', [minBorrowedValue
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetMinBorrowedValue({uint256})');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerSetLiquidationSpread = {
        async sendTransactionAsync(
            spread: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetLiquidationSpread({uint256})', [spread
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetLiquidationSpread.estimateGasAsync.bind(
                    self,
                    spread
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            spread: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetLiquidationSpread({uint256})', [spread
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            spread: {value: BigNumber},
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetLiquidationSpread({uint256})', [spread
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            spread: {value: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetLiquidationSpread({uint256})', [spread
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetLiquidationSpread({uint256})');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerSetEarningsRate = {
        async sendTransactionAsync(
            earningsRate: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetEarningsRate({uint256})', [earningsRate
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetEarningsRate.estimateGasAsync.bind(
                    self,
                    earningsRate
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            earningsRate: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetEarningsRate({uint256})', [earningsRate
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            earningsRate: {value: BigNumber},
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetEarningsRate({uint256})', [earningsRate
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            earningsRate: {value: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetEarningsRate({uint256})', [earningsRate
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetEarningsRate({uint256})');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getIsLocalOperator = {
        async callAsync(
            owner: string,
            operator: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getIsLocalOperator(address,address)', [owner,
        operator
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getIsLocalOperator(address,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getAccountPar = {
        async callAsync(
            account: {owner: string;number: BigNumber},
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{sign: boolean;value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getAccountPar({address,uint256},uint256)', [account,
        marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getAccountPar({address,uint256},uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{sign: boolean;value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerSetMarginPremium = {
        async sendTransactionAsync(
            marketId: BigNumber,
            marginPremium: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetMarginPremium(uint256,{uint256})', [marketId,
    marginPremium
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetMarginPremium.estimateGasAsync.bind(
                    self,
                    marketId,
                    marginPremium
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            marketId: BigNumber,
            marginPremium: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetMarginPremium(uint256,{uint256})', [marketId,
    marginPremium
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            marketId: BigNumber,
            marginPremium: {value: BigNumber},
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetMarginPremium(uint256,{uint256})', [marketId,
    marginPremium
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            marketId: BigNumber,
            marginPremium: {value: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetMarginPremium(uint256,{uint256})', [marketId,
        marginPremium
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetMarginPremium(uint256,{uint256})');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarginRatio = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarginRatio()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarginRatio()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketCurrentIndex = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketCurrentIndex(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketCurrentIndex(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketIsClosing = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketIsClosing(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketIsClosing(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getRiskParams = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{marginRatio: {value: BigNumber};liquidationSpread: {value: BigNumber};earningsRate: {value: BigNumber};minBorrowedValue: {value: BigNumber}}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getRiskParams()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getRiskParams()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{marginRatio: {value: BigNumber};liquidationSpread: {value: BigNumber};earningsRate: {value: BigNumber};minBorrowedValue: {value: BigNumber}}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getAccountBalances = {
        async callAsync(
            account: {owner: string;number: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[string[], Array<{sign: boolean;value: BigNumber}>, Array<{sign: boolean;value: BigNumber}>]
        > {
            const self = this as any as soloMarginContract;

            const encodedData = self._strictEncodeArguments('getAccountBalances((address,uint256))', [account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getAccountBalances((address,uint256))');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[string[], Array<{sign: boolean;value: BigNumber}>, Array<{sign: boolean;value: BigNumber}>]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public renounceOwnership = {
        async sendTransactionAsync(
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('renounceOwnership()', []);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).renounceOwnership.estimateGasAsync.bind(
                    self,
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('renounceOwnership()', []);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('renounceOwnership()', []);
            return abiEncodedTransactionData;
        },
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('renounceOwnership()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('renounceOwnership()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMinBorrowedValue = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMinBorrowedValue()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMinBorrowedValue()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public setOperators = {
        async sendTransactionAsync(
            args: Array<{operator: string;trusted: boolean}>,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('setOperators(tuple[])', [args
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).setOperators.estimateGasAsync.bind(
                    self,
                    args
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            args: Array<{operator: string;trusted: boolean}>,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('setOperators(tuple[])', [args
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            args: Array<{operator: string;trusted: boolean}>,
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('setOperators(tuple[])', [args
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            args: Array<{operator: string;trusted: boolean}>,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('setOperators(tuple[])', [args
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('setOperators(tuple[])');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketPrice = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketPrice(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketPrice(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public owner = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('owner()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('owner()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public isOwner = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('isOwner()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('isOwner()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerWithdrawExcessTokens = {
        async sendTransactionAsync(
            marketId: BigNumber,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerWithdrawExcessTokens(uint256,address)', [marketId,
    recipient
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerWithdrawExcessTokens.estimateGasAsync.bind(
                    self,
                    marketId,
                    recipient
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            marketId: BigNumber,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerWithdrawExcessTokens(uint256,address)', [marketId,
    recipient
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            marketId: BigNumber,
            recipient: string,
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerWithdrawExcessTokens(uint256,address)', [marketId,
    recipient
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            marketId: BigNumber,
            recipient: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerWithdrawExcessTokens(uint256,address)', [marketId,
        recipient
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerWithdrawExcessTokens(uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerAddMarket = {
        async sendTransactionAsync(
            token: string,
            priceOracle: string,
            interestSetter: string,
            marginPremium: {value: BigNumber},
            spreadPremium: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerAddMarket(address,address,address,{uint256},{uint256})', [token,
    priceOracle,
    interestSetter,
    marginPremium,
    spreadPremium
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerAddMarket.estimateGasAsync.bind(
                    self,
                    token,
                    priceOracle,
                    interestSetter,
                    marginPremium,
                    spreadPremium
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            token: string,
            priceOracle: string,
            interestSetter: string,
            marginPremium: {value: BigNumber},
            spreadPremium: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerAddMarket(address,address,address,{uint256},{uint256})', [token,
    priceOracle,
    interestSetter,
    marginPremium,
    spreadPremium
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            token: string,
            priceOracle: string,
            interestSetter: string,
            marginPremium: {value: BigNumber},
            spreadPremium: {value: BigNumber},
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerAddMarket(address,address,address,{uint256},{uint256})', [token,
    priceOracle,
    interestSetter,
    marginPremium,
    spreadPremium
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            token: string,
            priceOracle: string,
            interestSetter: string,
            marginPremium: {value: BigNumber},
            spreadPremium: {value: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerAddMarket(address,address,address,{uint256},{uint256})', [token,
        priceOracle,
        interestSetter,
        marginPremium,
        spreadPremium
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerAddMarket(address,address,address,{uint256},{uint256})');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public operate = {
        async sendTransactionAsync(
            accounts: Array<{owner: string;number: BigNumber}>,
            actions: Array<{actionType: number|BigNumber;accountId: BigNumber;amount: {sign: boolean;denomination: number|BigNumber;ref: number|BigNumber;value: BigNumber};primaryMarketId: BigNumber;secondaryMarketId: BigNumber;otherAddress: string;otherAccountId: BigNumber;data: string}>,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('operate(tuple[],tuple[])', [accounts,
    actions
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).operate.estimateGasAsync.bind(
                    self,
                    accounts,
                    actions
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            accounts: Array<{owner: string;number: BigNumber}>,
            actions: Array<{actionType: number|BigNumber;accountId: BigNumber;amount: {sign: boolean;denomination: number|BigNumber;ref: number|BigNumber;value: BigNumber};primaryMarketId: BigNumber;secondaryMarketId: BigNumber;otherAddress: string;otherAccountId: BigNumber;data: string}>,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('operate(tuple[],tuple[])', [accounts,
    actions
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            accounts: Array<{owner: string;number: BigNumber}>,
            actions: Array<{actionType: number|BigNumber;accountId: BigNumber;amount: {sign: boolean;denomination: number|BigNumber;ref: number|BigNumber;value: BigNumber};primaryMarketId: BigNumber;secondaryMarketId: BigNumber;otherAddress: string;otherAccountId: BigNumber;data: string}>,
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('operate(tuple[],tuple[])', [accounts,
    actions
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            accounts: Array<{owner: string;number: BigNumber}>,
            actions: Array<{actionType: number|BigNumber;accountId: BigNumber;amount: {sign: boolean;denomination: number|BigNumber;ref: number|BigNumber;value: BigNumber};primaryMarketId: BigNumber;secondaryMarketId: BigNumber;otherAddress: string;otherAccountId: BigNumber;data: string}>,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('operate(tuple[],tuple[])', [accounts,
        actions
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('operate(tuple[],tuple[])');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketWithInfo = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[{token: string;totalPar: {borrow: BigNumber;supply: BigNumber};index: {borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber};priceOracle: string;interestSetter: string;marginPremium: {value: BigNumber};spreadPremium: {value: BigNumber};isClosing: boolean}, {borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber}, {value: BigNumber}, {value: BigNumber}]
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketWithInfo(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketWithInfo(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[{token: string;totalPar: {borrow: BigNumber;supply: BigNumber};index: {borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber};priceOracle: string;interestSetter: string;marginPremium: {value: BigNumber};spreadPremium: {value: BigNumber};isClosing: boolean}, {borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber}, {value: BigNumber}, {value: BigNumber}]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerSetMarginRatio = {
        async sendTransactionAsync(
            ratio: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetMarginRatio({uint256})', [ratio
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetMarginRatio.estimateGasAsync.bind(
                    self,
                    ratio
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            ratio: {value: BigNumber},
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetMarginRatio({uint256})', [ratio
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            ratio: {value: BigNumber},
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetMarginRatio({uint256})', [ratio
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            ratio: {value: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetMarginRatio({uint256})', [ratio
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetMarginRatio({uint256})');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getLiquidationSpread = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getLiquidationSpread()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getLiquidationSpread()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getAccountWei = {
        async callAsync(
            account: {owner: string;number: BigNumber},
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{sign: boolean;value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getAccountWei({address,uint256},uint256)', [account,
        marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getAccountWei({address,uint256},uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{sign: boolean;value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketTotalPar = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{borrow: BigNumber;supply: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketTotalPar(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketTotalPar(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{borrow: BigNumber;supply: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getLiquidationSpreadForPair = {
        async callAsync(
            heldMarketId: BigNumber,
            owedMarketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getLiquidationSpreadForPair(uint256,uint256)', [heldMarketId,
        owedMarketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getLiquidationSpreadForPair(uint256,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getNumExcessTokens = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{sign: boolean;value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getNumExcessTokens(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getNumExcessTokens(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{sign: boolean;value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketCachedIndex = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketCachedIndex(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketCachedIndex(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getAccountStatus = {
        async callAsync(
            account: {owner: string;number: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getAccountStatus({address,uint256})', [account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getAccountStatus({address,uint256})');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getEarningsRate = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getEarningsRate()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getEarningsRate()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerSetPriceOracle = {
        async sendTransactionAsync(
            marketId: BigNumber,
            priceOracle: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetPriceOracle(uint256,address)', [marketId,
    priceOracle
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetPriceOracle.estimateGasAsync.bind(
                    self,
                    marketId,
                    priceOracle
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            marketId: BigNumber,
            priceOracle: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetPriceOracle(uint256,address)', [marketId,
    priceOracle
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            marketId: BigNumber,
            priceOracle: string,
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetPriceOracle(uint256,address)', [marketId,
    priceOracle
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            marketId: BigNumber,
            priceOracle: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetPriceOracle(uint256,address)', [marketId,
        priceOracle
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetPriceOracle(uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getRiskLimits = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{marginRatioMax: BigNumber;liquidationSpreadMax: BigNumber;earningsRateMax: BigNumber;marginPremiumMax: BigNumber;spreadPremiumMax: BigNumber;minBorrowedValueMax: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getRiskLimits()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getRiskLimits()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{marginRatioMax: BigNumber;liquidationSpreadMax: BigNumber;earningsRateMax: BigNumber;marginPremiumMax: BigNumber;spreadPremiumMax: BigNumber;minBorrowedValueMax: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarket = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{token: string;totalPar: {borrow: BigNumber;supply: BigNumber};index: {borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber};priceOracle: string;interestSetter: string;marginPremium: {value: BigNumber};spreadPremium: {value: BigNumber};isClosing: boolean}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarket(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarket(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{token: string;totalPar: {borrow: BigNumber;supply: BigNumber};index: {borrow: BigNumber;supply: BigNumber;lastUpdate: BigNumber};priceOracle: string;interestSetter: string;marginPremium: {value: BigNumber};spreadPremium: {value: BigNumber};isClosing: boolean}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerSetIsClosing = {
        async sendTransactionAsync(
            marketId: BigNumber,
            isClosing: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetIsClosing(uint256,bool)', [marketId,
    isClosing
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetIsClosing.estimateGasAsync.bind(
                    self,
                    marketId,
                    isClosing
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            marketId: BigNumber,
            isClosing: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetIsClosing(uint256,bool)', [marketId,
    isClosing
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            marketId: BigNumber,
            isClosing: boolean,
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetIsClosing(uint256,bool)', [marketId,
    isClosing
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            marketId: BigNumber,
            isClosing: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetIsClosing(uint256,bool)', [marketId,
        isClosing
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetIsClosing(uint256,bool)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ownerSetGlobalOperator = {
        async sendTransactionAsync(
            operator: string,
            approved: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetGlobalOperator(address,bool)', [operator,
    approved
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).ownerSetGlobalOperator.estimateGasAsync.bind(
                    self,
                    operator,
                    approved
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            operator: string,
            approved: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetGlobalOperator(address,bool)', [operator,
    approved
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            operator: string,
            approved: boolean,
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerSetGlobalOperator(address,bool)', [operator,
    approved
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            operator: string,
            approved: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('ownerSetGlobalOperator(address,bool)', [operator,
        approved
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerSetGlobalOperator(address,bool)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(
            newOwner: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('transferOwnership(address)', [newOwner
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).transferOwnership.estimateGasAsync.bind(
                    self,
                    newOwner
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            newOwner: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('transferOwnership(address)', [newOwner
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            newOwner: string,
        ): string {
            const self = this as any as soloMarginContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transferOwnership(address)', [newOwner
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            newOwner: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('transferOwnership(address)', [newOwner
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('transferOwnership(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getAdjustedAccountValues = {
        async callAsync(
            account: {owner: string;number: BigNumber},
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[{value: BigNumber}, {value: BigNumber}]
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getAdjustedAccountValues({address,uint256})', [account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getAdjustedAccountValues({address,uint256})');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[{value: BigNumber}, {value: BigNumber}]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketMarginPremium = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketMarginPremium(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketMarginPremium(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getMarketInterestRate = {
        async callAsync(
            marketId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<{value: BigNumber}
        > {
            const self = this as any as soloMarginContract;
            const encodedData = self._strictEncodeArguments('getMarketInterestRate(uint256)', [marketId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getMarketInterestRate(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<{value: BigNumber}
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    constructor(abi: ContractAbi, address: string, provider: any, txDefaults?: Partial<TxData>) {
        super('soloMargin', abi, address.toLowerCase(), provider as SupportedProvider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
