import Counter from '../../../models/Counter'
import dbConnect from '../../../utils/db'

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET': {
      try {
        const counterFinded = await Counter.findById(req.query.id)
        return res.send(counterFinded)

      } catch (error) {
        res.status(400).json({ success: false })
      }
    }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}