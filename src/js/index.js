import apiConfig from '../json/api-config.json';
import "../sass/index.scss";
import {calSize,tab,getLocalStorage,setLocalStorage,inputLimit,emailCheck} from "./utils/util.js"
import {login,validateToken,duplicateCheck} from "./cert/cert.js"

let idDuplicateCheck = false;
let nickDuplicateCheck = false;
let emailDuplicateCheck = false;

$(()=> {
    calSize();

    //여기서 토큰을 검사해서 있으면 서버에 보낸 뒤 리턴이 ture로 오면 토큰을 갱신한 뒤 main으로 이동한다.

    if(getLocalStorage("token") != null){

        validateToken(apiConfig.validateToken,getLocalStorage("token"),
            success => {
                setLocalStorage("token",success.data);
                location.href = "main.html";
            },
            fail => {
                console.log(fail);
            },
            error => {
                console.log(error);
            }
        );
    }

    $("body").fadeIn(1000);

    inputLimit("#inputSignId,#inputId"); //아이디입력 (영문숫자만)

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

            if($(inputText[i]).val().length > 21){
                alert(`${$(inputText[i]).data("msg")}는 20자 이하입니다.`);
                return false;
            }
        }

        const id = $("#inputId").val();
        const pw = $("#inputPw").val();

        login(apiConfig.login,id,pw,
            success => {
                setLocalStorage("token",success.data);
                location.href = "main.html";
            },
            fail => {
                alert(fail.msg);
            },
            error => {
                console.log(error);
                alert("네트워크 에러! 페이지가 새로고침 됩니다");
                location.reload();
            }
        );
    });
    
    //아이디,비밀번호 키 변화 이벤트
    $(".input-text").on("keydown", function (e) {
        tab(".input-text", this, e);
    });

    //회원가입 키 변화 이벤트
    $(".input-sign-text").on("keydown", function (e) {
        tab(".input-sign-text", this, e);
    });

    //회원가입 버튼(로그인창)
    $("#signDialogOpen").on("click", (e) => {
        e.preventDefault();
        $("#signDialog").fadeIn(500);
    });

    //중복체크
    $(".duplicate-chk-btn").on("click",function(e){
        e.preventDefault();
        const type = $(this).data("type");
        const msg = $(this).data("msg");
        if($(`#inputSign${type}`).val()==""){
            alert(`${msg}(을)를 입력해주세요`);
            return;
        }

        if(type == "Id"){
            if($(`#inputSignId`).val().length < 6){
                alert("아이디는 6글자 이상 입력해주세요.");
                return;
            }

            if(idDuplicateCheck){
                $(this).text("중복확인");
                $(`#inputSign${type}`).prop("disabled", false);
                idDuplicateCheck = false;
                $("#signIdOkMsg").hide();
                return;
            }
        }

        if(type == "Nick"){
            if($(`#inputSignNick`).val().length < 2){
                alert("닉네임은 2글자 이상 입력해주세요.");
                return;
            }
            if(nickDuplicateCheck){
                $(this).text("중복확인");
                $(`#inputSign${type}`).prop("disabled", false);
                nickDuplicateCheck = false;
                $("#signNickOkMsg").hide();
                return;
            }
        }

        if(type == "Email"){
            if(!emailCheck($("#inputSignEmail").val())){
                alert("이메일 형식을 맞춰주세요.");
                return;
            }
            if(emailDuplicateCheck){
                $(this).text("중복확인");
                $(`#inputSign${type}`).prop("disabled", false);
                emailDuplicateCheck = false;
                $("#signEmailOkMsg").hide();
                return;
            }
        }

        duplicateCheck(apiConfig.duplicate_check,type,$(`#inputSign${type}`).val(),
            success => {
                $(`#inputSign${type}`).prop("disabled", true);
                $(this).text("변경");

                if(type == "Id"){
                    idDuplicateCheck = true;
                    $("#signIdOkMsg").fadeIn(300,function(){$(this).text("(사용가능한 아이디 입니다.)")});
                }else if(type == "Nick"){
                    nickDuplicateCheck = true;
                    $("#signNickOkMsg").fadeIn(300,function(){$(this).text("(사용가능한 닉네임 입니다.)")});
                }else if(type == "Email"){
                    emailDuplicateCheck = true;
                    $("#signEmailOkMsg").fadeIn(300,function(){$(this).text("(사용가능한 이메일 입니다.)")});
                }
            },
            fail => {
                alert(fail.msg);
            },
            error => {
                console.log(error);
            }
        );
    });

    //회원가입 닫기 버튼
    $("#signDialogCancel").on("click", e => {
        e.preventDefault();
        $("#signDialog").fadeOut(500,()=>{
            $(".input-sign-text").val("");
            $(".input-sign-chk-box").prop("checked", false)
        });
    });

    $("#signBtn").on("click", e => {
        e.preventDefault();
    });
});



//fetch 예제
// fetch("../api/login.php",{
//     method : "POST",
//     body : JSON.stringify({
//         id : id,
//         pw : pw
//     })
// })
// .then((response) => response.json())
// .then((result) => console.log(result));

