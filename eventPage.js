// eventPage.js
console.log('Activating eventPage.js');

const trackEvent = (category, action, label) => {
    const data = {
        // API Version.
        v: '1',
        // Tracking ID / Property ID.
        tid: "UA-146926077-1",
        // Anonymous Client Identifier. Ideally, this should be a UUID that
        // is associated with particular user, device, or browser instance.
        cid: '1',
        // Event hit type.
        t: 'event',
        // Event category.
        ec: category,
        // Event action.
        ea: action,
        // Event label.
        el: label,
    };

    return $.post('http://www.google-analytics.com/collect', data);
};

const contextMenuItem = {
    "id": "proxibidContextMenuItem",
    "title": "Search on Proxibid",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    console.log(clickData.selectionText);
    trackEvent("search-on-proxibid", clickData.selectionText||"unknown",'search');
    const searchURL = `https://www.proxibid.com/asp/SearchAdvanced_i.asp?searchTerm=${clickData.selectionText}&category=all%20categories&timestamp=694#searchid=0&type=auctionCompany&search=${clickData.selectionText}&sort=relevance&view=gallery&length=25&refine=&category=all%20categories&start=1`
    chrome.tabs.create({url: searchURL});
})