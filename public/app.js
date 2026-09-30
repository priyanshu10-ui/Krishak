// ==========================================
// Krishi Sahayak - Main App Controller
// ==========================================


// ==========================================
// 1. INITIALIZE ALL PAGES
// ==========================================

function initApp() {

    console.log("🚀 Krishi Sahayak starting...");


    // --------------------------------------
    // STEP 1: Show splash immediately
    // --------------------------------------

    navigateTo("splash");

    console.log("🌱 Splash screen displayed");


    // --------------------------------------
    // STEP 2: Render application pages
    // --------------------------------------

    try {

        // ----------------------------------
        // Dashboard
        // ----------------------------------

        if (
            typeof renderDashboard === "function"
        ) {

            renderDashboard();

        }

        console.log(
            "✅ Dashboard rendered"
        );


        // ----------------------------------
        // Crop Health
        // ----------------------------------

        if (
            typeof renderCropHealth === "function"
        ) {

            renderCropHealth();

        }

        console.log(
            "✅ Crop Health rendered"
        );


        // ----------------------------------
        // Market
        // ----------------------------------

        if (
            typeof renderMarket === "function"
        ) {

            renderMarket();

        }

        console.log(
            "✅ Market rendered"
        );


        // ----------------------------------
        // AI Assistant
        // ----------------------------------

        if (
            typeof renderAIAssistant === "function"
        ) {

            renderAIAssistant();

        }

        console.log(
            "✅ AI Assistant rendered"
        );


        // ----------------------------------
        // Calculator
        // ----------------------------------

        if (
            typeof renderCalculator === "function"
        ) {

            renderCalculator();

        }

        console.log(
            "✅ Calculator rendered"
        );


        // ----------------------------------
        // Profile
        // ----------------------------------

        if (
            typeof renderProfile === "function"
        ) {

            renderProfile();

        }

        console.log(
            "✅ Profile rendered"
        );


        // ----------------------------------
        // Account
        // ----------------------------------

        if (
            typeof renderAccount === "function"
        ) {

            renderAccount();

        }

        console.log(
            "✅ Account rendered"
        );


        // ----------------------------------
        // Login
        // ----------------------------------

        if (
            typeof renderLogin === "function"
        ) {

            renderLogin();

        }

        console.log(
            "✅ Login rendered"
        );


        // ----------------------------------
        // Language
        // ----------------------------------

        if (
            typeof renderLanguage === "function"
        ) {

            renderLanguage();

        }

        console.log(
            "✅ Language rendered"
        );


        // ----------------------------------
        // IMPORTANT:
        // DO NOT initialize subsidies here.
        //
        // It will be initialized when the
        // farmer opens the Subsidies page.
        // ----------------------------------


        // ----------------------------------
        // Apply saved language
        // ----------------------------------

        const savedLanguage =
            localStorage.getItem(
                "selectedLanguage"
            ) || "en";


        console.log(
            "🌐 Applying saved language:",
            savedLanguage
        );


        if (
            typeof applyLanguage === "function"
        ) {

            applyLanguage(
                savedLanguage
            );

        }


    }
    catch (error) {

        console.error(
            "❌ Page rendering error:",
            error
        );

        // Don't let a page rendering error
        // break the entire application.

    }



    // ======================================
    // STEP 3: FINISH SPLASH
    // ======================================

    setTimeout(() => {

        console.log(
            "⏰ Splash timer finished"
        );


        splashFinished = true;


        console.log(
            "splashFinished =",
            splashFinished
        );


        // ----------------------------------
        // Check Firebase user
        // ----------------------------------

        const user =
            typeof auth !== "undefined"
                ? auth.currentUser
                : null;


        const localPhone =
            localStorage.getItem(
                "phone"
            );


        const localUser =
            localStorage.getItem(
                "userName"
            );


        console.log(
            "👤 Current Firebase user:",
            user
        );


        // ----------------------------------
        // USER LOGGED IN
        // ----------------------------------

        if (
            user ||
            localPhone ||
            localUser
        ) {

            console.log(
                "👤 Existing user found"
            );


            checkUserProfile(
                user
            );

        }


        // ----------------------------------
        // USER NOT LOGGED IN
        // ----------------------------------

        else {

            console.log(
                "🔐 No user found → Login"
            );


            hideAppNavigation();


            navigateTo(
                "login"
            );

        }


    }, 2000);

}



// ==========================================
// START APPLICATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initApp
);



// ==========================================
// 2. PAGE NAVIGATION
// ==========================================

