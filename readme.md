# Server Checker API

This project provides a simple server status checker API, which can validate and fetch data from a specified URL, even when SSL certificates are expired.

## Table of Contents

- [Endpoints](#endpoints)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)

## Endpoints

### 1. **GET /api**

Returns a welcome message to confirm the API is running.

**Response:**

```json
{
  "message": "Welcome to the API server"
}
```

### 2. **GET /api/checkstatus**

Checks the status of a specified URL and handles expired certificates.

**Query Parameters:**

- `url` (required): The URL to check.

**Example Usage:**

```bash
curl "http://localhost:3000/api/checkstatus?url=api.uzchess.glmv.dev"
```

**Successful Response:**

```json
{
  "url": "https://example.com",
  "status": 200,
  "statusText": "OK",
  "message": "Fetched data successfully with valid certificate"
}
```

**Expired Certificate Response:**
If the certificate has expired but data is still fetched, the response includes a `reason` field:

```json
{
  "url": "https://example.com",
  "status": 200,
  "statusText": "OK",
  "message": "Fetched data despite expired certificate",
  "reason": "Certificate has expired"
}
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/server-checker.git
   cd server-checker
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To start the server locally for testing:

```bash
vercel dev
```

Access the API at `http://localhost:3000/api` and `http://localhost:3000/api/checkstatus`.

## Examples

### Checking a URL's Status

```bash
curl "http://localhost:3000/api/checkstatus?url=example.com"
```

### This documentation should help you understand and use the API effectively. Let me know if you have any questions!
