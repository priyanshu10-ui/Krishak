// ==========================================
// KRISHI SAHAYAK - FARMER ACCOUNT & SETTINGS
// ==========================================

function renderAccount() {
  const page = document.getElementById("page-account");
  if (!page) return;

  const savedName = localStorage.getItem("userName") || "Farmer";
  const savedPhone = localStorage.getItem("phone") || "Not provided";
  const savedState = localStorage.getItem("state") || "Not provided";
  const savedDistrict = localStorage.getItem("district") || "Not provided";
  const savedVillage = localStorage.getItem("village") || "Not provided";
  const savedLang = localStorage.getItem("language") || "English";
  const savedCrops = localStorage.getItem("crops") || "Wheat, Rice";
  const loginMethod = localStorage.getItem("loginMethod") || "phone";
  const savedAvatar = localStorage.getItem("avatar") || `https://ui-avatars.com/api/?name=${encodeURIComponent(savedName)}&background=2d5a27&color=fff&bold=true`;

  page.innerHTML = `
    <div class="max-w-5xl mx-auto space-y-8">
      
      <!-- Top Account Hero Banner -->
      <div class="bg-gradient-to-r from-green-900 via-green-800 to-green-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div class="flex flex-col md:flex-row items-center gap-6 z-10 text-center md:text-left">
          <div class="relative">
            <img 
              id="account-hero-avatar"
              src="${savedAvatar}" 
              alt="Farmer Profile" 
              class="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg" />
            <span class="absolute bottom-1 right-1 w-5 h-5 bg-green-400 border-2 border-green-900 rounded-full"></span>
          </div>

          <div>
            <div class="flex items-center justify-center md:justify-start gap-3">
              <h1 class="text-2xl md:text-3xl font-bold font-[Lexend]">${savedName}</h1>
              <span class="bg-green-700/80 text-green-100 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-green-400/30">
                Verified Farmer 🌾
              </span>
            </div>
            <p class="text-green-200 text-sm mt-1">
              📍 ${savedVillage !== "Not provided" ? `${savedVillage}, ` : ""}${savedDistrict !== "Not provided" ? `${savedDistrict}, ` : ""}${savedState}
            </p>
            <p class="text-xs text-green-300/80 mt-2 font-mono">
              📱 +91 ${savedPhone} • Login via ${loginMethod.toUpperCase()}
            </p>
          </div>
        </div>

        <div class="flex gap-3 z-10">
          <button 
            onclick="logout()" 
            class="bg-red-600/90 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md">
            <span class="material-symbols-outlined text-sm">logout</span> Logout
          </button>
        </div>
      </div>

      <!-- Account Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Side: Quick Profile Summary -->
        <div class="space-y-6">
          <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h3 class="font-bold text-stone-800 text-base flex items-center gap-2">
              <span class="material-symbols-outlined text-green-700">badge</span> Account Overview
            </h3>

            <div class="divide-y divide-stone-100 text-sm">
              <div class="py-2.5 flex justify-between items-center">
                <span class="text-stone-500">Member Status</span>
                <span class="font-semibold text-green-700">Active</span>
              </div>
              <div class="py-2.5 flex justify-between items-center">
                <span class="text-stone-500">Primary Language</span>
                <span class="font-semibold text-stone-800">${savedLang}</span>
              </div>
              <div class="py-2.5 flex justify-between items-center">
                <span class="text-stone-500">Main Crops</span>
                <span class="font-semibold text-stone-800">${savedCrops}</span>
              </div>
              <div class="py-2.5 flex justify-between items-center">
                <span class="text-stone-500">Advisory Alerts</span>
                <span class="font-semibold text-green-600">Enabled</span>
              </div>
            </div>
          </div>

          <div class="bg-emerald-50 rounded-2xl p-5 border border-emerald-200/80 text-emerald-900">
            <div class="flex items-center gap-2 font-bold text-sm">
              <span class="material-symbols-outlined text-emerald-700">support_agent</span> Krishi Sahayak Help
            </div>
            <p class="text-xs text-emerald-700 mt-2 leading-relaxed">
              Need assistance updating your land records or connecting your soil test data? Our agricultural support team is available 24/7.
            </p>
            <button onclick="navigateTo('ai-assistant')" class="mt-3 text-xs bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-800 transition">
              Chat with AI Assistant
            </button>
          </div>
        </div>

        <!-- Right Side: Editable Details Form -->
        <div class="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-xs space-y-6">
          <div class="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 class="text-xl font-bold text-stone-900">Personal & Farm Settings</h2>
              <p class="text-xs text-stone-500 mt-0.5">Update your contact information and farmland location</p>
            </div>
          </div>

          <div id="account-msg" class="hidden p-3 rounded-xl text-xs font-semibold"></div>

          <form id="account-form" onsubmit="saveAccountDetails(event)" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-semibold text-stone-600 mb-1.5">Full Name *</label>
                <input 
                  id="acc-name" 
                  type="text" 
                  value="${savedName}" 
                  required
                  class="w-full border border-stone-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700">
              </div>

              <div>
                <label class="block text-xs font-semibold text-stone-600 mb-1.5">Phone Number (10 Digits) *</label>
                <input 
                  id="acc-phone" 
                  type="tel" 
                  maxlength="10"
                  inputmode="numeric"
                  value="${savedPhone === 'Not provided' ? '' : savedPhone}" 
                  oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                  required
                  class="w-full border border-stone-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label class="block text-xs font-semibold text-stone-600 mb-1.5">State *</label>
                <input 
                  id="acc-state" 
                  type="text" 
                  value="${savedState === 'Not provided' ? '' : savedState}"
                  placeholder="e.g. Uttar Pradesh" 
                  required
                  class="w-full border border-stone-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700">
              </div>

              <div>
                <label class="block text-xs font-semibold text-stone-600 mb-1.5">District *</label>
                <input 
                  id="acc-district" 
                  type="text" 
                  value="${savedDistrict === 'Not provided' ? '' : savedDistrict}"
                  placeholder="e.g. Jhansi" 
                  required
                  class="w-full border border-stone-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700">
              </div>

              <div>
                <label class="block text-xs font-semibold text-stone-600 mb-1.5">Village *</label>
                <input 
                  id="acc-village" 
                  type="text" 
                  value="${savedVillage === 'Not provided' ? '' : savedVillage}"
                  placeholder="e.g. Shivaji Nagar" 
                  required
                  class="w-full border border-stone-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-semibold text-stone-600 mb-1.5">Primary Preferred Language *</label>
                <select 
                  id="acc-language" 
                  class="w-full border border-stone-300 rounded-xl p-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-700">
                  <option value="English" ${savedLang === 'English' ? 'selected' : ''}>English</option>
                  <option value="Hindi" ${savedLang === 'Hindi' ? 'selected' : ''}>हिन्दी (Hindi)</option>
                  <option value="Marathi" ${savedLang === 'Marathi' ? 'selected' : ''}>मराठी (Marathi)</option>
                  <option value="Punjabi" ${savedLang === 'Punjabi' ? 'selected' : ''}>ਪੰਜਾਬੀ (Punjabi)</option>
                  <option value="Gujarati" ${savedLang === 'Gujarati' ? 'selected' : ''}>ગુજરાતી (Gujarati)</option>
                  <option value="Telugu" ${savedLang === 'Telugu' ? 'selected' : ''}>తెలుగు (Telugu)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-stone-600 mb-1.5">Main Crops Cultivated</label>
                <input 
                  id="acc-crops" 
                  type="text" 
                  value="${savedCrops}" 
                  placeholder="e.g. Wheat, Mustard, Rice"
                  class="w-full border border-stone-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700">
              </div>
            </div>

            <div class="pt-4 flex justify-end gap-3">
              <button 
                type="button" 
                onclick="navigateTo('dashboard')" 
                class="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-50 transition">
                Back to Dashboard
              </button>
              <button 
                type="submit" 
                class="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition active:scale-95">
                Save Account Changes
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  `;
}

