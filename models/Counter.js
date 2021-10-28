import mongoose, { Schema } from 'mongoose'

const counterSchema = new Schema({
  date: { type: String, required: true }
}, {
  timestamps: true
})


const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema)

export default Counter