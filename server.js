
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import path from "path";
import { fileURLToPath } from "url";

// ==========================================
// ENVIRONMENT
// ==========================================

dotenv.config();

const app = express();

// Get current directory in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// Serve frontend files
// This allows Vercel/Express to serve:
// index.html
// styles.css
// app.js
// js/
// pages/
// images, etc.
app.use(express.static(path.join(__dirname, "public")));

// ==========================================
// GROQ API KEY
// ==========================================

const apiKey = (process.env.GROQ_API_KEY || "")
    .trim()
    .replace(/^["']|["']$/g, "");

if (!apiKey) {
    console.error(
        "❌ CRITICAL: GROQ_API_KEY is missing!"
    );
} else {
    console.log(
        `🔑 GROQ_API_KEY detected: ${apiKey.substring(0, 8)}...`
    );
}

// Create Groq client only when API key exists
const groq = apiKey
    ? new Groq({ apiKey })
    : null;


// ==========================================
// FRONTEND ROUTE
// ==========================================

// Open website → show Krishi Sahayak UI
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Krishi Sahayak backend is running!",
        groqConfigured: Boolean(apiKey)
    });
});


// ==========================================
// AI CHAT API
// ==========================================

app.post("/api/chat", async (req, res) => {

    console.log(
        "📩 Received chat request:",
        JSON.stringify(req.body)
    );

    try {

        // --------------------------------------
        // Check API key
        // --------------------------------------

        if (!groq) {
            console.error(
                "❌ GROQ_API_KEY is not configured."
            );

            return res.status(500).json({
                error:
                    "GROQ_API_KEY is not configured on the server."
            });
        }


        // --------------------------------------
        // Read incoming messages
        // --------------------------------------

        let incomingMessages = [];


        if (
            Array.isArray(req.body.messages) &&
            req.body.messages.length > 0
        ) {

            incomingMessages =
                req.body.messages;

        } else if (
            req.body.message ||
            req.body.prompt
        ) {

            incomingMessages = [
                {
                    role: "user",
                    content: String(
                        req.body.message ||
                        req.body.prompt
                    )
                }
            ];

        } else {

            return res.status(400).json({
                error:
                    "Missing message or messages array in request body."
            });

        }


        // ======================================
        // LIVE CONTEXT FROM BROWSER
        // ======================================

        const userLocation =
            req.body.context?.location ||
            "Uttar Pradesh, India";

        const currentWeather =
            req.body.context?.weather ||
            "Seasonal, Normal";

        const marketData =
            req.body.context
                ?.availableMarketPrices ||
            "Wheat (Agra): ₹2,315/Q | Wheat (Aligarh): ₹2,290/Q";


        // ======================================
        // SYSTEM PROMPT
        // ======================================

        const DYNAMIC_SYSTEM_PROMPT = `
You are "Krishak", an intelligent agricultural advisor embedded in the Krishi Sahayak farmer portal.

CURRENT LIVE CONTEXT FROM THE PORTAL:

- Farmer's Region / Selected State: "${userLocation}"
- Current Local Weather: "${currentWeather}"
- Live Mandi Rates on Screen: "${marketData}"

RULES FOR ANSWERING:

1. Mandi Rates:
   - When asked for rates (e.g. wheat), QUOTE the exact data from the screen above.
   - Mention the specific mandi and district shown in the data.
   - Do NOT default to Delhi unless Delhi is explicitly selected.

2. Weather Questions:
   - Base your advice on the current local weather ("${currentWeather}") for "${userLocation}".

3. Language & Suggestions:
   - Mirror the user's language.
   - Conclude every response with:

---SUGGESTIONS---

   followed by 2-3 farmer-perspective follow-up questions referencing ${userLocation} crops and rates.
`;


        // ======================================
        // FORMAT MESSAGES
        // ======================================

        const formattedMessages = [

            {
                role: "system",
                content: DYNAMIC_SYSTEM_PROMPT
            },

            ...incomingMessages
                .map((m) => ({

                    role:
                        (
                            m.role === "ai" ||
                            m.role === "model" ||
                            m.role === "assistant"
                        )
                            ? "assistant"
                            : "user",

                    content:
                        String(
                            m.content ||
                            m.text ||
                            ""
                        ).trim()

                }))
                .filter(
                    (m) =>
                        m.content.length > 0
                )
        ];


        // ======================================
        // CALL GROQ
        // ======================================

        console.log(
            "🤖 Sending request to Groq..."
        );

        const chatCompletion =
            await groq.chat.completions.create({

                // model: "groq/compound-mini",
                model: "openai/gpt-oss-120b",

                messages:
                    formattedMessages,

                temperature: 0.6,

                max_tokens: 1024

            });


        // ======================================
        // GET RESPONSE
        // ======================================

        const reply =
            chatCompletion
                .choices?.[0]
                ?.message
                ?.content ||
            "No reply generated.";


        console.log(
            "✅ Groq response generated successfully."
        );


        // ======================================
        // SEND RESPONSE
        // ======================================

        return res.json({

            reply: reply,

            response: reply

        });


    } catch (error) {

        console.error(
            "❌ Groq Error:",
            error.message
        );

        return res.status(
            error.status || 500
        ).json({

            error:
                error.message ||
                "Something went wrong while processing your request."

        });

    }

});


