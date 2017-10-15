import { Router } from 'express'
import config from '~/config'
import webPush from 'web-push'
import subscribers from '~/controllers/subscriber_dumb'

const r = Router()

webPush.setVapidDetails(
  config.vapid.subject,
  config.vapid.publicKey,
  config.vapid.privateKey
)

r.post('/', async (req, res, next) => {
  let endpoint = req.body['notificationEndPoint']
  let publicKey = req.body['publicKey']
  let auth = req.body['auth']

  let pushSubscription = {
      endpoint: endpoint,
      keys: {
          p256dh: publicKey,
          auth: auth
      }
  }

  subscribers.push(pushSubscription)

  res.send('Subscription accepted!')
})

r.delete('/', async (req, res, next) => {
  let endpoint = req.body['notificationEndPoint'];

  subscribers = subscribers.filter(subscriber => { endpoint == subscriber.endpoint });

  res.send('Subscription removed!');
})

export default r
