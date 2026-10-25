let services = null;
// Get services data 
(async function () {
    let res = await fetch("https://semicode.tech/api/v1/l10nhouse/services");
    services = await res.json();
    let i = 0;
    services.forEach(function (service) {
        $("#Services .row").append(`
            <div class="col-lg-6 wow ${((i + 1) % 2 == 0) ? 'animate__fadeInRight' : 'animate__fadeInLeft'}" data-wow-duration="1.5s" data-wow-delay="${i * 0.2}s">
                <div class="item box text-center mt-4">
                    <img src="./images/${service.icon}" alt="services">
                    <h5 class="py-3 mb-0">${service.title}</h5>
                    <p>${prepareDesc(service.description.slice(0, 150))}<a class="firstColor" onclick="showService(${i})">... Read More</a></p>
                </div>
            </div>
        `);
        i++;
    });
})();

(async function () {
    let res = await fetch("https://semicode.tech/api/v1/l10nhouse/sectors");
    sectors = await res.json();
    let i = 0;
    sectors.forEach(function (sector) {
        $(".popup[data-popup-name='sectors'] .body .row ").append(`
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="item text-center p-2 rounded-3">
                    <img src="./images/sec/${sector.icon}" alt="sector" class="img-fluid mb-3">
                    <p class="mb-0">${sector.name}</p>
                </div>
            </div>
        `);
        i++;
    });
})();

(async function () {
    let res = await fetch("https://semicode.tech/api/v1/l10nhouse/languages");
    languages = await res.json();
    let i = 0;
    languages.forEach(function (language) {
        $(".popup[data-popup-name='languages'] .body").append(`
            <div class="section">
                <h4>${language.continent}</h4>
                <ul class="list-unstyled">
                    ${prepareLanguages(language.languages)}
                </ul>
            </div>
        `);
        i++;
    });
})();

$(".popup .box").click(function (e) {
    e.stopPropagation();
});

$(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop(),
        scrollHeight = $(document).height() - $(window).height(),
        scrollPercentage = (scrollTop / scrollHeight) * 100;
    $(".scroll-progress").css("width", scrollPercentage + "%");
});

$(window).scroll(function (e) {
    $("nav").toggleClass("scrolled", window.scrollY >= 10);
    let $sections = $('header, section[id]');
    $sections.each(function (index, section) {
        let $section = $(section),
            sectionId = $section.attr('id'),
            sectionTop = $section.offset().top,
            sectionBottom = sectionTop + $section.outerHeight(true),
            navHeight = $('nav').outerHeight(true),
            scrollY = window.scrollY + navHeight;

        if (scrollY > sectionTop && scrollY < sectionBottom) {
            $(`.nav-link.active`).removeClass('active');
            $(`.nav-link[href='#${sectionId}']`).addClass('active');
        }
    });
});

new WOW({
    animateClass: 'animate__animated',
}).init();

$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 5,
        margin: 20,
        loop: true,
        autoPlay: true,
        autoPlayTimeout: 1000,
        autoPlayHoverPause: true,
        slideBy: 5,
        responsive: {
            0: {
                items: 1,
                slideBy: 1,
            },
            350: {
                items: 1,
                slideBy: 1
            },
            450: {
                items: 3,
                slideBy: 3
            },
            650: {
                items: 3,
                slideBy: 3
            },
            850: {
                items: 4,
                slideBy: 4
            },
            1050: {
                items: 5,
                slideBy: 5
            }
        }
    });
});

$(document).ready(function () {
    setTimeout(function () {
        $(".loadingPage").addClass('hide');
        setTimeout(function () {
            $(".loadingPage").addClass('d-none');
        }, 10);
    }, 1500);
});