const mongoose = require('mongoose')

const rolSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: true
  }
})

const Role = mongoose.model('Role', rolSchema);

module.exports = Role;
