// ============================================================
// KRISHI SAHAYAK - AI FARMING ASSISTANT
// Powered by Groq API Backend
// ============================================================

let chatMessages = [
  {
    role: "ai",
    text: "Namaste! 🙏 I am <strong>Krishak</strong>, your AI farming assistant. Ask me anything about crops, soil health, pest management, weather, or mandi prices. I'm here to help you grow better! 🌾",
    time: new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  },
];

let chatHistory = [];

// Selected image
let selectedImage = null;
let selectedImageBase64 = null;


// ============================================================
// SUGGESTION QUESTION HANDLER
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
// RENDER AI ASSISTANT PAGE
// ============================================================

function renderAIAssistant() {
  const activeLanguage =
    localStorage.getItem("selectedLanguage") || "en";

  const t =
    typeof translations !== "undefined" &&
    translations[activeLanguage]
      ? translations[activeLanguage]
      : typeof translations !== "undefined" && translations.en
        ? translations.en
        : {
            aiWelcome:
              "Namaste! 🙏 I am Krishak, your AI farming assistant. Ask me anything about crops, soil health, pest management, weather, or mandi prices. I'm here to help you grow better! 🌾",

            aiAssistantTitle: "Krishi Sahayak AI",

            aiOnline: "Online | Powered by AI",

            chatPlaceholder:
              "Type your query or use voice...",

            quickSupport: "Quick Support",

            whatsappSupport: "WhatsApp Support",

            immediateHelp:
              "Immediate help from our agents",

            communityForums:
              "Community Forums",

            connectFarmers:
              "Connect with other farmers",

            expertContacts:
              "Expert Contacts",

            soilScientists:
              "Soil scientists & agronomists",

            featuredSpecialist:
              "FEATURED SPECIALIST",

            expertName:
              "Dr. Sarah Verma",

            pestControlExpert:
              "Pest Control Expert",
          };


  // Update initial welcome message
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


  const el =
    document.getElementById(
      "page-ai-assistant"
    );

  if (!el) return;


  el.innerHTML = `
    <div class="w-full">

      <div class="flex flex-col md:flex-row h-[calc(100vh-64px)] w-full">

        <!-- ==================================================
             MAIN CHAT PANE
        ================================================== -->

        <section
          class="flex-1 min-w-0 flex flex-col
          border-r border-stone-200 dark:border-stone-800
          bg-white dark:bg-[#121613]
          shadow-sm overflow-hidden transition-colors"
        >

          <!-- HEADER -->

          <div
            class="px-6 py-4
            border-b border-stone-100 dark:border-stone-800/80
            bg-white dark:bg-[#161b17]
            flex items-center justify-between
            flex-shrink-0"
          >

            <div class="flex items-center gap-3">

              <div
                class="w-10 h-10 rounded-full
                bg-[#2d5a27] dark:bg-emerald-600
                flex items-center justify-center
                flex-shrink-0 shadow-sm"
              >

                <span class="material-symbols-outlined text-white">
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
                  ${t.aiAssistantTitle || "Krishi Sahayak AI"}
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
                    ${t.aiOnline || "Online | Powered by AI"}
                  </p>

                </div>

              </div>

            </div>

          </div>


          <!-- CHAT AREA -->

          <div
            id="chat-area"
            class="flex-1 min-w-0
            overflow-y-auto
            p-6 space-y-6
            bg-stone-50/50 dark:bg-[#121613]"
          ></div>


          <!-- INPUT BAR -->

          <div
            class="p-4
            border-t border-stone-100 dark:border-stone-800
            bg-white dark:bg-[#161b17]
            flex-shrink-0"
          >

            <div
              id="chat-status"
              class="hidden
              text-xs text-stone-400
              mb-2 px-2"
            ></div>


            <!-- IMAGE PREVIEW -->

            <div
              id="image-preview"
              class="hidden mb-3 px-2"
            ></div>


            <div
              class="flex items-center gap-3
              bg-stone-50 dark:bg-[#1e241f]
              p-2 rounded-2xl
              border border-stone-200 dark:border-stone-700/70
              shadow-sm
              focus-within:ring-2
              focus-within:ring-[#2d5a27]/20
              dark:focus-within:ring-emerald-500/30
              transition-all"
            >

              <!-- ADD IMAGE -->

              <button
                type="button"
                onclick="openImagePicker()"
                id="add-image-btn"
                class="p-2
                text-stone-400 dark:text-stone-400
                hover:text-[#154212]
                dark:hover:text-emerald-400
                transition-colors
                active:scale-95"
                title="Upload crop image"
              >

                <span class="material-symbols-outlined">
                  add_circle
                </span>

              </button>


              <!-- HIDDEN IMAGE INPUT -->

              <input
                type="file"
                id="image-input"
                accept="image/*"
                onchange="handleImageSelect(event)"
                style="display:none;"
              />


              <!-- TEXT INPUT -->

              <input
                id="chat-input"
                class="flex-1
                border-none focus:ring-0
                py-2 bg-transparent outline-none
                text-sm text-stone-800 dark:text-stone-100
                placeholder-stone-400 dark:placeholder-stone-500"
                placeholder="${t.chatPlaceholder || "Type your query or use voice..."}"
                type="text"
                onkeypress="if(event.key==='Enter') sendMessage()"
              />


              <div class="flex items-center gap-1">

                <!-- VOICE -->

                <button
                  onclick="toggleVoice()"
                  id="voice-btn"
                  type="button"
                  class="p-2.5 rounded-xl
                  bg-white dark:bg-[#252d27]
                  text-stone-600 dark:text-stone-200
                  border border-stone-200 dark:border-stone-700
                  hover:bg-[#ffa536]
                  hover:text-white
                  transition-all active:scale-95"
                  title="Voice input"
                >

                  <span
                    class="material-symbols-outlined"
                    style="font-variation-settings:'FILL' 1;"
                  >
                    mic
                  </span>

                </button>


                <!-- SEND -->

                <button
                  onclick="sendMessage()"
                  id="send-btn"
                  type="button"
                  class="p-2.5 rounded-xl
                  bg-[#154212] dark:bg-emerald-600
                  text-white
                  hover:bg-[#2d5a27]
                  dark:hover:bg-emerald-500
                  transition-all
                  active:scale-95
                  shadow-sm"
                  title="Send message"
                >

                  <span class="material-symbols-outlined">
                    send
                  </span>

                </button>

              </div>

            </div>

          </div>

        </section>


        <!-- ==================================================
             RIGHT SIDEBAR
        ================================================== -->

        <section
          class="w-full md:w-80 lg:w-96
          p-6 space-y-6
          overflow-y-auto
          bg-stone-50/70 dark:bg-[#141915]
          hidden md:block
          flex-shrink-0
          border-l border-stone-200 dark:border-stone-800"
        >

          <h3
            class="font-[Lexend]
            text-xl font-medium
            text-green-900 dark:text-emerald-400 mb-4"
          >
            ${t.quickSupport || "Quick Support"}
          </h3>


          <div class="space-y-4">

            ${[
              {
                icon: "chat",
                title:
                  t.whatsappSupport ||
                  "WhatsApp Support",
                desc:
                  t.immediateHelp ||
                  "Immediate help from our agents",
                color: "green",
              },

              {
                icon: "groups",
                title:
                  t.communityForums ||
                  "Community Forums",
                desc:
                  t.connectFarmers ||
                  "Connect with other farmers",
                color: "amber",
              },

              {
                icon: "person_search",
                title:
                  t.expertContacts ||
                  "Expert Contacts",
                desc:
                  t.soilScientists ||
                  "Soil scientists & agronomists",
                color: "blue",
              },
            ]
              .map(
                (c) => `
                  <a
                    class="group block
                    bg-white dark:bg-[#1c221e]
                    p-4 rounded-2xl
                    border border-stone-200
                    dark:border-stone-800
                    shadow-sm
                    hover:shadow-md
                    hover:border-emerald-600/40
                    dark:hover:border-emerald-500/50
                    transition-all cursor-pointer"
                  >

                    <div class="flex items-center gap-4">

                      <div
                        class="w-12 h-12 rounded-xl
                        bg-${c.color}-50
                        dark:bg-${c.color}-950/40
                        flex items-center justify-center
                        text-${c.color}-600
                        dark:text-${c.color}-400
                        group-hover:bg-${c.color}-600
                        group-hover:text-white
                        transition-colors"
                      >

                        <span class="material-symbols-outlined">
                          ${c.icon}
                        </span>

                      </div>


                      <div class="flex-1 min-w-0">

                        <h4
                          class="font-semibold text-sm
                          text-green-950 dark:text-stone-100"
                        >
                          ${c.title}
                        </h4>

                        <p
                          class="text-xs
                          text-stone-500
                          dark:text-stone-400
                          truncate"
                        >
                          ${c.desc}
                        </p>

                      </div>


                      <span
                        class="material-symbols-outlined
                        text-stone-400
                        dark:text-stone-500
                        group-hover:text-emerald-500
                        transition-colors"
                      >
                        chevron_right
                      </span>

                    </div>

                  </a>
                `
              )
              .join("")}

          </div>


          <!-- FEATURED SPECIALIST -->

          <div
            class="bg-[#2d5a27]
            dark:bg-[#193a19]
            rounded-2xl
            p-5 text-white
            shadow-lg
            border border-emerald-700/30
            overflow-hidden relative"
          >

            <div class="relative z-10">

              <div
                class="inline-flex
                items-center gap-1.5
                px-2.5 py-1
                rounded-full
                bg-white/10
                dark:bg-emerald-950/60
                backdrop-blur-md
                border border-white/20
                dark:border-emerald-500/30
                text-[10px]
                uppercase tracking-wider
                font-bold mb-4
                text-emerald-100"
              >
                ${t.featuredSpecialist || "FEATURED SPECIALIST"}
              </div>


              <div class="flex items-center gap-3 mb-4">

                <div
                  class="w-12 h-12 rounded-full
                  border-2 border-white/20
                  dark:border-emerald-400/40
                  bg-emerald-900
                  flex items-center justify-center"
                >

                  <span class="material-symbols-outlined text-white">
                    person
                  </span>

                </div>


                <div>

                  <h4
                    class="font-[Lexend]
                    font-medium text-sm text-white"
                  >
                    ${t.expertName || "Dr. Sarah Verma"}
                  </h4>

                  <p
                    class="text-xs
                    text-white/80
                    dark:text-emerald-200"
                  >
                    ${t.pestControlExpert || "Pest Control Expert"}
                  </p>

                </div>

              </div>


              <button
                class="w-full py-2.5
                bg-white dark:bg-emerald-500
                text-[#154212]
                dark:text-stone-950
                rounded-xl
                font-bold text-xs
                shadow-md
                active:scale-95
                transition-all
                hover:bg-stone-100
                dark:hover:bg-emerald-400"
              >
                Contact Specialist
              </button>

            </div>


            <div
              class="absolute
              -right-4 -bottom-4
              w-32 h-32
              bg-white/5
              rounded-full blur-2xl"
            ></div>

          </div>

        </section>

      </div>

    </div>
  `;

  renderAllMessages();
}


// ============================================================
// RENDER ALL CHAT MESSAGES
// ============================================================

function renderAllMessages() {
  const area =
    document.getElementById("chat-area");

  if (!area) return;


  let html =
    chatMessages
      .map((m) =>
        m.role === "ai"
          ? renderAIBubble(m)
          : renderUserBubble(m)
      )
      .join("");


  // Initial suggestion cards

  if (chatMessages.length === 1) {

    html += `
      <div
        id="suggestion-cards"
        class="grid grid-cols-1 sm:grid-cols-2
        gap-3 mt-6"
      >

        ${[
          {
            q: "When should I harvest my wheat?",
            cat: "Crop Cycle",
          },

          {
            q: "Best fertilizer for tomatoes?",
            cat: "Soil Health",
          },

          {
            q: "How to identify pest attack on rice?",
            cat: "Pest Management",
          },

          {
            q:
              "What is the current mandi price of soybean?",
            cat: "Market Info",
          },
        ]
          .map(
            (s) => `
              <button
                onclick="sendSuggestion('${s.q}')"
                class="text-left
                p-4 rounded-xl
                border border-stone-200
                dark:border-stone-800
                bg-white dark:bg-[#1a201c]
                hover:border-emerald-600/50
                dark:hover:border-emerald-500/60
                hover:bg-emerald-50/50
                dark:hover:bg-[#222b25]
                transition-all group shadow-sm"
              >

                <p
                  class="font-medium
                  text-xs sm:text-sm
                  text-stone-800
                  dark:text-stone-200
                  group-hover:text-emerald-800
                  dark:group-hover:text-emerald-300"
                >
                  "${s.q}"
                </p>


                <div
                  class="flex items-center
                  justify-between mt-2.5"
                >

                  <span
                    class="text-[11px]
                    text-stone-500
                    dark:text-stone-400
                    font-medium"
                  >
                    ${s.cat}
                  </span>


                  <span
                    class="material-symbols-outlined
                    text-stone-400
                    group-hover:text-emerald-600
                    dark:group-hover:text-emerald-400"
                    style="font-size:14px"
                  >
                    arrow_forward
                  </span>

                </div>

              </button>
            `
          )
          .join("")}

      </div>
    `;
  }


  area.innerHTML = html;

  scrollChat();
}


// ============================================================
// AI MESSAGE BUBBLE
// ============================================================

function renderAIBubble(m) {
  return `
    <div
      class="flex gap-3
      max-w-[88%] sm:max-w-[75%]
      items-start"
    >

      <div
        class="w-8 h-8 rounded-full
        bg-[#2d5a27]/10
        dark:bg-emerald-950/60
        flex-shrink-0
        flex items-center justify-center
        mt-0.5
        border border-emerald-800/20"
      >

        <span
          class="material-symbols-outlined
          text-[#154212]
          dark:text-emerald-400
          text-sm"
        >
          smart_toy
        </span>

      </div>


      <div
        class="bg-white dark:bg-[#1b221d]
        border border-stone-200/80
        dark:border-stone-800
        text-stone-800 dark:text-stone-100
        p-4
        rounded-2xl
        rounded-tl-none
        shadow-sm
        leading-relaxed
        text-sm
        break-words
        min-w-0"
      >

        <div>${m.text}</div>

        <span
          class="text-[10px]
          text-stone-400
          dark:text-stone-500
          mt-2 block font-medium"
        >
          ${m.time}
        </span>

      </div>

    </div>
  `;
}


// ============================================================
// USER MESSAGE BUBBLE
// ============================================================

function renderUserBubble(m) {
  return `
    <div
      class="flex gap-3
      max-w-[88%] sm:max-w-[75%]
      ml-auto
      flex-row-reverse
      items-start"
    >

      <div
        class="w-8 h-8 rounded-full
        bg-[#2d5a27]
        dark:bg-emerald-600
        flex-shrink-0
        flex items-center justify-center
        mt-0.5 shadow-sm"
      >

        <span
          class="material-symbols-outlined
          text-white text-sm"
        >
          person
        </span>

      </div>


      <div
        class="bg-[#2d5a27]
        dark:bg-[#1e4822]
        border border-emerald-800/40
        text-white
        p-4
        rounded-2xl
        rounded-tr-none
        shadow-sm
        leading-relaxed
        text-sm
        break-words
        min-w-0"
      >

        <div>${m.text}</div>

        <span
          class="text-[10px]
          text-emerald-200/80
          mt-2 block
          font-medium
          text-right"
        >
          ${m.time}
        </span>

      </div>

    </div>
  `;
}


// ============================================================
// TYPING INDICATOR
// ============================================================

function showTyping() {
  const area =
    document.getElementById("chat-area");

  if (
    !area ||
    document.getElementById(
      "typing-indicator"
    )
  ) {
    return;
  }


  const div =
    document.createElement("div");

  div.id =
    "typing-indicator";

  div.className =
    "flex gap-3 items-center";


  div.innerHTML = `
    <div
      class="w-8 h-8 rounded-full
      bg-[#2d5a27]/10
      dark:bg-emerald-950/50
      flex-shrink-0
      flex items-center justify-center"
    >

      <span
        class="material-symbols-outlined
        text-[#154212]
        dark:text-emerald-400
        text-sm"
      >
        smart_toy
      </span>

    </div>


    <div
      class="flex items-center gap-1.5
      p-3.5
      bg-white dark:bg-[#1b221d]
      border border-stone-200
      dark:border-stone-800
      rounded-2xl
      rounded-tl-none
      shadow-sm"
    >

      <span
        class="w-2 h-2 rounded-full
        bg-[#2d5a27]
        dark:bg-emerald-400
        animate-bounce"
      ></span>

      <span
        class="w-2 h-2 rounded-full
        bg-[#2d5a27]
        dark:bg-emerald-400
        animate-bounce"
        style="animation-delay:0.2s"
      ></span>

      <span
        class="w-2 h-2 rounded-full
        bg-[#2d5a27]
        dark:bg-emerald-400
        animate-bounce"
        style="animation-delay:0.4s"
      ></span>

    </div>
  `;


  area.appendChild(div);

  scrollChat();
}


// ============================================================
// REMOVE TYPING
// ============================================================

function removeTyping() {

  const indicator =
    document.getElementById(
      "typing-indicator"
    );

  if (indicator) {
    indicator.remove();
  }
}


// ============================================================
// GET FARMER CONTEXT
// ============================================================

function getAppContext() {

  const village =
    localStorage.getItem("village") || "";

  const district =
    localStorage.getItem("district") || "";

  const state =
    localStorage.getItem("state") || "";


  let fullLocation =
    [village, district, state]
      .filter(Boolean)
      .join(", ");


  // Fallback location from UI

  if (!fullLocation) {

    const locationBadge =
      document.getElementById(
        "dashboard-user-address"
      ) ||
      document.getElementById(
        "user-location"
      );


    if (
      locationBadge &&
      locationBadge.innerText.trim()
    ) {

      fullLocation =
        locationBadge.innerText.trim();

    } else {

      fullLocation = "India";

    }
  }


  // ========================================================
  // MANDI DATA
  // ========================================================

  let tableRates = [];

  const tableRows =
    document.querySelectorAll(
      "table tbody tr"
    );


  if (tableRows.length > 0) {

    tableRows.forEach((row) => {

      const cells =
        row.querySelectorAll("td");


      if (cells.length >= 4) {

        const commodity =
          cells[0]?.innerText
            .replace(/\s+/g, " ")
            .trim();

        const mandi =
          cells[1]?.innerText
            .replace(/\s+/g, " ")
            .trim();

        const minRate =
          cells[2]?.innerText.trim();

        const maxRate =
          cells[3]?.innerText.trim();

        const modalRate =
          cells[4]?.innerText.trim() ||
          maxRate;


        if (commodity && mandi) {

          tableRates.push(
            `${commodity} in ${mandi}: Modal ₹${modalRate} (Min: ${minRate}, Max: ${maxRate})`
          );

        }
      }

    });
  }


  // ========================================================
  // WEATHER
  // ========================================================

  const tempEl =
    document.getElementById(
      "weather-temp"
    ) ||
    document.getElementById(
      "current-temp"
    );


  const descEl =
    document.getElementById(
      "weather-desc"
    ) ||
    document.getElementById(
      "weather-condition"
    );


  const weatherData = tempEl
    ? `${tempEl.innerText.trim()} (${descEl
        ? descEl.innerText.trim()
        : "Clear"})`
    : "Normal conditions";


  // ========================================================
  // MARKET FALLBACK
  // ========================================================

  const availableMarketPrices =
    tableRates.length > 0
      ? tableRates
          .slice(0, 10)
          .join(" | ")
      : "Wheat: ₹2,125/Q | Rice: ₹1,940/Q | Corn: ₹1,850/Q";


  // ========================================================
  // RETURN CONTEXT
  // ========================================================

  return {

    village: village,

    district: district,

    state: state,

    location: fullLocation,

    weather: weatherData,

    availableMarketPrices:
      availableMarketPrices,

    language:
      localStorage.getItem(
        "selectedLanguage"
      ) || "en",

  };
}


// ============================================================
// FORMAT AI RESPONSE
// ============================================================

function formatAssistantReply(rawReply) {

  if (!rawReply) {
    return "Sorry, I couldn't generate a response.";
  }


  let mainText = rawReply;

  let rawSuggestions = [];


  // ========================================================
  // SUGGESTION SECTION
  // ========================================================

  const suggestionMarker =
    "---SUGGESTIONS---";


  if (
    rawReply
      .toUpperCase()
      .includes(
        suggestionMarker
      )
  ) {

    const parts =
      rawReply.split(
        /---SUGGESTIONS---/i
      );


    mainText =
      parts[0].trim();


    if (parts.length > 1) {

      rawSuggestions =
        parts
          .slice(1)
          .join(" ")
          .split("\n")
          .map((line) =>
            line
              .replace(
                /^[\s*\-–•\d.)]+/,
                ""
              )
              .replace(
                /^["']+|["']+$/g,
                ""
              )
              .trim()
          )
          .filter(
            (line) =>
              line.length > 5
          );

    }
  }


  // ========================================================
  // SUGGESTION BUTTONS
  // ========================================================

  let suggestionsHtml = "";


  if (
    rawSuggestions.length > 0
  ) {

    suggestionsHtml = `

      <div
        class="mt-4 pt-3
        border-t border-stone-200/70
        dark:border-stone-800"
      >

        <p
          class="text-[11px]
          font-bold
          text-stone-500
          dark:text-emerald-400/90
          uppercase
          tracking-wider
          mb-2.5
          flex items-center gap-1.5"
        >

          <span>💡</span>

          Suggested Questions:

        </p>


        <div
          class="flex flex-col
          sm:flex-row
          flex-wrap gap-2"
        >

          ${rawSuggestions
            .map((q) => {

              const safeQ =
                encodeURIComponent(q);

              return `

                <button
                  type="button"
                  onclick="handleQuestionClick('${safeQ}')"
                  class="text-left
                  text-xs font-medium
                  bg-emerald-50
                  hover:bg-[#2d5a27]
                  text-emerald-900
                  hover:text-white
                  dark:bg-[#202922]
                  dark:hover:bg-emerald-600
                  dark:text-emerald-200
                  dark:hover:text-white
                  border border-emerald-300/80
                  dark:border-emerald-700/50
                  rounded-xl
                  px-3.5 py-2.5
                  transition-all
                  duration-150
                  shadow-sm
                  active:scale-95
                  flex items-center
                  justify-between
                  gap-2
                  cursor-pointer"
                >

                  <span>
                    ${q}
                  </span>

                  <span
                    class="material-symbols-outlined text-xs"
                    style="font-size:14px;"
                  >
                    arrow_forward
                  </span>

                </button>

              `;

            })
            .join("")}

        </div>

      </div>

    `;
  }


  // ========================================================
  // BASIC MARKDOWN FORMATTING
  // ========================================================

  const formattedMain =
    mainText

      .replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      )

      .replace(
        /^###\s?(.*?)$/gm,
        "<strong>$1</strong>"
      )

      .replace(
        /\n/g,
        "<br>"
      );


  return (
    formattedMain +
    suggestionsHtml
  );
}


// ============================================================
// IMAGE UPLOAD
// ============================================================

function openImagePicker() {

  const input =
    document.getElementById(
      "image-input"
    );

  if (input) {
    input.click();
  }
}


// ============================================================
// HANDLE IMAGE SELECT
// ============================================================

function handleImageSelect(event) {

  const file =
    event.target.files?.[0];

  if (!file) return;


  if (!file.type.startsWith("image/")) {

    alert(
      "Please select an image file."
    );

    event.target.value = "";

    return;
  }


  // 10 MB limit

  if (
    file.size >
    10 * 1024 * 1024
  ) {

    alert(
      "Image size should be less than 10 MB."
    );

    event.target.value = "";

    return;
  }


  selectedImage = file;


  const reader =
    new FileReader();


  reader.onload =
    function (e) {

      selectedImageBase64 =
        e.target.result;

      showImagePreview(
        selectedImageBase64,
        file.name
      );

    };


  reader.onerror =
    function () {

      alert(
        "Unable to read this image."
      );

    };


  reader.readAsDataURL(file);
}


// ============================================================
// IMAGE PREVIEW
// ============================================================

function showImagePreview(
  imageSrc,
  fileName
) {

  const preview =
    document.getElementById(
      "image-preview"
    );

  if (!preview) return;


  preview.classList.remove(
    "hidden"
  );


  preview.innerHTML = `

    <div
      class="flex items-center gap-3
      p-2.5 rounded-xl
      bg-white dark:bg-[#1c221e]
      border border-stone-200
      dark:border-stone-700
      shadow-sm"
    >

      <img
        src="${imageSrc}"
        class="w-14 h-14
        object-cover rounded-lg
        border border-stone-200
        dark:border-stone-700"
        alt="Selected crop"
      >


      <div
        class="flex-1 min-w-0"
      >

        <p
          class="text-xs font-medium
          text-stone-800
          dark:text-stone-200
          truncate"
        >
          ${escapeHtml(fileName)}
        </p>


        <p
          class="text-[11px]
          text-emerald-600
          dark:text-emerald-400"
        >
          Image ready for analysis
        </p>

      </div>


      <button
        type="button"
        onclick="removeSelectedImage()"
        class="w-8 h-8 rounded-lg
        flex items-center
        justify-center
        text-stone-400
        hover:text-red-500
        hover:bg-red-50
        dark:hover:bg-red-950/30
        transition-colors"
        title="Remove image"
      >

        <span
          class="material-symbols-outlined text-lg"
        >
          close
        </span>

      </button>

    </div>

  `;
}


// ============================================================
// REMOVE SELECTED IMAGE
// ============================================================

function removeSelectedImage() {

  selectedImage = null;

  selectedImageBase64 = null;


  const preview =
    document.getElementById(
      "image-preview"
    );


  const input =
    document.getElementById(
      "image-input"
    );


  if (preview) {

    preview.classList.add(
      "hidden"
    );

    preview.innerHTML = "";

  }


  if (input) {

    input.value = "";

  }
}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(value) {

  if (!value) return "";

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}


// ============================================================
// SEND MESSAGE TO BACKEND
// ============================================================
//
// Uses SAME-ORIGIN API:
//
// /api/chat
//
// The image is sent as Base64:
//
// image: "data:image/jpeg;base64,..."
//
// ============================================================

async function sendFarmerMessage(
  userText
) {

  const context =
    getAppContext();


  const messagePayload = [
    ...chatHistory,

    {
      role: "user",
      content: userText,
    },
  ];


  try {

    console.log(
      "Sending AI request:",
      {
        message: userText,
        context: context,
        hasImage:
          !!selectedImageBase64,
        imageName:
          selectedImage?.name || null,
      }
    );


    const response =
      await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            // Current question

            message:
              userText,


            // Conversation

            messages:
              messagePayload,


            // Farmer context

            context:
              context,


            // Image

            image:
              selectedImageBase64 ||
              null,


            // Image filename

            imageName:
              selectedImage?.name ||
              null,

          }),
        }
      );


    const data =
      await response.json();


    console.log(
      "AI backend response:",
      data
    );


    if (!response.ok) {

      throw new Error(
        data.error ||
        `AI request failed (${response.status})`
      );

    }


    const rawReply =
      data.reply ||
      data.response;


    if (!rawReply) {

      throw new Error(
        "No AI response received from server."
      );

    }


    // ======================================================
    // SAVE CHAT HISTORY
    // ======================================================

    chatHistory.push({

      role: "user",

      content:
        userText,

    });


    chatHistory.push({

      role: "assistant",

      content:
        rawReply,

    });


    if (
      chatHistory.length >
      20
    ) {

      chatHistory =
        chatHistory.slice(-20);

    }


    return formatAssistantReply(
      rawReply
    );


  } catch (error) {

    console.error(
      "AI Assistant API Error:",
      error
    );


    return getFallbackResponse(
      userText
    );

  }
}


