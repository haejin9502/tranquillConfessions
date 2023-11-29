import "../sass/main.scss";
import {calSize,getLocalStorage,setLocalStorage
        ,setTextAreaLimit,changeSelectColor
        ,replaceSizeInUrl,setImageColor} from "./utils/util.js"
import {validateToken} from "./api/cert.js"
import {getPhoto,writeDiary,getDialog,getDialogSingle,deleteDialog} from "./api/info";
import apiConfig from '../json/api-config.json';
import weatherConfig from '../json/weather.json';
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

    getDialog(apiConfig.get_dialog,getLocalStorage("token"),{
        success : res => {

            const parent = $(".dialog-main-item-wrap");
            parent.empty();

            for(let item of res.data){
                parent.append(`
                <div class="dialog-main-item" data-id="${item.idx}">
                    <img class="dialog-main-item-img" src="${setImageColor(item.photo)}" alt="dialog-main-item-img">
                    <div class="dialog-main-item-title-wrap">
                        <p>${item.title}</p>
                        <p>${item.date}</p>
                    </div>
                </div>
                `);

            }

            $("body").fadeIn(1000);

            setTextAreaLimit("#dialoigWriteBody",".dialog-write-textarea-limit-text")
            changeSelectColor("#dialogWriteWeatherSelect");

        },
        fail : res => {
            console.log(res);
        },
        error : res => {
            console.log(res);
        }
    });



    //pc -> 좌측네비, mobile -> 하단네비 클릭이벤트
    $(".nav-item").on("click",function(e){
        e.preventDefault();

        const type = $(this).data("type");

        if(!$(this).hasClass("nav-selected")){
            $(".nav-item").removeClass("nav-selected");
            $(this).addClass("nav-selected");
            
            $("#dialog main").css({display : "none"});

            if(type == "r"){
                $(".dialog-main").css({display : "flex"});
            }else if(type == "w"){
                $(".dialog-wirte").css({display : "flex"});
            }
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
    });

    //사진찾기 클릭 이벤트
    $(".dialog-wirte-search-photo").on("click",e =>{
        e.preventDefault();
        $("#photoSelectDialog").css("display","flex");
    });

    //사진 다이얼로그 취소 버튼
    $("#photoSelectDialogCancel").on("click",e =>{
        e.preventDefault();
        $("#photoSelectDialog").hide(()=>{
            $("#photoSelectDialog section").empty();
            $("#photoSelectSearchText").val("");
        });
    });

    //사진다이얼로그 찾기 클릭 이벤트
    $("#photoSelectSearchButton").on("click",e =>{
        e.preventDefault();
        const inputText = $("#photoSelectSearchText");
        const imageWrap = $("#photoSelectDialog section");

        if(inputText.val() == null){
            alert("검색어를 입력해주세요.");
            return;
        }

        if(inputText.val() < 2){
            alert("검색어는 2자 이상 입력해주세요.");
            return;
        }

        getPhoto(apiConfig.photo,inputText.val(),{
            success : res =>{
                imageWrap.empty();
                console.log(res);

                if(res.length == 0){
                    imageWrap.append(`
                        <div class="photo-empty">다른 검색어를 입력해주세요.</div>
                    `);
                    return;
                }

                for(let i = 0; i < res.length; i++){
                    imageWrap.append(`
                    <div class="photo-item">
                        <img src="${res[i].webformatURL}" alt="phpto-img" 
                        data-src="${replaceSizeInUrl(res[i].previewURL,640)}">
                    </div>
                    `);
                }
            },
            error : res => {
                console.log(res);
                alert(res);
                imageWrap.append(`
                    <div class="photo-empty">다른 검색어를 입력해주세요.</div>
                `);
            }
        })
    });

    //사진클릭이벤트
    $(document).on("click",".photo-item",function(e){
        e.preventDefault();
        if(!$(this).hasClass("selected")){
            $(".selected").removeClass("selected");
            $(".photo-selected").remove();
            $(this).addClass("selected");
            $(this).append(`<div class="photo-selected">선택됨</div>`);
        }
    });

    //사진 다이얼로그 등록버튼
    $("#photoSelectDialog footer").on("click", e =>{
        e.preventDefault();
        const item = $(".photo-item");
        const selectedItem = $(".photo-selected");
        if(item.length > 0){
            console.log(selectedItem);
            if(selectedItem.length > 0){
                const src = selectedItem.closest(".photo-item").children("img").data("src");
                $(".dialog-wirte-search-photo img").css("display","block");
                $(".dialog-wirte-search-photo p").css("display","none");
                $(".dialog-wirte-search-photo img").attr("src",src);
                $("#photoSelectDialog").hide(()=>{
                    $("#photoSelectDialog section").empty();
                    $("#photoSelectSearchText").val("");
                });
            }else{
                alert("선택된 사진이 없습니다.");
            }
        }else{
            alert("선택된 사진이 없습니다.");
        }
    });

    //등록버튼 클릭 이벤트 
    $("#dialogWriteCommit").on("click", e =>{
        e.preventDefault();
        const title = $("#dialogWriteTitle").val();
        const date = $("#dialogWriteDate").val();
        const place = $("#dialogWritePlace").val();
        const weather = $("#dialogWriteWeatherSelect").val();
        const photo = $(".dialog-wirte-search-photo img").attr("src");
        const body = $("#dialoigWriteBody").val();

        console.log("내용들",new Array(
            title,date,place,weather,photo,body
        ));

        if(title.length <= 0){
            alert("제목을 입력해주세요");
            return;
        }

        if(place.length <= 0){
            alert("장소를 입력해주세요.");
            return;
        }

        if(date.length <= 0){
            alert("날짜를 입력해주세요.");
            return;
        }

        if(weather.length <= 0){
            alert("날씨를 선택해주세요.");
            return;
        }

        if(body.length <= 0){
            alert("내용을 입력해주세요.");
            return;
        }

        if(photo.length <= 0){
            if(!confirm("사진을 등록하지 않고 작성을 완료하시겠습니까?")){
                return;
            }
        }

        writeDiary(apiConfig.write,getLocalStorage("token"),title,date,place,weather,photo,body,{
                success : res => {
                    console.log(res);
                    setLocalStorage("token",res.data); //토큰 갱신
                    alert(res.msg);
                    location.reload();
                },
                fail : res => {
                    console.log(res);
                    alert(res.msg);
                    return;
                },
                error : res => {
                    alert(res.msg);
                    location.reload();
                    return;
                }
            }
        );
    });

    //다이얼로그 아이템 클릭 이벤트
    $(document).on("click",".dialog-main-item",function(e){
        e.preventDefault();
        const item_id = $(this).data("id");
        const imgSrc = $(this).children("img").attr("src");
        const popup = $("#dialogPopup");
        const title = $(".dialog-popup-title");
        const date = $(".dialog-popup-main-left-date");
        const place = $(".dialog-popup-main-left-place");
        const weather = $(".dialog-popup-main-left-weather");
        const body = $(".dialog-popup-body");
        const photo = $(".dialog-popup-main-right img");
        const deleteBtn = $(".dialog-popup-delete");
        
        getDialogSingle(apiConfig.get_dialog_single,item_id,getLocalStorage("token"),{
            success : res => {
                title.text(res.data[0].title);
                date.text(res.data[0].date);
                place.text(res.data[0].place);
                weather.text(weatherConfig[parseInt(res.data[0].weather)-1].weather);
                
                body.text(res.data[0].body);
                photo.attr("src",imgSrc);
                popup.css("display","flex");
                deleteBtn.attr("data-id",item_id);
            },
            fail : res => {
                console.log(res);
            },
            error : res => {
                console.log(res);
            }
        });
    });

    //다이얼로그 팝업 닫기 버튼
    $("#dialogPopup footer").on("click",e =>{
        e.preventDefault();
        const popup = $("#dialogPopup");
        const title = $(".dialog-popup-title");
        const date = $(".dialog-popup-main-left-date");
        const place = $(".dialog-popup-main-left-place");
        const weather = $(".dialog-popup-main-left-weather");
        const body = $(".dialog-popup-body");
        const photo = $(".dialog-popup-main-right img");

        popup.css("display","none");
        
        title.empty();
        date.empty();
        place.empty();
        weather.empty();
        body.empty();
        photo.attr("src","");
    });

    //다이얼로그 팝업 삭제버튼
    $(".dialog-popup-delete").on("click",e =>{
        e.preventDefault();
        const item_id = $(".dialog-popup-delete").attr("data-id");
        console.log(item_id);
        if(confirm("삭제하시겠습니까?")){
            getDialogSingle(apiConfig.delete,item_id,getLocalStorage("token"),{
                success : res => {
                    alert(res.msg);
                    location.reload();
                },
                fail : res => {
                    console.log(res);
                },
                error : res => {
                    console.log(res);
                }
            });
        }
    });
});
