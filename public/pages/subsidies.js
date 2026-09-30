// ==========================================
// KRISHI SAHAYAK
// GOVERNMENT SCHEMES & SUBSIDIES
// ==========================================


// ==========================================
// 1. DEMO SCHEME DATA
// ==========================================
// NOTE:
// These records are for testing the UI/filtering.
// Replace them with verified government data
// before production use.
// ==========================================

const governmentSchemes = [

    // ======================================
    // CENTRAL GOVERNMENT
    // ======================================

    {
        id: "pm-kisan",

        name: "PM-KISAN",

        state: "all",

        category: "financial",

        crop: "all",

        icon: "agriculture",

        benefit:
            "Financial support for eligible farmer families.",

        description:
            "Central government income support scheme for eligible farmers.",

        eligibility:
            "Eligibility depends on the applicable government guidelines.",

        documents: [
            "Aadhaar Card",
            "Bank Account Details",
            "Land Records"
        ],

        howToApply:
            "Check the official government portal for the current application process.",

        officialPortal:
            "https://pmkisan.gov.in/",

        lastVerified:
            "Verify current status and eligibility on the official government portal."
    },


    // ======================================
    // UTTAR PRADESH
    // ======================================

    {
        id: "up-farm-machinery",

        name: "Farm Machinery Assistance",

        state: "Uttar Pradesh",

        category: "machinery",

        crop: "all",

        icon: "agriculture",

        benefit:
            "Assistance for eligible agricultural machinery.",

        description:
            "Support for eligible farmers purchasing or using approved agricultural machinery.",

        eligibility:
            "Eligibility depends on the applicable Uttar Pradesh government guidelines.",

        documents: [
            "Aadhaar Card",
            "Bank Account Details",
            "Land Records"
        ],

        howToApply:
            "Check the official Uttar Pradesh agriculture portal for current application instructions.",

        officialPortal:
            "https://upagriculture.com/",

        lastVerified:
            "Verify current availability and eligibility on the official portal."
    },


    {
        id: "up-irrigation",

        name: "Irrigation Assistance",

        state: "Uttar Pradesh",

        category: "irrigation",

        crop: "all",

        icon: "water_drop",

        benefit:
            "Support for eligible irrigation-related agricultural activities.",

        description:
            "Government assistance for eligible farmers requiring irrigation support.",

        eligibility:
            "Eligibility depends on the applicable scheme guidelines.",

        documents: [
            "Aadhaar Card",
            "Bank Account Details",
            "Land Records"
        ],

        howToApply:
            "Check the official Uttar Pradesh agriculture portal for current application instructions.",

        officialPortal:
            "https://upagriculture.com/",

        lastVerified:
            "Verify current scheme status on the official portal."
    },


    // ======================================
    // BIHAR
    // ======================================

    {
        id: "bihar-agriculture-support",

        name: "Agriculture Support Scheme",

        state: "Bihar",

        category: "financial",

        crop: "all",

        icon: "agriculture",

        benefit:
            "Agricultural assistance for eligible farmers.",

        description:
            "Support available under applicable Bihar agriculture schemes.",

        eligibility:
            "Eligibility depends on current Bihar government scheme guidelines.",

        documents: [
            "Aadhaar Card",
            "Bank Account Details",
            "Land Records"
        ],

        howToApply:
            "Check the official Bihar agriculture portal for current application instructions.",

        officialPortal:
            "https://dbtagriculture.bihar.gov.in/",

        lastVerified:
            "Verify current availability on the official government portal."
    }

];


// ==========================================
// 2. INITIALIZE PAGE
// ==========================================

