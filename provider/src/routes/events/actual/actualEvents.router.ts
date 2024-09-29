import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../../utils/prisma.js';
import { z } from 'zod';

const reqParam = z.object({
  id: z.coerce.number(),
});

const eventsRouter: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get('/', async function (req, reply) {
    try {
      const events = await prisma.event.findMany({
        where: { deadline: { gte: new Date() } },
      });
      return reply.code(200).send({ data: events });
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });

  fastify.get('/:id', async function (req, reply) {
    try {
      const { id } = reqParam.parse(req.params);
      const event = await prisma.event.findUnique({
        where: { id, deadline: { gte: new Date() } },
      });

      if (!event) {
        return reply.code(404).send({ data: 'Event not found' });
      }

      return reply.code(200).send({ data: event });
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });
};

export default eventsRouter;
