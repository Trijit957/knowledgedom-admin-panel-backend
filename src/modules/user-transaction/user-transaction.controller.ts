import { Body, Controller, Get, HttpException, Post, Query } from "@nestjs/common";
import { UserIdDTO } from "../user/user.dto";
import { UserTransactionByFilterDTO, UserTransactionDTO } from "./user-transaction.dto";
import { UserTransactionByFilterInterface, UserTransactionInterface, UserTransactionResponseInterface } from "./user-transaction.interface";
import { UserTransactionService } from "./user-transaction.service";

@Controller('UserApi/UserTransactionApi')
export class UserTransactionController {

    constructor(
        private readonly userTransactionService: UserTransactionService
    ) {}

    @Get('GetAllTransactions')
    public async handleGetAllTransactions(
        @Query() queryParams: UserIdDTO
    ): Promise<Array<UserTransactionInterface> | HttpException> {
        const { userId } = queryParams;
        const allUserTransactions = await this.userTransactionService.getAllUserTransactions(userId);
        return allUserTransactions;
    }

    @Get('GetTransactionsByAppliedFilter')
    public async handleGetTransactionsByAppliedFilter(
        @Query() queryParams: UserTransactionByFilterDTO
    ): Promise<Array<UserTransactionInterface> | HttpException> {

        const filteredTransactions = await this.userTransactionService.getTransactionsByAppliedFilter(queryParams);
        return filteredTransactions;
    }


    @Post('CreateTransaction')
    public async handleInsertTransaction(
        @Body() requestBody: UserTransactionDTO
    ): Promise<UserTransactionResponseInterface | HttpException> {
        const addedUserTransaction = await this.userTransactionService.createUserTransaction(requestBody);
        return addedUserTransaction;
    }
}