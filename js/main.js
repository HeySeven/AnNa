/**
 * Created by shang on 16/5/29.
 */
$(function () {
    //fastclick插件
    FastClick.attach(document.body);
    $(".control-btn").click(function () {
        $(this).closest(".place-describe").toggleClass("open");
    });

    //音频播放方法定义
    var nowPlayingEleAudio = false;//页面中是否存在正在播放的音频
    function audioPlay(el) {
        var eleAudio = el.children("audio").get(0);//音频js对象
        var audioDuration = eleAudio.duration;//音频时长

        //动画字符串
        var transString = "transition-duration:" +
            audioDuration +
            "s;-webkit-transition-duration:" + audioDuration + "s";
        //播放时关闭其他音频
        if (nowPlayingEleAudio && nowPlayingEleAudio != eleAudio) {
            nowPlayingEleAudio.pause();
            nowPlayingEleAudio.currentTime = 0;
            $(nowPlayingEleAudio).siblings("i").attr("class", "iconfont icon-iconstart")
                .closest(".ui-audio-bar").removeClass("playing")
                .find(".audio-progress-inner").removeAttr("style");
        }


        if (eleAudio.paused) {  //如果暂停,则播放
            eleAudio.play();
            $(eleAudio).siblings("i").attr("class", "iconfont icon-iconstop")
                .closest(".ui-audio-bar").addClass("playing")
                .find(".audio-progress-inner").attr("style", transString);
            nowPlayingEleAudio = eleAudio;
        } else {  //如果播放,则暂停
            eleAudio.pause();
            eleAudio.currentTime = 0;
            $(eleAudio).siblings("i").attr("class", "iconfont icon-iconstart")
                .closest(".ui-audio-bar").removeClass("playing")
                .find(".audio-progress-inner").removeAttr("style");
            ;
        }

        //播放完毕时
        eleAudio.onended = function () {
            $(eleAudio).siblings("i").attr("class", "iconfont icon-iconstart")
                .closest(".ui-audio-bar").removeClass("playing")
                .find(".audio-progress-inner").removeAttr("style");
            ;//移除播放效果
        }
    };

    $("body").on("click", "[data-toggle='audio-btn']", function () {
        audioPlay($(this));//播放音频
    });


    function playPause(el) {
        var eleVideo = el.siblings("video").get(0);//视频js对象
        var $eleVideoWrap = el.closest(".media-video-link");
        if (eleVideo.paused) {
            eleVideo.play();
            $eleVideoWrap.addClass("playing");
        } else {
            eleVideo.pause();
            $eleVideoWrap.removeClass("playing");
        }
    }

    $("body").on("click", "[data-toggle='media-video-btn']", function () {
        playPause($(this));
    });

    //出现?消失评论框
    function openReply() {
        $(".reply-fixed-wrap").addClass("focus").find(".reply-control").focus();
        $("html").addClass("overflow-hidden");
    };
    function closeReply() {
        $(".reply-fixed-wrap").removeClass("focus");
        $("html").removeClass("overflow-hidden");
    };
    $("body").on("click", "[data-toggle='reply-btn']", function () {
        openReply();
    });
    $(".reply-control").blur(function () {
        closeReply();
    });
});