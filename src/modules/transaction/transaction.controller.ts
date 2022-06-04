import { Controller, Post, Body, Get, HttpException, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { TransactionDTO } from './transaction.dto';
import { TransactionInterface } from './transaction.interface';
import { TransactionService } from './transaction.service';

@Controller('TransactionApi')
export class TransactionController {

    constructor(
        private readonly transactionService: TransactionService
    ) {}

    @Get('GetTransactions')
    public async handleGetTransactions(): Promise<Array<TransactionInterface> | HttpException> {
       const transactions = await this.transactionService.getTransactions();
       return transactions;
    }

    @Get('GetTransaction')
    public async handleGetTransaction(
        @Param('typeCode', ParseIntPipe) transactionCode: number
    ): Promise<TransactionInterface | HttpException> {
        const transaction = await this.transactionService.getTransaction(transactionCode);
        return transaction;
    }

    @Post('InsertTransaction')
    public async handleInsertTransaction(
        @Body() requestBody: TransactionDTO
    ): Promise<TransactionInterface | HttpException> {
       console.log(requestBody);
       const insertedTransaction = await this.transactionService.insertTransaction(requestBody);
       return insertedTransaction;
    }

    @Put('UpdateTransaction')
    public async handleUpdateTransaction(
        @Body() requestBody: TransactionDTO
    ): Promise<TransactionInterface | HttpException> {

        const updatedTransaction = await this.transactionService.updateTransaction(requestBody);
        return updatedTransaction;
    }

    @Delete('DeleteTransaction')
    public async handleDeleteTransaction(
        @Param('typeCode', ParseIntPipe) transactionCode: number
    ): Promise<TransactionInterface | HttpException> {

        const deletedTransaction = await this.transactionService.deleteTransaction(transactionCode);
        return deletedTransaction;
    }
}
