import { Types } from "mongoose";
import { UserDocument } from "src/models/user/user.model";

export interface UserTransactionInterface {
    amount: number;
    userId: string | Types.ObjectId | UserDocument;
    categoryInfo: TypeCategoryInterface;
    typeInfo: TypeCategoryInterface;
    description?: string;
    isRepeat?: boolean;
    frequency?: string;
    intervalInfo?: IntervalInfoInterface;
}

interface TypeCategoryInterface {
    code: number;
    name: string;
}

interface IntervalInfoInterface {
    month?: number;
    date?: number;
}

export interface UserTransactionResponseInterface {
    isTransactionAdded?: boolean;
    isTransactionUpdated?: boolean;
    isTransactionDeleted?: boolean;
    message: string;
    transactionInfo: UserTransactionInterface;
}

export interface UserTransactionByFilterInterface {
    userId: string | Types.ObjectId | UserDocument;
    categoryCode?: number;
    typeCode?: number;
    filterCode: number;
}

export enum TransactionFilterCodeEnum {
    TYPE = 10000,
    CATEGORY = 100000,
    TYPE_CATEGORY = 110000,
    OLDEST = 1,
    NEWEST = 10,
    LOWEST = 100,
    HIGHEST = 1000,
    TYPE_OLDEST = 10001,
    TYPE_NEWEST = 10010,
    TYPE_LOWEST = 10100,
    TYPE_HIGHEST = 11000,
    CATEGORY_OLDEST = 100001,
    CATEGORY_NEWEST = 100010,
    CATEGORY_LOWEST = 100100,
    CATEGORY_HIGHEST = 101000,
    TYPE_CATEGORY_OLDEST = 110001,
    TYPE_CATEGORY_NEWEST = 110010,
    TYPE_CATEGORY_LOWEST = 110100,
    TYPE_CATEGORY_HIGHEST = 111000
}

export enum UserTransactionResponseMessageEnum {
    TRANSACTION_ADDED = "Transaction added successfully!",
    TRANSACTION_UPDATED = "Transaction updated successfully!",
    TRANSACTION_DELETED = "Transaction deleted successfully!",
    TRANSACTION_NOT_FOUND = "Transaction not found!",
    DESCRIPTION_STRING = "Description must be a string!",
    IS_REPEAT_BOOLEAN = "IsRepeat must be a boolean!",
    FREQUENCY_STRING = "Frequency must be a string!",
    MONTH_NUMBER = "Month of Interval must be a number!",
    DATE_NUMBER = "Date of Interval must be a number!",
    FILTER_CODE_NOT_FOUND = "Filter code not found!"
}