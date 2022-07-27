(function() {
  describe("Gamepad creation", function() {
    var Gamepad, the_gamepad;
    beforeEach(module("YASW"));
    the_gamepad = null;
    Gamepad = null;
    beforeEach(inject(function(_Gamepad_) {
      Gamepad = _Gamepad_;
      return the_gamepad = new Gamepad('us', {
        send: function() {}
      });
    }));
    return describe("A new gamepad", function() {
      var the_socket;
      the_socket = null;
      beforeEach(function() {
        the_socket = the_gamepad.command_socket();
        spyOn(the_socket, 'send');
        return the_gamepad.connect();
      });
      return it('sends a stop-screen-updates command', function() {
        var first_message, raw_first_message;
        raw_first_message = the_socket.send.calls.first().args[0];
        first_message = JSON.parse(raw_first_message);
        return expect(first_message.command).toEqual('stop-screen-updates');
      });
    });
  });

}).call(this);
