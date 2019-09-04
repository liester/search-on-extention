// eventPage.js
console.log('Activating eventPage.js');

const trackEvent = (category, action, label) => {
    const data = {
        // API Version.
        v: '1',
        // Tracking ID / Property ID.
        tid: "UA-291821-1",
        // Anonymous Client Identifier. Ideally, this should be a UUID that
        // is associated with particular user, device, or browser instance.
        cid: '1',
        // Event hit type.
        t: 'event',
        // Event category.
        ec: category,
        // Event action.
        ea: action
    };

    return $.post('http://www.google-analytics.com/collect', data);
};

const contextMenuItem = {
    "id": "proxibidContextMenuItem",
    "title": "Search on Proxibid",
    "contexts": ["selection"]
};

const medium = "search-chrome-extension";
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    console.log(clickData.selectionText);

    trackEvent(medium, clickData.selectionText||"unknown");

    const searchURL = `https://www.proxibid.com/asp/SearchAdvanced_i.asp?searchTerm=${clickData.selectionText}&utm_source=${clickData.pageUrl}&utm_medium=${medium}&utm_campaign=${medium}`
    chrome.tabs.create({url: searchURL});
})