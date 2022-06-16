import { HttpException, Injectable } from "@nestjs/common";
import { UserInterface } from "../user/user.interface";
import { User, UserDocument } from "../../models/user/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GoogleSignInResponseInterface, GoogleSignInResponseMessage } from "./auth.interface";

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }
  
    public async handleLogin(userInfo: UserInterface): Promise<GoogleSignInResponseInterface | HttpException> {
       const doesUserExist = await this.getUserExistance(userInfo.email);
       if (!doesUserExist) {
              
              const newUser = new this.userModel(userInfo);
              const insertedUser = await newUser.save();
              
              if(insertedUser) {

                return {
                      isSuccessfulSignIn: true,
                      message: GoogleSignInResponseMessage.SIGNUP_SUCCESS,
                      userInfo: insertedUser
                  }
              }
       } else {

        const timestamp = new Date().toISOString(); 

        const user = await this.updateLastLoggedInTime(userInfo.email, timestamp);

          if(user) {

                return {
                    isSuccessfulSignIn: true,
                    message: GoogleSignInResponseMessage.SIGNIN_SUCCESS,
                    userInfo: user
                }
          }
          
       }
    }

    private async getUserExistance(email: string): Promise<boolean> {
        const userCount = await this.userModel.countDocuments({ email });
        return userCount > 0;
    }

    private async updateLastLoggedInTime(email: string, timestamp: string): Promise<UserDocument> {
        const user = await this.userModel.findOneAndUpdate({ email }, { lastLoggedInAt: timestamp }, { new: true });
        return user;
    }
}