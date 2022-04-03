const SeedObj = { // 36개의 한자중 중복되지 않게 12개씩 뽑아내기 위함
    _seed1: 0, // 0~2^36의 이진수로, 1로 표시된 것이 1번째 세트에서 나올 한자들의 번호이다. (일의 자리부터 1번 한자의 유무 표시)
    _seed2: 0,
    _seed3: 0,
    _TOTALHANJA: 36,

    initSeed: function() {
        this.getSeedToCookie();
        if (this._seed1 == null) {
            let arr = Array(this._TOTALHANJA).fill().map((v,i)=> i+1); // 1부터 36까지의 배열
            
            for (let i = 0; i < arr.length; i++) {
                let j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }


            this._seed1 = this.arrToSeed(arr.slice(0, this._TOTALHANJA/3));
            this._seed2 = this.arrToSeed(arr.slice(this._TOTALHANJA/3, this._TOTALHANJA/3*2));
            this._seed3 = this.arrToSeed(arr.slice(this._TOTALHANJA/3*2, this._TOTALHANJA));
            
            this.setSeedToCookie();
        }
    },

    seedToArr: function(seedValue) {
        let arr = []
        for (let i = 1; i <= this._TOTALHANJA; i++) {
            if (seedValue % 2 == 1) {
                arr.push(i);
            }
            seedValue = parseInt(seedValue/2);
        }
        return arr;
    },

    arrToSeed: function(arrValue) {
        let total = 0;
        for (let i = 0; i < arrValue.length; i++) {
            total += 2 ** (arrValue[i] - 1);
        }
        return total;
    },

    setSeedToCookie: function() {
        CookieObj.setCookie("seed1", this._seed1);
        CookieObj.setCookie("seed2", this._seed2);
        CookieObj.setCookie("seed3", this._seed3);
    },
    
    getSeedToCookie: function() {
        this._seed1 = CookieObj.getCookie("seed1");
        this._seed2 = CookieObj.getCookie("seed2");
        this._seed3 = CookieObj.getCookie("seed3");
    },

    getIdxArray: function(seedNum) {
        if (seedNum == 1) {
            return this.seedToArr(this._seed1)
        } else if (seedNum == 2) {
            return this.seedToArr(this._seed2)
        } else if (seedNum == 3) {
            return this.seedToArr(this._seed3)
        }
    }
}

const StatusObj = {
    _mouseClicked: 0,
    _keyBoardClicked: 0,
    _mouseWheelClicked: 0,
    startedTime: 0,
    totalTime: 0,

    mouseClick: function() {
        this._mouseClicked += 1;
    },
    keyBoardClick: function() {
        this._keyBoardClicked += 1;
    },
    mouseWheelClick: function() {
        this._mouseWheelClicked += 1;
    },

    initStatus: function() {
        this.startedTime = new Date().getTime();
    },
    sendStatus: function() {
        this.totalTime = Math.floor((new Date().getTime() - this.startedTime) / 1000);
        
        CookieObj.setCookie("main2", this.totalTime*(10**12)+this._mouseClicked*(10**8)+this._keyBoardClicked*(10**4)+this._mouseWheelClicked);
    }
}

