var User = require('../models/user.js');
var fs = require('fs');

module.exports = function (router) {
  var status_dict = {
    200: "OK",
    201: "Created",
    404: "Not Found",
    500: "Internal Server Error"
  };
  var userRoute = router.route('/users');

  userRoute.get(function (req, res) {
    var condition = req.param('where')?JSON.parse(req.param('where')):{};
    var selection = req.param('select')?JSON.parse(req.param('select')):{};
    var options   = {};
    var count = false;
    if(req.param('sort')) {
      options.sort = JSON.parse(req.param('sort'));
    }
    if(req.param('skip')) {
      options.skip = JSON.parse(req.param('skip'));
    }
    if(req.param('limit')) {
      options.limit = JSON.parse(req.param('limit'));
    }
    if(req.param('count')) {
      count = JSON.parse(req.param('count'));
    }

    User.find(condition, selection, options, function (err, user_list) {
      if(err) {
        res.status(404);
        res.json({
          message: status_dict[res.statusCode],
          data:[]
        });
      }else {
        res.status(200);
        if(!count) {
          for (var i = 0; i < user_list.length; i++) {
            user_list[i]['password'] = undefined;
          }
          res.json({
            message: status_dict[res.statusCode],
            data: user_list
          });
        }else {
          res.json({
            message: status_dict[res.statusCode],
            data: user_list.length
          });
        }
      }
    });
  }).post((req, res) => {
    var new_user = new User();
    new_user.name = req.param('name');
    new_user.password = req.param('password');

    User.find({'name':new_user.name}, function (err, user_list) {
      if (err){
        res.status(500).send({ message: "Server error", data:[] });
      } else{
        if (user_list.length === 0) {
          new_user.save({},(err, user) => {
            if (err){
              res.status(500).send({ message: "Server error", data:[] });
            } else{
              res.status(201).send({ message: "Complete", data:user });
            }
          });
        }else{
          res.status(500).send({ message: "Try a differnt name", data:[] });
        }
      }
    });
  });

  var userIdRoute = router.route('/users/:_id');

  userIdRoute.get(function (req, res) {
    User.findById(req.param('_id'), function (err, user) {
      if(err) {
        res.status(404);
        res.json({
          message: status_dict[res.statusCode],
          data: []
        });
      }
      user['password'] = undefined;
      res.status(200);
      res.json({
        message: status_dict[res.statusCode],
        data: user
      });
    });
  }).put( function (req, res) {
    User.findById(req.param('_id'), function (err, user) {
      if(err) {
        res.status(404);
        res.json({
          message: status_dict[res.statusCode],
          data: []
        });
      }
      name = req.param('name')?req.param('name'):user.name;
      password = req.param('password')?req.param('password'):user.password;
      posts = req.param('posts')?req.param('posts'):user.posts;
      if(name != user.name) {
        User.find({'name':name}, function (err, user_list) {
          if (err){
            res.status(500).send({ message: "Server error", data:[] });
          } else{
            if (user_list.length === 0) {
              user.name = name;
              user.password = password;
              user.posts = posts;
              user.save({},(err, user) => {
                if (err){
                  res.status(500).send({ message: "Server error", data:[] });
                } else{
                  user['password'] = undefined;
                  res.status(201).send({ message: "Complete", data:user });
                }
              });
            }else{
              res.status(500).send({ message: "Try a differnt name", data:[] });
            }
          }
        });
      }else {
        user.name = name;
        user.password = password;
        user.posts = posts
        user.save({},(err, user) => {
          if (err){
            res.status(500).send({ message: "Server error", data:[] });
          } else{
            user['password'] = undefined;
            res.status(201).send({ message: "Complete", data:user });
          }
        });
      }

    });
  });

  var loginRoute = router.route('/users/login');

  loginRoute.post((req, res) => {
    name = req.param('name');
    password = req.param('password');
    User.findOne({'name':name}, (err, user) => {
      if(err) {
        res.status(404);
        res.json({
          success: false,
          message: "Internal Server Error",
          data: []
        });
      }
      if(!user) {
        res.status(404);
        res.json({
          success: false,
          message: "Username does not exist",
          data: []
        });
      }else {
        if(user.password == password) {
          user['password'] = undefined;
          res.status(200);
          res.json({
            success: true,
            message: "Successful login",
            data: user
          })
        }else {
          res.status(404);
          res.json({
            success: false,
            message: "Incorrect password",
            data: []
          })
        }
      }
    })
  });

  var registerRoute = router.route('/users/register');

  registerRoute.post((req, res) => {
    var new_user = new User();
    new_user.name = req.param('name');
    new_user.password = req.param('password');
    new_user.posts = [];

    User.find({'name':new_user.name}, function (err, user_list) {
      if (err){
        res.status(500).send({ message: "Server error", data:[] });
      } else{
        if (user_list.length === 0) {
          new_user.save({},(err, user) => {
            if (err){
              res.status(500).send({ message: "Server error", data:[] });
            } else{
              user['password'] = undefined;
              res.status(201).send({ message: "Complete", data:user });
            }
          });
        }else{
          res.status(500).send({ message: "Try a differnt name", data:[] });
        }
      }
    });
  })
  return router;
};
