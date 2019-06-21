import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Secret } from '../configs/secret';
import { HTTP_CODES } from '../configs/status-codes.constant';

export default class VerifyToken {

  constructor() {
  }

  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.access_token;
    if (!token) {
      return res.status(403).json({
        statusCode: HTTP_CODES.ACCESS_DENIED,
        auth: false,
        message: 'Truy cập bị từ chối'
      });
    }

    const decoded = await jwt.verify(token.toString(), Secret.code);
    if (!decoded) {
      return res.status(403).json({
        statusCode: HTTP_CODES.ACCESS_DENIED,
        auth: false,
        message: 'Token không hợp lệ'
      });
    }

    // @ts-ignore
    req.id = decoded.id;
    // @ts-ignore
    req.username = decoded.username;
    // @ts-ignore
    req.email = decoded.email;
    next();
  }
}
