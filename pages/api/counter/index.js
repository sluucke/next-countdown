import nc from 'next-connect'
import db from '../../../utils/db'
import Counter from '../../../models/Counter'
const handler = nc()


handler.get(async (req, res) => {
  await db.connect()
  const counter = await Counter.find()
  await db.disconnect()
  res.send(counter)
})

handler.post(async (req, res) => {
  await db.connect()
  const counter = await new Counter({
    date: req.body.date
  })
  counter.save()
  await db.disconnect()
  return res.status(201).send({ message: 'Successfully created', counter})
})


export default handler