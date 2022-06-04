import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/models/transaction/transaction.model';
import { TransactionInterface } from './transaction.interface';

@Injectable()
export class TransactionService {

    constructor(
       @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>
    ) {}

    public async insertTransaction(transaction: TransactionInterface): Promise<TransactionInterface | HttpException> {
        try {
            const { typeCode, typeName, iconImageUrl, categories } = transaction;
            const newTransaction = new this.transactionModel({
                typeCode,
                typeName,
                iconImageUrl,
                categories
            })

            const insertedTransaction = await newTransaction.save();
            return insertedTransaction;

        } catch (error) {
           return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getTransactions(): Promise<Array<TransactionInterface> | HttpException> {
        try {
            const transactions = await this.transactionModel.find();
            return transactions;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getTransaction(transactionCode: number): Promise<TransactionInterface | HttpException> {
        try {
            const transaction = await this.transactionModel.findOne({ typeCode: transactionCode });
            return transaction;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async updateTransaction(transaction: TransactionInterface): Promise<TransactionInterface | HttpException> {
        try {
            const { typeCode, typeName, iconImageUrl, categories } = transaction;
            const updatedTransaction = await this.transactionModel.findOneAndUpdate({ typeCode }, { typeCode, typeName, iconImageUrl, categories });
            return updatedTransaction;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async deleteTransaction(transactionCode: number): Promise<TransactionInterface | HttpException> {
        try {
            const deletedTransaction = await this.transactionModel.findOneAndDelete({ typeCode: transactionCode });
            return deletedTransaction;
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
