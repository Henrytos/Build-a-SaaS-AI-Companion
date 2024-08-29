const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  try {
    await db.Category.createMany({
      data: [
        { name: "famous person" },
        { name: "football player" },
        { name: "Clothing" },
        { name: "influencer" },
        { name: "musician" },
        { name: "actor" },
        { name: "actress" },
        { name: "politician" },
        { name: "scientist" },
        { name: "writer" },
      ],
    });
  } catch (error) {
    console.error(error);
  } finally {
    await db.$disconnect();
  }
}

main();
