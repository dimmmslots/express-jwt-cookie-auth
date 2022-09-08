const redis = require('redis');

let redisconn = redis.createClient({
    url: 'redis://redis-16189.c11.us-east-1-2.ec2.cloud.redislabs.com:16189',
    password: 'RedisPassword123#',
    username: 'redisuser'
});

module.exports = redisconn;
