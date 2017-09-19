$(document).ready(function() {

    $(window).scroll(function() {

        if($(window).scrollTop() < 80 ) {

            $('.navbar').css ({
                'margin-top': '-100px',
                'opacity': '0'
            });

            $('.navbar-default').css ({
                'background-color': 'rgba(59, 59, 59, 0)'
            });
        }
        else {
            $('.navbar').css ({
                'margin-top': '0px',
                'opacity': '1'
            });
            $('.navbar-default').css ({
                'background-color': 'rgba(59, 59, 59, 0.7)',
                'border-color': '#444'
            });

            $('.navbar-brand img').css ({
                'height': '35px',
            });
        }
    });

    $('.navbar-nav li a').click(function() {

        $('.navbar-nav li a').parent().removeClass('active');
        $(this).parent().addClass('active');

    });


    $('a[href^="#"]').on('click', function(event) {

        var target = $( $(this).attr('href') );

        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
            scrollTop: target.offset().top
        }, 800);
        }
    });
});
