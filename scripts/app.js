let isOnline = false;

// ==================================================
// APPS
// ==================================================
const isDevMode = (window.location.hostname.toLowerCase() != "handbros.github.io");

const isInStandaloneMode = () =>
    (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');

function throwError(code, message) {
    var url = "./error.html";
    url += "?code=" + encodeURI(code);
    url += "&message=" + encodeURI(message);
    location.href = url;
}

// ==================================================
// SETTINGS
// ==================================================
let settings = {
    "theme": "light"
};

// ==================================================
// API
// ==================================================
const URL_API_TODAY = "https://puls.pulmuone.com/plurestaurant/src/sql/menu/today_sql.php";
const URL_API_WEEK = "https://puls.pulmuone.com/plurestaurant/src/sql/menu/week_sql.php";

function requestDailyData(date, callback) {
    var url = new URL(URL_API_TODAY);
    url.searchParams.append("requestId", "search_schMenu");
    url.searchParams.append("requestUrl", url.pathname);
    url.searchParams.append("requestMode", 1); // Note: 1-AJAX Mode, 2-Submit Mode, 3-Debug Mode
    url.searchParams.append("requestParam", JSON.stringify({"srchOperCd": "O000002", "srchAssignCd": "S000500", "srchCurDay": date})); // Note: If the date is 0, it is changed to today.

    fetch(url.toString())
    .then((response) => response.json())
    .then((data) => callback(data));
}

function requestWeeklyData(date, callback) {
    var url = new URL(URL_API_WEEK);
    url.searchParams.append("requestId", "search_week");
    url.searchParams.append("requestUrl", url.pathname);
    url.searchParams.append("requestMode", 1); // Note: 1-AJAX Mode, 2-Submit Mode, 3-Debug Mode
    url.searchParams.append("requestParam", JSON.stringify({"topOperCd": "O000002", "topAssignCd": "S000500", "menuDay": date})); // Note: If the date is 0, it is changed to today.

    fetch(url.toString())
    .then((response) => response.json())
    .then((data) => callback(data));
}

// ==================================================
// Storage & Database
// ==================================================
async function storageQuota() {
    if (navigator.storage && navigator.storage.estimate) { 
        const estimate = await navigator.storage.estimate();
        return estimate.quota;
    } else {
        return -1;
    }
}

async function storageUsage() {
    if (navigator.storage && navigator.storage.estimate) { 
        const estimate = await navigator.storage.estimate();
        return estimate.usage;
    } else {
        return -1;
    }
}

window.addEventListener('load', () => {
    if (!isDevMode && !isInStandaloneMode) {
        throwError("ERR_NOT_PWA", "애플리케이션 설치 상태에서만 사용 가능한 기능입니다.");
        return;
    }

    // Note: Get settings.
    let settingsJson = window.localStorage.getItem("MPOV_SETTINGS");

    if (settingsJson != null) {
        settings = JSON.parse(settingsJson);
    }

    // Note: Add event listeners to detect network connection changes.
    isOnline = navigator.onLine;
    displayNetworkStatus(isOnline);

    window.addEventListener("online", () => {
        isOnline = true;
        displayNetworkStatus(true);
    });
        
    window.addEventListener("offline", () => {
        isOnline = false;
        displayNetworkStatus(false);
    });
});


window.addEventListener('pagehide', () => {
    // Note: Save settings.
    let settingsJson = JSON.stringify(settings);
    window.localStorage.setItem("MPOV_SETTINGS", settingsJson);
});