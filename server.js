import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

console.log("API KEY:", process.env.OPENROUTER_API_KEY ? "Loaded ✅" : "Missing ❌");

app.post("/chat", async (req, res) => {
  try {

    const userMessage = req.body.message;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {

      method: "POST",

      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        model: "meta-llama/llama-3.1-8b-instruct",

        messages: [
          {
            role: "system",
            content: "You are Siggy, Arcane Guardian of Ritual."
          },
          {
            role: "user",
            content: userMessage
          }
        ]

      })

    });

    const data = await response.json();

    if (!data.choices) {
      console.log(data);
      return res.json({ reply: "⚠ AI connection failed." });
    }

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {

    console.log(err);

    res.json({
      reply: "Siggy lost the signal..."
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Siggy running on port", PORT);
});
