import fetch from 'node-fetch';
import https from 'https';

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({
            success: false,
            message: "URL parameter is required",
            requestedUrl: null,
            status: null,
            statusText: null,
            responseTime: null
        });
    }

    try {
        // Attempt to check status with SSL verification
        const startTime = Date.now();
        const response = await fetch(`https://${url}`);
        const endTime = Date.now();
        
        res.status(200).json({
            success: true,
            message: "Checked status successfully with valid certificate",
            requestedUrl: `https://${url}`,
            status: response.status,
            statusText: response.statusText,
            responseTime: `${endTime - startTime}ms`
        });
    } catch (error) {
        if (error.message.includes("certificate has expired")) {
            // Retry without SSL verification if the certificate has expired
            try {
                const startTime = Date.now();
                const agent = new https.Agent({ rejectUnauthorized: false });
                const insecureResponse = await fetch(`https://${url}`, { agent });
                const endTime = Date.now();

                res.status(200).json({
                    success: true,
                    message: "Checked status despite expired certificate",
                    requestedUrl: `https://${url}`,
                    status: insecureResponse.status,
                    statusText: insecureResponse.statusText,
                    responseTime: `${endTime - startTime}ms`,
                    reason: "Certificate has expired"
                });
            } catch (insecureError) {
                res.status(500).json({
                    success: false,
                    message: "Certificate has expired, and status check failed with SSL bypass",
                    requestedUrl: `https://${url}`,
                    status: null,
                    statusText: null,
                    responseTime: null,
                    error: insecureError.message
                });
            }
        } else {
            // Other errors
            res.status(500).json({
                success: false,
                message: "An error occurred while checking the URL",
                requestedUrl: `https://${url}`,
                status: null,
                statusText: null,
                responseTime: null,
                error: error.message
            });
        }
    }
}
