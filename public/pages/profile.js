// ==========================================
// Complete list of all 28 States & 8 Union Territories of India
// ==========================================
const stateDistrictData = {
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nandyal", "NTR", "Prakasam", "Srikakulam", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Changlang", "Dibang Valley", "East Kameng", "East Siang", "Itanagar", "Lohit", "Namsai", "Tawang", "Tirap", "West Kameng"],
  "Assam": ["Baksa", "Barpeta", "Cachar", "Darrang", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Guwahati", "Jorhat", "Kamrup", "Karbi Anglong", "Karimganj", "Nagaon", "Sivasagar", "Sonitpur", "Tinsukia"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Katihar", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Patna", "Purnia", "Rohtas", "Samastipur", "Saran", "Siwan", "Vaishali"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Bastar", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Janjgir-Champa", "Kanker", "Korba", "Raigarh", "Raipur", "Rajnandgaon", "Surguja"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Dahod", "Gandhinagar", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mehsana", "Morbi", "Navsari", "Patan", "Porbandar", "Rajkot", "Surat", "Surendranagar", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Lakshadweep"],
  "Madhya Pradesh": ["Anuppur", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saitual", "Serchhip", "Siaha"],
  "Nagaland": ["Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tseminyu", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Baudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Hanamkonda", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lakhimpur Kheri", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

// ==========================================
// RENDER PROFILE PAGE
// ==========================================

function renderProfile() {
  const page = document.getElementById("page-profile");
  if (!page) return;

  const savedName = localStorage.getItem("userName") || "";
  const loginMethod = localStorage.getItem("loginMethod") || "";
  const hideNameInput = loginMethod === "google" && savedName.trim().length > 0;

  page.innerHTML = `
    <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
      <h2 class="text-3xl font-bold text-green-700 mb-6">Complete Your Profile</h2>

      <!-- General Error Banner -->
      <div id="error-message" class="hidden mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-medium"></div>

      <div class="space-y-4">
        <!-- Full Name Input (Hidden if Google login already provided name) -->
        <div id="name-container" class="${hideNameInput ? 'hidden' : 'block'}">
          <input
            id="user-name"
            type="text"
            placeholder="Full Name (किसान का पूरा नाम) *"
            value="${savedName}"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700">
        </div>

        <!-- Phone Number Input -->
        <div>
          <input
            id="phone"
            type="tel"
            placeholder="Phone Number (10 Digits) *"
            maxlength="10"
            inputmode="numeric"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700">
        </div>

        <!-- State Input -->
        <div class="relative">
          <input
            id="state"
            type="text"
            placeholder="Type or Select State *"
            autocomplete="off"
            onfocus="filterStates()"
            oninput="filterStates()"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700">
          <div id="state-dropdown" 
            class="hidden absolute z-20 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto shadow-lg mt-1">
          </div>
        </div>

        <!-- District Input -->
        <div class="relative">
          <input
            id="district"
            type="text"
            placeholder="Type or Select District *"
            autocomplete="off"
            disabled
            onfocus="filterDistricts()"
            oninput="filterDistricts()"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:bg-gray-100 disabled:cursor-not-allowed">
          <div id="district-dropdown" 
            class="hidden absolute z-20 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto shadow-lg mt-1">
          </div>
        </div>

        <!-- Village Input -->
        <div>
          <input
            id="village"
            type="text"
            placeholder="Village *"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700">
        </div>

        <!-- Language Dropdown -->
        <div>
          <select
            id="language"
            onchange="this.style.color = '#374151'"
            class="w-full border rounded-lg p-3 bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700">
            <option value="" disabled selected>Select Preferred Language *</option>
            <option value="English" class="text-gray-700">English</option>
            <option value="Hindi" class="text-gray-700">हिन्दी (Hindi)</option>
            <option value="Telugu" class="text-gray-700">తెలుగు (Telugu)</option>
            <option value="Tamil" class="text-gray-700">தமிழ் (Tamil)</option>
            <option value="Marathi" class="text-gray-700">मराठी (Marathi)</option>
            <option value="Bengali" class="text-gray-700">বাংলা (Bengali)</option>
            <option value="Punjabi" class="text-gray-700">ਪੰਜਾਬੀ (Punjabi)</option>
            <option value="Gujarati" class="text-gray-700">ગુજરાતી (Gujarati)</option>
          </select>
        </div>

        <!-- Main Crops Input -->
        <div>
          <input
            id="crops"
            type="text"
            placeholder="Main Crops (e.g. Wheat, Rice)"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-700">
        </div>

        <button
          id="save-profile-btn"
          onclick="saveProfile()"
          class="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition font-bold">
          Save Profile
        </button>
      </div>
    </div>
  `;

  document.removeEventListener("click", handleOutsideClick);
  document.addEventListener("click", handleOutsideClick);
  loadSavedPreferences();
}

// ==========================================
// SEARCH & SELECTION HELPERS
// ==========================================

function filterStates() {
  const input = document.getElementById("state");
  const dropdown = document.getElementById("state-dropdown");
  if (!input || !dropdown) return;

  const query = input.value.toLowerCase().trim();
  const states = Object.keys(stateDistrictData).sort();
  const matches = states.filter(s => s.toLowerCase().includes(query));

  if (matches.length === 0) {
    dropdown.classList.add("hidden");
    return;
  }

  dropdown.innerHTML = matches
    .map(s => `<div onclick="selectState('${s}')" class="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100">${s}</div>`)
    .join("");

  dropdown.classList.remove("hidden");
}

function selectState(stateName) {
  const stateInput = document.getElementById("state");
  const stateDropdown = document.getElementById("state-dropdown");
  const districtInput = document.getElementById("district");

  if (stateInput) stateInput.value = stateName;
  if (stateDropdown) stateDropdown.classList.add("hidden");

  if (districtInput) {
    districtInput.disabled = false;
    districtInput.value = "";
  }
  const districtDropdown = document.getElementById("district-dropdown");
  if (districtDropdown) districtDropdown.classList.add("hidden");
}

function filterDistricts() {
  const stateInput = document.getElementById("state");
  const input = document.getElementById("district");
  const dropdown = document.getElementById("district-dropdown");

  if (!stateInput || !stateDistrictData[stateInput.value] || !input || !dropdown) return;

  const query = input.value.toLowerCase().trim();
  const districts = stateDistrictData[stateInput.value].sort();
  const matches = districts.filter(d => d.toLowerCase().includes(query));

  if (matches.length === 0) {
    dropdown.classList.add("hidden");
    return;
  }

  dropdown.innerHTML = matches
    .map(d => `<div onclick="selectDistrict('${d}')" class="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100">${d}</div>`)
    .join("");

  dropdown.classList.remove("hidden");
}

function selectDistrict(districtName) {
  const districtInput = document.getElementById("district");
  const districtDropdown = document.getElementById("district-dropdown");

  if (districtInput) districtInput.value = districtName;
  if (districtDropdown) districtDropdown.classList.add("hidden");
}

function handleOutsideClick(event) {
  const stateInput = document.getElementById("state");
  const stateDropdown = document.getElementById("state-dropdown");
  const districtInput = document.getElementById("district");
  const districtDropdown = document.getElementById("district-dropdown");

  if (stateInput && !stateInput.contains(event.target) && stateDropdown && !stateDropdown.contains(event.target)) {
    stateDropdown.classList.add("hidden");
  }

  if (districtInput && !districtInput.contains(event.target) && districtDropdown && !districtDropdown.contains(event.target)) {
    districtDropdown.classList.add("hidden");
  }
}

function loadSavedPreferences() {
  const savedName = localStorage.getItem("userName");
  const savedPhone = localStorage.getItem("phone");
  const savedState = localStorage.getItem("state");
  const savedDistrict = localStorage.getItem("district");
  const savedVillage = localStorage.getItem("village");
  const savedLang = localStorage.getItem("language");
  const savedCrops = localStorage.getItem("crops");

  if (savedName) {
    const nameInput = document.getElementById("user-name");
    if (nameInput) nameInput.value = savedName;
  }
  if (savedPhone) {
    const phoneInput = document.getElementById("phone");
    if (phoneInput) phoneInput.value = savedPhone;
  }
  if (savedState) {
    const stateInput = document.getElementById("state");
    if (stateInput) {
      stateInput.value = savedState;
      const districtInput = document.getElementById("district");
      if (districtInput) districtInput.disabled = false;
    }
  }
  if (savedDistrict) {
    const districtInput = document.getElementById("district");
    if (districtInput) districtInput.value = savedDistrict;
  }
  if (savedVillage) {
    const villageInput = document.getElementById("village");
    if (villageInput) villageInput.value = savedVillage;
  }
  if (savedCrops) {
    const cropsInput = document.getElementById("crops");
    if (cropsInput) cropsInput.value = savedCrops;
  }
  if (savedLang) {
    const langSelect = document.getElementById("language");
    if (langSelect) {
      langSelect.value = savedLang;
      if (langSelect.value) langSelect.style.color = "#374151";
    }
  }
}

// ==========================================
// VALIDATION & SAVE LOGIC
// ==========================================

function markInvalid(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.add("border-red-500", "ring-2", "ring-red-200");
  }
}

function clearErrors() {
  const errorMsg = document.getElementById("error-message");
  if (errorMsg) {
    errorMsg.classList.add("hidden");
    errorMsg.innerText = "";
  }

  const fields = ["user-name", "phone", "state", "district", "village", "language", "crops"];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("border-red-500", "ring-2", "ring-red-200");
    }
  });
}

