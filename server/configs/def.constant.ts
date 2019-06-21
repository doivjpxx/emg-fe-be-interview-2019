export namespace SERVER {
  export const PORT = process.env.PORT || 2000;
  export const IP = process.env.IP || '0.0.0.0';
}

export namespace DB {
  export const URI = '127.0.0.1:27017';
  export const NAME = 'interview';
}

export namespace Global {
  export const GENDER_MALE = 1;
  export const GENDER_FEMALE = 2;
}
