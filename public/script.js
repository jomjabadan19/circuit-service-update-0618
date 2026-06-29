window.toggleMobileNavigation = function(forceClose) {
    const navPanel = document.getElementById("navAuthGroup");
    const toggleIcon = document.getElementById("menuToggleIcon");
    
    if (!navPanel || !toggleIcon) return;

    // Explicit overlay override toggle mechanism
    if (forceClose === false) {
        navPanel.classList.add("hidden");
        toggleIcon.className = "fa-solid fa-bars";
        return;
    }

    // Standard visibility alternation tracking loop
    if (navPanel.classList.contains("hidden")) {
        navPanel.classList.remove("hidden");
        navPanel.classList.add("flex");
        toggleIcon.className = "fa-solid fa-xmark text-amber-400"; // Transforms hamburger into a 'Close' X icon
    } else {
        navPanel.classList.remove("flex");
        navPanel.classList.add("hidden");
        toggleIcon.className = "fa-solid fa-bars";
    }
};

// Clean UI Lifecycle Safe Guard: Automatically hide the vertical mobile flyout menu if a user resizes their window out to desktop scale
window.addEventListener("resize", function() {
    if (window.innerWidth >= 768) { // 768px matches Tailwind's 'md:' screen size breakpoint
        const navPanel = document.getElementById("navAuthGroup");
        const toggleIcon = document.getElementById("menuToggleIcon");
        if (navPanel && toggleIcon) {
            navPanel.classList.remove("hidden");
            toggleIcon.className = "fa-solid fa-bars";
        }
    }
});
window.toggleDashboardMenu = function(forceClose) {
    const navPanel = document.getElementById("dashboardNavGroup");
    const menuIcon = document.getElementById("dashboardMenuIcon");
    
    if (!navPanel || !menuIcon) return;

    // Direct override to guarantee structural closure after selecting an anchor path link
    if (forceClose === false) {
        navPanel.classList.add("hidden");
        navPanel.classList.remove("flex");
        menuIcon.className = "fa-solid fa-bars";
        return;
    }

    // Toggle view visibility layer classes
    if (navPanel.classList.contains("hidden")) {
        navPanel.classList.remove("hidden");
        navPanel.classList.add("flex");
        menuIcon.className = "fa-solid fa-xmark text-amber-400"; // Mutates hamburger to clean X layout close indicator
    } else {
        navPanel.classList.remove("flex");
        navPanel.classList.add("hidden");
        menuIcon.className = "fa-solid fa-bars";
    }
};

// Monitor monitor widths to reset mobile states if view formats scale back out to wide configurations
window.addEventListener("resize", function() {
    if (window.innerWidth >= 768) { // Matches tailwind 'md:' breakpoint boundary metrics
        const navPanel = document.getElementById("dashboardNavGroup");
        const menuIcon = document.getElementById("dashboardMenuIcon");
        if (navPanel && menuIcon) {
            navPanel.classList.remove("hidden");
            menuIcon.className = "fa-solid fa-bars";
        }
    }
});
// Initialize Firebase Storage (Ensure this is near where you initialize db and auth)
function switchLoginRole(role) {
        const targetRoleInput = document.getElementById('loginTargetRole');
        const mainTitle = document.getElementById('loginMainTitle');
        const tabClient = document.getElementById('tabBtnClient');
        const tabPro = document.getElementById('tabBtnPro');
        
        targetRoleInput.value = role;
        
        if (role === 'pro') {
            mainTitle.textContent = "Log In to Your Tech/Engineer Profile";
            tabPro.className = "py-2 text-xs font-bold uppercase tracking-wider tech-mono rounded-lg transition-all bg-emerald-500 shadow-md";
            tabClient.className = "py-2 text-xs font-bold uppercase tracking-wider tech-mono rounded-lg transition-all text-slate-400 hover:text-white";
        } else {
            mainTitle.textContent = "Log In to Your Client Profile";
            tabClient.className = "py-2 text-xs font-bold uppercase tracking-wider tech-mono rounded-lg transition-all bg-amber-500 text-slate-950 shadow-md";
            tabPro.className = "py-2 text-xs font-bold uppercase tracking-wider tech-mono rounded-lg transition-all text-slate-400 hover:text-white";
        }
    }

function showSides(id) {
    const leftEl = document.getElementById(`side-l-${id}`);
    const rightEl = document.getElementById(`side-r-${id}`);
    if(leftEl && rightEl) {
        // Left Side Animation
        leftEl.classList.remove('opacity-0', 'translate-x-4');
        leftEl.classList.add('opacity-100', 'translate-x-0');
        // Right Side Animation
        rightEl.classList.remove('opacity-0', '-translate-x-4');
        rightEl.classList.add('opacity-100', 'translate-x-0');
    }
}

function hideSides(id) {
    const leftEl = document.getElementById(`side-l-${id}`);
    const rightEl = document.getElementById(`side-r-${id}`);
    if(leftEl && rightEl) {
        // Reset Left Side
        leftEl.classList.remove('opacity-100', 'translate-x-0');
        leftEl.classList.add('opacity-0', 'translate-x-4');
        // Reset Right Side
        rightEl.classList.remove('opacity-100', 'translate-x-0');
        rightEl.classList.add('opacity-0', '-translate-x-4');
    }
}
  
function openDetailModal(imageSrc, title, itemsArray) {
    const modal = document.getElementById('detailModal');
    const modalBox = modal.querySelector('.transform');
    
   
    
    // Set dynamic assets
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').innerText = title;
    
    // Generate clean, custom worded bullet points
    const listContainer = document.getElementById('modalList');
    listContainer.innerHTML = ''; 
    
    itemsArray.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';
        li.innerHTML = `
            <svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>${item}</span>
        `;
        listContainer.appendChild(li);
    });

    // Handle animations smoothly
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalBox.classList.remove('scale-95');
        modalBox.classList.add('scale-100');
    }, 50);
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    const modalBox = modal.querySelector('.transform');
    
    // Restore normal website scrolling
    document.body.classList.remove('overflow-hidden');
    
    modal.classList.add('opacity-0');
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }, 300);
}
   

window.handleProLogout = async function() {
    try {
        // Trigger asynchronous signature termination via Firebase backend core
        await auth.signOut();
        
        window.currentAuthenticatedUserDoc = null;
        localStorage.removeItem('authenticatedProId');
        localStorage.removeItem('authenticatedProUser');
         window.location.replace("index.html");
        alert("Are you sure to Logout?");
		
    } catch (error) {
        console.error("Logout Routine Aborted: ", error);
    }
};

    function resetLoginButton(button) {
        button.disabled = false;
        button.innerText = "Log in";
    }
    function handleClientLogout() {
        window.currentAuthenticatedUserDoc = null;
        document.getElementById('anonymousLoginGateway').classList.remove('hidden');
        document.getElementById('authorizedClientDashboard').classList.add('hidden');
        document.getElementById('clientLoginForm').reset();
    }
	


       // ---------------------------------------------------------
// 1. FIREBASE CONFIGURATION (Runs on every page)
// ---------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyDvYhemJCzP4Q30_GAs5DzA-nbrdMqBthU",
    authDomain: "circuit-service.firebaseapp.com",
    projectId: "circuit-service",
    storageBucket: "circuit-service.firebasestorage.app",
    messagingSenderId: "931697304500",
    appId: "1:931697304500:web:9d6c2521d5953fa64308e1"
};

// Safe initialization check: Only start if it hasn't started yet
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Global Firebase Variables
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ---------------------------------------------------------
// 2. INDEX.HTML LOGIC (Login Role Switching)
// ---------------------------------------------------------
let currentAuthenticatedUserDoc = null;

// Making this a global function so onclick="" works in HTML
window.switchLoginRole = function(role) {
    const clientBtn = document.getElementById('tabBtnClient');
    const proBtn = document.getElementById('tabBtnPro');
    const targetRoleInput = document.getElementById('loginTargetRole');
    const mainTitle = document.getElementById('loginMainTitle');

    // Safety check: Only run this code if the elements actually exist on the page
    if (!clientBtn || !proBtn || !targetRoleInput || !mainTitle) {
        return; // Exit the function silently if we are not on index.html
    }

    targetRoleInput.value = role;

    // Prevent re-triggering animation
    if (role === 'client' && clientBtn.classList.contains('bg-amber-500')) return;
    if (role === 'pro' && proBtn.classList.contains('bg-blue-500')) return;

    // Fade out
    targetRoleInput.classList.remove('opacity-100');
    mainTitle.classList.remove('opacity-100');
    targetRoleInput.classList.add('opacity-0');
    mainTitle.classList.add('opacity-0');

    setTimeout(() => {
        if (role === 'client') {
            targetRoleInput.innerText = 'Sign In to Your Account';
            mainTitle.innerText = 'Log In to Your User Profile';
            targetRoleInput.classList.remove('text-blue-400');
            targetRoleInput.classList.add('text-amber-400');
        } else {
            targetRoleInput.innerText = 'Sign In as Professional';
            mainTitle.innerText = 'Log In to Your Dashboard';
            targetRoleInput.classList.remove('text-amber-400');
            targetRoleInput.classList.add('text-blue-400');
        }

        // Fade back in
        targetRoleInput.classList.remove('opacity-0');
        mainTitle.classList.remove('opacity-0');
        targetRoleInput.classList.add('opacity-100');
        mainTitle.classList.add('opacity-100');
    }, 200);

    // Morph Tab Styles
    if (role === 'client') {
        clientBtn.className = "py-2 text-xs font-bold uppercase tracking-wider tech-mono rounded-lg transition-all duration-300 ease-in-out bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10 transform active:scale-98";
        proBtn.className = "py-2 text-xs font-bold uppercase tracking-wider tech-mono rounded-lg transition-all duration-300 ease-in-out text-slate-400 hover:text-white bg-transparent transform active:scale-98";
    } else {
        proBtn.className = "py-2 text-xs font-bold uppercase tracking-wider tech-mono rounded-lg transition-all duration-300 ease-in-out bg-blue-500 text-slate-950 shadow-md shadow-blue-500/10 transform active:scale-98";
        clientBtn.className = "py-2 text-xs font-bold uppercase tracking-wider tech-mono rounded-lg transition-all duration-300 ease-in-out text-slate-400 hover:text-white bg-transparent transform active:scale-98";
    }
};

// ---------------------------------------------------------
// 3. PRO_PROFILE.HTML LOGIC (Session Loading)
// ---------------------------------------------------------
let currentProUser = null;
let hasActiveJob = false; 


window.addEventListener('DOMContentLoaded', async () => {
    // Determine which page we are on by looking for the dropdown
    const isClientDashboard = document.getElementById('postTypeSelector') !== null;

    if (isClientDashboard) {
        // ========================================================
        // 1. CLIENT DASHBOARD INITIALIZATION
        // ========================================================
        const savedClientId = localStorage.getItem('authenticatedClientId'); 
        
        if (!savedClientId) {
            alert("Client session expired. Please log in again.");
            return;
        }

        if (typeof listenToSocialFeed === "function") {
            listenToSocialFeed();
        }

         // 👇 CLIENT MAP INITIALIZATION (Uncomment when token ready) 👇
         if (typeof initClientMap === "function") {
             initClientMap();
         }

    } else {
        // ========================================================
        // 2. PRO PROFILE INITIALIZATION
        // ========================================================
       let savedProId = localStorage.getItem('authenticatedProId');

// If no Pro ID is found, check if they are just visiting the home page.
// If they are on the pro_profile page without an ID, kick to login.
if (!savedProId) {
    // Only redirect if they are actually trying to view the protected profile page
    if (window.location.pathname.includes('pro_profile.html')) {
        alert("Security session tracking break. Re-authenticate access credentials.");
        window.location.replace("index.html");
    }
    return; 
}

// Initialize Pro Profile functions securely using the verified ID
if (typeof fetchProProfileById === "function") {
    fetchProProfileById(savedProId);
}
if (typeof listenToSocialFeed === "function") {
    listenToSocialFeed();
}

         // 👇 PRO MAP INITIALIZATION (Uncomment when token ready) 👇
         if (typeof initProMap === "function") {
             initProMap();
         }
    }
});

window.handleUnifiedLogin = async function(e) {
    if (e) e.preventDefault();

    const email = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;
    const loginBtn = document.getElementById('loginButtonElement');
    const currentRole = document.getElementById('loginTargetRole') ? document.getElementById('loginTargetRole').value : 'client';

    try {
        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.innerText = "⏳ VERIFYING... PLEASE WAIT";
        }

        // 1. Authenticate with Firebase Auth
        const userCredential = await auth.signInWithEmailAndPassword(email, pass);

        // 2. Check Verification Status
        if (!userCredential.user.emailVerified) {
            alert("Account not verified. Please check your email.");
            await auth.signOut();
            return;
        }

        // 3. Determine which collection to search based on Role
        const targetedCollection = (currentRole === 'client') ? 'client_users' : 'pro_registers';

        // 4. Fetch the profile data using the Auth UID
        const userDocRef = await db.collection(targetedCollection).doc(userCredential.user.uid).get();

        if (userDocRef.exists) {
            const userData = userDocRef.data();
            
            // Set the global variable so your ticket submission function can use it
            window.currentAuthenticatedUserDoc = userData;
            // Ensure the doc has an ID property for ticket tracking
            window.currentAuthenticatedUserDoc.clientId = userCredential.user.uid;

            // 5. Redirect based on role
            if (currentRole === 'client') {
                // --- CLIENT REDIRECTION ---
                localStorage.setItem('authenticatedClientId', userCredential.user.uid);
                
                // --- 🌟 THE FIX: SAVE THE NAME FOR THE FEED POSTS ---
                // If your database uses '.name' instead of '.fullName', change this below!
                localStorage.setItem('dashClientName', userData.fullName || userData.name || "Client User");
                localStorage.setItem('authenticatedClientEmail', userData.email || userCredential.user.email);
                
                window.location.href = 'client_dashboard.html'; 
            } else {
                // --- PRO REDIRECTION ---
                localStorage.setItem('authenticatedProId', userCredential.user.uid);
                window.location.href = 'pro_profile.html'; 
            }

        } else {
            // Profile does not exist in the targeted collection
            alert(`Access Denied: No profile found in our ${currentRole.toUpperCase()} records.`);
            await auth.signOut();
        }

    } catch (err) {
        console.error("Login Error: ", err);
        alert("Login Error: " + err.message);
    } finally {
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.innerText = "Log in";
        }
    }
};



	auth.onAuthStateChanged((user) => {
    const path = window.location.pathname;
    const isDashboardPage = path.includes('client_dashboard.html');
    const isProPage = path.includes('pro_profile.html');

    const loginBtn = document.getElementById('headerLoginBtn'); 
    const regClientBtn = document.getElementById('headerRegClientBtn');
    const regProBtn = document.getElementById('headerRegProBtn');
    const logoutBtn = document.getElementById('headerLogoutBtn');

    if (user) {
        // --- USER IS LOGGED IN ---
        if (loginBtn) loginBtn.style.setProperty('display', 'none', 'important');
        if (regClientBtn) regClientBtn.style.setProperty('display', 'none', 'important');
        if (regProBtn) regProBtn.style.setProperty('display', 'none', 'important');
        if (logoutBtn) logoutBtn.style.setProperty('display', 'inline-block', 'important');

        // Context-aware Dashboard Unhiding
        if (isDashboardPage) {
            const dashboard = document.getElementById('authorizedClientDashboard');
            if (dashboard) dashboard.classList.remove('hidden');
            
            if (typeof loadAccountInformation === 'function') loadAccountInformation(user.uid);
            if (typeof loadClientTicketHistory === 'function') loadClientTicketHistory(user.uid);
        }

        // Add specific Pro-loading logic here if needed
        if (isProPage && typeof loadProProfile === 'function') {
            loadProProfile(user.uid);
        }
        
    } else {
        // --- USER IS LOGGED OUT ---
        if (isDashboardPage || isProPage) {
            window.location.href = 'index.html';
            return; 
        }
        
        if (loginBtn) loginBtn.style.setProperty('display', 'inline-block', 'important');
        if (regClientBtn) regClientBtn.style.setProperty('display', 'inline-block', 'important');
        if (regProBtn) regProBtn.style.setProperty('display', 'inline-block', 'important');
        if (logoutBtn) logoutBtn.style.setProperty('display', 'none', 'important');
    }
});

function handleClientLogout() {
    currentAuthenticatedUserDoc = null;
    
    const authGroup = document.getElementById('navAuthGroup');
    if (authGroup) {
        authGroup.style.display = 'flex';
    }

    document.getElementById('authorizedClientDashboard').classList.add('hidden');
    document.getElementById('anonymousLoginGateway').classList.remove('hidden');
    document.getElementById('clientLoginForm').reset();
    const gridEl = document.getElementById('clientTicketsGrid');
    if (gridEl) gridEl.innerHTML = '';
}
function updateServiceTermsBanner(selectElement) {
    const banner = document.getElementById('serviceTermsBanner');
    const selectedValue = selectElement.value;
    
    // Define the categories
    const noFixNoPayServices = ['repair', 'computer', 'industrial', 'software'];
    const projectBasedServices = ['academic', 'schematic', 'cctv', 'solar'];
    
    if (noFixNoPayServices.includes(selectedValue)) {
        // Apply Green styling for No Fix, No Pay
        banner.className = "mt-2 p-2.5 rounded-lg border border-emerald-900/50 bg-emerald-950/20 text-emerald-400 text-[11px] flex gap-2 items-start transition-all duration-300";
        banner.innerHTML = `
            <i class="fa-solid fa-shield-halved mt-0.5"></i> 
            <div>
    <strong class="uppercase tracking-wider text-xs text-white block mb-1">
        No Fix / Not Done, No Pay
    </strong> 
    
    <span class="text-emerald-400/90 leading-relaxed">
        You will only be charged if the Tech/Engr successfully repairs or completes this service.
    </span>
</div>
        `;
    } else if (projectBasedServices.includes(selectedValue)) {
    // Apply Blue styling for Project-Based
    banner.className = "mt-2 p-2.5 rounded-lg border border-blue-900/50 bg-blue-950/20 text-blue-400 text-[11px] flex gap-2 items-start transition-all duration-300";
    banner.innerHTML = `
        <i class="fa-solid fa-file-contract mt-0.5"></i> 
        <div>
            <strong class="uppercase tracking-wider text-xs text-white block mb-1">Project-Based Agreement</strong> 
            <span class="text-blue-400/90 leading-relaxed">
                This job requires an initial fund or payment to the Tech/Engr to proceed with the project. Final terms will be based on the agreement between You and the Professional.
            </span>
        </div>
        `;
    } else {
        // Hide if nothing valid is selected
        banner.className = "hidden";
    }
}

function toggleServiceLocationField() {
    const selectMode = document.getElementById('dashServiceMode');
    const banner = document.getElementById('serviceModeBanner');
    const locationSection = document.getElementById('ticketLocationSection');
    
    // Grab all specific structured fields
    const countryInput = document.getElementById('ticketCountry');
    const stateInput = document.getElementById('ticketState');
    const cityInput = document.getElementById('ticketCity');
    const streetInput = document.getElementById('ticketStreet');
    
    const selectedValue = selectMode.value;

    // 1. UPDATE THE BANNER UI CONTENT (Your elegant original text templates)
    let bannerContent = "";
    
    if (selectedValue === "Home Service") {
        bannerContent = `
            <i class="fa-solid fa-house-user mt-0.5"></i>
            <div>
                <strong class="uppercase tracking-wider text-xs text-white block mb-1">Home Service (On-site Visit)</strong>
                <span class="text-amber-400/90 leading-relaxed">Please provide your exact address so the Technician or Engineer can visit your location to perform the service.</span>
            </div>
        `;
    } else if (selectedValue === "Bring to Workshop") {
        bannerContent = `
            <i class="fa-solid fa-shop mt-0.5"></i>
            <div>
                <strong class="uppercase tracking-wider text-xs text-white block mb-1">Bring to Expert (WorkShop Drop-off)</strong>
                <span class="text-amber-400/90 leading-relaxed">Once your request is accepted, you may view the workshop location for device drop-off and coordinate with the Tech/Engr.</span>
            </div>
        `;
    } else if (selectedValue === "Agreed Location") {
        bannerContent = `
            <i class="fa-solid fa-handshake mt-0.5"></i>
            <div>
                <strong class="uppercase tracking-wider text-xs text-white block mb-1">Agreed Location (Meet-up)</strong>
                <span class="text-amber-400/90 leading-relaxed">Ideal for remote services, such as Schematic Design, PCB layout, Software, or Academic Project Prototyping. Meet at a mutually agreed-upon location.</span>
            </div>
        `;
    }

    // Apply styles and inject banner content
    if (bannerContent) {
        banner.className = "mt-2 p-2.5 rounded-lg border border-amber-900/50 bg-amber-950/20 text-amber-400 text-[11px] flex gap-2 items-start transition-all duration-300";
        banner.innerHTML = bannerContent;
    } else {
        banner.className = "hidden";
    }

    // 2. MANAGE THE STRUCTURED LOCATION INPUTS
    if (!locationSection) return;

    if (selectedValue === "Home Service" || selectedValue === "Agreed Location") {
        // Show the entire location form block
        locationSection.classList.remove('hidden');
        
        // Restore default layout system validation rules
        stateInput.setAttribute('required', '');
        cityInput.setAttribute('required', '');
        streetInput.setAttribute('required', '');
        
        // Dynamically shift street placeholders based on the style choice
        streetInput.placeholder = selectedValue === "Home Service" 
            ? "e.g. 123 Sesame St. ATBP Subd. Brgy.Batibot" 
            : "e.g. SM City Santa Rosa / Coffee Shop Address";

    } else if (selectedValue === "Bring to Workshop") {
        // Hide the entire location field collection cleanly
        locationSection.classList.add('hidden');
        
        // Clear out stale data text inputs so empty items don't save to the database
        if (countryInput) countryInput.value = "";
        if (stateInput) stateInput.value = "";
        if (cityInput) { cityInput.value = ""; cityInput.disabled = true; }
        if (streetInput) streetInput.value = "";
        
        // Reset maps telemetry strings
        document.getElementById('ticketGeoLat').value = "0";
        document.getElementById('ticketGeoLng').value = "0";
        document.getElementById('ticketMapWrapper')?.classList.add('hidden');

        // CRITICAL: Strip the HTML validation tags so the user can submit the ticket without browser blocker popup errors
        stateInput.removeAttribute('required');
        cityInput.removeAttribute('required');
        streetInput.removeAttribute('required');
    } else {
        // Nothing selected yet
        locationSection.classList.add('hidden');
    }
}// Global tracker array to hold the actual files scheduled for upload
let selectedFilesArray = [];

// --- Handles New File Input Selections ---
window.handleFileSelection = function(e) {
    const files = e.target.files;
    if (!files) return;

    // Convert FileList to normal Array and append to our tracker list
    Array.from(files).forEach(file => {
        selectedFilesArray.push(file);
    });

    // Clear input field value so the user can re-select the same file if they want to later
    e.target.value = ""; 

    // Re-render the thumbnail display matrix
    renderMediaPreviews();
};

