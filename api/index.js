export default async function handler(req, res) {
    res.status(200).json({
        message: "Welcome to the API server",
    });
}