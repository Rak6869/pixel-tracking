const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    // Log data (e.g., timestamp, IP address, user-agent)
    console.log('IP:', event.headers['x-forwarded-for']);
    console.log('User-Agent:', event.headers['user-agent']);
    console.log('Timestamp:', new Date().toISOString());

    // Correctly resolve the image path
    const imagePath = path.resolve(__dirname, 'caughtyou.png');
    const image = fs.readFileSync(imagePath);

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
        },
        body: image.toString('base64'),
        isBase64Encoded: true
    };
};
