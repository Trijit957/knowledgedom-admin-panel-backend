import { Types } from "mongoose";
import { UserTransactionDocument } from "src/models/user-transaction/user-transaction.model";

export interface UserTransactionInterface {
    amount: number;
    userId: string | Types.ObjectId | UserTransactionDocument;
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

export enum UserTransactionResponseMessageEnum {
    TRANSACTION_ADDED = "Transaction added successfully!",
    TRANSACTION_UPDATED = "Transaction updated successfully!",
    TRANSACTION_DELETED = "Transaction deleted successfully!",
    TRANSACTION_NOT_FOUND = "Transaction not found!",
    DESCRIPTION_STRING = "Description must be a string!",
    IS_REPEAT_BOOLEAN = "IsRepeat must be a boolean!",
    FREQUENCY_STRING = "Frequency must be a string!",
    MONTH_NUMBER = "Month of Interval must be a number!",
    DATE_NUMBER = "Date of Interval must be a number!"
}