import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

console.log("API KEY:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing");

app.post("/chat", async (req, res) => {
  try {

    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Siggy AI, arcane guardian of Ritual." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      console.log("OpenAI error:", data);
      return res.json({
        reply: "⚠ AI request failed."
      });
    }

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {

    console.log(err);

    res.json({
      reply: "⚠ Server error."
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Siggy running on port", PORT);
});
