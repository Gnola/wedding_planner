const express = require('express');

const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema ({
  name: {type:String, required: true},
  plusOne: String,
  rsvp: Boolean
})

const Guest = mongoose.model('Guest', guestSchema);
module.exports = Guest
