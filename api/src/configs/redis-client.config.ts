import Redis from "ioredis";

export const connection = {
  host: "localhost",
  port: 6379,
};

const redis = new Redis(connection);

export default redis;
