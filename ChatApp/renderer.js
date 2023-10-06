const { ipcRenderer } = require('electron');

// Referências a elementos da interface do usuário
const messageInput = document.getElementById('message-input');
const chatOutput = document.getElementById('chat-output');

// Função para adicionar uma mensagem ao chat
function addMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatOutput.appendChild(messageDiv);
}

// Evento de envio de mensagem
document.getElementById('send-button').addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    // Adicione a mensagem ao chat localmente
    addMessage('Você', message);

    // Envie a mensagem para o processo principal (main.js) usando IPC
    ipcRenderer.send('message', message);

    // Limpe o campo de entrada
    messageInput.value = '';
  }
});

// Evento para receber mensagens do processo principal
ipcRenderer.on('message', (event, message) => {
  // Adicione a mensagem recebida ao chat
  addMessage('Outro Usuário', message);
});
