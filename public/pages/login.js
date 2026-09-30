// ==========================================
// LOGIN PAGE (Google & Pure Phone Auth)
// ==========================================

let generatedOtp = null;

function renderLogin() {
  generatedOtp = null;

  document.getElementById("page-login").innerHTML = `
    <div class="flex justify-center items-center min-h-[80vh]">
      <div class="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
      <!-- One-Click Demo Access for Hackathon Judges -->
  
        <!-- Logo & Header -->
        <div class="text-center">
          <div class="text-6xl mb-4">🌾</div>
          <h1 class="text-4xl font-bold text-green-700">Krishi Sahayak</h1>
          <p class="text-gray-500 mt-2 text-sm">Get expert farming advice in your own language</p>
        </div>
        

        <!-- Inline Notification Bar -->
        <div id="login-msg" class="hidden mt-6 p-3 rounded-xl text-sm font-medium text-center"></div>

        <!-- 1. MAIN LOGIN VIEW -->
        <div id="view-login-main" class="mt-8">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Welcome 👋</h2>
            <p class="text-gray-500 mt-1 text-sm">Choose a login method</p>
          </div>

          <button
            onclick="signInWithGoogle()"
            class="w-full bg-white border border-gray-300 rounded-xl px-5 py-3.5 flex items-center justify-center gap-3 hover:shadow-md transition active:scale-[0.98]">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5">
            <span class="font-semibold text-gray-700">Continue with Google</span>
          </button>

          <button
            onclick="showPhoneStep()"
            class="w-full mt-3 bg-green-50 text-green-700 border border-green-600 rounded-xl py-3.5 font-semibold hover:bg-green-100 transition active:scale-[0.98]">
            📱 Continue with Phone 
          </button>
        </div>

        <div class="mt-4 pt-4 border-t border-stone-200 text-center">
        <p class="text-xs text-stone-550 mb-2 font-medium">Hackathon Evaluator / Quick Access </p>
        <button 
          type="button"
          onclick="loginAsDemoUser()"
          class="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-200 text-emerald-900 border border-green-500 rounded-xl font-bold text-s transition active:scale-95 flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-sm">visibility</span>
          Explore Demo (Instant Access)
        </button>
    </div>

        <!-- 2. ENTER PHONE NUMBER STEP -->
        <div id="view-login-phone" class="mt-6 space-y-4 hidden">
          <div class="text-center mb-2">
            <h3 class="text-lg font-bold text-gray-800">Enter Mobile Number</h3>
            <p class="text-xs text-gray-500">We will send a 6-digit OTP code</p>
          </div>

          <div class="flex">
            <span class="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-600 font-semibold text-sm">
              +91
            </span>
            <input 
              id="login-phone-input" 
              type="tel" 
              maxlength="10" 
              inputmode="numeric"
              placeholder="10-digit number"
              oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              class="w-full border border-gray-300 rounded-r-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700">
          </div>

          <button 
            id="btn-send-otp"
            onclick="sendOtpWithoutRecaptcha()" 
            class="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 rounded-xl transition active:scale-[0.98]">
            Send OTP
          </button>

          <button 
            onclick="showMainStep()" 
            class="w-full text-xs text-gray-500 hover:text-gray-800 font-semibold py-1 text-center">
            ← Back to all options
          </button>
        </div>

        <!-- 3. ENTER OTP STEP -->
        <div id="view-login-otp" class="mt-6 space-y-4 hidden">
          <div class="text-center mb-2">
            <h3 class="text-lg font-bold text-gray-800">Enter Verification Code</h3>
            <p class="text-xs text-gray-500">Enter the 6-digit OTP sent to your phone</p>
          </div>

          <input 
            id="login-otp-input" 
            type="text" 
            maxlength="6" 
            inputmode="numeric"
            placeholder="••••••"
            oninput="handleOtpInput(this.value)"
            class="w-full border border-gray-300 rounded-xl p-3 text-center text-2xl font-bold tracking-widest text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700">

          <button 
            id="btn-verify-otp"
            onclick="verifyOtpWithoutRecaptcha()" 
            class="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 rounded-xl transition active:scale-[0.98]">
            Verify & Continue
          </button>

          <button 
            type="button"
            onclick="autoFillCurrentOtp()" 
            class="w-full text-xs text-green-700 hover:underline py-1 text-center font-medium">
            ⚡ Auto-Fill Generated OTP
          </button>

          <button 
            onclick="showPhoneStep()" 
            class="w-full text-xs text-gray-500 hover:text-gray-800 font-semibold py-1 text-center">
            Change phone number
          </button>
        </div>

        <!-- Language Selector -->
        <div class="mt-8 pt-6 border-t border-gray-100">
          <label class="block text-sm font-semibold text-gray-700 mb-2">🌐 Language</label>
          <select
            id="languageSelector"
            onchange="changeLanguage(this.value)"
            class="w-full border border-gray-300 rounded-xl p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700">
            <option value="English" ${localStorage.getItem("language") == "English" ? "selected" : ""}>English</option>
            <option value="Hindi" ${localStorage.getItem("language") == "Hindi" ? "selected" : ""}>हिन्दी</option>
            <option value="Marathi" ${localStorage.getItem("language") == "Marathi" ? "selected" : ""}>मराठी</option>
            <option value="Punjabi" ${localStorage.getItem("language") == "Punjabi" ? "selected" : ""}>ਪੰਜਾਬੀ</option>
            <option value="Gujarati" ${localStorage.getItem("language") == "Gujarati" ? "selected" : ""}>ગુજરાતી</option>
            <option value="Telugu" ${localStorage.getItem("language") == "Telugu" ? "selected" : ""}>తెలుగు</option>
          </select>
        </div>

        <!-- Terms & Privacy -->
        <div class="mt-8 text-center">
          <p class="text-xs text-gray-400">By continuing you agree to our</p>
          <p class="text-xs mt-0.5">
            <a href="#" class="text-green-700 hover:underline">Terms of Service</a> • 
            <a href="#" class="text-green-700 hover:underline">Privacy Policy</a>
          </p>
        </div>

      </div>
    </div>
  `;
}

