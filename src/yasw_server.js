var http = require("http");
var engine_io = require('engine.io');
var fs= require('fs');
var url= require('url');
var _= require('underscore');
var ship= require('./ship');
var game= require('./game');
var vector= require('./vector');
var Polygon= require('./polygon').Polygon;

exports.createServer= function(parameters) {
  var yasw_server= {};
  var http_server;

  ship.Ship.rotation_rate = (parameters && parameters.ship_rotation_rate) || Math.PI;
  ship.Ship.acceleration_rate = (parameters && parameters.acceleration_rate) || 1;
  ship.Ship.bullet_speed = (parameters && parameters.bullet_speed) || 10;
  ship.Ship.bullet_lifetime = (parameters && parameters.bullet_lifetime) || 4;

  yasw_server.tick_rate = (parameters && parameters.tick_rate) || 1;

  var top_edge= (parameters && parameters.top_edge) || 600;
  var right_edge= (parameters && parameters.right_edge) || 800;

  yasw_server.field_size= new vector.Vector([right_edge, top_edge]);

  yasw_server.game= new game.Game(yasw_server);

  yasw_server.game.game_field.add_sun({
    position: [yasw_server.field_size.x() / 2, yasw_server.field_size.y() / 2],
    shapes: [
      [new Polygon(
    [
      [0, 20],
      [14, 14],
      [20, 0],
      [14, -14],
      [0, -20],
      [-14, -14],
      [-20, 0],
      [-14, 14]
    ],
  'orange'),
      ],
      [new Polygon(
  [
    [0, 20],
          [0, 40],
          [0, 20],
    [14, 14],
    [20, 0],
    [40, 0],
    [20, 0],
    [14, -14],
    [0, -20],
    [0, -40],
    [0, -20],
    [-14, -14],
    [-20, 0],
    [-40, 0],
    [-20, 0],
    [-14, 14]
  ],
  'orange'),
      ],
    ]
  });

  yasw_server.game.start_ticking(yasw_server.tick_rate);

  yasw_server.on_new_websocket= function(socket) {
    var the_ship;
    var game= yasw_server.game;

    var player = game.add_player();
    game.connect_socket(player, socket);

    the_ship= game.game_field.add_ship();
    game.connect_ship(player, the_ship);

    socket.on('message', _(player.on_message).bind(player));

    socket.on('close', _(game.on_close).bind(game, player), game);

    return the_ship;
  };

  yasw_server.on_request= function(request, response, on_response_headers_written) {
    var filename= url.parse(request.url).pathname;
    if (filename == '/')
      filename= "/index.html";

    if (filename === "/index.html") {
      response.setHeader("location", "/game.html");
      response.statusCode = 302;
      if (on_response_headers_written)
        on_response_headers_written();
      response.end();
      return;
    }

    yasw_server.static_page(filename, response, on_response_headers_written);
  };

  yasw_server.listen= function(port, done) {
    http_server= http.createServer(yasw_server.on_request);

    var listener = http_server.listen(port, function() {if (done) done();});
    var engine_server = engine_io.attach(listener, {allowEIO3: true});
    engine_server.on('connection', yasw_server.on_new_websocket);
    console.log("Ready for games on port %d!", port);
  };

  yasw_server.shutdown= function(done) {
    var self= this;
    http_server.close(function() {if (done) done(); });
    http_server= null;
  };

  yasw_server.on_open =  function(file_extension, response, status, read_stream, on_headers_written) {
    if (file_extension === "js")
      response.setHeader("Content-Type", "text/javascript");
    else if (file_extension === "css")
      response.setHeader("Content-Type", "text/css");
    else
      response.setHeader("Content-Type", "text/html");
    response.statusCode = status;
    read_stream.pipe(response);
    if (on_headers_written)
      on_headers_written();
  };

  yasw_server.static_page= function(page, response, on_headers_written) {
    var filename= "public" + page;
    var file_extension= page.split(".").pop();
    var read_stream= fs.createReadStream(filename);

    read_stream.on('open', function () {
      yasw_server.on_open(file_extension, response, 200, read_stream, on_headers_written);
    });

    read_stream.on('error', function() {
      response.statusCode = 404;
      response.end();
    });
  };

  return yasw_server;
};

