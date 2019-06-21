import { Response } from 'express';
export let formatOutput = (
  res: Response,
  statusCode: number,
  data: any,
  message?: string
) => {
  return res.format({
    json: () => {
      res.status(statusCode).json({statusCode, data, message});
    },
    default: () => {
      res.status(406).send();
    }
  });
};
