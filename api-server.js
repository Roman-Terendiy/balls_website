/**
 * Standalone Node.js API Server for Telegram Integration
 * This server runs independently and handles Telegram bot requests
 * 
 * Usage: node api-server.js
 * Port: Set via PORT environment variable (default: 3001)
 */

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3001;
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// CORS headers for allowing requests from frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Handle Telegram API endpoint
  if (parsedUrl.pathname === '/api/telegram' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { name, phone } = JSON.parse(body);

        // Validation
        if (!name || !phone) {
          res.writeHead(400, corsHeaders);
          res.end(JSON.stringify({ error: 'Ім\'я та телефон обов\'язкові' }));
          return;
        }

        // Check environment variables
        if (!BOT_TOKEN || !CHAT_ID) {
          console.error('Missing BOT_TOKEN or CHAT_ID environment variables');
          res.writeHead(500, corsHeaders);
          res.end(JSON.stringify({ error: 'Помилка конфігурації сервера' }));
          return;
        }

        // Send message to Telegram
        const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const messageText = `Нова заявка:\nІм'я: ${name}\nТелефон: ${phone}`;

        const telegramResponse = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: messageText,
            parse_mode: 'HTML',
          }),
        });

        const telegramData = await telegramResponse.json();

        if (!telegramResponse.ok) {
          console.error('Telegram API error:', telegramData);
          res.writeHead(500, corsHeaders);
          res.end(JSON.stringify({ error: 'Не вдалося відправити повідомлення' }));
          return;
        }

        res.writeHead(200, corsHeaders);
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        console.error('Error sending Telegram message:', error);
        res.writeHead(500, corsHeaders);
        res.end(JSON.stringify({ error: 'Внутрішня помилка сервера' }));
      }
    });
  } else {
    // 404 for other routes
    res.writeHead(404, corsHeaders);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`✅ Telegram API Server running on port ${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/telegram`);
  
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('⚠️  Warning: BOT_TOKEN or CHAT_ID not set!');
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

