import { CategoryInterface } from "../transaction/transaction.interface";

export interface UserInterface {
    name: string;
    email: string;
    profilePictureUrl: string;
    categories: Array<CategoryInterface> | [];
}

export interface UserCategoryInterface extends CategoryInterface {
    email: string;
}

export interface UserCategoryAddResponseInterface {
    isCategoryAdded?: boolean;
    isCategoryUpdated?: boolean;
    isCategoryDeleted?: boolean;
    message: string;
    userInfo: UserInterface;
}

export enum UserCategoryResponseMessageEnum {
    CATEGORY_ADDED = "Category added successfully!",
    CATEGORY_UPDATED = "Category updated successfully!",
    CATEGORY_DELETED = "Category deleted successfully!",
    EMAIL_REQUIRED = "Email is required!",
    EMAIL_CATEGORY_REQUIRED = "Email and Category are required!"
}

