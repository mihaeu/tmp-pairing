var express = require('express');
var router = express.Router();

// DB setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Game = mongoose.model('Game', {
  cardsTurned: Number,
  foundCards: Number,
  cards: [{
    value: Number,
    isFaceUp: Boolean,
    isSolved: Boolean
  }]
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  Game.count(function(err, result) {
  	console.log('COUNT ' + result);
  });
});

router.get('/api', function(req, res) {
  res.json({ pairs: 8 });
});

router.get('/loadgame', function(req, res) {
  Game.findOne().sort({foundCards: -1}).exec(function (err, result) {
  	res.json(result);
  });
});

router.post('/click', function(req, res) {
  console.log(req.param('game'));
  var mongoose = new Game(req.param('game'));
  mongoose.save(function (err) {
    if (err) {
      console.log(err);
    } else {
    	console.log('Maaarkus!');
    }
  });
});

module.exports = router;
