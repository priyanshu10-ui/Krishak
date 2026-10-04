
// ==========================================
// KRISHI SAHAYAK - FARM ANALYZER
// ==========================================

let farmCharts = [];

function renderFarmAnalyzer() {

    const page = document.getElementById("page-farm-analyzer");

    if (!page) return;

    // Destroy old charts before rendering again
    farmCharts.forEach(chart => chart.destroy());
    farmCharts = [];

    page.innerHTML = `

    <div class="space-y-6">

        <!-- HEADER -->
        <div class="flex flex-wrap justify-between items-center gap-4">
            <div>
                <p class="text-sm text-stone-500">Smart Farming System</p>
                <h1 class="text-3xl font-bold text-green-900">
                    Farm Analyzer
                </h1>
                <p class="text-sm text-stone-500 mt-1">
                    Monitor your farm conditions in real time
                </p>
            </div>

            <div class="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-xl text-sm font-semibold">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Demo Monitoring
            </div>
        </div>


        <!-- HEALTH STATUS -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">

            <div class="flex flex-wrap items-center gap-6">

                <div class="relative w-28 h-28 flex items-center justify-center rounded-full"
                    style="background: conic-gradient(#2d7a36 77%, #e5e7eb 0);">

                    <div class="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center">
                        <span class="text-3xl font-bold text-green-900">77</span>
                        <span class="text-xs text-stone-500">/100</span>
                    </div>
                </div>

                <div>
                    <h2 class="text-3xl font-bold text-green-800">
                        🌱 Healthy
                    </h2>
                    <p class="text-stone-500 mt-1">
                        Most readings are healthy. Minor adjustments may help.
                    </p>

                    <span class="inline-block mt-3 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        ✓ No Major Action Needed
                    </span>
                </div>

            </div>
        </div>


        <!-- SENSOR CARDS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            <div class="bg-[#8b603c] text-white rounded-2xl p-5 shadow-sm">
                <div class="flex justify-between">
                    <span class="text-sm">Soil Moisture</span>
                    <span class="material-symbols-outlined">water_drop</span>
                </div>
                <h2 class="text-3xl font-bold mt-4">83.4%</h2>
                <div class="flex justify-between text-xs mt-2 opacity-80">
                    <span>Demo Reading</span>
                    <span>↗ +2.2%</span>
                </div>
            </div>

            <div class="bg-[#c69a6b] text-white rounded-2xl p-5 shadow-sm">
                <div class="flex justify-between">
                    <span class="text-sm">Temperature</span>
                    <span class="material-symbols-outlined">device_thermostat</span>
                </div>
                <h2 class="text-3xl font-bold mt-4">33.0°C</h2>
                <div class="flex justify-between text-xs mt-2 opacity-80">
                    <span>Demo Reading</span>
                    <span>Stable</span>
                </div>
            </div>

            <div class="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
                <div class="flex justify-between">
                    <span class="text-sm text-stone-500">Humidity</span>
                    <span class="material-symbols-outlined text-stone-500">humidity_percentage</span>
                </div>
                <h2 class="text-3xl font-bold mt-4 text-stone-800">32.8%</h2>
                <div class="flex justify-between text-xs mt-2 text-stone-400">
                    <span>Demo Reading</span>
                    <span>↘ -3.6%</span>
                </div>
            </div>

            <div class="bg-[#e5b66e] text-white rounded-2xl p-5 shadow-sm">
                <div class="flex justify-between">
                    <span class="text-sm">Air Quality</span>
                    <span class="material-symbols-outlined">air</span>
                </div>
                <h2 class="text-3xl font-bold mt-4">168.0</h2>
                <div class="flex justify-between text-xs mt-2 opacity-80">
                    <span>Demo AQI</span>
                    <span>↗ +6.1</span>
                </div>
            </div>

        </div>


        <!-- CHARTS ROW -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

            <!-- HEALTH BREAKDOWN -->
            <div class="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">

                <h3 class="font-bold text-stone-800 mb-4">
                    Health Breakdown
                </h3>

                <div class="h-64 flex items-center justify-center">
                    <canvas id="farmHealthChart"></canvas>
                </div>

            </div>


            <!-- SENSOR OPTIMALITY -->
            <div class="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">

                <h3 class="font-bold text-stone-800 mb-4">
                    Sensor Optimality
                </h3>

                <div class="h-64">
                    <canvas id="sensorChart"></canvas>
                </div>

            </div>

        </div>


        <!-- SOIL MOISTURE HISTORY -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">

            <h3 class="font-bold text-stone-800 mb-2">
                Soil Moisture — Last 24 Hours
            </h3>

            <p class="text-xs text-stone-400 mb-4">
                Historical demo readings
            </p>

            <div class="h-64">
                <canvas id="soilChart"></canvas>
            </div>

        </div>


        <!-- TEMPERATURE & HUMIDITY -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">

            <h3 class="font-bold text-stone-800 mb-2">
                Temperature & Humidity — Last 24 Hours
            </h3>

            <p class="text-xs text-stone-400 mb-4">
                Historical demo readings
            </p>

            <div class="h-72">
                <canvas id="farmHistoryChart"></canvas>
            </div>

        </div>


        <!-- BOTTOM STATUS -->
        <div class="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-wrap justify-between items-center gap-3">

            <div>
                <h3 class="font-bold text-green-900">
                    Farm Monitoring Status
                </h3>
                <p class="text-sm text-green-700 mt-1">
                    This dashboard currently displays simulated sensor readings.
                </p>
            </div>

            <span class="text-xs font-bold bg-green-200 text-green-900 px-4 py-2 rounded-full">
                DEMO MODE
            </span>

        </div>

    </div>
    `;


    // ==========================================
    // CHART CONFIGURATION
    // ==========================================

    if (typeof Chart === "undefined") {
        console.error("Chart.js is not loaded!");
        return;
    }

    Chart.defaults.font.family = "Public Sans";
    Chart.defaults.color = "#78716c";


    // HEALTH DOUGHNUT
    farmCharts.push(new Chart(
        document.getElementById("farmHealthChart"),
        {
            type: "doughnut",
            data: {
                labels: ["Healthy", "Needs Attention"],
                datasets: [{
                    data: [77, 23],
                    backgroundColor: ["#8b603c", "#e8c99e"],
                    borderWidth: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutout: "72%",
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        }
    ));


    // SENSOR OPTIMALITY
    farmCharts.push(new Chart(
        document.getElementById("sensorChart"),
        {
            type: "bar",
            data: {
                labels: ["Moisture", "Temperature", "Humidity", "Air"],
                datasets: [{
                    label: "Optimality",
                    data: [55, 100, 78, 100],
                    backgroundColor: ["#d6a15c", "#55a96a", "#d6a15c", "#55a96a"],
                    borderRadius: 8,
                    barThickness: 12
                }]
            },
            options: {
                indexAxis: "y",
                maintainAspectRatio: false,
                scales: {
                    x: {
                        min: 0,
                        max: 100,
                        grid: { display: false }
                    },
                    y: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        }
    ));


    // TIME LABELS
    const labels = [
        "6 AM", "8 AM", "10 AM", "12 PM",
        "2 PM", "4 PM", "6 PM", "8 PM",
        "10 PM", "12 AM", "2 AM", "4 AM"
    ];


    // SOIL MOISTURE HISTORY
    farmCharts.push(new Chart(
        document.getElementById("soilChart"),
        {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: "Soil Moisture (%)",
                    data: [35, 38, 31, 33, 30, 34, 32, 29, 28, 15, 14, 83],
                    borderColor: "#8b603c",
                    backgroundColor: "rgba(139,96,60,0.18)",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100
                    }
                }
            }
        }
    ));


    // TEMPERATURE & HUMIDITY HISTORY
    farmCharts.push(new Chart(
        document.getElementById("farmHistoryChart"),
        {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Humidity (%)",
                        data: [45, 44, 46, 47, 48, 49, 51, 48, 50, 47, 35, 33],
                        borderColor: "#55a96a",
                        backgroundColor: "rgba(85,169,106,0.25)",
                        fill: true,
                        tension: 0.4,
                        pointRadius: 2
                    },
                    {
                        label: "Temperature (°C)",
                        data: [31, 31, 32, 32, 33, 33, 32, 34, 33, 34, 33, 32],
                        borderColor: "#a88a68",
                        backgroundColor: "rgba(168,138,104,0.15)",
                        fill: true,
                        tension: 0.4,
                        pointRadius: 2
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: "index"
                },
                scales: {
                    y: {
                        min: 0,
                        max: 60
                    }
                }
            }
        }
    ));

}