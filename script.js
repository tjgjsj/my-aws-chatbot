// Replace this with your actual API Gateway URL
const API_URL = 'https://2sj95sxfwc.execute-api.us-east-1.amazonaws.com/chat';

function addMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const question = input.value.trim();
    
    if (!question) return;
    
    // Add user message to chat
    addMessage(question, true);
    
    // Clear input
    input.value = '';
    
    // Show loading message
    addMessage('Thinking... 🤔');
    
    try {
        // Send question to your chatbot
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question
            })
        });
        
        const data = await response.json();
        
        // Remove loading message
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.removeChild(chatMessages.lastChild);
        
        // Add bot response
        addMessage(data.answer);
        
    } catch (error) {
        // Remove loading message
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.removeChild(chatMessages.lastChild);
        
        // Show error message
        addMessage('Oops! Something went wrong. Try again!');
    }
}

function askExample(question) {
    document.getElementById('user-input').value = question;
    sendMessage();
}

// Allow pressing Enter to send message
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Welcome message when page loads
window.onload = function() {
    addMessage('Hello! I\'m your chatbot. Ask me anything! 👋');
};