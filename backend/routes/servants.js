var express = require('express'),
  router = express.Router(),
  servant = require('../models/servant');
var mongoose = require('mongoose');

router.get('/', function (req, res) {
  var where = req.query.where;
  var select = req.query.select;
  var sort = req.query.sort;
  var skip = req.query.skip;
  var limit = req.query.limit;
  var count = req.query.count;

  if (where) {
    var query = servant.find(JSON.parse(where));
  }else{
    var query = servant.find();
  }

  if (select) {
    query.select(JSON.parse(select));
  }

  if (sort) {
    query.sort(JSON.parse(sort));
  }

  query.exec({},(err,res_servants) => {
    if (err){
      res.status(500).send({ message: "Server error", data:[], err:err });
    } else{
      var results = res_servants;
      if (skip){
        results = results.slice(skip, results.length);
      }
      if (limit){
        results = results.slice(0,JSON.parse(limit));
      }
      if (count) {
        results = results.length;
      }
      res.status(200).send({ message: "Complete", data:results });
    }
  });

});
/*
router.post('/', function (req, res){
  var name = req.body.name;
  var password = req.body.password;
  var query = servant.find({name:name});
  query.exec({},(err,doc) => {
    if (err){
      res.status(500).send({ message: "Server error", data:[] });
    } else{
      if (doc.length === 0) {
        var msg = new servant({
          name: name,
          password: password
        })
        msg.save({},(err,doc) => {
          if (err){
            res.status(500).send({ message: "Server error", data:[] });
          } else{
            res.status(201).send({ message: "Complete", data:doc });
          }
        });
      }else{
        res.status(500).send({ message: "Try a differnt name", data:[] });
      }
    }
  });
});*/


module.exports = router;
