const express = require('express');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema ({
  service: {type:String, default:''},
  price: {type:Number, default: 0, min: 0},
  paid: {type:String, default: "No"},
  payee: String,
  notes: {type:String, default: ''}
})

const Item = mongoose.model('Item', itemSchema);
module.exports = Item
