# Environment Variables Setup

## Create .env.local file

Create a file named `.env.local` in the root directory with the following content:

```
BOT_TOKEN=your_bot_token_here
CHAT_ID=your_chat_id_here
```

## How to Get Telegram Credentials

### Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send the command `/newbot`
3. Follow the instructions to name your bot
4. Copy the token provided by BotFather (this is your `BOT_TOKEN`)

### Step 2: Get Your Chat ID

1. Start a conversation with your new bot on Telegram
2. Send any message to your bot (e.g., "Hello")
3. Visit this URL in your browser (replace `<YOUR_BOT_TOKEN>` with your actual token):
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
4. Look for `"chat":{"id": YOUR_CHAT_ID}` in the JSON response
5. Copy the number (this is your `CHAT_ID`)

## Example

Your `.env.local` file should look like:

```
BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
CHAT_ID=987654321
```

## For Production (Namecheap Hosting)

When deploying to production, set these environment variables through:
- cPanel → Environment Variables, OR
- Create `.env.production` file on the server, OR
- Set them in your hosting panel's Node.js configuration

