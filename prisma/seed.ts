//seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const categories = [
  'History',
  'Food',
  'Pets',
  'Health',
  'Fashion',
  'Exercise',
  'Others',
];
async function main() {
  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
  });
  console.log('Seed completed');
}

main();
