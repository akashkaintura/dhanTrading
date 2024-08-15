exports.handler = async function (event, context) {
    if (event.httpMethod === 'POST') {
        try {
            const data = JSON.parse(event.body);
            console.log('Received postback data:', data);
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Postback received successfully' }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to process postback' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};