// ==========================================
// MANDI / DATA.GOV.IN API
// ==========================================
// ==========================================
// MANDI / DATA.GOV.IN API
// ==========================================

const DATA_GOV_API_KEY = (process.env.DATA_GOV_API_KEY || "")
    .trim()
    .replace(/^["']|["']$/g, "");

const MANDI_API_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

app.get("/api/mandi", async (req, res) => {
    const commodity = req.query.commodity || "Wheat";
    const state = req.query.state || "Uttar Pradesh";

    try {
        if (!DATA_GOV_API_KEY) {
            console.error("❌ DATA_GOV_API_KEY is missing");

            return res.status(500).json({
                error: "DATA_GOV_API_KEY is not configured."
            });
        }

        const params = new URLSearchParams({
            "api-key": DATA_GOV_API_KEY,
            "format": "json",
            "limit": "50",
            "filters[state]": state,
            "filters[commodity]": commodity
        });

        const url = `${MANDI_API_URL}?${params.toString()}`;

        console.log("📊 Mandi request:", commodity, state);

        const response = await fetch(url);

        const text = await response.text();

        console.log("📊 Data.gov status:", response.status);
        console.log("📊 Data.gov response:", text.slice(0, 500));

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Data.gov.in request failed.",
                status: response.status,
                details: text.slice(0, 1000)
            });
        }

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            return res.status(502).json({
                error: "Data.gov.in returned invalid JSON.",
                details: text.slice(0, 1000)
            });
        }

        return res.json(data);

    } catch (error) {
        console.error("❌ Mandi fetch error:", error);

        return res.status(500).json({
            error: "Failed to fetch Mandi data.",
            message: error?.message || "Unknown error",
            cause: error?.cause?.message || null
        });
    }
});

// ==========================================
// 404 API HANDLER
// ==========================================

app.use("/api", (req, res) => {

    res.status(404).json({

        error: "API endpoint not found."

    });

});


// ==========================================
// LOCAL DEVELOPMENT SERVER
// ==========================================
//
// Vercel will handle the Express app.
// When running locally with:
// npm start
// the server will run on port 5000.
//
// ==========================================

const PORT =
    process.env.PORT || 5000;

if (!process.env.VERCEL) {

    app.listen(
        PORT,
        "0.0.0.0",
        () => {

            console.log(
                `🚀 Server running on port ${PORT}`
            );

            console.log(
                `📡 Frontend: http://127.0.0.1:${PORT}`
            );

            console.log(
                `🤖 AI API: http://127.0.0.1:${PORT}/api/chat`
            );

        }
    );

}


// ==========================================
// EXPORT EXPRESS APP FOR VERCEL
// ==========================================

export default app;