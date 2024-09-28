import fs from 'fs'; // Node.js file system module to handle file operations
import fetch from 'node-fetch'; // Use node-fetch to handle HTTP requests

// Replace with your actual API key
const apiKey = 'es-6Kh8w7VEnnX7rpCzm7lVlnGb-J8AgGX1tcOC0d9';

// Base URL for Venice.ai API
const baseUrl = 'https://api.venice.ai/api/v1';

// Text Generation Function
const generateText = async () => {
  const textData = {
    model: 'nous-hermes-8b', // Replace with the appropriate text model
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Tell a joke.' }
    ]
  };

  const textResponse = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(textData)
  });

  console.log(`Text Generation Status: ${textResponse.status} - ${textResponse.statusText}`);
  const textResult = await textResponse.json();
  console.log('Text Generation Response:', JSON.stringify(textResult, null, 2));
};

// Image Generation Function
const generateImage = async () => {
  const imageData = {
    model_name: 'fluently-xl', // Use "model_name" for image generation
    prompt: 'A beautiful landscape of mountains during sunset',
    return_binary: true // Ensures the response is returned as binary data
  };

  const imageResponse = await fetch(`${baseUrl}/image/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'image/png' // Explicitly request image format as response
    },
    body: JSON.stringify(imageData)
  });

  console.log(`Image Generation Status: ${imageResponse.status} - ${imageResponse.statusText}`);

  // Check if response contains image data
  const contentType = imageResponse.headers.get('Content-Type');
  if (imageResponse.status === 200 && contentType && contentType.includes('image')) {
    // Save image data to a file
    const buffer = await imageResponse.arrayBuffer();
    const imagePath = 'generated_image.png';
    fs.writeFileSync(imagePath, Buffer.from(buffer));
    console.log(`Image saved to ${imagePath}`);
  } else {
    // Handle non-image response and log the content
    console.log('The response did not contain an image. Content-Type:', contentType);
    const textResponse = await imageResponse.text();
    console.log('Response Text:', textResponse);
  }
};

// Run both text and image generation functions
generateText();
generateImage();
