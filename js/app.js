let currentCurrency = "USD";
let updateInterval = null;

async function navigateTo(page) {
    let content = '';
    
    switch(page) {
        case 'home':
            content = renderHomePage();
            break;
        case 'prices':
            content = renderPricesPage();
            break;
        case 'assets':
            content = renderAssetsPage();
            break;
        case 'login':
            content = renderLoginPage();
            break;
        default:
            content = renderHomePage();
    }
    
    document.getElementById('pageContent').innerHTML = content;
    attachPageEvents(page);
    
    if (page !== 'login') updateAllPrices();
    if (page === 'home') {
        initChart();
        updateChartData();
        loadNews();
    }
    if (page === 'prices') updatePricesDisplay();
    if (page === 'assets' && currentUser) renderAssets();
}

function attachPageEvents(pageId) {
    if (pageId === 'home') {
        initChart();
        loadNews();
        const refreshBtn = document.getElementById('refreshPriceBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => fetchGoldPrice());
        }
    }
    
    if (pageId === 'prices') {
        updatePricesDisplay();
    }
    
    if (pageId === 'assets' && currentUser) {
        loadAssetsForUser();
        renderAssets();
        
        const assetForm = document.getElementById('assetForm');
        if (assetForm) {
            assetForm.addEventListener('submit', (e) => {
                e.preventDefault();
                addAsset({
                    type: document.getElementById('assetType').value,
                    karat: parseInt(document.getElementById('assetKarat').value),
                    category: document.getElementById('assetCategory').value,
                    weight: parseFloat(document.getElementById('assetWeight').value),
                    purchasePrice: parseFloat(document.getElementById('assetPrice').value),
                    purchaseDate: document.getElementById('assetDate').value,
                    image: document.getElementById('assetImage').value || ""
                });
                e.target.reset();
            });
        }
        
        const searchInput = document.getElementById('searchAssets');
        if (searchInput) {
            searchInput.addEventListener('input', () => renderAssets());
        }
        
        const filterKarat = document.getElementById('filterKarat');
        if (filterKarat) {
            filterKarat.addEventListener('change', () => renderAssets());
        }
    }
    
    if (pageId === 'login') {
        const loginBtn = document.getElementById('doLogin');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                const email = document.getElementById('loginEmail').value;
                const result = loginUser(email);
                
                if (result.success) {
                    loadAssetsForUser();
                    updateNavAuth();
                    navigateTo('assets');
                } else {
                    alert(result.message);
                }
            });
        }
        
        const registerBtn = document.getElementById('doRegister');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                const name = document.getElementById('regName').value;
                const phone = document.getElementById('regPhone').value;
                const email = document.getElementById('regEmail').value;
                const gender = document.getElementById('regGender').value;
                
                const result = registerUser(name, phone, email, gender);
                
                if (result.success) {
                    alert("Registration successful! Please login.");
                    document.querySelector('#loginTab button').click();
                } else {
                    alert(result.message);
                }
            });
        }
    }
}


function toggleCurrency() {
    currentCurrency = currentCurrency === "USD" ? "JOD" : "USD";
    updateAllPrices();
    
    if (document.getElementById('price24K')) updatePricesDisplay();
    if (document.getElementById('assetsList')) renderAssets();
}


async function initApp() {
 
    checkSession();
    
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => logoutUser());
    }
    
    const currencyToggle = document.getElementById('currencyToggleBtn');
    if (currencyToggle) {
        currencyToggle.addEventListener('click', toggleCurrency);
    }
    
    await fetchGoldPrice();
    
    updateInterval = setInterval(fetchGoldPrice, 60000);
    
    navigateTo('home');
}

window.deleteAsset = deleteAsset;

document.addEventListener('DOMContentLoaded', initApp);