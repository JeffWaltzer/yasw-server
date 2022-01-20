request = require 'request'
yasw = require './../../src/yasw_server'

do_fake_request = (server, page_name) ->
  console.log("--------------------------------- page_name=#{page_name}\n")
  fake_request = {url: "http://localhost:3000#{page_name}"}
  fake_response = {
    headers: {}

    end: () ->
      console.log("end");
#    setHeader: (key, value) ->
#      fake_response.headers[key] = value
#      console.log("setHeader(#{key}, #{value})")
    on: () ->
      console.log("on")
    once: () ->
      console.log("once")
    emit: () ->
      console.log("emit")
    write: () ->
      console.log("write")
  }

  fake_response.setHeader= (key, value) ->
    console.log("before in setHeader fake_response.headers = #{Object.keys(fake_response.headers)}")
    fake_response.headers[key] = value
    console.log("after  in setHeader fake_response.headers = #{Object.keys(fake_response.headers)}")

  junk_on_response_headers_written= () ->
    console.log('j.o.r.h.w.');

  server.on_request(fake_request, fake_response, junk_on_response_headers_written)
  fake_response

check_request= (page_name, expected_file, expected_content_type) ->
  describe "the server, when asked for '#{page_name}'" , ->
    server= undefined
    beforeEach (done) ->
      server= yasw.createServer()
      done()

    it "should call the static page function for #{expected_file}", (done) ->
      spyOn(server, 'static_page').andCallFake (filename, response) ->
        expect(filename).toEqual(expected_file);
        response.end()

      response = do_fake_request(server, page_name)
      expect(server.static_page).toHaveBeenCalled()
      done()

    it "should respond with content type #{expected_content_type}", (done) ->
      file_extension= page_name.split(',').pop()
      response = {
        headers: {}
        setHeader: (key,value)->
          this.headers[key] =  value
      }
      read_stream = {
        pipe: ()->
          console.log('qPipe called');
      }
      status = '200'
      server.on_open(file_extension, response, status, read_stream)
      expect(response.headers['Content-Type']).toEqual(expected_content_type)
      done()

    afterEach (done) ->
      done()

check_content= (page_name, expected_content_regexp) ->
  describe "the server, when asked for '#{page_name}'", ->
    server= undefined
    beforeEach ->
      server= yasw.createServer()

    it "should respond with a page matching", (done) ->
      got_body= []
      fake_request= {
        url: "http://www.example.com"
        once: ->
        connection: {encrypted: false},
        headers: {},
      }
      fake_response= {
        setHeader: ->
        getHeader: ->
        on: ->
        once: ->
        emit: ->
        write: (data) -> got_body.push(data)
        end: (data) ->
          if (data)
            got_body.push(data)
          got_body= Buffer.concat(got_body)
          expect(got_body.toString()).toMatch(expected_content_regexp)
          done()
      }

      server.on_request(fake_request, fake_response)

check_status= (page_name, expected_status) ->
  describe "the server, when asked for '#{page_name}'", ->
    server= undefined
    beforeEach ->
      server= yasw.createServer()

    it "should respond with a status of #{expected_status}", (done) ->
      fake_request= {
        url: "http://www.example.com/#{page_name}"
        once: ->
        connection: {encrypted: false},
        headers: {}
      }
      fake_response= {
        setHeader: ->
        getHeader: ->
        on: ->
        once: ->
        emit: ->
        write: ->
        end: ->
      }

      server.on_request(fake_request, fake_response, ->
        expect(fake_response.statusCode).toMatch expected_status
        done())




#check_request("", "/index.html", "text/html")
#check_status("", 302);
#check_redirect("", 302, "/index.html");
check_request("/game.html", "/game.html", "text/html")
#check_content("/game.html", /Space Wars/)
#check_request("/controllers/ship_command.js", "/controllers/ship_command.js", "text/javascript")
