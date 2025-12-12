# Quick Start Guide

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Create `.env.local` file in root directory
   - See `ENV-SETUP.md` for detailed instructions
   - Add your `BOT_TOKEN` and `CHAT_ID`

3. **Add background images:**
   - Place mobile image in `public/ball-background-mobile.jpg` (1080x1920px recommended)
   - Place desktop image in `public/ball-background-desktop.jpg` (1920x1080px recommended)
   - See `public/README-IMAGE.txt` for details

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Visit http://localhost:3000
   - Test the form submission

## Build for Production

```bash
npm run build
npm start
```

## Where to Edit

### Change Background Images
- File: `app/page.module.css`
- Mobile: Line ~12 - `background-image: url('/ball-background-mobile.jpg');`
- Desktop: Line ~24 - `background-image: url('/ball-background-desktop.jpg');`
- Breakpoint: Line ~18 - Change `min-width: 768px` to adjust when desktop image loads

### Change Headline Text
- File: `app/page.tsx`
- Line: ~25
- Change: `Premium Sports Ball`

### Change Characteristics List
- File: `app/page.tsx`
- Lines: ~26-31
- Modify the list items

### Change Telegram Message Format
- File: `app/api/telegram/route.ts`
- Line: ~28
- Modify: `const messageText = ...`

### Insert Telegram Credentials
- File: `.env.local` (create if doesn't exist)
- Add:
  ```
  BOT_TOKEN=your_token_here
  CHAT_ID=your_chat_id_here
  ```

## Testing

1. Fill out the form with test data
2. Submit and check your Telegram
3. You should receive: "New lead: Name: [name], Phone: [phone]"

