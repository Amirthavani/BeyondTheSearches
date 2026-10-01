import mongoose from 'mongoose'

const eventSubcategorySchema = new mongoose.Schema(
  {
    label: { type: String, required: true, unique: true, trim: true, maxlength: 120 },
    order: { type: Number, required: true, min: 0 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'event_subcategories' },
)

export const EventSubcategory = mongoose.model('EventSubcategory', eventSubcategorySchema)