async function saveProfile() {
  clearErrors();

  const nameInput = document.getElementById("user-name");
  let fullName = nameInput ? nameInput.value.trim() : (localStorage.getItem("userName") || "");
  const phone = document.getElementById("phone").value.trim();
  const state = document.getElementById("state").value.trim();
  const district = document.getElementById("district").value.trim();
  const village = document.getElementById("village").value.trim();
  const language = document.getElementById("language").value.trim();
  const crops = document.getElementById("crops").value.trim();
  const errorMsg = document.getElementById("error-message");

  if (!fullName) {
    markInvalid("user-name");
    errorMsg.innerText = "Please enter your Full Name.";
    errorMsg.classList.remove("hidden");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    markInvalid("phone");
    errorMsg.innerText = "Invalid Phone Number! Please enter exactly 10 digits.";
    errorMsg.classList.remove("hidden");
    return;
  }

  if (!state || !stateDistrictData[state]) {
    markInvalid("state");
    errorMsg.innerText = "Please select a valid State from the list.";
    errorMsg.classList.remove("hidden");
    return;
  }

  if (!district || !stateDistrictData[state].includes(district)) {
    markInvalid("district");
    errorMsg.innerText = "Please select a valid District from the list.";
    errorMsg.classList.remove("hidden");
    return;
  }

  if (!village) {
    markInvalid("village");
    errorMsg.innerText = "Please enter your Village name.";
    errorMsg.classList.remove("hidden");
    return;
  }

  if (!language) {
    markInvalid("language");
    errorMsg.innerText = "Please select a preferred Language.";
    errorMsg.classList.remove("hidden");
    return;
  }

  // Save locally
  localStorage.setItem("userName", fullName);
  localStorage.setItem("phone", phone);
  localStorage.setItem("state", state);
  localStorage.setItem("district", district);
  localStorage.setItem("village", village);
  localStorage.setItem("language", language);
  localStorage.setItem("crops", crops);

  // Sync to Firestore
  try {
    const user = typeof auth !== "undefined" ? auth.currentUser : null;
    if (user && typeof db !== "undefined") {
      await db.collection("users").doc(user.uid).set(
        { name: fullName, phone, state, district, village, language, crops },
        { merge: true }
      );
    } else if (typeof db !== "undefined") {
      await db.collection("users").doc(`phone_${phone}`).set(
        { name: fullName, phone, state, district, village, language, crops },
        { merge: true }
      );
    }
  } catch (err) {
    console.warn("Firestore background sync omitted:", err);
  }

  // Update header and navigate
  if (typeof updateAppHeader === "function") {
    updateAppHeader();
  }

  if (typeof showAppNavigation === "function") {
    showAppNavigation();
  }
  
  if (typeof renderDashboard === "function") {
    renderDashboard();
  }

  navigateTo("dashboard");
}