import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/UserModel';
import { formatOutput } from '../utils/SendResponse';
import { HTTP_CODES } from '../configs/status-codes.constant';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Secret } from '../configs/secret';

interface IUserRequest extends Request {
  id: any;
}

export class UserController {

  constructor() {
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const name: string = req.body.name;
    const phone: string = req.body.phone;
    const gender: number = req.body.gender;

    try {
      const user: IUser = new User();

      if (!username || username.length < 5) {
        return next(new Error('Tên đăng nhập quá ngắn'));
      }

      if (!name) {
        return next(new Error('Bạn chưa nhập họ tên'));
      }

      if (!phone) {
        return next(new Error('Bạn chưa nhập số điện thoại'));
      }

      if (!password || password.length < 5) {
        return next(new Error('Mật khẩu quá ngắn'));
      }

      await User.count({
        $or: [{username}, {email}]
      }, (err, result) => {
        if (result > 0) {
          return next(new Error('Tên đăng nhập đã bị trùng'));
        }
      });

      user.username = username;
      user.name = name;
      user.email = email;
      user.password = bcrypt.hashSync(password, 10);
      user.phone = phone;
      user.gender = gender;

      await user.save();

      const data = {
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      };

      return formatOutput(res, HTTP_CODES.SUCCESS, data, 'Thành công!');
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const email: string = req.body.email;
    const username: string = req.body.username;
    const password: string = req.body.password;
    const user = await User.findOne({
      $or: [{email}, {username}]
    });

    if (!user) {
      return next(new Error('Tài khoản không hợp lệ'));
    }

    if (await bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email
        },
        Secret.code,
        {
          expiresIn: 86400 // expires in 24 hours
        }
      );

      const data = {
        auth: true,
        token,
        info: {
          username: user.username,
          name: user.name,
          email: user.email,
          phone: user.phone,
          gender: user.gender
        }
      };

      return formatOutput(res, HTTP_CODES.SUCCESS, data, 'Thành công!');
    } else {
      return next(new Error('Sai mật khẩu'));
    }
  }

  public detail(req: IUserRequest, res: Response, next: NextFunction) {
    User.findById(req.id, (err, user) => {
      if (err) { return next(new Error('Có lỗi xảy ra')); }
      if (!user) { return next(new Error('Không tìm thấy người dùng')); }

      const data = {
        username: user.username,
        email: user.email,
        name: user.name,
        gender: user.gender,
        phone: user.phone,
      };

      formatOutput(res, HTTP_CODES.SUCCESS, data, 'Thành công!');
      next();
    });
  }
}
