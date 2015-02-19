var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', function (err) {
  if (err) console.log('Could not connect to mongodb');
  else console.log('Successfully connected to mongodb');
});

var BlogModel = mongoose.model('Blog', {
  name: String,
  content: String
});

router.post('/blogs', function (req, res) {
  (new BlogModel(req.body)).save(function (err, result) {
    //if(err && err.name === 'ValidationError') res.status(400).json({ message: err.errors });
    if (err) res.status(500).json({message: 'Sorry! Something broke!'});
    else res.status(201).json(result);
  });
});

router.get('/blogs', function(req, res, next) {
  BlogModel.find({}, {_id: 1, name: 1}, function (err, result) {
    if (err) res.status(500).json({message: 'Cannot find data!'});
    else res.status(200).json(result);
  });
});

router.delete('/blogs/:id', function(req, res) {
  var id = req.params.id;
  BlogModel.findByIdAndRemove(id, req.body, function (err, result) {
    if (err) res.status(404).json({ message: 'Cannot find ' + id});
    else res.status(200).json(result);
  });
});

router.put('/blogs/:id', function (req, res) {
  var id = req.params.id;
  BlogModel.findByIdAndUpdate(id, req.body, function (err, result) {
    if (err) res.status(404).json({ message: 'Cannot find ' + id});
    else res.status(200).json(result);
  });
});

/* GET home page. */
router.get('/blogs/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
