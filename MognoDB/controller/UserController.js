const express = require("express");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const getUser = (req, res, next) => {
  User.find({}, function (err, data) {
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

const findUser = (req, res, next) => {
  const name = req.params.name;
  User.findOne({}, function (err, data) {
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
const createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  } else {
    const data = req.body;
    User.create(data, function (err, data) {
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
  }
};
const updateUser = (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  User.updateOne({ _id: id }, data, function (err, data) {
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
const deleteUser = (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  User.findOneAndDelete({ _id: id }, data, function (err, data) {
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

module.exports = {
  getUser,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
