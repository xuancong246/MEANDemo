var fs = require("fs");

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
    // return JSON.parse('{"result": "abc"}');
}

function getData(filePath){
    return readJsonFileSync(filePath);
}

exports.getScenarios = getScenarios;

function getScenarios(req, res) {
  var searchText = req.param('searchText'), jsonScenario;
  if (searchText === '') {
    jsonScenario = getData('./server/controllers/json-data/scenario.json');
  }
  else if (searchText === '00') {
    jsonScenario = getData('./server/controllers/json-data/scenario_00.json');
  }
  else if (searchText === 'abcdef') {
    jsonScenario = getData('./server/controllers/json-data/scenario_abcdef.json');
  }

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.json(jsonScenario);
}
