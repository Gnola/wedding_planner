const express = require('express');

const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema ({
  name: {type:String, required: true},
  plusOne: {type:String, default: 'None'},
  rsvp: {type:String, default: 'Not sure yet'},
  category: {type:String, default: 'None'},
  email: String,
  phone: Number,
  street: String,
  city: String,
  state: String,
  zip: Number,
  // invited: Boolean,
})

const Guest = mongoose.model('Guest', guestSchema);
module.exports = Guest