function initSubsidiesPage() {

    const page =
        document.getElementById("page-subsidies");


    // --------------------------------------
    // Safety check
    // --------------------------------------

    if (!page) {

        console.error(
            "❌ page-subsidies container not found"
        );

        return;

    }


    // --------------------------------------
    // Render page
    // --------------------------------------

    page.innerHTML = `

        <div class="
            p-4
            md:p-8
            max-w-7xl
            mx-auto
            w-full
        ">


            <!-- ================================= -->
            <!-- HEADER -->
            <!-- ================================= -->

            <div class="mb-8">

                <div class="
                    flex
                    items-center
                    gap-3
                    mb-3
                ">

                    <div class="
                        w-12
                        h-12
                        rounded-xl
                        bg-green-100
                        flex
                        items-center
                        justify-center
                    ">

                        <span class="
                            material-symbols-outlined
                            text-green-800
                            text-2xl
                        ">
                            account_balance
                        </span>

                    </div>


                    <div>

                        <h1 class="
                            text-2xl
                            md:text-3xl
                            font-bold
                            text-green-900
                        ">
                            Government Schemes & Subsidies
                        </h1>


                        <p class="
                            text-stone-500
                            text-sm
                            mt-1
                        ">
                            Find government support relevant to your farming needs.
                        </p>

                    </div>

                </div>

            </div>


            <!-- ================================= -->
            <!-- SEARCH -->
            <!-- ================================= -->

            <div class="mb-8">

                <div class="relative">

                    <span class="
                        material-symbols-outlined
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-stone-400
                    ">
                        search
                    </span>


                    <input
                        type="text"
                        id="subsidy-search"
                        placeholder="Search schemes, subsidies or farming support..."
                        class="
                            w-full
                            pl-12
                            pr-4
                            py-4
                            bg-white
                            border
                            border-stone-200
                            rounded-xl
                            text-sm
                            outline-none
                            focus:ring-2
                            focus:ring-green-700/20
                            focus:border-green-700
                            shadow-sm
                        "
                    />

                </div>

            </div>


            <!-- ================================= -->
            <!-- FILTER CARD -->
            <!-- ================================= -->

            <div class="
                bg-white
                border
                border-stone-200
                rounded-2xl
                shadow-sm
                p-5
                md:p-7
                mb-8
            ">


                <div class="mb-6">

                    <h2 class="
                        text-xl
                        font-bold
                        text-green-900
                    ">
                        Find Schemes For Me
                    </h2>


                    <p class="
                        text-sm
                        text-stone-500
                        mt-1
                    ">
                        Tell us about your farming needs to find relevant schemes.
                    </p>

                </div>


                <!-- ================================= -->
                <!-- FILTERS -->
                <!-- ================================= -->

                <div class="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                ">


                    <!-- STATE -->

                    <div>

                        <label
                            for="subsidy-state"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            📍 State
                        </label>


                        <select
                            id="subsidy-state"
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                            "
                        >

                            <option value="">
                                Select State
                            </option>

                        </select>

                    </div>


                    <!-- DISTRICT -->

                    <div>

                        <label
                            for="subsidy-district"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            📍 District
                        </label>


                        <select
                            id="subsidy-district"
                            disabled
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >

                            <option value="">
                                Select District
                            </option>

                        </select>

                    </div>


                    <!-- CROP -->

                    <div>

                        <label
                            for="subsidy-crop"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            🌱 Crop
                        </label>


                        <select
                            id="subsidy-crop"
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                            "
                        >

                            <option value="">
                                Select Crop
                            </option>

                            <option value="wheat">
                                Wheat
                            </option>

                            <option value="rice">
                                Rice
                            </option>

                            <option value="maize">
                                Maize
                            </option>

                            <option value="mustard">
                                Mustard
                            </option>

                            <option value="sugarcane">
                                Sugarcane
                            </option>

                            <option value="vegetables">
                                Vegetables
                            </option>

                            <option value="fruits">
                                Fruits
                            </option>

                            <option value="horticulture">
                                Horticulture
                            </option>

                            <option value="all">
                                All Crops
                            </option>

                        </select>

                    </div>


                    <!-- REQUIREMENT -->

                    <div>

                        <label
                            for="subsidy-requirement"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            🚜 What do you need?
                        </label>


                        <select
                            id="subsidy-requirement"
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                            "
                        >

                            <option value="">
                                Select Requirement
                            </option>

                            <option value="seeds">
                                Seeds
                            </option>

                            <option value="fertilizer">
                                Fertilizer
                            </option>

                            <option value="irrigation">
                                Irrigation
                            </option>

                            <option value="solar">
                                Solar Pump / Solar Equipment
                            </option>

                            <option value="machinery">
                                Farm Machinery
                            </option>

                            <option value="insurance">
                                Crop Insurance
                            </option>

                            <option value="storage">
                                Storage
                            </option>

                            <option value="organic">
                                Organic Farming
                            </option>

                            <option value="horticulture">
                                Horticulture
                            </option>

                            <option value="financial">
                                Financial Assistance
                            </option>

                        </select>

                    </div>


                    <!-- FARMER CATEGORY -->

                    <div class="md:col-span-2">

                        <label
                            for="farmer-category"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            👨‍🌾 Farmer Category
                        </label>


                        <select
                            id="farmer-category"
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                            "
                        >

                            <option value="">
                                Select Farmer Category
                            </option>

                            <option value="marginal">
                                Marginal Farmer
                            </option>

                            <option value="small">
                                Small Farmer
                            </option>

                            <option value="other">
                                Other Farmer
                            </option>

                            <option value="women">
                                Women Farmer
                            </option>

                            <option value="fpo">
                                FPO / Farmer Group
                            </option>

                        </select>

                    </div>

                </div>


                <!-- ================================= -->
                <!-- FIND BUTTON -->
                <!-- ================================= -->

                <div class="mt-6">

                    <button
                        id="find-schemes-btn"
                        type="button"
                        class="
                            w-full
                            md:w-auto
                            px-8
                            py-3
                            bg-[#2d5a27]
                            text-white
                            rounded-xl
                            font-bold
                            hover:bg-[#23481f]
                            transition-all
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >

                        <span class="
                            material-symbols-outlined
                        ">
                            search
                        </span>

                        Find My Schemes

                    </button>

                </div>

            </div>


            <!-- ================================= -->
            <!-- RESULTS -->
            <!-- ================================= -->

            <div id="scheme-results">

                <div class="
                    bg-white
                    border
                    border-stone-200
                    rounded-2xl
                    p-8
                    text-center
                ">

                    <span class="
                        material-symbols-outlined
                        text-5xl
                        text-green-700
                    ">
                        account_balance
                    </span>


                    <h3 class="
                        text-xl
                        font-bold
                        text-stone-800
                        mt-4
                    ">
                        Find Government Support
                    </h3>


                    <p class="
                        text-sm
                        text-stone-500
                        mt-2
                        max-w-md
                        mx-auto
                    ">
                        Select your state, crop and farming requirement
                        to discover relevant government schemes.
                    </p>

                </div>

            </div>

        </div>

    `;


    // ======================================
    // SETUP LOCATION
    // ======================================

    setupSubsidyLocation();


    // ======================================
    // SETUP FILTER EVENTS
    // ======================================

    setupSubsidyFilters();


    console.log(
        "✅ Government Schemes page initialized"
    );

}



