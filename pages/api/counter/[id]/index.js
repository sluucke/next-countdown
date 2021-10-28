import nc from 'next-connect'
import db from '../../../../utils/db'
import Counter from '../../../../models/Counter'
const handler = nc()

handler.get(async (req, res) => {
  await db.connect()
  const counterFinded = await Counter.findById(req.query.id)
  await db.disconnect()
  return res.send(counterFinded)
})


export default handler