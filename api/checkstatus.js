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
            message: "Sertifkat o'z kuchida",
            requestedUrl: `https://${url}`,
            status: response.status,
            statusText: response.statusText,
            responseTime: `${endTime - startTime}ms`
        });
    } catch (error) {
        if (error.message.includes("Sertifikat muddati tugapti")) {
            try {
                const startTime = Date.now();
                const agent = new https.Agent({ rejectUnauthorized: false });
                const insecureResponse = await fetch(`https://${url}`, { agent });
                const endTime = Date.now();

                res.status(200).json({
                    success: true,
                    message: "Sertifikat muddati tugapti",
                    requestedUrl: `https://${url}`,
                    status: insecureResponse.status,
                    statusText: insecureResponse.statusText,
                    responseTime: `${endTime - startTime}ms`,
                    reason: "Sertifikat muddati tugapti"
                });
            } catch (insecureError) {
                res.status(500).json({
                    success: false,
                    message: "Sertifikat muddati tugapti",
                    requestedUrl: `https://${url}`,
                    status: null,
                    statusText: null,
                    responseTime: null,
                    error: insecureError.message
                });
            }
        } else {
            res.status(500).json({
                success: false,
                message: "Bot urlda hatolik",
                requestedUrl: `https://${url}`,
                status: null,
                statusText: null,
                responseTime: null,
                error: error.message
            });
        }
    }
}
