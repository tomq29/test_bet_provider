import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';
import localDB from '../model/db.js';

const prisma = new PrismaClient();

const hello: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/hello', async function (request, reply) {
    const allUsers = await prisma.user.findMany();

    return { message: 'Hello, World!', allUsers, localDB };
  });
};

export default hello;
