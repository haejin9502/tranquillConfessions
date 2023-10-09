import "../sass/main.scss";
import {calSize} from "./utils/cal_size.js"

$(()=> {
    calSize();
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
