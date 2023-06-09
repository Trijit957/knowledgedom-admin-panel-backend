import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/models/user/user.model";
import { CategoryInterface } from "../transaction/transaction.interface";
import { UserCategoryDTO } from "./user.dto";
import { UserCategoryAddResponseInterface, UserCategoryResponseMessageEnum } from "./user.interface";

@Injectable()
export class UserService {
    
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}

    public async getCategory(email: string): Promise<Array<CategoryInterface> | HttpException> {
            if(!email) {
                throw new BadRequestException(UserCategoryResponseMessageEnum.EMAIL_REQUIRED);
            } else {
                const user = await this.userModel.findOne({ email });
                if (!user.categories) {
                    return [];
                } else {
                    return user.categories;
                }
            }
    }

    public async createCategory(userWithCategory: UserCategoryDTO): Promise<UserCategoryAddResponseInterface | HttpException> {

        const updatedUser = await this.userModel.findOneAndUpdate(
                                                    { email: userWithCategory.email }, 
                                                    { $push: { categories: userWithCategory } }, 
                                                    { new: true }
                                                );

        return {
            isCategoryAdded: true,
            message: UserCategoryResponseMessageEnum.CATEGORY_ADDED,
            userInfo: updatedUser
        };
    }

    public async updateCategory(userWithCategory: UserCategoryDTO): Promise<UserCategoryAddResponseInterface | HttpException> {
            
        const { categoryCode } = userWithCategory;

        const updatedUser = await this.userModel.findOneAndUpdate(
                                                    { email: userWithCategory.email, "categories.categoryCode": categoryCode },
                                                    { 
                                                        $set: { 
                                                        "categories.$.name": userWithCategory.name,
                                                        "categories.$.iconImageUrl": userWithCategory.iconImageUrl,
                                                      } 
                                                    },
                                                    { new: true }
                                                );

        return {
            isCategoryUpdated: true,
            message: UserCategoryResponseMessageEnum.CATEGORY_UPDATED,
            userInfo: updatedUser
        }
    }

    public async deleteCategory(userWithCategory: { email: string, categoryCode: number }): Promise<UserCategoryAddResponseInterface | HttpException> {

        const { email, categoryCode } = userWithCategory;

        if(!email || !categoryCode) {
            throw new BadRequestException(UserCategoryResponseMessageEnum.EMAIL_CATEGORY_REQUIRED);
        } else {
                    const updatedUser = await this.userModel.findOneAndUpdate(
                        { email },
                        { $pull: { categories: { categoryCode } } },
                        { new: true }
                    );

            return {
                isCategoryDeleted: true,
                message: UserCategoryResponseMessageEnum.CATEGORY_DELETED,
                userInfo: updatedUser
            }
        }

    }
}