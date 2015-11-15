$(function () {

    $('.icons__language-link').on('click', function (e) {
        e.preventDefault();
    });

    $('.icons__language-link_rus').on('click', function () {
        $('#eng').removeClass('active');
        $('#rus').addClass('active');
        $('.rus').removeClass('hide-lng');
        $('.eng').addClass('hide-lng');
    });

    $('.icons__language-link_eng').on('click', function () {
        $('#rus').removeClass('active');
        $('#eng').addClass('active');
        $('.eng').removeClass('hide-lng');
        $('.rus').addClass('hide-lng');
    })
})