// ==========================================
// 3. STATE & DISTRICT
// ==========================================

function setupSubsidyLocation() {

    const stateSelect =
        document.getElementById(
            "subsidy-state"
        );


    const districtSelect =
        document.getElementById(
            "subsidy-district"
        );


    if (
        !stateSelect ||
        !districtSelect
    ) {

        console.error(
            "❌ Subsidy state/district elements not found"
        );

        return;

    }


    // --------------------------------------
    // Check shared profile data
    // --------------------------------------

    if (
        typeof stateDistrictData ===
        "undefined"
    ) {

        console.error(
            "❌ stateDistrictData is not available. Make sure profile.js loads before subsidies.js."
        );

        return;

    }


    // --------------------------------------
    // Populate states
    // --------------------------------------

    stateSelect.innerHTML = `
        <option value="">
            Select State
        </option>
    `;


    Object.keys(stateDistrictData)
        .sort()
        .forEach((stateName) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                stateName;


            option.textContent =
                stateName;


            stateSelect.appendChild(
                option
            );

        });


    // --------------------------------------
    // State changed
    // --------------------------------------

    stateSelect.addEventListener(
        "change",
        function () {

            const selectedState =
                this.value;


            populateSubsidyDistricts(
                selectedState
            );


            // Immediately update schemes
            displayStateSchemes(
                selectedState
            );

        }
    );


    // --------------------------------------
    // Saved Profile State
    // --------------------------------------

    const savedState =
        localStorage.getItem(
            "state"
        );


    const savedDistrict =
        localStorage.getItem(
            "district"
        );


    if (
        savedState &&
        stateDistrictData[savedState]
    ) {

        stateSelect.value =
            savedState;


        populateSubsidyDistricts(
            savedState,
            savedDistrict
        );


        // Show schemes for saved state
        displayStateSchemes(
            savedState
        );

    }

}



// ==========================================
// 4. POPULATE DISTRICTS
// ==========================================

