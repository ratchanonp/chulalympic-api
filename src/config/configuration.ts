export interface Configuration {
  port: number;
  origin: string;
  jwtSecret: string;
}

export const configuration = (): Configuration => {
  return {
    port: parseInt(process.env.PORT, 10) || 3333,
    origin: process.env.ORIGIN || 'http://localhost:3000',
    jwtSecret: process.env.JWT_SECRET || 'secret',
  };
};
