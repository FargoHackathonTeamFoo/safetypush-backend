import { Router } from 'express'
import { getChannels } from '~/controllers/channel'

const r = Router()

r.get('/', async (req, res, next) => {
  res.json(await getChannels())
})

export default r
