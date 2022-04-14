const express = require("express");
const Food = require("../models/Food");
const { validationResult } = require("express-validator");

const get_foods = (req, res, next) => {
  Food.find({}, function (err, data) {
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

const getFindFood = (req, res, next) => {
  const name = req.params.name;
  Food.findOne({ name: name }, function (err, data) {
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

const create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  } else {
    const data = req.body;
    Food.create(data, function (err, data) {
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

const update = (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  Food.updateOne({ _id: id }, data, function (err, data) {
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

const deleteFood = (req, res, next) => {
  Food.findOneAndDelete({
    _id: req.params.id,
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
const foodSearch = (req, res, next) => {
  const name = req.params.name;
  Food.findOne({ name: name }, function (err, data) {
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
  get_foods,
  getFindFood,
  create,
  update,
  deleteFood,
  foodSearch,
};
