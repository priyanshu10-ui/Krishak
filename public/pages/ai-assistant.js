// ============================================================
// KRISHI SAHAYAK - KRISHAK AI ASSISTANT
// Voice Input + Voice Output + NLP Intent Detection
// Powered by Groq Backend
// ============================================================

let chatMessages = [
  {
    role: "ai",
    text:
      "Namaste! 🙏 I am <strong>Krishak</strong>, your AI farming assistant. " +
      "Ask me anything about crops, soil health, pest management, weather, " +
      "irrigation, fertilizers, government schemes, or mandi prices. 🌾",
    time: new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  },
];

let chatHistory = [];

let recognition = null;
let isListening = false;
let lastInputWasVoice = false;
let currentSpeech = null;


// ============================================================
// LANGUAGE CONFIGURATION
// ============================================================

const speechLanguageMap = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  bn: "bn-IN",
  pa: "pa-IN",
  te: "te-IN",
  gu: "gu-IN",
};


// ============================================================
// SAFE HTML ESCAPE
// ============================================================

function escapeHTML(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ============================================================
// REMOVE HTML FOR SPEECH
// ============================================================

function cleanTextForSpeech(text) {
  if (!text) return "";

  const temp = document.createElement("div");
  temp.innerHTML = text;

  let clean = temp.textContent || temp.innerText || "";

  clean = clean
    .replace(/---SUGGESTIONS---/gi, "")
    .replace(/Suggested Questions:?/gi, "")
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean;
}


// ============================================================
// GET CURRENT LANGUAGE
// ============================================================

function getActiveLanguage() {
  return localStorage.getItem("selectedLanguage") || "en";
}


// ============================================================
// GET SPEECH LANGUAGE
// ============================================================

function getSpeechLanguage() {
  const lang = getActiveLanguage();
  return speechLanguageMap[lang] || "en-IN";
}


// ============================================================
// NLP / INTENT DETECTION
// ============================================================

function detectFarmerIntent(text) {
  const query = String(text || "").toLowerCase();

  const intents = [
    {
      intent: "crop_health",
      keywords: [
        "crop health",
        "plant health",
        "crop problem",
        "plant problem",
        "leaf",
        "leaves",
        "yellow leaf",
        "yellow leaves",
        "wilting",
        "crop disease",
        "disease",
        "फसल",
        "पत्ता",
        "पत्ते",
        "रोग",
        "फसल रोग",
      ],
    },

    {
      intent: "pest_disease",
      keywords: [
        "pest",
        "insect",
        "insects",
        "bug",
        "bugs",
        "caterpillar",
        "aphid",
        "fungus",
        "fungal",
        "bacteria",
        "borer",
        "कीट",
        "कीड़ा",
        "कीड़े",
        "फफूंद",
        "बीमारी",
      ],
    },

    {
      intent: "weather",
      keywords: [
        "weather",
        "rain",
        "rainfall",
        "temperature",
        "forecast",
        "humidity",
        "storm",
        "wind",
        "बारिश",
        "मौसम",
        "तापमान",
        "आर्द्रता",
      ],
    },

    {
      intent: "market",
      keywords: [
        "mandi",
        "market price",
        "market rate",
        "price",
        "rate",
        "selling price",
        "apmc",
        "भाव",
        "मंडी",
        "कीमत",
        "बाजार भाव",
        "दाम",
      ],
    },

    {
      intent: "fertilizer",
      keywords: [
        "fertilizer",
        "fertiliser",
        "urea",
        "npk",
        "dap",
        "potash",
        "nutrient",
        "fertilizer dose",
        "खाद",
        "उर्वरक",
        "यूरिया",
        "डीएपी",
        "पोटाश",
      ],
    },

    {
      intent: "irrigation",
      keywords: [
        "irrigation",
        "irrigate",
        "water",
        "watering",
        "drip",
        "sprinkler",
        "water requirement",
        "सिंचाई",
        "पानी",
        "पानी देना",
      ],
    },

    {
      intent: "soil",
      keywords: [
        "soil",
        "soil health",
        "soil test",
        "soil testing",
        "ph",
        "nitrogen",
        "phosphorus",
        "potassium",
        "मिट्टी",
        "मृदा",
        "मिट्टी जांच",
      ],
    },

    {
      intent: "government_scheme",
      keywords: [
        "scheme",
        "government scheme",
        "subsidy",
        "government subsidy",
        "loan",
        "pm kisan",
        "insurance",
        "yojana",
        "सरकारी योजना",
        "सब्सिडी",
        "योजना",
        "पीएम किसान",
        "ऋण",
      ],
    },

    {
      intent: "crop_management",
      keywords: [
        "sowing",
        "harvesting",
        "harvest",
        "seed",
        "seeds",
        "spacing",
        "growth",
        "cultivation",
        "farming method",
        "बुवाई",
        "कटाई",
        "बीज",
        "खेती",
      ],
    },
  ];

  for (const item of intents) {
    const matched = item.keywords.some((keyword) =>
      query.includes(keyword.toLowerCase())
    );

    if (matched) {
      return item.intent;
    }
  }

  return "general_agriculture";
}


// ============================================================
// EXTRACT SIMPLE CROP ENTITY
// ============================================================

function detectCrop(text) {
  const query = String(text || "").toLowerCase();

  const crops = [
    "wheat",
    "rice",
    "paddy",
    "maize",
    "corn",
    "tomato",
    "potato",
    "onion",
    "soybean",
    "sugarcane",
    "cotton",
    "mustard",
    "pea",
    "chickpea",
    "gram",
    "groundnut",
    "tur",
    "pigeon pea",
    "banana",
    "mango",
    "apple",
  ];

  return crops.find((crop) => query.includes(crop)) || null;
}


// ============================================================
// QUESTION HANDLER
// ============================================================

window.handleQuestionClick = function (encodedText) {
  const query = decodeURIComponent(encodedText);

  const input = document.getElementById("chat-input");

  if (input) {
    input.value = query;
    sendMessage();
  }
};


// ============================================================
// RENDER AI ASSISTANT
// ============================================================

function renderAIAssistant() {
  const activeLanguage = getActiveLanguage();

  const t =
    typeof translations !== "undefined" && translations[activeLanguage]
      ? translations[activeLanguage]
      : typeof translations !== "undefined" && translations.en
      ? translations.en
      : {
          aiWelcome:
            "Namaste! 🙏 I am Krishak, your AI farming assistant. Ask me anything about crops, soil health, pest management, weather, or mandi prices. I'm here to help you grow better! 🌾",

          aiAssistantTitle: "Krishi Sahayak AI",

          aiOnline: "Online | Powered by AI",

          chatPlaceholder: "Type your query or use voice...",

          quickSupport: "Quick Support",

          whatsappSupport: "WhatsApp Support",

          immediateHelp: "Immediate help from our agents",

          communityForums: "Community Forums",

          connectFarmers: "Connect with other farmers",

          expertContacts: "Expert Contacts",

          soilScientists: "Soil scientists & agronomists",

          featuredSpecialist: "FEATURED SPECIALIST",

          expertName: "Dr. Sarah Verma",

          pestControlExpert: "Pest Control Expert",
        };


  // Update welcome message according to language
  if (
    chatMessages.length === 1 &&
    chatMessages[0].role === "ai" &&
    t.aiWelcome
  ) {
    chatMessages[0].text = t.aiWelcome.replace(
      "Krishak",
      "<strong>Krishak</strong>"
    );
  }


  const el = document.getElementById("page-ai-assistant");

  if (!el) return;


  el.innerHTML = `
    <div class="w-full">

      <div class="flex flex-col md:flex-row h-[calc(100vh-64px)] w-full">

        <!-- ================================================= -->
        <!-- MAIN CHAT -->
        <!-- ================================================= -->

        <section
          class="flex-1 min-w-0 flex flex-col
          border-r border-stone-200 dark:border-stone-800
          bg-white dark:bg-[#121613]
          shadow-sm overflow-hidden transition-colors"
        >

          <!-- HEADER -->

          <div
            class="px-6 py-4 border-b
            border-stone-100 dark:border-stone-800/80
            bg-white dark:bg-[#161b17]
            flex items-center justify-between flex-shrink-0"
          >

            <div class="flex items-center gap-3">

              <div
                class="w-10 h-10 rounded-full
                bg-[#2d5a27] dark:bg-emerald-600
                flex items-center justify-center
                flex-shrink-0 shadow-sm"
              >
                <span
                  class="material-symbols-outlined text-white"
                >
                  smart_toy
                </span>
              </div>

              <div>

                <h2
                  class="font-[Lexend]
                  text-xl font-medium
                  text-green-900 dark:text-emerald-300
                  leading-snug"
                >
                  ${escapeHTML(
                    t.aiAssistantTitle || "Krishi Sahayak AI"
                  )}
                </h2>

                <div class="flex items-center gap-1.5 mt-0.5">

                  <span
                    class="w-2 h-2 rounded-full
                    bg-emerald-500 animate-pulse"
                  ></span>

                  <p
                    class="text-xs
                    text-stone-500 dark:text-stone-400"
                  >
                    ${escapeHTML(
                      t.aiOnline || "Online | Powered by AI"
                    )}
                  </p>

                </div>

              </div>

            </div>

          </div>


          <!-- CHAT AREA -->

          <div
            id="chat-area"
            class="flex-1 min-w-0
            overflow-y-auto p-6 space-y-6
            bg-stone-50/50 dark:bg-[#121613]"
          ></div>


          <!-- INPUT -->

          <div
            class="p-4 border-t
            border-stone-100 dark:border-stone-800
            bg-white dark:bg-[#161b17]
            flex-shrink-0"
          >

            <!-- STATUS -->

            <div
              id="chat-status"
              class="hidden text-xs
              text-stone-400 mb-2 px-2"
            ></div>


            <div
              class="flex items-center gap-3
              bg-stone-50 dark:bg-[#1e241f]
              p-2 rounded-2xl
              border border-stone-200
              dark:border-stone-700/70
              shadow-sm
              focus-within:ring-2
              focus-within:ring-[#2d5a27]/20
              dark:focus-within:ring-emerald-500/30
              transition-all"
            >

              <button
                type="button"
                class="p-2
                text-stone-400
                dark:text-stone-400
                hover:text-[#154212]
                dark:hover:text-emerald-400
                transition-colors"
              >
                <span class="material-symbols-outlined">
                  add_circle
                </span>
              </button>


              <input
                id="chat-input"
                class="flex-1 border-none
                focus:ring-0 py-2
                bg-transparent outline-none
                text-sm text-stone-800
                dark:text-stone-100
                placeholder-stone-400
                dark:placeholder-stone-500"
                placeholder="${escapeHTML(
                  t.chatPlaceholder ||
                    "Type your query or use voice..."
                )}"
                type="text"
                autocomplete="off"
              />


              <div class="flex items-center gap-1">

                <!-- VOICE BUTTON -->

                <button
                  onclick="toggleVoice()"
                  id="voice-btn"
                  type="button"
                  title="Voice input"
                  class="p-2.5 rounded-xl
                  bg-white dark:bg-[#252d27]
                  text-stone-600 dark:text-stone-200
                  border border-stone-200
                  dark:border-stone-700
                  hover:bg-[#ffa536]
                  hover:text-white
                  transition-all active:scale-95"
                >

                  <span
                    id="voice-icon"
                    class="material-symbols-outlined"
                    style="font-variation-settings:'FILL' 1;"
                  >
                    mic
                  </span>

                </button>


                <!-- SEND BUTTON -->

                <button
                  onclick="sendMessage()"
                  id="send-btn"
                  type="button"
                  title="Send"
                  class="p-2.5 rounded-xl
                  bg-[#154212]
                  dark:bg-emerald-600
                  text-white
                  hover:bg-[#2d5a27]
                  dark:hover:bg-emerald-500
                  transition-all
                  active:scale-95 shadow-sm"
                >

                  <span class="material-symbols-outlined">
                    send
                  </span>

                </button>

              </div>

            </div>

          </div>

        </section>


        <!-- ================================================= -->
        <!-- RIGHT SUPPORT PANEL -->
        <!-- ================================================= -->

        <section
          class="w-full md:w-80 lg:w-96
          p-6 space-y-6
          overflow-y-auto
          bg-stone-50/70
          dark:bg-[#141915]
          hidden md:block
          flex-shrink-0
          border-l
          border-stone-200
          dark:border-stone-800"
        >

          <h3
            class="font-[Lexend]
            text-xl font-medium
            text-green-900
            dark:text-emerald-400 mb-4"
          >
            ${escapeHTML(t.quickSupport || "Quick Support")}
          </h3>


          <div class="space-y-4">

            <!-- WhatsApp -->

            <div
              class="p-4 rounded-2xl
              bg-white dark:bg-[#1a201c]
              border border-stone-200
              dark:border-stone-700
              cursor-pointer
              hover:shadow-md transition"
            >

              <div class="flex items-center gap-3">

                <div
                  class="w-10 h-10 rounded-xl
                  bg-green-100
                  dark:bg-green-900/30
                  flex items-center justify-center"
                >
                  <span class="material-symbols-outlined text-green-600">
                    chat
                  </span>
                </div>

                <div>

                  <h4
                    class="font-semibold
                    text-stone-800
                    dark:text-stone-100"
                  >
                    ${escapeHTML(
                      t.whatsappSupport || "WhatsApp Support"
                    )}
                  </h4>

                  <p
                    class="text-xs
                    text-stone-500
                    dark:text-stone-400"
                  >
                    ${escapeHTML(
                      t.immediateHelp ||
                        "Immediate help from our agents"
                    )}
                  </p>

                </div>

              </div>

            </div>


            <!-- Community -->

            <div
              class="p-4 rounded-2xl
              bg-white dark:bg-[#1a201c]
              border border-stone-200
              dark:border-stone-700
              cursor-pointer
              hover:shadow-md transition"
            >

              <div class="flex items-center gap-3">

                <div
                  class="w-10 h-10 rounded-xl
                  bg-amber-100
                  dark:bg-amber-900/30
                  flex items-center justify-center"
                >
                  <span class="material-symbols-outlined text-amber-600">
                    groups
                  </span>
                </div>

                <div>

                  <h4
                    class="font-semibold
                    text-stone-800
                    dark:text-stone-100"
                  >
                    ${escapeHTML(
                      t.communityForums || "Community Forums"
                    )}
                  </h4>

                  <p
                    class="text-xs
                    text-stone-500
                    dark:text-stone-400"
                  >
                    ${escapeHTML(
                      t.connectFarmers ||
                        "Connect with other farmers"
                    )}
                  </p>

                </div>

              </div>

            </div>


            <!-- Experts -->

            <div
              class="p-4 rounded-2xl
              bg-white dark:bg-[#1a201c]
              border border-stone-200
              dark:border-stone-700"
            >

              <div class="flex items-center gap-3">

                <div
                  class="w-10 h-10 rounded-xl
                  bg-blue-100
                  dark:bg-blue-900/30
                  flex items-center justify-center"
                >
                  <span class="material-symbols-outlined text-blue-600">
                    science
                  </span>
                </div>

                <div>

                  <h4
                    class="font-semibold
                    text-stone-800
                    dark:text-stone-100"
                  >
                    ${escapeHTML(
                      t.expertContacts || "Expert Contacts"
                    )}
                  </h4>

                  <p
                    class="text-xs
                    text-stone-500
                    dark:text-stone-400"
                  >
                    ${escapeHTML(
                      t.soilScientists ||
                        "Soil scientists & agronomists"
                    )}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  `;


  // ENTER KEY
  const input = document.getElementById("chat-input");

  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    });
  }


  renderAllMessages();
}


