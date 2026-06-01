const redis = require('./redis')

const rateLimiter = async (userId) => {
  const key = `rate:${userId}`
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(key, 60)
  }

  if (count > 10) {
    throw new Error('RATE_LIMIT_EXCEEDED')
  }
}

module.exports = rateLimiter
