import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are Siggy AI assistant." },
            { role: "user", content: userMessage }
          ]
        })
      }
    );

    const data = await response.json();

    if (!data.choices) {
      return res.json({
        reply: "⚠️ AI error: API key missing or request failed."
      });
    }

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {

    res.json({
      reply: "⚠️ Server error."
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Siggy AI running on port", PORT);
});
