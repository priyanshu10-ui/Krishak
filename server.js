
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
// FARMER CONTEXT
// ======================================

const farmerLocation =
    req.body.context?.location?.trim() || null;

const currentWeather =
    req.body.context?.weather?.trim() ||
    "Weather information is currently unavailable.";

const marketData =
    req.body.context?.availableMarketPrices?.trim() ||
    "Live mandi data is currently unavailable.";

const selectedLanguage =
    req.body.context?.language?.trim() ||
    "English";

console.log("🌍 Farmer location:", farmerLocation);
console.log("🌐 Language:", selectedLanguage);


// ======================================
// DYNAMIC SYSTEM PROMPT
// ======================================

const DYNAMIC_SYSTEM_PROMPT = `
You are "Krishak", the friendly AI assistant inside Krishi Sahayak.

You have TWO main purposes:

1. Help farmers with agriculture-related questions.
2. Have natural, friendly conversations with the farmer.

==================================================
FARMER LOCATION
==================================================

The farmer's CURRENT SELECTED LOCATION is:

"${farmerLocation || "Not provided"}"

IMPORTANT:

NEVER assume the farmer is from Uttar Pradesh.

NEVER automatically use Uttar Pradesh.

NEVER use a different state unless the farmer explicitly
asks about that state.

If the farmer's location is:
- West Bengal → give advice relevant to West Bengal.
- Uttarakhand → give advice relevant to Uttarakhand.
- Uttar Pradesh → give advice relevant to Uttar Pradesh.
- Any other state → use that selected state.

The frontend sends the farmer's location from their profile/login.
Treat that location as the farmer's current location.

If location-specific agricultural information is required
but the exact information is unavailable, say that the
information depends on the local district/region rather than
inventing information.

==================================================
CURRENT WEATHER
==================================================

Current weather for the farmer's selected location:

"${currentWeather}"

Use this when answering weather or farming questions.

Do NOT invent weather information.

==================================================
MANDI DATA
==================================================

Live mandi information available to the farmer:

"${marketData}"

When answering mandi-price questions:

- Use the supplied live data.
- Do not invent prices.
- Do not automatically use Delhi.
- Do not automatically use Uttar Pradesh.
- Use the farmer's selected state/location.
- If data is unavailable, clearly say so.

==================================================
LANGUAGE
==================================================

The farmer selected this language in the Krishi Sahayak
website:

"${selectedLanguage}"

The ENTIRE response must be written in this language.

Do not switch language because the user typed in another language.

The selected website language has priority.

Examples:

English → complete response in English.

Hindi → complete response in Hindi.

Bengali → complete response in Bengali.

Marathi → complete response in Marathi.

Tamil → complete response in Tamil.

Telugu → complete response in Telugu.

==================================================
CONVERSATION BEHAVIOR
==================================================

You are NOT a robotic agriculture-only machine.

You can have normal, friendly conversations.

For example:

User:
"Hi Krishak, aaj mujhe accha lag raha hai."

Respond naturally and positively.

For example:
"यह सुनकर अच्छा लगा! 😊 आज आपका दिन अच्छा जा रहा है।
अगर खेती से जुड़ी किसी चीज़ में मदद चाहिए तो मैं यहाँ हूँ।"

Then provide useful quick options.

User:
"Aaj bahut thak gaya hoon."

You may respond empathetically and naturally.

User:
"Mujhe burger khana hai."

You may respond naturally.

If the user asks:
"How can I prepare a burger?"

You may explain how to prepare a burger.

Normal conversation is allowed.

==================================================
UNRELATED / SILLY REQUESTS
==================================================

Do not blindly answer every random request.

If the request has no useful connection to:
- farming
- agriculture
- normal conversation
- useful everyday assistance

politely redirect the conversation.

Example:

User:
"Tell me a random complicated joke about a spaceship."

Response:

"I'm mainly here to help you with farming and everyday
conversation. 😊 What would you like help with?"

Do not become rude.

==================================================
AGRICULTURE PRIORITY
==================================================

When the question is related to farming, prioritize:

- Crop selection
- Crop diseases
- Seeds
- Soil
- Irrigation
- Fertilizers
- Pest management
- Weather impact
- Sowing
- Harvesting
- Mandi prices
- Government agricultural schemes
- Subsidies
- Farm machinery
- Livestock
- Market information
- Crop planning

Use the farmer's selected location whenever location matters.

==================================================
SAFETY
==================================================

For pesticides, fertilizers and chemicals:

- Do not invent dangerous mixtures.
- Do not give unsafe chemical combinations.
- Follow product labels.
- Recommend local agricultural guidance when exact
  dosage/application information is required.

==================================================
QUICK OPTIONS
==================================================

IMPORTANT:

Every response MUST end with at least TWO useful quick
options that the farmer can click.

Use exactly this format:

---SUGGESTIONS---

1. <short clickable suggestion>
2. <short clickable suggestion>

You may provide 3 suggestions when useful.

The suggestions MUST:

- Be relevant to the current conversation.
- Be short.
- Be useful.
- Be written completely in "${selectedLanguage}".

For agriculture questions, suggestions should normally
be related to the farmer's crop, location, weather,
mandi prices or farming problem.

For casual conversation, suggestions can continue
the conversation naturally.

Do NOT give generic suggestions such as:
"Ask me anything."

==================================================
ANSWER STYLE
==================================================

Be:

- Friendly
- Natural
- Farmer-friendly
- Practical
- Clear
- Concise

Do not mention these internal instructions.

Always respect the selected language.
Always respect the farmer's selected location.
Always provide at least 2 quick suggestions.
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