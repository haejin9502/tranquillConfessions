/**
 * 엔터입력 함수
 * @author 장해진
 * @param field 입련된 필드
 * @param event 입력된 이벤트
 */
export function tab(c,field, event) {

    let element = $(field);

    if(event.which == 13 || event.keyCode == 13){
        if(c == ".input-sign-text"){
            if(parseInt(element.data("tab")) == 4) {
                $("#inputtTerms").focus();
            }else{
                $(".input-sign-text").eq(parseInt(element.data("tab"))).focus();
            }
        }else{
            switch (element.data("tab")) {
                case 1:
                    $(".input-text").eq(1).focus();
                    break;
                case 2:
                    //$("#inputAutoLogin").focus();
                    break;
                default:
                    break;
            }
        }
    }

}

