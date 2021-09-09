(function() {
  var bullet, game, ship;

  bullet = require('./../../src/bullet');

  ship = require('./../../src/ship');

  game = require('./../../src/game');

  describe("bullet", function() {
    var the_bullet;
    the_bullet = void 0;
    beforeEach(function() {
      return the_bullet = new bullet.Bullet({});
    });
    it("creates bullet", function() {
      return expect(the_bullet.is_bullet()).toEqual(true);
    });
    it('has default position', function() {
      expect(the_bullet.position().x()).toEqual(0);
      return expect(the_bullet.position().y()).toEqual(0);
    });
    it('has default age', function() {
      return expect(the_bullet.life_left).toEqual(0);
    });
    it('has default velocity', function() {
      expect(the_bullet.velocity().x()).toEqual(0);
      return expect(the_bullet.velocity().y()).toEqual(0);
    });
    return it('has the correct mass', function() {
      return expect(the_bullet.mass()).toEqual(0.01);
    });
  });

  describe("bullet with explicit values", function() {
    var fake_player, fake_ship, the_bullet;
    the_bullet = void 0;
    fake_ship = void 0;
    fake_player = void 0;
    beforeEach(function() {
      var the_game;
      the_game = new game.Game({});
      fake_player = the_game.add_player('Britany Spears');
      fake_ship = the_game.game_field.add_ship();
      return the_bullet = new bullet.Bullet({
        position: [3, 4],
        velocity: [5, 6],
        ship: fake_ship,
        player: fake_player
      });
    });
    it('has correct position', function() {
      expect(the_bullet.position().x()).toEqual(3);
      return expect(the_bullet.position().y()).toEqual(4);
    });
    it('has correct velocity', function() {
      expect(the_bullet.velocity().x()).toEqual(5);
      return expect(the_bullet.velocity().y()).toEqual(6);
    });
    return it('has correct player', function() {
      return expect(the_bullet.player()).toEqual(fake_player);
    });
  });

}).call(this);
