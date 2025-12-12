# Deployment Checklist for Namecheap Hosting

## Pre-Deployment

- [ ] Mobile background image added to `public/ball-background-mobile.jpg`
- [ ] Desktop background image added to `public/ball-background-desktop.jpg`
- [ ] Telegram bot created via @BotFather
- [ ] `BOT_TOKEN` obtained from BotFather
- [ ] `CHAT_ID` obtained via Telegram API
- [ ] Local testing completed successfully

## Deployment Steps

### 1. Build Project
```bash
npm run build
```

### 2. Upload Files to Namecheap
Upload these files/folders to `public_html`:
- [ ] `.next/` folder (entire folder)
- [ ] `public/` folder (entire folder)
- [ ] `package.json`
- [ ] `package-lock.json` (if exists)
- [ ] `next.config.js`
- [ ] `server.js`
- [ ] `node_modules/` (OR install on server)

### 3. SSH into Server
```bash
ssh your_username@volleyballsfun.site
cd ~/public_html
```

### 4. Install Dependencies (if needed)
```bash
npm install --production
```

### 5. Set Environment Variables

**Option A: Via cPanel**
- [ ] Go to cPanel → Environment Variables
- [ ] Add `BOT_TOKEN` = your bot token
- [ ] Add `CHAT_ID` = your chat ID
- [ ] Add `NODE_ENV` = production
- [ ] Add `PORT` = 3000 (or your assigned port)

**Option B: Via .env.production file**
```bash
nano .env.production
```
Add:
```
BOT_TOKEN=your_bot_token
CHAT_ID=your_chat_id
NODE_ENV=production
PORT=3000
```

### 6. Configure Node.js App in cPanel
- [ ] Go to cPanel → Node.js Selector / Node.js
- [ ] Create new application:
  - Application root: `public_html`
  - Application URL: `volleyballsfun.site`
  - Application startup file: `server.js`
  - Application mode: `Production`
- [ ] Click "Run NPM install" (if needed)
- [ ] Click "Restart Application"

### 7. Verify Deployment
- [ ] Visit https://volleyballsfun.site
- [ ] Page loads without errors
- [ ] Background image displays correctly
- [ ] Form appears and is responsive
- [ ] Submit test form
- [ ] Check Telegram for received message

## Troubleshooting

**Page doesn't load:**
- [ ] Check Node.js app is running in cPanel
- [ ] Verify port configuration
- [ ] Check server logs in cPanel

**Telegram not working:**
- [ ] Verify `BOT_TOKEN` is correct
- [ ] Verify `CHAT_ID` is correct
- [ ] Test bot manually in Telegram
- [ ] Check server logs for API errors

**Environment variables not working:**
- [ ] Try setting via cPanel interface instead of file
- [ ] Contact Namecheap support for Node.js env var setup
- [ ] Verify variable names match exactly (case-sensitive)

## Quick Test Commands

```bash
# Test if Node.js is running
curl http://localhost:3000

# Check environment variables (if accessible)
echo $BOT_TOKEN
echo $CHAT_ID

# View application logs
# In cPanel → Node.js → View Logs
```

