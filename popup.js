const checkbox = document.getElementById('checkbox');
let debuggerEnabled;

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;

    chrome.storage.local.get([url], function(items){ 
          console.log(items)

        debuggerEnabled = url in items

        console.log(debuggerEnabled)

        if (debuggerEnabled == true) {
            checkbox.checked = true
        } else {
            checkbox.checked = false
        }
    });

    document.getElementById('switch').addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        debuggerEnabled = checkbox.checked;

        if (debuggerEnabled == true) {
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                files: ["debug.css"]
            });
            chrome.storage.local.set({ [url]: null });
        } else {
            chrome.scripting.removeCSS({
                target: { tabId: tab.id },
                files: ["debug.css"]
            });
            chrome.storage.local.remove([url]);
        }
    });

});

