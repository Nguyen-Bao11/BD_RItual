const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check for Railway / monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Main API endpoint
app.post('/ask', (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string' || question.trim() === '') {
    return res.status(400).json({
      question: question || '',
      answer: 'Please enter a valid question!'
    });
  }

  const q = question.toLowerCase().trim();
  let answer = getBotReply(q);

  res.json({
    question: question.trim(),
    answer
  });
});

// Bot response logic (easy to extend)
function getBotReply(q) {
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return 'Hello! Siggy here. What would you like to ask? 😎';
  }
  if (q.includes('ritual')) {
    return 'A ritual is a sequence of actions performed for symbolic meaning. Which ritual are you referring to?';
  }
  if (q.includes('chainopera') || q.includes('chain opera')) {
    return 'ChainOpera sounds like a blockchain or NFT project. Want to know more about it?';
  }
  if (q.includes('blockstreet') || q.includes('block street')) {
    return 'BlockStreet sounds like the Wall Street of crypto. Which coin are you trading there? 🚀';
  }
  if (q.includes('who are you')) {
    return 'I am Siggy AI — an auto‑reply bot created by Demon Knight. Right now I use simple logic, but I may connect to OpenAI later for smarter responses!';
  }
  if (q.includes('thanks') || q.includes('thank you')) {
    return "You're welcome! Ask me anything else. 💪";
  }

  // Fallback
  return "Hmm... interesting question, but Siggy doesn't quite understand yet. Try asking in another way! 😅";
}

app.listen(port, () => {
  console.log(`Siggy AI Bot is running at http://localhost:${port}`);
  console.log('Ready to answer questions!');
});
