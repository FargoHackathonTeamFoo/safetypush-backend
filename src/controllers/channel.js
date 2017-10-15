import db from '~/libs/db'
import { SqlParametersManager, HttpError, hasRequiredFields } from '~/utils'

const getChannels = async () => {
  //console.log("Here's what i'm going to push to pg", longitude, latitude, webpush)
  const query = `
    Select * from channel;
  `
  const { rows } = await db.query(query)
  console.log("heres the result:", rows)
  return rows
}

export {
  getChannels
}
