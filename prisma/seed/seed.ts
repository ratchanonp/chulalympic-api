import { PrismaClient } from '@prisma/client';
import { FACULTY, SPORT, SPORT_CATEGORY, VENUE } from './constants';
const prisma = new PrismaClient();

async function facultySeed() {
  console.log('Seeding faculty');
  await prisma.faculty.createMany({
    data: FACULTY,
  });
}

async function venueSeed() {
  console.log('Seeding venue');
  await prisma.venue.createMany({
    data: VENUE,
  });
}

async function sportSeed() {
  console.log('Seeding sports');
  SPORT.map(async (sports) => {
    await prisma.sport.upsert({
      where: {
        code: sports.code,
      },
      update: {
        name: sports.name,
      },
      create: {
        code: sports.code,
        name: sports.name,
      },
    });
  });
}

async function sportCategorySeed() {
  console.log('Seeding sport category');
  await prisma.sportCategory.createMany({
    data: SPORT_CATEGORY,
  });
}

async function clearTable() {
  console.log('Clearing table');

  await prisma.faculty.deleteMany();
  console.log('Clearing faculty table');

  await prisma.venue.deleteMany();
  console.log('Clearing venue table');

  await prisma.sport.deleteMany();
  console.log('Clearing sport table');

  await prisma.sportCategory.deleteMany();
  console.log('Clearing sport category table');
}

async function main() {
  await clearTable();
  await facultySeed();
  await venueSeed();
  await sportSeed();
  await sportCategorySeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
