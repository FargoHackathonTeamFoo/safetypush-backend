import { Router } from 'express'

const r = Router()

r.get('/', async (req, res, next) => {
  try {
    res.json({ status: 'healthly' })
  } catch (err) {
    res.status(500).json({ status: 'unhealthy' })
  }
})

export default r
