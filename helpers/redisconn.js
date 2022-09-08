const redis = require('redis');

let redisconn = redis.createClient({
    url: "redis://default:@localhost:6378"
});

module.exports = redisconn;
