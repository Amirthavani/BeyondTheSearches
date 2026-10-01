import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true, maxlength: 40 },
    href: { type: String, required: true, trim: true, maxlength: 200 },
    menuType: { type: String, enum: ['left_menu', 'main_menu'], default: 'main_menu', required: true },
    is_active: { type: Boolean, default: true },
    order: { type: Number, default: 0, min: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true },
)

menuItemSchema.index({ menuType: 1, order: 1 })

export const MenuItem = mongoose.model('MenuItem', menuItemSchema)