// --- Renders Grid Display with Functional Remove Buttons ---
window.renderMediaPreviews = function() {
    const previewGrid = document.getElementById('formMediaPreviewGrid');
    if (!previewGrid) return;
    
    previewGrid.innerHTML = ""; // Clear existing grid space

    selectedFilesArray.forEach((file, index) => {
        const reader = new FileReader();
        
        // Wrapper container for the element block
        const mediaWrapper = document.createElement('div');
        mediaWrapper.className = "relative aspect-square rounded-lg border border-slate-800 bg-slate-950 overflow-hidden group shadow-md";

        // Read and parse the file data stream
        reader.onload = function(event) {
            let innerContent = "";
            
            if (file.type.startsWith('image/')) {
                innerContent = `<img src="${event.target.result}" class="w-full h-full object-cover">`;
            } else if (file.type.startsWith('video/')) {
                innerContent = `
                    <video src="${event.target.result}" class="w-full h-full object-cover"></video>
                    <div class="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span class="text-[10px] text-amber-400 font-bold bg-slate-900/80 px-1.5 py-0.5 rounded border border-amber-500/30">VIDEO</span>
                    </div>`;
            }

            // Inject media payload layout + the interactive remove button (✕)
            mediaWrapper.innerHTML = `
                ${innerContent}
                <button type="button" onclick="removeSelectedFile(${index})" class="absolute top-1 right-1 w-5 h-5 bg-slate-950/80 hover:bg-red-600 border border-slate-700/50 hover:border-red-500 text-white hover:text-white rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all shadow-md z-10">
                    ✕
                </button>
            `;
        };
        
        reader.readAsDataURL(file);
        previewGrid.appendChild(mediaWrapper);
    });
};

// --- Target execution to remove specific item array indexes ---
window.removeSelectedFile = function(indexToRemove) {
    // Splice target index position out of active stack allocation
    selectedFilesArray.splice(indexToRemove, 1);
    
    // Refresh preview interface state matching updated array
    renderMediaPreviews();
};

let ticketMapInstance = null;
let ticketMarkerInstance = null;

// Add this runner hook execution to your dashboard's modal initialization script block
// or inside your general DOMContentLoaded handler event window context.
document.addEventListener('DOMContentLoaded', () => {
    populateTicketCountries();
});

function populateTicketCountries() {
    const countrySelect = document.getElementById('ticketCountry');
    if (!countrySelect) return;
    
    countrySelect.innerHTML = '';
    
    const placeholder = document.createElement('option');
    placeholder.value = "";
    placeholder.innerText = "Select Country";
    placeholder.disabled = true;
    placeholder.selected = true;
    countrySelect.appendChild(placeholder);
    
    // Sort array
    countriesList.sort((a, b) => a.name.localeCompare(b.name));

    countriesList.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.code;
        opt.innerText = c.name;
        countrySelect.appendChild(opt);
    });
}

window.onTicketCountryChange = function() {
    document.getElementById('ticketState').value = '';
    document.getElementById('ticketCity').value = '';
    document.getElementById('ticketCity').disabled = true;
};

async function searchTicketLocation(level) {
    const country = document.getElementById('ticketCountry').value;
    const stateInput = document.getElementById('ticketState');
    const cityInput = document.getElementById('ticketCity');
    const dropdown = document.getElementById(`ticket${level.charAt(0).toUpperCase() + level.slice(1)}-dropdown`);
    
    let query = level === 'state' ? stateInput.value.trim() : cityInput.value.trim();
    if (!country || query.length < 2) {
        dropdown.classList.add('hidden');
        return;
    }

    let types = level === 'state' ? 'region' : 'place';
    let contextQuery = level === 'city' ? `${stateInput.value} ` : '';
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(contextQuery + query)}.json?access_token=${MAPBOX_TOKEN}&country=${country}&types=${types}&limit=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.features || data.features.length === 0) {
            dropdown.classList.add('hidden');
            return;
        }

        dropdown.innerHTML = '';
        dropdown.classList.remove('hidden');

        data.features.forEach(feature => {
            const item = document.createElement('div');
            item.className = 'px-3 py-2 hover:bg-amber-500/10 hover:text-amber-400 cursor-pointer text-xs transition-colors';
            item.innerText = feature.text;
            
            item.onclick = () => {
                if (level === 'state') {
                    stateInput.value = feature.text;
                    cityInput.disabled = false;
                    cityInput.value = '';
                } else {
                    cityInput.value = feature.text;
                    
                    const [lng, lat] = feature.center;
                    document.getElementById('ticketGeoLng').value = lng;
                    document.getElementById('ticketGeoLat').value = lat;
                    
                    if (ticketMapInstance) {
                        ticketMapInstance.flyTo({ center: [lng, lat], zoom: 14 });
                        ticketMarkerInstance.setLngLat([lng, lat]);
                    }
                    
                    document.getElementById('ticketDisplayLat').innerText = lat.toFixed(4);
                    document.getElementById('ticketDisplayLng').innerText = lng.toFixed(4);
                }
                dropdown.classList.add('hidden');
            };
            dropdown.appendChild(item);
        });
    } catch (err) {
        console.error("Ticket location parsing breakdown: ", err);
    }
}

function toggleTicketMap() {
    const wrapper = document.getElementById('ticketMapWrapper');
    if (!wrapper) return;
    
    wrapper.classList.toggle('hidden');
    
    if (!wrapper.classList.contains('hidden')) {
        setTimeout(() => {
            if (!ticketMapInstance) {
                initTicketFormMap();
            } else {
                // Critical step: Force Mapbox canvas calculations recalculation
                // in case it was toggled open inside an active dashboard modal wrapper
                ticketMapInstance.resize(); 
            }
        }, 120);
    }
}

function initTicketFormMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    let initialLng = parseFloat(document.getElementById('ticketGeoLng').value) || 121.1114;
    let initialLat = parseFloat(document.getElementById('ticketGeoLat').value) || 14.3142;

    ticketMapInstance = new mapboxgl.Map({
        container: 'ticketMapCanvas',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [initialLng, initialLat],
        zoom: 13
    });

    ticketMarkerInstance = new mapboxgl.Marker({ color: '#f59e0b', draggable: true })
        .setLngLat([initialLng, initialLat])
        .addTo(ticketMapInstance);

    ticketMarkerInstance.on('dragend', () => {
        const lngLat = ticketMarkerInstance.getLngLat();
        document.getElementById('ticketGeoLat').value = lngLat.lat;
        document.getElementById('ticketGeoLng').value = lngLat.lng;
        document.getElementById('ticketDisplayLat').innerText = lngLat.lat.toFixed(4);
        document.getElementById('ticketDisplayLng').innerText = lngLat.lng.toFixed(4);
    });
}

function captureTicketSubmissionPayload() {
    const countrySelect = document.getElementById('ticketCountry');
    const countryText = countrySelect.options[countrySelect.selectedIndex].text;
    const stateText = document.getElementById('ticketState').value.trim();
    const cityText = document.getElementById('ticketCity').value.trim();
    const streetText = document.getElementById('ticketStreet').value.trim();

    const latVal = parseFloat(document.getElementById('ticketGeoLat').value);
    const lngVal = parseFloat(document.getElementById('ticketGeoLng').value);

    // Build unified string structure out of discrete component properties
    const completeUnifiedAddress = `${streetText}, ${cityText}, ${stateText}, ${countryText}`;

    // Return the completed ticket map array target model payload
    return {
        description: document.getElementById('dashProjectDescription')?.value || "",
        category: document.getElementById('dashProjectCategory')?.value || "",
        
        // Match both legacy inputs and optimized properties layout patterns
        location: completeUnifiedAddress, 
        metaLocation: {
            street: streetText,
            city: cityText,
            state: stateText,
            country: countryText
        },
        geoPoint: [lngVal, latVal], // Used to map tickets visually on a technician tracking radar board!
        status: "pending",
        timestamp: new Date().toISOString()
    };
}

// Click listener to handle drop dismissals cleanly
document.addEventListener('click', (e) => {
    if (!e.target.closest('#ticketState') && !e.target.closest('#ticketState-dropdown')) {
        document.getElementById('ticketState-dropdown')?.classList.add('hidden');
    }
    if (!e.target.closest('#ticketCity') && !e.target.closest('#ticketCity-dropdown')) {
        document.getElementById('ticketCity-dropdown')?.classList.add('hidden');
    }
});

// --- Updated Submission Handler (Uses the tracked array) ---
window.handleDashboardServiceSubmission = async function(e) {
    // 1. Prevent native form submission reloads safely
    if (e && e.preventDefault) e.preventDefault();
    else if (window.event) window.event.preventDefault();

    const submitBtn = document.getElementById('dashTicketSubmitBtn');
    const previewGrid = document.getElementById('formMediaPreviewGrid');
    const formElement = document.getElementById('dashboardServiceRequestForm');
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳ Creating Service Ticket...</span>';
    }

    try {
        // 2. Gather structural inputs from your UI fields
        const category = document.getElementById('dashServiceCategory').value;
        const serviceMode = document.getElementById('dashServiceMode').value;
        const description = (document.getElementById('dashTechnicalDetails').value || "").trim();

        if (!description) {
            throw new Error("Please provide the technical details/description.");
        }
const assignedProId =
    document.getElementById("assignedProId").value;

const assignedProName =
    document.getElementById("assignedProName").value;
	const requestType =
    assignedProId ? "direct" : "broadcast";

        // --- NEW CONDITIONAL ADDRESS & COORDINATE PARSING ENGINE ---
        let finalLocationString = "";
        let geoCoordinatesArray = "";

        if (serviceMode === "Home Service" || serviceMode === "Agreed Location") {
            const countrySelect = document.getElementById('ticketCountry');
            const countryVal = countrySelect && countrySelect.selectedIndex >= 0 ? countrySelect.options[countrySelect.selectedIndex].text : "";
            const stateVal = (document.getElementById('ticketState').value || "").trim();
            const cityVal = (document.getElementById('ticketCity').value || "").trim();
            const streetVal = (document.getElementById('ticketStreet').value || "").trim();

            // Validate that mandatory fields are filled out for on-site/meetup assignments
            if (!countryVal || countryVal === "Select Country" || !stateVal || !cityVal || !streetVal) {
                throw new Error("Please complete all address fields (Country, Province, City, and Street/Barangay).");
            }

            // Build cohesive location string
            finalLocationString = `${streetVal}, ${cityVal}, ${stateVal}, ${countryVal}`;
            
            // Extract map coordinates telemetry
            const latVal = parseFloat(document.getElementById('ticketGeoLat').value) || 14.3142;
            const lngVal = parseFloat(document.getElementById('ticketGeoLng').value) || 121.1114;
            geoCoordinatesArray = [lngVal, latVal]; // [longitude, latitude] matching Mapbox/GeoJSON rules

        } else if (serviceMode === "Bring to Workshop") {
            // For workshop drop-offs, bypass client physical tracking validation constraints
            finalLocationString = "Bring to Workshop Drop-off";
            geoCoordinatesArray = ""; 
        } else {
            throw new Error("Please select a valid Delivery Option.");
        }
        // -------------------------------------------------------------

        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Authentication context missing. Please log in.");

        // 3. Fetch client profile credentials out of 'client_users'
        if (submitBtn) {
            submitBtn.innerHTML = '<span>⏳ Processing...</span>';
        }
        
        const userDocRef = db.collection('client_users').doc(currentUser.uid);
        const userDocSnapshot = await userDocRef.get();
        
        let clientName = "Unknown Client";
        let clientContact = "N/A";
        let clientEmail = currentUser.email || "No Email Linked";

        if (userDocSnapshot.exists) {
            const userData = userDocSnapshot.data();
            clientName = userData.name || "Unknown Client";
            clientContact = userData.phone || "N/A";
        } else {
            console.warn(`Profile document not found in client_users for UID: ${currentUser.uid}`);
        }

        // 4. Process and upload media files array if any are queued
        const mediaUrls = [];
        if (typeof selectedFilesArray !== 'undefined' && selectedFilesArray.length > 0) {
            let totalSizeInBytes = 0;
            const MAX_ALLOWED_SIZE = 100 * 1024 * 1024; // 100 MB Limit

            selectedFilesArray.forEach(file => { totalSizeInBytes += file.size; });

            if (totalSizeInBytes > MAX_ALLOWED_SIZE) {
                throw new Error(`Upload blocked: Total size is ${(totalSizeInBytes / (1024 * 1024)).toFixed(1)}MB. Limit is 100MB.`);
            }

            for (let i = 0; i < selectedFilesArray.length; i++) {
                const file = selectedFilesArray[i];
                const uniqueFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
                
                if (submitBtn) {
                    submitBtn.innerHTML = `<span>⏳ UPLOADING: ${file.name.substring(0,12)}... (${i+1}/${selectedFilesArray.length})</span>`;
                }

                const storageRef = storage.ref(`service_media/${currentUser.uid}/${uniqueFileName}`);
                const snapshot = await storageRef.put(file);
                const downloadUrl = await snapshot.ref.getDownloadURL();
                
                mediaUrls.push({
                    url: downloadUrl,
                    type: file.type.startsWith('video/') ? 'video' : 'image',
                    name: file.name
                });
            }
        }

        if (submitBtn) {
            submitBtn.innerHTML = '<span>📩 Sending your service request...</span>';
        }

        // 5. Generate serial ticket tracking number
        const randomizedIndex = Math.floor(1000 + Math.random() * 9000);
        const dynamicTicketSerial = `CS-${randomizedIndex}`;

        // 6. Compile data payload packet cleanly
        const ticketPayload = {

    ticketId: dynamicTicketSerial,

    clientId: currentUser.uid,

    clientName: clientName,

    clientPhone: clientContact,

    clientEmail: clientEmail,

    category: category,

    serviceMode: serviceMode,

    projectLocation: finalLocationString,

    coordinates: geoCoordinatesArray,

    jobDetails: description,

    attachments: mediaUrls,

    assignedProId,

    assignedProName,

    requestType,

    status: "new",

    acceptedById: "",

    acceptedByName: "",

    createdAt: firebase.firestore.FieldValue.serverTimestamp(),

    termsVersion: "2026-06",

    privacyVersion: "2026-06",

    accountCreated: new Date().toISOString()

};

        // Write directly to your unified firestore database collection
        await db.collection('client_tickets').add(ticketPayload);

        // 7. Clear view layout tracking architectures on deployment success
        if (formElement) formElement.reset();
        else e.target.reset();

        // Safely hide the location section block and banners on reset
        document.getElementById('ticketLocationSection')?.classList.add('hidden');
        const banner = document.getElementById('serviceModeBanner');
        if (banner) banner.className = "hidden";

        if (typeof selectedFilesArray !== 'undefined') {
            selectedFilesArray = []; // Flush tracking matrix cache array
        }
        if (previewGrid) previewGrid.innerHTML = "";
        
        alert(`✅ Service request sent! An expert Technician or Engineer will review and accept your ticket shortly. Service #: ${dynamicTicketSerial}`);

    } catch (err) {
        console.error("Submission Error Pipeline Block:", err);
        alert("Transmission Interrupted: " + err.message);
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>⚡ Create and Send Service Request</span>';
        }
    }
};
function populateDropdown(selectElement, data, placeholder) {
    selectElement.innerHTML = `<option value="">${placeholder}</option>`;
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name; // or item.isoCode
        option.textContent = item.name;
        selectElement.appendChild(option);
    });
    selectElement.disabled = false;
}

window.handleProRegister = async function(event) {

    event.preventDefault(); // Prevent form submission

    if (!document.getElementById("proTermsAgree").checked){

    alert("Please accept the Privacy Policy and Terms & Conditions.");

   return false;

}

    const registerBtn = document.getElementById('proSubmitBtn');
    
    if (registerBtn) {
        registerBtn.disabled = true;
        registerBtn.innerText = "⏳ PROCESSING...";
    }

    try {
        // 1. Get credentials and text references
        const email = document.getElementById('proEmail').value.trim();
        const pass = document.getElementById('proPassword').value;
        const fullLocationText = `${tempRegistrationData.city}, ${tempRegistrationData.state}, ${tempRegistrationData.country}`;
        const preference = tempRegistrationData.servicePreference || "in-shop";

        // 2. PARSE EXACT MAP CANVAS PINS DIRECTLY
        const latVal = parseFloat(document.getElementById('proGeoLat').value);
        const lngVal = parseFloat(document.getElementById('proGeoLng').value);
        
        let targetCoordinates = null;
        if (!isNaN(lngVal) && !isNaN(latVal)) {
            targetCoordinates = [lngVal, latVal];
        } else {
            // Hard fallback if map container fails to read
            targetCoordinates = [121.1114, 14.3142]; 
        }

        // 3. Create Auth Account
        const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
        const newProUid = userCredential.user.uid;
        
        // 4. Send the Verification Email
        await userCredential.user.sendEmailVerification();
        
        // 5. Write everything cleanly to Firestore in one single call
        await db.collection('pro_registers').doc(newProUid).set({

    name: tempRegistrationData.name || document.getElementById('proName').value,

    email: email,

    phone: tempRegistrationData.phone,

    contact: tempRegistrationData.phone,

    location: fullLocationText,

    coordinates: targetCoordinates,

    serviceSetup: preference,

    specialties: tempRegistrationData.specialties || [],

    role: "pro",

    isVerified: false,

    termsAccepted: true,

    termsAcceptedAt: firebase.firestore.FieldValue.serverTimestamp(),

    termsVersion: "2026-06",

    privacyVersion: "2026-06",

    accountCreated: new Date().toISOString()

});	
        console.log("Professional successfully registered with active map metrics!");

        // Force sign out so they can't bypass the verification lock
        await auth.signOut();

        alert("Registration Complete! Please check your email to verify your account before logging in.");
        
        // Reset and close UI elements
        document.getElementById('proInfoForm').reset();
        document.getElementById('proSecurityForm').reset();
        if (typeof returnToPhaseOne === 'function') returnToPhaseOne(); 
        if (typeof closeProModal === 'function') closeProModal();

    } catch (err) {
        console.error("Registration error chain breakdown: ", err);
        alert("Registration Failed: " + err.message);
    } finally {
        if (registerBtn) {
            registerBtn.disabled = false;
            registerBtn.innerText = "💾 COMPLETE REGISTRATION";
        }
    }
};
function openPrivacyModal(){

    const modal =
        document.getElementById("privacyModal");

    modal.classList.remove("hidden");

    setTimeout(()=>{

        modal.classList.remove("opacity-0");

        const card = modal.firstElementChild;

        card.classList.remove(
            "opacity-0",
            "scale-95",
            "translate-y-4"
        );

    },10);

}

function closePrivacyModal(){

    const modal =
        document.getElementById("privacyModal");

    modal.classList.add("opacity-0");

    const card = modal.firstElementChild;

    card.classList.add(
        "opacity-0",
        "scale-95",
        "translate-y-4"
    );

    setTimeout(()=>{

        modal.classList.add("hidden");

    },300);

}

function openTermsModal(){

    const modal =
        document.getElementById("termsModal");

    modal.classList.remove("hidden");

    setTimeout(()=>{

        modal.classList.remove("opacity-0");

        const card = modal.firstElementChild;

        card.classList.remove(
            "opacity-0",
            "scale-95",
            "translate-y-4"
        );

    },10);

}

function closeTermsModal(){

    const modal =
        document.getElementById("termsModal");

    modal.classList.add("opacity-0");

    const card = modal.firstElementChild;

    card.classList.add(
        "opacity-0",
        "scale-95",
        "translate-y-4"
    );

    setTimeout(()=>{

        modal.classList.add("hidden");

    },300);

}
  window.handleClientLogout = async function() {
    try {
        // 1. Sign out of Firebase
        if (typeof auth !== 'undefined') {
            await auth.signOut();
        }
        
        // 2. Clear out any stored global variables or local storage
        window.currentAuthenticatedUserDoc = null;
        localStorage.removeItem('authenticatedClientId');
        localStorage.removeItem('authenticatedProId');
        
        // 3. Redirect back to the landing page
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error("Error during logout: ", error);
        alert("Failed to log out safely. Please try again.");
    }
};
let tempRegistrationData = {};
// --- PHASE 1: Transition to Security View ---
window.advanceToProSecurityPhase = function(e) {
    e.preventDefault(); // Stop the form from refreshing the page
    
    // 1. Check if at least one specialty is selected
    const checkboxes = document.querySelectorAll('input[name="proSpecialties"]:checked');
    if (checkboxes.length === 0) {
        alert("Please select at least one core technical specialty.");
        return;
    }

    // 2. Save Phase 1 data to our temporary object
    tempRegistrationData = {
        name: document.getElementById('proName').value.trim(),
        phone: document.getElementById('proPhone').value.trim(),
        country: document.getElementById('proCountry').value.trim(),
        state: document.getElementById('proState').value.trim(),
        city: document.getElementById('proCity').value.trim(),
        servicePreference: document.getElementById('servicePreference').value,
        specialties: Array.from(checkboxes).map(cb => cb.value)
    };

    // 3. Hide Phase 1, Show Phase 2
    document.getElementById('proInfoForm').classList.add('hidden');
    document.getElementById('proSecurityForm').classList.remove('hidden');
};

// --- PHASE 1.5: Optional Back Button ---
window.returnToPhaseOne = function() {
    document.getElementById('proSecurityForm').classList.add('hidden');
    document.getElementById('proInfoForm').classList.remove('hidden');
};

