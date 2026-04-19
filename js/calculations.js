const OUNCE_TO_GRAM = 31.1035;
const USD_TO_JOD = 0.708;

const KARAT_MULTIPLIER = { 
    24: 1, 
    21: 21/24, 
    18: 18/24 
};


const COIN_WEIGHTS = {
    "Rashadi Lira": 7.2,
    "English Lira (Sovereign)": 7.98
};


const BARS = [
    { name: "1 Gram Bar", weight: 1 },
    { name: "5 Gram Bar", weight: 5 },
    { name: "10 Gram Bar", weight: 10 },
    { name: "1 Ounce Bar", weight: 31.1035 }
];


function getGramPriceUSD(ounceUSD) {
    return ounceUSD / OUNCE_TO_GRAM;
}


function getKaratPriceUSD(ounceUSD, karat) {
    let gramPrice = getGramPriceUSD(ounceUSD);
    return gramPrice * KARAT_MULTIPLIER[karat];
}


function getCoinPriceUSD(ounceUSD, coinType) {
    let weight = COIN_WEIGHTS[coinType];
    if (!weight) return 0;
    let purity = (coinType === "English Lira (Sovereign)") ? 0.9167 : 0.875;
    let gramPrice = getGramPriceUSD(ounceUSD);
    return weight * purity * gramPrice;
}


function getBarPriceUSD(ounceUSD, weightGram) {
    return weightGram * getGramPriceUSD(ounceUSD);
}


function convertToJOD(usdValue) {
    return usdValue * USD_TO_JOD;
}


function formatPrice(usdPrice, currency) {
    let val = currency === "USD" ? usdPrice : convertToJOD(usdPrice);
    let symbol = currency === "USD" ? "$" : "JOD";
    return `${symbol} ${val.toFixed(2)}`;
}


function getCurrentAssetValueUSD(asset, ounceUSD) {
    let gramPrice = getGramPriceUSD(ounceUSD);
    let karatMult = KARAT_MULTIPLIER[asset.karat] || 1;
    return asset.weight * gramPrice * karatMult;
}

// Calculate profit/loss
function calculateProfitLoss(currentValue, purchasePrice) {
    let profit = currentValue - purchasePrice;
    let percentage = purchasePrice ? (profit / purchasePrice * 100) : 0;
    return { profit, percentage };
}