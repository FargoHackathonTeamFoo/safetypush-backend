import db from '~/libs/db'
import { SqlParametersManager, HttpError, hasRequiredFields } from '~/utils'

const pushMessage = async (longitude, latitude, channel, title, push_body, body, geojson, expired) => {
  //console.log("Here's what i'm going to push to pg", longitude, latitude, webpush)
  const query = `
    INSERT INTO message (affected, channel, title, push_body, body, geojson, expired)
    values (ST_Point($1, $2), $3, $4, $5, $6, $7, $8)
    RETURNING id;
  `
  const { rows } = await db.query(query, [longitude, latitude, channel, title, push_body, body, geojson, expired])
  return rows
}

const getAllMessages = async () => {
  const query = `
    SELECT * FROM messages;
  `
  const { rows } = await db.query(query)
  return rows
}

// todo don't worry about this yet
const getMessagesForSubscriber = async () => {

}

export {
  pushMessage,
  getAllMessages,
}
