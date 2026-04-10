# Employee Payroll

A Node/Express payroll application with EJS views and MongoDB persistence.

## Deployment Options

### 1) Deploy to a Platform-as-a-Service (recommended)

Use Render, Railway, or Heroku. The app already includes a `Procfile` so it can run on Heroku-like platforms.

Required environment variables:
- `MONGODB_URI`, `DATABASE_URL`, `MONGO_URI`, or `MONGO_URL` — your MongoDB connection string
- `PORT` — optional, defaults to `3000`

#### Render / Heroku steps
1. Push this repository to GitHub.
2. Create an app on Render, Railway, or Heroku.
3. Connect the app to your repository.
4. Add the required environment variables in the dashboard.
5. Deploy.

### 2) Deploy with Docker

Build and run locally:

```bash
docker build -t employee-payroll .
docker run -e MONGODB_URI="your_mongo_uri" -e PORT=3000 -p 3000:3000 employee-payroll
```

### 3) MongoDB setup

If you do not already have MongoDB hosted, use MongoDB Atlas:
1. Create a free cluster at https://www.mongodb.com/cloud/atlas.
2. Create a database user.
3. Whitelist your app's IP or use cloud access.
4. Copy the connection string and set it as `MONGODB_URI`.

## Notes

- The app opens WhatsApp directly on the device using a WhatsApp link.
- No WhatsApp Cloud API credentials are required; the message opens in WhatsApp for the user to send manually.