// ============================================================
// GET APP CONTEXT
// ============================================================

function getAppContext() {
  const village = localStorage.getItem("village") || "";
  const district = localStorage.getItem("district") || "";
  const state = localStorage.getItem("state") || "";

  const locationParts = [village, district, state].filter(Boolean);

  let location =
    locationParts.length > 0
      ? locationParts.join(", ")
      : "India";


  // ----------------------------------------------------------
  // MARKET DATA
  // ----------------------------------------------------------

  let availableMarketPrices = [];

  try {
    const marketRows = document.querySelectorAll(
      "#market-table tbody tr, #mandi-table tbody tr"
    );

    marketRows.forEach((row) => {
      const text = row.innerText?.trim();

      if (text) {
        availableMarketPrices.push(text);
      }
    });
  } catch (error) {
    console.warn("Market context error:", error);
  }


  // IMPORTANT:
  // Do NOT use fake hardcoded market prices.
  if (availableMarketPrices.length === 0) {
    availableMarketPrices = [
      "No live mandi data is currently available in the dashboard.",
    ];
  }


  // ----------------------------------------------------------
  // WEATHER DATA
  // ----------------------------------------------------------

  let weather = "Current weather data is not available.";

  try {
    const temp =
      document.getElementById("weather-temp")?.innerText ||
      document.getElementById("current-temp")?.innerText ||
      "";

    const description =
      document.getElementById("weather-description")?.innerText ||
      document.getElementById("current-weather")?.innerText ||
      "";

    if (temp || description) {
      weather = `${temp} ${description}`.trim();
    }
  } catch (error) {
    console.warn("Weather context error:", error);
  }


  return {
    location,
    weather,
    availableMarketPrices,
    language: getActiveLanguage(),
  };
}


