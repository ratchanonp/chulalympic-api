import { User } from '@prisma/client';

export type UserWOCredential = Omit<User, 'password'>;
export const selectWithOutCredential = {
  id: true,
  username: true,
  name: true,
  role: true,
  createdAt: true,
};
