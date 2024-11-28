const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatbox = document.querySelector('.chatbox');

sendButton.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        addChatMessage(userMessage, 'outgoing');
        chatInput.value = '';
        getChatResponse(userMessage);
    }
});

function addChatMessage(message, type) {
    const messageElement = document.createElement('li');
    messageElement.className = type;
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

function getChatResponse(userMessage) {
    // Fetch response from CSV database or API
    // For demonstration, we will simulate a response
    setTimeout(() => {
        const botResponse = "This is a simulated response.";
        addChatMessage(botResponse, 'incoming');
    }, 1000);
}
