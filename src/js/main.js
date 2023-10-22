import "../sass/main.scss";
import {calSize,getLocalStorage,setLocalStorage} from "./utils/util.js"
import {validateToken} from "./cert/cert.js"
import apiConfig from '../json/api-config.json';
$(()=> {
    calSize();

    if(getLocalStorage("token") != null){

        validateToken(apiConfig.validateToken,getLocalStorage("token"),{
                success : res => {
                    setLocalStorage("token",res.data);
                },
                fail : () => {
                    alert("로그인 페이지로 이동합니다.");
                    location.href = "./";
                    return;
                },
                errpr : () => {
                    alert("로그인 페이지로 이동합니다.");
                    location.href = "./";
                    return;
                }
            }
        );
    }else{
        alert("로그인 페이지로 이동합니다.");
        location.href = "./";
        return;
    }

    $("body").fadeIn(1000);

    //pc -> 좌측네비, mobile -> 하단네비 클릭이벤트
    $(".nav-item").on("click",function(e){
        e.preventDefault();
        if(!$(this).hasClass("nav-selected")){
            $(".nav-item").removeClass("nav-selected");
            $(this).addClass("nav-selected");
        }
    });

    //상단 네비 클릭 이벤트
    $(".dialog-main-nav-item").on("click",function(e){
        e.preventDefault();
        if(!$(this).hasClass("dialog-main-nav-item-selected") 
        && !$(this).hasClass("dialog-main-nav-item-input-wrap")){
            $(".dialog-main-nav-item").removeClass("dialog-main-nav-item-selected");
            $(this).addClass("dialog-main-nav-item-selected");
        }

    })
});
