import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {   type: String, required: true },
    description: { type: String, required: true },   
    deliveryDate: { type: Date, required: true }, 
    location :{
        address : { type: String, required: true },
        city : { type: String, required: true },
        region : { type: String, required: true },
    },
    images : [{ type: String, required: true }],
    videos : [{ type: String, required: true }],
    units: [{ type:String, ref: 'Unit' }], // Array of Unit IDs
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Project = mongoose.model('Project', ProjectSchema);
  
  export default Project;