function populateSubsidyDistricts(
    stateName,
    savedDistrict = ""
) {

    const districtSelect =
        document.getElementById(
            "subsidy-district"
        );


    if (!districtSelect) {

        return;

    }


    // --------------------------------------
    // Reset
    // --------------------------------------

    districtSelect.innerHTML = `
        <option value="">
            Select District
        </option>
    `;


    // --------------------------------------
    // No valid state
    // --------------------------------------

    if (
        !stateName ||
        typeof stateDistrictData ===
            "undefined" ||
        !stateDistrictData[stateName]
    ) {

        districtSelect.disabled = true;

        return;

    }


    // --------------------------------------
    // Enable
    // --------------------------------------

    districtSelect.disabled = false;


    // --------------------------------------
    // Get districts
    // --------------------------------------

    const districts =
        Array.isArray(
            stateDistrictData[stateName]
        )
            ? [
                ...stateDistrictData[stateName]
              ]
            : [];


    districts.sort();


    // --------------------------------------
    // Add districts
    // --------------------------------------

    districts.forEach(
        (districtName) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                districtName;


            option.textContent =
                districtName;


            districtSelect.appendChild(
                option
            );

        }
    );


    // --------------------------------------
    // Restore saved district
    // --------------------------------------

    if (
        savedDistrict &&
        districts.includes(
            savedDistrict
        )
    ) {

        districtSelect.value =
            savedDistrict;

    }

}



// ==========================================
// 5. GET SCHEMES FOR STATE
// ==========================================

function getSchemesByState(state) {

    if (!state) {

        return [];

    }


    return governmentSchemes.filter(
        (scheme) => {

            return (
                scheme.state === "all" ||
                scheme.state === state
            );

        }
    );

}



// ==========================================
// 6. DISPLAY STATE SCHEMES
// ==========================================

function displayStateSchemes(state) {

    const results =
        document.getElementById(
            "scheme-results"
        );


    if (!results) {

        return;

    }


    // --------------------------------------
    // No state
    // --------------------------------------

    if (!state) {

        results.innerHTML = `

            <div class="
                bg-white
                border
                border-stone-200
                rounded-2xl
                p-8
                text-center
            ">

                <span class="
                    material-symbols-outlined
                    text-5xl
                    text-green-700
                ">
                    location_on
                </span>


                <h3 class="
                    text-xl
                    font-bold
                    text-stone-800
                    mt-4
                ">
                    Select Your State
                </h3>


                <p class="
                    text-sm
                    text-stone-500
                    mt-2
                ">
                    Select your state to see available
                    government schemes and subsidies.
                </p>

            </div>

        `;

        return;

    }


    const schemes =
        getSchemesByState(state);


    // --------------------------------------
    // No schemes
    // --------------------------------------

    if (schemes.length === 0) {

        results.innerHTML = `

            <div class="
                bg-white
                border
                border-stone-200
                rounded-2xl
                p-8
                text-center
            ">

                <span class="
                    material-symbols-outlined
                    text-5xl
                    text-stone-400
                ">
                    search_off
                </span>


                <h3 class="
                    text-xl
                    font-bold
                    text-stone-800
                    mt-4
                ">
                    No Schemes Found
                </h3>


                <p class="
                    text-sm
                    text-stone-500
                    mt-2
                ">

                    We couldn't find schemes for
                    ${escapeHtml(state)}.

                </p>

            </div>

        `;

        return;

    }


    // --------------------------------------
    // Render
    // --------------------------------------

    results.innerHTML = `

        <div class="mb-6">

            <h2 class="
                text-2xl
                font-bold
                text-green-900
            ">

                Schemes for
                ${escapeHtml(state)}

            </h2>


            <p class="
                text-sm
                text-stone-500
                mt-1
            ">

                ${schemes.length}
                scheme${schemes.length !== 1 ? "s" : ""}
                available

            </p>

        </div>


        <div class="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-5
        ">

            ${schemes
                .map(
                    (scheme) =>
                        createSchemeCard(
                            scheme
                        )
                )
                .join("")}

        </div>

    `;

}



// ==========================================
// 7. CREATE SCHEME CARD
// ==========================================

