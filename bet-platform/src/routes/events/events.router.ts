import { FastifyPluginAsync } from 'fastify';
import axios from 'axios';
import { PROVIDER_URL } from '../../utils/provider.url.js';
import { EventType } from '../../types/eventType.js';

const eventsRouter: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get('/', async function (req, reply) {
    try {
      const response = await axios.get<EventType>(
        `${PROVIDER_URL}/events/actual`,
        {
          timeout: 5000,
        }
      );

      if (response.status === 200) {
        return reply.code(200).send(response.data);
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

export default eventsRouter;
