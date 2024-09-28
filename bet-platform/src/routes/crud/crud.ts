import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../model/prisma.js';
import { z } from 'zod';

const createUserBody = z.object({
  login: z.string(),
  password: z.string(),
});
const updateUserBody = z.object({
  login: z.optional(z.string()),
  password: z.optional(z.string()),
});

const getUserParam = z.object({
  id: z.string(),
});

const crud: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/users', async function (request, reply) {
    try {
      const allUsers = await prisma.user.findMany();
      return reply.code(200).send({ data: allUsers });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.get('/users/:id', async function (request, reply) {
    try {
      const { id } = getUserParam.parse(request.params);

      const user = await prisma.user.findUnique({
        where: { id: +id },
      });
      if (!user) {
        return reply.code(404).send({ message: 'User not found' });
      }
      return reply.code(200).send({ data: user });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.post('/users', async function (request, reply) {
    try {
      const { login, password } = createUserBody.parse(request.body);
      const user = await prisma.user.create({ data: { login, password } });
      return reply.code(201).send({ data: user });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.put('/users/:id', async function (request, reply) {
    try {
      const { login, password } = updateUserBody.parse(request.body);
      const { id } = getUserParam.parse(request.params);

      const user = await prisma.user.findUnique({ where: { id: +id } });

      if (!user) {
        return reply.code(404).send({ data: 'User not found' });
      }

      const result = await prisma.user.update({
        where: { id: +id },
        data: { login, password },
      });
      return reply.code(200).send({ data: result });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.delete('/users/:id', async function (request, reply) {
    try {
      const { id } = getUserParam.parse(request.params);

      const user = await prisma.user.findUnique({ where: { id: +id } });

      if (!user) {
        return reply.code(404).send({ data: 'User not found' });
      }

      await prisma.user.delete({ where: { id: +id } });
      return reply.code(200).send({ data: 'User deleted' });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
};

export default crud;
