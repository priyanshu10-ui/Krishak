document.addEventListener("DOMContentLoaded", function () {

    const languageBtn = document.getElementById("languageBtn");
    const languageSelector = document.getElementById("languageSelector");

    if (!languageBtn || !languageSelector) return;

    // ==========================================
    // CREATE LANGUAGE DROPDOWN
    // ==========================================

    const languageMenu = document.createElement("div");

    languageMenu.id = "languageMenu";
    languageMenu.style.display = "none";
    languageMenu.style.position = "absolute";
    languageMenu.style.top = "calc(100% + 8px)";
    languageMenu.style.right = "0";
    languageMenu.style.width = "150px";
    languageMenu.style.background = "white";
    languageMenu.style.border = "1px solid #e5e7eb";
    languageMenu.style.borderRadius = "10px";
    languageMenu.style.padding = "6px";
    languageMenu.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
    languageMenu.style.zIndex = "9999";
    languageMenu.style.flexDirection = "column";

    languageMenu.innerHTML = `
        <button class="language-option" data-lang="en">English</button>
        <button class="language-option" data-lang="hi">हिन्दी</button>
        <button class="language-option" data-lang="mr">मराठी</button>
        <button class="language-option" data-lang="pa">ਪੰਜਾਬੀ</button>
        <button class="language-option" data-lang="te">తెలుగు</button>
        <button class="language-option" data-lang="gu">ગુજરાતી</button>
    `;

    languageSelector.appendChild(languageMenu);


    // ==========================================
    // OPEN / CLOSE DROPDOWN
    // ==========================================

    languageBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        languageMenu.style.display = languageMenu.style.display === "none" ? "flex" : "none";
    });

    document.addEventListener("click", function () {
        if (languageMenu) {
            languageMenu.style.display = "none";
        }
    });


    // ==========================================
    // LANGUAGE SELECTION
    // ==========================================

    const languageOptions = document.querySelectorAll(".language-option");

    languageOptions.forEach(function (option) {
        option.addEventListener("click", function (event) {
            event.stopPropagation();

            const selectedLanguage = this.textContent.trim();
            const selectedLangCode = this.dataset.lang;

            localStorage.setItem("selectedLanguage", selectedLangCode);

            languageBtn.textContent = selectedLanguage + " ▼";
            languageMenu.style.display = "none";

            applyLanguage(selectedLangCode);
        });
    });


    // ==========================================
    // APPLY LANGUAGE
    // ==========================================

    function applyLanguage(lang) {

        if (typeof translations === "undefined" || !translations[lang]) return;

        // CALCULATOR LANGUAGE
        if (typeof renderCalculator === "function") {
            renderCalculator();
        }

        // CROP HEALTH LANGUAGE
        if (typeof applyCropHealthLanguage === "function") {
            applyCropHealthLanguage(lang);
        }

        // AI ASSISTANT LANGUAGE
        if (typeof renderAIAssistant === "function") {
            renderAIAssistant();
        }

        // MARKET LANGUAGE
        if (typeof applyMarketLanguage === "function") {
            applyMarketLanguage(lang);
        }


        // ==========================================
        // UPDATE LANGUAGE BUTTON
        // ==========================================

        const languageNames = {
            en: "English",
            hi: "हिन्दी",
            mr: "मराठी",
            pa: "ਪੰਜਾਬੀ",
            te: "తెలుగు",
            gu: "ગુજરાતી"
        };

        if (languageBtn) {
            languageBtn.textContent = (languageNames[lang] || "English") + " ▼";
        }


        // ==========================================
        // TOP NAVIGATION
        // ==========================================

        const topLinks = document.querySelectorAll(".nav-top-link");

        topLinks.forEach(function (link) {
            const page = link.dataset.page;

            if (page === "dashboard" && translations[lang].dashboard) {
                link.textContent = translations[lang].dashboard;
            }

            if (page === "crop-health" && translations[lang].cropHealth) {
                link.textContent = translations[lang].cropHealth;
            }

            if (page === "market" && translations[lang].marketTrends) {
                link.textContent = translations[lang].marketTrends;
            }

            if (page === "subsidies" && (translations[lang].subsidies || translations[lang].governmentSchemes)) {
                link.textContent = translations[lang].subsidies || translations[lang].governmentSchemes;
            }

            if (page === "ai-assistant" && translations[lang].aiAssistant) {
                link.textContent = translations[lang].aiAssistant;
            }
        });


        // ==========================================
        // SIDEBAR (CLEAN REPLACEMENT - NO DUPLICATION)
        // ==========================================

        const sideLinks = document.querySelectorAll(".side-nav-link");

        sideLinks.forEach(function (link) {
            const page = link.dataset.page;
            let targetText = "";

            if (page === "dashboard") targetText = translations[lang].dashboard;
            if (page === "crop-health") targetText = translations[lang].cropHealth;
            if (page === "market") targetText = translations[lang].marketTrends;
            if (page === "subsidies") targetText = translations[lang].subsidies || translations[lang].governmentSchemes || "Government Schemes";
            if (page === "ai-assistant") targetText = translations[lang].aiAssistant;
            if (page === "calculator") targetText = translations[lang].pesticideCalc;
            if (page === "account") targetText = translations[lang].profile || translations[lang].account || "Profile";

            if (targetText) {
                const textSpan = link.querySelector("span:not(.material-symbols-outlined)");
                if (textSpan) {
                    textSpan.textContent = targetText;
                } else if (link.lastChild && link.lastChild.nodeType === Node.TEXT_NODE) {
                    link.lastChild.textContent = " " + targetText;
                }
            }
        });


        // ==========================================
        // SEARCH BOX
        // ==========================================

        const searchBox = document.getElementById("global-search");

        if (searchBox && translations[lang].search) {
            searchBox.placeholder = translations[lang].search;
        }


        // ==========================================
        // PROFILE & SUPPORT
        // ==========================================

        const accountTitle = document.getElementById("nav-account-title");
        if (accountTitle) {
            accountTitle.textContent = translations[lang].profile || translations[lang].account || "Profile";
        }

        const supportTitle = document.getElementById("nav-support-title");
        if (supportTitle) {
            supportTitle.textContent = translations[lang].support || "Support";
        }


        // ==========================================
        // HELP TEXT & BUTTON
        // ==========================================

        const helpText = document.querySelector("#sidenav .text-xs.opacity-80");
        if (helpText && translations[lang].help) {
            helpText.textContent = translations[lang].help;
        }

        const helpButton = document.querySelector("#sidenav .bg-white.text-\\[\\#2d5a27\\]");
        if (helpButton && translations[lang].helpCenter) {
            helpButton.textContent = translations[lang].helpCenter;
        }


        // ==========================================
        // USER GREETING & PARTNER TEXT
        // ==========================================

        const greetingText = document.querySelector("#sidenav .text-stone-500.font-medium");
        if (greetingText && translations[lang].greeting) {
            greetingText.textContent = translations[lang].greeting;
        }

        const partnerText = document.querySelector("#sidenav .text-\\[10px\\]");
        if (partnerText && translations[lang].farmerPartner) {
            partnerText.textContent = translations[lang].farmerPartner;
        }


        // ==========================================
        // LOGOUT BUTTON
        // ==========================================

        document.querySelectorAll("button[onclick*='logout']").forEach((btn) => {
            if (translations[lang].logout) {
                btn.textContent = translations[lang].logout;
            }
        });


        // ==========================================
        // REFRESH ACTIVE VIEWS
        // ==========================================

        if (typeof applyDashboardLanguage === "function") {
            applyDashboardLanguage(lang);
        }

        if (typeof renderDashboard === "function") {
            renderDashboard();
        }

        if (typeof renderMarket === "function") {
            renderMarket();
        }

    }

    // Expose applyLanguage globally
    window.applyLanguage = applyLanguage;

    // ==========================================
    // INITIAL LANGUAGE ON PAGE LOAD
    // ==========================================

    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    applyLanguage(savedLanguage);

});


// ==========================================
// NOTIFICATION DROPDOWN
// ==========================================

function showNotifications() {

    const dropdown = document.getElementById("notification-dropdown");

    if (!dropdown) return;

    dropdown.classList.toggle("hidden");
}


// Close notification dropdown when clicking outside

document.addEventListener("click", function (event) {

    const dropdown = document.getElementById("notification-dropdown");
    const button = document.getElementById("notification-btn");

    if (!dropdown || !button) return;

    if (
        !dropdown.contains(event.target) &&
        !button.contains(event.target)
    ) {
        dropdown.classList.add("hidden");
    }

});