import { Router } from 'express'
import webPush from 'web-push'
import { getSubscribers } from '~/controllers/subscriber'
import { pushMessage, getAllMessages, getMessagesForSubscriber, expireMessage } from '~/controllers/message'

const r = Router()

const subscriberToWebPush = (subscriber) => ({
  endpoint: subscriber.endpoint,
  keys: {
    p256dh: subscriber.p256dh,
    auth: subscriber.auth,
  },
})

r.get('/', async (req, res, next) => {
  //res.json(getMessagesForSubscriber(req.params.id))
  res.json(await getAllMessages())
})

r.post('/', async (req, res, next) => {
  // todo auth
  let payload = {
    affectedGeometry: req.body.affectedGeometry || {'type': 'Polygon', 'coordinates': [[[-180, -90], [-180, 90], [180, 90], [180, -90]]]},
    channel: req.body.channel || 1,
    title: req.body.title,
    pushBody: req.body.pushBody,
    body: req.body.body,
    displayGeometry: req.body.displayGeometry,
  }

  try {
    await pushMessage(payload.affectedGeometry,
      payload.channel,
      payload.title,
      payload.pushBody,
      payload.body,
      payload.displayGeometry)

    // let subscribers = await getSubscribersInGeometry(req.body.affectedGeometry)
    let subscribers = await getSubscribers()
    subscribers.forEach(subscriber =>
      webPush.sendNotification(
        subscriberToWebPush(subscriber),
        JSON.stringify(payload),
        {}))
  } catch (e) {
    res.status(500).send(e)
  }

  res.send('Notification sent!')
})

r.delete('/:id', async (req, res, next) => {
  try {
    await expireMessage(req.params.id)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default r
