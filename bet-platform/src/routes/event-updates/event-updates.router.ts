import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../utils/prisma.js';

const StatusEnum = z.enum(['first_team_won', 'second_team_won']);

const eventUpdateBody = z.object({
  id: z.number(),
  coefficient: z.number(),
  deadline: z.string(),
  status: StatusEnum,
});

const eventUpdatesRouter: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.post('/', async function (req, reply) {
    try {
      const { id, status } = eventUpdateBody.parse(req.body);

      await prisma.bet.updateMany({
        where: { eventID: id },
        data: { status: status === 'first_team_won' ? 'won' : 'lost' },
      });

      return reply.status(200).send({ success: true });
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });
};

export default eventUpdatesRouter;
