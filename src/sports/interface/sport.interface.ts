import { Prisma } from '@prisma/client';

export interface SportFilter {
  skip?: number;
  take?: number;
  cursor?: Prisma.SportWhereUniqueInput;
  where?: Prisma.SportWhereInput;
  orderBy?: Prisma.SportOrderByWithRelationInput;
}
