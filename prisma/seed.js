import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // 1️⃣ Users
  const usersData = [
    {
      name: "Ahmed",
      email: "ahmed@example.com",
      password: "123456",
      image: "https://avatar.com/a.png",
      status: "online",
    },
    {
      name: "Mona",
      email: "mona@example.com",
      password: "123456",
      image: "https://avatar.com/mona.png",
      status: "offline",
    },
    {
      name: "Ali",
      email: "ali@example.com",
      password: "123456",
      image: "https://avatar.com/ali.png",
      status: "online",
    },
  ];

  const users = [];
  for (const user of usersData) {
    const createdUser = await prisma.user.create({ data: user });
    users.push(createdUser);
  }

  // 2️⃣ Chats
  const chatsData = [
    { name: "Private Chat Ahmed & Mona", isGroup: false },
    { name: "Group Chat Friends", isGroup: true },
  ];

  const chats = [];
  for (const chat of chatsData) {
    const createdChat = await prisma.chat.create({ data: chat });
    chats.push(createdChat);
  }

  // 3️⃣ ChatMembers
  const chatMembersData = [
    { chatId: chats[0].id, userId: users[0].id, role: "member" },
    { chatId: chats[0].id, userId: users[1].id, role: "member" },
    { chatId: chats[1].id, userId: users[0].id, role: "admin" },
    { chatId: chats[1].id, userId: users[1].id, role: "member" },
    { chatId: chats[1].id, userId: users[2].id, role: "member" },
  ];

  for (const member of chatMembersData) {
    await prisma.chatMember.create({ data: member });
  }

  // 4️⃣ Messages
  const messagesData = [
    { text: "Hello Mona!", senderId: users[0].id, chatId: chats[0].id },
    { text: "Hi Ahmed!", senderId: users[1].id, chatId: chats[0].id },
    { text: "Hey friends!", senderId: users[0].id, chatId: chats[1].id },
    { text: "Hello Ahmed!", senderId: users[1].id, chatId: chats[1].id },
    { text: "Hi everyone!", senderId: users[2].id, chatId: chats[1].id },
  ];

  for (const message of messagesData) {
    await prisma.message.create({ data: message });
  }

  console.log("✅ Seed finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
