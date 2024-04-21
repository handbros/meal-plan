window.addEventListener('load', () => {
    //requestWeeklyData("20240421", (data) => {console.log(data)});
});

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