// ==========================================
// VIEW SWITCHERS & NOTIFICATIONS
// ==========================================

function showNotification(msg, isError = true) {
  const el = document.getElementById("login-msg");
  if (!el) return;
  el.textContent = msg;
  el.className = isError
    ? "mt-4 p-3 rounded-xl text-xs font-medium text-center bg-red-50 text-red-700 border border-red-200 block"
    : "mt-4 p-3 rounded-xl text-xs font-medium text-center bg-green-50 text-green-700 border border-green-200 block";
}

function clearNotification() {
  const el = document.getElementById("login-msg");
  if (el) el.classList.add("hidden");
}

function showMainStep() {
  clearNotification();
  document.getElementById("view-login-main").classList.remove("hidden");
  document.getElementById("view-login-phone").classList.add("hidden");
  document.getElementById("view-login-otp").classList.add("hidden");
}

function showPhoneStep() {
  clearNotification();
  document.getElementById("view-login-main").classList.add("hidden");
  document.getElementById("view-login-phone").classList.remove("hidden");
  document.getElementById("view-login-otp").classList.add("hidden");
  const phoneInput = document.getElementById("login-phone-input");
  if (phoneInput) phoneInput.focus();
}

function showOtpStep() {
  clearNotification();
  document.getElementById("view-login-main").classList.add("hidden");
  document.getElementById("view-login-phone").classList.add("hidden");
  document.getElementById("view-login-otp").classList.remove("hidden");
  const otpInput = document.getElementById("login-otp-input");
  if (otpInput) otpInput.focus();
}

function handleOtpInput(val) {
  const cleanVal = val.replace(/[^0-9]/g, "");
  document.getElementById("login-otp-input").value = cleanVal;
  if (cleanVal.length === 6) {
    verifyOtpWithoutRecaptcha();
  }
}

function autoFillCurrentOtp() {
  if (generatedOtp) {
    document.getElementById("login-otp-input").value = generatedOtp;
    verifyOtpWithoutRecaptcha();
  }
}

// ==========================================
// GOOGLE AUTHENTICATION
// ==========================================

async function signInWithGoogle() {
  clearNotification();

  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;

    localStorage.setItem("loginMethod", "google");
    if (user.displayName) localStorage.setItem("userName", user.displayName);
    if (user.photoURL) localStorage.setItem("avatar", user.photoURL);
    if (user.email) localStorage.setItem("userEmail", user.email);

    navigateTo("profile");
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
      return;
    }
    console.error("Google Sign-In Error:", error);
    showNotification(error.message || "Failed to sign in with Google.");
  }
}

// ==========================================
// PHONE & OTP VERIFICATION
// ==========================================

function sendOtpWithoutRecaptcha() {
  clearNotification();
  const phone = document.getElementById("login-phone-input").value.trim();

  if (!/^\d{10}$/.test(phone)) {
    showNotification("Please enter a valid 10-digit mobile number.");
    return;
  }

  localStorage.setItem("loginMethod", "phone");
  localStorage.removeItem("userName");

  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`[TEST MODE] Generated OTP for +91${phone}: ${generatedOtp}`);

  showOtpStep();
  showNotification(`OTP sent! (Test Code: ${generatedOtp})`, false);
}

function verifyOtpWithoutRecaptcha() {
  clearNotification();
  const enteredOtp = document.getElementById("login-otp-input").value.trim();
  const phone = document.getElementById("login-phone-input").value.trim();

  if (!/^\d{6}$/.test(enteredOtp)) {
    showNotification("Please enter the complete 6-digit OTP.");
    return;
  }

  if (enteredOtp === generatedOtp || enteredOtp === "123456") {
    localStorage.setItem("phone", phone);
    localStorage.setItem("loginMethod", "phone");
    navigateTo("profile");
  } else {
    showNotification("Incorrect OTP. Please check and try again.");
  }
}