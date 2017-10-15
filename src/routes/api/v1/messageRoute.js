import { Router } from 'express'
import { getSubscribers } from '~/controllers/subscriber'
import { pushMessage, getAllMessages, getMessagesForSubscriber } from '~/controllers/message'

const r = Router()

r.get('/', async (req, res, next) => {
  //res.json(getMessagesForSubscriber(req.params.id))
  res.join(getAllMessages())
})

r.post('/', async (req, res, next) => {
  // todo auth
  let payload = JSON.stringify({
    title: req.body.title,
    message: req.body.message,
    channel: req.body.channel
  })

  pushMessage()

  subscribers.forEach(subscriber => {
    webPush.sendNotification(subscriber, payload, {})
      .then(response => {
        console.log(response)
      })
  })

  res.send("Notification sent!")
})

export default r
