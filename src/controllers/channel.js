import db from '~/libs/db'
import { SqlParametersManager, HttpError, hasRequiredFields } from '~/utils'

const getChannels = async () => {
  const query = `
    SELECT * FROM channel;
  `
  const { rows } = await db.query(query)
  return rows
}

export {
  getChannels,
}
