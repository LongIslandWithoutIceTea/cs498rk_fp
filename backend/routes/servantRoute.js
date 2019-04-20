var Servant = require('../models/servant.js')

module.exports = function (router) {
  var status_dict = {
    200: "OK",
    201: "Created",
    404: "Not Found",
    500: "Internal Server Error"
  };
  var servantRoute = router.route('/servants');

  servantRoute.get(function (req, res) {
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

    Servant.find(condition, selection, options, function (err, servant_list) {
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
            data: servant_list
          });
        }else {
          res.json({
            message: status_dict[res.statusCode],
            data: servant_list.length
          });
        }
      }
    });
  })

  var ServantIdRoute = router.route('/servants/:_id');

  ServantIdRoute.get(function (req, res) {
    Servant.findById(req.param('_id'), function (err, servant) {
      if(err) {
        res.status(404);
        res.json({
          message: status_dict[res.statusCode],
          data: []
        });
      }
      res.status(200);
      res.json({
        message: status_dict[res.statusCode],
        data: servant
      });
    });
  })

  return router;
};
