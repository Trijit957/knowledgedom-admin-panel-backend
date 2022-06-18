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

