const EventObj = {
    _hanjaOff: true,

    _showAllHanja: function () {
        if (this._hanjaOff) {
            document.querySelectorAll(".card").forEach((e) => {
                e.querySelector(".card-body").classList.remove("text-light");
            });
        } else {
            document.querySelectorAll(".card").forEach((e) => {
                e.querySelector(".card-body").classList.add("text-light");
            });
        }

        this._hanjaOff = !this._hanjaOff;
    },

    setEventListeners: function () {
        document.querySelectorAll(".card").forEach((e) => {
            e.addEventListener("click", () => {
                e.querySelector(".card-body").classList.toggle("text-light");
            })
        });

        window.addEventListener("keydown", (e) => {
            if (e.key == " ") {
                e.preventDefault();
                this._showAllHanja();
            }
        });

        window.addEventListener("mousedown", (e) => {
            if (e.button == 2) {
                e.preventDefault();
                this._showAllHanja();
            }
        });

        document.oncontextmenu = function () { return false; };
    }
}

function initConfig() {
    EventObj.setEventListeners();

}

document.addEventListener("DOMContentLoaded", () => {
    initConfig();
});