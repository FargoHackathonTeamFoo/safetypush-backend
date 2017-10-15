import { Router } from 'express'
import webPush from 'web-push'
import subscribers from '~/controllers/subscriber_dumb'
import messages from '~/controllers/message_dumb'

const r = Router()

r.get('/', async (req, res, next) => {
  res.json(messages)
})

r.post('/', async (req, res, next) => {
  // todo auth
  let payload = JSON.stringify({
    title: req.body.title,
    message: req.body.message,
    channel: req.body.channel
  })

  messages.push(payload)

  subscribers.forEach(subscriber => {
    webPush.sendNotification(subscriber, payload, {})
      .then(response => {
        console.log(response)
      })
  })

  res.send("Notification sent!")
})

export default r
