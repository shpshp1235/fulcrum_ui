// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma whitespace class-name
// tslint:disable:no-unbound-method
// tslint:disable:variable-name
import { BaseContract } from "@0x/base-contract";
import { BlockParam, CallData, ContractAbi, DecodedLogArgs, TxData, TxDataPayable, SupportedProvider } from "ethereum-types";
import { BigNumber, classUtils } from "@0x/utils";
// tslint:enable:no-unused-variable

export type soloBridgeEventArgs =
    | soloBridgeNewTokenEventArgs
    | soloBridgeOwnershipTransferredEventArgs;

export enum soloBridgeEvents {
    NewToken = 'NewToken',
    OwnershipTransferred = 'OwnershipTransferred',
}

// tslint:disable-next-line:interface-name
export interface soloBridgeNewTokenEventArgs extends DecodedLogArgs {
    marketId: BigNumber;
    iToken: string;
}

// tslint:disable-next-line:interface-name
export interface soloBridgeOwnershipTransferredEventArgs extends DecodedLogArgs {
    previousOwner: string;
    newOwner: string;
}


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class soloBridgeContract extends BaseContract {
    public iTokens = {
        async callAsync(
            index_0: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('iTokens(uint256)', [index_0
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
            const abiEncoder = self._lookupAbiEncoder('iTokens(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public setTokens = {
        async sendTransactionAsync(
            marketIds: BigNumber[],
            _iTokens: string[],
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('setTokens(uint256[],address[])', [marketIds,
    _iTokens
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).setTokens.estimateGasAsync.bind(
                    self,
                    marketIds,
                    _iTokens
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            marketIds: BigNumber[],
            _iTokens: string[],
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('setTokens(uint256[],address[])', [marketIds,
    _iTokens
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
            marketIds: BigNumber[],
            _iTokens: string[],
        ): string {
            const self = this as any as soloBridgeContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('setTokens(uint256[],address[])', [marketIds,
    _iTokens
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            marketIds: BigNumber[],
            _iTokens: string[],
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('setTokens(uint256[],address[])', [marketIds,
        _iTokens
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
            const abiEncoder = self._lookupAbiEncoder('setTokens(uint256[],address[])');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
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
            const self = this as any as soloBridgeContract;
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
    public _migrateLoan = {
        async sendTransactionAsync(
            borrower: string,
            values: BigNumber[],
            marketIds: BigNumber[],
            amounts: BigNumber[],
            collateralAmounts: BigNumber[],
            borrowAmounts: BigNumber[],
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('_migrateLoan(address,uint256[3],uint256[],uint256[],uint256[],uint256[])', [borrower,
    values,
    marketIds,
    amounts,
    collateralAmounts,
    borrowAmounts
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any)._migrateLoan.estimateGasAsync.bind(
                    self,
                    borrower,
                    values,
                    marketIds,
                    amounts,
                    collateralAmounts,
                    borrowAmounts
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            borrower: string,
            values: BigNumber[],
            marketIds: BigNumber[],
            amounts: BigNumber[],
            collateralAmounts: BigNumber[],
            borrowAmounts: BigNumber[],
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('_migrateLoan(address,uint256[3],uint256[],uint256[],uint256[],uint256[])', [borrower,
    values,
    marketIds,
    amounts,
    collateralAmounts,
    borrowAmounts
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
            borrower: string,
            values: BigNumber[],
            marketIds: BigNumber[],
            amounts: BigNumber[],
            collateralAmounts: BigNumber[],
            borrowAmounts: BigNumber[],
        ): string {
            const self = this as any as soloBridgeContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('_migrateLoan(address,uint256[3],uint256[],uint256[],uint256[],uint256[])', [borrower,
    values,
    marketIds,
    amounts,
    collateralAmounts,
    borrowAmounts
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            borrower: string,
            values: BigNumber[],
            marketIds: BigNumber[],
            amounts: BigNumber[],
            collateralAmounts: BigNumber[],
            borrowAmounts: BigNumber[],
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('_migrateLoan(address,uint256[3],uint256[],uint256[],uint256[],uint256[])', [borrower,
        values,
        marketIds,
        amounts,
        collateralAmounts,
        borrowAmounts
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
            const abiEncoder = self._lookupAbiEncoder('_migrateLoan(address,uint256[3],uint256[],uint256[],uint256[],uint256[])');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public migrateLoan = {
        async sendTransactionAsync(
            account: {owner: string;number: BigNumber},
            marketId: BigNumber,
            loanAmount: BigNumber,
            marketIds: BigNumber[],
            amounts: BigNumber[],
            collateralAmounts: BigNumber[],
            borrowAmounts: BigNumber[],
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('migrateLoan({address,uint256},uint256,uint256,uint256[],uint256[],uint256[],uint256[])', [account,
    marketId,
    loanAmount,
    marketIds,
    amounts,
    collateralAmounts,
    borrowAmounts
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                (self as any).migrateLoan.estimateGasAsync.bind(
                    self,
                    account,
                    marketId,
                    loanAmount,
                    marketIds,
                    amounts,
                    collateralAmounts,
                    borrowAmounts
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            account: {owner: string;number: BigNumber},
            marketId: BigNumber,
            loanAmount: BigNumber,
            marketIds: BigNumber[],
            amounts: BigNumber[],
            collateralAmounts: BigNumber[],
            borrowAmounts: BigNumber[],
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('migrateLoan({address,uint256},uint256,uint256,uint256[],uint256[],uint256[],uint256[])', [account,
    marketId,
    loanAmount,
    marketIds,
    amounts,
    collateralAmounts,
    borrowAmounts
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
            account: {owner: string;number: BigNumber},
            marketId: BigNumber,
            loanAmount: BigNumber,
            marketIds: BigNumber[],
            amounts: BigNumber[],
            collateralAmounts: BigNumber[],
            borrowAmounts: BigNumber[],
        ): string {
            const self = this as any as soloBridgeContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('migrateLoan({address,uint256},uint256,uint256,uint256[],uint256[],uint256[],uint256[])', [account,
    marketId,
    loanAmount,
    marketIds,
    amounts,
    collateralAmounts,
    borrowAmounts
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            account: {owner: string;number: BigNumber},
            marketId: BigNumber,
            loanAmount: BigNumber,
            marketIds: BigNumber[],
            amounts: BigNumber[],
            collateralAmounts: BigNumber[],
            borrowAmounts: BigNumber[],
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('migrateLoan({address,uint256},uint256,uint256,uint256[],uint256[],uint256[],uint256[])', [account,
        marketId,
        loanAmount,
        marketIds,
        amounts,
        collateralAmounts,
        borrowAmounts
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
            const abiEncoder = self._lookupAbiEncoder('migrateLoan({address,uint256},uint256,uint256,uint256[],uint256[],uint256[],uint256[])');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public transferOwnership = {
        async sendTransactionAsync(
            _newOwner: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('transferOwnership(address)', [_newOwner
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
                    _newOwner
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _newOwner: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('transferOwnership(address)', [_newOwner
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
            _newOwner: string,
        ): string {
            const self = this as any as soloBridgeContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transferOwnership(address)', [_newOwner
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _newOwner: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as soloBridgeContract;
            const encodedData = self._strictEncodeArguments('transferOwnership(address)', [_newOwner
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
    constructor(abi: ContractAbi, address: string, provider: any, txDefaults?: Partial<TxData>) {
        super('soloBridge', abi, address.toLowerCase(), provider as SupportedProvider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
