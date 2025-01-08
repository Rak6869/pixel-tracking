const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  // Log details (e.g., timestamp, IP address, user-agent)
  console.log('IP:', event.headers['x-forwarded-for']);
  console.log('User-Agent:', event.headers['user-agent']);
  console.log('Timestamp:', new Date().toISOString());

  // Provide an absolute path to the image file
  const imagePath = path.join(__dirname, '../../caughtyou.png'); // Navigates two levels up to the root

  // Read the image file
  try {
    const image = fs.readFileSync(imagePath);

    // Return the 1x1 pixel image
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
      },
      body: image.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error reading image:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