// ============================================================
// FORMAT AI RESPONSE
// ============================================================

function formatAssistantReply(text) {
  if (!text) return "";

  let response = String(text);


  // ----------------------------------------------------------
  // Extract suggestions
  // ----------------------------------------------------------

  let suggestions = [];

  const suggestionMatch = response.match(
    /---SUGGESTIONS---([\s\S]*)/i
  );

  if (suggestionMatch) {
    const suggestionText = suggestionMatch[1];

    suggestions = suggestionText
      .split("\n")
      .map((line) =>
        line
          .replace(/^[-•*]\s*/, "")
          .replace(/^\d+[\.\)]\s*/, "")
          .trim()
      )
      .filter(Boolean);

    response = response
      .replace(/---SUGGESTIONS---[\s\S]*/i, "")
      .trim();
  }


  response = response.replace(
    /Suggested Questions:?([\s\S]*)/i,
    ""
  );


  // ----------------------------------------------------------
  // Escape first
  // ----------------------------------------------------------

  response = escapeHTML(response);


  // ----------------------------------------------------------
  // Markdown-like formatting
  // ----------------------------------------------------------

  response = response.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );


  response = response.replace(
    /\n/g,
    "<br>"
  );


  // ----------------------------------------------------------
  // Suggestion buttons
  // ----------------------------------------------------------

  if (suggestions.length > 0) {

    response += `
      <div class="mt-4">
        <p class="text-xs font-semibold text-stone-500 mb-2">
          Suggested questions
        </p>

        <div class="flex flex-wrap gap-2">

          ${suggestions
            .slice(0, 4)
            .map(
              (suggestion) => `
                <button
                  onclick="sendSuggestion(${JSON.stringify(
                    suggestion
                  ).replace(/</g, "\\u003c")})"
                  class="text-xs px-3 py-2
                  rounded-xl
                  border border-green-200
                  dark:border-green-800
                  bg-green-50
                  dark:bg-green-900/20
                  text-green-800
                  dark:text-green-300
                  hover:bg-green-100
                  dark:hover:bg-green-900/40
                  transition"
                >
                  ${escapeHTML(suggestion)}
                </button>
              `
            )
            .join("")}

        </div>
      </div>
    `;
  }


  return response;
}


