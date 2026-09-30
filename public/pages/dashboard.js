// ==========================================
// WEATHER CONDITION
// ==========================================

// ==========================================
// WEATHER CONDITION - MULTILINGUAL
// ==========================================

function getWeatherCondition(code, lang = "en") {

    const t = translations[lang] || translations.en;

    if (code === 0)
        return {
            text: t.clearSky || "Clear Sky",
            icon: "wb_sunny",
            color: "text-[#ffa536]"
        };

    if (code === 1 || code === 2)
        return {
            text: t.partlyCloudy || "Partly Cloudy",
            icon: "partly_cloudy_day",
            color: "text-stone-500"
        };

    if (code === 3)
        return {
            text: t.overcast || "Overcast",
            icon: "cloud",
            color: "text-stone-500"
        };

    if ([45, 48].includes(code))
        return {
            text: t.foggy || "Foggy",
            icon: "foggy",
            color: "text-stone-400"
        };

    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
        return {
            text: t.rainy || "Rainy",
            icon: "rainy",
            color: "text-blue-500"
        };

    if ([71, 73, 75, 85, 86].includes(code))
        return {
            text: t.snowy || "Snowy",
            icon: "ac_unit",
            color: "text-blue-200"
        };

    if ([95, 96, 99].includes(code))
        return {
            text: t.thunderstorm || "Thunderstorm",
            icon: "thunderstorm",
            color: "text-blue-700"
        };

    return {
        text: t.mostlySunny || "Mostly Sunny",
        icon: "light_mode",
        color: "text-[#ffa536]"
    };
}

// ==========================================
// FETCH LIVE WEATHER
// ==========================================

// ==========================================
// 🌦 FETCH LIVE WEATHER
// 7 DAYS + HOURLY WEATHER
// ==========================================