function navigateTo(page) {

    console.log(
        "Navigating to:",
        page
    );


    // ======================================
    // DYNAMIC RE-RENDER
    // ======================================


    // --------------------------------------
    // Dashboard
    // --------------------------------------

    if (
        page === "dashboard" &&
        typeof renderDashboard === "function"
    ) {

        renderDashboard();

    }


    // --------------------------------------
    // Profile
    // --------------------------------------

    if (
        page === "profile" &&
        typeof renderProfile === "function"
    ) {

        renderProfile();

    }


    // --------------------------------------
    // Account
    // --------------------------------------

    if (
        page === "account" &&
        typeof renderAccount === "function"
    ) {

        renderAccount();

    }


    // --------------------------------------
    // Government Schemes / Subsidies
    // --------------------------------------

    if (
        page === "subsidies" &&
        typeof initSubsidiesPage === "function"
    ) {

        console.log(
            "🌾 Opening Government Schemes..."
        );


        initSubsidiesPage();


        console.log(
            "✅ Government Schemes rendered"
        );

    }



    // ======================================
    // HIDE ALL PAGES
    // ======================================

    document
        .querySelectorAll(
            ".page-content"
        )
        .forEach((p) => {

            p.classList.remove(
                "active"
            );


            p.style.display =
                "none";

        });



    // ======================================
    // SHOW REQUESTED PAGE
    // ======================================

    const target =
        document.getElementById(
            "page-" + page
        );


    if (!target) {

        console.error(
            "❌ Page not found:",
            "page-" + page
        );

        return;

    }


    target.classList.add(
        "active"
    );


    target.style.display =
        "block";



    // ======================================
    // SPLASH SCREEN
    // ======================================

    const splash =
        document.getElementById(
            "page-splash"
        );


    if (splash) {

        if (
            page === "splash"
        ) {

            splash.style.display =
                "flex";

        }
        else {

            splash.style.display =
                "none";

        }

    }



    // ======================================
    // TOP NAVIGATION
    // ======================================

    document
        .querySelectorAll(
            ".nav-top-link"
        )
        .forEach((link) => {

            link.classList.toggle(
                "active",
                link.dataset.page === page
            );

        });



    // ======================================
    // SIDE NAVIGATION
    // ======================================

    document
        .querySelectorAll(
            ".side-nav-link"
        )
        .forEach((link) => {

            if (
                link.dataset.page
            ) {

                const isActive =
                    link.dataset.page === page;


                link.classList.toggle(
                    "active",
                    isActive
                );


                const icon =
                    link.querySelector(
                        ".material-symbols-outlined"
                    );


                if (icon) {

                    icon.style.fontVariationSettings =
                        isActive
                            ? "'FILL' 1"
                            : "'FILL' 0";

                }

            }

        });



    // ======================================
    // BOTTOM NAVIGATION
    // ======================================

    document
        .querySelectorAll(
            ".bottom-nav-link"
        )
        .forEach((link) => {

            const isActive =
                link.dataset.page === page;


            link.classList.toggle(
                "active",
                isActive
            );


            const icon =
                link.querySelector(
                    ".material-symbols-outlined"
                );


            if (icon) {

                icon.style.fontVariationSettings =
                    isActive
                        ? "'FILL' 1"
                        : "'FILL' 0";

            }

        });



    // ======================================
    // FLOATING AI BUTTON
    // ======================================

    const fab =
        document.getElementById(
            "fab-ai"
        );


    if (fab) {

        const hiddenPages = [

            "splash",

            "loading",

            "language",

            "login",

            "profile"

        ];


        if (
            hiddenPages.includes(
                page
            ) ||
            page === "ai-assistant"
        ) {

            fab.style.display =
                "none";

        }
        else {

            fab.style.display =
                "flex";

        }

    }



    // ======================================
    // SCROLL TO TOP
    // ======================================

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// ==========================================
// 3. SHOW APPLICATION NAVIGATION
// ==========================================

function showAppNavigation() {

    const topNav =
        document.getElementById(
            "topnav"
        );


    const sideNav =
        document.getElementById(
            "sidenav"
        );


    if (topNav) {

        topNav.style.display =
            "flex";

    }


    if (sideNav) {

        sideNav.style.display =
            "flex";

    }

}



// ==========================================
// 4. HIDE APPLICATION NAVIGATION
// ==========================================

function hideAppNavigation() {

    const topNav =
        document.getElementById(
            "topnav"
        );


    const sideNav =
        document.getElementById(
            "sidenav"
        );


    if (topNav) {

        topNav.style.display =
            "none";

    }


    if (sideNav) {

        sideNav.style.display =
            "none";

    }

}



// ==========================================
// 5. UPDATE APPLICATION HEADER
// ==========================================

function updateAppHeader() {

    const currentName =
        localStorage.getItem(
            "userName"
        ) || "Farmer";


    const currentAvatar =
        localStorage.getItem(
            "avatar"
        );



    // --------------------------------------
    // Sidebar Greeting
    // --------------------------------------

    const sidebarGreeting =
        document.getElementById(
            "sidebar-user-name"
        );


    if (sidebarGreeting) {

        sidebarGreeting.textContent =
            currentName;

    }



    // --------------------------------------
    // Top Navbar Farmer Name
    // --------------------------------------

    const navUserName =
        document.getElementById(
            "nav-user-name"
        );


    if (navUserName) {

        navUserName.textContent =
            currentName;

    }



    // --------------------------------------
    // Top Navbar Avatar
    // --------------------------------------

    const navAvatar =
        document.getElementById(
            "nav-user-avatar"
        );


    if (navAvatar) {

        navAvatar.src =
            currentAvatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                currentName
            )}&background=2d5a27&color=fff&bold=true`;

    }

}



// ==========================================
// 6. CHECK USER PROFILE
// ==========================================

function checkUserProfile(user) {

    const savedVillage =
        localStorage.getItem(
            "village"
        );


    const savedState =
        localStorage.getItem(
            "state"
        );


    if (
        savedVillage &&
        savedState
    ) {

        console.log(
            "✅ User profile found"
        );


        showAppNavigation();


        updateAppHeader();


        navigateTo(
            "dashboard"
        );

    }
    else {

        console.log(
            "⚠️ User profile incomplete"
        );


        hideAppNavigation();


        navigateTo(
            "profile"
        );

    }

}



// ==========================================
// 7. LOGOUT
// ==========================================

function logout() {

    console.log(
        "🚪 Logging out..."
    );


    // --------------------------------------
    // Firebase sign out
    // --------------------------------------

    if (
        typeof auth !== "undefined" &&
        auth.signOut
    ) {

        auth.signOut()
            .catch(
                (err) => {

                    console.warn(
                        "Firebase signout omitted:",
                        err
                    );

                }
            );

    }



    // --------------------------------------
    // Clear local data
    // --------------------------------------

    localStorage.removeItem(
        "userName"
    );


    localStorage.removeItem(
        "phone"
    );


    localStorage.removeItem(
        "avatar"
    );


    localStorage.removeItem(
        "loginMethod"
    );


    localStorage.removeItem(
        "village"
    );


    localStorage.removeItem(
        "district"
    );


    localStorage.removeItem(
        "state"
    );


    localStorage.removeItem(
        "crops"
    );



    // --------------------------------------
    // Reset header
    // --------------------------------------

    const navName =
        document.getElementById(
            "nav-user-name"
        );


    if (navName) {

        navName.textContent =
            "Farmer";

    }


    const sidebarName =
        document.getElementById(
            "sidebar-user-name"
        );


    if (sidebarName) {

        sidebarName.textContent =
            "Farmer";

    }


    const navAvatar =
        document.getElementById(
            "nav-user-avatar"
        );


    if (navAvatar) {

        navAvatar.src =
            "https://ui-avatars.com/api/?name=Farmer&background=2d5a27&color=fff&bold=true";

    }



    // --------------------------------------
    // Hide navigation
    // --------------------------------------

    hideAppNavigation();


    // --------------------------------------
    // Go to login
    // --------------------------------------

    navigateTo(
        "login"
    );

}



// ==========================================
// GLOBAL LOGOUT FUNCTIONS
// ==========================================

window.logout =
    logout;


window.logoutUser =
    logout;

    // ==========================================
// 🌓 DARK / LIGHT MODE CONTROLLER
// ==========================================

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  updateThemeIcon(isDark);
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById("theme-toggle-icon");
  if (icon) {
    icon.textContent = isDark ? "light_mode" : "dark_mode";
    icon.classList.toggle("text-yellow-400", isDark);
    icon.classList.toggle("text-stone-600", !isDark);
  }
}

// Attach to startup
window.toggleDarkMode = toggleDarkMode;
document.addEventListener("DOMContentLoaded", initTheme);


function loginAsDemoUser() {
  // Pre-seed local storage with an active farmer profile
  localStorage.setItem("userName", "Evaluator Guest");
  localStorage.setItem("phone", "9876543210");
  localStorage.setItem("village", "Babina");
  localStorage.setItem("district", "Jhansi");
  localStorage.setItem("state", "Uttar Pradesh");
  localStorage.setItem("crops", "Wheat, Mustard, Gram");
  localStorage.setItem("loginMethod", "demo");

  // Show app layout and jump straight to the dashboard
  if (typeof showAppNavigation === "function") showAppNavigation();
  if (typeof updateAppHeader === "function") updateAppHeader();
  if (typeof navigateTo === "function") navigateTo("dashboard");
}
// Function to notify Flutter wrapper safely
function notifyFlutterTheme(isDark) {
  if (window.ThemeChannel && typeof window.ThemeChannel.postMessage === "function") {
    window.ThemeChannel.postMessage(isDark ? "dark" : "light");
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  updateThemeIcon(isDark);
  notifyFlutterTheme(isDark);
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
  notifyFlutterTheme(isDark); // Triggers instant status bar update in Flutter app
}