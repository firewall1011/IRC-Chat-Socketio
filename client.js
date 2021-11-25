let socket = io();

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');

form.addEventListener('submit', function(e) 
{
  e.preventDefault();   
  
  if(!input) return;
  
  let msg = input.value;
  if (!msg.startsWith('/'))
  {
    socket.emit('user:chat-message', input.value);
  }
  else
  {
    handleCommands(msg);
  }
  
  input.value = '';
});

socket.on('user:chat-message', function(msg)
{
  let item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

function handleCommands(msg) 
{
  let parsedMsg = msg.split(' ');

  if (parsedMsg[0] == "/ping") 
  {
      socket.emit("user:ping", Date.now());
  }
}