// ============================================================
// FALLBACK RESPONSE
// ============================================================

function getFallbackResponse(
  text
) {

  const t =
    text.toLowerCase();


  const responses = {

    wheat:
      "🌾 For wheat harvesting, the ideal time is when grain moisture content drops to 12-14%. Check if the stalk has turned golden brown.",

    fertilizer:
      "🧪 For tomatoes, use balanced NPK during early growth, then use a fertilizer with more potassium during fruiting.",

    yellow:
      "🍂 Yellow leaf edges in rice could indicate potassium deficiency, disease, or micronutrient problems. Check the leaves carefully for pests and disease symptoms.",

    pest:
      "🐛 Common signs of pest attack include holes in leaves, wilting, discoloration, and sticky residue. For treatment, first identify the pest before applying any pesticide.",

    price:
      "📊 Please check the Market Trends section for the latest mandi prices available for your registered location.",

    mandi:
      "📊 Please check our Market Trends section for live APMC rates near your registered district.",

  };


  const key =
    Object.keys(responses)
      .find(
        (k) =>
          t.includes(k)
      );


  if (key) {

    return responses[key];

  }


  return `
    🌱 I'm temporarily unable to reach the AI server.

    Please check your internet connection
    and try again.
  `;
}


// ============================================================
// SEND MESSAGE - UI HANDLER
// ============================================================

