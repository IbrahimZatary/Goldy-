let priceChart = null;
let chartLabels = [];
let chartPrices = [];

function renderHomePage() {
    return `
    <div class="row">
        <div class="col-12 mb-4">
            <div class="card card-gold p-3 text-center">
                <h3>Live Gold Spot Price <i class="bi bi-caret-up-fill gold-text live-badge"></i></h3>
                <h1 class="display-4 gold-text"><span class="live-ounce-price">$ ---</span>/oz</h1>
                <small>Last update: ${goldData.lastUpdate || '--'}</small>
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-warning" id="refreshPriceBtn">
                        <i class="bi bi-arrow-repeat"></i> Refresh
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="chart-container">
                <canvas id="goldChart" height="200"></canvas>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card card-gold p-3">
                <h5><i class="bi bi-newspaper"></i> Gold News</h5>
                <div id="newsSlider" class="small">Loading news...</div>
            </div>
        </div>
    </div>`;
}

function renderPricesPage() {
    return `<div class="card card-gold p-4">
        <h3><i class="bi bi-gem"></i> Gold Prices (per gram)</h3>
        <div class="row mt-3">
            <div class="col-md-4">
                <div class="bg-dark p-3 rounded text-center">
                    <h5>24K</h5>
                    <h3 id="price24K" class="gold-text">-</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="bg-dark p-3 rounded text-center">
                    <h5>21K</h5>
                    <h3 id="price21K" class="gold-text">-</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="bg-dark p-3 rounded text-center">
                    <h5>18K</h5>
                    <h3 id="price18K" class="gold-text">-</h3>
                </div>
            </div>
        </div>
        <h4 class="mt-4">Gold Coins</h4>
        <div class="row">
            <div class="col-md-6">
                <div class="bg-secondary p-3 rounded text-center">
                    Rashadi Lira<br>
                    <span id="rashadiPrice" class="gold-text fs-4">-</span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-secondary p-3 rounded text-center">
                    English Lira<br>
                    <span id="englishPrice" class="gold-text fs-4">-</span>
                </div>
            </div>
        </div>
        <h4 class="mt-4">Gold Bars</h4>
        <div class="row" id="barsList"></div>
    </div>`;
}

function renderAssetsPage() {
    if (!currentUser) {
        return `<div class="alert alert-warning">Please login to manage your gold assets.</div>`;
    }
    
    return `
    <div class="card card-gold p-4 mb-4">
        <h4><i class="bi bi-plus-circle"></i> Add New Asset</h4>
        <form id="assetForm">
            <div class="row g-3">
                <div class="col-md-3">
                    <select class="form-select" id="assetType" required>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Bars">Bars</option>
                        <option value="Coins">Coins</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select class="form-select" id="assetKarat" required>
                        <option value="24">24K</option>
                        <option value="21">21K</option>
                        <option value="18">18K</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" id="assetCategory" placeholder="Category" required>
                </div>
                <div class="col-md-2">
                    <input type="number" step="0.01" class="form-control" id="assetWeight" placeholder="Weight (g)" required>
                </div>
                <div class="col-md-2">
                    <input type="number" step="0.01" class="form-control" id="assetPrice" placeholder="Purchase Price (USD)" required>
                </div>
                <div class="col-md-3">
                    <input type="date" class="form-control" id="assetDate">
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" id="assetImage" placeholder="Image URL (optional)">
                </div>
                <div class="col-md-2">
                    <button type="submit" class="btn btn-gold w-100">Add Asset</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row mb-3">
        <div class="col-md-4">
            <input type="text" id="searchAssets" class="form-control" placeholder="🔍 Search assets...">
        </div>
        <div class="col-md-3">
            <select id="filterKarat" class="form-select">
                <option value="all">All Karats</option>
                <option value="24">24K</option>
                <option value="21">21K</option>
                <option value="18">18K</option>
            </select>
        </div>
    </div>
    <div class="row" id="assetsList"></div>`;
}

