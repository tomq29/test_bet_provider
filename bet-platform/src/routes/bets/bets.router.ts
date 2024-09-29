import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../utils/prisma.js';
import axios from 'axios';
import { PROVIDER_URL } from '../../utils/provider.url.js';
import { EventType } from '../../types/eventType.js';

const betCreateBody = z.object({
  eventID: z.number(),
  amount: z.number().positive().finite().safe(),
});

const reqParam = z.object({
  id: z.coerce.number(),
});

const betsRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (req, reply) {
    try {
      const bets = await prisma.bet.findMany();
      return reply.code(200).send({ data: bets });
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });

  fastify.get('/:id', async function (req, reply) {
    try {
      const { id } = reqParam.parse(req.params);
      const bet = await prisma.bet.findUnique({ where: { id } });

      if (!bet) {
        return reply.code(404).send({ data: 'Bet not found' });
      }

      return reply.code(200).send({ data: bet });
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });

  fastify.post('/', async function (req, reply) {
    try {
      const { eventID, amount } = betCreateBody.parse(req.body);

      const response = await axios.get<EventType>(
        `${PROVIDER_URL}/events/actual/${eventID}`,
        {
          timeout: 5000,
        }
      );

      if (response.status === 200) {
        const event = response.data.data;

        const potentialWin = amount * event.coefficient;

        const bet = await prisma.bet.create({
          data: { eventID, amount, potentialWin },
        });

        return reply.code(201).send({ data: bet });
      } else {
        return reply.status(502).send({
          error: 'Bad Gateway',
          message: 'Failed to fetch events from provider',
        });
      }
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });
};

export default betsRouter;
