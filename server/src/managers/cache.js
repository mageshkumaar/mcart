const {promisify} = require('util')
const redis = require('redis')
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})
console.log(`Creatred redis client`)

// AUTH must be first command that must be sent if there's 
// a password is set
if (process.env.REDIS_PASSWORD) {
    redisClient.auth(process.env.REDIS_PASSWORD, (err, res) => {
        console.log("response", res)
        console.log("error", err)
    })
}

// Since redis client 3 doesn't natively support promises, we've to wrap
// it up using promisfy. 
// We won't be needing this when redis client 4 is released
redisClient.getAsync = promisify(redisClient.get).bind(redisClient)
redisClient.setAsync = promisify(redisClient.set).bind(redisClient)

redisClient.on('ready', function () {
    console.log(`Connected to redis at ${process.env.REDIS_HOST} on ${process.env.REDIS_PORT}`)
})

redisClient.on('reconnecting', function () {
    console.log(`Reconnecting to redis at ${process.env.REDIS_HOST} on ${process.env.REDIS_PORT}`)
})

redisClient.on('error', function (err) {
    console.log('Error in redis', err)
})

redisClient.on('end', function (err) {
    console.log('Error in redis', err)
})

global._Cache = redisClient
module.exports = redisClient
