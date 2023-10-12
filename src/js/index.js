import "../sass/index.scss";
import {calSize} from "./utils/calSize.js"
import {tab} from "./utils/tab.js"
import{getLocalStorage,setLocalStorage} from "./utils/localStorage.js"
$(()=> {
    calSize();

    //여기서 토큰을 검사해서 있으면 서버에 보낸 뒤 리턴이 ture로 오면 토큰을 갱신한 뒤 main으로 이동한다.

    if(getLocalStorage("token") != null){
        $.ajax({
            type : "POST",
            url : "../api/validateToken.php",
            data : JSON.stringify({token : getLocalStorage("token")}),
            async : false,
            contentType : "application/json",
            dataType : "json",
            success : res => {
                console.log(res);
                if(res.result){
                    //토큰 검증완료 (바로 메인페이지로 이동)
                    //새로 만든 토큰 등록
                    setLocalStorage("token",res.data);
                    location.href = "main.html";
                }else{
                    //토큰 검증실패 (만료 및 토큰이 이상함)
                    //로그인 다시 해야함
                }
            },
            error : res =>{
                console.log(res);
            }
        });
    }

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

            if($(inputText[i]).val().length > 21){
                alert(`${$(inputText[i]).data("msg")}는 20자 이하입니다.`);
                return false;
            }
        }

        const id = $("#inputId").val();
        const pw = $("#inputPw").val();

        $.ajax({
            type : "POST",
            url : "../api/login.php",
            data : JSON.stringify({id : id, pw : pw}),
            contentType : "application/json",
            dataType : "json",
            success : res => {
                console.log(res);
                if(res.result){
                    //로그인성공, 토큰저장
                    setLocalStorage("token",res.data);
                    location.href = "main.html";
                }else{
                    alert(res.msg);
                }
            },
            error : res =>{
                console.log(res);
                alert("네트워크 에러! 페이지가 새로고침 됩니다");
                location.reload();
            }
        });

        // fetch("../api/login.php",{
        //     method : "POST",
        //     body : JSON.stringify({
        //         id : id,
        //         pw : pw
        //     })
        // })
        // .then((response) => response.json())
        // .then((result) => console.log(result));
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