async function sendMessage() {

  const input =
    document.getElementById(
      "chat-input"
    );


  if (!input) return;


  const text =
    input.value.trim();


  // Allow image-only questions

  if (
    !text &&
    !selectedImageBase64
  ) {
    return;
  }


  const messageToSend =
    text ||
    "Please analyze this image and tell me what you see.";


  // ========================================================
  // ADD USER MESSAGE
  // ========================================================

  const now =
    new Date().toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );


  let userDisplayText =
    escapeHtml(
      text ||
      "Please analyze this image."
    );


  // Add image to user message

  if (selectedImageBase64) {

    userDisplayText += `

      <br>

      <img
        src="${selectedImageBase64}"
        class="mt-2 max-w-[220px]
        max-h-[220px]
        rounded-xl
        object-cover
        border border-white/20"
        alt="Uploaded crop"
      >

    `;

  }


  chatMessages.push({

    role: "user",

    text:
      userDisplayText,

    time:
      now,

  });


  input.value = "";

  input.disabled = true;


  const sendBtn =
    document.getElementById(
      "send-btn"
    );


  const voiceBtn =
    document.getElementById(
      "voice-btn"
    );


  const addImageBtn =
    document.getElementById(
      "add-image-btn"
    );


  if (sendBtn) {

    sendBtn.disabled = true;

    sendBtn.classList.add(
      "opacity-50",
      "cursor-not-allowed"
    );

  }


  if (voiceBtn) {

    voiceBtn.disabled = true;

  }


  if (addImageBtn) {

    addImageBtn.disabled = true;

  }


  // Remove suggestion cards

  document
    .getElementById(
      "suggestion-cards"
    )
    ?.remove();


  renderAllMessages();

  showTyping();


  // ========================================================
  // CALL AI
  // ========================================================

  try {

    const aiResponse =
      await sendFarmerMessage(
        messageToSend
      );


    chatMessages.push({

      role: "ai",

      text:
        aiResponse,

      time:
        new Date().toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          }
        ),

    });


  } catch (err) {

    console.error(
      "UI Error in sendMessage:",
      err
    );


    chatMessages.push({

      role: "ai",

      text:
        "Something went wrong while connecting to the assistant. Please try again.",

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

    removeTyping();

    // Remove uploaded image after sending

    removeSelectedImage();


    renderAllMessages();


    input.disabled = false;


    if (sendBtn) {

      sendBtn.disabled = false;

      sendBtn.classList.remove(
        "opacity-50",
        "cursor-not-allowed"
      );

    }


    if (voiceBtn) {

      voiceBtn.disabled = false;

    }


    if (addImageBtn) {

      addImageBtn.disabled = false;

    }


    input.focus();

  }
}


// ============================================================
// QUICK SUGGESTION
// ============================================================

function sendSuggestion(text) {

  const input =
    document.getElementById(
      "chat-input"
    );


  if (input) {

    input.value =
      text;

    sendMessage();

  }
}


// ============================================================
// SCROLL CHAT
// ============================================================

function scrollChat() {

  setTimeout(() => {

    const area =
      document.getElementById(
        "chat-area"
      );


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
      "Voice input is not supported here. Please use Google Chrome or Microsoft Edge."
    );

    return;
  }


  const recognition =
    new SpeechRecognition();


  // ========================================================
  // LANGUAGE
  // ========================================================

  const activeLang =
    localStorage.getItem(
      "selectedLanguage"
    ) || "en";


  const langMap = {

    hi: "hi-IN",

    mr: "mr-IN",

    pa: "pa-IN",

    te: "te-IN",

    gu: "gu-IN",

    en: "en-IN",

    bn: "bn-IN",

    kn: "kn-IN",

    ta: "ta-IN",

    ml: "ml-IN",

    or: "or-IN",

  };


  recognition.lang =
    langMap[activeLang] ||
    "en-IN";


  recognition.interimResults =
    true;


  recognition.continuous =
    false;


  recognition.maxAlternatives =
    1;


  // ========================================================
  // BUTTON
  // ========================================================

  const btn =
    document.getElementById(
      "voice-btn"
    );


  const input =
    document.getElementById(
      "chat-input"
    );


  if (btn) {

    btn.classList.add(
      "!bg-red-500",
      "!text-white"
    );

  }


  if (input) {

    input.placeholder =
      "Listening...";

  }


  // ========================================================
  // START
  // ========================================================

  recognition.onstart =
    () => {

      console.log(
        "Voice recognition started"
      );

    };


  // ========================================================
  // RESULT
  // ========================================================

  recognition.onresult =
    (event) => {

      let transcript =
        "";


      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0]
            .transcript;

      }


      if (input) {

        input.value =
          transcript.trim();

      }

    };


  // ========================================================
  // ERROR
  // ========================================================

  recognition.onerror =
    (event) => {

      console.error(
        "Voice recognition error:",
        event.error
      );


      if (
        event.error ===
        "not-allowed"
      ) {

        alert(
          "Microphone permission was denied. Please allow microphone access in your browser."
        );

      } else if (
        event.error ===
        "no-speech"
      ) {

        console.log(
          "No speech detected."
        );

      }

    };


  // ========================================================
  // END
  // ========================================================

  recognition.onend =
    () => {

      if (btn) {

        btn.classList.remove(
          "!bg-red-500",
          "!text-white"
        );

      }


      if (input) {

        input.placeholder =
          "Type your query or use voice...";

      }

    };


  // ========================================================
  // START RECOGNITION
  // ========================================================

  try {

    recognition.start();

  } catch (error) {

    console.error(
      "Could not start recognition:",
      error
    );


    if (btn) {

      btn.classList.remove(
        "!bg-red-500",
        "!text-white"
      );

    }


    if (input) {

      input.placeholder =
        "Type your query or use voice...";

    }

  }
}


// ============================================================
// CROP HEALTH RESULT BUTTONS
// ============================================================

window.continueToCropChatbot =
  function () {

    navigateTo(
      "ai-assistant"
    );

  };


window.backToCropHealthStart =
  function () {

    navigateTo(
      "crop-health"
    );

  };


// ============================================================
// GLOBAL EXPORTS
// ============================================================

window.renderAIAssistant =
  renderAIAssistant;

window.sendMessage =
  sendMessage;

window.sendSuggestion =
  sendSuggestion;

window.toggleVoice =
  toggleVoice;

window.openImagePicker =
  openImagePicker;

window.handleImageSelect =
  handleImageSelect;

window.removeSelectedImage =
  removeSelectedImage;

window.handleQuestionClick =
  window.handleQuestionClick;