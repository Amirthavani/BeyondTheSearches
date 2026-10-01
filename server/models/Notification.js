import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    kind: { type: String, enum: ['event_reminder'], required: true },
    eventName: { type: String, required: true, trim: true, maxlength: 100 },
    eventStartDate: { type: Date, required: true },
    message: { type: String, required: true, trim: true, maxlength: 500 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
)

notificationSchema.index(
  { userId: 1, listId: 1, kind: 1, eventStartDate: 1 },
  { unique: true },
)
notificationSchema.index({ userId: 1, createdAt: -1 })

export const Notification = mongoose.model('Notification', notificationSchema)