async function getCoordinatesFromAddress(addressText) {
    // Make sure mapboxgl is loaded and an access token exists
    const token = typeof mapboxgl !== 'undefined' ? mapboxgl.accessToken : null;
    if (!token) {
        console.warn("Mapbox access token missing. Skipping geocoding pipeline.");
        return null;
    }
    
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addressText)}.json?access_token=${token}&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
            // Mapbox returns coordinates as [lng, lat]
            return data.features.geometry.coordinates;
        }
        return null;
    } catch (err) {
        console.error("Geocoding fetch error:", err);
        return null;
    }
}
window.handleClientRegistration = async function(event) {

    event.preventDefault(); // Prevent form submission

    if (!document.getElementById("clientTermsAgree").checked) {

        alert("Please accept the Privacy Policy and Terms & Conditions.");

        return false;

    }

        
    const emailInput = document.getElementById('clientEmail');
    const passInput = document.getElementById('clientPassword');
    const nameInput = document.getElementById('clientName');
    const phoneInput = document.getElementById('clientPhone');
    const submitBtn = document.getElementById('clientRegSubmitBtn');
    
  const countrySelect = document.getElementById('country');
const countryText = countrySelect.options[countrySelect.selectedIndex].text;
const stateText = document.getElementById('state').value.trim();
const cityText = document.getElementById('city').value.trim();
const streetText = document.getElementById('street-address').value.trim();

// Read exact coordinates from map pinning system
const lat = parseFloat(document.getElementById('geoLat').value);
const lng = parseFloat(document.getElementById('geoLng').value);

const fullLocationText = streetText 
    ? `${streetText}, ${cityText}, ${stateText}, ${countryText}` 
    : `${cityText}, ${stateText}, ${countryText}`;
    
   

   
    
    if (!emailInput || !passInput) {
        console.error("Form elements missing");
        return; 
    }

    const email = emailInput.value.trim();
    const pass = passInput.value;
    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-slate-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> CREATING ACCOUNT...`;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
        await userCredential.user.sendEmailVerification();
        
        const CollegeIdModel = userCredential.user.uid.substring(0, 6).toUpperCase();
        
      await db.collection('client_users').doc(userCredential.user.uid).set({
    name: name,
    phone: phone,
    location: fullLocationText,
    street: streetText || "N/A",
    city: cityText || "Unknown",
    state: stateText || "Unknown",
    country: countryText,
    coordinates: [lng, lat], // Saved exactly for service distance maps!
    email: email,
    role: 'client',
    isVerified: false,
	clientId: CollegeIdModel,
	termsAccepted: true,
	termsAcceptedAt:firebase.firestore.FieldValue.serverTimestamp(),
    accountCreated: new Date().toISOString()
});
        // SYSTEM PANEL CROSSFADE TRANSITION ANIMATION
        const securityForm = document.getElementById('clientSecurityForm');
        const successPanel = document.getElementById('clientSuccessPanel');
        
        if (securityForm && successPanel) {
            securityForm.classList.add('opacity-0', 'transition-all', 'duration-300');
            setTimeout(() => {
                securityForm.classList.add('hidden');
                successPanel.classList.remove('hidden');
                successPanel.classList.add('opacity-100', 'scale-100', 'transition-all', 'duration-500');
            }, 300);
        }
        
        if (document.getElementById('clientSuccessDetails')) {
            document.getElementById('clientSuccessDetails').innerText = "Registration successful! Please check your email inbox to verify your account. Your Client ID is " + CollegeIdModel + ".";
        }

    } catch (error) {
        alert("Registration Failed: " + error.message);
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "💾 COMPLETE CLIENT REGISTRATION";
        }
    }
}

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9tamFiYWRhbjE5IiwiYSI6ImNtcXE0bXpuMDBiOGkycm91NjBwOHl6M3AifQ.Skgcjl5ytTVSUFEefgdwcg';
let registerMapInstance = null;
let registerMarker = null;

// Array of 50 major countries sorted alphabetically (with ISO-2 codes)
const countriesList = [
    { code: "PH", name: "Philippines" }, { code: "US", name: "United States" },
    { code: "CA", name: "Canada" }, { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" }, { code: "SG", name: "Singapore" },
    { code: "AE", name: "United Arab Emirates" }, { code: "SA", name: "Saudi Arabia" },
    { code: "JP", name: "Japan" }, { code: "KR", name: "South Korea" },
    { code: "DE", name: "Germany" }, { code: "FR", name: "France" },
    { code: "NZ", name: "New Zealand" }, { code: "MY", name: "Malaysia" },
    { code: "TH", name: "Thailand" }, { code: "ID", name: "Indonesia" },
    { code: "VN", name: "Vietnam" }, { code: "IN", name: "India" },
    { code: "HK", name: "Hong Kong" }, { code: "TW", name: "Taiwan" },
    { code: "QA", name: "Qatar" }, { code: "KW", name: "Kuwait" },
    { code: "OM", name: "Oman" }, { code: "BH", name: "Bahrain" },
    { code: "ES", name: "Spain" }, { code: "IT", name: "Italy" },
    { code: "NL", name: "Netherlands" }, { code: "CH", name: "Switzerland" },
    { code: "SE", name: "Sweden" }, { code: "NO", name: "Norway" },
    { code: "FI", name: "Finland" }, { code: "DK", name: "Denmark" },
    { code: "IE", name: "Ireland" }, { code: "AT", name: "Austria" },
    { code: "BE", name: "Belgium" }, { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" }, { code: "ZA", name: "South Africa" },
    { code: "EG", name: "Egypt" }, { code: "TR", name: "Turkey" },
    { code: "IL", name: "Israel" }, { code: "PK", name: "Pakistan" },
    { code: "BD", name: "Bangladesh" }, { code: "CN", name: "China" },
    { code: "RU", name: "Russia" }, { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" }, { code: "GR", name: "Greece" },
    { code: "MO", name: "Macau" }, { code: "MV", name: "Maldives" }
];

// Make sure this listener is active in your global script area
document.addEventListener('DOMContentLoaded', () => {
    // This forces the dropdown to fill up with the 50 countries
    populateCountriesDropdown();
});

function populateCountriesDropdown() {
    const countrySelect = document.getElementById('country');
    if (!countrySelect) return; 
    
    countrySelect.innerHTML = ''; // Clear out everything
    
    // 1. Create the default "Select Country" placeholder
    const placeholderOpt = document.createElement('option');
    placeholderOpt.value = "";
    placeholderOpt.innerText = "Select Country";
    placeholderOpt.disabled = true;  // Prevents them from picking it again
    placeholderOpt.selected = true;  // Makes it show up by default
    countrySelect.appendChild(placeholderOpt);
    
    // 2. Sort your global countriesList array alphabetically
    countriesList.sort((a, b) => a.name.localeCompare(b.name));

    // 3. Append the 50 sorted countries right below the placeholder
    countriesList.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.code;
        opt.innerText = c.name;
        countrySelect.appendChild(opt);
    });
}
window.onCountryChange = function() {
    const stateInput = document.getElementById('state');
    const cityInput = document.getElementById('city');
    
    if (stateInput) stateInput.value = '';
    if (cityInput) {
        cityInput.value = '';
        cityInput.disabled = true;
    }
};
// Mapbox Search Input Hook
async function searchLocationLevel(level) {
    const country = document.getElementById('country').value;
    const stateInput = document.getElementById('state');
    const cityInput = document.getElementById('city');
    const dropdown = document.getElementById(`${level}-dropdown`);
    
    let query = level === 'state' ? stateInput.value.trim() : cityInput.value.trim();
    if (query.length < 2) {
        dropdown.classList.add('hidden');
        return;
    }

    let types = level === 'state' ? 'region' : 'place';
    let contextQuery = level === 'city' ? `${stateInput.value} ` : '';
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(contextQuery + query)}.json?access_token=${MAPBOX_TOKEN}&country=${country}&types=${types}&limit=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.features || data.features.length === 0) {
            dropdown.classList.add('hidden');
            return;
        }

        dropdown.innerHTML = '';
        dropdown.classList.remove('hidden');

        data.features.forEach(feature => {
            const item = document.createElement('div');
            item.className = 'px-3 py-2 hover:bg-amber-500/10 hover:text-amber-400 cursor-pointer text-xs transition-colors';
            item.innerText = feature.text;
            
            item.onclick = () => {
                if (level === 'state') {
                    stateInput.value = feature.text;
                    cityInput.disabled = false;
                    cityInput.value = '';
                } else {
                    cityInput.value = feature.text;
                    
                    // Automatically update coordinates based on selected text item node
                    const [lng, lat] = feature.center;
                    document.getElementById('geoLng').value = lng;
                    document.getElementById('geoLat').value = lat;
                    
                    if (registerMapInstance) {
                        registerMapInstance.flyTo({ center: [lng, lat], zoom: 14 });
                        registerMarker.setLngLat([lng, lat]);
                    }
                    
                    document.getElementById('displayLat').innerText = lat.toFixed(4);
                    document.getElementById('displayLng').innerText = lng.toFixed(4);
                }
                dropdown.classList.add('hidden');
            };
            dropdown.appendChild(item);
        });
    } catch (err) {
        console.error("Geocode retrieval error: ", err);
    }
}

// Collapsible Map Control
function togglePinningMap() {
    const wrapper = document.getElementById('pinningMapWrapper');
    if (!wrapper) return;
    
    wrapper.classList.toggle('hidden');
    
    if (!wrapper.classList.contains('hidden') && !registerMapInstance) {
        setTimeout(initRegisterMap, 100); // give wrapper tiny time fraction to render display sizes
    }
}

function initRegisterMap() {
   mapboxgl.accessToken = 'pk.eyJ1Ijoiam9tamFiYWRhbjE5IiwiYSI6ImNtcXE0bXpuMDBiOGkycm91NjBwOHl6M3AifQ.Skgcjl5ytTVSUFEefgdwcg';
    
    let initialLng = parseFloat(document.getElementById('geoLng').value) || 121.1114;
    let initialLat = parseFloat(document.getElementById('geoLat').value) || 14.3142;

    registerMapInstance = new mapboxgl.Map({
        container: 'registerMap',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [initialLng, initialLat],
        zoom: 13
    });

    registerMarker = new mapboxgl.Marker({ color: '#f59e0b', draggable: true })
        .setLngLat([initialLng, initialLat])
        .addTo(registerMapInstance);

    registerMarker.on('dragend', () => {
        const lngLat = registerMarker.getLngLat();
        document.getElementById('geoLat').value = lngLat.lat;
        document.getElementById('geoLng').value = lngLat.lng;
        document.getElementById('displayLat').innerText = lngLat.lat.toFixed(4);
        document.getElementById('displayLng').innerText = lngLat.lng.toFixed(4);
    });
}

// Clear active dropdowns on window workspace body background clicks
document.addEventListener('click', (e) => {
    if (!e.target.closest('#state') && !e.target.closest('#state-dropdown')) {
        document.getElementById('state-dropdown')?.classList.add('hidden');
    }
    if (!e.target.closest('#city') && !e.target.closest('#city-dropdown')) {
        document.getElementById('city-dropdown')?.classList.add('hidden');
    }
});
function advanceToClientSecurityPhase(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    document.getElementById('clientInfoForm').classList.add('hidden');
    document.getElementById('clientSecurityForm').classList.remove('hidden');
    const phoneInput = document.getElementById('clientPhoneInputID'); 
    if (phoneInput && phoneInput.value) {
        initializeClientDashboard({ phone: phoneInput.value });
    }
}
function regressToClientInfoPhase() {
    document.getElementById('clientSecurityForm').classList.add('hidden');
    document.getElementById('clientInfoForm').classList.remove('hidden');
}

function advanceToProSecurityPhase(e) {
    if (e && e.preventDefault) e.preventDefault();
    document.getElementById('proInfoForm').classList.add('hidden');
    document.getElementById('proSecurityForm').classList.remove('hidden');
}

function regressToProInfoPhase() {
    document.getElementById('proSecurityForm').classList.add('hidden');
    document.getElementById('proInfoForm').classList.remove('hidden');
}

function openClientRegisterModal() {
    const modal = document.getElementById('clientRegisterModal');
    if (modal) {
        // 1. Reset inner wizard forms
        document.getElementById('clientInfoForm').classList.remove('hidden');
        document.getElementById('clientSecurityForm').classList.add('hidden');
        document.getElementById('clientSuccessPanel').classList.add('hidden');
        
        // 2. Un-hide modal base structural layout
        modal.classList.remove('hidden');
        
        // 3. Target the inner scale/fade card container element
        const modalContainer = modal.querySelector('.transform');
        
        // 4. Execute transition step
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            if (modalContainer) {
                modalContainer.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
                modalContainer.classList.add('opacity-100', 'scale-100', 'translate-y-0');
            }
        }, 10);
    }
}
function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);
    const icon = button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}
function closeClientRegisterModal() {
    const modal = document.getElementById('clientRegisterModal');
    if (modal) {
        // Target the inner container for the scale/fade animation
        const container = modal.querySelector('.transform');
        
        // Start fade out
        modal.classList.add('opacity-0');
        if (container) {
            container.classList.add('opacity-0', 'scale-95', 'translate-y-4');
        }
        
        // Wait for animation to finish before hiding completely
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}
function closeRegisterModals() {
    // Example for Client Modal closing
    const clientModal = document.getElementById('clientRegisterModal');
    if (clientModal) {
        const container = clientModal.querySelector('.transform');
        clientModal.classList.add('opacity-0');
        if (container) container.classList.add('opacity-0', 'scale-95', 'translate-y-4');
        setTimeout(() => clientModal.classList.add('hidden'), 300);
    }

    // Example for Pro Modal closing
    const proModal = document.getElementById('proRegisterModal');
    if (proModal) {
        const container = proModal.querySelector('.transform');
        proModal.classList.add('opacity-0');
        if (container) container.classList.add('opacity-0', 'scale-95', 'translate-y-4');
        setTimeout(() => proModal.classList.add('hidden'), 300);
    }
}

function openProModal() {
    const modal = document.getElementById('proRegisterModal');
    if (modal) {
        modal.classList.remove('hidden');
        const modalContainer = modal.querySelector('.transform');
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            if (modalContainer) {
                modalContainer.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
                modalContainer.classList.add('opacity-100', 'scale-100', 'translate-y-0');
            }
        }, 10);
    }
    
    if (typeof window.loadProRegistrationLocations === 'function') {
        window.loadProRegistrationLocations();
    }
}
function closeProModal() {
    const modal = document.getElementById('proRegisterModal');
    if (modal) {
        const container = modal.querySelector('.transform');
        
        // 1. Fire reverse fade and slide animations
        modal.classList.add('opacity-0');
        if (container) {
            container.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            container.classList.add('opacity-0', 'scale-95', 'translate-y-4');
        }
        
        // 2. Wait 300ms for the animation to finish before hiding structural block
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        const container = modal.querySelector('.transform');
        
        // 1. Fire reverse fade and slide animations
        modal.classList.add('opacity-0');
        if (container) {
            container.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            container.classList.add('opacity-0', 'scale-95', 'translate-y-4');
        }
        
        // 2. Wait 300ms for the animation to finish before hiding structural block
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}
function toggleServiceAccordion(serviceId) {
    const panel = document.getElementById(`desc-${serviceId}`);
    const arrowIcon = document.getElementById(`arrow-${serviceId}`);

    if (panel && arrowIcon) {
        // Check if the panel is currently closed (max-height is 0)
        const isClosed = panel.style.maxHeight === '0px' || !panel.style.maxHeight;
        
        // Target all other service panels to close them (Optional: Creates a true accordion)
        document.querySelectorAll('[id^="desc-service-"]').forEach(otherPanel => {
            if (otherPanel !== panel) {
                otherPanel.style.maxHeight = '0px';
                otherPanel.classList.remove('p-6', 'opacity-100');
                otherPanel.classList.add('p-0', 'opacity-0');
                const otherId = otherPanel.id.replace('desc-', '');
                const otherArrow = document.getElementById(`arrow-${otherId}`);
                if (otherArrow) otherArrow.classList.remove('rotate-180');
            }
        });

        if (isClosed) {
            // Set max-height to its exact internal content size dynamically
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.classList.remove('p-0', 'opacity-0');
            panel.classList.add('p-6', 'opacity-100');
            arrowIcon.classList.add('rotate-180');
        } else {
            // Drop back down to zero
            panel.style.maxHeight = '0px';
            panel.classList.remove('p-6', 'opacity-100');
            panel.classList.add('p-0', 'opacity-0');
            arrowIcon.classList.remove('rotate-180');
        }
    }
}
// Add this function to your script
async function loadAccountInformation(uid) {
    try {
        const doc = await db.collection('client_users').doc(uid).get();
        if (doc.exists) {
            const userData = doc.data();
            console.log("Data successfully fetched");

            // 1. Fix the name field (use 'name', not 'fullName')
            const nameSpan = document.getElementById('dashClientName');
            if (nameSpan) {
                nameSpan.textContent = userData.name || 'Client';
            }

            // 2. Fix the ID field (use 'clientId' from the DB object)
            const idSpan = document.getElementById('metaId');
            if (idSpan) {
                idSpan.textContent = userData.clientId || 'N/A';
                idSpan.setAttribute('data-full-id', uid);
            }
            
            // 3. Fix the Email
            const emailSpan = document.getElementById('metaEmail');
            if (emailSpan) emailSpan.textContent = userData.email || 'N/A';
            
            // 4. Fix the Phone
            const phoneSpan = document.getElementById('metaPhone');
            if (phoneSpan) phoneSpan.textContent = userData.phone || 'N/A';

            // 5. Fix the Location (use 'location', not 'address')
            const locSpan = document.getElementById('metaLocation');
            if (locSpan) locSpan.textContent = userData.location || 'N/A';
			const preview =
    document.getElementById("clientAvatarPreview");

const placeholder =
    document.getElementById("clientAvatarPlaceholder");

if(doc.data().avatarUrl){

    preview.src =
        doc.data().avatarUrl;

    preview.classList.remove("hidden");

    placeholder.classList.add("hidden");

    localStorage.setItem(
        "clientAvatarUrl",
        doc.data().avatarUrl
    );

}
        }
    } catch (error) {
        console.error("Error loading account info:", error);
    }
}
    const clientStatusStyles = {
        "new": "bg-amber-500/10 border-amber-500/40 text-amber-500",
        "accepted": "bg-emerald-950/80 border-emerald-800 text-emerald-400",
        "diagnostic": "bg-cyan-950/60 border-cyan-500/40 text-cyan-400", 
        "waiting for parts": "bg-indigo-950 border-indigo-900 text-indigo-400",
        "complete": "bg-slate-900 border-slate-800 text-slate-500",
        "cancel": "bg-red-950 border-red-900 text-red-400"
    };
    function gatherDOMClientId() {
        const fullClientId = user.uid; // Or wherever you fetch your full ID from
const sixDigitId = fullClientId.substring(0, 6).toUpperCase();

const idSpan = document.getElementById('metaId');
if (idSpan) {
    idSpan.textContent = sixDigitId;
}
        return null;
    }
	function setClientIdDisplay(fullId) {
    const idSpan = document.getElementById('metaId');
    if (idSpan) {
        idSpan.textContent = fullId.substring(0, 6).toUpperCase();
        idSpan.setAttribute('data-full-id', fullId); // Store the real ID safely
    }
}

// When needing to retrieve it for queries
function gatherDOMClientId() {
    const idSpan = document.getElementById('metaId');
    // Always return the full ID from the attribute, not the truncated text
    return idSpan ? idSpan.getAttribute('data-full-id') : null;
}
    async function cancelClientTicket(docId) {
        if (!docId) return;
        const userConfirmed = confirm("Are you sure you want to cancel this service ticket?");
        if (!userConfirmed) return;

        try {
            await db.collection('client_tickets').doc(docId).update({
                status: 'cancel'
            });
            alert("Ticket successfully cancelled.");
            const currentId = gatherDOMClientId();
            if (currentId) loadClientTicketHistory(currentId);

        } catch (error) {
            console.error("Critical error while modifying ticket execution status:", error);
            alert("Failed to cancel ticket. Please check connection pipelines.");
        }
    }

    /**
     * Client Request Telemetry Stream - Query Isolated By Client ID
     */
async function loadClientTicketHistory(explicitClientId) {
    let targetId = explicitClientId || gatherDOMClientId();

    const loadingEl = document.getElementById('clientTicketsLoading');
    const emptyEl = document.getElementById('clientTicketsEmpty');
    const gridEl = document.getElementById('clientTicketsGrid');
    if (!loadingEl || !emptyEl || !gridEl) return;
    
    if (!targetId) {
        loadingEl.innerHTML = `
            <div class="text-slate-500 text-xs font-mono border border-slate-900 bg-slate-950 px-4 py-3 rounded-lg inline-block">
                🔒 STANDBY: Awaiting authenticated credentials pipeline activation...
            </div>`;
        return;
    }
    
    loadingEl.classList.remove('hidden');
    emptyEl.classList.add('hidden');
    gridEl.classList.add('hidden');
   
    // Ensure the parent container uses a straight vertical list view instead of a responsive grid
    gridEl.className = "flex flex-col gap-3";

    try {
        console.log(`Base Query: [clientId == ${targetId}]`);
        
        const snapshot = await db.collection('client_tickets')
            .where('clientId', '==', String(targetId)) 
            .get();
            
        loadingEl.classList.add('hidden');
        gridEl.innerHTML = '';
        
        if (snapshot.empty) {
            emptyEl.classList.remove('hidden');
            return;
        }
        
        let clientTickets = [];
        snapshot.forEach(doc => {
            clientTickets.push({ docId: doc.id, ...doc.data() });
        });
        
        // Sort tickets by timestamp (newest first)
        clientTickets.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));

        clientTickets.forEach(ticket => {
            const badgeStyle = clientStatusStyles[ticket.status] || "bg-slate-900 border-slate-800 text-slate-400";
            const ticketNum = ticket.ticketId || ticket.id || 'N/A';
            
            // --- 0. PRE-FORMAT DATE FOR CLEANER HTML ---
            let formattedDate = 'Active Log';
            if (ticket.createdAt) {
                if (typeof ticket.createdAt.toDate === 'function') {
                    formattedDate = ticket.createdAt.toDate().toLocaleString('en-US', { 
                        month: 'short', day: 'numeric', year: 'numeric',
                        hour: 'numeric', minute: '2-digit', hour12: true 
                    });
                } else {
                    formattedDate = ticket.createdAt;
                }
            }

            // --- 1. HANDLE CANCEL BUTTON MARGINS ---
            let clientControlActionMarkup = '';
            if (ticket.status === 'new' || ticket.status === 'pending') {
                clientControlActionMarkup = `
                    <div class="mt-4 pt-3 border-t border-slate-900/60 flex justify-end">
                        <button 
                            onclick="cancelClientTicket('${ticket.docId}')" 
                            class="px-3 py-1.5 text-[10px] uppercase font-mono font-bold bg-red-950/40 border border-red-900/60 hover:bg-red-900/40 text-red-400 rounded-md transition-all cursor-pointer">
                            🚫 Cancel Ticket
                        </button>
                    </div>
                `;
            }
            
          // --- 2. DYNAMICALLY RENDER ATTACHED MEDIA LIST (WITH THUMBNAIL ZOOM) ---
let mediaAttachmentsMarkup = '';
if (ticket.attachments && Array.isArray(ticket.attachments) && ticket.attachments.length > 0) {
    let attachmentItems = '';
    
    // Safely escape the attachments array using URI encoding to protect against quote breaking
    const safeAttachmentsData = encodeURIComponent(JSON.stringify(ticket.attachments));
    
    ticket.attachments.forEach((file, index) => {
        const isVideo = file.type === 'video';
        
        // Pass the safe encoded string as a clean text parameter
        const zoomAction = `onclick="window.openGlobalMediaZoom('${file.url}', '${file.type}', ${index}, '${safeAttachmentsData}')"`;

        attachmentItems += `
            <div ${zoomAction} class="relative group w-14 h-14 rounded-md border border-slate-800 bg-slate-900 flex items-center justify-center cursor-pointer overflow-hidden transition-all hover:border-cyan-500/50">
                ${isVideo ? 
                    `<span class="text-lg z-10 text-slate-300">🎥</span>` : 
                    `<img src="${file.url}" class="w-full h-full object-cover transition-all" alt="Thumbnail">`
                }
                <div class="absolute inset-0 bg-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
        `;
    });

    mediaAttachmentsMarkup = `
        <div class="mt-4">
            <span class="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block mb-1.5">Attachments (${ticket.attachments.length})</span>
            <div class="flex flex-wrap gap-1.5 pr-1">
                ${attachmentItems}
            </div>
        </div>
    `;
}

            // --- 3. HANDLE ENGINEER ASSIGNMENTS ---
            let proAssignmentMarkup = '';
            if (ticket.acceptedById) {
                proAssignmentMarkup = `
                    <div class="mt-4 pt-3 border-t border-slate-900 flex flex-col gap-2">
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="text-[9px] text-slate-500 font-mono uppercase block tracking-wider">Assigned Tech</span>
                                <span class="text-xs font-bold text-cyan-400">${ticket.acceptedByName || 'Field Professional'}</span>
                            </div>
                            <span class="text-[9px] bg-cyan-950/40 border border-cyan-900/60 px-1.5 py-0.5 rounded text-cyan-400 font-mono font-bold">
                                ID: ${ticket.acceptedById.substring(0,6).toUpperCase()}
                            </span>
                        </div>
                        
                        <div class="flex items-start gap-1.5 text-[10px] font-mono bg-cyan-950/10 border border-cyan-900/30 p-2 rounded-lg text-slate-300">
                            <i class="fa-solid fa-map-location-dot text-cyan-500 mt-0.5 text-xs"></i>
                            <div>
                                <strong class="block text-cyan-500/70 uppercase tracking-widest text-[8px] mb-0.5">Workshop Base</strong>
                                <span class="leading-relaxed whitespace-pre-wrap text-[10px]">${ticket.proLocation || 'Location details pending.'}</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (ticket.status !== 'cancel') {
                proAssignmentMarkup = `
                    <div class="mt-4 pt-3 border-t border-slate-900 flex items-center gap-2 text-slate-500 font-mono text-[10px]">
                        <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-500/70 animate-pulse"></span>
                        Finding the right expert...
                    </div>
                `;
            }

            // --- 4. CONSTRUCT THE EXPANDABLE LIST ITEM MARKUP ---
            const cardHTML = `
                <details class="group bg-slate-950/40 border border-slate-900 hover:border-slate-800 rounded-lg overflow-hidden transition-colors [&_summary::-webkit-details-marker]:hidden">
                    
                    <summary class="flex items-center justify-between p-3 cursor-pointer bg-slate-900/30 hover:bg-slate-800/40 transition-colors list-none select-none">
                        <div class="flex items-center gap-2.5">
                            <span class="text-[11px] font-bold font-mono text-amber-500">
                                # ${ticketNum}
                            </span>
                            <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 border rounded uppercase tracking-wider ${badgeStyle}">
                                ${ticket.status === 'cancel' ? 'CANCELLED' : ticket.status}
                            </span>
                        </div>

                        <div class="flex items-center gap-3">
                            <span class="text-[10px] text-slate-500 font-mono hidden sm:inline-block">${formattedDate}</span>
                            <div class="w-6 h-6 flex items-center justify-center rounded bg-slate-800/40 group-hover:bg-slate-700/50 transition-colors">
                                <svg class="w-3 h-3 text-slate-400 transform group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </summary>
                    
                    <div class="p-4 border-t border-slate-900/80 bg-slate-950/60 text-[11px] space-y-3">
                        <div class="grid grid-cols-2 gap-4 border-b border-slate-900/60 pb-3 mb-3">
                            <div>
                                <span class="block text-slate-500 uppercase tracking-wider font-semibold text-[9px] mb-0.5">Category</span>
                                <span class="text-slate-300 font-mono font-bold">${ticket.category || 'General'}</span>
                            </div>
							<div>
        <span class="block text-slate-500 uppercase tracking-wider font-semibold text-[9px] mb-0.5">Delivery</span>
        <span class="text-slate-300 font-mono font-bold text-emerald-400">${ticket.deliveryOption || ticket.serviceMode || 'Not Specified'}</span>
    </div>
                            <div class="sm:hidden"> <span class="block text-slate-500 uppercase tracking-wider font-semibold text-[9px] mb-0.5">Requested</span>
                                <span class="text-slate-300 font-mono font-bold">${formattedDate}</span>
                            </div>
                        </div>

                        <div>
                            <span class="block text-slate-500 uppercase tracking-wider font-semibold text-[9px] mb-1">Request Details</span>
                            <div class="bg-slate-900/40 border border-slate-900/80 rounded-lg p-2.5 text-slate-300 leading-relaxed font-sans max-h-24 overflow-y-auto whitespace-pre-wrap">
                                ${ticket.jobDetails || ticket.description || 'No additional details documented.'}
                            </div>
                        </div>
                        
                        ${mediaAttachmentsMarkup}
                        ${proAssignmentMarkup}
                        ${clientControlActionMarkup}
                    </div>
                </details>
            `;
            
            gridEl.insertAdjacentHTML('beforeend', cardHTML);
        });

        gridEl.classList.remove('hidden');

    } catch (error) {
        console.error("Critical client telemetry pipeline fault:", error);
        if (loadingEl) {
            loadingEl.innerHTML = `<span class="text-red-500 font-bold">🔴 DATABASE ERROR:</span> Failed to stream link data lines.`;
        }
    }
}

