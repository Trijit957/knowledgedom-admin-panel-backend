import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { UserTransaction, UserTransactionDocument } from "src/models/user-transaction/user-transaction.model";
import { UserDocument } from "src/models/user/user.model";
import { TransactionFilterCodeEnum, UserTransactionByFilterInterface, UserTransactionInterface, UserTransactionResponseInterface, UserTransactionResponseMessageEnum } from "./user-transaction.interface";

@Injectable()
export class UserTransactionService {

    constructor(
        @InjectModel(UserTransaction.name) private readonly userTransactionModel: Model<UserTransactionDocument> 
    ) {}

    
    public async createUserTransaction(userTransaction: UserTransactionInterface): Promise<UserTransactionResponseInterface | HttpException> {
        const { description, isRepeat, frequency, intervalInfo } = userTransaction;

        if(description && typeof description !== "string") {
            throw new BadRequestException(UserTransactionResponseMessageEnum.DESCRIPTION_STRING);
        } 
        
        if (isRepeat && typeof isRepeat !== "boolean") {
            throw new BadRequestException(UserTransactionResponseMessageEnum.IS_REPEAT_BOOLEAN);
        } 
        
        if (frequency && typeof frequency !== "string") {
            throw new BadRequestException(UserTransactionResponseMessageEnum.FREQUENCY_STRING);
        } 
        
        if (intervalInfo?.date && typeof intervalInfo?.date !== "number") {
            throw new BadRequestException(UserTransactionResponseMessageEnum.DATE_NUMBER);
        } 
        
        if (intervalInfo?.month && typeof intervalInfo?.month !== "number") {
            throw new BadRequestException(UserTransactionResponseMessageEnum.MONTH_NUMBER);
        }

        const newUserTransaction = new this.userTransactionModel(userTransaction);
        
        const createdUserTransaction = await newUserTransaction.save();

        return {
            isTransactionAdded: true,
            message: UserTransactionResponseMessageEnum.TRANSACTION_ADDED,
            transactionInfo: createdUserTransaction
        }


    }

    public async getAllUserTransactions(userId: string | Types.ObjectId | UserDocument): Promise<Array<UserTransactionInterface> | HttpException> {
        const userTransactions = await this.userTransactionModel.find({ userId });

        return userTransactions;

    }

    public async getTransactionsByAppliedFilter(userTransactionByFilter: UserTransactionByFilterInterface): Promise<Array<UserTransactionInterface> | HttpException> {
        const { userId, categoryCode, typeCode, filterCode } = userTransactionByFilter;

        switch(filterCode) {
            case TransactionFilterCodeEnum.TYPE:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode });
            case TransactionFilterCodeEnum.CATEGORY:
                return await this.userTransactionModel.find({ userId, 'categoryInfo.code': categoryCode });
            case TransactionFilterCodeEnum.TYPE_CATEGORY:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode, 'categoryInfo.code': categoryCode });
            case TransactionFilterCodeEnum.OLDEST:
                return await this.userTransactionModel.find({ userId }).sort({ createdAt: 1 });
            case TransactionFilterCodeEnum.NEWEST:
                return await this.userTransactionModel.find({ userId }).sort({ createdAt: -1 });
            case TransactionFilterCodeEnum.LOWEST:
                return await this.userTransactionModel.find({ userId }).sort({ amount: 1 });
            case TransactionFilterCodeEnum.HIGHEST:
                return await this.userTransactionModel.find({ userId }).sort({ amount: -1 });
            case TransactionFilterCodeEnum.TYPE_OLDEST:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode }).sort({ createdAt: 1 });
            case TransactionFilterCodeEnum.TYPE_NEWEST:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode }).sort({ createdAt: -1 });
            case TransactionFilterCodeEnum.TYPE_LOWEST:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode }).sort({ amount: 1 }).limit(1);
            case TransactionFilterCodeEnum.TYPE_HIGHEST:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode }).sort({ amount: -1 }).limit(1);
            case TransactionFilterCodeEnum.CATEGORY_OLDEST:
                return await this.userTransactionModel.find({ userId, 'categoryInfo.code': categoryCode }).sort({ createdAt: 1 });
            case TransactionFilterCodeEnum.CATEGORY_NEWEST:
                return await this.userTransactionModel.find({ userId, 'categoryInfo.code': categoryCode }).sort({ createdAt: -1 });
            case TransactionFilterCodeEnum.CATEGORY_LOWEST:
                return await this.userTransactionModel.find({ userId, 'categoryInfo.code': categoryCode }).sort({ amount: 1 }).limit(1);
            case TransactionFilterCodeEnum.CATEGORY_HIGHEST:
                return await this.userTransactionModel.find({ userId, 'categoryInfo.code': categoryCode }).sort({ amount: -1 }).limit(1);
            case TransactionFilterCodeEnum.TYPE_CATEGORY_OLDEST:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode, 'categoryInfo.code': categoryCode }).sort({ createdAt: 1 });
            case TransactionFilterCodeEnum.TYPE_CATEGORY_NEWEST:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode, 'categoryInfo.code': categoryCode }).sort({ createdAt: -1 });
            case TransactionFilterCodeEnum.TYPE_CATEGORY_LOWEST:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode, 'categoryInfo.code': categoryCode }).sort({ amount: 1 }).limit(1);
            case TransactionFilterCodeEnum.TYPE_CATEGORY_HIGHEST:
                return await this.userTransactionModel.find({ userId, 'typeInfo.code': typeCode, 'categoryInfo.code': categoryCode }).sort({ amount: -1 }).limit(1);
            default:
                return new BadRequestException(UserTransactionResponseMessageEnum.FILTER_CODE_NOT_FOUND);

        }
    }
    


    
}