function createSchemeCard(scheme) {

    return `

        <div class="
            bg-white
            border
            border-stone-200
            rounded-2xl
            shadow-sm
            p-5
            hover:shadow-md
            transition
        ">


            <!-- ICON -->

            <div class="
                w-12
                h-12
                rounded-xl
                bg-green-100
                flex
                items-center
                justify-center
                mb-4
            ">

                <span class="
                    material-symbols-outlined
                    text-green-800
                ">
                    ${escapeHtml(
                        scheme.icon ||
                        "account_balance"
                    )}
                </span>

            </div>


            <!-- TITLE -->

            <h3 class="
                text-lg
                font-bold
                text-green-900
            ">

                ${escapeHtml(
                    scheme.name
                )}

            </h3>


            <!-- LOCATION -->

            <div class="
                flex
                items-center
                gap-2
                text-sm
                text-stone-500
                mt-2
            ">

                <span class="
                    material-symbols-outlined
                    text-base
                ">
                    location_on
                </span>


                ${
                    scheme.state === "all"
                        ? "Central Government"
                        : escapeHtml(
                            scheme.state
                          )
                }

            </div>


            <!-- BENEFIT -->

            <div class="mt-4">

                <p class="
                    text-xs
                    font-semibold
                    text-stone-500
                    uppercase
                ">
                    Benefit
                </p>


                <p class="
                    text-sm
                    text-stone-700
                    mt-1
                ">

                    ${escapeHtml(
                        scheme.benefit
                    )}

                </p>

            </div>


            <!-- BUTTON -->

            <button
                type="button"
                onclick="viewSchemeDetails('${escapeHtml(scheme.id)}')"
                class="
                    w-full
                    mt-5
                    py-3
                    rounded-xl
                    bg-[#2d5a27]
                    text-white
                    font-semibold
                    hover:bg-[#23481f]
                    transition
                "
            >

                View Details

            </button>

        </div>

    `;

}



// ==========================================
// 8. FILTER SETUP
// ==========================================

function setupSubsidyFilters() {

    const searchInput =
        document.getElementById(
            "subsidy-search"
        );


    const cropSelect =
        document.getElementById(
            "subsidy-crop"
        );


    const requirementSelect =
        document.getElementById(
            "subsidy-requirement"
        );


    const categorySelect =
        document.getElementById(
            "farmer-category"
        );


    const findButton =
        document.getElementById(
            "find-schemes-btn"
        );


    // --------------------------------------
    // Search
    // --------------------------------------

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                runSchemeSearch();

            }
        );

    }


    // --------------------------------------
    // Crop
    // --------------------------------------

    if (cropSelect) {

        cropSelect.addEventListener(
            "change",
            function () {

                runSchemeSearch();

            }
        );

    }


    // --------------------------------------
    // Requirement
    // --------------------------------------

    if (requirementSelect) {

        requirementSelect.addEventListener(
            "change",
            function () {

                runSchemeSearch();

            }
        );

    }


    // --------------------------------------
    // Farmer category
    // --------------------------------------

    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            function () {

                runSchemeSearch();

            }
        );

    }


    // --------------------------------------
    // Find button
    // --------------------------------------

    if (findButton) {

        findButton.addEventListener(
            "click",
            function () {

                runSchemeSearch();

            }
        );

    }

}



// ==========================================
// 9. SEARCH & FILTER SCHEMES
// ==========================================

function runSchemeSearch() {

    const stateSelect =
        document.getElementById(
            "subsidy-state"
        );


    const searchInput =
        document.getElementById(
            "subsidy-search"
        );


    const cropSelect =
        document.getElementById(
            "subsidy-crop"
        );


    const requirementSelect =
        document.getElementById(
            "subsidy-requirement"
        );


    const categorySelect =
        document.getElementById(
            "farmer-category"
        );


    if (!stateSelect) {

        return;

    }


    const state =
        stateSelect.value;


    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const crop =
        cropSelect
            ? cropSelect.value
            : "";


    const requirement =
        requirementSelect
            ? requirementSelect.value
            : "";


    const category =
        categorySelect
            ? categorySelect.value
            : "";


    // --------------------------------------
    // Start with state schemes
    // --------------------------------------

    let schemes =
        getSchemesByState(state);


    // --------------------------------------
    // Search
    // --------------------------------------

    if (search) {

        schemes =
            schemes.filter(
                (scheme) => {

                    const searchableText = (

                        scheme.name +
                        " " +
                        scheme.benefit +
                        " " +
                        scheme.description +
                        " " +
                        scheme.category

                    ).toLowerCase();


                    return searchableText
                        .includes(search);

                }
            );

    }


    // --------------------------------------
    // Crop
    // --------------------------------------

    if (crop) {

        schemes =
            schemes.filter(
                (scheme) => {

                    return (
                        scheme.crop === "all" ||
                        scheme.crop === crop
                    );

                }
            );

    }


    // --------------------------------------
    // Requirement
    // --------------------------------------

    if (requirement) {

        schemes =
            schemes.filter(
                (scheme) => {

                    return (
                        scheme.category ===
                            requirement
                    );

                }
            );

    }


    // --------------------------------------
    // Farmer Category
    // --------------------------------------
    // Current demo records don't have
    // farmerCategories, so don't exclude them.
    // We'll add proper eligibility data later.
    // --------------------------------------

    if (category) {

        schemes =
            schemes.filter(
                (scheme) => {

                    if (
                        !scheme.farmerCategories
                    ) {

                        return true;

                    }


                    return scheme
                        .farmerCategories
                        .includes(category);

                }
            );

    }


    displayFilteredSchemes(
        state,
        schemes
    );

}