window.currentGallery = [];
window.currentGalleryIndex = 0;

// OPENER: Called from your dynamic HTML card system
// OPENER: Called from your dynamic HTML card system
window.openGlobalMediaZoom = function(mediaUrl, type, index, encodedAttachments) {
    // Decode the safe URI string back into a functional JavaScript array
    if (encodedAttachments) {
        try {
            window.currentGallery = JSON.parse(decodeURIComponent(encodedAttachments));
        } catch (e) {
            console.error("Error parsing gallery array:", e);
            window.currentGallery = [];
        }
    } else {
        window.currentGallery = [];
    }

    window.currentGalleryIndex = index !== undefined ? Number(index) : 0;

    const modal = document.getElementById('globalMediaZoomModal');
    const imgTarget = document.getElementById('zoomModalImage');
    const videoTarget = document.getElementById('zoomModalVideo');
    
    if (!modal || !imgTarget || !videoTarget) return;

    const item = window.currentGallery[window.currentGalleryIndex] || { url: mediaUrl, type: type };

    if (item.type === 'video') {
        videoTarget.src = item.url;
        videoTarget.classList.remove('hidden');
        imgTarget.classList.add('hidden');
        imgTarget.src = ""; 
    } else {
        imgTarget.src = item.url;
        imgTarget.classList.remove('hidden');
        videoTarget.classList.add('hidden');
        videoTarget.src = "";
        if (typeof videoTarget.pause === "function") videoTarget.pause();
    }

    modal.classList.remove('hidden');
    modal.style.opacity = "1";
};
// CLOSER: This is what your "X" button or background click should call
window.closeGlobalMediaZoom = function() {
    const modal = document.getElementById('globalMediaZoomModal');
    const videoTarget = document.getElementById('zoomModalVideo');
    
    if (!modal) return;

    modal.style.opacity = "0";
    if (videoTarget && typeof videoTarget.pause === "function") videoTarget.pause();

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 250);
};

window.currentGallery = [];
window.currentGalleryIndex = 0;

window.navigateGallery = function(direction) {
    // Debugging verification checkpoint
    console.log("Current Gallery Length:", window.currentGallery.length);
    
    if (!window.currentGallery || window.currentGallery.length === 0) {
        console.error("Gallery is empty! Did you open the modal correctly?");
        return;
    }

    // Step the index counter forward or backward cleanly
    window.currentGalleryIndex += direction;

    // Standard cyclical boundary verification loops
    if (window.currentGalleryIndex >= window.currentGallery.length) window.currentGalleryIndex = 0;
    if (window.currentGalleryIndex < 0) window.currentGalleryIndex = window.currentGallery.length - 1;

    // Fetch the structural profile of the target index offset 
    const item = window.currentGallery[window.currentGalleryIndex];
    console.log("Navigating to index:", window.currentGalleryIndex, item);

    const imgTarget = document.getElementById('zoomModalImage');
    const videoTarget = document.getElementById('zoomModalVideo');
    if (!imgTarget || !videoTarget) return;

    // Re-render display configuration maps 
    if (item.type === 'video') {
        videoTarget.src = item.url;
        videoTarget.classList.remove('hidden');
        imgTarget.classList.add('hidden');
        imgTarget.src = "";
    } else {
        imgTarget.src = item.url;
        imgTarget.classList.remove('hidden');
        videoTarget.classList.add('hidden');
        videoTarget.src = "";
        if (typeof videoTarget.pause === "function") videoTarget.pause();
    }
};

function handleLightboxEscapeKey(e) {
    if (e.key === "Escape") {
        window.closeGlobalMediaZoom();
    }
}

// Function 1: Open and close the main modal
function toggleSupportModal(isOpen) {
    const modal = document.getElementById('supportModal');
    const modalContainer = modal.querySelector('div.relative');
    const foundersNote = document.getElementById('foundersNoteCard');

    if (isOpen) {
        resetSupportView(); 
        
        modal.classList.remove('hidden');
        
        // Force layout engine refresh to catch starting animation point
        if (foundersNote) { void foundersNote.offsetHeight; }
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContainer.classList.remove('scale-95');
            modalContainer.classList.add('scale-100');
        }, 10);

        if (foundersNote) {
            setTimeout(() => {
                foundersNote.classList.remove('opacity-0', 'translate-y-4');
                foundersNote.classList.add('opacity-100', 'translate-y-0');
            }, 200); 
        }
    } else {
        modal.classList.add('opacity-0');
        modalContainer.classList.remove('scale-100');
        modalContainer.classList.add('scale-95');
        
        if (foundersNote) {
            foundersNote.classList.add('opacity-0', 'translate-y-4');
            foundersNote.classList.remove('opacity-100', 'translate-y-0');
        }
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 500);
    }
}

function toggleRoadmapModal(isOpen) {
    const modal = document.getElementById('roadmapModal');
    const modalContainer = modal.querySelector('.transform');
    const items = modal.querySelectorAll('.roadmap-item');

    if (isOpen) {
        modal.classList.remove('hidden');
        
        // REFLOW FIX: Forces browser to recognize individual invisible items on first click
        if (modalContainer) { void modalContainer.offsetHeight; }

        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContainer.classList.remove('scale-95');
            modalContainer.classList.add('scale-100');
        }, 10);

        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('opacity-0', 'translate-y-4');
                item.classList.add('opacity-100', 'translate-y-0');
            }, 200 + (index * 120)); 
        });

    } else {
        modal.classList.add('opacity-0');
        modalContainer.classList.remove('scale-100');
        modalContainer.classList.add('scale-95');
        
        items.forEach((item) => {
            item.classList.add('opacity-0', 'translate-y-4');
            item.classList.remove('opacity-100', 'translate-y-0');
        });

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}
function showSupportQR(type) {
    const selectionView = document.getElementById('supportSelectionView');
    const qrView = document.getElementById('supportQRView');
    
    // Fade out/scale down selection deck
    selectionView.classList.remove('opacity-100', 'scale-100');
    selectionView.classList.add('opacity-0', 'scale-95');

    const qrImage = document.getElementById('qrImage');
    const qrTitle = document.getElementById('qrTitle');
    const qrDescription = document.getElementById('qrDescription');
    const qrLogoContainer = document.getElementById('qrLogoContainer'); // Get the new container

    if (type === 'paypal') {
      qrTitle.innerText = 'International';
        qrDescription.innerText = 'Scan with your PayPal app.';
        qrImage.src = 'SupportUsPP.png';
        
        // Inject single PayPal logo
        qrLogoContainer.innerHTML = `
            <img src="PayPal_Logo.png" alt="PayPal" class="h-10 w-auto object-contain brightness-110" />
        `;
    } else if (type === 'local') {
        qrTitle.innerText = 'Local Transfer';
        qrDescription.innerText = 'or your preferred Local Bank';
        qrImage.src = 'SupportUsCS_InstaPay.png';
        
        // Inject GCash, Maya, and QR Ph logos inline together
        qrLogoContainer.innerHTML = `
            <div class="flex items-center gap-1 bg-slate-950/40 px-2 py-1 rounded-md border border-slate-800/60">
                <img src="Gcash_logo.png" alt="GCash" class="h-8 w-auto object-contain rounded-sm" />
                <img src="Maya_Logo.png" alt="Maya" class="h-10 w-auto object-contain rounded-sm" />
                <div class="h-9 w-[1px] bg-slate-800"></div>
                <img src="QR-Ph-InstaPay.png" alt="QR Ph" class="h-9 w-auto object-contain" />
            </div>
        `;
    }

    // Mid-transition view swap with layout reflow
    setTimeout(() => {
        selectionView.classList.add('hidden');
        qrView.classList.remove('hidden');
        
        qrView.offsetHeight; // Force reflow

        qrView.classList.remove('opacity-0', 'scale-95');
        qrView.classList.add('opacity-100', 'scale-100');
    }, 200);
}
function resetSupportView() {
    const selectionView = document.getElementById('supportSelectionView');
    const qrView = document.getElementById('supportQRView');

    // 1. Shrink and fade out the active QR view
    qrView.classList.remove('opacity-100', 'scale-100');
    qrView.classList.add('opacity-0', 'scale-85');

    // 2. Swap back to the selection deck mid-way
    setTimeout(() => {
        qrView.classList.add('hidden');
        selectionView.classList.remove('hidden');
        
        selectionView.offsetHeight; // Force reflow

        // 3. Bring selection menu back into full view
        selectionView.classList.remove('opacity-0', 'scale-85');
        selectionView.classList.add('opacity-100', 'scale-100');
    }, 200);
}
function refreshDashboard() {
    console.log("Refresh triggered...");

    // 1. Scroll logic (Keep your existing array)
    const containerIds = ['leftSidebar', 'centerFeedSection', 'workDashboardContainer','profileSidebar','historyLogsContainer'];
    containerIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. Smart Refresh Routing
    const isClientDashboard = document.getElementById('clientTicketsGrid');
    const isProDashboard = document.getElementById('liveTicketsQueue');

    if (isClientDashboard) {
        // We are on the Client page. Only refresh the Client history.
        const currentUser = firebase.auth().currentUser;
        if (currentUser && typeof loadClientTicketHistory === 'function') {
            loadClientTicketHistory(currentUser.uid);
        }
    }

    if (isProDashboard) {
        // We are on the Pro page. Refresh the Pro queue.
        const updateFunctions = ['renderEngineeringFeed', 'listenToIncomingTickets', 'loadProfessionalProfile'];
        updateFunctions.forEach(fnName => {
            if (typeof window[fnName] === 'function') window[fnName]();
        });
    }
}
 // Function to update the Pro's profile copier copies line persistent copy persistent copy on every single persistent line copy:
// ========================================================
async function fetchProProfileById(proId) {
    try {
        const docSnapshot = await db.collection('pro_registers').doc(proId).get();

        if (!docSnapshot.exists) {
            alert("Account configuration profile missing in registry database.");
            handleProLogout();
            return;
        }

        currentProUser = {
            id: docSnapshot.id,
            ...docSnapshot.data()
        };

       const structuralUniqueId = currentProUser.id;
        const displayProName = currentProUser.name || currentProUser.username || "Unknown Engineer";
        
        document.getElementById('proNameDisplay').textContent = displayProName;
        document.getElementById('proIdDisplay').textContent = structuralUniqueId.substring(0, 8).toUpperCase();
        
        // ========================================================
        // 🟢 RESTORED: Your missing details mapping
        // (Make sure these IDs match the IDs in your HTML file!)
        // ========================================================
        document.getElementById('proEmailDisplay').textContent = currentProUser.email || "---";
        document.getElementById('proPhoneDisplay').textContent = currentProUser.phone || "---";
        document.getElementById('proLocDisplay').textContent = currentProUser.location || "---";
         document.getElementById('proSetupDisplay').textContent = currentProUser.serviceSetup || "---";
        // Map the specialties array nicely
        if (currentProUser.specialties && Array.isArray(currentProUser.specialties)) {
            document.getElementById('proSpecialtiesDisplay').textContent = currentProUser.specialties.join(", ");
        } else {
            document.getElementById('proSpecialtiesDisplay').textContent = currentProUser.specialties || "---";
        }

        // ========================================================
        // 🟢 PERSISTENT AVATAR & HIDE STATUS LOG
        // ========================================================
        if (currentProUser.avatarUrl && currentProUser.avatarUrl.trim() !== "") {
            const previewImg = document.getElementById('profileAvatarPreview');
            const placeholder = document.getElementById('profileAvatarPlaceholder');
            const statusLog = document.getElementById('uploadStatusLog');

            // Inject the saved URL
            previewImg.src = currentProUser.avatarUrl;
            
            // Unhide the image and hide the "PRO" text
            previewImg.classList.remove('hidden');
            placeholder.classList.add('hidden');
            
            // Hides the "Upload Your Profile Photo" text completely
            if (statusLog) statusLog.style.display = 'none'; 
        }
        
        // Ensure our local copie Copies copies copier copiers copies copier copying persistent copy copier copying copying line copies copie lines copy is active with the newest information copier copying copiar copie line copies copies copying copier copies copies copiar copie copying copying copier copiers copies copie copying copier copiers copier lines copie line copying copiar copies copying copiar copier copies copiers copying copies copy.
        localStorage.setItem('authenticatedProUser', JSON.stringify(currentProUser));

        listenToAcceptedTickets(structuralUniqueId);
        listenToCompletedHistory(structuralUniqueId);
    } catch (error) {
        console.error("Critical Profile Unique lookup failed:", error);
    }
}

async function handleProfilePhotoUpload() {
    // 1. Grab the file directly from the unique ID
    const fileInput = document.getElementById('hiddenFileInput');

    // If the user clicked "Cancel" in the file picker, just stop silently
    if (!fileInput.files || fileInput.files.length === 0) {
        console.log("No file selected. User canceled the prompt.");
        return; 
    }

   const targetFile = fileInput.files[0];
    console.log(targetFile);
console.log(targetFile.name);
console.log(targetFile.size);
console.log(targetFile.type);
    // 2. Load the User from Local Storage
    const localUserData = localStorage.getItem('authenticatedProUser'); 
    if (localUserData) {
        currentProUser = JSON.parse(localUserData); 
    }

    if (!currentProUser || !currentProUser.id) {
        console.error("Fault: Pro User ID is missing from local storage.");
        alert("Session sync error. Please log out and log back in.");
        return;
    }

    // 3. Size Validation (Under 2MB)
    if (targetFile.size > 2 * 1024 * 1024) {
        alert("Operation Intercept: Profile assets must be strictly under 2MB.");
        fileInput.value = ""; 
        return;
    }

    const statusLog = document.getElementById('uploadStatusLog');
    const previewImg = document.getElementById('profileAvatarPreview');
    const placeholder = document.getElementById('profileAvatarPlaceholder');

    statusLog.textContent = "Uploading Photo...";
    statusLog.className = "text-[10px] font-mono text-amber-500 animate-pulse";
    statusLog.style.display = 'block';

    try {
        // 4. Send the image to Firebase Storage
        const storageRef = firebase.storage().ref(`pro_avatars/${currentProUser.id}/avatar_${Date.now()}`);
        const snapshot = await storageRef.put(targetFile);
        
        statusLog.textContent = "💾 Saving your upload...";
        const photoUrl = await snapshot.ref.getDownloadURL();

        // 5. THE FIX: Save to Firestore using SET with MERGE
      
        await db.collection('pro_registers').doc(currentProUser.id).set({
            avatarUrl: photoUrl
        }, { merge: true });

        // 6. Update the UI
        previewImg.src = photoUrl;
        previewImg.classList.remove('hidden');
        placeholder.classList.add('hidden');

        // Update active run-time storage states
        currentProUser.avatarUrl = photoUrl;
        localStorage.setItem('authenticatedProUser', JSON.stringify(currentProUser));

        statusLog.textContent = "✅ Profile Photo Uploaded.";
        statusLog.className = "text-[10px] font-mono text-emerald-400";
        
        setTimeout(() => {
            statusLog.style.display = 'none';
        }, 2000);

    } catch (error) {
        console.error("Critical Failure committing asset upload stream:", error);
        statusLog.textContent = "❌ Database dropped asset write stream.";
        statusLog.className = "text-[10px] font-mono text-rose-500";
    }
}
function openAvatarViewer(){

    const preview=document.getElementById("profileAvatarPreview");

    if(!preview.src) return;

    document.getElementById("avatarViewerImg").src=preview.src;

    document
        .getElementById("avatarViewer")
        .classList.remove("hidden");

}

function closeAvatarViewer(){

    document
        .getElementById("avatarViewer")
        .classList.add("hidden");

}
function showPhotoOptions(){

    document
        .getElementById("photoOptionsModal")
        .classList.remove("hidden");

}

function closePhotoOptions(){

    document
        .getElementById("photoOptionsModal")
        .classList.add("hidden");

}
function openCamera(){

    const input=document.getElementById("hiddenFileInput");

    input.setAttribute("capture","environment");

    input.click();

    closePhotoOptions();

}
function openGallery(){

    const input=document.getElementById("hiddenFileInput");

    input.removeAttribute("capture");

    input.click();

    closePhotoOptions();

}

// Global Window Lightbox Context Handlers

function handleLightboxEscapeKey(e) {
    if (e.key === "Escape") window.closeGlobalMediaZoom();
}
 // Global scope placeholder tracking our target attachment binary data
// Global placeholder to store the selected file object globally
window.targetSelectedFileObj = null;

function previewSelectedMedia(event) {
    console.log("Media selection event fired:", event);
    
    // Robust parsing that handles both direct input pointers and event paths
    let inputSource = null;
    if (event.target) {
        inputSource = event.target;
    } else if (event.files) {
        inputSource = event;
    } else {
        inputSource = document.getElementById('postHardwareFileInput');
    }

    if (!inputSource || !inputSource.files || inputSource.files.length === 0) {
        console.warn("Media selection canceled or no file stream found.");
        return;
    }

    // Capture the file context
    const selectedFile = inputSource.files[0];

window.targetSelectedFileObj = selectedFile;

    console.log("File loaded into local state:", selectedFile.name, "Type:", selectedFile.type);

    const previewContainer = document.getElementById('mediaAttachmentPreview');
    const nameLabel = document.getElementById('previewFileName');
    const iconLabel = document.getElementById('previewIcon');

    // Update UI status chip text content securely
    if (nameLabel) {
        nameLabel.innerText = selectedFile.name;
    } else {
        // Fallback fallback pointer in case your original layout used a different ID tag structure
        const genericLabel = document.querySelector('#mediaAttachmentPreview span') || document.getElementById('mediaAttachmentPreview');
        if (genericLabel && genericLabel.innerText.includes('undefined')) {
            genericLabel.innerHTML = `<i class="fa-solid fa-image text-amber-400 mr-2"></i> ${selectedFile.name}`;
        }
    }
    
    // Dynamically adjust icon style
    if (iconLabel && selectedFile.type) {
        if (selectedFile.type.startsWith('video/')) {
            iconLabel.className = "fa-solid fa-video text-cyan-400 mr-2";
        } else {
            iconLabel.className = "fa-solid fa-image text-amber-400 mr-2";
        }
    }

    // Reveal preview bar container element layout
    if (previewContainer) {
        previewContainer.classList.remove('hidden');
        // If your preview wrapper contains an explicit utility block, make sure it overrides hidden states
        previewContainer.style.setProperty('display', 'flex', 'important');
    }
}

