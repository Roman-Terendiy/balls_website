# Step-by-Step Deployment Guide for Namecheap

## ✅ Pre-Deployment Checklist

Before starting, make sure you have:
- [x] Project built successfully (`npm run build` completed)
- [ ] Telegram bot created and BOT_TOKEN ready
- [ ] CHAT_ID obtained from Telegram
- [ ] FTP/SFTP credentials for Namecheap hosting
- [ ] cPanel access to your Namecheap account
- [ ] Background images ready (mobile and desktop)

## 📦 Step 1: Prepare Files for Upload

The project is already built! The `.next` folder contains the production build.

**Files/Folders to upload to Namecheap:**
```
public_html/
├── .next/              ← Build output (required)
├── public/             ← Static files & images (required)
├── package.json        ← Dependencies list (required)
├── package-lock.json   ← Lock file (if exists)
├── next.config.js      ← Next.js config (required)
├── server.js           ← Production server (required)
└── node_modules/       ← Will install on server OR upload if small
```

## 🚀 Step 2: Upload Files to Namecheap

### Option A: Using cPanel File Manager
1. Log in to cPanel
2. Open **File Manager**
3. Navigate to `public_html` folder
4. Upload all files/folders listed above
   - Make sure to upload `.next` folder (it's hidden by default, enable "Show Hidden Files")
   - Upload `public` folder with all images

### Option B: Using FTP/SFTP Client
1. Connect to your Namecheap server using FTP/SFTP:
   - **Host:** `ftp.volleyballsfun.site` or your server IP
   - **Username:** Your cPanel username
   - **Password:** Your FTP password
   - **Port:** 21 (FTP) or 22 (SFTP)
2. Navigate to `public_html` folder
3. Upload all files/folders

## 🔧 Step 3: Install Dependencies on Server

### Via cPanel Terminal (if available):
```bash
cd ~/public_html
npm install --production
```

### Via SSH:
```bash
ssh your_username@volleyballsfun.site
cd ~/public_html
npm install --production
```

**OR** upload `node_modules` folder if you have it locally (may be large).

## 🔐 Step 4: Set Environment Variables

### Method 1: Via cPanel Environment Variables (Recommended)

1. In cPanel, find **"Environment Variables"** or go to **"Select PHP Version"** → **"Environment Variables"**
2. Click **"Add Variable"** for each:
   - **Variable Name:** `BOT_TOKEN`  
     **Variable Value:** `your_actual_bot_token_from_botfather`
   - **Variable Name:** `CHAT_ID`  
     **Variable Value:** `your_actual_chat_id`
   - **Variable Name:** `NODE_ENV`  
     **Variable Value:** `production`
   - **Variable Name:** `PORT`  
     **Variable Value:** `3000` (or port assigned by Namecheap)

### Method 2: Via .env.production File

If cPanel doesn't support environment variables:
1. Create `.env.production` file in `public_html`
2. Add:
   ```
   BOT_TOKEN=your_bot_token_here
   CHAT_ID=your_chat_id_here
   NODE_ENV=production
   PORT=3000
   ```
3. Make sure the file is readable (permissions 644)

## ⚙️ Step 5: Configure Node.js Application in cPanel

1. In cPanel, find **"Node.js Selector"** or **"Node.js"** section
2. Click **"Create Application"**
3. Fill in the form:
   - **Application root:** `public_html`
   - **Application URL:** `volleyballsfun.site` or leave default
   - **Application startup file:** `server.js`
   - **Application mode:** `Production`
   - **Node.js version:** Select latest stable (18.x or 20.x)
4. Click **"Create"**
5. After creation:
   - Click **"Run NPM install"** (if button is available)
   - Click **"Restart Application"**

## 📝 Step 6: Verify server.js File

Make sure `server.js` exists in `public_html` with this content:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

## ✅ Step 7: Test Your Website

1. **Visit your website:**
   - Go to `https://volleyballsfun.site`
   - The page should load

2. **Check functionality:**
   - ✅ Background images display correctly
   - ✅ Text is readable
   - ✅ Form appears and is responsive
   - ✅ Submit test form with your name and phone
   - ✅ Check Telegram - you should receive a message

3. **Check application status:**
   - In cPanel → Node.js Selector
   - Verify application shows as **"Running"**
   - Check logs if there are errors

## 🔍 Troubleshooting

### Website doesn't load (404 or error)
- ✅ Verify Node.js app is running in cPanel
- ✅ Check that `.next` folder was uploaded completely
- ✅ Verify `server.js` exists in `public_html`
- ✅ Check application logs in Node.js Selector

### Telegram messages not sending
- ✅ Verify `BOT_TOKEN` is correct (no spaces before/after)
- ✅ Verify `CHAT_ID` is correct (just the number, no quotes)
- ✅ Test bot manually in Telegram first
- ✅ Check server logs for API errors
- ✅ Make sure environment variables are set correctly

### Environment variables not working
- ✅ Try setting via cPanel interface (Method 1)
- ✅ Verify variable names are exact (case-sensitive): `BOT_TOKEN`, `CHAT_ID`
- ✅ Restart Node.js application after setting variables
- ✅ Contact Namecheap support if issues persist

### Port issues
- ✅ Some Namecheap plans assign a specific port
- ✅ Check Node.js Selector for assigned port
- ✅ Update `PORT` environment variable accordingly
- ✅ May need to configure reverse proxy in cPanel

### Can't find Node.js Selector
- ✅ Some shared hosting may not have Node.js
- ✅ Check with Namecheap support about Node.js availability
- ✅ May need to upgrade hosting plan
- ✅ Alternative: Use VPS or dedicated server

## 📞 Need Help?

1. **Check logs:**
   - cPanel → Node.js Selector → View Logs

2. **Test locally first:**
   ```bash
   npm run build
   npm start
   # Visit http://localhost:3000
   ```

3. **Verify file structure:**
   ```bash
   # Via SSH or cPanel Terminal
   cd ~/public_html
   ls -la
   # Should see: .next, public, server.js, package.json
   ```

4. **Contact Namecheap Support:**
   - They can help with Node.js setup
   - Ask about environment variables configuration
   - Request port information if needed

## 🎉 Success!

Once everything is working:
- ✅ Website loads at volleyballsfun.site
- ✅ Form submissions send to Telegram
- ✅ Mobile and desktop images display correctly
- ✅ Responsive design works on all devices

Your landing page is now live! 🚀

