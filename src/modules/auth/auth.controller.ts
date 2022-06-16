import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { UserDTO } from "../user/user.dto";
import { GoogleSignInResponseInterface } from "./auth.interface";
import { AuthService } from "./auth.service";

@Controller('AuthApi')
export class AuthController {
    
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('GoogleLogin')
  public async handleGoogleLogin(
    @Body() requestBody: UserDTO
  ): Promise<GoogleSignInResponseInterface | HttpException> {
    
    const signInResponse = await this.authService.handleLogin(requestBody);
    return signInResponse;
  }
}