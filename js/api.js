const GOLD_API_KEY = "ok_20ce9ba90f57fb47e48022da69fce60e"; 
const NEWS_API_KEY = "a79a6ba4dbb7576b0372cf69f6bbf333"; 

let goldData = { 
    ouncePriceUSD: 0, 
    ouncePriceJOD: 0, 
    lastUpdate: null 
};

async function fetchGoldPrice() {
    try {
        const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
            headers: { 
                "x-access-token": GOLD_API_KEY, 
                "Content-Type": "application/json" 
            }
        });
        
        if (!response.ok) throw new Error("API limit or key invalid");
        
        const data = await response.json();
        let ounceUSD = data.price;
        
        if (ounceUSD && ounceUSD > 0) {
            goldData.ouncePriceUSD = ounceUSD;
            goldData.ouncePriceJOD = ounceUSD * USD_TO_JOD;
            goldData.lastUpdate = new Date().toISOString();
            
            storePriceForChart(ounceUSD);
            
            if (typeof updateAllPrices === 'function') updateAllPrices();
            return;
        }
        throw new Error("Invalid data");
    } catch (err) {
        console.warn("Gold API error, using simulated price:", err);
        // Fallback simulation
        let simulated = 2350 + (Math.random() * 80 - 40);
        goldData.ouncePriceUSD = simulated;
        goldData.ouncePriceJOD = simulated * USD_TO_JOD;
        goldData.lastUpdate = new Date().toISOString();
        storePriceForChart(simulated);
        if (typeof updateAllPrices === 'function') updateAllPrices();
    }
}

function storePriceForChart(priceUSD) {
    let history = localStorage.getItem("goldPriceHistory");
    let arr = history ? JSON.parse(history) : [];
    let now = new Date();
    let timeLabel = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    
    arr.push({ time: timeLabel, price: priceUSD });
    if (arr.length > 30) arr.shift();
    
    localStorage.setItem("goldPriceHistory", JSON.stringify(arr));
    
    if (typeof updateChartData === 'function') updateChartData();
}

async function fetchGoldNews() {
    try {
        const response = await fetch(`https://gnews.io/api/v4/search?q=gold%20price&lang=en&max=5&apikey=${NEWS_API_KEY}`);
        
        if (!response.ok) throw new Error("News API error");
        
        const data = await response.json();
        return data.articles || [];
    } catch (err) {
        console.warn("News API error:", err);
        return [];
    }
}