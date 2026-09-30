    // ==========================================
    // Krishi Sahayak Authentication
    // ==========================================

    const provider = new firebase.auth.GoogleAuthProvider();

    let splashFinished = false;


    // ==========================================
    // GOOGLE LOGIN
    // ==========================================

    async function signInWithGoogle() {

        try {

            console.log("🔐 Starting Google Login...");

            const result =
                await auth.signInWithPopup(provider);

            const user = result.user;

            console.log("✅ Google Login Successful");
            console.log("User:", user.displayName);

            // Save basic user information
            await db
                .collection("users")
                .doc(user.uid)
                .set({

                    uid: user.uid,

                    name: user.displayName,

                    email: user.email,

                    photo: user.photoURL,

                    language:
                        localStorage.getItem("language"),

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                }, {
                    merge: true
                });

            console.log("✅ User saved to Firestore");

            /*
            * DO NOT navigate here.
            *
            * Firebase automatically triggers
            * onAuthStateChanged().
            */

        }

        catch (error) {

            console.error(
                "❌ Google Login Error:",
                error
            );

            alert(error.message);

            navigateTo("login");
        }
    }


    // ==========================================
    // PHONE NUMBER LOGIN
    // ==========================================

    let confirmationResult = null;
    let recaptchaVerifier = null;

    async function signInWithPhone() {

        try {

            // --------------------------------------
            // Get phone number
            // --------------------------------------

            const phoneNumber = prompt(
                "Enter your mobile number with country code:\nExample: +919876543210"
            );

            if (!phoneNumber) {
                return;
            }


            // --------------------------------------
            // Create reCAPTCHA
            // --------------------------------------

            if (!recaptchaVerifier) {

                recaptchaVerifier =
                    new firebase.auth.RecaptchaVerifier(
                        "recaptcha-container",
                        {
                            size: "normal"
                        }
                    );

                await recaptchaVerifier.render();
            }


            // --------------------------------------
            // Send OTP
            // --------------------------------------

            confirmationResult =
                await auth.signInWithPhoneNumber(
                    phoneNumber,
                    recaptchaVerifier
                );

            console.log("OTP sent successfully");


            // --------------------------------------
            // Ask for OTP
            // --------------------------------------

            const otp = prompt(
                "Enter the OTP sent to your mobile number:"
            );

            if (!otp) {
                return;
            }


            // --------------------------------------
            // Verify OTP
            // --------------------------------------

            const result =
                await confirmationResult.confirm(otp);

            const user = result.user;

            console.log(
                "✅ Phone Login Successful:",
                user.phoneNumber
            );


            // --------------------------------------
            // Save user information
            // --------------------------------------

            await db
                .collection("users")
                .doc(user.uid)
                .set({

                    uid: user.uid,

                    phone: user.phoneNumber,

                    language:
                        localStorage.getItem("language"),

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                }, {
                    merge: true
                });

            console.log("✅ Phone user saved");

            /*
            * DO NOT navigate here.
            *
            * Firebase automatically triggers
            * onAuthStateChanged().
            */

        }

        // ==========================================
        // PHONE LOGIN ERROR
        // ==========================================

        catch (error) {

            console.error(
                "❌ Phone Login Error:",
                error
            );

            alert(error.message);


            // Clear reCAPTCHA
            if (recaptchaVerifier) {

                recaptchaVerifier.clear();

                recaptchaVerifier = null;
            }

            navigateTo("login");
        }
    }


    // ==========================================
    // AUTH STATE
    // ==========================================

    // ==========================================
// AUTH STATE
// ==========================================

auth.onAuthStateChanged(async (user) => {

    console.log(
        "🔄 Firebase Auth State Changed"
    );

    console.log(
        "User:",
        user
    );

    updateUserUI(user);


    // --------------------------------------
    // Splash still active
    // --------------------------------------

    if (!splashFinished) {

        console.log(
            "⏳ Splash active - waiting for startup"
        );

        return;
    }


    // --------------------------------------
    // NOT LOGGED IN
    // --------------------------------------

    if (!user) {

        console.log(
            "🔐 No user → Login"
        );

        hideAppNavigation();

        navigateTo("login");

        return;
    }


    // --------------------------------------
    // LOGGED IN
    // --------------------------------------

    console.log(
        "👤 User logged in → Checking profile"
    );

    hideAppNavigation();

    await checkUserProfile(user);

});


    // ==========================================
    // CHECK PROFILE
    // ==========================================

    async function checkUserProfile(user) {

        console.log(
            "🔍 Checking profile..."
        );

        try {

            const doc =
                await db
                    .collection("users")
                    .doc(user.uid)
                    .get();


            console.log(
                "Firestore Document Exists:",
                doc.exists
            );


            // --------------------------------------
            // NEW USER
            // --------------------------------------

            if (!doc.exists) {

                console.log(
                    "🆕 New user"
                );

                hideAppNavigation();

                navigateTo("profile");

                return;
            }


            // --------------------------------------
            // EXISTING USER
            // --------------------------------------

            const data = doc.data();

            console.log(
                "📄 User Data:",
                data
            );


            // --------------------------------------
            // CHECK PROFILE COMPLETION
            // --------------------------------------

            const profileComplete =
                !!(
                    data.phone &&
                    data.state &&
                    data.district &&
                    data.village &&
                    data.crops
                );


            // --------------------------------------
            // PROFILE INCOMPLETE
            // --------------------------------------

            if (!profileComplete) {

                console.log(
                    "⚠️ Profile Incomplete"
                );

                hideAppNavigation();

                navigateTo("profile");

                return;
            }


            // --------------------------------------
            // PROFILE COMPLETE
            // --------------------------------------

            console.log(
                "✅ Profile Complete"
            );

            showAppNavigation();

            navigateTo("dashboard");

        }

        catch (error) {

            console.error(
                "❌ Firestore Error:",
                error
            );

            alert(error.message);

            hideAppNavigation();

            navigateTo("login");
        }
    }


    // ==========================================
    // LOGOUT
    // ==========================================

    // ==========================================
// UNIVERSAL LOGOUT HANDLER
// ==========================================

function logout() {
  console.log("🚪 Logging out user...");

  if (typeof auth !== "undefined" && auth.signOut) {
    auth.signOut().catch((err) => console.warn("Firebase signout omitted:", err));
  }

  // Clear session data
  localStorage.removeItem("userName");
  localStorage.removeItem("phone");
  localStorage.removeItem("avatar");
  localStorage.removeItem("loginMethod");
  localStorage.removeItem("village");
  localStorage.removeItem("district");
  localStorage.removeItem("state");
  localStorage.removeItem("crops");

  // Reset greetings
  const navName = document.getElementById("nav-user-name");
  if (navName) navName.textContent = "Farmer";

  const sidebarName = document.getElementById("sidebar-user-name");
  if (sidebarName) sidebarName.textContent = "Farmer";

  const navAvatar = document.getElementById("nav-user-avatar");
  if (navAvatar) {
    navAvatar.src = "https://ui-avatars.com/api/?name=Farmer&background=2d5a27&color=fff&bold=true";
  }

  // Hide nav and return to login
  hideAppNavigation();
  navigateTo("login");
}

window.logout = logout;
window.logoutUser = logout;