function renderLoginPage() {
    return `
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card card-gold p-4">
                <ul class="nav nav-tabs" id="authTab">
                    <li class="nav-item">
                        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#loginTab">Login</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#registerTab">Register</button>
                    </li>
                </ul>
                <div class="tab-content mt-3">
                    <div class="tab-pane active" id="loginTab">
                        <input type="email" id="loginEmail" class="form-control mb-2" placeholder="Email">
                        <button id="doLogin" class="btn btn-gold w-100">Login</button>
                    </div>
                    <div class="tab-pane" id="registerTab">
                        <input type="text" id="regName" class="form-control mb-2" placeholder="Full Name">
                        <input type="tel" id="regPhone" class="form-control mb-2" placeholder="Phone">
                        <input type="email" id="regEmail" class="form-control mb-2" placeholder="Email">
                        <select id="regGender" class="form-select mb-2">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        <button id="doRegister" class="btn btn-gold w-100">Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function updateAllPrices() {
    const ounceUSD = goldData.ouncePriceUSD;
    if (!ounceUSD) return;
    
    document.querySelectorAll('.live-ounce-price').forEach(el => {
        el.innerText = formatPrice(ounceUSD, currentCurrency);
    });
    
    if (document.getElementById('price24K')) updatePricesDisplay();
    if (document.getElementById('assetsList')) renderAssets();
}

function updatePricesDisplay() {
    let ounceUSD = goldData.ouncePriceUSD;
    if (!ounceUSD) return;
    
    const elements = {
        'price24K': getKaratPriceUSD(ounceUSD, 24),
        'price21K': getKaratPriceUSD(ounceUSD, 21),
        'price18K': getKaratPriceUSD(ounceUSD, 18),
        'rashadiPrice': getCoinPriceUSD(ounceUSD, "Rashadi Lira"),
        'englishPrice': getCoinPriceUSD(ounceUSD, "English Lira (Sovereign)")
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = formatPrice(value, currentCurrency);
    }
    
    const barsContainer = document.getElementById('barsList');
    if (barsContainer) {
        barsContainer.innerHTML = BARS.map(bar => `
            <div class="col-6 col-md-3 mb-3">
                <div class="bg-dark p-3 rounded text-center">
                    ${bar.name}<br>
                    <span class="gold-text fs-5">${formatPrice(getBarPriceUSD(ounceUSD, bar.weight), currentCurrency)}</span>
                </div>
            </div>
        `).join('');
    }
}

// Render assets list
function renderAssets() {
    const container = document.getElementById('assetsList');
    if (!container) return;
    
    const searchTerm = document.getElementById('searchAssets')?.value.toLowerCase() || "";
    const karatFilter = document.getElementById('filterKarat')?.value || "all";
    const filtered = filterAssets(searchTerm, karatFilter);
    
    if (filtered.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted">No assets added. Use form above.</div>`;
        return;
    }
    
    container.innerHTML = filtered.map(asset => {
        const currentValueUSD = getCurrentAssetValueUSD(asset, goldData.ouncePriceUSD || 2500);
        const { profit, percentage } = calculateProfitLoss(currentValueUSD, asset.purchasePrice);
        const profitClass = profit >= 0 ? 'profit' : 'loss';
        const profitSymbol = profit >= 0 ? '+' : '';
        
        return `
        <div class="col-md-6 col-lg-4 mb-3">
            <div class="card card-gold h-100">
                <div class="card-body">
                    <div class="d-flex gap-3">
                        ${asset.image ? 
                            `<img src="${asset.image}" class="asset-img" onerror="this.src='https://via.placeholder.com/80?text=Gold'">` : 
                            `<div class="asset-img bg-secondary d-flex align-items-center justify-content-center"><i class="bi bi-gem fs-1"></i></div>`
                        }
                        <div style="flex:1">
                            <h5 class="card-title">${asset.category || asset.type}</h5>
                            <p class="mb-1"><strong>Type:</strong> ${asset.type} | ${asset.karat}K</p>
                            <p class="mb-1"><strong>Weight:</strong> ${asset.weight}g</p>
                            <p class="mb-1"><strong>Purchase:</strong> ${formatPrice(asset.purchasePrice, currentCurrency)}</p>
                            <p class="mb-1"><strong>Current Value:</strong> ${formatPrice(currentValueUSD, currentCurrency)}</p>
                            <p class="${profitClass}">P/L: ${profitSymbol}${formatPrice(Math.abs(profit), currentCurrency)} (${percentage.toFixed(1)}%)</p>
                            <button class="btn btn-sm btn-danger mt-2" onclick="window.deleteAsset(${asset.id})">
                                <i class="bi bi-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
}

// Initialize chart
function initChart() {
    const ctx = document.getElementById('goldChart')?.getContext('2d');
    if (!ctx) return;
    
    if (priceChart) priceChart.destroy();
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Gold Price (USD/oz)',
                data: chartPrices,
                borderColor: '#FFD966',
                backgroundColor: 'rgba(255,217,102,0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { labels: { color: '#eee' } }
            },
            scales: {
                y: { ticks: { color: '#ccc' } },
                x: { ticks: { color: '#ccc' } }
            }
        }
    });
}

// Update chart data
function updateChartData() {
    const history = localStorage.getItem("goldPriceHistory");
    const arr = history ? JSON.parse(history) : [];
    
    chartLabels = arr.map(p => p.time);
    chartPrices = arr.map(p => p.price);
    
    if (priceChart) {
        priceChart.data.labels = chartLabels;
        priceChart.data.datasets[0].data = chartPrices;
        priceChart.update();
    }
}

// Load and display news
async function loadNews() {
    const newsDiv = document.getElementById('newsSlider');
    if (!newsDiv) return;
    
    const articles = await fetchGoldNews();
    
    if (articles.length > 0) {
        newsDiv.innerHTML = articles.map(a => `
            <div class="mb-3">
                <a href="${a.url}" target="_blank" class="text-warning text-decoration-none">${a.title}</a>
                <br><small class="text-muted">${a.source.name} • ${new Date(a.publishedAt).toLocaleDateString()}</small>
            </div>
        `).join('');
    } else {
        newsDiv.innerHTML = `
            <div class="text-muted">
                <i class="bi bi-info-circle"></i> Gold prices remain stable amid market uncertainty.
            </div>
        `;
    }
}