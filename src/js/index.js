import "../sass/index.scss";
import {calSize} from "./utils/cal_size.js"
import {tab} from "./utils/tab.js"

$(()=> {
    calSize();

    $("body").fadeIn(1000);

    //로그인하기 버튼
    $("#indexBtn").on("click", (e) => {
        e.preventDefault();
        $(".index").fadeOut(500);
    });

    //로그인 버튼
    $("#loginBtn").on("click", (e) => {
        e.preventDefault();
        let inputText = $(".input-text");
        for (let i = 0; i < inputText.length; i++) {
            if ($(inputText[i]).val() == "") {
                alert(`${$(inputText[i]).data("msg")}를 입력해주세요.`);
                return false;
            }
        }
    });
    
    //아이디,비밀번호 키 변화 이벤트
    $(".input-text").on("keydown", function (e) {
        tab(".input-text", this, e);
    });

    $(".input-sign-text").on("keydown", function (e) {
        tab(".input-sign-text", this, e);
    });

    //회원가입 버튼(로그인창)
    $("#signIn").on("click", (e) => {
        e.preventDefault();
        $("#signDialog").fadeIn(500);
    });

    //회원가입 닫기 버튼
    $("#signDialogCancel").on("click", (e) => {
        e.preventDefault();
        $("#signDialog").fadeOut(500);
    });
})