function clearSelectedMedia() {
    window.targetSelectedFileObj = null;
    const fileInput = document.getElementById('postHardwareFileInput');
    if (fileInput) fileInput.value = "";
    
    const previewContainer = document.getElementById('mediaAttachmentPreview');
    if (previewContainer) {
        previewContainer.classList.add('hidden');
        previewContainer.style.display = 'none';
    }
}
// --- UPDATED HANDLER TO MANAGE FIREBASE STORAGE TRANSFERS ---
// =====================================================================
// 2. UNIFIED POST CREATOR (Smart function for both Pros and Clients)
// =====================================================================
async function handleCreatePost(event) {
    event.preventDefault();
    
    // Check if the dropdown exists to determine the environment
    const typeSelector = document.getElementById('postTypeSelector');
    const isClientDashboard = typeSelector !== null;

    let postAuthorId = "";
    let postAuthorName = "";
    let selectedPostType = "";
	let uploadedAttachments = [];
	
    // A. Setup Variables Based on Environment
    if (isClientDashboard) {
        // --- CLIENT LOGIC ---
        postAuthorId = localStorage.getItem('authenticatedClientId');
        const savedClientEmail = localStorage.getItem('authenticatedClientEmail');
        const savedClientName = localStorage.getItem('dashClientName');
        
        if (!postAuthorId) {
            alert("Authentication missing. Cannot transmit broadcast payload.");
            return;
        }
        
       postAuthorName = savedClientName || savedClientEmail || "Client User";
selectedPostType = typeSelector.value;

authorAvatar =
    localStorage.getItem("clientAvatarUrl") || "";
        
        if (!selectedPostType) {
            alert("Please select a post type (Question or Testimonial) before Posting");
            return;
        }
    } else {
        // --- PRO LOGIC ---
        const activeUser = typeof currentProUser !== 'undefined' ? currentProUser : window.currentAuthenticatedUserDoc;
        
        if (!activeUser) {
            alert("Pro Authentication missing. Cannot transmit broadcast payload.");
            return;
        }
        
        postAuthorName =
    activeUser.name ||
    activeUser.username ||
    "Tech Professional";

selectedPostType = "Article";

authorAvatar =
    activeUser.avatarUrl || "";
    }

    // B. Grab text content and prep button
    const textContent = document.getElementById('postTextContent').value.trim();
    const submitBtn = document.getElementById('submitPostBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = "⏳Posting...";

    try {
        let finalUploadedMediaUrl = "";
        let verifiedMimeGroup = "";

        // C. Handle Media Upload (Identical for both)
        if (window.targetSelectedFileObj && window.targetSelectedFileObj.type) {
            verifiedMimeGroup = window.targetSelectedFileObj.type.startsWith('video/') ? "video" : "image";
            
            const folder = isClientDashboard
    ? "client_feed_assets"
    : "pro_feed_assets";

const storageReferencePath = firebase.storage().ref(
    `${folder}/${Date.now()}_${window.targetSelectedFileObj.name}`
);
            
            console.log("Initiating binary transfer array stream to storage bucket...");
            
            const taskSnapshot = await storageReferencePath.put(window.targetSelectedFileObj);
            finalUploadedMediaUrl = await taskSnapshot.ref.getDownloadURL();
            
            console.log("File uploaded successfully. Storage URL resolved:", finalUploadedMediaUrl);
        }
uploadedAttachments.push({

    url: finalUploadedMediaUrl,

    type: verifiedMimeGroup

});
        // D. Build Unified Payload
        const postPayload = {

    authorId: postAuthorId,

    authorName: postAuthorName,

    authorAvatar: authorAvatar,

    content: textContent,

    postType: selectedPostType,

    attachments: uploadedAttachments,

    likeCount:0,

    commentCount:0,

    timestamp: firebase.firestore.FieldValue.serverTimestamp()

};

        // E. Save to Firestore
        await db.collection('pro_feed').add(postPayload);
        
        // F. Wipe forms cleanly
        document.getElementById('engineeringPostForm').reset();
        if (typeof clearSelectedMedia === 'function') {
            clearSelectedMedia();
        }
        
    } catch (error) {
        console.error("Post processing failure:", error);
        alert("Broadcast failed transmission target parameters: " + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane mr-1"></i> Post`;
    }
}


// =====================================================================
// 3. UNIFIED FEED LISTENER (Shows dynamic tags for both dashboards)
// =====================================================================
function listenToSocialFeed() {
    db.collection('pro_feed')
        .orderBy('timestamp', 'desc')
        .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
            const container = document.getElementById('socialFeedContainer');
            if (!container) return;
            
            if (snapshot.empty) {
                container.innerHTML = `
                    <div class="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-2xl font-mono text-xs">
                        <i class="fa-solid fa-bolt-lightning mb-2 text-slate-700 text-lg block"></i>
                        No telemetry broadcasts found on this channel.
                    </div>`;
                return;
            }

            let htmlBuffer = "";
            
            snapshot.forEach((doc) => {
                const post = doc.data();
                let mediaElement = "";

                let displayTime = "Loading Feed...";
                if (post.timestamp) {
                    const dateObj = post.timestamp.toDate();
                    displayTime = getRelativeTime(post.timestamp);
                }

                if (
    post.attachments &&
    Array.isArray(post.attachments) &&
    post.attachments.length > 0
) {

    mediaElement = `
        <div class="mt-2 grid gap-2">
            ${post.attachments.map(file => {

                if (file.type === "video") {

                    return `
                        <div class="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                            <video
                                controls
class="w-full max-h-[450px] object-contain mx-auto cursor-pointer"
onclick="openMediaViewer('${file.url}','video')">
                            
                                <source src="${file.url}">
                            </video>
                        </div>
                    `;

                }

                return `
                    <div>
                        <img
                            src="${file.url}"
                            class="w-full max-h-[500px] object-contain mx-auto cursor-zoom-in transition hover:scale-[1.01]"
onclick="openMediaViewer('${file.url}','image')">
                        
                    </div>
                `;

            }).join("")}
        </div>
    `;

}

                // 🛑 DYNAMIC POST TYPE & ROLE LOGIC
                const postTypeLabel = post.postType || "Article"; 
                
                let labelColors = "text-sky-400 bg-sky-500/5 border-sky-500/10";
                let roleBadge = "PRO"; // Default assuming it's an article

                if (postTypeLabel === "Question") {
                    labelColors = "text-emerald-400 bg-emerald-500/5 border-emerald-500/10";
                    roleBadge = "USER|CLIENT";
                } else if (postTypeLabel === "Testimonial") {
                    labelColors = "text-amber-400 bg-amber-500/5 border-amber-500/10";
                    roleBadge = "USER|CLIENT";
                }

                // 🛠️ BUILD FEED CARD
                htmlBuffer += `
                    <div class="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 p-3 rounded-2xl shadow-xl transition-all hover:border-slate-700/50 space-y-3 mb-4">
                        
                        <div class="flex items-start justify-between pb-2">	
                           <div class="flex items-center gap-2.5">
                                ${
post.authorAvatar

?

`<img
src="${post.authorAvatar}"
class="w-8 h-8 rounded-full object-cover border border-slate-700">`

:

`<div class="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/20 to-slate-800 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">

${(post.authorName || "P").charAt(0).toUpperCase()}

</div>`
}
                                <div class="leading-tight">

    <div class="flex items-center gap-2">

        <span class="text-sm font-semibold text-white">
            ${post.authorName || "Anonymous"}
        </span>

        <span class="text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded">
            ${roleBadge}
        </span>

    </div>

    <div class="text-[10px] text-slate-500">

        ${displayTime}

    </div>

</div>
                            </div>
                            
                            <div class="flex items-center gap-1 text-[9px] uppercase tracking-wider font-mono px-2 py-1 rounded-md border shadow-sm ${labelColors}">
                                ${postTypeLabel}
                            </div>
                        </div>
                        
                        <div class="text-slate-200 text-sm leading-6 whitespace-pre-wrap mt-1">
                            ${post.content}
                        </div>
                        
                        ${mediaElement}
                        
                        <div class="flex items-center gap-5 pt-2 mt-2 border-t border-slate-800/50 text-slate-500 text-xs">

    <button
        onclick="toggleLike('${doc.id}')"
        class="flex items-center gap-1.5 hover:text-amber-400 transition-colors group cursor-pointer">

        <i class="far fa-thumbs-up"></i>
        <span>${post.likeCount || 0}</span>

    </button>

    <button
        onclick="toggleComments('${doc.id}')"
        class="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer">

        <i class="far fa-comment"></i>
        <span>${post.commentCount || 0}</span>

    </button>

    <button class="flex items-center gap-1.5 hover:text-slate-300 transition-colors ml-auto cursor-pointer">

        <i class="fa-regular fa-share-from-square"></i>

    </button>

</div>

<!-- COMMENTS GO HERE -->
<div id="comments-${doc.id}" class="hidden mt-2">

    <div
        id="commentsList-${doc.id}"
        class="space-y-2 mb-3">
    </div>

    <div class="flex items-center gap-2">

        <input
            id="commentInput-${doc.id}"
            class="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            placeholder="Write a comment...">

        <button
    onclick="addComment('${doc.id}')"
    class="bg-amber-500 hover:bg-amber-400 text-slate-900 px-3 py-1.5 rounded-lg text-xs font-semibold">
    Comment
</button>

    </div>

</div>
                            
                        </div>

                    </div>
                `;
            });
            
            container.innerHTML = htmlBuffer;
        });
}
function getRelativeTime(timestamp){

    if(!timestamp) return "";

    const now = new Date();
    const date = timestamp.toDate();

    const seconds = Math.floor((now - date)/1000);

    if(seconds < 60)
        return "Just now";

    const minutes = Math.floor(seconds/60);

    if(minutes < 60)
        return `${minutes} min ago`;

    const hours = Math.floor(minutes/60);

    if(hours < 24)
        return `${hours} hr ago`;

    const days = Math.floor(hours/24);

    if(days === 1)
        return "Yesterday";

    if(days < 7)
        return `${days} days ago`;

    return date.toLocaleDateString([],{
        month:"short",
        day:"numeric"
    });

}
function toggleComments(postId){

    const div =
        document.getElementById(
            "comments-"+postId
        );

    div.classList.toggle("hidden");

    loadComments(postId);

}
function loadComments(postId){

    db.collection("pro_feed")
    .doc(postId)
    .collection("comments")
    .orderBy("timestamp")
    .onSnapshot(snapshot => {

        const container =
            document.getElementById("commentsList-" + postId);

        if (!container) return;

        let html = "";

        snapshot.forEach(doc => {

            const c = doc.data();

           html += `
<div class="flex gap-3 bg-slate-800 rounded-xl p-3">

    <div class="flex-shrink-0">
        ${
            c.avatarUrl
            ? `<img
                src="${c.avatarUrl}"
                class="w-9 h-9 rounded-full object-cover border border-slate-600 cursor-pointer"
                onclick="openMediaViewer('${c.avatarUrl}','image')">`
            : `<div class="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                ${(c.userName || "?").charAt(0).toUpperCase()}
              </div>`
        }
    </div>

    <div class="flex-1">

        <div class="flex items-center gap-2">
            <span class="text-cyan-400 text-xs font-bold">
                ${c.userName || "Anonymous"}
            </span>

            <span class="text-[10px] text-slate-500">
                ${c.timestamp ? new Date(c.timestamp.toDate()).toLocaleString() : ""}
            </span>
        </div>

        <div class="mt-1 text-sm text-white leading-5 break-words">
            ${c.text}
        </div>

    </div>

</div>
`;
        });

        container.innerHTML = html;

    });

}
async function addComment(postId){

    const currentUser = firebase.auth().currentUser;

    if (!currentUser) return;

    const uid = currentUser.uid;

    const input =
        document.getElementById("commentInput-" + postId);

    if (!input || input.value.trim() === "") return;

    let userName = "Anonymous";
    let avatarUrl = "";


   // Try technician
const proDoc = await db
.collection("pro_registers")
.doc(uid)
.get();

if(proDoc.exists){
console.log("Logged in as Technician");
console.log(proDoc.data());
    const pro = proDoc.data();

    userName =
        pro.name ||
        pro.username ||
        "Technician";

    avatarUrl =
        pro.avatarUrl || "";

}else{

    // Try client

    const clientDoc = await db
    .collection("client_users")
    .doc(uid)
    .get();

    if(clientDoc.exists){
console.log("Logged in as Client");
console.log(clientDoc.data());
        const client = clientDoc.data();

        userName =
            client.name ||
            client.clientName ||
            "Client";

        avatarUrl =
            client.avatarUrl || "";

    }

}
console.log("Comment Name:", userName);
console.log("Comment Avatar:", avatarUrl);
    await db.collection("pro_feed")
	
    .doc(postId)
    .collection("comments")
    .add({

        userId: currentUser.uid,

        userName: userName,

        avatarUrl: avatarUrl,

        text: input.value,

        timestamp:
        firebase.firestore.FieldValue.serverTimestamp()

    });

    await db.collection("pro_feed")
    .doc(postId)
    .update({

        commentCount:
        firebase.firestore.FieldValue.increment(1)

    });

    input.value = "";

}
async function toggleLike(postId){

    const currentUser =
        firebase.auth().currentUser;

    if(!currentUser) return;

    const likeRef =
        db.collection("pro_feed")
        .doc(postId)
        .collection("likes")
        .doc(currentUser.uid);

    const likeDoc =
        await likeRef.get();

    if(likeDoc.exists){

        await likeRef.delete();

        await db.collection("pro_feed")
        .doc(postId)
        .update({

            likeCount:
            firebase.firestore.FieldValue.increment(-1)

        });

    }else{

        await likeRef.set({

            name:
            currentUser.displayName || "Anonymous",

            timestamp:
            firebase.firestore.FieldValue.serverTimestamp()

        });

        await db.collection("pro_feed")
        .doc(postId)
        .update({

            likeCount:
            firebase.firestore.FieldValue.increment(1)

        });

    }

}
window.openMediaViewer = function(url, type){

    const overlay = document.getElementById("globalMediaViewer");
    const image = document.getElementById("viewerImage");
    const video = document.getElementById("viewerVideo");

    overlay.classList.remove("hidden");

    image.classList.add("hidden");
    video.classList.add("hidden");

    if(type === "video"){

        video.src = url;
        video.classList.remove("hidden");

        video.play();

    }else{

        image.src = url;
        image.classList.remove("hidden");

    }

};

window.closeMediaViewer = function() {
    const overlay = document.getElementById("globalMediaViewer");
    const video = document.getElementById("viewerVideo");

    // Safely hide the overlay if it's currently rendered
    if (overlay) {
        overlay.classList.add("hidden");
    }

    // Safely reset the video stream to prevent background audio playback
    if (video && typeof video.pause === "function") {
        video.pause();
        video.currentTime = 0;
        video.src = "";
    }
};

// 🎯 FIX SCENARIO B: Global Event Delegation
// We listen to the entire page. If the user clicks the overlay background, 
// it catches it dynamically—even if the element loaded late!
document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "globalMediaViewer") {
        window.closeMediaViewer();
    }
});

// Global Escape Key Listener
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        window.closeMediaViewer();
    }
});

// ========================================================
// GLOBAL MEDIA CACHE
// ========================================================
window.activeTicketsMediaCache = {};

// ========================================================
// GLOBAL VARIABLES FOR LIGHTBOX
// ========================================================
let lightboxMediaArray = [];
let currentLightboxIndex = 0;

// ========================================================
// THE BRIDGE: Connects the Ticket Card to your new Lightbox
// ========================================================
window.safelyLaunchCachedLightbox = function(event, ticketId, targetIndex) {
    // 1. Stops the ticket card from opening/closing when clicking the image
    if (event && event.stopPropagation) event.stopPropagation();
    
    // 2. Get the images for this specific ticket
    const relevantAttachments = window.activeTicketsMediaCache[ticketId];
    
    if (relevantAttachments) {
        // 3. Encode the array safely and send it to your Universal Lightbox
        const securelyEncodedList = btoa(unescape(encodeURIComponent(JSON.stringify(relevantAttachments))));
        openUniversalLightbox(securelyEncodedList, targetIndex);
    } else {
        console.error("Target media array cache record context map is empty.");
    }
};

// ========================================================
// YOUR UNIVERSAL LIGHTBOX ENGINE
// ========================================================
function openUniversalLightbox(encodedMedia, startIndex) {
    try {
        // Decode the base64-packed attachments array safely
        lightboxMediaArray = JSON.parse(decodeURIComponent(escape(atob(encodedMedia))));
        currentLightboxIndex = startIndex;
        
        let lightbox = document.getElementById('universalLightboxModal');
        
        // If the lightbox element layout doesn't exist on page context yet, create it dynamically
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'universalLightboxModal';
            lightbox.className = 'fixed inset-0 bg-black/95 z- flex flex-col items-center justify-center hidden p-4 select-none';
            lightbox.innerHTML = `
                <button onclick="closeUniversalLightbox()" class="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center bg-slate-900/90 hover:bg-red-950 border border-slate-800 text-slate-400 hover:text-red-400 font-mono rounded-full text-sm transition-colors cursor-pointer">✕</button>
                
                <button id="lightboxPrevBtn" onclick="navigateLightbox(-1)" class="absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center bg-slate-900/60 hover:bg-slate-900 hover:text-emerald-400 border border-slate-800/60 text-slate-400 rounded-full text-xl transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none">‹</button>
                
                <div class="w-full max-w-3xl max-h-[80vh] flex items-center justify-center p-2" id="lightboxContentStage">
                </div>
                
                <button id="lightboxNextBtn" onclick="navigateLightbox(1)" class="absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center bg-slate-900/60 hover:bg-slate-900 hover:text-emerald-400 border border-slate-800/60 text-slate-400 rounded-full text-xl transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none">›</button>
                
                <div id="lightboxMediaCounter" class="absolute bottom-4 text-slate-500 font-mono text-[10px] tracking-widest bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800/40 z-50">0 / 0</div>
            `;
            document.body.appendChild(lightbox);
            
            // Backdrop safety close interception setup 
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target === document.getElementById('lightboxContentStage')) {
                    closeUniversalLightbox();
                }
            });
        }
        
        lightbox.classList.remove('hidden');
        renderLightboxCurrentMedia();
        
    } catch (err) {
        console.error("Failed executing lightbox initialization:", err);
    }
}

function renderLightboxCurrentMedia() {
    const stage = document.getElementById('lightboxContentStage');
    const counter = document.getElementById('lightboxMediaCounter');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');
    
    if (!lightboxMediaArray || lightboxMediaArray.length === 0) return;
    
    const activeMedia = lightboxMediaArray[currentLightboxIndex];
    const isVideo = activeMedia.type === 'video' || activeMedia.url.includes('.mp4');
    
    // Clear display stage area before loading the new asset
    stage.innerHTML = "";
    
    if (isVideo) {
        stage.innerHTML = `<video src="${activeMedia.url}" controls autoplay class="w-auto h-auto max-w-full max-h-[75vh] rounded-xl bg-black shadow-2xl"></video>`;
    } else {
        stage.innerHTML = `<img src="${activeMedia.url}" class="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl pointer-events-none" />`;
    }
    
    // Update counter text
    counter.textContent = `${currentLightboxIndex + 1} / ${lightboxMediaArray.length}`;
    
    // Manage visibility of navigation controls based on available array options
    prevBtn.style.display = lightboxMediaArray.length > 1 ? "flex" : "none";
    nextBtn.style.display = lightboxMediaArray.length > 1 ? "flex" : "none";
}

function navigateLightbox(direction) {
    if (lightboxMediaArray.length <= 1) return;
    
    // Safely shift index pointers up or down, wrapping around if they go out of bounds
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= lightboxMediaArray.length) currentLightboxIndex = 0;
    if (currentLightboxIndex < 0) currentLightboxIndex = lightboxMediaArray.length - 1;
    
    renderLightboxCurrentMedia();
}

function closeUniversalLightbox() {
    const lightbox = document.getElementById('universalLightboxModal');
    if (lightbox) {
        // Stop any running video content elements before closing the modal container frame
        const videoElement = lightbox.querySelector('video');
        if (videoElement) videoElement.pause();
        
        lightbox.classList.add('hidden');
    }
}
// ========================================================
// 1. SPECIALTY SMART-MATCH FILTER (The Translator)
// ========================================================
function checkSpecialtyMatch(proSkillsArray, ticketCategoryValue) {
    // Safety check for empty inputs
    if (!proSkillsArray || !Array.isArray(proSkillsArray) || proSkillsArray.length === 0) {
        return false;
    }

    // Your exact schema mapping rules
    const categoryMapping = {
        'repair': 'General Electronic Hardware Diagnostic & Repair',
        'computer': 'Desktop/Laptop Repair & Upgrade Including Networking (wired/wireless)',
        'academic': 'Academic Project & Thesis Prototyping',
        'schematic': 'Schematic Design Request & PCB Layout',
        'software': 'Software Application Interface Integration',
        'cctv': 'CCTV Installation & Camera Repair',
        'solar': 'Solar PV Installation, Repair & Upgrade',
        'industrial': 'Electric Vehicle & Power Inverter Board Repairs'
    };

    // Clean up the incoming category string
    const inputClean = String(ticketCategoryValue || "").toLowerCase().trim();

    // 🎯 STEP 1: Resolve what full-text value we are actually looking for
    let targetSpecialty = categoryMapping[inputClean];

    // Fallback: If the ticket already passed the full string instead of the short key
    if (!targetSpecialty) {
        targetSpecialty = Object.values(categoryMapping).find(
            val => val.toLowerCase().trim() === inputClean
        );
    }

    // Final Fallback: If it's not matching anything in our dictionary, use the raw text
    if (!targetSpecialty) {
        targetSpecialty = inputClean;
    } else {
        targetSpecialty = targetSpecialty.toLowerCase().trim();
    }

    // 🎯 STEP 2: Use .some() instead of .includes() for case-insensitive array matching
    return proSkillsArray.some(skill => {
        return String(skill).toLowerCase().trim() === targetSpecialty;
    });
}

// ========================================================
// 2. DELIVERY SMART-MATCH FILTER (Assuming you already have this, but here for safety)
// ========================================================
function checkServiceSetupMatch(proSetup, ticketDelivery) {
    const pro = String(proSetup).toLowerCase().trim();
    const ticket = String(ticketDelivery).toLowerCase().trim();

    // Rule 3: Hybrid sees ALL types of delivery options (including Agreed Location)
    if (pro === 'hybrid') {
        return true; 
    }

    // Rule 1: In-Shop Pro ONLY sees "Bring to workshop"
    if (pro === 'in-shop') {
        return ticket === 'bring to workshop' || ticket === 'in-shop';
    }

    // Rule 2: On-Site Pro ONLY sees "Home Service"
    if (pro === 'on-site') {
        return ticket === 'home service' || ticket === 'on-site';
    }

    return false; // Fallback security block
}

// ========================================================
// 3. MAIN TICKETS PIPELINE (Scope fixed)
// ========================================================
// Array to keep track of all general ticket pins drawn on initial scan
window.allTicketMarkers = [];

