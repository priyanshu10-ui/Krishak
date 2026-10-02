
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
app.use(express.json({ limit: "25mb" }));

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

        // ======================================
// LIVE CONTEXT + LANGUAGE FROM BROWSER
// ======================================

const userLocation =
    req.body.context?.location ||
    "Uttar Pradesh, India";

const currentWeather =
    req.body.context?.weather ||
    "Seasonal, Normal";

const marketData =
    req.body.context?.availableMarketPrices ||
    "No live mandi data available.";

const selectedLanguage =
    req.body.context?.language ||
    "English";

console.log("🌐 Selected language:", selectedLanguage);
console.log("📍 Farmer location:", userLocation);


        // ======================================
// FARMER-ONLY + LANGUAGE-LOCKED PROMPT
// ======================================

const DYNAMIC_SYSTEM_PROMPT = `
You are "Krishak", the AI agricultural advisor of Krishi Sahayak.

Your ONLY purpose is to help FARMERS with AGRICULTURE-related questions.

==================================================
FARMER-ONLY RULE
==================================================

You MUST answer ONLY questions related to agriculture, farming,
crops, seeds, soil, irrigation, fertilizers, pesticides,
crop diseases, weather for farming, mandi prices, agricultural
schemes, subsidies, livestock farming, harvesting, sowing,
crop planning, farm machinery, agricultural markets and
other topics directly useful to farmers.

If the user asks something unrelated to agriculture, farming,
or farmer assistance, DO NOT answer that question.

Instead, politely say that you are Krishak, an agricultural
assistant, and can only help with farming-related questions.

For example:

"I’m Krishak, your agricultural assistant. I can only help
with farming, crops, weather, mandi prices, government
agricultural schemes, soil, irrigation, and other
agriculture-related topics."

Do NOT provide the unrelated answer even if you know it.

==================================================
LANGUAGE LOCK
==================================================

The farmer portal has selected this language:

"${selectedLanguage}"

You MUST generate the ENTIRE response in this language.

Do NOT switch languages.

Do NOT mix languages.

Do NOT translate only part of the response.

If the selected language is English:
- Answer completely in English.

If the selected language is Hindi:
- Answer completely in Hindi.

If the selected language is Bengali:
- Answer completely in Bengali.

If the selected language is Marathi:
- Answer completely in Marathi.

If the selected language is Tamil:
- Answer completely in Tamil.

If the selected language is Telugu:
- Answer completely in Telugu.

If another language is selected:
- Answer completely in that selected language.

Technical names, crop names, chemical names and scientific
terms may remain in their commonly recognized form when
translation would reduce clarity, but the surrounding
explanation must remain in the selected language.

IMPORTANT:
The user's message language does NOT override the portal
language.

The PORTAL SELECTED LANGUAGE is the source of truth.

==================================================
CURRENT FARMER CONTEXT
==================================================

Farmer's Region / Selected State:
"${userLocation}"

Current Local Weather:
"${currentWeather}"

Live Mandi Rates Available on Screen:
"${marketData}"

Use this information whenever relevant.

==================================================
MANDI RATE RULES
==================================================

When the farmer asks about mandi prices/rates:

1. Use the live mandi information supplied above.
2. Do not invent prices.
3. Do not create fake mandi names.
4. Mention the actual mandi/district when available.
5. Do not default to Delhi.
6. If live data is unavailable, clearly say that current
   mandi data is unavailable instead of inventing a price.

==================================================
WEATHER RULES
==================================================

For weather-related farming questions:

1. Use the supplied local weather.
2. Consider the farmer's selected region.
3. Explain how the weather may affect farming when relevant.
4. Do not invent weather information that is not supplied.

==================================================
AGRICULTURAL SAFETY
==================================================

For fertilizers, pesticides, fungicides or chemicals:

- Give practical farmer-friendly guidance.
- Do not recommend dangerous chemical combinations.
- Do not invent dosage information.
- Tell the farmer to follow the product label and local
  agricultural guidance when exact dosage is required.

==================================================
ANSWER STYLE
==================================================

Be:

- Farmer-friendly
- Practical
- Clear
- Concise
- Easy to understand
- Focused on solving the farmer's problem

Do not discuss programming, coding, politics, entertainment,
general education, mathematics, technology or unrelated
topics unless the question has a direct agricultural use.

==================================================
FOLLOW-UP SUGGESTIONS
==================================================

For valid agriculture questions, conclude with:

---SUGGESTIONS---

Then provide 2-3 useful farmer-focused follow-up questions
related to the farmer's current topic, location, crops,
weather or mandi information.

The suggestions MUST also be written completely in:

"${selectedLanguage}"

Do not add suggestions for unrelated topics.
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
// CROP HEALTH AI VISION DIAGNOSIS
// ==========================================

app.post("/api/crop-diagnosis", async (req, res) => {

    try {

        // --------------------------------------
        // CHECK GROQ
        // --------------------------------------

        if (!groq) {
            return res.status(500).json({
                success: false,
                error: "GROQ_API_KEY is not configured on the server."
            });
        }


        // --------------------------------------
        // GET IMAGE
        // --------------------------------------

        const imageData = req.body?.image;

        if (!imageData || typeof imageData !== "string") {
            return res.status(400).json({
                success: false,
                error: "No crop image was received."
            });
        }


        // --------------------------------------
        // BASIC IMAGE VALIDATION
        // --------------------------------------

        if (!imageData.startsWith("data:image/")) {
            return res.status(400).json({
                success: false,
                error: "Invalid image format."
            });
        }


        // --------------------------------------
        // PREVENT VERY LARGE REQUESTS
        // --------------------------------------

        if (imageData.length > 26 * 1024 * 1024) {
            return res.status(413).json({
                success: false,
                error: "Image is too large. Please upload a smaller image."
            });
        }


        console.log("🌿 Crop image received for AI diagnosis");


        // --------------------------------------
        // AI VISION PROMPT
        // --------------------------------------

        const diagnosisPrompt = `