async function fetchLiveWeather(district, state, village) {

    const tempEl =
        document.getElementById("weather-temp");

    const descEl =
        document.getElementById("weather-desc");

    const iconEl =
        document.getElementById("weather-icon");

    const humidityEl =
        document.getElementById("weather-humidity");

    const windEl =
        document.getElementById("weather-wind");

    const forecastEl =
        document.getElementById("weather-forecast-list");


    function setWeatherError(message) {

        if (tempEl)
            tempEl.textContent = "--°C";

        if (descEl)
            descEl.textContent =
                message || "Unavailable";

        if (forecastEl) {

            forecastEl.innerHTML = `
                <div class="w-full text-center py-6 text-sm text-stone-400">
                    ${message || "Forecast unavailable"}
                </div>
            `;

        }

    }


    try {

        // ==========================================
        // 1. FIND LOCATION
        // ==========================================

        const queriesToTry = [
            district,
            village,
            state,
            "New Delhi"
        ].filter(Boolean);


        let latitude = null;
        let longitude = null;


        for (const query of queriesToTry) {

            try {

                const cleanQuery =
                    query
                        .replace(
                            /East|West|North|South/gi,
                            ""
                        )
                        .trim() || query;


                const geoRes =
                    await fetch(
                        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=1&language=en&format=json`
                    );


                const geoData =
                    await geoRes.json();


                if (
                    geoData.results &&
                    geoData.results.length > 0
                ) {

                    latitude =
                        geoData.results[0].latitude;

                    longitude =
                        geoData.results[0].longitude;

                    break;

                }

            } catch (error) {

                console.warn(
                    "Geocoding failed:",
                    query
                );

            }

        }


        // ==========================================
        // DEFAULT INDIA LOCATION
        // ==========================================

        if (
            latitude === null ||
            longitude === null
        ) {

            latitude = 20.5937;
            longitude = 78.9629;

        }


        // ==========================================
        // 2. OPEN-METEO REQUEST
        // ==========================================

        const weatherUrl =
            new URL(
                "https://api.open-meteo.com/v1/forecast"
            );


        weatherUrl.searchParams.set(
            "latitude",
            latitude
        );


        weatherUrl.searchParams.set(
            "longitude",
            longitude
        );


        weatherUrl.searchParams.set(
            "timezone",
            "auto"
        );


        weatherUrl.searchParams.set(
            "forecast_days",
            "7"
        );


        // CURRENT

        weatherUrl.searchParams.set(
            "current",
            [
                "temperature_2m",
                "relative_humidity_2m",
                "weather_code",
                "wind_speed_10m",
                "precipitation"
            ].join(",")
        );


        // DAILY - 7 DAYS

        weatherUrl.searchParams.set(
            "daily",
            [
                "weather_code",
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_probability_max",
                "precipitation_sum"
            ].join(",")
        );


        // HOURLY

        weatherUrl.searchParams.set(
            "hourly",
            [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation_probability",
                "precipitation",
                "weather_code",
                "wind_speed_10m"
            ].join(",")
        );


        const weatherRes =
            await fetch(
                weatherUrl.toString()
            );


        if (!weatherRes.ok) {

            throw new Error(
                "Weather API request failed"
            );

        }


        const weatherData =
            await weatherRes.json();


        if (!weatherData.current) {

            setWeatherError(
                "Weather data unavailable"
            );

            return;

        }


        // ==========================================
        // SAVE WEATHER DATA
        // ==========================================

        window.krishiWeatherData =
            weatherData;

        window.selectedWeatherDay =
            0;


        // ==========================================
        // 3. CURRENT WEATHER
        // ==========================================

        const current =
            weatherData.current;


        const activeLanguage =
            typeof currentLanguage !== "undefined"
                ? currentLanguage
                : localStorage.getItem(
                    "selectedLanguage"
                ) || "en";


        const condition =
            getWeatherCondition(
                current.weather_code,
                activeLanguage
            );


        // Temperature

        if (tempEl) {

            tempEl.textContent =
                `${Math.round(
                    current.temperature_2m
                )}°C`;

        }


        // Description

        if (descEl) {

            descEl.textContent =
                condition.text;

        }


        // Icon

        if (iconEl) {

            iconEl.textContent =
                condition.icon;

            iconEl.className =
                `material-symbols-outlined text-6xl ${condition.color}`;

            iconEl.style.fontVariationSettings =
                "'FILL' 1";

        }


        // Humidity

        if (humidityEl) {

            humidityEl.textContent =
                `${current.relative_humidity_2m}%`;

        }


        // Wind

        if (windEl) {

            windEl.textContent =
                `${Math.round(
                    current.wind_speed_10m
                )} km/h`;

        }


        // ==========================================
        // 4. UPCOMING 6 HOURS
        // ==========================================

        renderNext6Hours(weatherData);


    } catch (error) {

        console.error(
            "Failed to fetch weather:",
            error
        );


        setWeatherError(
            "Connection error"
        );

    }

}

// ==========================================
// 🕐 UPCOMING 6 HOURS
// ==========================================

function renderNext6Hours(weatherData) {

    const container =
        document.getElementById(
            "weather-forecast-list"
        );


    if (
        !container ||
        !weatherData ||
        !weatherData.hourly
    ) {

        return;

    }


    const hourly =
        weatherData.hourly;


    const currentTime =
        weatherData.current.time;


    let startIndex =
        hourly.time.indexOf(
            currentTime
        );


    if (startIndex < 0) {

        startIndex = 0;

    }


    const activeLanguage =
        typeof currentLanguage !== "undefined"
            ? currentLanguage
            : localStorage.getItem(
                "selectedLanguage"
            ) || "en";


    let html = "";


    for (
        let i = startIndex;
        i < startIndex + 6 &&
        i < hourly.time.length;
        i++
    ) {

        const condition =
            getWeatherCondition(
                hourly.weather_code[i],
                activeLanguage
            );


        html += `

            <div
                class="
                    min-w-[95px]
                    md:min-w-[105px]
                    shrink-0
                    bg-white
                    border
                    border-stone-100
                    rounded-xl
                    p-3
                    text-center
                "
            >

                <div
                    class="
                        text-xs
                        font-bold
                        text-stone-500
                    "
                >
                    ${formatWeatherHour(
                        hourly.time[i]
                    )}
                </div>


                <span
                    class="
                        material-symbols-outlined
                        text-3xl
                        ${condition.color}
                        my-2
                    "
                    style="
                        font-variation-settings:
                        'FILL' 1;
                    "
                >
                    ${condition.icon}
                </span>


                <div
                    class="
                        text-lg
                        font-bold
                        text-green-900
                    "
                >
                    ${Math.round(
                        hourly.temperature_2m[i]
                    )}°C
                </div>


                <div
                    class="
                        text-[11px]
                        text-blue-600
                        mt-1
                    "
                >
                    💧
                    ${hourly.precipitation_probability[i] ?? 0}%
                </div>


                <div
                    class="
                        text-[11px]
                        text-stone-500
                        mt-1
                    "
                >
                    💨
                    ${Math.round(
                        hourly.wind_speed_10m[i]
                    )} km/h
                </div>

            </div>

        `;

    }


    container.innerHTML = html;

}

// ==========================================
// 🌦 WEATHER DETAILS DROPDOWN
// ==========================================

function toggleWeatherDetails() {

    const dropdown =
        document.getElementById(
            "weather-details-dropdown"
        );

    const icon =
        document.getElementById(
            "weather-see-more-icon"
        );

    const text =
        document.getElementById(
            "weather-see-more-text"
        );


    if (!dropdown) return;


    const isClosed =
        dropdown.classList.contains(
            "hidden"
        );


    if (isClosed) {

        dropdown.classList.remove(
            "hidden"
        );


        if (icon) {

            icon.textContent =
                "expand_less";

        }


        if (text) {

            text.textContent =
                "See Less";

        }


        updateWeatherDetails();


    } else {

        dropdown.classList.add(
            "hidden"
        );


        if (icon) {

            icon.textContent =
                "expand_more";

        }


        if (text) {

            text.textContent =
                "See More";

        }

    }

}

// ==========================================
// 📅 7 DAY FORECAST
// ==========================================

function renderDetailedSevenDayForecast() {

    const container =
        document.getElementById(
            "weather-details-7-days"
        );


    const weatherData =
        window.krishiWeatherData;


    if (
        !container ||
        !weatherData ||
        !weatherData.daily
    ) {

        return;

    }


    const daily =
        weatherData.daily;


    const activeLanguage =
        typeof currentLanguage !== "undefined"
            ? currentLanguage
            : localStorage.getItem(
                "selectedLanguage"
            ) || "en";


    const dayNames = {

        en: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],

        hi: [
            "रवि",
            "सोम",
            "मंगल",
            "बुध",
            "गुरु",
            "शुक्र",
            "शनि"
        ]

    };


    const days =
        dayNames[activeLanguage] ||
        dayNames.en;


    let html = "";


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        if (!daily.time[i])
            break;


        const date =
            new Date(
                `${daily.time[i]}T12:00:00`
            );


        const dayName =
            i === 0
                ? "Today"
                : days[date.getDay()];


        const condition =
            getWeatherCondition(
                daily.weather_code[i],
                activeLanguage
            );


        const selected =
            i === (
                window.selectedWeatherDay || 0
            );


        html += `

            <button
                type="button"
                onclick="selectWeatherDay(${i})"
                class="
                    min-w-[100px]
                    shrink-0
                    rounded-2xl
                    border
                    p-3
                    text-center
                    transition
                    ${
                        selected
                            ? "border-green-600 bg-green-50"
                            : "border-stone-100 bg-white"
                    }
                "
            >

                <div
                    class="
                        text-xs
                        font-bold
                        ${
                            selected
                                ? "text-green-800"
                                : "text-stone-400"
                        }
                    "
                >
                    ${dayName}
                </div>


                <span
                    class="
                        material-symbols-outlined
                        text-3xl
                        ${condition.color}
                        my-2
                    "
                    style="
                        font-variation-settings:
                        'FILL' 1;
                    "
                >
                    ${condition.icon}
                </span>


                <div
                    class="
                        text-lg
                        font-bold
                        text-stone-800
                    "
                >
                    ${Math.round(
                        daily.temperature_2m_max[i]
                    )}°
                </div>


                <div
                    class="
                        text-xs
                        text-stone-400
                    "
                >
                    ${Math.round(
                        daily.temperature_2m_min[i]
                    )}°
                </div>


                <div
                    class="
                        text-[11px]
                        text-blue-600
                        mt-2
                    "
                >
                    💧
                    ${daily.precipitation_probability_max[i] ?? 0}%
                </div>

            </button>

        `;

    }


    container.innerHTML =
        html;

}

// ==========================================
// 📅 SELECT WEATHER DAY
// ==========================================

function selectWeatherDay(index) {

    window.selectedWeatherDay =
        index;


    renderDetailedSevenDayForecast();

    renderDetailedHourlyForecast();

    renderFarmingWeatherAdvice();

}

// ==========================================
// 🕐 FULL HOURLY FORECAST
// ==========================================

function renderDetailedHourlyForecast() {

    const container =
        document.getElementById(
            "weather-details-hourly"
        );


    const title =
        document.getElementById(
            "weather-hourly-title"
        );


    const weatherData =
        window.krishiWeatherData;


    if (
        !container ||
        !weatherData ||
        !weatherData.hourly
    ) {

        return;

    }


    const daily =
        weatherData.daily;

    const hourly =
        weatherData.hourly;


    const dayIndex =
        window.selectedWeatherDay || 0;


    const selectedDate =
        daily.time[dayIndex];


    if (!selectedDate) return;


    if (title) {

        title.textContent =
            dayIndex === 0
                ? "Today's Hourly Forecast"
                : `${selectedDate} — Hourly Forecast`;

    }


    const activeLanguage =
        typeof currentLanguage !== "undefined"
            ? currentLanguage
            : localStorage.getItem(
                "selectedLanguage"
            ) || "en";


    let html = "";


    for (
        let i = 0;
        i < hourly.time.length;
        i++
    ) {

        if (
            !hourly.time[i].startsWith(
                selectedDate
            )
        ) {

            continue;

        }


        const condition =
            getWeatherCondition(
                hourly.weather_code[i],
                activeLanguage
            );


        html += `

            <div
                class="
                    min-w-[105px]
                    shrink-0
                    bg-white
                    border
                    border-stone-100
                    rounded-xl
                    p-3
                    text-center
                "
            >

                <div
                    class="
                        text-xs
                        font-bold
                        text-stone-500
                    "
                >
                    ${formatWeatherHour(
                        hourly.time[i]
                    )}
                </div>


                <span
                    class="
                        material-symbols-outlined
                        text-3xl
                        ${condition.color}
                        my-2
                    "
                    style="
                        font-variation-settings:
                        'FILL' 1;
                    "
                >
                    ${condition.icon}
                </span>


                <div
                    class="
                        text-lg
                        font-bold
                        text-green-900
                    "
                >
                    ${Math.round(
                        hourly.temperature_2m[i]
                    )}°C
                </div>


                <div
                    class="
                        text-[11px]
                        text-blue-600
                        mt-1
                    "
                >
                    💧
                    ${hourly.precipitation_probability[i] ?? 0}%
                </div>


                <div
                    class="
                        text-[11px]
                        text-stone-500
                        mt-1
                    "
                >
                    🌧
                    ${Number(
                        hourly.precipitation[i] || 0
                    ).toFixed(1)} mm
                </div>


                <div
                    class="
                        text-[11px]
                        text-stone-500
                        mt-1
                    "
                >
                    💨
                    ${Math.round(
                        hourly.wind_speed_10m[i] || 0
                    )} km/h
                </div>


                <div
                    class="
                        text-[11px]
                        text-stone-500
                        mt-1
                    "
                >
                    💦
                    ${hourly.relative_humidity_2m[i] ?? 0}%
                </div>

            </div>

        `;

    }


    container.innerHTML =
        html ||
        `
            <div class="text-sm text-stone-400 p-4">
                Hourly forecast unavailable.
            </div>
        `;

}

// ==========================================
// 🌾 FARMING WEATHER ADVISORY
// ==========================================

function renderFarmingWeatherAdvice() {

    const container =
        document.getElementById(
            "weather-farming-advice"
        );


    const weatherData =
        window.krishiWeatherData;


    if (
        !container ||
        !weatherData ||
        !weatherData.daily
    ) {

        return;

    }


    const daily =
        weatherData.daily;


    const index =
        window.selectedWeatherDay || 0;


    const rainProbability =
        daily.precipitation_probability_max[
            index
        ] || 0;


    const rainfall =
        daily.precipitation_sum[
            index
        ] || 0;


    if (rainProbability >= 80) {

        container.textContent =
            "🌧️ High chance of rain. Avoid unnecessary irrigation and consider postponing pesticide spraying.";


    } else if (rainProbability >= 50) {

        container.textContent =
            "🌦️ Moderate chance of rain. Monitor field conditions and avoid excessive irrigation.";


    } else if (rainfall === 0) {

        container.textContent =
            "☀️ Dry conditions expected. Check soil moisture and irrigate according to crop requirements.";


    } else {

        container.textContent =
            "🌱 Weather conditions are moderate. Continue regular crop monitoring.";

    }

}

// ==========================================
// 🌦 UPDATE DETAILED WEATHER
// ==========================================

function updateWeatherDetails() {

    if (!window.krishiWeatherData)
        return;


    renderDetailedSevenDayForecast();

    renderDetailedHourlyForecast();

    renderFarmingWeatherAdvice();

}

// ==========================================
// 🕐 FORMAT WEATHER HOUR
// ==========================================

function formatWeatherHour(timeString) {

    const date =
        new Date(timeString);


    return date.toLocaleTimeString(
        "en-IN",
        {
            hour: "numeric",
            hour12: true
        }
    );

}


// ==========================================
// DASHBOARD RENDER
// ==========================================

function renderDashboard() {

    const el = document.getElementById("page-dashboard");

    if (!el) {
        console.error("Dashboard element not found!");
        return;
    }

    // Current language
    const activeLanguage =
        localStorage.getItem("selectedLanguage") || "en";

    const t =
        translations[activeLanguage] ||
        translations.en;

    // ==========================================
    // SAVED LOCATION
    // ==========================================

    const savedVillage =
        localStorage.getItem("village");

    const savedDistrict =
        localStorage.getItem("district");

    const savedState =
        localStorage.getItem("state");

    let userAddress =
        t.locationNotSet || "Location not set";

    if (
        savedVillage &&
        savedDistrict &&
        savedState
    ) {

        userAddress =
            `${savedVillage}, ${savedDistrict}, ${savedState}`;

    } else if (
        savedDistrict &&
        savedState
    ) {

        userAddress =
            `${savedDistrict}, ${savedState}`;

    } else if (savedState) {

        userAddress = savedState;
    }

    // ==========================================
    // DASHBOARD HTML
    // ==========================================

    el.innerHTML = `

        <!-- HEADER -->
        <div class="mb-8">

            <h2 class="font-[Lexend] text-2xl font-medium text-[#191c1c] mb-1">
                ${t.fieldOverview || "Field Overview"}
            </h2>

            <p class="text-[#42493e]">
                ${t.lastUpdated || "Last updated"}
                ${t.today || "Today"}
                ${t.weatherForecast || "Weather Forecast"}
            </p>

        </div>


        <!-- MAIN GRID -->
         <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">


            <!-- ================================== -->
            <!-- 🌦 FINAL WEATHER DASHBOARD (LEFT COLUMN) -->
            <!-- ================================== -->

        <section
            class="
                md:col-span-12
                lg:col-span-8
                bg-white
                rounded-2xl
                p-5
                border
                border-stone-100
                shadow-sm
                h-fit
            "
        >

                <!-- HEADER -->

                <div
                    class="
                        flex
                        flex-col
                        md:flex-row
                        justify-between
                        items-start
                        md:items-center
                        mb-6
                        gap-4
                    "
                >

                    <div>

                        <h3
                            class="
                                font-[Lexend]
                                text-xl
                                font-medium
                                text-green-900
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <span
                                class="material-symbols-outlined"
                            >
                                cloud_sync
                            </span>

                            ${t.weatherForecast || "Weather Forecast"}

                        </h3>


                        <p
                            id="dashboard-user-address"
                            class="
                                text-stone-500
                                text-sm
                                font-semibold
                            "
                        >
                            ${userAddress}
                        </p>

                    </div>


                    <!-- LIVE BADGE -->

                    <div
                        class="
                            px-3
                            py-1
                            rounded-full
                            bg-green-50
                            text-green-700
                            text-xs
                            font-bold
                        "
                    >
                        ● Live Weather
                    </div>

                </div>



                <!-- CURRENT WEATHER -->

                <div
                    class="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-4
                    "
                >

                    <!-- TEMPERATURE -->

                    <div
                        class="
                            bg-green-50/50
                            p-5
                            rounded-2xl
                            border
                            border-green-100/50
                            flex
                            items-center
                            gap-4
                        "
                    >

                        <span
                            id="weather-icon"
                            class="
                                material-symbols-outlined
                                text-6xl
                                text-[#ffa536]
                            "
                            style="
                                font-variation-settings:
                                'FILL' 1;
                            "
                        >
                            light_mode
                        </span>


                        <div>

                            <div
                                id="weather-temp"
                                class="
                                    text-4xl
                                    font-bold
                                    text-stone-900
                                "
                            >
                                --°C
                            </div>


                            <p
                                id="weather-desc"
                                class="
                                    text-stone-600
                                    font-medium
                                "
                            >
                                Loading...
                            </p>

                        </div>

                    </div>



                    <!-- HUMIDITY -->

                    <div
                        class="
                            bg-blue-50
                            p-5
                            rounded-2xl
                            border
                            border-blue-100
                        "
                    >

                        <div
                            class="
                                flex
                                items-center
                                gap-2
                                text-blue-700
                            "
                        >

                            <span
                                class="
                                    material-symbols-outlined
                                "
                            >
                                humidity_low
                            </span>

                            <span
                                class="
                                    text-sm
                                    font-medium
                                "
                            >
                                Humidity
                            </span>

                        </div>


                        <div
                            id="weather-humidity"
                            class="
                                text-2xl
                                font-bold
                                text-blue-900
                                mt-2
                            "
                        >
                            --%
                        </div>

                    </div>



                    <!-- WIND -->

                    <div
                        class="
                            bg-orange-50
                            p-5
                            rounded-2xl
                            border
                            border-orange-100
                        "
                    >

                        <div
                            class="
                                flex
                                items-center
                                gap-2
                                text-orange-700
                            "
                        >

                            <span
                                class="
                                    material-symbols-outlined
                                "
                            >
                                air
                            </span>

                            <span
                                class="
                                    text-sm
                                    font-medium
                                "
                            >
                                Wind
                            </span>

                        </div>


                        <div
                            id="weather-wind"
                            class="
                                text-2xl
                                font-bold
                                text-orange-900
                                mt-2
                            "
                        >
                            -- km/h
                        </div>

                    </div>

                </div>




                <!-- FARMING ADVISORY -->

                    <div
                        class="
                            mt-6
                            pt-5
                            border-t
                            border-stone-100
                        "
                    >

                        <div
                            class="
                                rounded-2xl
                                border-l-4
                                border-green-700
                                bg-green-50
                                p-4
                                flex
                                items-start
                                gap-3
                            "
                        >

                            <div
                                class="
                                    w-10
                                    h-10
                                    shrink-0
                                    rounded-full
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                🌾
                            </div>


                            <div>

                                <h4
                                    class="
                                        font-bold
                                        text-green-900
                                    "
                                >
                                    Farming Weather Advisory
                                </h4>


                                <p
                                    id="weather-farming-advice"
                                    class="
                                        text-sm
                                        text-stone-600
                                        mt-1
                                    "
                                >
                                    Checking weather conditions...
                                </p>

                            </div>

                        </div>

                    </div>



                <!-- UPCOMING 6 HOURS -->

                <div
                    class="
                        mt-6
                        pt-5
                        border-t
                        border-stone-100
                    "
                >

                    <div
                        class="
                            flex
                            items-center
                            justify-between
                            mb-3
                        "
                    >

                        <div>

                            <h4
                                class="
                                    text-sm
                                    font-bold
                                    text-green-900
                                "
                            >
                                Upcoming 6 Hours
                            </h4>


                            <p
                                class="
                                    text-[11px]
                                    text-stone-400
                                "
                            >
                                Temperature • Rain • Wind
                            </p>

                        </div>


                        <span
                            class="
                                material-symbols-outlined
                                text-stone-400
                            "
                        >
                            schedule
                        </span>

                    </div>


                    <div
                        id="weather-forecast-list"
                        class="
                            flex
                            gap-3
                            overflow-x-auto
                            pb-2
                        "
                    >

                        <div
                            class="
                                min-w-full
                                text-center
                                py-5
                                text-sm
                                text-stone-400
                            "
                        >
                            Loading hourly weather...
                        </div>

                    </div>

                </div>



                <!-- SEE MORE BUTTON -->

                <div class="mt-2.5">
                    <button
                        id="weather-see-more-btn"
                        onclick="toggleWeatherDetails()"
                        class="w-full py-2
                         rounded-xl border 
                         border-green-200 
                         bg-green-50
                          hover:bg-green-100
                           text-green-800
                            font-semibold text-xs transition 
                            flex items-center justify-center gap-1.5"
                    >

                        <span
                            id="weather-see-more-text"
                        >
                            See More
                        </span>


                        <span
                            id="weather-see-more-icon"
                            class="
                                material-symbols-outlined
                            "
                        >
                            expand_more
                        </span>

                    </button>

                </div>



                <!-- EXPANDABLE DETAILS -->

                <div
                    id="weather-details-dropdown"
                    class="
                        hidden
                        mt-5
                        pt-5
                        border-t
                        border-stone-100
                    "
                >

                    <!-- 7 DAYS -->

                    <div>

                        <h4
                            class="
                                font-[Lexend]
                                text-lg
                                font-semibold
                                text-green-900
                            "
                        >
                            7-Day Forecast
                        </h4>


                        <p
                            class="
                                text-xs
                                text-stone-500
                                mt-1
                                mb-4
                            "
                        >
                            Select a day to view its hourly forecast
                        </p>


                        <div
                            id="weather-details-7-days"
                            class="
                                flex
                                gap-3
                                overflow-x-auto
                                pb-2
                            "
                        >
                            Loading forecast...
                        </div>

                    </div>



                    <!-- HOURLY -->

                    <div
                        class="
                            mt-6
                            pt-5
                            border-t
                            border-stone-100
                        "
                    >

                        <h4
                            id="weather-hourly-title"
                            class="
                                font-[Lexend]
                                text-lg
                                font-semibold
                                text-green-900
                            "
                        >
                            Today's Hourly Forecast
                        </h4>


                        <p
                            class="
                                text-xs
                                text-stone-500
                                mt-1
                                mb-4
                            "
                        >
                            Full 24-hour weather forecast
                        </p>


                        <div
                            id="weather-details-hourly"
                            class="
                                flex
                                gap-3
                                overflow-x-auto
                                pb-2
                            "
                        >
                            Loading hourly forecast...
                        </div>

                    </div>



                    

                </div>

            </section>



            <!-- ================================== -->
            <!-- RIGHT SIDEBAR: MARKET & SCHEMES -->
            <!-- ================================== -->

            <div class="md:col-span-12 lg:col-span-4 space-y-6">

                <!-- 1. MARKET RATES CARD -->
                <section class="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">

                    <h3
                        class="font-[Lexend] text-xl font-medium text-green-900 mb-6 flex items-center gap-2"
                    >

                        <span class="material-symbols-outlined">
                            trending_up
                        </span>

                        ${t.topMarketRates || "Top Market Rates"}

                    </h3>


                    <div class="space-y-4">

                        <!-- WHEAT -->
                        <div
                            class="flex justify-between items-center p-3 rounded-xl border border-transparent hover:bg-stone-50 transition"
                        >

                            <div class="flex items-center gap-3">

                                <div
                                    class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold"
                                >
                                    W
                                </div>

                                <div>

                                    <p class="font-bold text-sm">
                                        Wheat
                                    </p>

                                    <p class="text-xs text-stone-500">
                                        ${t.perQuintal || "Per Quintal"}
                                    </p>

                                </div>

                            </div>


                            <div class="text-right">

                                <p class="font-bold text-sm">
                                    ₹2,125
                                </p>

                                <p class="text-xs text-green-600">
                                    ↑ +2.4%
                                </p>

                            </div>

                        </div>


                        <!-- RICE -->
                        <div
                            class="flex justify-between items-center p-3 rounded-xl border border-transparent hover:bg-stone-50 transition"
                        >

                            <div class="flex items-center gap-3">

                                <div
                                    class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold"
                                >
                                    R
                                </div>

                                <div>

                                    <p class="font-bold text-sm">
                                        Rice
                                    </p>

                                    <p class="text-xs text-stone-500">
                                        ${t.perQuintal || "Per Quintal"}
                                    </p>

                                </div>

                            </div>


                            <div class="text-right">

                                <p class="font-bold text-sm">
                                    ₹1,940
                                </p>

                                <p class="text-xs text-red-500">
                                    ↓ -0.8%
                                </p>

                            </div>

                        </div>


                        <!-- CORN -->
                        <div
                            class="flex justify-between items-center p-3 rounded-xl border border-transparent hover:bg-stone-50 transition"
                        >

                            <div class="flex items-center gap-3">

                                <div
                                    class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-800 font-bold"
                                >
                                    C
                                </div>

                                <div>

                                    <p class="font-bold text-sm">
                                        Corn
                                    </p>

                                    <p class="text-xs text-stone-500">
                                        ${t.perQuintal || "Per Quintal"}
                                    </p>

                                </div>

                            </div>


                            <div class="text-right">

                                <p class="font-bold text-sm">
                                    ₹1,850
                                </p>

                                <p class="text-xs text-green-600">
                                    ↑ +1.2%
                                </p>

                            </div>

                        </div>

                    </div>


                    <!-- VIEW ALL MARKETS -->
                    <button
                        onclick="navigateTo('market')"
                        class="w-full mt-6 py-2 text-stone-500 font-semibold text-sm hover:text-green-800 flex items-center justify-center gap-2 transition"
                    >

                        ${t.viewAllMarkets || "View All Markets"}

                        <span class="material-symbols-outlined text-sm">
                            arrow_forward
                        </span>

                    </button>

                </section>


                <!-- 2. TOP GOVERNMENT SCHEMES CARD -->
                <section class="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">

                    <div class="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">

                        <h3 class="font-[Lexend] text-lg font-medium text-green-900 flex items-center gap-2">

                            <span class="material-symbols-outlined">
                                account_balance
                            </span>

                            ${t.governmentSchemes || "Top Government Schemes"}

                        </h3>

                        <span class="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full uppercase">
                            Active
                        </span>

                    </div>


                    <div class="space-y-3">

                        <!-- PM-KISAN -->
                        <div 
                            onclick="navigateTo('subsidies')" 
                            class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition cursor-pointer group"
                        >

                            <div class="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition">
                                PMK
                            </div>

                            <div class="flex-1 min-w-0">

                                <div class="flex items-center justify-between">
                                    <h4 class="text-xs font-bold text-stone-800 group-hover:text-green-800 transition truncate">
                                        PM-KISAN Samman Nidhi
                                    </h4>
                                    <span class="text-xs font-extrabold text-stone-900 shrink-0 ml-1">
                                        ₹6,000/yr
                                    </span>
                                </div>

                                <p class="text-[11px] text-stone-500 truncate mt-0.5">
                                    Direct income support in 3 installments
                                </p>

                            </div>

                        </div>


                        <!-- PMFBY Crop Insurance -->
                        <div 
                            onclick="navigateTo('subsidies')" 
                            class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition cursor-pointer group"
                        >

                            <div class="w-10 h-10 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition">
                                PMF
                            </div>

                            <div class="flex-1 min-w-0">

                                <div class="flex items-center justify-between">
                                    <h4 class="text-xs font-bold text-stone-800 group-hover:text-green-800 transition truncate">
                                        PM Fasal Bima (PMFBY)
                                    </h4>
                                    <span class="text-xs font-bold text-blue-700 shrink-0 ml-1">
                                        Insurance
                                    </span>
                                </div>

                                <p class="text-[11px] text-stone-500 truncate mt-0.5">
                                    Complete coverage against crop loss
                                </p>

                            </div>

                        </div>


                        <!-- Kisan Credit Card (KCC) -->
                        <div 
                            onclick="navigateTo('subsidies')" 
                            class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition cursor-pointer group"
                        >

                            <div class="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition">
                                KCC
                            </div>

                            <div class="flex-1 min-w-0">

                                <div class="flex items-center justify-between">
                                    <h4 class="text-xs font-bold text-stone-800 group-hover:text-green-800 transition truncate">
                                        Kisan Credit Card
                                    </h4>
                                    <span class="text-xs font-extrabold text-stone-900 shrink-0 ml-1">
                                        4% Rate
                                    </span>
                                </div>

                                <p class="text-[11px] text-stone-500 truncate mt-0.5">
                                    Low-interest agricultural loans up to ₹3L
                                </p>

                            </div>

                        </div>

                    </div>


                    <!-- VIEW ALL SCHEMES -->
                    <button
                        onclick="navigateTo('subsidies')"
                        class="w-full mt-4 pt-3 border-t border-stone-100 text-stone-500 font-semibold text-sm hover:text-green-800 flex items-center justify-center gap-2 transition"
                    >

                        View All Schemes

                        <span class="material-symbols-outlined text-sm">
                            arrow_forward
                        </span>

                    </button>

                </section>

            </div>



            <!-- ================================== -->
            <!-- CROP HEALTH (FULL ROW ACROSS 12 COLS) -->
            <!-- ================================== -->

            <section class="md:col-span-12">

                <div
                    class="flex justify-between items-center mb-6"
                >

                    <h3
                        class="font-[Lexend] text-xl font-medium text-green-900 flex items-center gap-2"
                    >

                        <span class="material-symbols-outlined">
                            potted_plant
                        </span>

                        ${t.currentCropHealth || "Crop Health Overview"}

                    </h3>


                    <button
                        onclick="navigateTo('crop-health')"
                        class="bg-[#2d5a27] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-green-800 transition"
                    >

                        <span class="material-symbols-outlined text-sm">
                            add
                        </span>

                        ${t.addField || "Add Field"}

                    </button>

                </div>


                <div
                    class="bg-white rounded-2xl border border-stone-100 shadow-sm p-6"
                >

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        <div
                            class="bg-stone-50 p-4 rounded-xl text-center"
                        >

                            <p class="text-xs text-stone-400 uppercase font-bold">
                                ${t.growthStage || "Growth Stage"}
                            </p>

                            <p class="font-bold mt-2 text-stone-800">
                                Tillering
                            </p>

                        </div>


                        <div
                            class="bg-stone-50 p-4 rounded-xl text-center"
                        >

                            <p class="text-xs text-stone-400 uppercase font-bold">
                                ${t.soilPH || "Soil pH"}
                            </p>

                            <p class="font-bold mt-2 text-stone-800">
                                6.8
                            </p>

                        </div>


                        <div
                            class="bg-stone-50 p-4 rounded-xl text-center"
                        >

                            <p class="text-xs text-stone-400 uppercase font-bold">
                                ${t.moisture || "Moisture"}
                            </p>

                            <p class="font-bold mt-2 text-stone-800">
                                42%
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    `;


    // ==========================================
    // START LIVE WEATHER
    // ==========================================

    fetchLiveWeather(
        savedDistrict,
        savedState,
        savedVillage
    );

}