function listenToIncomingTickets() {
    if (typeof firebase === 'undefined' || typeof firebase.auth !== 'function') {
        console.warn("⚠️ Firebase Auth still initializing...");
        return;
    }

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;

    const queueContainer = document.getElementById('liveTicketsQueue');
    const countBadge = document.getElementById('ticketCountBadge');

    // STEP 1: Fetch the Pro's Profile Data FIRST
    db.collection('pro_registers').doc(currentUser.uid).get()
        .then((proSnapshot) => {
            if (!proSnapshot.exists) {
                console.error("Pro profile not found.");
                return;
            }
            
            const proData = proSnapshot.data();
            const proSetup = proData.serviceSetup || "";        
            const proSkills = proData.specialties || [];

            console.log("=========================================");
            console.log("💼 LOGGED-IN PRO ACCOUNT CONFIGURATION:");
            console.log("-> serviceSetup (proSetup):", proSetup);
            console.log("-> specialties (proSkills):", proSkills);
            console.log("=========================================");

            // STEP 2: Start the real-time ticket listener INSIDE the profile fetch block
            db.collection('client_tickets') 
                .where('status', '==', 'new')
                .onSnapshot((snapshot) => {
                    if (!queueContainer) return;

                    // Clear out old batch markers from the map before plotting new telemetry updates
                    if (window.allTicketMarkers) {
                        window.allTicketMarkers.forEach(marker => marker.remove());
                    }
                    window.allTicketMarkers = [];

                    if (snapshot.empty) {
                        if (countBadge) countBadge.textContent = "0 New";
                        queueContainer.innerHTML = `<div class="text-center py-6 text-xs text-slate-600 border border-dashed border-slate-900 rounded-xl">No pending new service files detected.</div>`;
                        return;
                    }
                    
                    let localTicketsArray = [];
                    snapshot.forEach((doc) => {
                        localTicketsArray.push({ id: doc.id, ...doc.data() });
                    });
					
                    // Sort Newest First
                    localTicketsArray.sort((a, b) => {
                        const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
                        const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
                        return timeB - timeA;
                    });

                    let ticketBuffer = "";
                    let matchedCount = 0;
                    window.activeTicketsMediaCache = {};

                    localTicketsArray.forEach((ticket) => {
                        
                        // --- THE GATEKEEPER WITH LIVE TELEMETRY ---
                        const ticketDelivery = ticket.deliveryOption || ticket.serviceMode || "";
                        const matchesSpecialty = checkSpecialtyMatch(proSkills, ticket.category);
                        const matchesDelivery = checkServiceSetupMatch(proSetup, ticketDelivery);

                        // 🔍 HIGH-RESOLUTION DEBUG LOG
                        console.log(`🔎 SCANNING TICKET ID: ${ticket.id}`);
                        console.log(`   - Category: "${ticket.category}" | Specialty Match: ${matchesSpecialty}`);
                        console.log(`   - Delivery Option Found: "${ticketDelivery}" | Matrix Match: ${matchesDelivery}`);

                        if (!matchesDelivery || !matchesSpecialty) {
                            console.warn(`❌ TICKET REJECTED: Ticket ${ticket.id} hidden by filtering logic.`);
                            return; 
                        }

                        console.log(`✅ TICKET PASSED: Ticket ${ticket.id} matches your profile matrix!`);
                        matchedCount++;
                        // ----------------------

                        const ticketId = ticket.ticketId || ticket.id.substring(0, 7).toUpperCase();
                        const clientName = ticket.clientName || 'Unnamed Client';
                        const category = ticket.category || 'General Service';
                        const location = ticket.projectLocation || 'No Station Given';
                        const details = ticket.jobDetails || ticket.description || 'No operational diagnostics linked.';
                        const attachments = ticket.attachments || [];

                        window.activeTicketsMediaCache[ticket.id] = attachments;

                        let displayTime = "Just Now";
                        if (ticket.createdAt) {
                            try {
                                const parsedDate = (typeof ticket.createdAt.toDate === 'function') 
                                    ? ticket.createdAt.toDate() 
                                    : new Date(ticket.createdAt);
                                displayTime = parsedDate.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + 
                                              parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                            } catch(e) {
                                displayTime = String(ticket.createdAt).substring(0, 16);
                            }
                        }

                        // --- COORDINATE EXTRACTOR & DYNAMIC EVENT LINKING ---
                        let locationMarkup = `<span class="text-slate-200">${location}</span>`;
                        console.log("========== MAP DEBUG ==========");
console.log(ticket.ticketId);
console.log(ticket.coordinates);
console.log(ticket.deliveryOption);
console.log(ticket.category);
console.log("===============================");
                        if (ticket.coordinates && Array.isArray(ticket.coordinates) && ticket.coordinates.length === 2) {
                            const [lng, lat] = ticket.coordinates;
                            
                            if (lng !== 0 || lat !== 0) {
                                const safeLocationString = location.replace(/'/g, "\\'");
                                
                                // Step 2a: Plot this ticket initially onto the Mapbox canvas map background layer
                                plotTicketOnInitialMap(lat, lng, ticketId, safeLocationString);

                                locationMarkup = `
                                    <a href="javascript:void(0);" 
                                       onclick="window.viewTicketOnMap(event, ${lat}, ${lng}, '${ticketId}', '${safeLocationString}');" 
                                       class="text-sky-400 hover:text-sky-300 underline font-medium inline-flex items-center gap-1 transition-colors group/locLink">
                                         ${location} 
                                         <i class="fa-solid fa-location-dot text-[9px] text-sky-500/70 group-hover/locLink:text-sky-400 animate-pulse"></i>
                                    </a>`;
                            }
                        }

                        ticketBuffer += `
                            <div onclick="toggleTicketDetails(event, this)" class="bg-slate-950 border border-slate-900 hover:border-slate-800/80 p-3 rounded-xl transition-all shadow-sm flex flex-col cursor-pointer group select-none">
                                <div class="flex justify-between items-center">
                                    <div class="flex items-center gap-1.5 truncate mr-2">
                                        <span class="inline-block text-[9px] font-mono font-black bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 uppercase tracking-wide animate-custom-pulse shrink-0">
                                            ● NEW
                                        </span>
                                        <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded uppercase truncate max-w-[80px]">
                                            ${category}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-1.5 shrink-0">
                                        <span class="text-[9px] text-slate-500 font-mono">${ticketId}</span>
                                        <i class="fa-solid fa-chevron-down text-[9px] text-slate-600 group-hover:text-amber-400 transition-transform duration-200"></i>
                                    </div>
                                </div>
                                
                                <div class="hidden mt-2.5 pt-2.5 border-t border-slate-900/60 space-y-2.5 element-details-content">
                                    <div class="text-[11px] text-slate-300 font-mono space-y-0.5">
                                        <div><span class="text-slate-600 font-bold">👤 CLIENT:</span> <span class="text-slate-200">${clientName}</span></div>
                                        <div><span class="text-slate-600 font-bold">📍 LOC:</span> ${locationMarkup}</div>
                                    </div>
                                    
                                    ${attachments.length > 0 ? `
                                    <div class="space-y-1">
                                        <span class="text-[9px] font-bold uppercase tracking-wider text-slate-600 font-mono block">Attached Media</span>
                                        <div class="flex flex-wrap gap-2 pt-1">
                                            ${attachments.map((att, idx) => {
                                                const isVideo = att.type === 'video' || att.url.includes('.mp4');
                                                if (isVideo) {
                                                    return `
                                                        <div class="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group hover:border-emerald-500 transition-all">
                                                            <video src="${att.url}" class="w-full h-full object-cover opacity-60" preload="metadata" muted></video>
                                                            <div onclick="safelyLaunchCachedLightbox(event, '${ticket.id}', ${idx})" class="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all cursor-pointer">
                                                                <i class="fa-solid fa-circle-play text-white text-lg drop-shadow hover:scale-110 transition-transform text-emerald-400"></i>
                                                            </div>
                                                        </div>
                                                    `;
                                                } else {
                                                    return `
                                                        <div onclick="safelyLaunchCachedLightbox(event, '${ticket.id}', ${idx})" class="block w-20 h-20 rounded-lg overflow-hidden border border-slate-800 hover:border-emerald-500 transition-all cursor-pointer">
                                                            <img src="${att.url}" class="w-full h-full object-cover pointer-events-none" />
                                                        </div>
                                                    `;
                                                }
                                            }).join('')}
                                        </div>
                                    </div>` : ''}

                                    <div class="space-y-1">
                                        <span class="text-[9px] font-bold uppercase tracking-wider text-slate-600 font-mono block">Job Details</span>
                                        <div class="text-[11px] text-slate-400 bg-slate-900/40 p-2.5 rounded-lg border border-slate-900/60 leading-snug font-sans whitespace-pre-wrap">${details}</div>
                                    </div>

                                    <button onclick="handleAcceptJob(event, '${ticket.id}', '${ticketId}')" class="w-full mt-1 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-[10px] font-bold font-mono uppercase tracking-widest rounded-lg shadow transition-all cursor-pointer">
                                        <i class="fa-solid fa-check-double mr-1"></i> Accept Job
                                    </button>
                                </div>
                                <div class="flex justify-end text-[9px] text-slate-600 font-mono pt-1">
                                    <span>${displayTime}</span>
                                </div>
                            </div>
                        `;
                    });

                    if (countBadge) countBadge.textContent = `${matchedCount} New`;
                    
                    if (matchedCount === 0) {
                        queueContainer.innerHTML = `
                            <div class="text-center py-6 text-xs font-mono text-slate-500 bg-slate-950/20 border border-slate-900 rounded-xl">
                                📡 SCAN COMPLETE: No open tickets match your current Service Setup or Technical Specialties.
                            </div>`;
                    } else {
                        queueContainer.innerHTML = ticketBuffer;
                    }
                }, (error) => console.error("Tracking error:", error));
        })
        .catch(err => console.error("Profile parameters fetch failed:", err));
}
function plotTicketOnInitialMap(lat, lng, ticketId, addressText) {
    const map = window.proMapInstance;
    if (!map) return;

    // Create a subtle, professional sky-blue dot for general map visibility
    const el = document.createElement('div');
    el.className = 'passive-ticket-marker';
    el.innerHTML = `
        <div class="relative flex items-center justify-center w-6 h-6 cursor-pointer">
            <span class="absolute inline-flex h-3 w-3 rounded-full bg-amber-500/50 animate-ping"></span>
            <div class="w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-950/80 shadow-[0_0_4px_#38bdf8]"></div>
        </div>
    `;

    // Tooltip popup if they click the marker pin directly on the map
    const basePopup = new mapboxgl.Popup({ 
        offset: 10, 
        closeButton: false,
        className: 'custom-dark-popup' 
    }).setHTML(`
        <div class="p-2 font-mono text-[10px] text-slate-300 bg-slate-950 rounded-lg">
            <span class="text-sky-400 font-bold">📡 FILE: ${ticketId}</span>
            <div class="text-[9px] text-slate-500 mt-0.5 truncate max-w-[150px]">${addressText}</div>
        </div>
    `);

    const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(basePopup)
        .addTo(map);

    // Click behavior directly on the marker pins triggers the full precision view
    el.addEventListener('click', (e) => {
        window.viewTicketOnMap(e, lat, lng, ticketId, addressText);
    });

    // Save context reference to manage clean state resets on collection rewrites
    window.allTicketMarkers.push(marker);
}
// Global trackers to manage temporary map layers cleanly
window.activeTicketMarker = null;
window.activeTicketPopup = null;

window.viewTicketOnMap = function(event, lat, lng, ticketId, addressText) {
    // 1. Terminate event bubbling so the card container accordion doesn't collapse
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    // 2. Locate your active Mapbox GL map instance
    // NOTE: Make sure when you initialize your map, you save it to window.proMapInstance 
    // (e.g., window.proMapInstance = new mapboxgl.Map({ ... }); )
    const map = window.proMapInstance;
    
    if (!map) {
        console.error("Map telemetry error: window.proMapInstance is not defined or initialized yet.");
        alert("Map layer is still booting up. Please try again in a brief second.");
        return;
    }

    // 3. Clean up any existing ticket pins from previous clicks to avoid cluttering the view
    if (window.activeTicketMarker) window.activeTicketMarker.remove();
    if (window.activeTicketPopup) window.activeTicketPopup.remove();

    // 4. Create a striking amber pin element for high contrast on dark slate mapping textures
    const el = document.createElement('div');
    el.className = 'ticket-live-pin';
    el.innerHTML = `
        <div class="relative flex items-center justify-center w-8 h-8">
            <span class="absolute inline-flex h-full w-full rounded-full bg-amber-400/40 animate-ping opacity-75"></span>
            <i class="fa-solid fa-location-crosshairs text-amber-400 text-xl drop-shadow-[0_0_6px_#f59e0b] relative z-10"></i>
        </div>
    `;

    // 5. Generate a sleek dark theme info popup window attachment
    const popupHTML = `
        <div class="p-2 font-mono text-[10px] text-slate-300 bg-slate-950 border border-slate-800 rounded-lg shadow-xl">
            <div class="font-bold text-amber-400 border-b border-slate-800 pb-1 mb-1 flex items-center gap-1">
                <i class="fa-solid fa-xs fa-satellite"></i>Service Site: ${ticketId}
            </div>
            <div class="text-[9px] text-slate-400 leading-tight">${addressText}</div>
        </div>
    `;
    
    window.activeTicketPopup = new mapboxgl.Popup({ 
        offset: 15, 
        closeButton: false,
        className: 'custom-dark-popup' 
    }).setHTML(popupHTML);

    // 6. Mount the new temporary marker directly to the spatial coordinates
    window.activeTicketMarker = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(window.activeTicketPopup)
        .addTo(map);

    // 7. Execute high-performance tracking camera sweep
    map.flyTo({
        center: [lng, lat],
        zoom: 14.5,
        essential: true,
        pitch: 45, // Add subtle 3D structural tilt perspective for a more interactive grid feel
        bearing: 0
    });

    // Automatically open the popup data layout panel right after flight completion
    window.activeTicketMarker.togglePopup();

    // 8. MOBILE VIEW RADAR SCROLL FIX
    // If the technician is using a phone or tight interface, snap the map into viewport view smoothly
    const mapElement = document.getElementById('proMap');
    if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};
// ========================================================
// SECURE AUTOMATIC RUNTIME TIMING INTERCEPTOR
// ========================================================
// Waits for the entire window and all external CDNs to finish loading
window.addEventListener('load', () => {
    if (typeof firebase !== 'undefined' && typeof firebase.auth === 'function') {
        
        // ONE Single Auth Listener to rule them all
        firebase.auth().onAuthStateChanged((user) => {
            const loginBtn = document.getElementById('navLoginBtn');
            const regClientBtn = document.getElementById('navRegisterClientBtn');
            const regProBtn = document.getElementById('navRegisterProBtn');
            const logoutBtn = document.getElementById('navLogoutBtn');

            if (user) {
                // --- 1. USER IS LOGGED IN (UI Updates) ---
                if (loginBtn) loginBtn.style.setProperty('display', 'none', 'important');
                if (regClientBtn) regClientBtn.style.setProperty('display', 'none', 'important');
                if (regProBtn) regProBtn.style.setProperty('display', 'none', 'important');
                if (logoutBtn) logoutBtn.style.setProperty('display', 'inline-block', 'important');

                // --- 2. SMART PAGE AUTODETECT ROUTER ---
                // We check the DOM to see which HTML file we are currently looking at
                const isClientDashboard = document.getElementById('clientTicketsGrid');
                const isProDashboard = document.getElementById('liveTicketsQueue');

                if (isClientDashboard) {
                    console.log("👤 User Detected. Loading Profile");
                    if (typeof loadAccountInformation === 'function') loadAccountInformation(user.uid);
                    
                    // Crucial: Pass the user.uid here so it doesn't load all tickets!
                    if (typeof loadClientTicketHistory === 'function') loadClientTicketHistory(user.uid);
                }

               if (isProDashboard) {
    console.log("🛠️ Professional Dashboard Detected. Starting live queue...");
    
    // Initialize this tracker early so real-time map plots don't crash
    window.allTicketMarkers = window.allTicketMarkers || [];
    
    if (typeof loadProfessionalProfile === 'function') loadProfessionalProfile(user.uid);
    if (typeof listenToIncomingTickets === 'function') listenToIncomingTickets();
    
    // Initialize your professional map base safely
    initProMap();
	loadAvailabilityStatus();
}

            } else {
                // --- 3. USER IS LOGGED OUT ---
                if (loginBtn) loginBtn.style.setProperty('display', 'inline-block', 'important');
                if (regClientBtn) regClientBtn.style.setProperty('display', 'inline-block', 'important');
                if (regProBtn) regProBtn.style.setProperty('display', 'inline-block', 'important');
                if (logoutBtn) logoutBtn.style.setProperty('display', 'none', 'important');
            }
        });

    } else {
        console.error("🚨 CRITICAL ERROR: Firebase library did not load.");
    }
});

// ========================================================
// ACTIVE WORKSPACE (MY WORK DASHBOARD)
// ========================================================
function listenToAcceptedTickets(proId) {
    db.collection('client_tickets')
        .where('acceptedById', '==', proId)
        .where('status', 'in', ['accepted', 'diagnostic', 'waiting for parts'])
        .onSnapshot((snapshot) => {
            const container = document.getElementById('acceptedTicketsQueue');
            const badge = document.getElementById('acceptedCountBadge');
            
            if (snapshot.empty) {
                badge.textContent = "0";
                hasActiveJob = false; 
                container.innerHTML = `<div class="text-center py-6 text-slate-600">No active Job Assignments as of now.</div>`;
                return;
            }
            
            badge.textContent = snapshot.size;
            hasActiveJob = true; 
            
            let activeJobsArray = [];
            snapshot.forEach((doc) => { activeJobsArray.push({ id: doc.id, ...doc.data() }); });
            
            // --- FIXED: Sort accepted tickets chronologically using 'createdAt' ---
            activeJobsArray.sort((a, b) => {
                const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
                const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
                return timeB - timeA;
            });
            
            let htmlBuffer = "";
            activeJobsArray.forEach((ticket) => {
                const ticketId = ticket.ticketId || ticket.id.substring(0, 7).toUpperCase();
                const clientName = ticket.clientName || 'Unnamed Client';
                const clientPhone = ticket.clientPhone || 'No Phone Registered';
                const clientEmail = ticket.clientEmail || 'No Email Linked';
                const location = ticket.projectLocation || 'No Station Given';
                const details = ticket.jobDetails || 'No diagnostic data.';
                const category = ticket.category || 'Service';
                const currentRawStatus = ticket.status || '';
                const attachments = ticket.attachments || []; 
                
                let statusFriendlyLabel = "Accepted";
                let badgeColorClass = "text-emerald-400 bg-emerald-950/50 border-emerald-900/40";
                
                if (currentRawStatus === 'diagnostic') {
                    statusFriendlyLabel = "In Diagnostic";
                    badgeColorClass = "text-amber-400 bg-amber-950/50 border-amber-900/40";
                } else if (currentRawStatus === 'waiting for parts') {
                    statusFriendlyLabel = "Awaiting Parts";
                    badgeColorClass = "text-indigo-400 bg-indigo-950/50 border-indigo-900/40";
                }
                
                // --- ADDED: Parse the standard format for your display row if needed ---
                let displayTime = "Active";
                if (ticket.createdAt) {
                    const parsedDate = (typeof ticket.createdAt.toDate === 'function') ? ticket.createdAt.toDate() : new Date(ticket.createdAt);
                    displayTime = parsedDate.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + 
                                  parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                htmlBuffer += `
                    <div onclick="toggleTicketDetails(event, this)" class="bg-slate-950 border border-slate-900 hover:border-slate-800 p-2.5 rounded-xl flex flex-col cursor-pointer group select-none transition-all">
                        <div class="flex justify-between items-center text-[10px]">
                            <span class="text-[9px] font-mono font-bold px-1.5 rounded uppercase border ${badgeColorClass}">✓ ${statusFriendlyLabel}</span>
                            <div class="flex items-center gap-1.5 text-slate-500">
                                <span class="font-mono">${ticketId}</span>
                                <i class="fa-solid fa-chevron-down text-[8px] inline-block transition-transform duration-200 group-hover:text-emerald-400"></i>
                            </div>
                        </div>
                        <div class="text-[11px] text-slate-300 font-mono mt-1 truncate">
                            <span class="text-slate-500 font-bold">👤</span> ${clientName} | <span class="text-slate-500 font-bold">📍</span> ${location}
                        </div>
                        
                        <div class="hidden mt-2.5 pt-2.5 border-t border-slate-900 element-details-content space-y-2.5 text-[11px]">
        <div class="text-[11px] text-slate-300 font-mono space-y-0.5 bg-slate-900/30 p-2 rounded-lg border border-slate-900">
            <div><span class="text-slate-500 font-bold">Client:</span> <span class="text-slate-200">${clientName}</span></div>
            <div><span class="text-slate-500 font-bold">Contact No:</span> <a href="tel:${clientPhone}" class="text-amber-400 hover:underline" onclick="event.stopPropagation();">${clientPhone}</a></div>
            <div><span class="text-slate-500 font-bold">Email:</span> <span class="text-slate-400 break-all">${clientEmail}</span></div>
            <div><span class="text-slate-500 font-bold">Location:</span> <span class="text-slate-200">${location}</span></div>
            <div><span class="text-slate-500 font-bold">Category:</span> <span class="text-slate-400 uppercase text-[10px]">${category}</span></div>
            <div><span class="text-slate-500 font-bold">Date Requested:</span> <span class="text-slate-400">${displayTime}</span></div>
        </div>
                            
                            ${attachments.length > 0 ? `
    <div class="space-y-1">
        <span class="text-[9px] font-bold uppercase tracking-wider text-slate-600 font-mono block">Attached Media</span>
        <div class="flex flex-wrap gap-2 pt-1">
            ${attachments.map(att => {
                // Check if the attachment is explicitly saved as a video type
                if (att.type === 'video' || att.url.includes('.mp4')) {
                    return `
                        <div class="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group hover:border-emerald-500 transition-all">
                            <video src="${att.url}" class="w-full h-full object-cover opacity-60" preload="metadata" muted></video>
                            
                            <div onclick="openVideoModal('${att.url}')" class="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all cursor-pointer">
                                <i class="fa-solid fa-circle-play text-white text-lg drop-shadow hover:scale-110 transition-transform text-emerald-400"></i>
                            </div>
                        </div>
                    `;
                } else {
                    // Regular Image Layout Output Asset
                    return `
                        <div onclick="openImageModal('${att.url}')" class="block w-20 h-20 rounded-lg overflow-hidden border border-slate-800 hover:border-emerald-500 transition-all cursor-pointer">
                            <img src="${att.url}" class="w-full h-full object-cover pointer-events-none" />
                        </div>
                    `;
                }
            }).join('')}
        </div>
    </div>
` : ''}

                            <div class="space-y-1">
                                <span class="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono block">Job Details Log</span>
                                <div class="text-slate-400 bg-slate-900/40 border border-slate-900 p-2 rounded-lg font-sans whitespace-pre-wrap leading-relaxed">${details}</div>
                            </div>

                            <div class="space-y-1 pt-1" onclick="event.stopPropagation();">
                                <label class="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono block">Update Project Status</label>
                                <select 
    data-prev="${ticket.status}" 
    onchange="handleModifyTicketStatus(this, '${ticket.id}', '${ticketId}')"
    class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors">
    
    <option value="" disabled ${!ticket.status ? 'selected' : ''}>-- Select Status --</option>
    
    
    <option value="diagnostic" ${ticket.status === 'diagnostic' ? 'selected' : ''}>🔧 Ongoing Diagnostic</option>
    <option value="waiting for parts" ${ticket.status === 'waiting for parts' ? 'selected' : ''}>⏳ Waiting for Parts</option>
    <option value="complete" ${ticket.status === 'complete' ? 'selected' : ''}>✅ Complete & Close Service Ticket</option>
</select>
								
                            </div>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = htmlBuffer;
        });
}



function openUniversalLightbox(encodedMedia, startIndex) {
    try {
        // Decode the base64-packed attachments array safely
        lightboxMediaArray = JSON.parse(atob(encodedMedia));
        currentLightboxIndex = startIndex;
        
        let lightbox = document.getElementById('universalLightboxModal');
        
        // If the lightbox element layout doesn't exist on page context yet, create it dynamically
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'universalLightboxModal';
            lightbox.className = 'fixed inset-0 bg-black/95 z- flex flex-col items-center justify-center hidden p-4 select-none';
            lightbox.innerHTML = `
                <button onclick="closeUniversalLightbox()" class="absolute top-20 right-10 z- w-9 h-9 flex items-center justify-center bg-slate-900/90 hover:bg-red-950 border border-slate-800 text-slate-400 hover:text-red-400 font-mono rounded-full text-sm transition-colors cursor-pointer">✕</button>
                
                <button id="lightboxPrevBtn" onclick="navigateLightbox(-1)" class="absolute left-4 z- w-12 h-12 flex items-center justify-center bg-slate-900/60 hover:bg-slate-900 hover:text-emerald-400 border border-slate-800/60 text-slate-400 rounded-full text-xl transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none">‹</button>
                
                <div class="w-full max-w-3xl max-h-[80vh] flex items-center justify-center p-2" id="lightboxContentStage">
                    </div>
                
                <button id="lightboxNextBtn" onclick="navigateLightbox(1)" class="absolute right-4 z- w-12 h-12 flex items-center justify-center bg-slate-900/60 hover:bg-slate-900 hover:text-emerald-400 border border-slate-800/60 text-slate-400 rounded-full text-xl transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none">›</button>
                
                <div id="lightboxMediaCounter" class="absolute bottom-4 text-slate-500 font-mono text-[10px] tracking-widest bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800/40">0 / 0</div>
            `;
            document.body.appendChild(lightbox);
            
            // Backdrop safety close interception setup 
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target === document.getElementById('lightboxContentStage')) {
                    closeUniversalLightbox();
                }
            });
        }
        
        lightbox.classList.remove('hidden');
        renderLightboxCurrentMedia();
        
    } catch (err) {
        console.error("Failed executing lightbox initialization:", err);
    }
}

function renderLightboxCurrentMedia() {
    const stage = document.getElementById('lightboxContentStage');
    const counter = document.getElementById('lightboxMediaCounter');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');
    
    if (!lightboxMediaArray || lightboxMediaArray.length === 0) return;
    
    const activeMedia = lightboxMediaArray[currentLightboxIndex];
    const isVideo = activeMedia.type === 'video' || activeMedia.url.includes('.mp4');
    
    // Clear display stage area before loading the new asset
    stage.innerHTML = "";
    
    if (isVideo) {
        stage.innerHTML = `<video src="${activeMedia.url}" controls autoplay class="w-auto h-auto max-w-full max-h-[75vh] rounded-xl bg-black shadow-2xl"></video>`;
    } else {
        stage.innerHTML = `<img src="${activeMedia.url}" class="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl pointer-events-none" />`;
    }
    
    // Update counter text
    counter.textContent = `${currentLightboxIndex + 1} / ${lightboxMediaArray.length}`;
    
    // Manage visibility of navigation controls based on available array options
    prevBtn.style.display = lightboxMediaArray.length > 1 ? "flex" : "none";
    nextBtn.style.display = lightboxMediaArray.length > 1 ? "flex" : "none";
}

function navigateLightbox(direction) {
    if (lightboxMediaArray.length <= 1) return;
    
    // Safely shift index pointers up or down, wrapping around if they go out of bounds
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= lightboxMediaArray.length) currentLightboxIndex = 0;
    if (currentLightboxIndex < 0) currentLightboxIndex = lightboxMediaArray.length - 1;
    
    renderLightboxCurrentMedia();
}

function closeUniversalLightbox() {
    const lightbox = document.getElementById('universalLightboxModal');
    if (lightbox) {
        // Stop any running video content elements before closing the modal container frame
        const videoElement = lightbox.querySelector('video');
        if (videoElement) videoElement.pause();
        
        lightbox.classList.add('hidden');
    }
}
        // ========================================================
        // LIVE TICKETS PIPELINE ENGINE (SERVICE HISTORY LOGS)
        // ========================================================
        function listenToCompletedHistory(proId) {
    db.collection('client_tickets')
        .where('acceptedById', '==', proId)
        .where('status', '==', 'complete')
        .onSnapshot((snapshot) => {
            const historyContainer = document.getElementById('completedTicketsHistoryQueue');
            const historyBadge = document.getElementById('historyCountBadge');
            
            if (snapshot.empty) {
                historyBadge.textContent = "0";
                historyContainer.innerHTML = `<div class="text-center py-6 text-slate-600">No completed jobs on record.</div>`;
                return;
            }
            
            historyBadge.textContent = snapshot.size;
            
            let historyArray = [];
            snapshot.forEach((doc) => {
                historyArray.push({ id: doc.id, ...doc.data() });
            });
            
            // 🟢 FIX 1: Sort using the correct database field 'createdAt'
            historyArray.sort((a, b) => {
                const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
                const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
                return timeB - timeA;
            });
            
            let htmlBuffer = "";
            historyArray.forEach((ticket) => {
                const ticketId = ticket.ticketId || ticket.id.substring(0, 7).toUpperCase();
                const clientName = ticket.clientName || 'Unnamed Client';
                const location = ticket.projectLocation || 'No Station Given';
                const details = ticket.jobDetails || 'No diagnostic data.';
                const category = ticket.category || 'Service';

                // 🟢 FIX 2: Generate 'displayTime' from the 'createdAt' field here before calling it
                let displayTime = "Closed Log";
                if (ticket.createdAt) {
                    try {
                        const parsedDate = (typeof ticket.createdAt.toDate === 'function') 
                            ? ticket.createdAt.toDate() 
                            : new Date(ticket.createdAt);

                        displayTime = parsedDate.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + 
                                      parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                    } catch(e) {
                        displayTime = String(ticket.createdAt).substring(0, 16);
                    }
                }

                htmlBuffer += `
                    <div onclick="toggleTicketDetails(event, this)" class="bg-slate-950 border border-slate-900 hover:border-blue-950/40 p-2.5 rounded-xl flex flex-col cursor-pointer group select-none transition-all">
                        <div class="flex justify-between items-center text-[10px]">
                            <span class="text-[9px] font-mono font-bold text-blue-400 bg-blue-950/50 border border-blue-900/40 px-1.5 rounded uppercase">
                                ✓ Closed Log
                            </span>
                            <div class="flex items-center gap-1.5 text-slate-500">
                                <span class="font-mono">${ticketId}</span>
                                <i class="fa-solid fa-chevron-down text-[8px] inline-block transition-transform duration-200 group-hover:text-blue-400"></i>
                            </div>
                        </div>
                        <div class="text-[11px] text-slate-400 font-mono mt-1 truncate">
                            <span class="text-slate-600 font-bold">👤</span> ${clientName} | <span class="text-slate-600 font-bold">📍</span> ${location}
                        </div>
                        
                        <div class="hidden mt-2 pt-2 border-t border-slate-900/80 element-details-content space-y-2 text-[11px]">
                            <div class="bg-slate-900/20 p-2 rounded-lg border border-slate-900 text-slate-400 font-mono space-y-0.5">
                                <div><span class="text-slate-600">Location:</span> ${location}</div>
                                <div><span class="text-slate-600">Category:</span> ${category}</div>
                                <div><span class="text-slate-600">Date Requested:</span> ${displayTime}</div>
                            </div>
                            <div class="text-slate-500 bg-slate-900/40 p-2 rounded-lg font-sans text-xs italic">
                                "${details}"
                            </div>
                        </div>
                    </div>
                `;
            });
            
            historyContainer.innerHTML = htmlBuffer;
        });
}

        // ========================================================
        // INTERACTIVE ENGINE: TRANSITION DATA ASSIGNMENT STATUS
        // ========================================================
        async function handleAcceptJob(event, firestoreDocId, systemTicketId) {
    event.stopPropagation(); 
    if (!currentProUser) return;
    
    try {
        // 1. Query Firestore to see how many jobs this technician currently has active
        const activeTicketsSnapshot = await db.collection('client_tickets')
            .where('acceptedById', '==', currentProUser.id)
            .where('status', 'in', ['accepted', 'diagnostic', 'waiting for parts'])
            .get();

        // 2. Enforce the limit of 2 active tickets
        if (activeTicketsSnapshot.size >= 2) {
            alert(`Limit Exceeded: You can only manage a maximum of 2 active service tickets simultaneously. Please finish or close your current jobs first.`);
            return;
        }

        const activeProName = currentProUser.name || currentProUser.username;
        if (!confirm(`Have you reviewed the details and ready to accept Service #${systemTicketId}?`)) return;
        
        // 3. Proceed to update the ticket
        await db.collection('client_tickets').doc(firestoreDocId).update({
            status: 'accepted',
            acceptedById: currentProUser.id,
            acceptedByName: activeProName,
			proLocation: currentProUser.location || "Location not provided",
        });
        
        alert(`Ticket #${systemTicketId} successfully tied to your active desk space.`);
        
    } catch (error) {
        console.error("Critical Failure accepting service request asset:", error);
        alert("An error occurred while trying to accept this ticket. Please try again.");
    }
}

       async function handleModifyTicketStatus(selectSelector, firestoreDocId, systemTicketId) {
    if (!currentProUser) return;
    
    const selectionValue = selectSelector.value;
    const activeProName = currentProUser.name || currentProUser.username;
    
    // Get the previous status value from a data attribute (fallback to empty string if not found)
    const previousStatus = selectSelector.getAttribute('data-prev') || "";
    
    let updatedFields = { status: selectionValue };
    let confirmationMessage = "";

    // 1. Setup specific fields and alert text based on the chosen dropdown state
    if (selectionValue === "complete") {
        updatedFields.completedBy = activeProName;
        updatedFields.completedById = currentProUser.id;
        confirmationMessage = `Confirm completion of Service #${systemTicketId}? This job will be closed.`;
    } else {
        // Human-friendly label for intermediate states (diagnostic, waiting for parts, etc.)
        confirmationMessage = `Confirm status update for Service #${systemTicketId} to "${selectionValue}"?`;
    }

    // 2. Run the dynamic confirm box challenge
    if (!confirm(confirmationMessage)) {
        // If canceled, revert the dropdown selection back to its previous operational state
        selectSelector.value = previousStatus;
        return;
    }

    // 3. If confirmed, proceed to push changes to Firestore
    try {
        await db.collection('client_tickets').doc(firestoreDocId).update(updatedFields);
        
        // Update the custom tracking attribute so the next cancel choice works correctly too
        selectSelector.setAttribute('data-prev', selectionValue);
        
    } catch (error) {
        console.error("Lifecycle adjustment state update error:", error);
        alert("Database operations write dropped. Check connection logs.");
        // Revert UI dropdown layout if the database write rejects/fails
        selectSelector.value = previousStatus;
    }
}
        // ========================================================
        // INTERACTIVE INTERFACE ACCORDION TOGGLE HANDLE
        // ========================================================
       window.toggleTicketDetails = function(event, cardElement) {
    // Ignore clicks on inner buttons, selects, or links
    if (event.target.tagName === 'BUTTON' || event.target.closest('button') || event.target.tagName === 'SELECT' || event.target.tagName === 'A') return;

    const detailsBlock = cardElement.querySelector('.element-details-content');
    const chevronIcon = cardElement.querySelector('.fa-chevron-down');
    
    if (detailsBlock) {
        if (detailsBlock.classList.contains('hidden')) {
            detailsBlock.classList.remove('hidden');
            if (chevronIcon) chevronIcon.classList.add('rotate-180');
        } else {
            detailsBlock.classList.add('hidden');
            if (chevronIcon) chevronIcon.classList.remove('rotate-180');
        }
    }
};
		

function openVideoModal(videoUrl) {
    // Check if an asset modal wrapper context template layer exists already
    let modal = document.getElementById('globalVideoModal');
    
    if (!modal) {
        // Build an on-the-fly clean backdrop wrapper overlay context
        modal = document.createElement('div');
        modal.id = 'globalVideoModal';
        modal.className = 'fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 hidden';
        modal.innerHTML = `
            <div class="relative w-full max-w-2xl bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden p-1 shadow-2xl">
                <button onclick="closeVideoModal()" class="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center bg-slate-900/80 hover:bg-red-950 border border-slate-800 text-slate-400 hover:text-red-400 font-mono rounded-full text-xs transition-colors cursor-pointer">✕</button>
                <video id="modalVideoPlayer" controls autoplay class="w-full h-auto rounded-xl bg-black max-h-[75vh]"></video>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal if user clicks outside the video frame box area
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeVideoModal();
        });
    }

    const player = document.getElementById('modalVideoPlayer');
    player.src = videoUrl;
    modal.classList.remove('hidden');
}

function closeVideoModal() {
    const modal = document.getElementById('globalVideoModal');
    const player = document.getElementById('modalVideoPlayer');
    if (modal) modal.classList.add('hidden');
    if (player) {
        player.pause(); // Pause video instantly so audio doesn't keep running in the background
        player.src = "";
    }
}
function openImageModal(url) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = url;
    modal.classList.remove('hidden');
}

function closeImageModal() {
    document.getElementById('imageModal').classList.add('hidden');
}

// =====================================================================
// MAPBOX: CLIENT DASHBOARD LOCATION SERVICES
// =====================================================================
// 1. Define the marker function outside so it's clean and reusable
function displayTicketLocation(map, ticket) {
    // 1. If the ticket is completed, don't show it on the map
    if (ticket.status === 'completed') {
        return; 
    }

    // 2. Double check coordinates exist so the map doesn't crash
    if (!ticket.coordinates || ticket.coordinates.length !== 2) {
        console.warn(`Ticket ${ticket.ticketId} is missing coordinates. Skipping pin.`);
        return;
    }

    const popupHTML = `
        <div style="font-family: monospace; color: #333; max-width: 200px;">
            <strong style="color: #f59e0b; display: block; margin-bottom: 4px;">My Declared Location</strong>
            <div style="font-size: 12px; margin-bottom: 6px;">
                <strong>My Ticket #:</strong> ${ticket.ticketId}<br>
                <strong>Issue:</strong> ${ticket.jobDetails}
            </div>
            <div style="font-size: 11px; color: #666; border-top: 1px solid #eee; padding-top: 4px;">
                ${ticket.projectLocation}
            </div>
        </div>
    `;

    const ticketPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML);

    new mapboxgl.Marker({ color: '#f59e0b', scale: 1.1 }) 
        .setLngLat(ticket.coordinates)
        .setPopup(ticketPopup)
        .addTo(map);
}

// 2. Updated fetching function using dynamic imports
async function fetchAndPlotClientTickets(map, clientId) {
    try {
        // 1. Reference the collection using the global 'db' variable from your config
        // Using the v8 syntax: db.collection("collection_name")
        const ticketsRef = db.collection("client_tickets"); 
        
        // 2. Query using v8 syntax: .where()
        const querySnapshot = await ticketsRef.where("clientId", "==", clientId).get();
        
        // 3. Loop through the documents
        querySnapshot.forEach((doc) => {
            const ticketData = doc.data();
            displayTicketLocation(map, ticketData);
        });

    } catch (error) {
        console.error("Error fetching tickets from Firestore:", error);
    }
}

// 3. Your main map initialization function
function initClientMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9tamFiYWRhbjE5IiwiYSI6ImNtcXE0bXpuMDBiOGkycm91NjBwOHl6M3AifQ.Skgcjl5ytTVSUFEefgdwcg'; 

    const mapContainer = document.getElementById('clientMap');
    if (!mapContainer) return; 

    const savedClientId = localStorage.getItem('authenticatedClientId');

    const map = new mapboxgl.Map({
        container: 'clientMap',
        style: 'mapbox://styles/mapbox/light-v11', 
        center: [121.0964, 14.3039],
        zoom: 11
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true
    });
    map.addControl(geolocate, 'top-right');

    map.on('load', () => {
        geolocate.trigger();

        // 1. Load basic map locations if defined
        if (typeof loadMapLocations === "function") {
            loadMapLocations(map);
        }

        // 2. FIXED: Safely load Hybrid Pro locations independently
        if (typeof loadHybridProsOnMap === "function") {
            loadHybridProsOnMap(map);
        }

        // 3. Kick off real-time transit tracking links
        if (savedClientId && typeof startProTrackingListener === "function") {
            startProTrackingListener(map, savedClientId);
        }

        // 4. Draw existing static history markers
        if (savedClientId && typeof fetchAndPlotClientTickets === "function") {
            fetchAndPlotClientTickets(map, savedClientId);
        }
    });
}

// =====================================================================
// MAPBOX: PRO PROFILE SERVICE ZONES
// =====================================================================
async function initProMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9tamFiYWRhbjE5IiwiYSI6ImNtcXE0bXpuMDBiOGkycm91NjBwOHl6M3AifQ.Skgcjl5ytTVSUFEefgdwcg';

    const mapContainer = document.getElementById('proMap');
    if (!mapContainer) return;

    // Default location (Santa Rosa)
    let defaultLandingCenter = [121.1114, 14.3142];
    let defaultZoom = 11;

    try {
        const currentUser = firebase.auth().currentUser;

        if (currentUser) {

            console.log("Looking up Firestore coordinates for UID:", currentUser.uid);

            const proDoc = await firebase.firestore()
                .collection('pro_registers')
                .doc(currentUser.uid)
                .get();

            if (proDoc.exists) {

                const proData = proDoc.data();
                window.currentAuthenticatedUserDoc = proData;

                console.log("RAW COORD DATA FROM FIRESTORE:", proData.coordinates);

                if (
                    proData.coordinates &&
                    Array.isArray(proData.coordinates) &&
                    proData.coordinates.length === 2
                ) {

                    // ✅ Correctly separate longitude and latitude
                    const separateLng = Number(proData.coordinates[0]);
                    const separateLat = Number(proData.coordinates[1]);

                    console.log("=== SEPARATED VARIABLE VALIDATION ===");
                    console.log("Longitude:", separateLng);
                    console.log("Latitude:", separateLat);

                    // Validate coordinates
                    if (
                        !isNaN(separateLng) &&
                        !isNaN(separateLat) &&
                        separateLng >= -180 &&
                        separateLng <= 180 &&
                        separateLat >= -90 &&
                        separateLat <= 90
                    ) {

                        defaultLandingCenter = [separateLng, separateLat];
                        defaultZoom = 14;

                        console.log("SUCCESS! Default coordinates set to:", defaultLandingCenter);

                    } else {

                        console.error(
                            "Coordinates are invalid.",
                            "Lng:", separateLng,
                            "Lat:", separateLat
                        );

                    }

                } else {

                    console.warn("Coordinates field missing or not an array.");

                }
            }
        }

    } catch (error) {

        console.error("Error reading Firestore:", error);

    }

    // Initialize Mapbox
    try {

        window.proMapInstance = new mapboxgl.Map({
            container: 'proMap',
            style: 'mapbox://styles/mapbox/light-v11',
            center: defaultLandingCenter,
            zoom: defaultZoom
        });

        const map = window.proMapInstance;

        window.initialMapCenter = defaultLandingCenter;
        window.initialMapZoom = defaultZoom;

        map.on('click', (e) => {
            if (e.originalEvent.target.classList.contains('mapboxgl-canvas')) {
                if (typeof window.resetMapToInitialState === 'function') {
                    window.resetMapToInitialState();
                }
            }
        });

        map.on('load', () => {

    loadCurrentProLocation(map);   // only my workshop
    listenToIncomingTickets();     // client tickets only

});

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    } catch (mapInitError) {

        console.error("Mapbox initialization failed:", mapInitError);

    }
}
async function loadCurrentProLocation(map) {

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;

    const doc = await db.collection("pro_registers")
        .doc(currentUser.uid)
        .get();

    if (!doc.exists) return;

    const data = doc.data();

    if (!data.coordinates || data.coordinates.length !== 2)
        return;

    const marker = document.createElement("div");

    marker.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-cyan-500 border-2 border-white flex items-center justify-center shadow-lg">
            <i class="fa-solid fa-house text-white text-xs"></i>
        </div>
    `;

    new mapboxgl.Marker(marker)
        .setLngLat(data.coordinates)
        .addTo(map);
}
window.trackingMarkers = { client: null, pro: null };

function startProTrackingListener(map, clientId) {
    const hud = document.getElementById('proTrackingHud');
    const hudDistance = document.getElementById('hudDistanceVal');
    const hudProName = document.getElementById('hudProName');

    // Initialize global tracking variable if not set up
    if (!window.trackingMarkers) {
        window.trackingMarkers = { client: null, pro: null };
    }

    console.log("Listening directly for your accepted ticket tasks...");

    // 1. Direct Realtime listener on tickets table
    db.collection('client_tickets')
        .where('clientId', '==', clientId)
        .where('status', '==', 'accepted')
        .onSnapshot((ticketSnapshot) => {
            
            if (!ticketSnapshot || ticketSnapshot.empty) {
                console.log("No accepted tickets found matching client session.");
                clearLiveTrackingAssets(map);
                if (hud) hud.classList.add('hidden');
                return;
            }

            // Extract values directly out of the raw doc layer
            const firstTicketDoc = ticketSnapshot.docs;
            const ticketData = typeof firstTicketDoc.data === 'function' ? firstTicketDoc.data() : firstTicketDoc;
            
            if (!ticketData) return;

            // Safe property checks
            const clientCoords = ticketData.coordinates || (ticketData.location && ticketData.location.coordinates);
            const proId = ticketData.acceptedById || ticketData.acceptedBy || ticketData.proId;

            console.log("Extracted raw clientCoords:", clientCoords, "Assigned proId:", proId);

            if (!clientCoords || !proId) {
                console.warn("Ticket found but missing core properties (coordinates or assigned Pro ID).");
                return;
            }

            // 2. Query the Pro's live profile position in 'pro_registers'
            db.collection('pro_registers').doc(proId).get()
                .then((proDoc) => {
                    if (!proDoc.exists) {
                        console.error(`Pro ID: ${proId} does not exist inside 'pro_registers' collection.`);
                        return;
                    }

                    const proData = proDoc.data();
                    if (!proData) return;

                    // Fallback to whichever location metric field has data populated
                    const proCoords = proData.liveCoordinates || proData.coordinates || proData.workshopCoordinates;
                    const activeProName = currentProUser.name || currentProUser.username;

                    console.log("Successfully fetched Pro Location Coordinates:", proCoords);

                    if (!proCoords || proCoords.length !== 2) {
                        console.error("Pro doc located, but coordinates array layout is corrupt or unconfigured.");
                        return;
                    }

                    // Clear past markers before drawing fresh ones
                    clearLiveTrackingAssets(map);

                    // Reveal Dashboard Telemetry Layer
                    if (hud) hud.classList.remove('hidden');
                    if (hudProName) hudProName.textContent = `Expert: ${proName}`;

                    // Update Distance calculation display using index coordinates
                    const distanceKm = calculateHaversineDistance(
                        clientCoords, clientCoords, 
                        proCoords, proCoords
                    );
                    
                    if (hudDistance) {
                        hudDistance.textContent = distanceKm < 1 
                            ? `${Math.round(distanceKm * 1000)} meters away` 
                            : `${distanceKm.toFixed(2)} km away`;
                    }

                    // Render Client House Pin
                    const clientEl = document.createElement('div');
                    clientEl.className = 'custom-client-marker';
                    clientEl.innerHTML = `
                        <div class="relative flex items-center justify-center w-6 h-6">
                            <span class="absolute inline-flex h-4 w-4 rounded-full bg-sky-500/40 animate-ping"></span>
                            <i class="fa-solid fa-house-user text-sky-600 text-lg drop-shadow"></i>
                        </div>`;
                    window.trackingMarkers.client = new mapboxgl.Marker({ element: clientEl })
                        .setLngLat(clientCoords)
                        .setPopup(new mapboxgl.Popup({ offset: 10 }).setHTML(`<div class="text-xs font-mono font-bold p-1">Your Location</div>`))
                        .addTo(map);

                    // Render Dispatched Pro Pin
                    const proEl = document.createElement('div');
                    proEl.className = 'custom-pro-marker';
                    proEl.innerHTML = `
                        <div class="relative flex items-center justify-center w-8 h-8">
                            <span class="absolute inline-flex h-full w-full rounded-full bg-amber-500/30 animate-pulse"></span>
                            <i class="fa-solid fa-screwdriver-wrench text-amber-500 text-xl drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]"></i>
                        </div>`;
                    window.trackingMarkers.pro = new mapboxgl.Marker({ element: proEl })
                        .setLngLat(proCoords)
                        .setPopup(new mapboxgl.Popup({ offset: 10 }).setHTML(`<div class="text-xs font-mono font-bold p-1">${proName} (En Route)</div>`))
                        .addTo(map);

                    // Connect them with a routing visual vector line
                    drawConnectingVectorLine(map, clientCoords, proCoords);

                    // Camera frame adjustment bounding box
                    const bounds = new mapboxgl.LngLatBounds();
                    bounds.extend(clientCoords);
                    bounds.extend(proCoords);
                    map.fitBounds(bounds, { padding: 60, maxZoom: 14, essential: true });

                })
                .catch((err) => console.error("Error retrieving profile data: ", err));
        }, (err) => console.error("Realtime Ticket Listener encountered a block:", err));
}
function drawConnectingVectorLine(map, start, end) {
    if (!map || typeof map.addSource !== 'function') return;

    map.addSource('route-line', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [start, end]
            }
        }
    });

    map.addLayer({
        'id': 'route-vector',
        'type': 'line',
        'source': 'route-line',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#f59e0b', 
            'line-width': 2,

        }
    });
} 

function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
} 

function clearLiveTrackingAssets(map) {
    if (!map) return;
    
    if (window.trackingMarkers && window.trackingMarkers.client) { 
        window.trackingMarkers.client.remove(); 
        window.trackingMarkers.client = null; 
    }
    if (window.trackingMarkers && window.trackingMarkers.pro) { 
        window.trackingMarkers.pro.remove(); 
        window.trackingMarkers.pro = null; 
    }
    
    try {
        if (map.getLayer('route-vector')) map.removeLayer('route-vector');
        if (map.getSource('route-line')) map.removeSource('route-line');
    } catch (e) {
        console.log("Tracking assets clear.");
    }
}

window.toggleMapFullscreen = function(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    const lightbox = document.getElementById('globalMapLightbox');
    const mapElement = document.getElementById('proMap');
    const originalSlot = document.getElementById('mapOriginalSlot');
    const lightboxSlot = document.getElementById('lightboxMapTarget');
    const mapInstance = window.proMapInstance;

    if (!lightbox || !mapElement || !originalSlot || !lightboxSlot || !mapInstance) {
        console.error("Map global tracking vectors missing from active scope.");
        return;
    }

    // Determine current state based on visibility class
    const isCurrentlyHidden = lightbox.classList.contains('hidden');

    if (isCurrentlyHidden) {
        // --- STEP A: POPUP LIGHTBOX ENGAGEMENT ---
        // Physical relocation to the root body lightbox node wrapper
        lightboxSlot.appendChild(mapElement);
        
        // Remove Tailwind hidden asset lock states
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Freeze dashboard screen scroll mechanics
    } else {
        // --- STEP B: RETURN TO DASHBOARD PROFILE GRID ---
        // Send the element right back to the original dashboard card housing element
        originalSlot.appendChild(mapElement);
        
        // Re-engage hidden overlay flags
        lightbox.classList.add('hidden');
        document.body.style.overflow = ''; // Unlock background document tracking
    }

    // --- STEP C: FORCE MAPBOX CANVAS RECOMPUTATION ---
    // Since the canvas dimensions warped violently, force immediate rasterization updates
    setTimeout(() => {
        mapInstance.resize();
    }, 60);
};
window.resetMapToInitialState = function(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    // 1. Clear out targeted pin telemetry
    if (window.activeTicketMarker) {
        window.activeTicketMarker.remove();
        window.activeTicketMarker = null;
    }
    if (window.activeTicketPopup) {
        window.activeTicketPopup.remove();
        window.activeTicketPopup = null;
    }

    // 2. Snap Mapbox camera parameters back to default configuration vectors
    const map = window.proMapInstance;
    if (map) {
        map.flyTo({
            center: window.initialMapCenter || [121.1114, 14.3142],
            zoom: window.initialMapZoom || 11,
            pitch: 0,
            bearing: 0,
            essential: true,
            duration: 1000
        });
    }

    // 3. Hide the Home/Reset view button layout layer
    const resetBtn = document.getElementById('mapResetViewBtn');
    if (resetBtn) {
        resetBtn.classList.add('hidden');
    }

    // --- NEW: SIDEBAR VIEWPORT SCROLL RECOVERY MATRIX ---
    // Safely pull the sidebar scroll container back up to the zero origin mark smoothly
    const sidebar = document.getElementById('profileSidebar');
    if (sidebar) {
        sidebar.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};
function loadHybridProsOnMap(map) {
    if (!map) return;

    // Fetch all verified pros who configured a hybrid setup
    db.collection('pro_registers')
        .where('serviceSetup', '==', 'hybrid')
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                console.log("No hybrid workshop locations registered yet.");
                return;
            }

            snapshot.forEach((doc) => {

    const proData = doc.data();
    const proId = doc.id;

    // Hide yourself
    if (proId === currentProUser?.id) return;

    const coords = proData.coordinates || proData.workshopCoordinates;

    if (!coords || coords.length !== 2) return;

    const proName =
        proData.name ||
        proData.fullName ||
        "Technician | Engineer";

          
                // Skip if this pro hasn't successfully generated coordinates
                if (!coords || coords.length !== 2) return;

                // Create a unique, distinct visual element for the Hybrid Pro Shop pin
                const hybridEl = document.createElement('div');
                hybridEl.className = 'custom-hybrid-shop-marker';
                hybridEl.innerHTML = `
                    <div class="relative flex items-center justify-center w-8 h-8 cursor-pointer group">
                        <span class="absolute inline-flex h-full w-full rounded-full bg-cyan-500/20 animate-pulse"></span>
                        <div class="w-7 h-7 rounded-full bg-slate-950 border border-cyan-500 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                            <i class="fa-solid fa-charging-station text-cyan-400 text-xs"></i>
                        </div>
                    </div>
                `;

                // Build a stylish dark telemetry popup card matching your brand theme
                const popupHTML = `
                    <div style="
                        color: #f8fafc; 
                        font-family: ui-monospace, monospace; 
                        padding: 10px; 
                        min-width: 170px;
                        background-color: #020617;
                        border: 1px solid #1e293b;
                        border-radius: 6px;
                    ">
                        <h4 style="margin: 0; font-weight: 700; font-size: 11px; color: #38bdf8; text-transform: uppercase;">
                            ${proName}
                        </h4>
                        <div style="margin-top: 4px; font-size: 10px; font-weight: 800; color: #ffffff; font-family: sans-serif;">
                            Circuit-Service <span style="color: #fbbf24;">⚡ In-shop & On-site Services</span>
                        </div>
                        <span style="font-size: 9px; color: #94a3b8; display: block; margin-top: 2px;">
                            ID: ${proId.substring(0, 8).toUpperCase()}
                        </span>
                        <div style="margin-top: 6px; font-size: 10px; color: #10b981; font-weight: bold;">
                            📍 Open for Walk-ins & Home Service
                        </div>
                    </div>
                `;

                // Drop the static Hybrid Pro marker onto the map
                new mapboxgl.Marker({ element: hybridEl })
                    .setLngLat(coords)
                    .setPopup(new mapboxgl.Popup({ offset: 15, closeButton: false }).setHTML(popupHTML))
                    .addTo(map);
            });
        })
        .catch((err) => console.error("Error mapping hybrid network:", err));
}
// --- UPDATE YOUR FOCUS METHOD TO ENGAGE OVERLAY VISIBILITY ON CLICK ---
window.viewTicketOnMap = function(event, lat, lng, ticketId, addressText) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    const map = window.proMapInstance;
    if (!map) return;

    // Flush any preceding targeting telemetry profiles
    if (window.activeTicketMarker) window.activeTicketMarker.remove();
    if (window.activeTicketPopup) window.activeTicketPopup.remove();

    // Spawn precise active targeting nodes
    const el = document.createElement('div');
    el.className = 'ticket-live-pin';
    el.innerHTML = `
        <div class="relative flex items-center justify-center w-8 h-8">
            <span class="absolute inline-flex h-full w-full rounded-full bg-amber-400/40 animate-ping opacity-75"></span>
            <i class="fa-solid fa-location-crosshairs text-amber-400 text-xl drop-shadow-[0_0_6px_#f59e0b] relative z-10"></i>
        </div>
    `;

    const popupHTML = `
        <div class="p-2 font-mono text-[10px] text-slate-300 bg-slate-950 border border-slate-800 rounded-lg shadow-xl">
            <div class="font-bold text-amber-400 border-b border-slate-800 pb-1 mb-1 flex items-center gap-1">
                <i class="fa-solid fa-xs fa-satellite"></i> Service Site: ${ticketId}
            </div>
            <div class="text-[10px] text-slate-300 leading-tight">${addressText}</div>
        </div>
    `;
    
    window.activeTicketPopup = new mapboxgl.Popup({ 
        offset: 15, 
        closeButton: false,
        className: 'custom-dark-popup' 
    }).setHTML(popupHTML);

    window.activeTicketMarker = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(window.activeTicketPopup)
        .addTo(map);

    // Dynamic wide angle 3D tilt tracking vector mapping switch
    map.flyTo({
        center: [lng, lat],
        zoom: 14.5,
        essential: true,
        pitch: 45,
        bearing: 0
    });

    window.activeTicketMarker.togglePopup();

    // REVEAL THE RESET RADAR CONTROLLER STRIP OVERLAY
    const resetBtn = document.getElementById('mapResetViewBtn');
    if (resetBtn) {
        resetBtn.classList.remove('hidden');
    }

    // Smooth interface scroll into position context matrix anchor points
    const mapElement = document.getElementById('proMap');
    if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};
