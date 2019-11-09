const express = require('express');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema ({
  service: String,
  price: Number,
  paid: String,
  notes: String
})

const Item = mongoose.model('Item', itemSchema);
module.exports = Item
