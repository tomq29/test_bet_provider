// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      {
        coefficient: 1.75,
        deadline: new Date(1700000000 * 1000),
        status: 'pending',
      },
      {
        coefficient: 2.1,
        deadline: new Date(1700003600 * 1000),
        status: 'pending',
      },
      {
        coefficient: 1.95,
        deadline: new Date(1700007200 * 1000),
        status: 'pending',
      },
      {
        coefficient: 2.5,
        deadline: new Date(1700010800 * 1000),
        status: 'first_team_won',
      },
      {
        coefficient: 1.85,
        deadline: new Date(1700014400 * 1000),
        status: 'second_team_won',
      },
      {
        coefficient: 2.0,
        deadline: new Date(1700018000 * 1000),
        status: 'pending',
      },
      {
        coefficient: 1.6,
        deadline: new Date(1700021600 * 1000),
        status: 'pending',
      },
      {
        coefficient: 2.2,
        deadline: new Date(1700025200 * 1000),
        status: 'pending',
      },
      {
        coefficient: 1.9,
        deadline: new Date(1700028800 * 1000),
        status: 'pending',
      },
      {
        coefficient: 2.05,
        deadline: new Date(1700032400 * 1000),
        status: 'pending',
      },
      {
        coefficient: 1.7,
        deadline: new Date(1700036000 * 1000),
        status: 'pending',
      },
      {
        coefficient: 2.3,
        deadline: new Date(1700039600 * 1000),
        status: 'pending',
      },
    ],
  });

  console.log('Seed data inserted successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
