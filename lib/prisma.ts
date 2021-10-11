import { PrismaClient } from '@prisma/client';

// @ts-ignore
const prisma: PrismaClient = global.prisma || new PrismaClient();

// @ts-ignore
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
