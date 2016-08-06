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
        var eleAudio = el.children("audio").get(0);
        var audioDuration = eleAudio.duration;
        var transString = "transition-duration:" + audioDuration + "s;-webkit-transition-duration:" + audioDuration + "s"
        console.log(eleAudio.duration);
        if (nowPlayingEleAudio && nowPlayingEleAudio != eleAudio) {
            nowPlayingEleAudio.pause();
            nowPlayingEleAudio.currentTime = 0;
            $(nowPlayingEleAudio).siblings("i").attr("class", "iconfont icon-iconstart")
                .closest(".ui-audio-bar").removeClass("playing")
                .find(".audio-progress-inner").removeAttr("style");
        }
        if (eleAudio.paused) {
            eleAudio.play();
            $(eleAudio).siblings("i").attr("class", "iconfont icon-iconstop")
                .closest(".ui-audio-bar").addClass("playing")
                .find(".audio-progress-inner").attr("style", transString);
            nowPlayingEleAudio = eleAudio;
        } else {
            eleAudio.pause();
            eleAudio.currentTime = 0;
            $(eleAudio).siblings("i").attr("class", "iconfont icon-iconstart")
                .closest(".ui-audio-bar").removeClass("playing")
                .find(".audio-progress-inner").removeAttr("style");;
        }
        eleAudio.onended = function () { //播放完毕回调
            $(eleAudio).siblings("i").attr("class", "iconfont icon-iconstart")
                .closest(".ui-audio-bar").removeClass("playing")
                .find(".audio-progress-inner").removeAttr("style");;//移除播放效果
        }
    };

    $("body").on("click", "[data-toggle='audio-btn']", function () {
        audioPlay($(this));//播放音频
    });
});