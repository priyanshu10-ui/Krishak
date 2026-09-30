function updateUserUI(user) {

    const userMenu = document.getElementById("user-menu");
    const sidebarName = document.getElementById("sidebar-user-name");

    if (!userMenu) {
        return;
    }

    // NOT LOGGED IN
    if (!user) {

        userMenu.innerHTML = `
            <button
                onclick="signInWithGoogle()"
                class="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
                Login
            </button>
        `;

        if (sidebarName) {
            sidebarName.textContent = "Farmer";
        }

        return;
    }

    // LOGGED IN
    userMenu.innerHTML = `
        <div class="flex items-center gap-3">

            <img
                src="${user.photoURL || ''}"
                alt="Profile"
                class="w-10 h-10 rounded-full border border-gray-300">

            <span class="font-semibold hidden md:block">
                ${user.displayName || "Farmer"}
            </span>

            <button
                onclick="logout()"
                class="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700">
                Logout
            </button>

        </div>
    `;

    if (sidebarName) {
        sidebarName.textContent = user.displayName || "Farmer";
    }
}

function hideAppNavigation() {

    const topnav = document.getElementById("topnav");
    const sidenav = document.getElementById("sidenav");
    const bottomnav = document.getElementById("bottomnav");
    const fab = document.getElementById("fab-ai");
    const appLayout = document.getElementById("app-layout");

    if (topnav) {
        topnav.style.display = "none";
    }

    if (sidenav) {
        sidenav.style.display = "none";
    }

    if (bottomnav) {
        bottomnav.style.display = "none";
    }

    if (fab) {
        fab.style.display = "none";
    }

    if (appLayout) {
        appLayout.classList.remove("pt-16");
    }
}


function showAppNavigation() {

    const topnav = document.getElementById("topnav");
    const sidenav = document.getElementById("sidenav");
    const bottomnav = document.getElementById("bottomnav");
    const fab = document.getElementById("fab-ai");
    const appLayout = document.getElementById("app-layout");

    if (topnav) {
        topnav.style.display = "";
    }

    if (sidenav) {
        sidenav.style.display = "";
    }

    if (bottomnav) {
        bottomnav.style.display = "";
    }

    if (fab) {
        fab.style.display = "flex";
    }

    if (appLayout) {
        appLayout.classList.add("pt-16");
    }
}