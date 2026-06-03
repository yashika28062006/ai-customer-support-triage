const { Worker } = require('bullmq')
const redis = require('./redis')

new Worker('email', async (job) => {
  console.log('Sending email:', job.data)
}, { connection: redis })