import db from '~/libs/db'
import { SqlParametersManager, HttpError, hasRequiredFields } from '~/utils'

const pushMessage = async (affectedGeometry, channel, title, pushBody, body, displayGeometry) => {
  const query = `
    INSERT INTO message (affected, channel, title, push_body, body, geojson, expired)
    values (ST_GeomFromGeoJSON($1), $2, $3, $4, $5, $6, false)
    RETURNING id;
  `
  const { rows } = await db.query(query, [affectedGeometry, channel, title, pushBody, body, displayGeometry])
  return rows
}

const getAllMessages = async () => {
  const query = `
    SELECT * FROM messages;
  `
  const { rows } = await db.query(query)
  return rows
}

const getMessagesForSubscriber = async (id) => {
  const query = `
    SELECT message.* FROM message
    JOIN subscriber
    WHERE subscriber.id = $1
    AND ST_CONTAINS(affected, subscriber.location);
  `
  const { rows } = await db.query(query, [id])
  return rows
}

const expireMessage = async (messageId) => {
  const query = `
    UPDATE message SET expired=true WHERE id=$1;
  `
  const { rows } = await db.query(query, [messageId])
  return rows
}

export {
  pushMessage,
  getAllMessages,
  getMessagesForSubscriber,
  expireMessage,
}
