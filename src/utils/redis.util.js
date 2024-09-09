const redis = require("redis");
const parseJSON = require("./parse-json.util");

const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect();

redisClient.on("connect", function () {
  console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

const setData = (key, value) => {
  return redisClient.set(key, JSON.stringify(value)).catch(() => false);
};

const getData = async (key) => {
  let result = await redisClient.get(key).catch(() => false);
  return parseJSON(result);
};

const removeData = (key) => redisClient.del(key);

const exists = async (key) => {
  let result = await redisClient.exists(key).catch(() => false);
  return result === 1;
};

const redisUtil = {
  setData,
  getData,
  removeData,
  exists,
};

module.exports = redisUtil;
