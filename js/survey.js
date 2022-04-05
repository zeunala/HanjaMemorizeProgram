const SendObj = {
    _userId: 0,

    sendStatus: function () {
        if (this._userId == 0) this._userId = Math.floor(Math.random() * (10 ** 8));

        let templateParams = {
            userId: this._userId,
            difficulty: CookieObj.getCookie("difficulty"),
            seed1: CookieObj.getCookie("seed1"),
            seed2: CookieObj.getCookie("seed2"),
            seed3: CookieObj.getCookie("seed3"),

            time1: CookieObj.getCookie("main1").slice(0, -12),
            mouseclick1: CookieObj.getCookie("main1").slice(-12, -8),
            keyboard1: CookieObj.getCookie("main1").slice(-8, -4),
            mouseother1: CookieObj.getCookie("main1").slice(-4),

            time2: CookieObj.getCookie("main2").slice(0, -12),
            mouseclick2: CookieObj.getCookie("main2").slice(-12, -8),
            keyboard2: CookieObj.getCookie("main2").slice(-8, -4),
            mouseother2: CookieObj.getCookie("main2").slice(-4),

            time3: CookieObj.getCookie("main3").slice(0, -12),
            mouseclick3: CookieObj.getCookie("main3").slice(-12, -8),
            keyboard3: CookieObj.getCookie("main3").slice(-8, -4),
            mouseother3: CookieObj.getCookie("main3").slice(-4)
        }

        if (CookieObj.getCookie("email1")) {
            // 이미 이메일을 보낸 경우 다시 보내지 않음
            console.log(templateParams);
        } else {
            // 중간결과 이메일 전송
            CookieObj.setCookie("email1", 1);
            emailjs.send("service_fynr379", "template_bxfhf2l", templateParams);
        }
    },

    sendAllData: function () {
        if (this._userId == 0) this._userId = Math.floor(Math.random() * (10 ** 8));

        let templateParams = {
            userId: this._userId,
            difficulty: CookieObj.getCookie("difficulty"),
            seed1: CookieObj.getCookie("seed1"),
            seed2: CookieObj.getCookie("seed2"),
            seed3: CookieObj.getCookie("seed3"),

            time1: CookieObj.getCookie("main1").slice(0, -12),
            mouseclick1: CookieObj.getCookie("main1").slice(-12, -8),
            keyboard1: CookieObj.getCookie("main1").slice(-8, -4),
            mouseother1: CookieObj.getCookie("main1").slice(-4),

            time2: CookieObj.getCookie("main2").slice(0, -12),
            mouseclick2: CookieObj.getCookie("main2").slice(-12, -8),
            keyboard2: CookieObj.getCookie("main2").slice(-8, -4),
            mouseother2: CookieObj.getCookie("main2").slice(-4),

            time3: CookieObj.getCookie("main3").slice(0, -12),
            mouseclick3: CookieObj.getCookie("main3").slice(-12, -8),
            keyboard3: CookieObj.getCookie("main3").slice(-8, -4),
            mouseother3: CookieObj.getCookie("main3").slice(-4),

            age: document.getElementById("age").value,
            rate1: document.getElementById("rate1").value,
            rate2: document.getElementById("rate2").value,
            rate3: document.getElementById("rate3").value,
            review: document.getElementById("review").value,

            userAgent: navigator.userAgent,
            start: CookieObj.getCookie("start")
        }

        if (CookieObj.getCookie("email2")) {
            // 이미 이메일을 보낸 경우 다시 보내지 않음
            console.log(templateParams);
        } else {
            // 최종결과 이메일 전송
            CookieObj.setCookie("email2", 1);
            emailjs.send("service_fynr379", "template_rg5h9gx", templateParams);
        }
        setTimeout(function () { // 이메일 전송 후 result 화면으로 이동하도록 대기시간을 줌
            location.href = './result.html';
        }, 500);
    }
}

const EventObj = {
    setEventListeners: function () {
        document.getElementById("surveySubmit").addEventListener("click", () => {
            SendObj.sendAllData();
        });
    }
}

function initConfig() {
    SendObj.sendStatus();
    EventObj.setEventListeners();
}

document.addEventListener("DOMContentLoaded", () => {
    initConfig();
});