import { Router } from 'express'
import { HttpError, MissingFieldsError } from '~/utils'
import healthRoute from './healthRoute'

const apiV1 = Router()

apiV1.use('/health', healthRoute)

apiV1.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.code).json({ error: err.message })
  } else if (err instanceof MissingFieldsError) {
    res.status(400).json({ error: 'missing fields', fields: err.fields })
  } else {
    next(err)
  }
})

export default apiV1
