$(document).ready(function($) {
    var social=$(".social");
    $(".social__buttons").hide();
    social.on('mouseenter', function () {
        $(".social__buttons").show();
    });
    social.on('mouseleave', function () {
        $(".social__buttons").hide();
    });
    var purl = location.href,
        ptitle = "Сервис для наложения водяного знака",
        text = "С помощью данного бесплатного онлайн сервиса вы может наложить водяной знак на ваши авторские изображения.",
        pimg = "img/wm480.jpg";
    Share = {
        vk: function () {
            url = 'http://vkontakte.ru/share.php?';
            url += 'url=' + encodeURIComponent(purl);
            url += '&title=' + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&image=' + encodeURIComponent(pimg);
            url += '&noparse=true';
            Share.popup(url);
        },
        fb: function () {
            url = 'http://www.facebook.com/sharer/sharer.php?s=100';
            url += '&p[title]=' + encodeURIComponent(ptitle);
            url += '&p[summary]=' + encodeURIComponent(text);
            url += '&p[url]=' + encodeURIComponent(purl);
            url += '&p[images][0]=' + encodeURIComponent(pimg);
            Share.popup(url);
        },
        tw: function () {
            url = 'http://twitter.com/share?';
            url += 'text=' + encodeURIComponent(ptitle);
            url += '&url=' + encodeURIComponent(purl);
            url += '&counturl=' + encodeURIComponent(purl);
            Share.popup(url);
        },
        popup: function (url) {
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        }
    };
});