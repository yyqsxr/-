function reSize(){
    var deviceWidth = screen.width;
    if(deviceWidth>750) deviceWidth = 750;
    // document.documentElement.style.fontSize =  +'px';
    $("html").css("cssText","font-size:"+deviceWidth/7.5+"px !important");
}

window.addEventListener('resize',function(){
    reSize();
});
//加载完毕时动态改变rem
reSize();
