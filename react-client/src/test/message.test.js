import Message from '../message'

describe('Message', () => {

  var message;

  beforeEach(()=>{
    message = new Message({data: '3{}'})
  })

  it("#type", () =>{
    expect(message.type()).toEqual('3')
  })

 it("#payload", () =>{
    expect(message.payload()).toEqual('{}')
  })

})