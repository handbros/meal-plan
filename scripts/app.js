// ==================================================
// TEST
// ==================================================
var test = {
    localStorage: (!storage.localStorage ? false : true),
    sessionStorage: (!window.sessiontorage ? false : true),
    indexedDB: (!window.indexedDB ? false : true)
};

// ==================================================
// APP
// ==================================================
var app = {
    isOnline: (navigator.onLine),
    isDevMode: (window.location.hostname.toLowerCase() != "handbros.github.io"),
    isStandaloneMode: (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://'),
    error: (code, message) => {
        var url = "./error.html";
        url += "?code=" + encodeURI(code);
        url += "&message=" + encodeURI(message);
        location.href = url;
    }
}

// ==================================================
// SETTINGS
// ==================================================
var settings = {
    instance: {},
    read: () => {
        let settingsJson = storage.localStorage.getItem("MPOV_SETTINGS");

        if (settingsJson != null) {
            settings.instance = JSON.parse(settingsJson);
        }
    },
    write: () => {
        let settingsJson = JSON.stringify(settings.instance);
        storage.localStorage.setItem("MPOV_SETTINGS", settingsJson);
    }
};

// ==================================================
// API
// ==================================================
var api = {
    request: (date, callback) => {
        const URL_API_TODAY = "https://puls.pulmuone.com/plurestaurant/src/sql/menu/today_sql.php";
        // const URL_API_WEEK = "https://puls.pulmuone.com/plurestaurant/src/sql/menu/week_sql.php";
        // To use Week API, you should change such parameters: requestId = search_week, srchOperCd -> topOperCd, srchAssignCd -> topAssignCd, srchCurDay -> menuDay.

        var url = new URL(URL_API_TODAY);
        url.searchParams.append("requestId", "search_schMenu");
        url.searchParams.append("requestUrl", url.pathname);
        url.searchParams.append("requestMode", 1); // Note: 1-AJAX Mode, 2-Submit Mode, 3-Debug Mode
        url.searchParams.append("requestParam", JSON.stringify({"srchOperCd": "O000002", "srchAssignCd": "S000500", "srchCurDay": date})); // Note: If the date is 0, it is changed to today.
    
        fetch(url.toString())
        .then((response) => response.json())
        .then((data) => callback(data));
    },
    test: () => {

    }
};

// ==================================================
// Storage & Database
// ==================================================
var storage = {
    quota: async () => {
        if (navigator.storage && navigator.storage.estimate) { 
            const estimate = await navigator.storage.estimate();
            return estimate.quota;
        } else {
            return -1;
        }
    },
    usage: async () => {
        if (navigator.storage && navigator.storage.estimate) { 
            const estimate = await navigator.storage.estimate();
            return estimate.usage;
        } else {
            return -1;
        }
    },
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage
}

// From : https://stackoverflow.com/questions/15861630/how-can-i-remove-a-whole-indexeddb-database-from-javascript

var IndexedDB = {
    name: "MPOV",
    version: 1,
    instance: {},
    storenames: {
        data: "MPOV_DATA",
        image: "MPOV_IMAGE",
        review: "MPOV_REVIEW"
    },
    defaultErrorHandler: function (e) {
        console.error("An error has occurred.", e);
    },
    setDefaultErrorHandler: function (request) {
        if ("onerror" in request) {
            request.onerror = db.defaultErrorHandler;
        }
        if ("onblocked" in request) {
            request.onblocked = db.defaultErrorHandler;
        }
    }
};

var date = new Date();
var DataRecord = {
    date: date,
    json: ''
};

var ImageRecord = {
    id: 0,
    data: '' // BLOB
};

var ReviewRecord = {
    name: '',
    score: 0,
    comment: ''
};

var Database = {

};

function createDatabase(callback) {
    let database;
    const request = window.indexedDB.open('MPOV');

    request.onupgradeneeded = (e) => {
        database = e.target.result;
        database.createObjectStore("MPOV_MEALPLAN", {keyPath: "id"});
        database.createObjectStore("MPOV_THUMBNAIL", {keyPath: "id"});
        request.onerror = (e) => console.error("Failed to create a database.");
        request.onsuccess = (e) => database = request.result;
    };
}

function removeDatabase(callback) {
    const request = window.indexedDB.deleteDatabase('MPOV');
    request.onerror = (e) => {
        console.error("Failed to remove the database.", e);
        callback(e);
    }

    request.onblocked = (e) => {
        console.error("Failed to remove the database due to the operation being blocked", e);
        callback(e);
    }

    request.onsuccess = (e) => {
        console.log("Removed the database successfully.");
        callback(e);
    }
}

// ==================================================
// EVENT LISTENERS
// ==================================================
window.addEventListener('load', () => {
    if (!app.isDevMode && !app.isInStandaloneMode) {
        app.error("ERR_NOT_PWA", "애플리케이션 설치 상태에서만 사용 가능한 기능입니다.");
        return;
    }

    settings.read();

    // Note: Add event listeners to detect network connection changes.
    ui.badge.networkStatus(app.isOnline);

    window.addEventListener("online", () => {
        app.isOnline = true;
        ui.badge.networkStatus(true);
    });
        
    window.addEventListener("offline", () => {
        app.isOnline = false;
        ui.badge.networkStatus(false);
    });
});


window.addEventListener('pagehide', () => {
    settings.write();
});