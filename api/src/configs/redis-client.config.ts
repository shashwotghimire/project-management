import Redis from "ioredis";

export const connection = {
  host: process.env.REDIS_HOST ?? "localhost",
  port: 6379,
};

const redis = new Redis(connection);

export default redis;
