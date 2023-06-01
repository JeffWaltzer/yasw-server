import Message from '../message'

describe('Message', () => {

  var message;

  beforeEach(()=>{
    message = new Message({data: '3{}'})
  })

  it("finds correct type", () =>{
    expect(message.type()).toEqual('3')
  })

 it("finds correct payload", () =>{
    expect(message.payload()).toEqual('{}')
  })

})