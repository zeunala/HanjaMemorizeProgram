const ConditionObj = {
    _mouseClicked: false,
    _keyBoardClicked: false,
    _mouseWheelClicked: false,
    _allConditionCorrect: false,

    _checkAllCondition: function() {
        if (this._allConditionCorrect) return

        if (this._mouseClicked && this._keyBoardClicked && this._mouseWheelClicked) {
            document.getElementById("goNextButton").removeAttribute("data-bs-target");
            document.getElementById("goNextButton").removeAttribute("data-bs-toggle");
            document.getElementById("goNextButton").addEventListener("click", () => {
                location.href='./main1.html';
            });
            this._allConditionCorrect = true;
        } else {
            document.getElementById("goNextButton").setAttribute("data-bs-target", "#warnModal");
        }
    },
    mouseClick: function() {
        if (this._mouseClicked) return;

        this._mouseClicked = true;
        this._checkAllCondition();
    },
    keyBoardClick: function() {
        if (this._keyBoardClicked) return;

        this._keyBoardClicked = true;
        this._checkAllCondition();
    },
    mouseWheelClick: function() {
        if (this._mouseWheelClicked) return;

        this._mouseWheelClicked = true;
        this._checkAllCondition();
    }
}

const HanjaObj = {
    _currentIdx: 1,
    _hanjaMeaning: ["","불 화", "물 수", "나무 목", "쇠 금", "흙 토"],
    TOTALIDX: 5,

    // 현재 _currentIdx에 맞도록 화면 조정
    showHanja: function() {
        document.getElementById("mainHanjaImage").src = "./img/" + "tutorial-" + this._currentIdx.toString() + ".png";
        document.getElementById("mainHanjaMeaning").innerText = this._hanjaMeaning[this._currentIdx];
        document.getElementById("hanjaIdx").innerText = this._currentIdx.toString();
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

        ConditionObj.mouseWheelClick();
    },

    setEventListeners: function() {
        document.querySelector(".bi-arrow-left-square").addEventListener("click", () => {
            HanjaObj.prevHanja();
            ConditionObj.mouseClick();
        });
        document.querySelector(".bi-arrow-right-square").addEventListener("click", () => {
            HanjaObj.nextHanja();
            ConditionObj.mouseClick();
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
            ConditionObj.keyBoardClick();
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