// ============================================================
// RENDER ALL MESSAGES
// ============================================================

function renderAllMessages() {
  const area = document.getElementById("chat-area");

  if (!area) return;


  area.innerHTML = chatMessages
    .map((message, index) => {

      if (message.role === "user") {

        return `
          <div class="flex justify-end">

            <div class="max-w-[85%]">

              <div
                class="px-4 py-3
                rounded-2xl rounded-br-md
                bg-[#154212]
                dark:bg-emerald-700
                text-white
                text-sm shadow-sm"
              >
                ${escapeHTML(message.text)}
              </div>

              <div
                class="text-[10px]
                text-stone-400
                text-right mt-1"
              >
                ${escapeHTML(message.time || "")}
              </div>

            </div>

          </div>
        `;
      }


      const plainSpeechText = cleanTextForSpeech(
        message.text
      );


      return `
        <div class="flex justify-start">

          <div class="max-w-[90%]">

            <div
              class="px-4 py-3
              rounded-2xl rounded-bl-md
              bg-white
              dark:bg-[#1b211d]
              border border-stone-200
              dark:border-stone-700
              text-sm
              text-stone-700
              dark:text-stone-200
              shadow-sm"
            >

              <div>
                ${formatAssistantReply(message.text)}
              </div>


              <!-- SPEAK BUTTON -->

              <div
                class="mt-3 pt-2
                border-t
                border-stone-100
                dark:border-stone-700
                flex items-center gap-2"
              >

                <button
                  onclick="speakAssistantText(${JSON.stringify(
                    plainSpeechText
                  ).replace(/</g, "\\u003c")})"
                  title="Listen to answer"
                  class="inline-flex
                  items-center gap-1
                  text-xs
                  text-stone-500
                  dark:text-stone-400
                  hover:text-green-700
                  dark:hover:text-emerald-400
                  transition"
                >

                  <span class="material-symbols-outlined text-sm">
                    volume_up
                  </span>

                  Listen

                </button>

              </div>

            </div>


            <div
              class="text-[10px]
              text-stone-400
              mt-1"
            >
              ${escapeHTML(message.time || "")}
            </div>

          </div>

        </div>
      `;
    })
    .join("");


  scrollChat();
}