// ==========================================
// 10. DISPLAY FILTERED SCHEMES
// ==========================================

function displayFilteredSchemes(
    state,
    schemes
) {

    const results =
        document.getElementById(
            "scheme-results"
        );


    if (!results) {

        return;

    }


    // --------------------------------------
    // No state
    // --------------------------------------

    if (!state) {

        results.innerHTML = `

            <div class="
                bg-white
                border
                border-stone-200
                rounded-2xl
                p-8
                text-center
            ">

                <span class="
                    material-symbols-outlined
                    text-5xl
                    text-green-700
                ">
                    location_on
                </span>


                <h3 class="
                    text-xl
                    font-bold
                    text-stone-800
                    mt-4
                ">
                    Select Your State
                </h3>


                <p class="
                    text-sm
                    text-stone-500
                    mt-2
                ">
                    Select a state to find relevant schemes.
                </p>

            </div>

        `;

        return;

    }


    // --------------------------------------
    // No results
    // --------------------------------------

    if (!schemes.length) {

        results.innerHTML = `

            <div class="
                bg-white
                border
                border-stone-200
                rounded-2xl
                p-8
                text-center
            ">

                <span class="
                    material-symbols-outlined
                    text-5xl
                    text-stone-400
                ">
                    search_off
                </span>


                <h3 class="
                    text-xl
                    font-bold
                    text-stone-800
                    mt-4
                ">
                    No Matching Schemes
                </h3>


                <p class="
                    text-sm
                    text-stone-500
                    mt-2
                ">
                    Try changing your search or filter selections.
                </p>

            </div>

        `;

        return;

    }


    // --------------------------------------
    // Render results
    // --------------------------------------

    results.innerHTML = `

        <div class="mb-6">

            <h2 class="
                text-2xl
                font-bold
                text-green-900
            ">

                Recommended Schemes

            </h2>


            <p class="
                text-sm
                text-stone-500
                mt-1
            ">

                ${schemes.length}
                matching scheme${schemes.length !== 1 ? "s" : ""}
                for ${escapeHtml(state)}

            </p>

        </div>


        <div class="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-5
        ">

            ${schemes
                .map(
                    (scheme) =>
                        createSchemeCard(
                            scheme
                        )
                )
                .join("")}

        </div>

    `;

}



// ==========================================
// 11. SCHEME DETAILS
// ==========================================

