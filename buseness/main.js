var images = [
    'slide1.jpeg',
    'slide2.jpg',
    'slide3.jpg',
    'slide4.jpg',
    'slide5.jpeg',
    'slide6.png'
];
var curr = 0;
var intervalId = -1;

window.onload = function () {
    let dotsContainer = document.getElementsByClassName('dots-container')[0];
    dotsContainer.innerHTML = "";
    for (let i = 0; i < images.length; i++) {
        dotsContainer.innerHTML += '<span class="dot" id="' + i + '" onclick="setSlide(this.id)"></span>';
    }
    curr = 0;
    showSlide();
    intervalId = setInterval(nextSlide, 4000);
}

function setSlide(id) {
    curr = id;
    clearInterval(intervalId);
    showSlide();
    intervalId = setInterval(nextSlide, 4000);
}

function nextSlide() {
    curr++;
    showSlide();
}

function showSlide() {
    let slider = document.getElementsByClassName('slider')[0];
    let dots = document.getElementsByClassName('dot');

    if (curr < 0)
        curr = images.length - 1;
    if (curr >= images.length)
        curr = 0;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('dot-active');
    }
    dots[curr].classList.add('dot-active');
    slider.style.backgroundImage = "url('assets/" + images[curr] + "')";
}

function change() {
    var slider =
        slider.style.backgroundImage = "url('assets/Logo.svg')";
}