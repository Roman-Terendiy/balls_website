# 📤 Upload Website to Namecheap cPanel - Step by Step

## ⚠️ Important Note

The URL you provided (`https://volleyballsfun.site:2083/...`) is the **cPanel login page**, not an upload URL. You need to:

1. **Log into cPanel** using that URL
2. **Use File Manager** to upload files
3. **Set up Node.js** for the API server

---

## 📋 Step-by-Step Upload Instructions

### Part 1: Prepare Files for Upload

#### 1. Build Static Frontend

First, build the static export with your API URL:

```bash
# Set your API URL (adjust PORT to your Node.js app port)
export NEXT_PUBLIC_API_URL=https://volleyballsfun.site:3001
# or if you'll use a subdomain:
# export NEXT_PUBLIC_API_URL=https://api.volleyballsfun.site

# Build the static site
npm run build
```

This creates the `out/` folder with all static files.

#### 2. Check Build Output

Verify the `out/` folder contains:
- `index.html`
- `_next/` folder (with JS and CSS)
- Background images (`.jpg` files)

---

### Part 2: Upload to cPanel File Manager

#### Step 1: Log into cPanel

1. Go to: `https://volleyballsfun.site:2083` (or use your cPanel URL)
2. Enter your **cPanel username** and **password**
3. Click **"Log in"**

#### Step 2: Open File Manager

1. In cPanel, find **"Files"** section
2. Click **"File Manager"**
3. Navigate to `public_html` folder

#### Step 3: Upload Files

**Option A: Upload Individual Files/Folders**

1. In File Manager, make sure you're in `public_html`
2. Click **"Upload"** button (top toolbar)
3. Drag and drop OR select files from the `out/` folder:
   - `index.html`
   - `_next/` folder (entire folder)
   - `404.html` (if exists)
   - All `.jpg` image files

**Option B: Create ZIP and Upload**

1. **On your computer**, create a ZIP of `out/` folder contents:
   ```bash
   cd out
   zip -r ../out-upload.zip .
   ```

2. **In File Manager**:
   - Click **"Upload"**
   - Upload `out-upload.zip`
   - After upload, right-click the ZIP file
   - Select **"Extract"**
   - Extract to `public_html`

#### Step 4: Verify Upload

Check that these files/folders exist in `public_html`:
- ✅ `index.html`
- ✅ `_next/` folder
- ✅ Background image files (`.jpg`)

---

### Part 3: Set Up API Server (Node.js)

#### Step 1: Upload API Server File

1. In File Manager, navigate to `public_html` (or create separate folder)
2. Click **"Upload"**
3. Upload `api-server.js`

#### Step 2: Create Node.js Application

1. In cPanel, find **"Software"** section
2. Click **"Node.js Selector"** or **"Setup Node.js App"**
3. Click **"Create Application"**
4. Fill in the form:
   - **Node.js version:** Latest (18.x or 20.x)
   - **Application mode:** Production
   - **Application root:** `public_html` (or your folder)
   - **Application URL:** Leave default OR create subdomain like `api.volleyballsfun.site`
   - **Application startup file:** `api-server.js` ⭐
   - **Passenger log file:** Leave default
   - **Port:** `3001` (or any available port - note this number!)
5. Click **"Create"**

#### Step 3: Set Environment Variables

1. In Node.js Selector, find your application
2. Click **"Manage"** or the app name
3. Go to **"Environment Variables"** or **"Settings"**
4. Add these variables:
   ```
   BOT_TOKEN = your_telegram_bot_token
   CHAT_ID = your_telegram_chat_id
   PORT = 3001 (or your assigned port)
   ```
5. Click **"Save"** or **"Update"**

#### Step 4: Start the Application

1. In Node.js Selector, find your application
2. Click **"Restart Application"** or **"Start"**
3. Check the status - should show **"Running"**

#### Step 5: Note Your API URL

After starting, note your API URL. It might be:
- `https://volleyballsfun.site:PORT`
- `https://api.volleyballsfun.site` (if you created subdomain)
- Check in Node.js Selector for the exact URL

---

### Part 4: Update Frontend with API URL

Since static export needs the API URL at build time:

#### Option 1: Rebuild with Correct URL

1. **On your computer**, set the API URL:
   ```bash
   export NEXT_PUBLIC_API_URL=https://volleyballsfun.site:3001
   # Use the actual port from Node.js Selector
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Re-upload** the new `out/` folder contents to `public_html`

#### Option 2: Manual Edit (Quick Fix)

If you don't want to rebuild, you can manually edit the built file:

1. In File Manager, open `public_html/_next/static/chunks/` 
2. Find the main JS file (usually the largest)
3. Search for `localhost:3001` or the old API URL
4. Replace with your actual API URL

---

### Part 5: Test Your Website

1. **Visit:** `https://volleyballsfun.site`
2. **Check:**
   - ✅ Page loads correctly
   - ✅ Background images display
   - ✅ Form appears

3. **Test Form:**
   - Fill out name and phone
   - Click submit
   - Check Telegram for message

4. **Check Console (F12):**
   - Look for any errors
   - Verify API requests are going to correct URL

---

## 🔧 Troubleshooting

### Website shows 404 or doesn't load:
- ✅ Check that `index.html` is in `public_html` (root)
- ✅ Verify `_next/` folder is uploaded
- ✅ Check file permissions (should be 644 for files, 755 for folders)

### Form doesn't submit:
- ✅ Check browser console (F12) for errors
- ✅ Verify API URL in the built files matches your Node.js app
- ✅ Check that Node.js app is running
- ✅ Test API endpoint: `curl https://your-api-url/api/telegram`

### API server not starting:
- ✅ Check `api-server.js` is in correct directory
- ✅ Verify environment variables are set
- ✅ Check Node.js version (should be 18+)
- ✅ View logs in Node.js Selector

### CORS errors:
- ✅ API server includes CORS headers
- ✅ Verify API URL is correct
- ✅ Check that API server is accessible

---

## 📞 Quick Checklist

**Frontend:**
- [ ] Built with `npm run build`
- [ ] `out/` folder contents uploaded to `public_html`
- [ ] `index.html` in root of `public_html`
- [ ] `_next/` folder uploaded
- [ ] Images uploaded

**API Server:**
- [ ] `api-server.js` uploaded
- [ ] Node.js application created in cPanel
- [ ] Startup file set to `api-server.js`
- [ ] Environment variables set (`BOT_TOKEN`, `CHAT_ID`, `PORT`)
- [ ] Application started/running
- [ ] API URL noted

**Configuration:**
- [ ] `NEXT_PUBLIC_API_URL` set correctly before build
- [ ] Frontend rebuilt with correct API URL (if needed)
- [ ] Website tested
- [ ] Form submission tested
- [ ] Telegram message received

---

## 🎉 You're Done!

Your website should now be live at `https://volleyballsfun.site`!

If you need to update the site later:
- Frontend: Rebuild and re-upload `out/` folder
- API: Upload new `api-server.js` and restart Node.js app

