/**
 * 화면 사이즈 설정 및 출력함수
 * @author 장해진
 * @return 
 */
const calSize = () => {
    const setCssProperties = () => {
        const vw = window.innerWidth * 0.01;
        const vh = window.innerHeight * 0.01;
        $("html").css("--vh", `${vh}px`);
        $("html").css("--vw", `${vw}px`);
        $("html").css("font-size", (10 / window.innerWidth) * 100 + "vw");
    };

    // 초기 호출
    setCssProperties();
    $(window).on("resize",()=>{setCssProperties()})
}

/**
 * 엔터입력 함수
 * @author 장해진
 * @param {String} class_ 
 * @param {String} field 입련된 필드
 * @param {Event} event 입력된 이벤트
 */
const tab = (class_,field, event) => {

    let element = $(field);

    if(event.which == 13 || event.keyCode == 13){
        if(class_ == ".input-sign-text"){
            if(parseInt(element.data("tab")) == 4) {
                $("#inputtTerms").trigger("focus");
            }else{
                $(".input-sign-text").eq(parseInt(element.data("tab"))).trigger("focus");
            }
        }else{
            switch (element.data("tab")) {
                case 1:
                    $(".input-text").eq(1).trigger("focus");
                    break;
                case 2:
                    $("#loginBtn").trigger("click");
                    break;
                default:
                    break;
            }
        }
    }
}

/**
 * 프로그레스 오버레이 출력
 * @author 장해진
 * @return 
 */
const showProgressOverlay = () => {
    $("#progressOverlay").css({display : "flex"});
}

/**
 * 프로그레스 오버레이 숨기기
 * @author 장해진
 * @return 
 */
const hideProgressOverlay = () => {
    $("#progressOverlay").hide();
}

/**
 * 로컬 스토리지 데이터 받아오기
 * @author 장해진
 * @param {String}name 불러올 로컬스토리지 아이템 이름
 * @return window.localStorage.getItem(name)
 */
function getLocalStorage(name){
    return window.localStorage.getItem(name);
}

/**
 * 로컬 스토리지 데이터 생성
 * @author 장해진
 * @param {String} name 생성할 로컬스토리지 아이템 이름
 * @param {*} contents 생성된 로컬스토리지에 저장할 데이터 
 * @return 
 */
const setLocalStorage = (name,contents) => {
    window.localStorage.setItem(name,contents);
}

/**
 * 영문과 숫자만 입력받을 수 있게 제한
 * @author 장해진
 * @param {String} id 영문 숫자 제한할 ID
 * @return 
 */
function inputLimit(id){
    $(id).on("propertychange change keyup paste input",function(){
        let inputValue = $(this).val()
        let regex = /[^a-zA-Z0-9]/g;
        // 정규식을 사용하여 영어와 숫자만을 허용
        //const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        // 입력값에서 영어와 숫자 이외의 문자를 제거

        if(inputValue.match(regex)){
            alert("영문과 숫자만 입력이 가능합니다.");
        }
        
        inputValue = inputValue.replace(regex, '');
        $(this).val(inputValue);
    });
}

/**
 * 이메일 정규식 체크 
 * @author 장해진
 * @param {String} email 검사할 이메일
 * @return (bollean) true/false
 */
const emailCheck = email => {    
    var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email)); 
}

/**
 * 비밀번호 정규식 체크 
 * @author 장해진
 * @param {String} id 정규식 체크할 비밀번호 입력폼 아이디
 * @return (bollean) true/false
 */
const chkPW = id => {
    const pw = $(id).val();
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/gi);
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if(pw.length < 10 || pw.length > 20){
        alert("비밀번호는 10자리 ~ 20자리 이내로 입력해주세요.");
        $(id).trigger("focus");
        return false;
    }else if(pw.search(/\s/) != -1){
        alert("비밀번호는 공백 없이 입력해주세요.");
        $(id).trigger("focus")
        return false;
    }
    else if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
        alert("영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
        $(id).trigger("focus")
        return false;
    }else {
        console.log("통과");
        return true;	 
    }
}

/**
 * textarea 글자 수 제한 및 출력
 * @author 장해진
 * @param {String} textarea 글자수를 제한할 textarea id 
 * @param {String} text 현재 글자수를 출력할 id 
 * @return
 */
const setTextAreaLimit = (textarea,text) =>{
    $(textarea).on("keyup",function(e){
        let content = $(this).val();

        // 글자수 제한
        if (content.length > 500) {
            // 200자 부터는 타이핑 되지 않도록
            $(this).val($(this).val().substring(0, 500));
            $(text).text(`${content.length}/500`);
            return;
        };

        $(text).text(`${content.length}/500`);
    });
}

/**
 * select/option 색상 변경
 * @author 장해진
 * @param {String} id 색상을 변경할 select
 * @return
 */
const changeSelectColor = id => {
    $(id).on("change",function(){
        const value  = $(this).val();
        if(parseInt(value) == 0){
            $(this).css("color","#8e8e8e");
        }else{
            $(this).css("color","black");
        }
    }).trigger('change');
}

export {
    calSize,
    tab,
    showProgressOverlay,
    hideProgressOverlay,
    getLocalStorage,
    setLocalStorage,
    inputLimit,
    emailCheck,
    chkPW,
    setTextAreaLimit,
    changeSelectColor
};