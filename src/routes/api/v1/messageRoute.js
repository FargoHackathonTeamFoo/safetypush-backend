import { Router } from 'express'
import webPush from 'web-push'
import { getSubscribers } from '~/controllers/subscriber'
import { pushMessage, getAllMessages } from '~/controllers/message'

const r = Router()

const subscriberToWebPush = (subscriber) => ({
  endpoint: subscriber.endpoint,
  keys: {
    p256dh: subscriber.p256dh,
    auth: subscriber.auth,
  }
})

r.get('/', async (req, res, next) => {
  //res.json(getMessagesForSubscriber(req.params.id))
  res.join(getAllMessages())
})

r.post('/', async (req, res, next) => {
  // todo auth
  let payload = {
    title: req.body.title,
    message: req.body.message,
    channel: req.body.channel
  }

  // todo commit msg to db

  let subscribers = await getSubscribers()
  subscribers.forEach(subscriber => {
    webPush.sendNotification(subscriberToWebPush(subscriber), JSON.stringify(payload), {})
      .then(response => {
        console.log(response)
      })
  })

  res.send("Notification sent!")
})

export default r
