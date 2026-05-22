# Setup & Deployment Guide

Guidelines for configuring your local environment and deploying the VeloxTx Gaming engine to production.

## 1. Environment Variables Configuration (`.env`)
Create a `.env` file in the root directory of the project using the following parameters as a template:

```env
PORT=3000
NODE_ENV=development

# Valkey In-Memory Database Config
VALKEY_HOST=localhost
VALKEY_PORT=6379
VALKEY_PASSWORD=YourSecretValkeyPassword
```

# Stripe SDK Config
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
2. Quick Initialization via Docker Desktop
If you are deploying the official Valkey image within a containerized local environment, you can set up and run the password-protected database instance with this command:

Bash
docker run -d --name veloxtx-valkey -p 6379:6379 valkey/valkey:latest --requirepass YourSecretValkeyPassword
3. CLI Connection Verification
To validate that the database is responding properly and prevent NOAUTH errors, open the "Terminal" tab inside Docker Desktop and execute the authenticated ping test:

Bash
valkey-cli -a YourSecretValkeyPassword PING
If your instance is up and properly secured, it will reply with a PONG message.