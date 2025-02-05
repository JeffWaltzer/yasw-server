const WebSocket = require('ws');

// const ws = new WebSocket('ws://www.host.com/path', {
//   perMessageDeflate: false
// });

const yasw = require('./../src/yasw_server');
const Ship = require('./../src/ship').Ship;

describe('the server, when asked for ship data ', function() {
  var check_acceleration, check_angular_velocity, check_clone, check_fire, check_stop_screen_updates, server, setup_ship;
  server = void 0;
  beforeEach(function() {
    server = yasw.createServer();
    server.game.add_player('0.5328');
    server.listen(3000, {write:  (junk) => {}});
  });
  setup_ship = function(socket, init_ship, test, done) {
    socket.on('error', function(e) {
      console.log(`Error: ${e}`);
      test.fail(`Socket error: ${e}`);
      done();
    });
    socket.on('upgradeError', function(e) {
      test.fail(`Upgrade error: ${e}`);
      done();
    });
    if (init_ship) {
      init_ship();
    }
  };
  check_angular_velocity = function(ship_command, expected_angular_velocity, server, test, init_ship, done) {
    var socket;
    socket = new WebSocket('ws://localhost:3000', {
      transports: ['websocket']
    });
    socket.on('open', function() {
      setup_ship(socket, init_ship, test, done);
      socket.send(JSON.stringify({
        'command': ship_command
      }), function() {
        setTimeout((function() {
          expect(server.game.game_field.ships()[0].angular_velocity()).toEqual(expected_angular_velocity);
          done();
        }), 100);
      });
    });
  };
  check_acceleration = function(ship_command, expected_acceleration, server, test, init_ship, done) {
    var socket;
    socket = new WebSocket('ws://localhost:3000', {
      transports: ['websocket']
    });
    socket.on('open', function() {
      setup_ship(socket, init_ship, test, done);
      socket.send(JSON.stringify({
        'command': ship_command
      }), function() {
        setTimeout((function() {
          expect(server.game.game_field.ships()[0].acceleration).toEqual(expected_acceleration);
          done();
        }), 100);
      });
    });
  };
  check_fire = function(ship_command, server, test, init_ship, done) {
    var socket;
    socket = new WebSocket('ws://localhost:3000', {
      transports: ['websocket']
    });
    socket.on('open', function() {
      setup_ship(socket, init_ship, test, done);
      spyOn(server.game.game_field.ships()[0], 'fire');
      socket.send(JSON.stringify({
        'command': ship_command
      }), function() {
        setTimeout((function() {
          expect(server.game.game_field.ships()[0].fire).toHaveBeenCalled();
          done();
        }), 100);
      });
    });
  };
  check_clone = function(server, test, done) {
    var socket;
    socket = new WebSocket('ws://localhost:3000', {
      transports: ['websocket']
    });
    socket.on('open', function() {
      setup_ship(socket, null, test, done);
      socket.send(JSON.stringify({
        'command': 'clone'
      }), function() {
        setTimeout((function() {
          expect(server.game.game_field.ships().length).toEqual(2);
          done();
        }), 100);
      });
    });
  };
  check_stop_screen_updates = function(server, test, done) {
    var socket;
    socket = new WebSocket('ws://localhost:3000', {
      transports: ['websocket']
    });
    socket.on('open', function() {
      var the_ship;
      setup_ship(socket, null, test, done);
      the_ship = server.game.game_field.ships()[0];
      spyOn(the_ship, 'stop_screen_updates');
      socket.send(JSON.stringify({
        'command': 'stop-screen-updates'
      }), function() {
        setTimeout((function() {
          expect(the_ship.stop_screen_updates).toHaveBeenCalled();
          done();
        }), 100);
      });
    });
  };

  it('starts with no ships', function() {
    expect(server.game.game_field.ships().length).toEqual(0);
  });

  it('sets ship negative angular_velocity on rotate_left', function(done) {
    check_angular_velocity("rotate_left", -Ship.rotation_rate, server, this, null, done);
  });

  it('sets ship postive angular_velocity on rotate_right', function(done) {
    check_angular_velocity("rotate_right", Ship.rotation_rate, server, this, null, done);
  });

  it('sets ship no angular_velocity on rotate_stop', function(done) {
    var set_angular_velocity;
    set_angular_velocity = function() {
      server.game.game_field.ships()[0].angular_velocity(1);
    };
    check_angular_velocity("rotate_stop", 0, server, this, set_angular_velocity, done);
  });

  it('sets acceleration on thrust_on', function(done) {
    check_acceleration("thrust_on", 30, server, this, null, done);
  });

  it('sets no acceleration on thrust_off', function(done) {
    var set_acceleration;
    set_acceleration = function() {
      server.game.game_field.ships()[0].acceleration = 1;
    };
    check_acceleration("thrust_off", 0, server, this, set_acceleration, done);
  });

  it('fires a bullet on command', function(done) {
    check_fire('fire', server, this, null, done);
  });

  it('clones the ship on command', function(done) {
    check_clone(server, this, done);
  });

  it('stops screen updates on command', function(done) {
    check_stop_screen_updates(server, this, done);
  });

  afterEach(function() {
    server.shutdown();
  });
});
