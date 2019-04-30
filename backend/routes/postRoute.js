var Post = require('../models/post.js');

module.exports = function (router) {
  var status_dict = {
    200: "OK",
    201: "Created",
    404: "Not Found",
    500: "Internal Server Error"
  };
  var postRoute = router.route('/posts');

  postRoute.get(function (req, res) {
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

    Post.find(condition, selection, options, function (err, post_list) {
      if(err) {
        res.status(404);
        res.json({
          message: status_dict[res.statusCode],
          data:[]
        });
      }else {
        res.status(200);
        if(!count) {
          res.json({
            message: status_dict[res.statusCode],
            data: post_list
          });
        }else {
          res.json({
            message: status_dict[res.statusCode],
            data: post_list.length
          });
        }
      }
    });
  }).post((req, res) => {
    var new_post = new Post();
    new_post.ship_id = req.param('ship_id');
    new_post.ship_name = req.param('ship_name');
    new_post.user_post = req.param('user_post');
    new_post.user_rating = req.param('user_rating');
    new_post.content = req.param('content');

    new_post.save({},(err, post) => {
        if (err){
          res.status(500).send({ message: "Server error", data: [] });
        } else{
          res.status(201).send({ message: "Complete", data: post });
        }
      });
  });

  var postIdRoute = router.route('/posts/:_id');

  postIdRoute.get(function (req, res) {
    Post.findById(req.param('_id'), function (err, post) {
      if(err) {
        res.status(404);
        res.json({
          message: status_dict[res.statusCode],
          data: []
        });
      }else if(!post) {
        res.status(404);
        res.json({
          message: "No Such Post",
          data: []
        });
      }else {
        res.status(200);
        res.json({
          message: status_dict[res.statusCode],
          data: post
        });
      }
    });
  }).put( function (req, res) {
    Post.findById(req.param('_id'), async function (err, post) {
      if(err) {
        res.status(404);
        res.json({
          message: status_dict[res.statusCode],
          data: []
        });
      }else if(!post) {
        res.status(404);
        res.json({
          message: "No Such Post",
          data: []
        });
      }else {
        post.user_rating = req.param('user_rating')?req.param('user_rating'):post.user_rating;
        post.content = req.param('content')?req.param('content'):post.content;
        post.save({},(err, post) => {
          if (err){
            res.status(500).send({ message: "Server error", data: [] });
          } else{
            res.status(201).send({ message: "Complete", data: post });
          }
        });
      }
    });
  }).delete(function (req, res) {
    Post.deleteOne({ _id: req.param('_id') }, function (err, data) {
      if(err) {
        res.status(404);
        res.json({
          message: status_dict[res.statusCode],
          data: []
        });
      }else {
        res.status(200);
        res.json({
          message: status_dict[res.statusCode],
          data: data
        });
      }
    });
  });
  return router;
};