// Save Updated Account Details
async function saveAccountDetails(event) {
  event.preventDefault();

  const name = document.getElementById("acc-name").value.trim();
  const phone = document.getElementById("acc-phone").value.trim();
  const state = document.getElementById("acc-state").value.trim();
  const district = document.getElementById("acc-district").value.trim();
  const village = document.getElementById("acc-village").value.trim();
  const language = document.getElementById("acc-language").value;
  const crops = document.getElementById("acc-crops").value.trim();
  const msgEl = document.getElementById("account-msg");

  if (!name || phone.length !== 10 || !state || !district || !village) {
    if (msgEl) {
      msgEl.textContent = "Please fill in all mandatory fields with valid information.";
      msgEl.className = "p-3 rounded-xl text-xs font-semibold bg-red-50 text-red-700 border border-red-200 block";
    }
    return;
  }

  // 1. Save locally
  localStorage.setItem("userName", name);
  localStorage.setItem("phone", phone);
  localStorage.setItem("state", state);
  localStorage.setItem("district", district);
  localStorage.setItem("village", village);
  localStorage.setItem("language", language);
  localStorage.setItem("crops", crops);

  // 2. Sync to Firestore if initialized
  try {
    const user = typeof auth !== "undefined" ? auth.currentUser : null;
    if (user && typeof db !== "undefined") {
      await db.collection("users").doc(user.uid).set(
        { name, phone, state, district, village, language, crops },
        { merge: true }
      );
    }
  } catch (err) {
    console.warn("Firestore sync skipped:", err);
  }

  // 3. Update global header text & avatar
  if (typeof updateAppHeader === "function") {
    updateAppHeader();
  }

  // 4. Notify user and re-render
  if (msgEl) {
    msgEl.textContent = "✅ Account details updated successfully!";
    msgEl.className = "p-3 rounded-xl text-xs font-semibold bg-green-50 text-green-700 border border-green-200 block";
    setTimeout(() => {
      renderAccount();
    }, 1200);
  }
}