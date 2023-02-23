import { Prisma } from '@prisma/client';

export interface FacultyFilter {
  skip?: number;
  take?: number;
  cursor?: Prisma.FacultyWhereUniqueInput;
  where?: Prisma.FacultyWhereInput;
  orderBy?: Prisma.FacultyOrderByWithRelationInput;
}
