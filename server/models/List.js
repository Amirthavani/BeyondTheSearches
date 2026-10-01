import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    filename: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false },
)

const listSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    itemName: { type: String, required: true, trim: true, maxlength: 100 },
    itemType: { type: String, required: true, trim: true, maxlength: 100 },
    itemTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', index: true },
    otherItemType: { type: String, trim: true, maxlength: 100 },
    eventSubcategory: { type: String, trim: true, maxlength: 120 },
    is_Premium: { type: Boolean, default: false },
    user_is_active: { type: Boolean, default: true },
    admin_is_active: { type: Boolean, default: false },
    views: { type: Number, default: 0, min: 0 },
    likes: { type: Number, default: 0, min: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    address: { type: String, trim: true, maxlength: 300 },
    location: { type: String, trim: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    url: { type: String, trim: true, maxlength: 2048 },
    instagram: { type: String, trim: true, maxlength: 2048 },
    photos: { type: [photoSchema], default: [] },
    message: { type: String, required: true, trim: true, maxlength: 10000 },
  },
  { timestamps: true, collection: 'lists' },
)

export const List = mongoose.model('List', listSchema)
