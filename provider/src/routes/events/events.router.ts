import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../utils/prisma.js';

const eventsCreateBody = z.object({
  coefficient: z.number(),
  deadline: z.number(),
});
const StatusEnum = z.enum(['pending', 'first_team_won', 'second_team_won']);

const eventUpdateBody = z.object({
  status: StatusEnum,
});

const reqParam = z.object({
  id: z.string(),
});

const eventsRouter: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get('/', async function (req, reply) {
    try {
      const events = await prisma.event.findMany();
      return reply.code(200).send({ data: events });
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });

  fastify.get('/:id', async function (req, reply) {
    try {
      const { id } = reqParam.parse(req.params);
      const event = await prisma.event.findUnique({ where: { id: +id } });

      if (!event) {
        return reply.code(404).send({ data: 'User not found' });
      }

      return reply.code(200).send({ data: event });
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });

  fastify.post('/', async function (req, reply) {
    try {
      const { coefficient, deadline } = eventsCreateBody.parse(req.body);
      const event = await prisma.event.create({
        data: { coefficient, deadline: new Date(deadline * 1000) },
      });
      return reply.code(201).send({ data: event });
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });

  fastify.put('/:id', async function (req, reply) {
    try {
      const { status } = eventUpdateBody.parse(req.body);
      const { id } = reqParam.parse(req.params);

      const event = await prisma.event.findUnique({ where: { id: +id } });

      if (!event) {
        return reply.code(404).send({ data: 'User not found' });
      }

      const result = await prisma.event.update({
        where: { id: +id },
        data: { status },
      });
      return reply.code(200).send({ data: result });
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });
};

export default eventsRouter;
