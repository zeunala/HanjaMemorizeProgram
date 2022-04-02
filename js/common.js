

function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
};


const CookieObj = {
    _EXPIRES: 24 * 60 * 60 * 1000, // 하루 후 만료

    setCookie: function (name, value) {
        var date = new Date();
        date.setTime(date.getTime() + this._EXPIRES);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    },

    getCookie: function (name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value ? value[2] : null;
    },

    deleteAllCookies: function () {
        document.cookie.split(";").forEach(
            function (c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            }
        );
    }
}