// ============================================================
// TYPING INDICATOR
// ============================================================

function showTyping() {
  const area = document.getElementById("chat-area");

  if (!area) return;


  const typing = document.createElement("div");

  typing.id = "typing-indicator";

  typing.className = "flex justify-start";


  typing.innerHTML = `
    <div
      class="px-4 py-3 rounded-2xl
      bg-white dark:bg-[#1b211d]
      border border-stone-200
      dark:border-stone-700"
    >

      <div class="flex items-center gap-1">

        <span
          class="w-2 h-2 rounded-full
          bg-stone-400 animate-bounce"
        ></span>

        <span
          class="w-2 h-2 rounded-full
          bg-stone-400 animate-bounce"
          style="animation-delay:120ms"
        ></span>

        <span
          class="w-2 h-2 rounded-full
          bg-stone-400 animate-bounce"
          style="animation-delay:240ms"
        ></span>

      </div>

    </div>
  `;


  area.appendChild(typing);

  scrollChat();
}


// ============================================================
// REMOVE TYPING
// ============================================================

function removeTyping() {
  document
    .getElementById("typing-indicator")
    ?.remove();
}


// ============================================================
// CHAT STATUS
// ============================================================

function setChatStatus(message, show = true) {
  const status = document.getElementById("chat-status");

  if (!status) return;

  if (!show) {
    status.classList.add("hidden");
    status.textContent = "";
    return;
  }

  status.textContent = message;
  status.classList.remove("hidden");
}


