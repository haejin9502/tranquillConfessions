/**
 * 로그인 함수
 * @author 장해진
 * @param {String} url 주소 
 * @param {String} id 아이디
 * @param {String} pw 비밀번호
 * @param {void} callback 콜백메서드
 * @returns
 */
const login = (url,id,pw,callbacks) => {
    $.ajax({
        type : "POST",
        url : url,
        data : JSON.stringify({id : id, pw : pw}),
        contentType : "application/json",
        dataType : "json",
        success : res => {
            if(res.result){
                callbacks.success(res);
            }else{
                callbacks.fail(res);
            }
        },
        error : res =>{
            callbacks.error(res);
        }
    });
}

/**
 * 토큰검증함수
 * @author 장해진
 * @param {String} url 주소
 * @param {String} token 토큰
 * @param {void} callbacks 콜백메서드
 * @returns
 */
const validateToken = (url,token,callbacks) => {
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
                callbacks.success(res);
            }else{
                callbacks.fail(res);
            }
        },
        error : res =>{
            callbacks.error(res);
        }
    });
}

/**
 * 회원가입할때 중복검사 함수
 * @author 장해진
 * @param {String} url 주소
 * @param {String} type 아이디/비밀번호/이메일
 * @param {String} contents 타입에 해당하는 값
 * @param {void} callbacks 콜백메서드
 * @returns
 */
const duplicateCheck = (url,type,contents,callbacks) => {
    $.ajax({
        type : "POST",
        url : url,
        async : false, //동기처리
        data : JSON.stringify({type : type, contents : contents}),
        contentType : "application/json",
        dataType : "json",
        success : res => {
            if(res.result){
                callbacks.success(res);
            }else{
                callbacks.fail(res);
            }
        },
        error : res =>{
            callbacks.error(res);
        }
    });
}

/**
 * 회원가입할때 중복검사 함수
 * @author 장해진
 * @param {String} url 주소
 * @param {String} id 회원가입 아이디
 * @param {String} nick 회원가입 닉네임
 * @param {String} pw 회원가입 비밀번호
 * @param {String} email 회원가입 이메일
 * @param {void} callbacks 콜백메서드
 * @returns
 */
const signIn = (url,id,nick,pw,email,callbacks) =>{
    $.ajax({
        type : "POST",
        url : url,
        async : false, //동기처리
        data : JSON.stringify({id : id, nick : nick, pw : pw, email : email}),
        contentType : "application/json",
        dataType : "json",
        success : res => {
            console.log(res);
            if(res.result){
                callbacks.success(res);
            }else{
                callbacks.fail(res);
            }
        },
        error : res =>{
            console.log(res);
            callbacks.error(res);
        }
    });
}


export {login,validateToken,duplicateCheck,signIn}