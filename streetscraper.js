
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var finalAreas = [];

request('http://chennaicorporation.gov.in/sidewalk/frm_cmpentry.jsp', function (err, rep, body) {
  if (err) {
    throw err;
  }
  var $ = cheerio.load(body);
  var areas = $("select#area option");
  function readArea(a) {
    if (a >= areas.length) {
      fs.writeFile('areas.json', JSON.stringify(finalAreas));
      return console.log('finished city!');
    }

    var area = {
      name: $(areas[a]).text(),
      id: $(areas[a]).attr('value'),
      neighborhoods: []
    };

    request('http://chennaicorporation.gov.in/sidewalk/loc_ajax.jsp?AREA=' + area.id, function (err, rep, body) {
      if (err) {
        throw err;
      }
      var $ = cheerio.load(body);
      var neighborhoods = $('option');

      function readNeighborhood(n) {
        if (n >= neighborhoods.length) {
          console.log('finished area ' + a + ' / ' + (areas.length - 1));
          finalAreas.push(area);
          return setTimeout(function() {
            readArea(a + 1);
          }, 500);
        }

        var neighborhood = {
          name: $(neighborhoods[n]).text(),
          id: $(neighborhoods[n]).attr('value'),
          streets: []
        };

        request('http://chennaicorporation.gov.in/sidewalk/street_ajax.jsp?AREA=' + area.id + '&LOC=' + neighborhood.id, function (err, rep, body) {
          if (err) {
            throw err;
          }
          var $ = cheerio.load(body);
          var streets = $('option');

          function readStreet(s) {
            if (s >= streets.length) {
              console.log('finished neighborhood ' + n + ' / ' + neighborhoods.length);
              area.neighborhoods.push(neighborhood);
              return setTimeout(function() {
                readNeighborhood(n + 1);
              }, 500);
            }

            neighborhood.streets.push({
              name: $(streets[s]).text(),
              id: $(streets[s]).attr('value')
            });
            readStreet(s + 1);
          }
          setTimeout(function() {
            readStreet(1);
          }, 500);
        });
      }
      setTimeout(function() {
        readNeighborhood(1);
      }, 500);
    });
  }
  setTimeout(function() {
    // skip 0th, value = -1
    readArea(1);
  }, 500);
});
