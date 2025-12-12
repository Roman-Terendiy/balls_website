# Premium Sports Balls Landing Page

A single-page, non-scrollable landing website for selling sports balls with Telegram integration.

## Features

- ✅ Single non-scrollable page (no scrolling, no swiping)
- ✅ Full-screen background image
- ✅ Responsive design (mobile & desktop)
- ✅ Contact form with name and phone
- ✅ Telegram bot integration
- ✅ Modern, clean UI

## Project Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Telegram bot credentials:

```
BOT_TOKEN=your_bot_token_here
CHAT_ID=your_chat_id_here
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

**To change image filenames or breakpoint:**
- Edit `app/page.module.css`
- Find `.container` class for mobile image
- Find `@media (min-width: 768px)` for desktop image
- Update file paths and/or `min-width` value as needed

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Deployment to Namecheap Hosting

### Prerequisites

1. Node.js 18+ installed on your hosting server
2. SSH access to your hosting
3. Domain: volleyballsfun.site (already configured)

### Step-by-Step Deployment

#### Option 1: Using Namecheap cPanel (Recommended)

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Upload files to your hosting:**
   - Connect via FTP/SFTP to your Namecheap hosting
   - Upload the following to your `public_html` folder:
     - `.next` folder (entire folder)
     - `public` folder (entire folder)
     - `package.json`
     - `package-lock.json` (if exists)
     - `next.config.js`
     - `node_modules` (or install on server - see below)

3. **On your server via SSH:**
   ```bash
   cd ~/public_html
   npm install --production
   ```

4. **Set environment variables:**
   - In cPanel, go to "Environment Variables" or "Select PHP Version" → "Environment Variables"
   - Add:
     - `BOT_TOKEN` = your bot token
     - `CHAT_ID` = your chat ID
   - OR create a `.env.production` file (if supported):
     ```bash
     echo "BOT_TOKEN=your_token" >> .env.production
     echo "CHAT_ID=your_chat_id" >> .env.production
     ```

5. **Configure Node.js app:**
   - In cPanel, find "Node.js" or "Node.js Selector"
   - Create a new application:
     - Application root: `public_html`
     - Application URL: `volleyballsfun.site`
     - Application startup file: `server.js` (see below)
     - Application mode: `Production`

6. **Create server.js in public_html:**
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

7. **Start the application:**
   - In Node.js Selector, click "Run NPM install" if needed
   - Click "Restart Application"

#### Option 2: Using PM2 (If you have full server access)

1. **Connect via SSH:**
   ```bash
   ssh your_username@volleyballsfun.site
   ```

2. **Clone or upload your project:**
   ```bash
   cd ~/public_html
   # Upload your project files here
   ```

3. **Install dependencies:**
   ```bash
   npm install --production
   ```

4. **Create `.env.production`:**
   ```bash
   nano .env.production
   ```
   Add:
   ```
   BOT_TOKEN=your_bot_token_here
   CHAT_ID=your_chat_id_here
   NODE_ENV=production
   PORT=3000
   ```

5. **Install PM2:**
   ```bash
   npm install -g pm2
   ```

6. **Build and start:**
   ```bash
   npm run build
   pm2 start npm --name "balls-landing" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure reverse proxy (if needed):**
   - Set up Nginx or Apache to proxy to `localhost:3000`
   - Or configure port forwarding in cPanel

### Verify Deployment

1. Visit `https://volleyballsfun.site`
2. Fill out the form and submit
3. Check your Telegram - you should receive a message

### Troubleshooting

**If the page doesn't load:**
- Check that Node.js application is running in cPanel
- Verify port configuration matches
- Check server logs in cPanel

**If Telegram messages don't send:**
- Verify `BOT_TOKEN` and `CHAT_ID` are set correctly
- Check server logs for API errors
- Test the bot manually in Telegram

**If environment variables don't work:**
- Some hosts require setting them through cPanel interface
- Try using `.env.production` file instead
- Contact Namecheap support for Node.js environment variable setup

## Project Structure

```
balls/
├── app/
│   ├── api/
│   │   └── telegram/
│   │       └── route.ts          # Telegram API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main landing page
│   └── page.module.css           # Page styles
├── public/
│   ├── ball-background-mobile.jpg    # Mobile background image (replace this)
│   └── ball-background-desktop.jpg   # Desktop background image (replace this)
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Customization

### Change Text Content

Edit `app/page.tsx`:
- Line ~25: Change headline text
- Lines ~26-31: Modify characteristics list

### Change Colors/Styling

Edit `app/page.module.css`:
- Button gradient: Line ~96 (`.button` background)
- Overlay darkness: Line ~32 (`.container::before` background)
- Text shadows: Lines throughout

### Change Form Fields

Edit `app/page.tsx`:
- Add/remove input fields in the form section
- Update validation in `handleSubmit` function
- Update Telegram message format in `app/api/telegram/route.ts`

## Support

For issues or questions:
1. Check server logs in cPanel
2. Verify environment variables are set
3. Test Telegram bot manually
4. Ensure Node.js version is 18+

## License

Private project - All rights reserved

