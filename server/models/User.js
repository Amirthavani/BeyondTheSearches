import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    username: { type: String, trim: true, lowercase: true, maxlength: 120 },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'enduser', 'list_owner'], default: 'enduser', index: true },
    eventReminders: { type: Boolean, default: false },
    resetTokenHash: { type: String, select: false },
    resetTokenExpires: { type: Date, select: false },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', userSchema)
