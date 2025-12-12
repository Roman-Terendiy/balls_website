# 🚀 Deployment Summary - Static Frontend + API Server

## ✅ Refactoring Complete

The project has been refactored for Namecheap shared hosting:

1. ✅ **Frontend**: Fully static Next.js export (generates `out/` folder)
2. ✅ **API Server**: Standalone Node.js server (`api-server.js`)
3. ✅ **No Next.js API routes**: Removed `app/api/telegram/route.ts`
4. ✅ **Environment variable**: Frontend uses `NEXT_PUBLIC_API_URL`

## 📦 Quick Deployment Steps

### Step 1: Build Static Frontend

```bash
# Set API URL (adjust for your production API)
export NEXT_PUBLIC_API_URL=https://your-api-url.com

# Build static export
npm run build
```

This creates the `out/` folder with all static files.

### Step 2: Deploy Frontend to public_html

Upload **all contents** of `out/` folder to `public_html`:
- `index.html`
- `_next/` folder
- All images and assets

### Step 3: Deploy API Server

1. Upload `api-server.js` to your server
2. In cPanel → Node.js Selector:
   - Create application
   - Startup file: `api-server.js`
   - Set environment variables: `BOT_TOKEN`, `CHAT_ID`, `PORT`
   - Start application

### Step 4: Configure API URL

Before building frontend, set:
```bash
NEXT_PUBLIC_API_URL=https://volleyballsfun.site:PORT
# or your API subdomain/domain
```

Then rebuild: `npm run build`

## 🧪 Testing Locally

**Terminal 1 - API Server:**
```bash
export BOT_TOKEN=your_token
export CHAT_ID=your_chat_id
node api-server.js
```

**Terminal 2 - Frontend:**
```bash
export NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev
```

Visit `http://localhost:3000` and test the form.

## 📝 Key Files

- `api-server.js` - Standalone Telegram API server
- `out/` - Static frontend files (after build)
- `.env.example` - Environment variables template
- `next.config.js` - Configured for static export

## ⚠️ Important Notes

1. **Build-time variable**: `NEXT_PUBLIC_API_URL` must be set **before** building
2. **No runtime config**: Static export doesn't support runtime env vars
3. **Separate deployment**: Frontend and API are deployed separately
4. **CORS**: API server includes CORS headers for cross-origin requests

See `README.md` for detailed deployment instructions.

