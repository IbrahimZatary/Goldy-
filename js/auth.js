
let currentUser = null;


function registerUser(name, phone, email, gender) {
    let users = JSON.parse(localStorage.getItem("goldAppUsers") || "[]");
    
    if (users.find(u => u.email === email)) {
        return { success: false, message: "Email already exists" };
    }
    
    users.push({ name, phone, email, gender });
    localStorage.setItem("goldAppUsers", JSON.stringify(users));
    
    return { success: true, message: "Registration successful" };
}


function loginUser(email) {
    let users = JSON.parse(localStorage.getItem("goldAppUsers") || "[]");
    let user = users.find(u => u.email === email);
    
    if (user) {
        currentUser = user;
        sessionStorage.setItem("goldSession", JSON.stringify(user));
        return { success: true, user: user };
    }
    
    return { success: false, message: "User not found" };
}


function logoutUser() {
    currentUser = null;
    sessionStorage.removeItem("goldSession");
    if (typeof updateNavAuth === 'function') updateNavAuth();
    if (typeof navigateTo === 'function') navigateTo("home");
}


function checkSession() {
    let sess = sessionStorage.getItem("goldSession");
    if (sess) {
        currentUser = JSON.parse(sess);
        if (typeof loadAssetsForUser === 'function') loadAssetsForUser();
        if (typeof updateNavAuth === 'function') updateNavAuth();
        return true;
    }
    return false;
}

function updateNavAuth() {
    const authNav = document.getElementById('authNav');
    const logoutNav = document.getElementById('logoutNav');
    
    if (currentUser) {
        if (authNav) authNav.classList.add('d-none');
        if (logoutNav) logoutNav.classList.remove('d-none');
    } else {
        if (authNav) authNav.classList.remove('d-none');
        if (logoutNav) logoutNav.classList.add('d-none');
    }
}