// When the map loads, fetch dynamic data from Firestore
   async function loadAvailabilityStatus() {

    const currentUser = firebase.auth().currentUser;

    if (!currentUser) return;

    try {

        const doc = await db
            .collection("pro_registers")
            .doc(currentUser.uid)
            .get();

        if (!doc.exists) return;

        const data = doc.data();

        const isAvailable = data.isAvailable === true;

        document.getElementById("availabilityToggle").checked =
            isAvailable;

        document.getElementById("availabilityStatus").textContent =
            isAvailable
                ? "🟢 Available"
                : "🔴 Not Available";

    } catch(err) {

        console.error(err);

    }
}

window.proMarkers = [];

function loadMapLocations(mapInstance) {

    db.collection("pro_registers")
        .where("isAvailable", "==", true)
        .onSnapshot(snapshot => {

            window.proMarkers.forEach(marker => marker.remove());
            window.proMarkers = [];

            if(snapshot.empty){

                console.log("No available professionals.");

                return;
            }

            snapshot.forEach(doc => {

                const proData = doc.data();
				const specialtyCategoryMap = {
    "General Electronic Hardware Diagnostic & Repair": "General Repair",
    "Desktop/Laptop Repair & Upgrade Including Networking (wired/wireless)": "Computer & Networking",
    "Academic Project & Thesis Prototyping": "Academic Project",
    "Schematic Design Request & PCB Layout": "Schematic & PCB",
    "Software Application Interface Integration": "Software Application",
    "CCTV Installation & Camera Repair": "CCTV & Camera Repair",
    "Solar PV Installation, Repair & Upgrade": "Solar Installation",
    "Electric Vehicle & Power Inverter Board Repairs": "EV Converter & PV Inverter Repair"
};

                if (
                    !proData.coordinates ||
                    !Array.isArray(proData.coordinates) ||
                    proData.coordinates.length !== 2
                ) {
                    return;
                }

                const [lng, lat] =
                    proData.coordinates;

                if (
                    isNaN(lng) ||
                    isNaN(lat)
                ) {
                    return;
                }

                const activeProName = currentProUser?.name || currentProUser?.username || "Independent Tech|Engr";

                const specialties =
    (proData.specialties || []).map(item =>
        specialtyCategoryMap[item] || item
    );

                const serviceSetup =
                    proData.serviceSetup ||
                    "Unknown";

                const address =
                    proData.location ||
                    "No address available";
// Detect which page is open
const isClientDashboard = window.location.pathname.includes("client_dashboard");

// Only show the Request button on the client page
const requestButton = isClientDashboard
    ? `
        <button
            onclick="selectProFromMap('${doc.id}','${activeProName}')"
            style="
                width:100%;
                margin-top:10px;
                padding:8px;
                background:#0891b2;
                color:#fff;
                border:none;
                border-radius:6px;
                font-size:11px;
                font-weight:bold;
                cursor:pointer;
                transition:.2s;
            "
        >
            📩 Request Service
        </button>
    `
    : "";

const popupHTML = `
<div style="
    width:210px;
    font-family:Arial,sans-serif;
    color:#1e293b;
">

    <!-- Header -->
    <div style="
        background:#0f172a;
        color:#fff;
        padding:8px 10px;
        border-radius:8px 8px 0 0;
    ">

        <div style="
            font-size:14px;
            font-weight:bold;
        ">
            🔧 ${activeProName}
        </div>

        <div style="
            margin-top:2px;
            font-size:10px;
            color:#4ade80;
            font-weight:bold;
        ">
            🟢 Available
        </div>

    </div>

    <!-- Body -->
    <div style="
        background:#ffffff;
        padding:10px;
        border-radius:0 0 8px 8px;
        font-size:11px;
    ">

        <div style="margin-bottom:8px;">
            <strong>📍 Address</strong><br>
            <span style="color:#64748b;">
                ${address}
            </span>
        </div>

        <div style="margin-bottom:8px;">
            <strong>🚗 Service</strong><br>

            <span style="
                display:inline-block;
                background:#e0f2fe;
                color:#0369a1;
                border-radius:12px;
                padding:2px 8px;
                font-size:10px;
                font-weight:bold;
            ">
                ${serviceSetup}
            </span>
        </div>

        <div>
            <strong>🛠 Services</strong>

            <div style="
                display:flex;
                flex-wrap:wrap;
                gap:4px;
                margin-top:6px;
            ">

                ${specialties.map(service => `
                    <span style="
                        background:#f8fafc;
                        border:1px solid #cbd5e1;
                        border-radius:10px;
                        padding:2px 6px;
                        font-size:9px;
                        font-weight:600;
                    ">
                        ${service}
                    </span>
                `).join("")}

            </div>

        </div>

        ${requestButton}

    </div>

</div>
`;
                const marker =
                    new mapboxgl.Marker({
                        color: "#22c55e"
                    })
                    .setLngLat([lng, lat])
                    .setPopup(
                        new mapboxgl.Popup({
                            offset:25
                        })
                        .setHTML(popupHTML)
                    )
                    .addTo(mapInstance);

                window.proMarkers.push(marker);

            });

        });
}
async function toggleAvailability(isAvailable) {

    const currentUser = firebase.auth().currentUser;

    if (!currentUser) return;

    try {

        await db
            .collection("pro_registers")
            .doc(currentUser.uid)
            .update({

                isAvailable: isAvailable,

                lastSeen:
                    firebase.firestore.FieldValue.serverTimestamp()

            });

        document.getElementById("availabilityStatus").textContent =
            isAvailable
                ? "🟢 Available"
                : "🔴 Not Available";

        console.log(
            "Availability changed:",
            isAvailable
        );

    } catch(err) {

        console.error(err);

    }
}
window.selectProFromMap = function (proId, proName) {

    // Save selected professional
    document.getElementById("assignedProId").value = proId;
    document.getElementById("assignedProName").value = proName;

    // Show selected professional card
    document.getElementById("selectedProBusiness").textContent = proName;
    document.getElementById("selectedProCard").classList.remove("hidden");

    // Scroll to the request form
    document.getElementById("dashboardServiceRequestForm")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    // Highlight the form briefly
    const form = document.getElementById("dashboardServiceRequestForm");

    form.classList.add("ring-2","ring-cyan-400");

    setTimeout(()=>{
        form.classList.remove("ring-2","ring-cyan-400");
    },2000);

}
function clearSelectedProfessional(){

    document.getElementById("assignedProId").value="";
    document.getElementById("assignedProName").value="";

    document
        .getElementById("selectedProCard")
        .classList.add("hidden");

}

