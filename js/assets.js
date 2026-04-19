let userAssets = [];

function loadAssetsForUser() {
    if (!currentUser) return [];
    
    let all = localStorage.getItem(`assets_${currentUser.email}`);
    userAssets = all ? JSON.parse(all) : [];
    return userAssets;
}

function saveAssets() {
    if (currentUser) {
        localStorage.setItem(`assets_${currentUser.email}`, JSON.stringify(userAssets));
    }
}

function addAsset(asset) {
    asset.id = Date.now();
    asset.createdAt = new Date().toISOString();
    userAssets.push(asset);
    saveAssets();
    
    if (typeof renderAssets === 'function') renderAssets();
    return asset;
}

function deleteAsset(id) {
    userAssets = userAssets.filter(a => a.id != id);
    saveAssets();
    
    if (typeof renderAssets === 'function') renderAssets();
}

function updateAsset(id, updatedData) {
    const index = userAssets.findIndex(a => a.id == id);
    if (index !== -1) {
        userAssets[index] = { ...userAssets[index], ...updatedData };
        saveAssets();
        if (typeof renderAssets === 'function') renderAssets();
    }
}

function filterAssets(searchTerm, karatFilter) {
    let filtered = [...userAssets];
    
    if (searchTerm) {
        filtered = filtered.filter(a => 
            a.category?.toLowerCase().includes(searchTerm) || 
            a.type?.toLowerCase().includes(searchTerm)
        );
    }
    
    if (karatFilter && karatFilter !== "all") {
        filtered = filtered.filter(a => a.karat == karatFilter);
    }
    
    return filtered;
}