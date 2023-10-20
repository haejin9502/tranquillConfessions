/**
 * 로그인 함수
 * @author 장해진
 * @param {String} url 주소 
 * @param {String} id 아이디
 * @param {String} pw 비밀번호
 * @param {void} successCallback 성공콜백
 * @param {void} failCallback 실패콜백
 * @param {void} errorCallback 에러콜백
 * @returns
 */
const login = (url,id,pw,successCallback,failCallback,errorCallback) => {
    $.ajax({
        type : "POST",
        url : url,
        data : JSON.stringify({id : id, pw : pw}),
        contentType : "application/json",
        dataType : "json",
        success : res => {
            if(res.result){
                successCallback(res)
            }else{
                failCallback(res);
            }
        },
        error : res =>{
            errorCallback(res);
        }
    });
}

/**
 * 토큰검증함수
 * @author 장해진
 * @param {String} url 주소
 * @param {String} token 토큰
 * @param {void} successCallback 성공콜백
 * @param {void} failCallback 실패콜백
 * @param {void} errorCallback 에러콜백
 * @returns
 */
const validateToken = (url,token,successCallback,failCallback,errorCallback) => {
    $.ajax({
        type : "POST",
        url : url,
        data : JSON.stringify({token : token}),
        async : false, //동기처리
        contentType : "application/json",
        dataType : "json",
        success : res => {
            console.log(res);
            if(res.result){
                successCallback(res);
            }else{
                failCallback(res);
            }
        },
        error : res =>{
            errorCallback(res);
        }
    });
}

/**
 * 회원가입할때 중복검사 함수
 * @author 장해진
 * @param {String} url 주소
 * @param {String} type 아이디/비밀번호/이메일
 * @param {String} contents 타입에 해당하는 값
 * @param {void} successCallback 성공콜백
 * @param {void} failCallback 실패콜백
 * @param {void} errorCallback 에러콜백
 * @returns
 */
const duplicateCheck = (url,type,contents,successCallback,failCallback,errorCallback) => {
    $.ajax({
        type : "POST",
        url : url,
        async : false, //동기처리
        data : JSON.stringify({type : type, contents : contents}),
        contentType : "application/json",
        dataType : "json",
        success : res => {
            if(res.result){
                successCallback(res);
            }else{
                failCallback(res);
            }
        },
        error : res =>{
            errorCallback(res);
        }
    });
}


export {login,validateToken,duplicateCheck}