let proMapInstance = null;
let proMarkerInstance = null;

// Initialize layout dependencies on loading target page document nodes
document.addEventListener('DOMContentLoaded', () => {
    populateProCountries();
});

function populateProCountries() {
    const countrySelect = document.getElementById('proCountry');
    if (!countrySelect) return;
    
    countrySelect.innerHTML = '';
    
    // Default placeholder configuration node injection
    const placeholder = document.createElement('option');
    placeholder.value = "";
    placeholder.innerText = "Select Country";
    placeholder.disabled = true;
    placeholder.selected = true;
    countrySelect.appendChild(placeholder);
    
    // Sort global list alphabetically
    countriesList.sort((a, b) => a.name.localeCompare(b.name));

    countriesList.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.code;
        opt.innerText = c.name;
        countrySelect.appendChild(opt);
    });
}

window.onProCountryChange = function() {
    document.getElementById('proState').value = '';
    document.getElementById('proCity').value = '';
    document.getElementById('proCity').disabled = true;
};

// Cascading Engine Lookup Hook
async function searchProLocation(level) {
    const country = document.getElementById('proCountry').value;
    const stateInput = document.getElementById('proState');
    const cityInput = document.getElementById('proCity');
    const dropdown = document.getElementById(`pro${level.charAt(0).toUpperCase() + level.slice(1)}-dropdown`);
    
    let query = level === 'state' ? stateInput.value.trim() : cityInput.value.trim();
    if (!country || query.length < 2) {
        dropdown.classList.add('hidden');
        return;
    }

    let types = level === 'state' ? 'region' : 'place';
    let contextQuery = level === 'city' ? `${stateInput.value} ` : '';
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(contextQuery + query)}.json?access_token=${MAPBOX_TOKEN}&country=${country}&types=${types}&limit=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.features || data.features.length === 0) {
            dropdown.classList.add('hidden');
            return;
        }

        dropdown.innerHTML = '';
        dropdown.classList.remove('hidden');

        data.features.forEach(feature => {
            const item = document.createElement('div');
            item.className = 'px-3 py-2 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer text-xs transition-colors';
            item.innerText = feature.text;
            
            item.onclick = () => {
                if (level === 'state') {
                    stateInput.value = feature.text;
                    cityInput.disabled = false;
                    cityInput.value = '';
                } else {
                    cityInput.value = feature.text;
                    
                    const [lng, lat] = feature.center;
                    document.getElementById('proGeoLng').value = lng;
                    document.getElementById('proGeoLat').value = lat;
                    
                    if (proMapInstance) {
                        proMapInstance.flyTo({ center: [lng, lat], zoom: 14 });
                        proMarkerInstance.setLngLat([lng, lat]);
                    }
                    
                    document.getElementById('proDisplayLat').innerText = lat.toFixed(4);
                    document.getElementById('proDisplayLng').innerText = lng.toFixed(4);
                }
                dropdown.classList.add('hidden');
            };
            dropdown.appendChild(item);
        });
    } catch (err) {
        console.error("Pro Mapbox retrieval error: ", err);
    }
}

// Collapsible Mapping Canvas View toggles
function toggleProMap() {
    const wrapper = document.getElementById('proMapWrapper');
    if (!wrapper) return;
    
    wrapper.classList.toggle('hidden');
    
    if (!wrapper.classList.contains('hidden') && !proMapInstance) {
        setTimeout(initProVerificationMap, 120);
    }
}

function initProVerificationMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    
    let initialLng = parseFloat(document.getElementById('proGeoLng').value) || 121.1114;
    let initialLat = parseFloat(document.getElementById('proGeoLat').value) || 14.3142;

    // Force default coordinates into inputs immediately on load 
    // so it saves properly even if they don't drag the pin!
    document.getElementById('proGeoLat').value = initialLat;
    document.getElementById('proGeoLng').value = initialLng;
    document.getElementById('proDisplayLat').innerText = initialLat.toFixed(4);
    document.getElementById('proDisplayLng').innerText = initialLng.toFixed(4);

    proMapInstance = new mapboxgl.Map({
        container: 'proMapCanvas',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [initialLng, initialLat],
        zoom: 13
    });

    proMarkerInstance = new mapboxgl.Marker({ color: '#06b6d4', draggable: true })
        .setLngLat([initialLng, initialLat])
        .addTo(proMapInstance);

    // Update coordinates when moving the marker
    proMarkerInstance.on('dragend', () => {
        const lngLat = proMarkerInstance.getLngLat();
        document.getElementById('proGeoLat').value = lngLat.lat;
        document.getElementById('proGeoLng').value = lngLat.lng;
        document.getElementById('proDisplayLat').innerText = lngLat.lat.toFixed(4);
        document.getElementById('proDisplayLng').innerText = lngLat.lng.toFixed(4);
    });

    // OPTIONAL BONUS: Update marker when clicking somewhere else on the map
    proMapInstance.on('click', (e) => {
        proMarkerInstance.setLngLat(e.lngLat);
        document.getElementById('proGeoLat').value = e.lngLat.lat;
        document.getElementById('proGeoLng').value = e.lngLat.lng;
        document.getElementById('proDisplayLat').innerText = e.lngLat.lat.toFixed(4);
        document.getElementById('proDisplayLng').innerText = e.lngLat.lng.toFixed(4);
    });
}
// Global workspace click catch to clean up open dropdown interfaces
document.addEventListener('click', (e) => {
    if (!e.target.closest('#proTarget') && !e.target.closest('#proState-dropdown')) {
        document.getElementById('proState-dropdown')?.classList.add('hidden');
    }
    if (!e.target.closest('#proCity') && !e.target.closest('#proCity-dropdown')) {
        document.getElementById('proCity-dropdown')?.classList.add('hidden');
    }
});
async function updateProProfileDetails(userId) {
    const countrySelect = document.getElementById('proCountry');
    const countryVal = countrySelect.options[countrySelect.selectedIndex].text;
    const stateVal = document.getElementById('proState').value.trim();
    const cityVal = document.getElementById('proCity').value.trim();
    const streetVal = document.getElementById('proStreet').value.trim();

    const latVal = parseFloat(document.getElementById('proGeoLat').value);
    const lngVal = parseFloat(document.getElementById('proGeoLng').value);

    const consolidatedAddress = streetVal 
        ? `${streetVal}, ${cityVal}, ${stateVal}, ${countryVal}` 
        : `${cityVal}, ${stateVal}, ${countryVal}`;

    // Target your specialized professional data collections object mapping path
    await db.collection('pro_registers').doc(userId).update({
        location: consolidatedAddress,
        streetOrBarangay: streetVal || "N/A",
        city: cityVal,
        state: stateVal,
        country: countryVal,
        coordinates: [lngVal, latVal] // Saved for precise geolocation distance querying!
    });
}

async function handleClientPhotoUpload(){

    const input =
        document.getElementById("clientAvatarInput");

    if(!input.files.length)
        return;

    const file = input.files[0];

    const currentUser = firebase.auth().currentUser;

if (!currentUser) {
    alert("Please log in again.");
    return;
}

const clientId = currentUser.uid;

    if(!clientId){

        alert("Client session expired.");

        return;

    }

    const status =
        document.getElementById("clientUploadStatus");

    const preview =
        document.getElementById("clientAvatarPreview");

    const placeholder =
        document.getElementById("clientAvatarPlaceholder");
console.log("Status:", status);
console.log("Preview:", preview);
console.log("Placeholder:", placeholder);
    status.innerHTML="Uploading...";

    try{

        const storageRef =
            firebase.storage()
            .ref(`client_avatars/${clientId}/avatar_${Date.now()}`);

        const snapshot =
            await storageRef.put(file);

        const url =
            await snapshot.ref.getDownloadURL();

        await db.collection("client_users")
        .doc(clientId)
        .set({

            avatarUrl:url

        },{merge:true});

        preview.src=url;

        preview.classList.remove("hidden");

        placeholder.classList.add("hidden");

        status.innerHTML="✅ Uploaded";

        localStorage.setItem(
            "clientAvatarUrl",
            url
        );

    }

    catch(err){

        console.error(err);

        status.innerHTML="Upload Failed";

    }

}