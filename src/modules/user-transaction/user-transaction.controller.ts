import { Body, Controller, Get, HttpException, Post } from "@nestjs/common";
import { UserTransactionDTO } from "./user-transaction.dto";
import { UserTransactionResponseInterface } from "./user-transaction.interface";
import { UserTransactionService } from "./user-transaction.service";

@Controller('UserApi/UserTransactionApi')
export class UserTransactionController {

    constructor(
        private readonly userTransactionService: UserTransactionService
    ) {}

   // @Get('GetTransactions')


    @Post('CreateTransaction')
    public async handleInsertTransaction(
        @Body() requestBody: UserTransactionDTO
    ): Promise<UserTransactionResponseInterface | HttpException> {
        const addedUserTransaction = await this.userTransactionService.createUserTransaction(requestBody);
        return addedUserTransaction;
    }
}