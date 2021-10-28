import nc from 'next-connect'
import Counter from '../../../models/Counter'
import dbConnect from '../../../utils/db'

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET': {
      try {
        const counter = await Counter.find()
        return res.send(counter)
      } catch (error) {
        res.status(400).json({ success: false })
      }
    }
    break
    case 'POST': {
      try {
        const counter = await new Counter({
          date: req.body.date
        })
        counter.save()
        return res.status(201).send({ message: 'Successfully created', counter })
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