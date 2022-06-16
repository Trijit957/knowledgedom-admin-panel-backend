import { CategoryInterface } from "../transaction/transaction.interface";

export interface UserInterface {
    name: string;
    email: string;
    profilePictureUrl: string;
    categories: Array<CategoryInterface> | [];
}

