import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserTransaction, UserTransactionDocument } from "src/models/user-transaction/user-transaction.model";
import { UserTransactionInterface, UserTransactionResponseInterface, UserTransactionResponseMessageEnum } from "./user-transaction.interface";

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
    
}