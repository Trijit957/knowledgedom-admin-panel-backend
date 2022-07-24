import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import * as serviceAccount from '../config/google-services.json';

import { LoginTicket, OAuth2Client } from 'google-auth-library'; 

const googleClientId = serviceAccount.client[0].oauth_client[1].client_id;

const client = new OAuth2Client(googleClientId);
@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor() { }

    use(req: Request, res: Response, next: Function) {
        const token = req.headers.authorization;
        if (token != null && token != '') {

            client.verifyIdToken({
                idToken: token.replace('Bearer ', ''),
                audience: googleClientId
            }).then((decodedToken: LoginTicket) => {

                const user = {
                        email: decodedToken.getPayload().email
                    }
                req['user'] = user;
                next();

            }).catch((err) => {
                console.error(err);
                this.accessDenied(req.url, res);
            }) 
        } else {
            next();
        }
    }

    private accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied'
        });
    }
}