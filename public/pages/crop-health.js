// Crop Health & Diagnosis Page
function renderCropHealth() {

  const lang = localStorage.getItem("selectedLanguage") || "en";
  const t = translations[lang];

  const el = document.getElementById('page-crop-health');

  el.innerHTML = `
    <section class="mb-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 id="crop-management-title" class="font-[Lexend] text-2xl font-medium text-[#154212] mb-2">
            Crop Management & Diagnosis
          </h2>
          <p id="crop-management-description" class="text-[#42493e] max-w-xl">
            Identify plant diseases instantly with AI-powered diagnostics. Upload a photo or search for known symptoms.
          </p>
        </div>
        <div class="relative w-full md:w-80">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#72796e]">search</span>
          <input
            id="crop-disease-search"
            class="w-full pl-10 pr-4 py-3 bg-white border border-[#c2c9bb] rounded-xl focus:ring-2 focus:ring-[#154212] outline-none transition-all shadow-sm"
            placeholder="${t.searchCropDiseases}"
            type="text"
          />
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Upload Zone -->
      <div class="lg:col-span-8 group relative overflow-hidden bg-white border border-stone-100 rounded-[2rem] shadow-sm transition-all hover:shadow-md min-h-[400px]">
        <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent"></div>
       <div id="upload-zone" class="relative flex flex-col items-center justify-center p-8 border-4 border-dashed border-stone-100 m-4 rounded-[1.5rem] group-hover:border-[#2d5a27]/20 transition-colors">
          <div class="w-24 h-24 bg-[#bcf0ae] rounded-full flex items-center justify-center text-[#154212] mb-6 shadow-inner">
            <span class="material-symbols-outlined text-5xl">add_a_photo</span>
          </div>
          <h3 id="upload-crop-title" class="font-[Lexend] text-xl font-medium text-[#191c1c] mb-2">
            Upload Crop Photo
          </h3>
          <p id="upload-crop-description" class="text-[#42493e] text-center max-w-sm mb-8">
            Drag and drop your image here, or browse from your device. For best results, use high-quality close-ups of leaves.
          </p>
          <div class="flex gap-4">
          <button
            id="browse-gallery-btn"
            onclick="document.getElementById('file-input').click()"
            class="bg-[#2d5a27] text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-[#2d5a27]/20 active:scale-95 transition-transform">
            ${t.browseGallery}
          </button>




          <button
              id="open-camera-btn"
              onclick="openCamera()"
              class="bg-white border-2 border-[#2d5a27] text-[#2d5a27] px-8 py-3 rounded-xl font-semibold active:scale-95 transition-transform">
              ${t.openCamera}
          </button>



          </div>
          <input id="file-input" type="file" accept="image/*" class="hidden" onchange="handleImageUpload(event)"/>
        
          






<!-- CAMERA SECTION -->
<div id="camera-area" class="hidden mt-4 w-full">

    <!-- LIVE CAMERA -->
    <video
        id="camera-preview"
        autoplay
        playsinline
        muted
        class="w-full rounded-xl bg-black touch-none">
    </video>

    <!-- CAPTURED PHOTO -->
    <img
        id="captured-photo"
        class="hidden w-full max-h-[350px] object-contain rounded-xl bg-black"
        alt="Captured crop">

    <!-- RECORDED VIDEO -->
    <video
        id="recorded-video"
        controls
        class="hidden w-full max-h-[350px] rounded-xl bg-black">
    </video>

    <canvas id="camera-canvas" class="hidden"></canvas>

















    <!-- CAMERA BUTTONS -->
    <div
        id="camera-controls"
        class="flex flex-wrap justify-center gap-3 mt-4">

        <!-- PHOTO -->
        <button
            id="click-photo-btn"
            onclick="capturePhoto()"
            class="bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-bold">
            📸 ${t.clickPhoto}
        </button>


        <!-- START VIDEO -->
        <button
            id="start-recording-btn"
            onclick="startRecording()"
            class="bg-red-600 text-white px-6 py-3 rounded-xl font-bold">
            🎥 ${t.startVideo}
        </button>


        <!-- STOP VIDEO -->
        <button
            id="stop-recording-btn"
            onclick="stopRecording()"
            class="hidden bg-gray-700 text-white px-6 py-3 rounded-xl font-bold">
            ⏹ ${t.stopVideo}
        </button>


        <!-- CLOSE CAMERA -->
        <button
            id="close-camera-btn"
            onclick="closeCamera()"
            class="bg-white border-2 border-[#2d5a27] text-[#2d5a27] px-6 py-3 rounded-xl font-bold">
            ✕ ${t.closeCamera}
        </button>

    </div>


   





<!-- SAVE + RETAKE + ONE COMMON UPLOAD BUTTON -->
<div
    id="media-actions"
    class="hidden flex flex-wrap justify-center gap-3 mt-4">

    <!-- RETAKE / BACK TO CAMERA -->
    <button
        id="retake-camera-btn"
        onclick="retakeCamera()"
        class="bg-gray-600 text-white px-6 py-3 rounded-xl font-bold">
        ↩️ Retake
    </button>

    <!-- CROP PHOTO -->
    <button
        id="crop-photo-btn"
        onclick="startPhotoCrop()"
        class="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold">
        ✂️ Crop Photo
    </button>

    <!-- CROP VIDEO -->
    <button
        id="crop-video-btn"
        onclick="startVideoCrop()"
        class="hidden bg-orange-500 text-white px-6 py-3 rounded-xl font-bold">
        ✂️ Crop Video
    </button>
    


        <!-- SAVE -->
        <a
            id="save-media-btn"
            href="#"
            download
            class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
            💾 Save
        </a>






        <!-- SAME UPLOAD BUTTON FOR PHOTO + VIDEO -->
        <button
            id="upload-media-btn"
            onclick="uploadCapturedMedia()"
            class="bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-bold">
            ⬆️ Upload
        </button>






    </div>

</div>






      <!-- Health Stats -->
      <div class="lg:col-span-4 flex flex-col gap-6 pt-4">
        <div class="flex-1 bg-[#ffa536] p-6 rounded-[2rem] text-[#2c1700] shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-white/30 rounded-lg"><span class="material-symbols-outlined">health_and_safety</span></div>
            <span id="weekly-status" class="text-xs font-bold uppercase tracking-wider opacity-70">
              ${t.weeklyStatus}
            </span>
          </div>
          <h4 id="health-score-title" class="font-[Lexend] text-xl font-medium mb-1">
            ${t.healthScore}
          </h4>
          <div class="text-4xl font-extrabold mb-4">84%</div>
          <div class="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-2"><div class="h-full bg-white w-[84%]"></div></div>
          <p id="health-score-description" class="text-sm opacity-80">
            ${t.healthScoreDescription}
          </p>
        </div>
        <div class="flex-1 bg-white border border-stone-100 p-6 rounded-[2rem] shadow-sm">
          <h4 id="weather-impact-title" class="font-semibold text-sm mb-4">
            ${t.weatherImpact}
          </h4>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-[#895100]">
              <span class="material-symbols-outlined text-3xl">partly_cloudy_day</span>
            </div>
            <div><div id="crop-weather-temperature" class="font-bold text-lg">32°C</div><div id="humidity-detected-text" class="text-xs text-[#42493e]">
              ${t.highHumidityDetected}
            </div></div>
          </div>
          <div class="mt-4 p-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-xs flex gap-2">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span id="fungal-risk-text">${t.fungalRisk}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Diagnoses -->
    <section class="mt-16">
      <div class="flex items-center justify-between mb-8">
        <h3 id="recent-diagnoses-title" class="font-[Lexend] text-xl font-medium text-[#154212]">
          ${t.recentDiagnoses}
        </h3>
        <button
          id="view-history-btn"
          class="text-[#2d5a27] font-semibold flex items-center gap-1 hover:underline">
          ${t.viewHistory}
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
      {
        name: 'Tomato (Roma)',
        disease: t.earlyBlight,
        time: t.twoHoursAgo,
        badge: t.critical,
        badgeColor: 'bg-[#ba1a1a]',
        diseaseColor: 'text-[#ba1a1a]',
        desc: t.earlyBlightDescription,
        btn: t.viewSolution,
        icon: 'medical_services',

        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD08YZk0mgAvvRiMF5GmyFxFYJhip8f4eNlQWGIg_z23nXBmk5R8hdJaM1sWNSIaly1vV25pWEEYZkvoNw8S15StZKeF7j7Avg_vIWSTUhwsmUHzAUWqS1kSFVsCR33YIhMMULRngZ5-TeleDjda54Wi3uuHQewINfAhav5KtlOwGvJkj4k4lzj0j8W7tMTsApmaBr7Yzgf-ijax4nm4DD3Lo7wD2KMlng30Qtlw4UKDFl5fS8cT7_ojuMYhYVw8N7fflOg_W1ajnJS'
      },
      {
        name: 'Maize (Sweet Corn)',
        disease: t.noPathogens,
        time: t.yesterday,
        badge: t.healthy,
        badgeColor: 'bg-[#2d5a27]',
        diseaseColor: 'text-[#2d5a27]',
        desc: t.healthyCropDescription,
        btn: t.detailedReport,
        icon: 'description',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBizTY3Ni0nLs6Nd_58ktaEORKIzB4gt_FNBmXTNAmnyZN0uMSK5Bg-wG7S8uUR4AHdQyj0Wn9rKGLIith9GT4JmNB4Zum9lJw4hYWamkB5z7ChycziOBwsGQclcxt9sRM8Nn6s_bmEz9xZg4FkUvEkSbXcROM9ytgt7b4QWfEjIrL-fe-N5tDHhFKkAIKuOhAOPnLGobuDHgpyO6ryTcqrtF-sPSw7bry6NS-g_PejFDvB9rQBq1Q0e5CExoA46FNUeKVLTFvPMFOQ'
      },
      {
        name: 'Wheat (Durum)',
        disease: t.leafRust,
        time: t.threeDaysAgo,
        badge: t.warning,
        badgeColor: 'bg-[#ffa536]',
        diseaseColor: 'text-[#895100]',
        desc: t.leafRustDescription,
        btn: t.viewSolution,
        icon: 'medical_services',

        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1O2tD8jWF7wptZo0fwlmx1okmwa8iT3AntGFRV32dgh53fmRrnu0QRbXkN8htQo4QD6Gr7UQ2RARjTc8B5NVSzHbKIJH-LYUQGNVnXi2Y25fuN2eYHTnp80GCLwiiSpj1vCORxPsMlx4ww0AJ3Wq4NglRnkIjoDUwzyPY6urv4fjmTrT4-7yWB9po8dOXZcEsGE3LKtxh2XOVro8IFBUNuYO9yHGXuNXE9vE1zZsjEmJrHAXceN-Z8N_siGHk3lQccOgPaRiMgVrU'
      }
    ].map(d => `
          <div class="bg-white border border-stone-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div class="relative h-48">
              <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${d.img}" alt="${d.name}"/>
              <div class="absolute top-3 right-3 ${d.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">${d.badge}</div>
            </div>
            <div class="p-5">
              <div class="flex justify-between items-start mb-2">
                <div><h4 class="font-bold text-lg">${d.name}</h4><p class="${d.diseaseColor} font-medium text-sm">${d.disease}</p></div>
                <span class="text-xs text-[#72796e]">${d.time}</span>
              </div>
              <p class="text-xs text-[#42493e] mb-6 line-clamp-2">${d.desc}</p>
              <button class="w-full bg-stone-50 border border-stone-200 text-[#2d5a27] py-2.5 rounded-xl font-bold hover:bg-[#2d5a27] hover:text-white transition-colors flex items-center justify-center gap-2">
                ${d.btn} <span class="material-symbols-outlined text-lg">${d.icon}</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- AI Promo -->
    <section class="mt-16 mb-10 bg-[#2d5a27] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div class="flex-1 text-center md:text-left">
          <h3 id="ai-symptom-title" class="font-[Lexend] text-3xl md:text-4xl font-semibold mb-4">
            ${t.unsureSymptom}
          </h3>
          <p
            id="ai-symptom-description"
            class="text-[#9dd090] text-lg mb-8 opacity-90">
            ${t.aiCropAdvice}
          </p>
          <button
            id="start-ai-chat-btn"
            onclick="navigateTo('ai-assistant')"
            class="bg-white text-[#2d5a27] px-10 py-4 rounded-full font-extrabold text-lg shadow-xl active:scale-95 transition-transform">
            ${t.startAIChat}
          </button>
        </div>
        <div class="w-48 h-48 bg-white/20 rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white/30">
          <span class="material-symbols-outlined text-[80px] text-white" style="font-variation-settings:'FILL' 1;">smart_toy</span>
        </div>
      </div>
    </section>
  `;
}

async function handleImageUpload(event) {

    const file =
        event?.target?.files?.[0];

    if (!file) return;


    // --------------------------------------
    // IMAGE ONLY
    // --------------------------------------

    if (!file.type.startsWith("image/")) {

        alert(
            "Please upload a crop or leaf image."
        );

        return;
    }


    const zone =
        document.getElementById("upload-zone");

    if (!zone) return;


    // --------------------------------------
    // SHOW PREVIEW + ANALYZING STATE
    // --------------------------------------

    const reader =
        new FileReader();


    reader.onload = async function (e) {

        const originalImage =
            e.target.result;


        zone.innerHTML = `

            <img
                src="${originalImage}"
                class="max-h-64 rounded-xl shadow-lg mb-4"
                alt="Uploaded crop"
            />

            <p class="text-green-800 font-bold text-lg mb-2">
                Image uploaded successfully
            </p>

            <p class="text-stone-500 text-sm mb-4">
                AI is analyzing the actual crop image...
            </p>

            <div class="flex gap-2 justify-center">

                <span class="typing-dot w-2 h-2 rounded-full bg-green-600"></span>

                <span class="typing-dot w-2 h-2 rounded-full bg-green-600"></span>

                <span class="typing-dot w-2 h-2 rounded-full bg-green-600"></span>

            </div>
        `;


        try {

            // --------------------------------------
            // COMPRESS / RESIZE IMAGE
            // --------------------------------------

            const image =
                new Image();


            image.onload = async function () {

                const MAX_SIZE = 1600;

                let width =
                    image.naturalWidth;

                let height =
                    image.naturalHeight;


                if (
                    width > MAX_SIZE ||
                    height > MAX_SIZE
                ) {

                    if (width > height) {

                        height =
                            Math.round(
                                height *
                                (MAX_SIZE / width)
                            );

                        width = MAX_SIZE;

                    } else {

                        width =
                            Math.round(
                                width *
                                (MAX_SIZE / height)
                            );

                        height = MAX_SIZE;
                    }
                }


                const canvas =
                    document.createElement("canvas");


                canvas.width = width;
                canvas.height = height;


                const ctx =
                    canvas.getContext("2d");


                ctx.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );


                const compressedImage =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.85
                    );


                // --------------------------------------
                // SEND REAL IMAGE TO BACKEND
                // --------------------------------------
                // app.post("/api/crop-diagnosis", async (req, res) => {
                  // "http://127.0.0.1:5000/api/crop-diagnosis",


                const response =
                    await fetch(
                       "http://127.0.0.1:5000/api/crop-diagnosis",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                image:
                                    compressedImage
                            })
                        }
                    );


                const result =
                    await response.json();


                if (
                    !response.ok ||
                    !result.success
                ) {

                    throw new Error(
                        result.error ||
                        "AI diagnosis failed."
                    );
                }


                // --------------------------------------
                // SHOW RESULT
                // --------------------------------------

                showCropDiagnosisResult(
                    zone,
                    result
                );

            };


            image.onerror =
                function () {

                    throw new Error(
                        "Could not process the image."
                    );
                };


            image.src =
                originalImage;


        } catch (error) {

            console.error(
                "Crop diagnosis error:",
                error
            );


            zone.innerHTML = `

                <div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-left w-full max-w-md">

                    <h4 class="font-bold text-red-700 mb-2">
                        ⚠️ Diagnosis failed
                    </h4>

                    <p class="text-sm text-gray-700">
                        ${error.message || "Something went wrong while analyzing the image."}
                    </p>

                    <p class="text-sm text-gray-500 mt-2">
                        Please try again with a clear crop/leaf photo.
                    </p>

                </div>

            `;
        }

    };


    reader.readAsDataURL(file);
}
  
function showCropDiagnosisResult(zone, result) {

    const confidence =
        Number(result.confidence || 0);


    const confidenceText =
        `${confidence}%`;


    const symptoms =
        Array.isArray(result.symptoms)
            ? result.symptoms
            : [];


    const treatment =
        Array.isArray(result.treatment)
            ? result.treatment
            : [];


    const prevention =
        Array.isArray(result.prevention)
            ? result.prevention
            : [];


    // --------------------------------------
    // UNCERTAIN / UNRELIABLE RESULT
    // --------------------------------------

    if (!result.isReliable) {

        zone.innerHTML += `

                   </div>

        <!-- ACTION BUTTONS -->
        <div class="mt-5 flex flex-col sm:flex-row gap-3 w-full max-w-xl">

            <button
                type="button"
                onclick="continueToCropChatbot()"
                class="flex-1 bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#154212] transition-colors">
                💬 Continue with Chatbot
            </button>

            <button
                type="button"
                onclick="backToCropHealthStart()"
                class="flex-1 bg-white border-2 border-[#2d5a27] text-[#2d5a27] px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors">
                ← Back to Crop Health
            </button>

        </div>
    `;

    return;

    }


    // --------------------------------------
    // FORMAT LISTS
    // --------------------------------------

    const symptomsHTML =
        symptoms.length
            ? symptoms
                .map(
                    item =>
                        `<li>${item}</li>`
                )
                .join("")
            : "<li>No clear symptoms provided.</li>";


    const treatmentHTML =
        treatment.length
            ? treatment
                .map(
                    item =>
                        `<li>${item}</li>`
                )
                .join("")
            : "<li>No treatment information available.</li>";


    const preventionHTML =
        prevention.length
            ? prevention
                .map(
                    item =>
                        `<li>${item}</li>`
                )
                .join("")
            : "<li>No prevention information available.</li>";


    // --------------------------------------
    // HEALTHY RESULT
    // --------------------------------------

    const isHealthy =
        result.disease ===
        "No visible disease detected";


    const title =
        isHealthy
            ? "🌿 No visible disease detected"
            : `⚠️ ${result.disease}`;


    const titleColor =
        isHealthy
            ? "text-green-800"
            : "text-[#93000a]";


    // --------------------------------------
    // FINAL RESULT
    // --------------------------------------

    zone.innerHTML += `

        <div class="mt-6 p-5 bg-white border border-stone-200 rounded-2xl shadow-sm text-left w-full max-w-xl">

            <h4 class="font-bold ${titleColor} text-xl mb-4">
                ${title}
            </h4>


            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">

                <div class="bg-stone-50 p-3 rounded-xl">

                    <p class="text-xs text-gray-500">
                        Crop
                    </p>

                    <p class="font-bold text-gray-800">
                        ${result.crop || "Unknown"}
                    </p>

                </div>


                <div class="bg-stone-50 p-3 rounded-xl">

                    <p class="text-xs text-gray-500">
                        Confidence
                    </p>

                    <p class="font-bold text-gray-800">
                        ${confidenceText}
                    </p>

                </div>


                <div class="bg-stone-50 p-3 rounded-xl">

                    <p class="text-xs text-gray-500">
                        Severity
                    </p>

                    <p class="font-bold text-gray-800">
                        ${result.severity || "Unknown"}
                    </p>

                </div>

            </div>


            <div class="mb-5">

                <h5 class="font-bold text-gray-800 mb-2">
                    🔍 Symptoms
                </h5>

                <ul class="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    ${symptomsHTML}
                </ul>

            </div>


            <div class="mb-5">

                <h5 class="font-bold text-gray-800 mb-2">
                    💊 Treatment / Solution
                </h5>

                <ul class="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    ${treatmentHTML}
                </ul>

            </div>


            <div>

                <h5 class="font-bold text-gray-800 mb-2">
                    🛡️ Prevention
                </h5>

                <ul class="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    ${preventionHTML}
                </ul>

            </div>


                        <p class="text-xs text-gray-500 mt-5">
                AI confidence is an estimate, not a laboratory-confirmed diagnosis.
            </p>

        </div>

        <!-- ACTION BUTTONS -->
        <div class="mt-5 flex flex-col sm:flex-row gap-3 w-full max-w-xl">

            <button
                type="button"
                onclick="continueToCropChatbot()"
                class="flex-1 bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#154212] transition-colors">
                💬 Continue with Chatbot
            </button>

            <button
                type="button"
                onclick="backToCropHealthStart()"
                class="flex-1 bg-white border-2 border-[#2d5a27] text-[#2d5a27] px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors">
                ← Back to Crop Health
            </button>

        </div>

    `;
}

let cameraStream = null;
let mediaRecorder = null;
let recordedChunks = [];

let capturedFile = null;
let capturedURL = null;



// ===============================
// PINCH TO ZOOM
// ===============================

let pinchStartDistance = 0;
let pinchStartZoom = 1;

function getFingerDistance(touch1, touch2) {

  const dx =
    touch2.clientX - touch1.clientX;

  const dy =
    touch2.clientY - touch1.clientY;

  return Math.sqrt(
    dx * dx + dy * dy
  );
}


function setupPinchZoom() {

  const video =
    document.getElementById("camera-preview");

  if (!video) return;


  video.addEventListener(
    "touchstart",
    function (event) {

      if (event.touches.length !== 2) {
        return;
      }

      event.preventDefault();


      pinchStartDistance =
        getFingerDistance(
          event.touches[0],
          event.touches[1]
        );


      const track =
        cameraStream?.getVideoTracks()[0];

      if (!track) return;


      const capabilities =
        track.getCapabilities();


      if (!capabilities.zoom) {
        return;
      }


      const settings =
        track.getSettings();


      pinchStartZoom =
        settings.zoom ||
        capabilities.zoom.min ||
        1;

    },
    { passive: false }
  );


  video.addEventListener(
    "touchmove",
    async function (event) {

      if (
        event.touches.length !== 2 ||
        !cameraStream
      ) {
        return;
      }


      event.preventDefault();


      const track =
        cameraStream.getVideoTracks()[0];

      if (!track) return;


      const capabilities =
        track.getCapabilities();


      if (!capabilities.zoom) {
        return;
      }


      if (!pinchStartDistance) {
        return;
      }


      const currentDistance =
        getFingerDistance(
          event.touches[0],
          event.touches[1]
        );


      const distanceRatio =
        currentDistance /
        pinchStartDistance;


      let newZoom =
        pinchStartZoom *
        distanceRatio;


      const minZoom =
        capabilities.zoom.min || 1;

      const maxZoom =
        capabilities.zoom.max || 1;


      newZoom =
        Math.max(
          minZoom,
          Math.min(
            newZoom,
            maxZoom
          )
        );


      try {

        await track.applyConstraints({
          advanced: [
            {
              zoom: newZoom
            }
          ]
        });

      } catch (error) {

        console.error(
          "Pinch zoom error:",
          error
        );

      }

    },
    { passive: false }
  );


  video.addEventListener(
    "touchend",
    function (event) {

      if (event.touches.length < 2) {
        pinchStartDistance = 0;
      }

    }
  );
}















// ==========================================
// CROP HEALTH LANGUAGE
// ==========================================

function applyCropHealthLanguage(lang) {

  if (!translations[lang]) return;

  const t = translations[lang];

  renderCropHealth();

  const uploadTitle =
    document.getElementById("upload-crop-title");

  if (uploadTitle)
    uploadTitle.textContent =
      t.uploadCropPhoto || "Upload Crop Photo";

  const uploadDescription =
    document.getElementById("upload-crop-description");

  if (uploadDescription)
    uploadDescription.textContent =
      t.uploadCropDesc ||
      "Drag and drop your image here, or browse from your device. For best results, use high-quality close-ups of leaves.";

  // Page heading
  const title =
    document.getElementById("crop-management-title");

  if (title)
    title.textContent =
      t.cropManagement || "Crop Management & Diagnosis";

  // Page description
  const description =
    document.getElementById("crop-management-description");

  if (description)
    description.textContent =
      t.cropDiagnosisDesc ||
      "Identify plant diseases instantly with AI-powered diagnostics. Upload a photo or search for known symptoms.";

  // Search
  const search =
    document.getElementById("crop-disease-search");

  if (search)
    search.placeholder =
      t.searchCropDiseases || "Search crop diseases...";


  // Buttons
  const browse =
    document.getElementById("browse-gallery-btn");

  if (browse)
    browse.textContent =
      t.browseGallery || "Browse Gallery";

  const camera =
    document.getElementById("open-camera-btn");

  if (camera)
    camera.textContent =
      t.openCamera || "Open Camera";

  // Health
  const weekly =
    document.getElementById("weekly-status");

  if (weekly)
    weekly.textContent =
      t.weeklyStatus || "Weekly Status";

  const healthScore =
    document.getElementById("health-score-title");

  if (healthScore)
    healthScore.textContent =
      t.healthScore || "Health Score";

  const healthDescription =
    document.getElementById("health-score-description");

  if (healthDescription)
    healthDescription.textContent =
      t.healthScoreDescription ||
      "Your crops are generally healthy. 2 alerts need attention.";

  // Weather
  const weatherImpact =
    document.getElementById("weather-impact-title");

  if (weatherImpact)
    weatherImpact.textContent =
      t.weatherImpact || "Weather Impact";

  const humidity =
    document.getElementById("humidity-detected-text");

  if (humidity)
    humidity.textContent =
      t.highHumidityDetected || "High Humidity Detected";

  const fungalRisk =
    document.getElementById("fungal-risk-text");

  if (fungalRisk)
    fungalRisk.textContent =
      t.fungalRisk ||
      "Fungal risk elevated for tomato crops.";

  // Recent diagnoses
  const recent =
    document.getElementById("recent-diagnoses-title");

  if (recent)
    recent.textContent =
      t.recentDiagnoses || "Recent Diagnoses";

  const history =
    document.getElementById("view-history-btn");

  if (history) {
    history.childNodes[0].textContent =
      (t.viewHistory || "View History") + " ";
  }

  // AI section
  const aiTitle =
    document.getElementById("ai-symptom-title");

  if (aiTitle)
    aiTitle.textContent =
      t.unsureSymptom || "Unsure about a symptom?";

  const aiDescription =
    document.getElementById("ai-symptom-description");

  if (aiDescription)
    aiDescription.textContent =
      t.aiCropAdvice ||
      "Chat with Krishi AI to get instant expert advice on soil health, pest management, and local weather patterns.";

  const aiButton =
    document.getElementById("start-ai-chat-btn");

  if (aiButton)
    aiButton.textContent =
      t.startAIChat || "Start AI Chat";
}


// ===============================
// OPEN CAMERA
// ===============================

window.openCamera = async function () {

  try {

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera is not supported by this browser.");
      return;
    }

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: true
    });

    const video = document.getElementById("camera-preview");
    const container = document.getElementById("camera-area");

    video.srcObject = cameraStream;

    container.classList.remove("hidden");

    await video.play();



    setupPinchZoom();









  } catch (error) {

    console.error("Camera Error:", error);

    if (error.name === "NotAllowedError") {
      alert("Camera permission denied. Please allow camera access.");
    }
    else if (error.name === "NotFoundError") {
      alert("No camera found on this device.");
    }
    else {
      alert("Unable to open camera.");
    }
  }
};


// ===============================
// CLICK PHOTO
// ===============================

window.capturePhoto = function () {

  const video = document.getElementById("camera-preview");
  const canvas = document.getElementById("camera-canvas");

  if (!video.videoWidth || !video.videoHeight) {
    alert("Camera is not ready yet.");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");

  context.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );

  canvas.toBlob(function (blob) {

    if (!blob) {
      alert("Unable to capture photo.");
      return;
    }

    capturedFile = new File(
      [blob],
      `crop-photo-${Date.now()}.jpg`,
      {
        type: "image/jpeg"
      }
    );

    // Create URL for captured photo
    if (capturedURL) {
      URL.revokeObjectURL(capturedURL);
    }

    capturedURL = URL.createObjectURL(blob);

    const photo =
      document.getElementById("captured-photo");

    const liveCamera =
      document.getElementById("camera-preview");

    const controls =
      document.getElementById("camera-controls");

    const mediaActions =
      document.getElementById("media-actions");

    const saveButton =
      document.getElementById("save-media-btn");


    // Show clicked photo
    photo.src = capturedURL;
    photo.classList.remove("hidden");


    // Hide live camera
    liveCamera.classList.add("hidden");


    // Hide Click Photo + Start Video buttons
    controls.classList.add("hidden");


    // Show separate Save + Upload buttons
    mediaActions.classList.remove("hidden");


    // Save Photo button
    saveButton.href = capturedURL;
    saveButton.download =
      `crop-photo-${Date.now()}.jpg`;

    saveButton.textContent = "💾 Save Photo";


    // STOP CAMERA
    if (cameraStream) {

      cameraStream
        .getTracks()
        .forEach(track => track.stop());

      cameraStream = null;
    }

    liveCamera.srcObject = null;

  }, "image/jpeg", 0.95);
};

// ===============================
// SHOW CAPTURED PHOTO / VIDEO
// ===============================
function showCapturedMedia(blob, type) {

  const liveCamera =
    document.getElementById("camera-preview");

  const photo =
    document.getElementById("captured-photo");

  const recordedVideo =
    document.getElementById("recorded-video");

  const controls =
    document.getElementById("camera-controls");

  const mediaActions =
    document.getElementById("media-actions");

  const saveButton =
    document.getElementById("save-media-btn");


  // Remove previous URL
  if (capturedURL) {
    URL.revokeObjectURL(capturedURL);
  }

  // Create new URL
  capturedURL =
    URL.createObjectURL(blob);


  // =========================
  // PHOTO
  // =========================

  if (type === "photo") {

    // Put captured image on screen
    photo.src = capturedURL;

    // Show image
    photo.classList.remove("hidden");

    // Hide recorded video
    recordedVideo.classList.add("hidden");

    // Save Photo
    saveButton.href = capturedURL;

    saveButton.download =
      `crop-photo-${Date.now()}.jpg`;

    saveButton.textContent =
      "💾 Save Photo";





    //SHOW CROP PHOTO
    document
      .getElementById("crop-photo-btn")
      .classList.remove("hidden");

    //HIDE CROP VIDEO
    document
      .getElementById("crop-video-btn")
      .classList.add("hidden");





  }


  // =========================
  // VIDEO
  // =========================

  if (type === "video") {

    // Put recorded video on screen
    recordedVideo.src = capturedURL;

    recordedVideo.controls = true;

    // Show video
    recordedVideo.classList.remove("hidden");

    // Hide photo
    photo.classList.add("hidden");

    // Save Video
    saveButton.href = capturedURL;

    saveButton.download =
      `crop-video-${Date.now()}.webm`;

    saveButton.textContent =
      "💾 Save Video";






    // SHOW CROP VIDEO
    document
      .getElementById("crop-video-btn")
      .classList.remove("hidden");

    // HIDE CROP PHOTO
    document
      .getElementById("crop-photo-btn")
      .classList.add("hidden");






  }


  // =========================
  // HIDE LIVE CAMERA
  // =========================

  liveCamera.classList.add("hidden");


  // =========================
  // HIDE CAMERA BUTTONS
  // =========================

  controls.classList.add("hidden");


  // =========================
  // SHOW SAVE + UPLOAD
  // =========================

  mediaActions.classList.remove("hidden");


  // =========================
  // STOP CAMERA
  // =========================

  if (cameraStream) {

    cameraStream
      .getTracks()
      .forEach(track => track.stop());

    cameraStream = null;
  }

  liveCamera.srcObject = null;
}


// ===============================
// START VIDEO RECORDING
// ===============================

window.startRecording = function () {

  if (!cameraStream) {
    alert("Please open the camera first.");
    return;
  }

  recordedChunks = [];

  try {

    mediaRecorder = new MediaRecorder(
      cameraStream,
      {
        mimeType: "video/webm"
      }
    );

  } catch (error) {

    console.error(error);

    try {
      mediaRecorder = new MediaRecorder(cameraStream);
    } catch (err) {
      alert("Video recording is not supported by this browser.");
      return;
    }
  }

  mediaRecorder.ondataavailable = function (event) {

    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };


  mediaRecorder.onstop = function () {

    const videoBlob = new Blob(
      recordedChunks,
      {
        type: "video/webm"
      }
    );

    capturedFile = new File(
      [videoBlob],
      `crop-video-${Date.now()}.webm`,
      {
        type: "video/webm"
      }
    );

    showCapturedMedia(videoBlob, "video");
  };


  mediaRecorder.start();

  document
    .getElementById("start-recording-btn")
    .classList.add("hidden");

  document
    .getElementById("stop-recording-btn")
    .classList.remove("hidden");

  console.log("Video recording started");
};


// ===============================
// STOP VIDEO RECORDING
// ===============================

window.stopRecording = function () {

  if (
    mediaRecorder &&
    mediaRecorder.state !== "inactive"
  ) {

    mediaRecorder.stop();

    document
      .getElementById("start-recording-btn")
      .classList.remove("hidden");

    document
      .getElementById("stop-recording-btn")
      .classList.add("hidden");

    console.log("Video recording stopped");
  }
};


// ===============================
// UPLOAD CAPTURED MEDIA
// ===============================

window.uploadCapturedMedia = function () {

  
    console.log("UPLOAD BUTTON CLICKED");

    // Check captured file
  if (!capturedFile) {
    alert("Please capture a photo or video first.");
    return;
  }


   console.log("Captured file:", capturedFile);
    console.log("File type:", capturedFile.type);

    // ===============================
    // PHOTO
    // ===============================

    
  if (capturedFile.type.startsWith("image/")) {

    const input = document.getElementById("file-input");

    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(capturedFile);

    input.files = dataTransfer.files;

    // Use your existing upload function
    handleImageUpload({
      target: input
    });

    return;
  }

  // Video
  if (capturedFile.type.startsWith("video/")) {

    alert(
      "Video captured successfully! 🎥\n\n" +
      "Video is ready for upload."
    );

    /*
     * Later you can send capturedFile
     * to Firebase Storage / backend.
     */

    console.log("Video ready for upload:", capturedFile);
  }
};


// ===============================
// CLOSE CAMERA
// ===============================

window.closeCamera = function () {

  if (cameraStream) {

    cameraStream
      .getTracks()
      .forEach(track => track.stop());

    cameraStream = null;
  }

  const video = document.getElementById("camera-preview");
  const container = document.getElementById("camera-area");

  if (video) {
    video.srcObject = null;
  }

  if (container) {
    container.classList.add("hidden");
  }

  document
    .getElementById("media-actions")
    ?.classList.add("hidden");

  console.log("Camera closed");
};




// ===============================
// RETAKE / BACK TO CAMERA
// ===============================

window.retakeCamera = async function () {

  // Hide captured photo
  document
    .getElementById("captured-photo")
    ?.classList.add("hidden");

  // Hide recorded video
  document
    .getElementById("recorded-video")
    ?.classList.add("hidden");

  // Hide Crop + Save + Upload
  document
    .getElementById("media-actions")
    ?.classList.add("hidden");

  // Show camera controls again
  document
    .getElementById("camera-controls")
    ?.classList.remove("hidden");

  // Reset video recording buttons
  document
    .getElementById("start-recording-btn")
    ?.classList.remove("hidden");

  document
    .getElementById("stop-recording-btn")
    ?.classList.add("hidden");

  // Clear previous captured media
  capturedFile = null;

  if (capturedURL) {
    URL.revokeObjectURL(capturedURL);
    capturedURL = null;
  }

  // Open camera again
  await openCamera();
};



// ===============================
// RETAKE / BACK TO CAMERA
// ===============================

window.retakeCamera = async function () {

  // Hide captured photo
  document
    .getElementById("captured-photo")
    ?.classList.add("hidden");

  // Hide recorded video
  document
    .getElementById("recorded-video")
    ?.classList.add("hidden");

  // Hide Save / Upload / Crop buttons
  document
    .getElementById("media-actions")
    ?.classList.add("hidden");

  // Show camera controls
  document
    .getElementById("camera-controls")
    ?.classList.remove("hidden");

// Show live camera again
document
  .getElementById("camera-preview")
  ?.classList.remove("hidden");


  // Reset recording buttons
  document
    .getElementById("start-recording-btn")
    ?.classList.remove("hidden");

  document
    .getElementById("stop-recording-btn")
    ?.classList.add("hidden");

  // Clear previous captured media
  capturedFile = null;

  if (capturedURL) {
    URL.revokeObjectURL(capturedURL);
    capturedURL = null;
  }

  // Open camera again
  await openCamera();
};
















// ===============================
// PHOTO CROP - PHONE STYLE
// ===============================

window.startPhotoCrop = function () {

  const photo = document.getElementById("captured-photo");

  if (!photo || photo.classList.contains("hidden")) {
    alert("Please capture a photo first.");
    return;
  }

  const cropContainer = document.createElement("div");

  cropContainer.id = "photo-crop-container";

  cropContainer.className =
    "fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center p-4";

  cropContainer.innerHTML = `

    <div class="bg-white rounded-2xl p-4 w-full max-w-3xl">

      <h3 class="text-xl font-bold text-[#154212] mb-3 text-center">
        ✂️ Crop Photo
      </h3>

      <!-- IMAGE AREA -->
      <div
        id="photo-crop-workspace"
        class="relative bg-black rounded-xl overflow-hidden mx-auto"
        style="width:100%; max-height:65vh; touch-action:none;"
      >

        <img
          id="crop-source-image"
          src="${photo.src}"
          class="block max-h-[65vh] max-w-full mx-auto object-contain select-none"
          draggable="false"
        >

        <!-- CROP BOX -->
        <div
          id="crop-box"
          class="absolute border-4 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]"
          style="
            width:220px;
            height:220px;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
            touch-action:none;
          "
        >

          <!-- RESIZE HANDLE -->
          <div
            id="crop-resize-handle"
            class="absolute -right-4 -bottom-4 w-8 h-8 bg-white border-4 border-[#2d5a27] rounded-full cursor-nwse-resize"
            style="touch-action:none;"
          ></div>

        </div>

      </div>


      <!-- SHAPE BUTTONS -->
      <div class="flex justify-center gap-2 mt-4 flex-wrap">

        <button
          type="button"
          id="shape-square"
          class="bg-[#2d5a27] text-white px-4 py-2 rounded-xl font-bold">
          □ Square
        </button>

        <button
          type="button"
          id="shape-rectangle"
          class="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-bold">
          ▭ Rectangle
        </button>

        <button
          type="button"
          id="shape-circle"
          class="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-bold">
          ○ Circle
        </button>

      </div>


      <!-- SIZE CONTROLS -->
      <div class="flex items-center justify-center gap-4 mt-4">

        <button
          type="button"
          id="crop-size-minus"
          class="bg-gray-700 text-white w-12 h-12 rounded-full text-2xl font-bold">
          −
        </button>

        <span
          id="crop-size-text"
          class="font-bold text-[#154212] min-w-[90px] text-center">
          Size: 220
        </span>

        <button
          type="button"
          id="crop-size-plus"
          class="bg-[#2d5a27] text-white w-12 h-12 rounded-full text-2xl font-bold">
          +
        </button>

      </div>


      <!-- ACTION BUTTONS -->
      <div class="flex justify-center gap-3 mt-5 flex-wrap">

        <button
          type="button"
          id="crop-apply-btn"
          class="bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-bold">
          ✓ Apply Crop
        </button>

        <button
          type="button"
          id="crop-cancel-btn"
          class="bg-gray-600 text-white px-6 py-3 rounded-xl font-bold">
          Cancel
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(cropContainer);


  const image =
    document.getElementById("crop-source-image");

  const cropBox =
    document.getElementById("crop-box");

  const workspace =
    document.getElementById("photo-crop-workspace");

  const resizeHandle =
    document.getElementById("crop-resize-handle");

  const sizeText =
    document.getElementById("crop-size-text");


  let shape = "square";

  let cropSize = 220;

  let cropWidth = 220;
  let cropHeight = 220;

  let cropX = 0;
  let cropY = 0;

  let dragging = false;
  let resizing = false;

  let startX = 0;
  let startY = 0;

  let startCropX = 0;
  let startCropY = 0;

  let startSize = 0;


  // ===============================
  // UPDATE CROP BOX
  // ===============================

  function updateCropBox() {

    cropBox.style.width = cropWidth + "px";
    cropBox.style.height = cropHeight + "px";

    cropBox.style.left = cropX + "px";
    cropBox.style.top = cropY + "px";

    cropBox.style.transform = "none";

    sizeText.textContent =
      "Size: " + Math.round(cropWidth);

    if (shape === "circle") {

      cropBox.style.borderRadius = "50%";

    } else {

      cropBox.style.borderRadius = "0";

    }
  }


  // ===============================
  // IMAGE LOAD
  // ===============================

  image.onload = function () {

    const workspaceRect =
      workspace.getBoundingClientRect();

    cropWidth = Math.min(
      220,
      workspaceRect.width * 0.7
    );

    cropHeight = cropWidth;

    cropX =
      (workspaceRect.width - cropWidth) / 2;

    cropY =
      (workspaceRect.height - cropHeight) / 2;

    updateCropBox();
  };


  // ===============================
  // SHAPE - SQUARE
  // ===============================

  document
    .getElementById("shape-square")
    .onclick = function () {

      shape = "square";

      cropHeight = cropWidth;

      this.className =
        "bg-[#2d5a27] text-white px-4 py-2 rounded-xl font-bold";

      document
        .getElementById("shape-rectangle")
        .className =
        "bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-bold";

      document
        .getElementById("shape-circle")
        .className =
        "bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-bold";

      updateCropBox();
    };


  // ===============================
  // SHAPE - RECTANGLE
  // ===============================

  document
    .getElementById("shape-rectangle")
    .onclick = function () {

      shape = "rectangle";

      cropHeight =
        cropWidth * 0.65;

      this.className =
        "bg-[#2d5a27] text-white px-4 py-2 rounded-xl font-bold";

      document
        .getElementById("shape-square")
        .className =
        "bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-bold";

      document
        .getElementById("shape-circle")
        .className =
        "bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-bold";

      updateCropBox();
    };


  // ===============================
  // SHAPE - CIRCLE
  // ===============================

  document
    .getElementById("shape-circle")
    .onclick = function () {

      shape = "circle";

      cropHeight = cropWidth;

      this.className =
        "bg-[#2d5a27] text-white px-4 py-2 rounded-xl font-bold";

      document
        .getElementById("shape-square")
        .className =
        "bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-bold";

      document
        .getElementById("shape-rectangle")
        .className =
        "bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-bold";

      updateCropBox();
    };


  // ===============================
  // SIZE MINUS
  // ===============================

  document
    .getElementById("crop-size-minus")
    .onclick = function () {

      cropWidth =
        Math.max(80, cropWidth - 20);

      if (
        shape === "square" ||
        shape === "circle"
      ) {

        cropHeight = cropWidth;

      } else {

        cropHeight =
          cropWidth * 0.65;
      }

      updateCropBox();
    };


  // ===============================
  // SIZE PLUS
  // ===============================

  document
    .getElementById("crop-size-plus")
    .onclick = function () {

      const maxWidth =
        workspace.clientWidth - 20;

      cropWidth =
        Math.min(
          maxWidth,
          cropWidth + 20
        );

      if (
        shape === "square" ||
        shape === "circle"
      ) {

        cropHeight = cropWidth;

      } else {

        cropHeight =
          cropWidth * 0.65;
      }

      updateCropBox();
    };


  // ===============================
  // DRAG CROP BOX
  // ===============================

  cropBox.addEventListener(
    "pointerdown",
    function (event) {

      if (event.target === resizeHandle) {
        return;
      }

      dragging = true;

      startX = event.clientX;
      startY = event.clientY;

      startCropX = cropX;
      startCropY = cropY;

      cropBox.setPointerCapture(event.pointerId);
    }
  );


  cropBox.addEventListener(
    "pointermove",
    function (event) {

      if (!dragging) return;

      const dx =
        event.clientX - startX;

      const dy =
        event.clientY - startY;

      cropX =
        startCropX + dx;

      cropY =
        startCropY + dy;

      const maxX =
        workspace.clientWidth - cropWidth;

      const maxY =
        workspace.clientHeight - cropHeight;

      cropX =
        Math.max(
          0,
          Math.min(cropX, maxX)
        );

      cropY =
        Math.max(
          0,
          Math.min(cropY, maxY)
        );

      updateCropBox();
    }
  );


  cropBox.addEventListener(
    "pointerup",
    function () {

      dragging = false;
    }
  );


  // ===============================
  // RESIZE CROP BOX
  // ===============================

  resizeHandle.addEventListener(
    "pointerdown",
    function (event) {

      event.stopPropagation();

      resizing = true;

      startX = event.clientX;

      startY = event.clientY;

      startSize = cropWidth;

      resizeHandle.setPointerCapture(
        event.pointerId
      );
    }
  );


  resizeHandle.addEventListener(
    "pointermove",
    function (event) {

      if (!resizing) return;

      const dx =
        event.clientX - startX;

      const dy =
        event.clientY - startY;

      const change =
        Math.max(dx, dy);

      const maxSize =
        Math.min(
          workspace.clientWidth - cropX,
          workspace.clientHeight - cropY
        );

      cropWidth =
        Math.max(
          80,
          Math.min(
            startSize + change,
            maxSize
          )
        );

      if (
        shape === "square" ||
        shape === "circle"
      ) {

        cropHeight = cropWidth;

      } else {

        cropHeight =
          cropWidth * 0.65;
      }

      updateCropBox();
    }
  );


  resizeHandle.addEventListener(
    "pointerup",
    function () {

      resizing = false;
    }
  );


  // ===============================
  // APPLY CROP
  // ===============================

  document
    .getElementById("crop-apply-btn")
    .onclick = function () {

      const imageRect =
        image.getBoundingClientRect();

      const workspaceRect =
        workspace.getBoundingClientRect();

      const scaleX =
        image.naturalWidth /
        imageRect.width;

      const scaleY =
        image.naturalHeight /
        imageRect.height;


      const boxRect =
        cropBox.getBoundingClientRect();


      const sourceX =
        (boxRect.left - imageRect.left) *
        scaleX;

      const sourceY =
        (boxRect.top - imageRect.top) *
        scaleY;

      const sourceWidth =
        boxRect.width * scaleX;

      const sourceHeight =
        boxRect.height * scaleY;


      const canvas =
        document.createElement("canvas");

      canvas.width =
        Math.round(sourceWidth);

      canvas.height =
        Math.round(sourceHeight);


      const ctx =
        canvas.getContext("2d");


      // CIRCLE MASK
      if (shape === "circle") {

        ctx.beginPath();

        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          Math.min(
            canvas.width,
            canvas.height
          ) / 2,
          0,
          Math.PI * 2
        );

        ctx.closePath();

        ctx.clip();
      }


      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );


      canvas.toBlob(
        function (blob) {

          if (!blob) {
            alert("Crop failed.");
            return;
          }


          capturedFile =
            new File(
              [blob],
              `cropped-crop-${Date.now()}.png`,
              {
                type: "image/png"
              }
            );


          if (capturedURL) {
            URL.revokeObjectURL(
              capturedURL
            );
          }


          capturedURL =
            URL.createObjectURL(blob);


          photo.src =
            capturedURL;


          document
            .getElementById("save-media-btn")
            .href =
            capturedURL;


          document
            .getElementById("save-media-btn")
            .download =
            `cropped-crop-${Date.now()}.png`;


          document
            .getElementById("save-media-btn")
            .textContent =
            "💾 Save Photo";


          cropContainer.remove();

        },
        "image/png"
      );
    };


  // ===============================
  // CANCEL
  // ===============================

  document
    .getElementById("crop-cancel-btn")
    .onclick = function () {

      cropContainer.remove();
    };

};






















  // ===============================
