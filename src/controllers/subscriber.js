import db from '~/libs/db'
import { SqlParametersManager, HttpError, hasRequiredFields } from '~/utils'

const pushSubscriber = async (longitude, latitude, webpush) => {
  const query = `
    INSERT INTO subscriber (location, endpoint, p256dh, auth)
    values (ST_Point($1, $2), $3, $4, $5)
    RETURNING id;
  `
  const { rows } = await db.query(query, [
    longitude, latitude,
    webpush.endpoint, webpush.keys.p256dh, webpush.keys.auth])
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
const getSubscribersInGeometry = async (affectedGeometry) => {
  const query = `
    SELECT * FROM subscriber
    WHERE ST_CONTAINS(ST_GeomFromGeoJSON($1), subscriber.location)
  `
  const { rows } = await db.query(query, [affectedGeometry])
  return rows
}

export {
  pushSubscriber,
  getSubscribers,
  getSubscribersInGeometry,
}
