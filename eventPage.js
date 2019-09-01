// eventPage.js
console.log('Activating eventPage.js');

const contextMenuItem = {
    "id": "proxibidContextMenuItem",
    "title": "Search on Proxibid",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    console.log(clickData.selectionText)
    const searchURL = `https://www.proxibid.com/asp/SearchAdvanced_i.asp?searchTerm=${clickData.selectionText}&category=all%20categories&timestamp=694#searchid=0&type=auctionCompany&search=${clickData.selectionText}&sort=relevance&view=gallery&length=25&refine=&category=all%20categories&start=1`
    chrome.tabs.create({url: searchURL});
})