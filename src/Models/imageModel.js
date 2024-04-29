import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filenames: [{ type: String }],
  paths: [{ type: String }], 
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reviewed: { type: Boolean, default: false },
  created_by: { type: mongoose.Types.ObjectId, ref: 'User' },
  annotations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Annotation' }]
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
