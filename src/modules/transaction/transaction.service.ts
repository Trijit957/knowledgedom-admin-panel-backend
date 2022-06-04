import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
            const { typeCode, typeName, iconImageUrl, categories } = transaction;

            const newTransaction = new this.transactionModel({
                typeCode,
                typeName,
                iconImageUrl,
                categories
            })

            const insertedTransaction = await newTransaction.save();
            return insertedTransaction;
    }

    public async getTransactions(): Promise<Array<TransactionInterface> | HttpException> {
            const transactions = await this.transactionModel.find();
            return transactions;
    }

    public async getTransaction(transactionCode: number): Promise<TransactionInterface | HttpException> {
       const transaction = await this.transactionModel.findOne({ typeCode: transactionCode });
            if (!transaction) {
                throw new NotFoundException(`Transaction with code ${transactionCode} not found`);
            }
            return transaction;
    }

    public async updateTransaction(transaction: TransactionInterface): Promise<TransactionInterface | HttpException> {
            const { typeCode, typeName, iconImageUrl, categories } = transaction;
            const updatedTransaction = await this.transactionModel.findOneAndUpdate({ typeCode }, { typeCode, typeName, iconImageUrl, categories });
            if(!updatedTransaction) {
                throw new NotFoundException(`Transaction with code ${typeCode} not found`);
            }
            return updatedTransaction;
    }

    public async deleteTransaction(transactionCode: number): Promise<TransactionInterface | HttpException> {
            const deletedTransaction = await this.transactionModel.findOneAndDelete({ typeCode: transactionCode });
            if(!deletedTransaction) {
                throw new NotFoundException(`Transaction with code ${transactionCode} not found`);
            }
            return deletedTransaction;
    }
}
