import fp from 'fastify-plugin';
import fastifyFormbody, { FastifyFormbodyOptions } from '@fastify/formbody';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<FastifyFormbodyOptions>(async (fastify) => {
  fastify.register(fastifyFormbody);
});
