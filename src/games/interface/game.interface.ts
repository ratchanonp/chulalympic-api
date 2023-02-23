import { Prisma } from '@prisma/client';

export interface GameFilter {
  skip?: number;
  take?: number;
  cursor?: Prisma.GameWhereUniqueInput;
  where?: Prisma.GameWhereInput;
  orderBy?: Prisma.GameOrderByWithRelationInput;
}
