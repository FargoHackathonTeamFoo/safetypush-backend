import db from '~/libs/db'
import { SqlParametersManager, HttpError, hasRequiredFields } from '~/utils'

const pushSubscriber = async (longitude, latitude, webpush) => {
  //console.log("Here's what i'm going to push to pg", longitude, latitude, webpush)
  const query = `
    INSERT INTO subscriber (location, webpush)
    values (ST_Point($1, $2), $3)
    RETURNING id;
  `
  const { rows } = await db.query(query, [longitude, latitude, webpush])
  return rows
}

const getSubscribers = async () => {
  const query = `
    SELECT * FROM subscriber;
  `
  const { rows } = await db.query(query)
  return rows
}

// todo don't worry about this
const getSubscibersInGeometry = async () => {

}

export {
  pushSubscriber,
  getSubscribers,
}