function viewSchemeDetails(
    schemeId
) {

    const scheme =
        governmentSchemes.find(
            (item) =>
                item.id === schemeId
        );


    if (!scheme) {

        console.error(
            "❌ Scheme not found:",
            schemeId
        );

        return;

    }


    const documents =
        Array.isArray(
            scheme.documents
        )
            ? scheme.documents
            : [];


    const documentsHtml =
        documents.length
            ? documents
                .map(
                    (doc) =>
                        `
                        <li class="flex gap-2">
                            <span class="
                                material-symbols-outlined
                                text-green-700
                                text-base
                            ">
                                check_circle
                            </span>

                            ${escapeHtml(doc)}
                        </li>
                        `
                )
                .join("")
            : `
                <li>
                    Check the official portal.
                </li>
            `;


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "scheme-details-modal";


    modal.className = `
        fixed
        inset-0
        z-[100]
        bg-black/50
        flex
        items-center
        justify-center
        p-4
    `;


    modal.innerHTML = `

        <div class="
            bg-white
            rounded-2xl
            max-w-2xl
            w-full
            max-h-[90vh]
            overflow-y-auto
            shadow-xl
        ">


            <!-- HEADER -->

            <div class="
                p-6
                border-b
                border-stone-200
                flex
                items-start
                justify-between
                gap-4
            ">

                <div>

                    <div class="
                        w-12
                        h-12
                        rounded-xl
                        bg-green-100
                        flex
                        items-center
                        justify-center
                        mb-3
                    ">

                        <span class="
                            material-symbols-outlined
                            text-green-800
                        ">
                            ${escapeHtml(
                                scheme.icon ||
                                "account_balance"
                            )}
                        </span>

                    </div>


                    <h2 class="
                        text-2xl
                        font-bold
                        text-green-900
                    ">

                        ${escapeHtml(
                            scheme.name
                        )}

                    </h2>


                    <p class="
                        text-sm
                        text-stone-500
                        mt-1
                    ">

                        ${
                            scheme.state === "all"
                                ? "Central Government"
                                : escapeHtml(
                                    scheme.state
                                  )
                        }

                    </p>

                </div>


                <button
                    type="button"
                    onclick="closeSchemeDetails()"
                    class="
                        w-10
                        h-10
                        rounded-full
                        bg-stone-100
                        flex
                        items-center
                        justify-center
                        hover:bg-stone-200
                    "
                >

                    <span class="
                        material-symbols-outlined
                    ">
                        close
                    </span>

                </button>

            </div>


            <!-- BODY -->

            <div class="p-6 space-y-6">


                <!-- BENEFIT -->

                <div>

                    <h3 class="
                        font-bold
                        text-green-900
                        mb-2
                    ">
                        Benefit
                    </h3>


                    <p class="
                        text-sm
                        text-stone-700
                    ">

                        ${escapeHtml(
                            scheme.benefit
                        )}

                    </p>

                </div>


                <!-- DESCRIPTION -->

                <div>

                    <h3 class="
                        font-bold
                        text-green-900
                        mb-2
                    ">
                        About the Scheme
                    </h3>


                    <p class="
                        text-sm
                        text-stone-700
                        leading-6
                    ">

                        ${escapeHtml(
                            scheme.description
                        )}

                    </p>

                </div>


                <!-- ELIGIBILITY -->

                <div>

                    <h3 class="
                        font-bold
                        text-green-900
                        mb-2
                    ">
                        Eligibility
                    </h3>


                    <p class="
                        text-sm
                        text-stone-700
                        leading-6
                    ">

                        ${escapeHtml(
                            scheme.eligibility
                        )}

                    </p>

                </div>


                <!-- DOCUMENTS -->

                <div>

                    <h3 class="
                        font-bold
                        text-green-900
                        mb-2
                    ">
                        Documents
                    </h3>


                    <ul class="
                        space-y-2
                        text-sm
                        text-stone-700
                    ">

                        ${documentsHtml}

                    </ul>

                </div>


                <!-- LAST VERIFIED -->

                <div class="
                    p-4
                    rounded-xl
                    bg-amber-50
                    border
                    border-amber-200
                ">

                    <div class="
                        flex
                        gap-2
                    ">

                        <span class="
                            material-symbols-outlined
                            text-amber-700
                        ">
                            verified
                        </span>


                        <div>

                            <p class="
                                text-sm
                                font-semibold
                                text-amber-900
                            ">
                                Last Verified
                            </p>


                            <p class="
                                text-xs
                                text-amber-800
                                mt-1
                            ">

                                ${escapeHtml(
                                    scheme.lastVerified
                                )}

                            </p>

                        </div>

                    </div>

                </div>


                <!-- OFFICIAL PORTAL -->

                <a
                    href="${escapeHtml(
                        scheme.officialPortal
                    )}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="
                        w-full
                        py-3
                        rounded-xl
                        bg-[#2d5a27]
                        text-white
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-[#23481f]
                        transition
                    "
                >

                    <span class="
                        material-symbols-outlined
                    ">
                        open_in_new
                    </span>

                    Open Official Portal

                </a>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    // Close when clicking outside
    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeSchemeDetails();

            }

        }
    );

}



// ==========================================
// 12. CLOSE DETAILS
// ==========================================

function closeSchemeDetails() {

    const modal =
        document.getElementById(
            "scheme-details-modal"
        );


    if (modal) {

        modal.remove();

    }

}



// ==========================================
// 13. ESCAPE HTML
// ==========================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


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



// ==========================================
// 14. SCRIPT LOADED
// ==========================================

console.log(
    "📦 subsidies.js loaded"
);