// VIDEO CROP
// ===============================

window.startVideoCrop = function () {

  const video = document.getElementById("recorded-video");

  if (!video || video.classList.contains("hidden")) {
    alert("Please record a video first.");
    return;
  }

  const cropContainer = document.createElement("div");

  cropContainer.id = "video-crop-container";

  cropContainer.className =
    "fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center p-4 overflow-auto";

  cropContainer.innerHTML = `

    <div class="bg-white rounded-2xl p-4 w-full max-w-3xl">

      <h3 class="text-xl font-bold text-[#154212] mb-4">
        ✂️ Crop Video
      </h3>

      <!-- VIDEO AREA -->

      <div
        id="video-crop-area"
        class="relative bg-black rounded-xl overflow-hidden mx-auto"
        style="width:100%; max-height:60vh;"
      >

        <video
          id="video-crop-preview"
          src="${video.src}"
          controls
          class="w-full max-h-[60vh] object-contain"
        ></video>

        <!-- CROP BOX -->

        <div
          id="video-crop-box"
          class="absolute border-2 border-white"
          style="
            width:60%;
            height:60%;
            left:20%;
            top:20%;
            box-sizing:border-box;
            touch-action:none;
          "
        >

          <div
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span
              id="video-crop-shape-icon"
              class="text-white text-4xl font-bold drop-shadow-lg"
            >
              □
            </span>
          </div>

          <!-- RESIZE HANDLE -->

          <div
            id="video-crop-resize"
            class="absolute -right-3 -bottom-3 w-6 h-6 bg-white border-2 border-[#2d5a27] rounded-full"
            style="touch-action:none; cursor:nwse-resize;"
          ></div>

        </div>

      </div>


      <!-- SHAPE BUTTONS -->

      <div class="flex flex-wrap justify-center gap-2 mt-4">

        <button
          type="button"
          id="video-square-btn"
          class="bg-[#2d5a27] text-white px-4 py-2 rounded-lg font-bold"
        >
          □ Square
        </button>

        <button
          type="button"
          id="video-rectangle-btn"
          class="bg-gray-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          ▭ Rectangle
        </button>

        <button
          type="button"
          id="video-circle-btn"
          class="bg-gray-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          ○ Circle
        </button>

      </div>


      <!-- SIZE CONTROLS -->

      <div class="flex items-center justify-center gap-3 mt-4">

        <button
          type="button"
          id="video-crop-minus"
          class="bg-gray-700 text-white w-10 h-10 rounded-full text-xl font-bold"
        >
          −
        </button>

        <span
          id="video-crop-size-text"
          class="font-bold text-[#154212] min-w-[80px] text-center"
        >
          60%
        </span>

        <button
          type="button"
          id="video-crop-plus"
          class="bg-[#2d5a27] text-white w-10 h-10 rounded-full text-xl font-bold"
        >
          +
        </button>

      </div>


      <!-- ACTION BUTTONS -->

      <div class="flex justify-center gap-3 mt-4">

        <button
          type="button"
          id="apply-video-crop"
          class="bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-bold"
        >
          ✓ Apply Crop
        </button>

        <button
          type="button"
          id="cancel-video-crop"
          class="bg-gray-600 text-white px-6 py-3 rounded-xl font-bold"
        >
          Cancel
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(cropContainer);


  const cropArea =
    document.getElementById("video-crop-area");

  const cropBox =
    document.getElementById("video-crop-box");

  const resizeHandle =
    document.getElementById("video-crop-resize");

  const shapeIcon =
    document.getElementById("video-crop-shape-icon");

  const sizeText =
    document.getElementById("video-crop-size-text");


  let cropShape = "square";

  let cropSize = 60;

  let isDragging = false;

  let isResizing = false;

  let startX = 0;
  let startY = 0;

  let startLeft = 0;
  let startTop = 0;

  let startWidth = 0;
  let startHeight = 0;


  // ===============================
  // UPDATE CROP BOX
  // ===============================

  function updateCropBox() {

    const areaWidth = cropArea.clientWidth;

    const areaHeight = cropArea.clientHeight;

    let width;
    let height;

    if (cropShape === "square") {

      const size =
        Math.min(areaWidth, areaHeight) *
        (cropSize / 100);

      width = size;
      height = size;

    }

    else if (cropShape === "circle") {

      const size =
        Math.min(areaWidth, areaHeight) *
        (cropSize / 100);

      width = size;
      height = size;

    }

    else {

      width =
        areaWidth * (cropSize / 100);

      height =
        areaHeight * 0.60;

    }


    cropBox.style.width = width + "px";

    cropBox.style.height = height + "px";

    cropBox.style.left =
      (areaWidth - width) / 2 + "px";

    cropBox.style.top =
      (areaHeight - height) / 2 + "px";


    if (cropShape === "circle") {

      cropBox.style.borderRadius = "50%";

      shapeIcon.textContent = "○";

    }

    else if (cropShape === "square") {

      cropBox.style.borderRadius = "0";

      shapeIcon.textContent = "□";

    }

    else {

      cropBox.style.borderRadius = "0";

      shapeIcon.textContent = "▭";

    }

    sizeText.textContent =
      Math.round(cropSize) + "%";
  }


  // ===============================
  // SHAPE BUTTONS
  // ===============================

  document
    .getElementById("video-square-btn")
    .onclick = function () {

      cropShape = "square";

      updateCropBox();
    };


  document
    .getElementById("video-rectangle-btn")
    .onclick = function () {

      cropShape = "rectangle";

      updateCropBox();
    };


  document
    .getElementById("video-circle-btn")
    .onclick = function () {

      cropShape = "circle";

      updateCropBox();
    };


  // ===============================
  // SIZE +
  // ===============================

  document
    .getElementById("video-crop-plus")
    .onclick = function () {

      cropSize += 5;

      if (cropSize > 90) {
        cropSize = 90;
      }

      updateCropBox();
    };


  // ===============================
  // SIZE -
  // ===============================

  document
    .getElementById("video-crop-minus")
    .onclick = function () {

      cropSize -= 5;

      if (cropSize < 20) {
        cropSize = 20;
      }

      updateCropBox();
    };


  // ===============================
  // DRAG CROP BOX
  // ===============================

  cropBox.addEventListener(
    "pointerdown",
    function (event) {

      if (event.target === resizeHandle) {
        return;
      }

      event.preventDefault();

      isDragging = true;

      startX = event.clientX;

      startY = event.clientY;

      startLeft =
        cropBox.offsetLeft;

      startTop =
        cropBox.offsetTop;

      cropBox.setPointerCapture(
        event.pointerId
      );
    }
  );


  cropBox.addEventListener(
    "pointermove",
    function (event) {

      if (!isDragging) return;

      const dx =
        event.clientX - startX;

      const dy =
        event.clientY - startY;

      let newLeft =
        startLeft + dx;

      let newTop =
        startTop + dy;


      const maxLeft =
        cropArea.clientWidth -
        cropBox.offsetWidth;

      const maxTop =
        cropArea.clientHeight -
        cropBox.offsetHeight;


      newLeft =
        Math.max(
          0,
          Math.min(newLeft, maxLeft)
        );

      newTop =
        Math.max(
          0,
          Math.min(newTop, maxTop)
        );


      cropBox.style.left =
        newLeft + "px";

      cropBox.style.top =
        newTop + "px";
    }
  );


  cropBox.addEventListener(
    "pointerup",
    function () {

      isDragging = false;
    }
  );


  // ===============================
  // RESIZE CROP BOX
  // ===============================

  resizeHandle.addEventListener(
    "pointerdown",
    function (event) {

      event.preventDefault();

      event.stopPropagation();

      isResizing = true;

      startX = event.clientX;

      startY = event.clientY;

      startWidth =
        cropBox.offsetWidth;

      startHeight =
        cropBox.offsetHeight;

      resizeHandle.setPointerCapture(
        event.pointerId
      );
    }
  );


  resizeHandle.addEventListener(
    "pointermove",
    function (event) {

      if (!isResizing) return;

      const dx =
        event.clientX - startX;

      let newWidth =
        startWidth + dx;


      const maxWidth =
        cropArea.clientWidth;

      const minWidth = 60;


      newWidth =
        Math.max(
          minWidth,
          Math.min(newWidth, maxWidth)
        );


      if (
        cropShape === "square" ||
        cropShape === "circle"
      ) {

        cropBox.style.width =
          newWidth + "px";

        cropBox.style.height =
          newWidth + "px";

      }

      else {

        cropBox.style.width =
          newWidth + "px";
      }

    }
  );


  resizeHandle.addEventListener(
    "pointerup",
    function () {

      isResizing = false;

      cropSize =
        (cropBox.offsetWidth /
          cropArea.clientWidth) *
        100;

      sizeText.textContent =
        Math.round(cropSize) + "%";
    }
  );


  // ===============================
  // CANCEL
  // ===============================

  document
    .getElementById("cancel-video-crop")
    .onclick = function () {

      cropContainer.remove();
    };


  // ===============================
  // APPLY VIDEO CROP
  // ===============================

  document
    .getElementById("apply-video-crop")
    .onclick = async function () {

      const preview =
        document.getElementById(
          "video-crop-preview"
        );

      if (!preview.videoWidth) {

        alert(
          "Please wait for the video to load."
        );

        return;
      }


      const areaRect =
        cropArea.getBoundingClientRect();

      const boxRect =
        cropBox.getBoundingClientRect();


      const scaleX =
        preview.videoWidth /
        preview.getBoundingClientRect().width;

      const scaleY =
        preview.videoHeight /
        preview.getBoundingClientRect().height;


      let sourceX =
        (boxRect.left -
          preview.getBoundingClientRect().left) *
        scaleX;

      let sourceY =
        (boxRect.top -
          preview.getBoundingClientRect().top) *
        scaleY;


      let sourceWidth =
        boxRect.width * scaleX;

      let sourceHeight =
        boxRect.height * scaleY;


      sourceX =
        Math.max(
          0,
          Math.min(
            sourceX,
            preview.videoWidth - sourceWidth
          )
        );

      sourceY =
        Math.max(
          0,
          Math.min(
            sourceY,
            preview.videoHeight - sourceHeight
          )
        );


      const canvas =
        document.createElement("canvas");

      canvas.width =
        Math.round(sourceWidth);

      canvas.height =
        Math.round(sourceHeight);


      const ctx =
        canvas.getContext("2d");


      // ===============================
      // DRAW CROPPED VIDEO FRAME
      // ===============================

      function drawFrame() {

        if (preview.ended) return;

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );


        if (cropShape === "circle") {

          ctx.save();

          ctx.beginPath();

          ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            Math.min(
              canvas.width,
              canvas.height
            ) / 2,
            0,
            Math.PI * 2
          );

          ctx.clip();
        }


        ctx.drawImage(
          preview,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );


        if (cropShape === "circle") {

          ctx.restore();
        }


        requestAnimationFrame(
          drawFrame
        );
      }


      // ===============================
      // PLAY VIDEO
      // ===============================

      preview.currentTime = 0;

      await preview.play();


      drawFrame();


      // ===============================
      // CREATE CROPPED VIDEO STREAM
      // ===============================

      const canvasStream =
        canvas.captureStream(30);


      // Try to keep original audio
      try {

        if (
          preview.captureStream
        ) {

          const originalStream =
            preview.captureStream();

          originalStream
            .getAudioTracks()
            .forEach(track => {

              canvasStream.addTrack(
                track
              );

            });
        }

      } catch (audioError) {

        console.log(
          "Audio track could not be added:",
          audioError
        );
      }


      let mimeType =
        "video/webm";


      if (
        MediaRecorder.isTypeSupported(
          "video/webm;codecs=vp9"
        )
      ) {

        mimeType =
          "video/webm;codecs=vp9";
      }

      else if (
        MediaRecorder.isTypeSupported(
          "video/webm;codecs=vp8"
        )
      ) {

        mimeType =
          "video/webm;codecs=vp8";
      }


      const recorder =
        new MediaRecorder(
          canvasStream,
          {
            mimeType: mimeType
          }
        );


      const chunks = [];


      recorder.ondataavailable =
        function (event) {

          if (
            event.data &&
            event.data.size > 0
          ) {

            chunks.push(
              event.data
            );
          }
        };


      recorder.onstop =
        function () {

          const croppedBlob =
            new Blob(
              chunks,
              {
                type: mimeType
              }
            );


          capturedFile =
            new File(
              [croppedBlob],
              `cropped-crop-video-${Date.now()}.webm`,
              {
                type: mimeType
              }
            );


          if (capturedURL) {

            URL.revokeObjectURL(
              capturedURL
            );
          }


          capturedURL =
            URL.createObjectURL(
              croppedBlob
            );


          const recordedVideo =
            document.getElementById(
              "recorded-video"
            );


          recordedVideo.src =
            capturedURL;


          recordedVideo.classList.remove(
            "hidden"
          );


          const saveButton =
            document.getElementById(
              "save-media-btn"
            );


          saveButton.href =
            capturedURL;


          saveButton.download =
            `cropped-crop-video-${Date.now()}.webm`;


          saveButton.textContent =
            "💾 Save Video";


          cropContainer.remove();


          alert(
            "Video cropped successfully! 🎥"
          );
        };


      recorder.start();


      preview.onended =
        function () {

          if (
            recorder.state !==
            "inactive"
          ) {

            recorder.stop();
          }
        };

    };


  // Initial crop box

  const cropPreview =
    document.getElementById(
      "video-crop-preview"
    );


  cropPreview.onloadedmetadata =
    function () {

      updateCropBox();
    };

};