$(function(){
    // 1.监听游戏规则的点击
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    });
    // 1.2监听关闭按钮的点击
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });
    // 2.监听游戏开始的点击
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        // 调用进度条方法
        progressHandler();
        // 调用处理灰太狼动画的方法
        startWolfAnimation();
        
    });
    
    // 3.监听重新开始的点击
    $(".restart").click(function () {
        $(".mask").stop().fadeOut(100);
        progressHandler();
        startWolfAnimation();
        //重新开始的时候分数要归零
        $(".score").text(0);
    });


    function progressHandler () {
        $(".progress").css({
            width:180
        });

        var timer = setInterval(function(){
            var progressWidth = $(".progress").width();
            progressWidth -= 1;
            $(".progress").css({
                width:progressWidth
            });

            if (progressWidth <= 0) {
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                stopWolfAnimation();
        };
        },200);
    };

    var worlfTimer;
    function startWolfAnimation () {

        //定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png', './images/h3.png','./images/h4.png',
            './images/h5.png','./images/h5.png','./images/h7.png','./images/h8.png','./images/h9.png',]
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png', './images/x3.png','./images/x4.png',
            './images/x5.png','./images/x5.png','./images/x7.png','./images/x8.png','./images/x9.png',]
        //定义一个数组用来保存图片出现的位置
        var arrPos=[
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];

        var wolfPosIndex=Math.round(Math.random()*8);
        var $wolfImage = $("<img src='' class='wolfImage'>");
        $wolfImage.css({
            position:"absolute",
            top:arrPos[wolfPosIndex].top,
            left:arrPos[wolfPosIndex].left
        });

       // 随机获取狼的类型
        wolfType = Math.round(Math.random())==0?wolf_1:wolf_2;

        window.wolfStartIndex = 0;
        window.wolfEndIndex = 5;

        wolfTimer = setInterval(function() {
            if (wolfStartIndex<=wolfEndIndex) {
                $wolfImage.attr("src",wolfType[wolfStartIndex]);
                wolfStartIndex += 1;
            }else{
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            };
        },300);

        $(".container").append($wolfImage)
        gameRules($wolfImage);
 
    };

    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);

    };

    //定义一个专门处理游戏规则的方法
    function gameRules($wolfImage) {
        $wolfImage.one("click",function () {
            //点击，改变索引，即停止当前动画，改为拍打动画
            window.wolfStartIndex=6;
            window.wolfEndIndex=9;
            //获取图片的地址
            var $src=$(this).attr("src");
            //    根据图片判断是否是灰太狼
            var flag=$src.indexOf("h")>-1;
            if (flag){
                //如果是灰太狼，那么分数+10，并且进度条的长度就+10
                $(".score").text(parseInt( $(".score").text())+10);
                $(".progress").css({
                    width: $(".progress").width()+10
                })
            }
            else {
                //如果是小灰灰，那么分数-10，并且进度条的长度-10
                $(".score").text(parseInt( $(".score").text())-10);
                $(".progress").css({
                    width: $(".progress").width()-10
                })
            }
        })
    }



    function MusicPlayer() {
    //定义变量music为音频播放控件ID
    var music=document.getElementById("music");
    //定义变量music_button为播放图标按钮ID
    var music_button=document.getElementById("switch");
    //定义变量status作为当前播放状态并赋值
    var status=1;
    //使音频默认自动播放
    music.play();
    music_button.className="music-on";
    //设置按钮点击事件
    music_button.οnclick=function(){
        if (status > 0) {
            music.pause();
            this.className="music-off"; 
            status = 0;
        }else {
            music.play();
            this.className="music-on"; 
            status = 1;}
        };
    }
});