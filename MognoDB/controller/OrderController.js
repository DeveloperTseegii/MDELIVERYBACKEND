const express = require("express");
const Order = require("../models/Order");
const { validationResult } = require("express-validator");

const getOrder = (req, res, next) => {
  Order.find({}, function (err, data) {
    if (err)
      req.json({
        success: false,
        data: err,
      });
    else
      res.json({
        success: true,
        data: data,
      });
  });
};

const findOne = (req, res, next) => {
  const _id = req.params.id;
  Order.findById({ _id }, function (err, data) {
    if (err)
      req.json({
        success: false,
        data: err,
      });
    else
      res.json({
        success: true,
        data: data,
      });
  });
};

const createOrder = (req, res, next) => {
  const data = req.body;
  Order.create(data, function (err, data) {
    if (err)
      res.json({
        success: false,
        data: err,
      });
    else
      res.json({
        success: true,
        data: data,
      });
  });
};
const deleteOrder = (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  Order.findOneAndDelete({ _id: id }, data, function (err, data) {
    if (err)
      res.json({
        success: false,
        data: err,
      });
    else
      res.json({
        success: true,
        data: data,
      });
  });
};

const updateOrder = (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  Order.updateOne({ _id: id }, data, function (err, data) {
    if (err)
      res.json({
        success: false,
        data: err,
      });
    else
      res.json({
        success: true,
        data: data,
      });
  });
};
module.exports = {
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
  findOne,
};
