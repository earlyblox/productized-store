import { db } from '@/lib/db';
import { faker } from '@faker-js/faker';

async function main() {
  console.log('✨ Creating Users');
  await db.user.createMany({
    data: new Array(100).fill(0).map((_) => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })),
  });
  console.log('✅ Done');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