// ============================================================
// SEND MESSAGE TO BACKEND
// ============================================================

async function sendFarmerMessage(userText) {

  const context = getAppContext();

  const intent = detectFarmerIntent(userText);

  const crop = detectCrop(userText);


  const enhancedContext = {
    ...context,

    intent,

    crop,

    voiceInput: lastInputWasVoice,
  };


  const currentMessages = [
    ...chatHistory,
    {
      role: "user",
      content: userText,
    },
  ];


  const response = await fetch("/api/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      message: userText,

      messages: currentMessages,

      context: enhancedContext,
    }),
  });


  if (!response.ok) {
    throw new Error(
      `Backend returned ${response.status}`
    );
  }


  const responseData = await response.json();


  const reply =
    responseData.reply ||
    responseData.response ||
    responseData.message;


  if (!reply) {
    throw new Error(
      "No AI response received from backend."
    );
  }


  chatHistory.push(
    {
      role: "user",
      content: userText,
    },
    {
      role: "assistant",
      content: reply,
    }
  );


  // Keep history manageable
  if (chatHistory.length > 20) {
    chatHistory =
      chatHistory.slice(-20);
  }


  return reply;
}


// ============================================================
// FALLBACK RESPONSE
// ============================================================

function getFallbackResponse(text) {

  const query = String(text || "").toLowerCase();


  if (
    query.includes("weather") ||
    query.includes("rain") ||
    query.includes("बारिश") ||
    query.includes("मौसम")
  ) {
    return (
      "🌦️ I could not connect to the AI service right now. " +
      "Please check the Weather section for the latest forecast."
    );
  }


  if (
    query.includes("mandi") ||
    query.includes("market") ||
    query.includes("price") ||
    query.includes("भाव") ||
    query.includes("मंडी")
  ) {
    return (
      "📊 I could not retrieve the AI response. " +
      "Please open Market Trends to view the available live mandi data."
    );
  }


  if (
    query.includes("fertilizer") ||
    query.includes("urea") ||
    query.includes("npk") ||
    query.includes("खाद") ||
    query.includes("उर्वरक")
  ) {
    return (
      "🌱 Please provide your crop name, crop stage, soil condition, " +
      "and the fertilizer you currently have. I can then provide more relevant guidance."
    );
  }


  if (
    query.includes("pest") ||
    query.includes("insect") ||
    query.includes("कीट") ||
    query.includes("कीड़ा")
  ) {
    return (
      "🐛 Please describe the pest symptoms or upload a crop image " +
      "so the Crop Health feature can help identify the problem."
    );
  }


  return (
    "🌱 I am having trouble connecting to Krishak AI right now. " +
    "Please check that your backend server is running and try again."
  );
}