const HanjaObj = {
    _currentIdx: 1,
    hanjaImageIdx: [-1],
    TOTALIDX: 12,
    hanjaMeaning: {
        "easy": ["", "노래 가", "기 기", "한가지 동", "겨울 동", "오를 등", "올 래", "늙을 로", "마을 리", "수풀 림",
            "낯 면", "목숨 명", "글월 문", "물을 문", "일백 백", "지아비 부", "빛 색", "바 소", "말씀 어", "있을 유",
            "기를 육", "글자 자", "할아비 조", "살 주", "주인주", "무거울 중", "땅 지", "풀 초", "가을 추", "봄 춘",
            "여름 하", "꽃 화", "쉴 휴", "집 가", "길 도", "일 사", "번개 전"
        ],
        "normal": ["", "값 가", "맺을 결", "넓을 광", "예 구", "생각 념", "능할 능", "홀로 독", "흐를 류", "받들 봉",
            "말씀 설", "씻을 세", "잘 숙", "열매 실", "맺을 약", "전할 전", "마디 절", "씨 종", "붙을 착", "세울 건",
            "다툴 경", "생각할 고", "구원할 구", "줄 급", "기약할 기", "말씀 담", "떨어질 락", "거느릴 령", "헤아릴 료",
            "곱 배", "코 비", "책상 안", "배 선", "더울 열", "원할 원", "빌 축", "호수 호"
        ],
        "hard": ["", "다리 각", "칼 검", "기계 계", "밟을 답", "찢어질 렬", "겸손할 겸", "장막 막", "익을 숙",
            "탈 승", "바위 암", "미울 증", "취할 취", "다락 루", "재앙 화", "드물 희", "가로 횡", "욕심 욕", "아낄 석",
            "흙덩이 괴", "번뇌할 뇌", "눈물 루", "어두울 명", "무너질 붕", "뿌릴 파", "어두울 혼", "빛날 휘", "졸음 수",
            "둔할 둔", "민첩할 민", "배반할 반", "뛸 약", "화폐 폐", "돌아볼 고", "입술 순", "민망할 민", "줄 사"],
    },

    _preloadHanja: function() {
        for (let i = 1; i <= this.TOTALIDX; i++) {
            var img = new Image();
            img.src = "./img/" + CookieObj.getCookie("difficulty") + "-" + this.hanjaImageIdx[i].toString() + ".png";
        }
    },

    initHanja: function() {
        this.hanjaImageIdx = [-1].concat(SeedObj.getIdxArray(2));
        this._preloadHanja();
        this.showHanja();
    },

    // 현재 _currentIdx에 맞도록 화면 조정
    showHanja: function() {
        document.getElementById("mainHanjaImage").src = "./img/" + CookieObj.getCookie("difficulty") + "-" + this.hanjaImageIdx[this._currentIdx].toString() + ".png";
        document.getElementById("mainHanjaMeaning").innerText = this.hanjaMeaning[CookieObj.getCookie("difficulty")][this.hanjaImageIdx[this._currentIdx]];
        document.getElementById("hanjaIdx").innerText = this._currentIdx < 10 ? "0" + this._currentIdx.toString(): this._currentIdx.toString();
    
        if (this._currentIdx == 1) {
            document.getElementById("leftHanjaImage").src = "";
        } else {
            document.getElementById("leftHanjaImage").src = "./img/" + CookieObj.getCookie("difficulty") + "-" + this.hanjaImageIdx[this._currentIdx - 1].toString() + ".png";
        }

        if (this._currentIdx == this.TOTALIDX) {
            document.getElementById("rightHanjaImage").src = "";
        } else {
            document.getElementById("rightHanjaImage").src = "./img/" + CookieObj.getCookie("difficulty") + "-" + this.hanjaImageIdx[this._currentIdx + 1].toString() + ".png";
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
    }

}

const QuizObj = {
    _quizHanjaIdx: 0, // 문제로 출제되는 한자 번호
    _answerChoice: 0, // 정답선지

    initQuiz: function() {
        this._quizHanjaIdx = Math.floor(Math.random() * HanjaObj.TOTALIDX) + 1;
        this._answerChoice = Math.floor(Math.random() * 3) + 1;

        otherChoice1 = (this._answerChoice + 1 <= 3) ? this._answerChoice + 1 : 1; // 정답 선지 옆에 있는 것들 
        otherChoice2 = (this._answerChoice - 1 >= 1) ? this._answerChoice - 1 : 3;

        otherHanjaIdx1 = this._quizHanjaIdx + (Math.floor(Math.random() * 5) + 1);
        if (otherHanjaIdx1 > HanjaObj.TOTALIDX) otherHanjaIdx1 = otherHanjaIdx1 - HanjaObj.TOTALIDX + 1;
        otherHanjaIdx2 = this._quizHanjaIdx - (Math.floor(Math.random() * 5) + 1);
        if (otherHanjaIdx2 <= 0) otherHanjaIdx2 = otherHanjaIdx2 + HanjaObj.TOTALIDX; 

        // 정답 한자 이미지/선지 세팅
        document.getElementById("quizHanjaImage").src = "./img/" + CookieObj.getCookie("difficulty") + "-" + HanjaObj.hanjaImageIdx[this._quizHanjaIdx].toString() + ".png";
        document.getElementById("choice" + this._answerChoice.toString()).innerText = HanjaObj.hanjaMeaning[CookieObj.getCookie("difficulty")][HanjaObj.hanjaImageIdx[this._quizHanjaIdx]];
    
        // 오답 선지 세팅
        document.getElementById("choice" + otherChoice1.toString()).innerText = HanjaObj.hanjaMeaning[CookieObj.getCookie("difficulty")][HanjaObj.hanjaImageIdx[otherHanjaIdx1]];
        document.getElementById("choice" + otherChoice2.toString()).innerText = HanjaObj.hanjaMeaning[CookieObj.getCookie("difficulty")][HanjaObj.hanjaImageIdx[otherHanjaIdx2]];
    },

    submitQuiz: function() {
        if (document.getElementById("guess" + this._answerChoice.toString()).checked) {
            // 정답시
            document.querySelector(".alert").classList.add("visually-hidden");
            StatusObj.sendStatus();
            location.href='./tutorial3.html';
        } else {
            // 오답시
            document.querySelector(".alert").classList.remove("visually-hidden");
        }
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

        StatusObj.mouseWheelClick();
    },

    setEventListeners: function() {
        document.querySelector(".bi-arrow-left-square").addEventListener("click", () => {
            HanjaObj.prevHanja();
            StatusObj.mouseClick();
        });
        document.querySelector(".bi-arrow-right-square").addEventListener("click", () => {
            HanjaObj.nextHanja();
            StatusObj.mouseClick();
        });
        document.getElementById("goNextButton").addEventListener("click", () => {
            QuizObj.initQuiz();

        });
        document.getElementById("submitAnswer").addEventListener("click", () => {
            QuizObj.submitQuiz();
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
            StatusObj.keyBoardClick();
        });

        // for IE, Chrome, Opera
        window.addEventListener('mousewheel', this._mouseWheelEvent);
        // for FireFox
        window.addEventListener('DOMMouseScroll', this._mouseWheelEvent, false);
    }
}

function initConfig() {
    SeedObj.initSeed();
	EventObj.setEventListeners();
    HanjaObj.initHanja();
    StatusObj.initStatus();
}

document.addEventListener("DOMContentLoaded", () => {
	initConfig();
});