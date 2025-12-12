# Premium Sports Balls Landing Page

A single-page, non-scrollable landing website for selling sports balls with Telegram integration.

## 🏗️ Architecture

This project is split into two parts:

1. **Static Frontend** - Next.js static export (generates `out/` folder)
2. **Standalone API Server** - Node.js server for Telegram integration (`api-server.js`)

This architecture allows deployment on shared hosting like Namecheap where you can:
- Upload static files to `public_html`
- Run the API server separately using Node.js Selector in cPanel

## Features

- ✅ Single non-scrollable page (no scrolling, no swiping)
- ✅ Full-screen background image
- ✅ Responsive design (mobile & desktop)
- ✅ Contact form with name and phone
- ✅ Telegram bot integration via standalone API server
- ✅ Modern, clean UI

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

#### Frontend (.env.local):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### API Server (set when running):
```bash
export BOT_TOKEN=your_bot_token_here
export CHAT_ID=your_chat_id_here
export PORT=3001
```

#### How to Get Telegram Credentials:

1. **Create a Telegram Bot:**
   - Open Telegram and search for `@BotFather`
   - Send `/newbot` command
   - Follow the instructions to create your bot
   - Copy the token provided (this is your `BOT_TOKEN`)

2. **Get Your Chat ID:**
   - Start a conversation with your new bot
   - Send any message to your bot
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Look for `"chat":{"id": YOUR_CHAT_ID}` in the response
   - Copy the number (this is your `CHAT_ID`)

### 3. Add Background Images

This project uses separate background images for mobile and desktop:

**Mobile Image:**
- Place your mobile background image in the `public/` folder
- Name it `ball-background-mobile.jpg`
- Recommended size: 1080x1920px (portrait orientation)
- Used on devices smaller than 768px width

**Desktop Image:**
- Place your desktop background image in the `public/` folder
- Name it `ball-background-desktop.jpg`
- Recommended size: 1920x1080px (landscape orientation)
- Used on devices 768px width and larger

**Supported formats:** JPG, PNG, WebP

### 4. Run Development Servers

**Terminal 1 - Start API Server:**
```bash
export BOT_TOKEN=your_bot_token
export CHAT_ID=your_chat_id
npm run api:dev
```
API server will run on `http://localhost:3001`

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build Static Frontend

```bash
npm run build
# or
npm run export
```

This generates a static `out/` folder with all HTML, CSS, and JS files ready for deployment.

## 📦 Deployment to Namecheap Shared Hosting

This project is designed for Namecheap shared hosting with two separate deployment steps:

### Part 1: Deploy Static Frontend

#### Step 1: Build Static Export

```bash
npm run build
```

This creates the `out/` folder with all static files.

#### Step 2: Upload to public_html

1. Log into Namecheap cPanel
2. Open **File Manager**
3. Navigate to `public_html`
4. Upload **all contents** of the `out/` folder:
   - All HTML files
   - `_next/` folder (with JS and CSS)
   - `public/` folder (with images)

**OR** upload the entire `out/` folder and rename it, then move contents.

#### Step 3: Verify Frontend

Visit `https://volleyballsfun.site` - the page should load (but form won't work yet until API is set up).

---

### Part 2: Deploy Standalone API Server

#### Step 1: Upload API Server Files

Upload these files to your hosting (can be in `public_html` or separate directory):
- `api-server.js`
- `package.json` (needed for dependencies)

#### Step 2: Install Dependencies via SSH

```bash
ssh your_username@volleyballsfun.site
cd ~/public_html  # or wherever you uploaded the files
npm install --production
```

Note: The API server only needs Node.js built-in modules (http, url), so no additional dependencies required!

#### Step 3: Configure Node.js Application in cPanel

1. In cPanel, go to **"Node.js Selector"** or **"Node.js"**
2. Click **"Create Application"**
3. Fill in:
   - **Application root:** `public_html` (or directory where api-server.js is)
   - **Application URL:** Leave default or create subdomain like `api.volleyballsfun.site`
   - **Application startup file:** `api-server.js` ⭐
   - **Application mode:** `Production`
   - **Node.js version:** Latest (18.x or 20.x)
   - **Port:** `3001` (or any available port)
4. Click **"Create"**

#### Step 4: Set Environment Variables

In Node.js Selector:
1. Find your application
2. Click **"Manage"** or **"Environment Variables"**
3. Add:
   - `BOT_TOKEN` = your Telegram bot token
   - `CHAT_ID` = your Telegram chat ID
   - `PORT` = `3001` (or your assigned port)

#### Step 5: Start the Application

1. In Node.js Selector, click **"Restart Application"**
2. The API server should now be running

#### Step 6: Configure Frontend to Use API

1. In File Manager, edit the static HTML files or create `.env.production` (if using build-time env)
2. **OR** better: Set environment variable before building:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   npm run build
   ```

If your API is on a different port/subdomain, update `NEXT_PUBLIC_API_URL` before building.

**For shared hosting, you'll likely need to:**
- Use the full URL where your API server is accessible
- Example: `NEXT_PUBLIC_API_URL=https://volleyballsfun.site:3001`
- Or set up a subdomain/domain for the API

---

## 🔧 Complete Deployment Checklist

### Frontend:
- [ ] Build static export: `npm run build`
- [ ] Upload `out/` folder contents to `public_html`
- [ ] Verify site loads at `https://volleyballsfun.site`
- [ ] Set `NEXT_PUBLIC_API_URL` environment variable (or rebuild with it)

### API Server:
- [ ] Upload `api-server.js` to server
- [ ] Create Node.js application in cPanel
- [ ] Set startup file to `api-server.js`
- [ ] Set environment variables (`BOT_TOKEN`, `CHAT_ID`, `PORT`)
- [ ] Start/restart the application
- [ ] Test API endpoint: `curl https://your-api-url/api/telegram`

### Final Testing:
- [ ] Visit website
- [ ] Fill out form
- [ ] Submit form
- [ ] Check Telegram for message
- [ ] Test on mobile device

---

## 🚀 Updating the Site

### Update Frontend:
1. Make changes to code
2. Build: `npm run build`
3. Upload new `out/` folder contents to `public_html`

### Update API Server:
1. Make changes to `api-server.js`
2. Upload new file to server
3. Restart Node.js application in cPanel

---

## 📁 Project Structure

```
balls/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main landing page
│   ├── page.module.css    # Page styles
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── public/                 # Static assets
│   ├── ball-background-mobile.jpg
│   └── ball-background-desktop.jpg
├── api-server.js          # Standalone Telegram API server
├── next.config.js         # Next.js configuration (static export)
├── package.json           # Dependencies
└── out/                   # Generated static files (after build)
```

---

## 🔍 Troubleshooting

### Frontend not loading:
- Check that all files from `out/` are uploaded
- Verify `_next/` folder is uploaded
- Check file permissions

### Form not submitting:
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check API server is running
- Check browser console for CORS errors
- Verify API URL is accessible

### API server not starting:
- Check Node.js version (should be 18+)
- Verify `api-server.js` is in correct directory
- Check environment variables are set
- View logs in Node.js Selector

### Telegram messages not sending:
- Verify `BOT_TOKEN` is correct
- Verify `CHAT_ID` is correct
- Test bot manually in Telegram
- Check API server logs

---

## 📞 Support

For deployment issues:
1. Check server logs in cPanel
2. Verify all environment variables
3. Test API endpoint manually
4. Check browser console for errors

---

## License

Private project - All rights reserved
