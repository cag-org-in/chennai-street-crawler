var fs = require('fs');
var areas = require(__dirname + '/areas.json');

/*
[{
  "name":"7H BUS STAND",
  "id":"19140",
  "neighborhoods":[
    {
      "name":"MUGAPPAIR",
      "id":"20087",
      "streets":[
        {
          "name":"11TH BLOCK PARISALAI",
          "id":"28034"
        }
      ]
    }
  ]
}]
*/

var csvout = [];
var headers = 'area,area_id,locality_name,locality_id,street,street_id';
csvout.push(headers);

for (var a = 0; a < areas.length; a++) {
  for (var n = 0; n < areas[a].neighborhoods.length; n++) {
    for (var s = 0; s < areas[a].neighborhoods[n].streets.length; s++) {
      csvout.push([
        areas[a].name,
        areas[a].id,
        areas[a].neighborhoods[n].name,
        areas[a].neighborhoods[n].id,
        areas[a].neighborhoods[n].streets[s].name,
        areas[a].neighborhoods[n].streets[s].id
      ].join(','));
    }
  }
}

fs.writeFile(__dirname + '/areas.csv', csvout.join("\n"), function (err) {
  if (err) {
    throw err;
  }
  console.log('finished!');
});
