var Course = require('mongoose').model('Course');

exports.getCourses = getCourses;
exports.getCourseById = getCourseById;

function getCourses(req, res) {
  Course.find({}).exec(function(err, collection) {
    if (err) {console.log(err);}
    res.send(collection);
  });
}

function getCourseById(req, res) {
  var id = req.params.id;
  console.log('id:' + id);
  if (id === undefined) {
    console.log('Undefined course id.');
    res.end();
  }
  Course.findOne({_id: id}).exec(function(err, course) {
    res.send(course);
  });
}
