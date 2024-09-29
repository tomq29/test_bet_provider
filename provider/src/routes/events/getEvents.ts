import { FastifyPluginAsync } from 'fastify';
import { events } from '../../model/events.js';


const getEvents: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    try {
      return reply.code(200).send({ data: events });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
};

export default getEvents;
