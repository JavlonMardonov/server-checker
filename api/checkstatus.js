import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const response = await fetch(`https://${url}`);
        const status = response.status;
        const statusText = response.statusText;

        let message;
        switch (status) {
            case 200:
                message = "Request was successful (OK)";
                break;
            case 201:
                message = "Resource was created successfully";
                break;
            case 202:
                message = "Request accepted and is being processed";
                break;
            case 204:
                message = "Request was successful with no content to return";
                break;
            case 301:
                message = "Resource has moved permanently";
                break;
            case 302:
                message = "Resource found but temporarily moved";
                break;
            case 304:
                message = "Resource has not been modified";
                break;
            default:
                message = "Received a positive status code";
        }

        res.status(200).json({
            url: `https://${url}`,
            status,
            statusText,
            message
        });
    } catch (error) {
        res.status(500).json({
            url: `https://${url}`,
            error: error.message,
        });
    }
}