You are the crop-health vision system for KrishiSahayak.

Analyze the uploaded image carefully.

IMPORTANT:
This is a REAL image analysis task.
Do NOT invent a disease just to provide an answer.

Your first job is to determine whether the image is actually suitable
for crop/plant disease analysis.

If the image:
- is not a plant/crop/leaf,
- is too blurry,
- is too dark,
- does not show enough of the plant/leaf,
- does not contain visible symptoms,
- or the disease cannot be reliably distinguished,

then set:

"isReliable": false

and explain why.

If the image is suitable, identify:
1. Most likely crop
2. Most likely disease or healthy condition
3. Model-reported confidence from 0 to 1
4. Visible symptoms
5. Severity
6. Treatment / management steps
7. Prevention steps

Do NOT claim certainty when the visual evidence is weak.

IMPORTANT ABOUT CONFIDENCE:
The confidence value is a model-reported confidence estimate,
NOT a scientifically calibrated probability.

If you are uncertain between diseases, say so instead of forcing
an exact disease name.

If the plant appears healthy, use:
"disease": "No visible disease detected"

If disease identification is unreliable, use:
"disease": "Unable to reliably identify"

Return ONLY valid JSON.

Use exactly this structure:

{
  "isReliable": true,
  "crop": "string",
  "disease": "string",
  "confidence": 0.0,
  "severity": "None | Mild | Moderate | Severe | Unknown",
  "symptoms": [
    "string"
  ],
  "treatment": [
    "string"
  ],
  "prevention": [
    "string"
  ],
  "reason": "string"
}

Rules:
- confidence must be between 0 and 1.
- If isReliable is false, confidence should normally be below 0.60.
- If isReliable is false, disease should be "Unable to reliably identify".
- Do not invent symptoms that are not visually supported.
- Keep treatment practical and farmer-friendly.
- Do not recommend dangerous chemical mixing or unsafe pesticide use.
- For pesticides/fungicides, advise following the product label and local agricultural guidance.
`;


        // --------------------------------------
        // CALL GROQ VISION MODEL
        // --------------------------------------

        console.log("🤖 Sending crop image to vision model...");


        const completion =
            await groq.chat.completions.create({

                model: "qwen/qwen3.8-27b",

                messages: [
                    {
                        role: "user",

                        content: [
                            {
                                type: "text",
                                text: diagnosisPrompt
                            },

                            {
                                type: "image_url",

                                image_url: {
                                    url: imageData
                                }
                            }
                        ]
                    }
                ],

                temperature: 0.2,

                max_completion_tokens: 1200,

                response_format: {
                    type: "json_object"
                },

                reasoning_effort: "none"
            });


        // --------------------------------------
        // GET AI RESPONSE
        // --------------------------------------

        const rawResponse =
            completion
                ?.choices?.[0]
                ?.message?.content;


        if (!rawResponse) {
            throw new Error(
                "Vision model returned an empty response."
            );
        }


        console.log(
            "🤖 Vision response:",
            rawResponse
        );


        // --------------------------------------
        // PARSE JSON
        // --------------------------------------

        let diagnosis;

        try {

            diagnosis =
                JSON.parse(rawResponse);

        } catch (parseError) {

            console.error(
                "❌ Invalid AI JSON:",
                rawResponse
            );

            return res.status(502).json({
                success: false,
                error: "AI returned an invalid diagnosis format."
            });
        }


        // --------------------------------------
        // NORMALIZE RESPONSE
        // --------------------------------------

        const confidence =
            Number(diagnosis.confidence);

        const safeConfidence =
            Number.isFinite(confidence)
                ? Math.max(
                    0,
                    Math.min(1, confidence)
                )
                : 0;


        const isReliable =
            diagnosis.isReliable === true &&
            safeConfidence >= 0.60;


        // --------------------------------------
        // FINAL RESPONSE
        // --------------------------------------

        return res.json({

            success: true,

            isReliable: isReliable,

            crop:
                diagnosis.crop ||
                "Unknown",

            disease:
                isReliable
                    ? (
                        diagnosis.disease ||
                        "Unable to reliably identify"
                    )
                    : "Unable to reliably identify",

            confidence:
                Math.round(
                    safeConfidence * 100
                ),

            severity:
                diagnosis.severity ||
                "Unknown",

            symptoms:
                Array.isArray(diagnosis.symptoms)
                    ? diagnosis.symptoms
                    : [],

            treatment:
                Array.isArray(diagnosis.treatment)
                    ? diagnosis.treatment
                    : [],

            prevention:
                Array.isArray(diagnosis.prevention)
                    ? diagnosis.prevention
                    : [],

            reason:
                diagnosis.reason ||
                "The image could not be reliably interpreted."
        });


    } catch (error) {

        console.error(
            "❌ Crop diagnosis error:",
            error
        );

        return res.status(
            error?.status || 500
        ).json({

            success: false,

            error:
                error?.message ||
                "Crop diagnosis failed."
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