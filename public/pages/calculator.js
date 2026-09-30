// Pesticide Calculator Page
function renderCalculator() {

  const activeLanguage =
    localStorage.getItem("selectedLanguage") || "en";

  const t =
    translations[activeLanguage] || translations.en;

  const el = document.getElementById('page-calculator');



  el.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-6">
        <!-- Calculation Input -->
        <section class="bg-white rounded-xl p-6 border border-[#c2c9bb] shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="bg-[#2d5a27] p-2 rounded-lg"><span class="material-symbols-outlined text-white">biotech</span></div>
           <h2 class="font-[Lexend] text-2xl font-medium text-[#154212]">
               ${t.calculatorTitle}
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="font-semibold text-sm text-[#42493e] px-1">
                ${t.landArea}
              </label>
              <div class="relative">
                <input id="calc-area" class="w-full p-3 bg-[#f8faf9] border border-[#c2c9bb] rounded-lg focus:ring-2 focus:ring-[#2d5a27] outline-none transition-all" placeholder="${t.enterValue}" type="number"/>
                <select id="calc-unit" class="absolute right-2 top-1.5 bg-[#e7e8e7] border-none rounded px-2 py-1.5 font-semibold text-sm focus:ring-0">
                  <option value="acres">${t.acres}</option>
                  <option value="hectares">${t.hectares}</option>
                </select>
              </div>
            </div>
            <div class="space-y-2">
              <label class="font-semibold text-sm text-[#42493e] px-1">
                ${t.cropType}
              </label>
              <div class="relative">
                <select id="calc-crop" class="w-full p-3 bg-[#f8faf9] border border-[#c2c9bb] rounded-lg focus:ring-2 focus:ring-[#2d5a27] outline-none appearance-none transition-all">
                  <option disabled selected value="">${t.selectCrop}</option>
                  <option value="Rice / Paddy">${t.ricePaddy}</option>
                  <option value="Wheat">${t.wheat}</option>
                  <option value="Cotton">${t.cotton}</option>
                  <option value="Maize">${t.maize}</option>
                  <option value="Sugarcane">${t.sugarcane}</option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-3 text-[#42493e] pointer-events-none">expand_more</span>
              </div>
            </div>
            <div class="md:col-span-2 space-y-2">
              <label class="font-semibold text-sm text-[#42493e] px-1">
                ${t.targetPestDisease}
              </label>
              <div class="relative">
                <input id="calc-pest" class="w-full p-3 bg-[#f8faf9] border border-[#c2c9bb] rounded-lg focus:ring-2 focus:ring-[#2d5a27] outline-none transition-all" placeholder="${t.pestPlaceholder}" type="text"/>
                <span class="material-symbols-outlined absolute right-3 top-3 text-[#42493e]">search</span>
              </div>
            </div>
          </div>
          <button onclick="calculatePesticide()" class="w-full mt-8 bg-[#2d5a27] text-white py-4 rounded-xl font-[Lexend] text-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
            <span class="material-symbols-outlined">calculate</span>
            ${t.calculateRequirements}
          </button>
        </section>

        <!-- Results -->
        <section id="calc-results" class="bg-white rounded-xl border border-[#c2c9bb] shadow-sm overflow-hidden hidden">
          <div class="bg-[#154212]/5 p-6 border-b border-[#c2c9bb] flex justify-between items-center">
            <div>
              <h2 class="font-[Lexend] text-2xl font-medium text-[#154212]">
                ${t.calculationResults}
              </h2>
              <p class="text-[#42493e] text-xs" id="calc-summary">
                ${t.generatedFor} 5.0 Acres of Rice
              </p>
            </div>
            <div class="flex gap-2">
              <button class="p-2 bg-white border border-[#c2c9bb] rounded-lg hover:bg-stone-50 transition-colors shadow-sm"><span class="material-symbols-outlined text-[#2d5a27]" style="font-variation-settings:'FILL' 1;">share</span></button>
              <button class="p-2 bg-white border border-[#c2c9bb] rounded-lg hover:bg-stone-50 transition-colors shadow-sm"><span class="material-symbols-outlined text-[#2d5a27]" style="font-variation-settings:'FILL' 1;">bookmark</span></button>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div class="bg-[#f3f4f3] p-4 rounded-xl border border-stone-100">
                <p class="font-semibold text-sm text-[#42493e] mb-1">
                  ${t.recommendedPesticide}
                </p>
                <p class="font-[Lexend] text-xl font-medium text-[#154212]" id="res-pesticide">Monocrotophos 36% SL</p>
              </div>
              <div class="bg-[#f3f4f3] p-4 rounded-xl border border-stone-100">
                <p class="font-semibold text-sm text-[#42493e] mb-1">
                  ${t.totalDosage}
                </p>
                <p class="font-[Lexend] text-xl font-medium text-[#154212]" id="res-dosage">2.5 Liters</p>
                <p class="text-xs text-[#42493e] mt-1" id="res-per-acre">(0.5 Liters per Acre)</p>
              </div>
              <div class="bg-[#f3f4f3] p-4 rounded-xl border border-stone-100 md:col-span-2">
                <p class="font-semibold text-sm text-[#42493e] mb-1">
                  ${t.waterForDilution}
                </p>
                <div class="flex items-end gap-2">
                  <p class="font-[Lexend] text-xl font-medium text-[#154212]" id="res-water">1,000 Liters</p>
                  <p class="text-[#42493e] mb-0.5" id="res-water-rate">@ 200L / Acre</p>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <h3 class="font-semibold text-sm uppercase tracking-wider">
                ${t.safetyPPE}
              </h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                ${[
                  `masks,${t.faceMask}`,
                  `front_hand,${t.gloves}`,
                  `visibility,${t.goggles}`,
                  `water_full,${t.boots}`
                ].map(i => {
                  const [icon,name] = i.split(',');
                  return `<div class="flex flex-col items-center p-3 rounded-lg border border-[#c2c9bb] bg-stone-50 text-center">
                    <span class="material-symbols-outlined text-[#895100] mb-1">${icon}</span>
                    <span class="text-xs font-bold">${name}</span>
                  </div>`;
                }).join('')}
              </div>
              <div class="bg-[#f0f4c5]/30 p-4 rounded-lg border-l-4 border-[#EBC106] mt-4">
                <div class="flex gap-3">
                  <span class="material-symbols-outlined text-[#EBC106]">warning</span>
                  <p class="text-[#EBC106] text-sm">
                    ${t.safetyWarning}
                  </p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button class="flex items-center justify-center gap-2 py-3 border-2 border-[#2d5a27] text-[#2d5a27] font-bold rounded-xl hover:bg-green-50 transition-colors">
                <span class="material-symbols-outlined">save</span> ${t.saveCalculation}
              </button>
              <button class="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:opacity-90 shadow-md">
                <span class="material-symbols-outlined">chat</span> ${t.shareWhatsApp}
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="lg:col-span-4 space-y-6">
        <section class="bg-[#e7e8e7] rounded-xl p-6 border border-[#c2c9bb]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-[Lexend] text-xl font-medium">${t.recentActivity}</h3>
            <button class="text-[#2d5a27] font-semibold text-sm hover:underline">
              ${t.viewAll}
            </button>
              
          </div>
          <div class="space-y-3">
            ${[
              {
                name: t.cottonFieldA,
                detail: t.twoDaysAgo,
                icon: 'grass',
                color: 'secondary-fixed,secondary'
              },
              {
                name: t.wheatPlot4,
                detail: t.oneWeekAgo,
                icon: 'agriculture',
                color: 'tertiary-fixed,tertiary'
              },
              {
                name: t.sugarcaneBlock,
                detail: t.oct15,
                icon: 'eco',
                color: 'stone-200,stone-600',
                faded: true
              }
            ].map(h => `
              <div class="bg-white p-3 rounded-lg border border-stone-200 flex items-center gap-3 ${h.faded?'opacity-70':''}">
                <div class="bg-[${h.color.includes('secondary')?'#ffdcbc':h.color.includes('tertiary')?'#cbebc3':'#e7e5e4'}] text-[${h.color.includes('secondary')?'#895100':h.color.includes('tertiary')?'#253f23':'#57534e'}] p-2 rounded-lg">
                  <span class="material-symbols-outlined">${h.icon}</span>
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-sm">${h.name}</p>
                  <p class="text-xs text-[#42493e]">${h.detail}</p>
                </div>
                <span class="material-symbols-outlined text-[#42493e]">chevron_right</span>
              </div>
            `).join('')}
          </div>
        </section>

        <div class="relative overflow-hidden rounded-xl h-64 group">
          <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEXFAvOrpBOukQSDesxopKAsO1OF9hKNrwBazT2akICXQNlqQTw10YWjBoz4nUfOfMktotpU-aYfbXnuaxr-K5QIa-L3PDA9da-Th9ToIvF9GQ-SYV9uiPeLR0Xnv1P_Wm88c9M9EUVcDcqmPrHHP6i3g2uXbveBGHAfTjt0rLm1xwvPCtYR-jbfH90-6zJql-9HZxJqEpn56s__XEFwUm6RAzwvIbQK2TOnPdDHckWWlU__554IPNqULQ_hDTaaQRHKdsquozVDXr" alt="Guide"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#154212]/90 to-transparent flex flex-col justify-end p-6">
            <h4 class="text-white font-[Lexend] text-xl font-medium mb-2">
              ${t.pestManagementGuide}
            </h4>
            <p class="text-white/80 text-sm mb-4">
              ${t.pestGuideDescription}
            </p>
            <button class="bg-white/20 backdrop-blur-md text-white border border-white/30 py-2 rounded-lg font-semibold text-sm hover:bg-white/30 transition-all">
              ${t.readGuide}
            </button>
        </div>

        <section class="bg-white rounded-xl p-6 border border-[#c2c9bb] flex items-center gap-4">
          <div class="text-[#895100]"><span class="material-symbols-outlined text-4xl">sunny_snowing</span></div>
          <div>
            <p class="font-semibold text-sm">${t.idealSprayingWindow}</p>
            <p class="text-sm text-green-700 font-bold">
              ${t.goodConditions}
            </p>
            <p class="text-xs text-[#42493e] mt-1">
              ${t.wind}: 4km/h • ${t.humidity}: 65%
            </p>
          </div>
        </section>
      </div>
    </div>
  `;
}

   function calculatePesticide() {

    // Get translations
    const activeLanguage =
        localStorage.getItem("selectedLanguage") || "en";

    const t =
        translations[activeLanguage] || translations.en;

    // Get input values
    const area = parseFloat(
        document.getElementById("calc-area").value
    );

    const crop =
        document.getElementById("calc-crop").value;

    const unit =
        document.getElementById("calc-unit").value;

    console.log("Calculator:", {
        area,
        crop,
        unit
    });

    // Validate
    if (!area || area <= 0) {
        alert(
            t.enterAreaAndCrop ||
            "Please enter a valid land area."
        );
        return;
    }

    if (!crop) {
        alert(
            t.enterAreaAndCrop ||
            "Please select a crop."
        );
        return;
    }

    // Pesticide data
    const pesticideData = {
        "Rice / Paddy": {
            name: "Monocrotophos 36% SL",
            dosage: 0.5,
            water: 200
        },

        "Wheat": {
            name: "Chlorpyrifos 20% EC",
            dosage: 0.4,
            water: 150
        },

        "Cotton": {
            name: "Imidacloprid 17.8% SL",
            dosage: 0.3,
            water: 200
        },

        "Maize": {
            name: "Cypermethrin 25% EC",
            dosage: 0.5,
            water: 200
        },

        "Sugarcane": {
            name: "Fipronil 5% SC",
            dosage: 0.6,
            water: 250
        }
    };

    const data = pesticideData[crop];

    if (!data) {
        console.error("No pesticide data for:", crop);
        alert("No pesticide data available for this crop.");
        return;
    }

    // Calculate
    const totalDosage =
        (area * data.dosage).toFixed(1);

    const totalWater =
        Math.round(area * data.water);

    // Show results section
    const results =
        document.getElementById("calc-results");

    if (results) {
        results.classList.remove("hidden");
    }

    // Summary
    const summary =
        document.getElementById("calc-summary");

    if (summary) {
        const unitText =
            unit === "hectares"
                ? (t.hectares || "Hectares")
                : (t.acres || "Acres");

        summary.textContent =
            `${t.generatedFor || "Generated for"} ${area} ${unitText} ${t.of || "of"} ${crop}`;
    }

    // Pesticide
    document.getElementById("res-pesticide").textContent =
        data.name;

    // Total dosage
    document.getElementById("res-dosage").textContent =
        `${totalDosage} Liters`;

    // Per unit
    const unitName =
        unit === "hectares"
            ? "Hectare"
            : "Acre";

    document.getElementById("res-per-acre").textContent =
        `(${data.dosage} Liters per ${unitName})`;

    // Water
    document.getElementById("res-water").textContent =
        `${totalWater.toLocaleString()} Liters`;

    // Water rate
    document.getElementById("res-water-rate").textContent =
        `@ ${data.water}L / ${unitName}`;

    // Scroll to results
    results.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    console.log("Calculation successful!");
}