// ============================================================
// SEND MESSAGE
// ============================================================

async function sendMessage() {

  const input =
    document.getElementById("chat-input");


  if (!input) return;


  const text =
    input.value.trim();


  if (!text) return;


  // Stop speech when sending another question
  stopAssistantSpeech();


  const now =
    new Date().toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );


  chatMessages.push({
    role: "user",
    text,
    time: now,
  });


  input.value = "";

  input.disabled = true;


  const sendBtn =
    document.getElementById("send-btn");


  if (sendBtn) {
    sendBtn.disabled = true;
  }


  document
    .getElementById("suggestion-cards")
    ?.remove();


  renderAllMessages();

  showTyping();


  try {

    let aiResponse;

    try {

      aiResponse =
        await sendFarmerMessage(text);

    } catch (backendError) {

      console.error(
        "Backend error:",
        backendError
      );

      aiResponse =
        getFallbackResponse(text);
    }


    chatMessages.push({

      role: "ai",

      text: aiResponse,

      time:
        new Date().toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          }
        ),

    });


    // Automatically speak voice questions
    if (lastInputWasVoice) {

      setTimeout(() => {

        speakAssistantText(
          cleanTextForSpeech(aiResponse)
        );

      }, 250);

    }


  } catch (error) {

    console.error(
      "UI Error in sendMessage:",
      error
    );


    chatMessages.push({

      role: "ai",

      text:
        "Something went wrong while connecting to Krishak AI. Please try again.",

      time:
        new Date().toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          }
        ),

    });

  } finally {

    lastInputWasVoice = false;

    removeTyping();

    renderAllMessages();

    input.disabled = false;

    if (sendBtn) {
      sendBtn.disabled = false;
    }

    input.focus();

  }
}


// ============================================================
// SEND SUGGESTION
// ============================================================

function sendSuggestion(text) {

  const input =
    document.getElementById("chat-input");


  if (!input) return;


  input.value = text;

  sendMessage();
}


// ============================================================
// SCROLL CHAT
// ============================================================

function scrollChat() {

  setTimeout(() => {

    const area =
      document.getElementById("chat-area");


    if (area) {

      area.scrollTop =
        area.scrollHeight;

    }

  }, 100);
}


// ============================================================
// VOICE INPUT
// ============================================================

function toggleVoice() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


  if (!SpeechRecognition) {

    alert(
      "Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge."
    );

    return;
  }


  // Stop if already listening
  if (isListening) {

    stopVoiceRecognition();

    return;
  }


  recognition =
    new SpeechRecognition();


  recognition.lang =
    getSpeechLanguage();


  // Get partial/interim results
  recognition.interimResults =
    true;


  recognition.continuous =
    false;


  recognition.maxAlternatives =
    1;


  const btn =
    document.getElementById("voice-btn");


  const icon =
    document.getElementById("voice-icon");


  isListening = true;


  if (btn) {

    btn.classList.add(
      "!bg-red-500",
      "!text-white",
      "scale-105"
    );

  }


  if (icon) {

    icon.textContent =
      "mic_off";

  }


  setChatStatus(
    `Listening in ${getSpeechLanguage()}... Speak now.`,
    true
  );


  recognition.onstart =
    function () {

      console.log(
        "🎤 Voice recognition started:",
        getSpeechLanguage()
      );

    };


  recognition.onresult =
    function (event) {

      let finalTranscript =
        "";

      let interimTranscript =
        "";


      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        const transcript =
          event.results[i][0].transcript;


        if (
          event.results[i].isFinal
        ) {

          finalTranscript +=
            transcript;

        } else {

          interimTranscript +=
            transcript;

        }

      }


      const input =
        document.getElementById(
          "chat-input"
        );


      if (input) {

        input.value =
          (
            finalTranscript ||
            interimTranscript
          ).trim();

      }


      if (finalTranscript.trim()) {

        lastInputWasVoice =
          true;

      }

    };


  recognition.onerror =
    function (event) {

      console.error(
        "Speech recognition error:",
        event.error
      );


      const errorMessages = {

        "not-allowed":
          "Microphone permission was denied. Please allow microphone access.",

        "audio-capture":
          "No microphone was detected.",

        "no-speech":
          "No speech was detected. Please try again.",

        "network":
          "Voice recognition network error. Please check your internet connection.",

        "aborted":
          "Voice recognition stopped.",

      };


      setChatStatus(
        errorMessages[event.error] ||
          "Unable to recognize your voice. Please try again.",
        true
      );

    };


  recognition.onend =
    function () {

      const input =
        document.getElementById(
          "chat-input"
        );


      const transcript =
        input?.value.trim() || "";


      isListening =
        false;


      if (btn) {

        btn.classList.remove(
          "!bg-red-500",
          "!text-white",
          "scale-105"
        );

      }


      if (icon) {

        icon.textContent =
          "mic";

      }


      setChatStatus(
        "",
        false
      );


      // Automatically send voice query
      if (
        transcript &&
        lastInputWasVoice
      ) {

        sendMessage();

      }

    };


  try {

    recognition.start();

  } catch (error) {

    console.error(
      "Unable to start recognition:",
      error
    );

    isListening =
      false;

  }

}


