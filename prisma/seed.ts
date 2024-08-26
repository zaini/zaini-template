import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create two users
    const user1 = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            image: 'https://example.com/images/john.png',
            posts: {
                create: [
                    {
                        title: 'First Post by John',
                        content: 'This is the first post content of John.',
                    },
                    {
                        title: 'Second Post by John',
                        content: 'This is the second post content of John.',
                    },
                ],
            },
        },
    })

    const user2 = await prisma.user.create({
        data: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            image: 'https://example.com/images/jane.png',
            posts: {
                create: [
                    {
                        title: 'First Post by Jane',
                        content: 'This is the first post content of Jane.',
                    },
                    {
                        title: 'Second Post by Jane',
                        content: 'This is the second post content of Jane.',
                    },
                ],
            },
        },
    })

    console.log('Seed data inserted successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
