// models/annotationModel.js

import mongoose from 'mongoose';

const annotationSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  boundingBox: {
    type: {
      topLeft: { x: Number, y: Number },
      bottomRight: { x: Number, y: Number }
    },
    required: true
  }
});

const Annotation = mongoose.model('Annotation', annotationSchema);

export default Annotation;
