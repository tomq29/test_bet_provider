import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to generate date based on offset from current time
const generateDate = (daysOffset: number, hoursOffset: number) => {
  const now = new Date();
  now.setDate(now.getDate() + daysOffset);
  now.setHours(now.getHours() + hoursOffset);
  return now;
};

async function main() {
  await prisma.event.createMany({
    data: [
      // Events from last week (passed)
      {
        coefficient: 1.75,
        deadline: generateDate(-7, -2), // 7 days ago, 2 hours earlier
        status: 'first_team_won',
      },
      {
        coefficient: 2.1,
        deadline: generateDate(-5, -3), // 5 days ago, 3 hours earlier
        status: 'first_team_won',
      },
      {
        coefficient: 1.95,
        deadline: generateDate(-3, -1), // 3 days ago, 1 hour earlier
        status: 'second_team_won',
      },
      // Events for this week (upcoming)
      {
        coefficient: 2.5,
        deadline: generateDate(0, 4), // Today, 4 hours later
        status: 'pending',
      },
      {
        coefficient: 1.85,
        deadline: generateDate(1, 6), // Tomorrow, 6 hours later
        status: 'pending',
      },
      {
        coefficient: 2.0,
        deadline: generateDate(2, 2), // 2 days from now, 2 hours later
        status: 'pending',
      },
      {
        coefficient: 1.6,
        deadline: generateDate(3, 1), // 3 days from now, 1 hour later
        status: 'pending',
      },
      {
        coefficient: 2.2,
        deadline: generateDate(4, 3), // 4 days from now, 3 hours later
        status: 'pending',
      },
      {
        coefficient: 1.9,
        deadline: generateDate(5, 0), // 5 days from now, at this hour
        status: 'pending',
      },
      {
        coefficient: 2.05,
        deadline: generateDate(6, 5), // 6 days from now, 5 hours later
        status: 'pending',
      },
      {
        coefficient: 1.7,
        deadline: generateDate(7, 4), // 7 days from now, 4 hours later
        status: 'pending',
      },
      {
        coefficient: 2.3,
        deadline: generateDate(7, 6), // 7 days from now, 6 hours later
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
