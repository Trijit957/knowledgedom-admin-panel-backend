import { UserInterface } from "../user/user.interface";

export interface GoogleSignInResponseInterface {
    isSuccessfulSignIn: boolean;
    message: string;
    userInfo: UserInterface;
}

export enum GoogleSignInResponseMessage {
    SIGNUP_SUCCESS = "You have successfully signed up!",
    SIGNIN_SUCCESS = "You have successfully signed in!",
    SIGNUP_FAILURE = "There was an error signing up!",
    SIGNIN_FAILURE = "You have failed to sign in!"
}
