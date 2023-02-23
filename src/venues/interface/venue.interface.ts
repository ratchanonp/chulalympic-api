import { Prisma } from '@prisma/client';

export interface VenueFilter {
  skip?: number;
  take?: number;
  cursor?: Prisma.VenueWhereUniqueInput;
  where?: Prisma.VenueWhereInput;
  orderBy?: Prisma.VenueOrderByWithRelationInput;
}
