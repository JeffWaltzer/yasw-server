(function() {
  describe("game_server", function() {
    var events, game_server;
    beforeEach(module("YASW"));
    game_server = void 0;
    beforeEach(inject(function(_game_server_) {
      return game_server = _game_server_;
    }));
    events = ['rotate_left', 'rotate_right', 'rotate_stop'];
    return _.each(events, function(e) {
      return describe(`when passed a '${e}'`, function() {
        return it("sends it along to the server", function() {
          spyOn(game_server.web_socket, 'send');
          game_server.send(e);
          return expect(game_server.web_socket.send).toHaveBeenCalledWith(`{\"command\":\"${e}\"}`);
        });
      });
    });
  });

}).call(this);
