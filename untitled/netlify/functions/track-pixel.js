const path = require('path');
const fs = require('fs');

exports.handler = async function(event, context) {
    // Capture request details: IP address, User-Agent, and Timestamp
    const ip = event.headers['x-forwarded-for'] || 'IP Not Found';
    const userAgent = event.headers['user-agent'] || 'User-Agent Not Found';
    const timestamp = new Date().toISOString();

    // Log the details to the Netlify logs
    console.log(`Request Log: Timestamp: ${timestamp}, IP: ${ip}, User-Agent: ${userAgent}`);

    // Path to the 1x1 pixel image in the same folder as this function
    const imagePath = path.resolve(__dirname, '../1x1pixel.png');
    const image = fs.readFileSync(imagePath);

    // Return the 1x1 image as base64-encoded response
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
        },
        body: image.toString('base64'),
        isBase64Encoded: true
    };
};
