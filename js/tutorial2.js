

const HanjaObj = {
    _currentIdx: 1,
    _hanjaMeaning: ["","불 화", "물 수", "나무 목", "쇠 금", "흙 토"],
    TOTALIDX: 5,

    // 현재 _currentIdx에 맞도록 화면 조정
    showHanja: function() {
        document.getElementById("mainHanjaImage").src = "./img/" + "tutorial-" + this._currentIdx.toString() + ".png";
        document.getElementById("mainHanjaMeaning").innerText = this._hanjaMeaning[this._currentIdx];
        document.getElementById("hanjaIdx").innerText = this._currentIdx.toString();

        if (this._currentIdx == 1) {
            document.getElementById("leftHanjaImage").src = "";
        } else {
            document.getElementById("leftHanjaImage").src = "./img/" + "tutorial-" + (this._currentIdx - 1).toString() + ".png";
        }

        if (this._currentIdx == this.TOTALIDX) {
            document.getElementById("rightHanjaImage").src = "";
        } else {
            document.getElementById("rightHanjaImage").src = "./img/" + "tutorial-" + (this._currentIdx + 1).toString() + ".png";
        }
    },

    prevHanja: function() {
        if (this._currentIdx - 1 <= 0) {
            return;
        } else {
            this._currentIdx -= 1;
            this.showHanja();
        }
    },

    nextHanja: function() {
        if (this._currentIdx + 1 > this.TOTALIDX) {
            return;
        } else {
            this._currentIdx += 1;
            this.showHanja();
        }
    },

    initHanja: function() {
        for (let i = 1; i <= this.TOTALIDX; i++) {
            var img = new Image();
            img.src = "./img/tutorial-" + i.toString() + ".png";
        }
        this.showHanja();
    }
}

const EventObj = {
    _mouseWheelEvent: function(e) {
        var delta = 0;

        /* For IE */
        if (!e) e = window.event;

        if (e.wheelDelta) delta = e.wheelDelta / 120; /* IE/Chrome/Opera */
        else if (e.detail) delta = -e.detail / 3; /* Mozilla case */


        if (delta > 0) HanjaObj.prevHanja();
        else if (delta < 0) HanjaObj.nextHanja();
    },

    setEventListeners: function() {
        document.querySelector(".bi-arrow-left-square").addEventListener("click", () => {
            HanjaObj.prevHanja();
        });
        document.querySelector(".bi-arrow-right-square").addEventListener("click", () => {
            HanjaObj.nextHanja();
        });

        window.addEventListener("keydown", (e) => {
            switch(e.key) {
                case "ArrowUp":
                case "ArrowLeft":
                    HanjaObj.prevHanja();
                    break;
                case "ArrowDown":
                case "ArrowRight":
                case " ":
                    HanjaObj.nextHanja();
                    break;
            }
        });

        // for IE, Chrome, Opera
        window.addEventListener('mousewheel', this._mouseWheelEvent);
        // for FireFox
        window.addEventListener('DOMMouseScroll', this._mouseWheelEvent, false);
    }
}

function initConfig() {
	EventObj.setEventListeners();
    HanjaObj.initHanja();
}

document.addEventListener("DOMContentLoaded", () => {
	initConfig();
});