(function() {
  var Ship, Socket, yasw;

  yasw = require('./../../src/yasw_server');

  ({Socket} = require('engine.io-client'));

  Ship = require('./../../src/ship').Ship;

  describe('the server, when asked for ship data ', function() {
    var check_acceleration, check_angular_velocity, check_clone, check_fire, check_stop_screen_updates, server, setup_ship;
    server = void 0;
    beforeEach(function() {
      server = yasw.createServer();
      server.game.add_player('0.5328');
      return server.listen(3000);
    });
    setup_ship = function(socket, init_ship, test, done) {
      socket.on('error', function(e) {
        console.log(`Error: ${e}`);
        test.fail(`Socket error: ${e}`);
        return done();
      });
      socket.on('upgradeError', function(e) {
        test.fail(`Upgrade error: ${e}`);
        return done();
      });
      if (init_ship) {
        return init_ship();
      }
    };
    check_angular_velocity = function(ship_command, expected_angular_velocity, server, test, init_ship, done) {
      var socket;
      socket = new Socket('ws://localhost:3000', {
        transports: ['websocket']
      });
      return socket.on('open', function() {
        setup_ship(socket, init_ship, test, done);
        return socket.send(JSON.stringify({
          'command': ship_command
        }), function() {
          return setTimeout((function() {
            expect(server.game.game_field.ships()[0].angular_velocity()).toEqual(expected_angular_velocity);
            return done();
          }), 100);
        });
      });
    };
    check_acceleration = function(ship_command, expected_acceleration, server, test, init_ship, done) {
      var socket;
      socket = new Socket('ws://localhost:3000', {
        transports: ['websocket']
      });
      return socket.on('open', function() {
        setup_ship(socket, init_ship, test, done);
        return socket.send(JSON.stringify({
          'command': ship_command
        }), function() {
          return setTimeout((function() {
            expect(server.game.game_field.ships()[0].acceleration).toEqual(expected_acceleration);
            return done();
          }), 100);
        });
      });
    };
    check_fire = function(ship_command, server, test, init_ship, done) {
      var socket;
      socket = new Socket('ws://localhost:3000', {
        transports: ['websocket']
      });
      return socket.on('open', function() {
        setup_ship(socket, init_ship, test, done);
        spyOn(server.game.game_field.ships()[0], 'fire');
        return socket.send(JSON.stringify({
          'command': ship_command
        }), function() {
          return setTimeout((function() {
            expect(server.game.game_field.ships()[0].fire).toHaveBeenCalled();
            return done();
          }), 100);
        });
      });
    };
    check_clone = function(server, test, done) {
      var socket;
      socket = new Socket('ws://localhost:3000', {
        transports: ['websocket']
      });
      return socket.on('open', function() {
        setup_ship(socket, null, test, done);
        return socket.send(JSON.stringify({
          'command': 'clone'
        }), function() {
          return setTimeout((function() {
            expect(server.game.game_field.ships().length).toEqual(2);
            return done();
          }), 100);
        });
      });
    };
    check_stop_screen_updates = function(server, test, done) {
      var socket;
      socket = new Socket('ws://localhost:3000', {
        transports: ['websocket']
      });
      return socket.on('open', function() {
        var the_ship;
        setup_ship(socket, null, test, done);
        the_ship = server.game.game_field.ships()[0];
        spyOn(the_ship, 'stop_screen_updates');
        return socket.send(JSON.stringify({
          'command': 'stop-screen-updates'
        }), function() {
          return setTimeout((function() {
            expect(the_ship.stop_screen_updates).toHaveBeenCalled();
            return done();
          }), 100);
        });
      });
    };
    it('starts with no ships', function() {
      return expect(server.game.game_field.ships().length).toEqual(0);
    });
    it('sets ship negative angular_velocity on rotate_left', function(done) {
      return check_angular_velocity("rotate_left", -Ship.rotation_rate, server, this, null, done);
    });
    it('sets ship postive angular_velocity on rotate_right', function(done) {
      return check_angular_velocity("rotate_right", Ship.rotation_rate, server, this, null, done);
    });
    it('sets ship no angular_velocity on rotate_stop', function(done) {
      var set_angular_velocity;
      set_angular_velocity = function() {
        return server.game.game_field.ships()[0].angular_velocity(1);
      };
      return check_angular_velocity("rotate_stop", 0, server, this, set_angular_velocity, done);
    });
    it('sets acceleration on thrust_on', function(done) {
      return check_acceleration("thrust_on", 30, server, this, null, done);
    });
    it('sets no acceleration on thrust_off', function(done) {
      var set_acceleration;
      set_acceleration = function() {
        return server.game.game_field.ships()[0].acceleration = 1;
      };
      return check_acceleration("thrust_off", 0, server, this, set_acceleration, done);
    });
    it('fires a bullet on command', function(done) {
      return check_fire('fire', server, this, null, done);
    });
    it('clones the ship on command', function(done) {
      return check_clone(server, this, done);
    });
    it('stops screen updates on command', function(done) {
      return check_stop_screen_updates(server, this, done);
    });
    return afterEach(function() {
      return server.shutdown();
    });
  });

}).call(this);
