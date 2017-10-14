import pg from 'pg'
import logger from '~/logger'

// this initializes a connection pool
const pool = new pg.Pool({})

pool.on('error', (err, client) => {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  logger.error(err.stack)
})

export default pool
