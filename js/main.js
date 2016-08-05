/**
 * Created by shang on 16/5/29.
 */
$(function() {
    //fastclick插件
    FastClick.attach(document.body);
    $(".control-btn").click(function(){
       $(this).closest(".place-describe").toggleClass("open");
    });
});