// ============================================================
// STOP VOICE RECOGNITION
// ============================================================

function stopVoiceRecognition() {

  if (recognition) {

    try {

      recognition.stop();

    } catch (error) {

      console.warn(
        "Recognition stop error:",
        error
      );

    }

  }


  isListening =
    false;


  const btn =
    document.getElementById(
      "voice-btn"
    );


  const icon =
    document.getElementById(
      "voice-icon"
    );


  if (btn) {

    btn.classList.remove(
      "!bg-red-500",
      "!text-white",
      "scale-105"
    );

  }


  if (icon) {

    icon.textContent =
      "mic";

  }


  setChatStatus(
    "",
    false
  );

}


// ============================================================
// TEXT TO SPEECH
// ============================================================

function speakAssistantText(text) {

  if (
    !("speechSynthesis" in window)
  ) {

    alert(
      "Voice output is not supported in this browser."
    );

    return;

  }


  const cleanText =
    cleanTextForSpeech(text);


  if (!cleanText) return;


  // Stop previous speech
  window.speechSynthesis.cancel();


  const utterance =
    new SpeechSynthesisUtterance(
      cleanText
    );


  utterance.lang =
    getSpeechLanguage();


  utterance.rate =
    0.95;


  utterance.pitch =
    1;


  utterance.volume =
    1;


  // Try to select matching voice
  const voices =
    window.speechSynthesis.getVoices();


  const matchingVoice =
    voices.find(
      (voice) =>
        voice.lang
          ?.toLowerCase()
          .startsWith(
            getSpeechLanguage()
              .toLowerCase()
              .split("-")[0]
          )
    );


  if (matchingVoice) {

    utterance.voice =
      matchingVoice;

  }


  currentSpeech =
    utterance;


  utterance.onstart =
    function () {

      setChatStatus(
        "🔊 Krishak is speaking...",
        true
      );

    };


  utterance.onend =
    function () {

      setChatStatus(
        "",
        false
      );

      currentSpeech =
        null;

    };


  utterance.onerror =
    function () {

      setChatStatus(
        "",
        false
      );

      currentSpeech =
        null;

    };


  window.speechSynthesis.speak(
    utterance
  );

}


// ============================================================
// STOP AI SPEECH
// ============================================================

function stopAssistantSpeech() {

  if (
    "speechSynthesis" in window
  ) {

    window.speechSynthesis.cancel();

  }


  currentSpeech =
    null;


  setChatStatus(
    "",
    false
  );

}


// ============================================================
// PRELOAD VOICES
// ============================================================

if (
  "speechSynthesis" in window
) {

  window.speechSynthesis.onvoiceschanged =
    function () {

      window.speechSynthesis.getVoices();

    };

}


// ============================================================
// EXPORT FUNCTIONS
// ============================================================

window.renderAIAssistant =
  renderAIAssistant;

window.sendMessage =
  sendMessage;

window.sendSuggestion =
  sendSuggestion;

window.toggleVoice =
  toggleVoice;

window.stopVoiceRecognition =
  stopVoiceRecognition;

window.speakAssistantText =
  speakAssistantText;

window.stopAssistantSpeech =
  stopAssistantSpeech;

window.detectFarmerIntent =
  detectFarmerIntent;

window.detectCrop =
  detectCrop;