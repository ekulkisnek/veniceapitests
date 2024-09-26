// Replace with your actual API key
const apiKey = 'es-6Kh8w7VEnnX7rpCzm7lVlnGb-J8AgGX1tcOC0d9';

// API endpoint for chat completions
const url = 'https://api.venice.ai/api/v1/chat/completions';

// Request data
const data = {
  model: 'nous-hermes-8b', // You can replace this with any available "nous" model
  messages: [
    { role: 'user', content: 'Tell me a fun fact about space.' } // Simple user message
  ]
};

// Sending a POST request to the completion endpoint
fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log('Full Completion Response:', JSON.stringify(result, null, 2));
  })
  .catch(error => {
    console.error('Error:', error);
  });

//Committing this simple version
