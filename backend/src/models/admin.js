const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    cost: { type: Number, required: true}, 
    unit: { type: Number, required: true }
});
  
module.exports = mongoose.model('Admin', adminSchema);