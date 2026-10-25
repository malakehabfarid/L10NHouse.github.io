function prepareDesc(desc) {
    let regex = /L10N House/gmi;
    return desc.replaceAll(regex, `<span class="fw-medium"><span class="firstColor">L10N</span> <span class="secondColor">House</span></span>`);
}

function openPopup(popupName) {
    $('body').css('overflow-y', 'hidden');
    $(`.popup[data-popup-name="${popupName}"]`).fadeIn(1000, function () {
        if (popupName == 'languages') {
            $(this).find('.box').addClass('show');
        }
    });
    if (popupName == 'video') {
        $(`.popup[data-popup-name="video"]`).css("display", "flex");
    }
}

function closePopup(popupName) {
    $('body').css('overflow-y', 'auto');
    if (popupName == 'languages') {
        $(`.popup[data-popup-name="${popupName}"]`).find('.box').removeClass('show');
        $(`.popup[data-popup-name="${popupName}"]`).delay(800).fadeOut(1000);
    }else{
        $(`.popup[data-popup-name="${popupName}"]`).fadeOut(1000);
    }
}

function preparePoints(points) {
    let lis = ``;
    for (let point of points) {
        lis += `<li>${point}</li>`;
    }
    return lis;
}

function prepareSectionsOfServices(sections) {
    let sectionsEle = ``;
    let i = 0;
    for (let section of sections) {
        sectionsEle += `
            <section class="$(i != 0)? 'mt-4': ''">
                <h5>${section.title}</h5>
                <ol>
                    ${preparePoints(section.points)}
                </ol>
            </section>
        `;
        i++;
    }
    return sectionsEle;
}

function showService(serviceIndex) {
    let service = services[serviceIndex];
    $(`.popup[data-popup-name="services"] .box .body`).html(`
        <h4 class="text-center secondColor fw-bolder mb-5">${service.title}</h4>
        <div class="row row-gap-3 mb-4">
            <div class="col-lg-6">
                <div class="item">
                    <p>
                        ${prepareDesc(service.description)}
                    </p>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="item">
                    <img src="./images/${service.img}" alt="services" class="img-fluid rounded-3">
                </div>
            </div>
        </div>
        ${prepareSectionsOfServices(service.sections)}
    `);
    openPopup('services');
}

function prepareLanguages(languages) {
    let lis = ``;
    for (let language of languages) {
        lis += `<li><i class="fa-regular fa-circle-dot me-2"></i>${language}</li>`;
    }
    return lis;
}
