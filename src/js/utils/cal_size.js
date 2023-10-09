/**
 * 화면 사이즈 설정 및 출력함수
 * @author 장해진
 * @return 
 */
export function calSize() {
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