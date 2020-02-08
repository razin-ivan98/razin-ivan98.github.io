var curr = 0;
window.onload = function(){
    showSlide();
}
    

function showSlide(){
    
    var i;
    var slides = document.getElementsByClassName('slide');
    var dots = document.getElementsByClassName('dot');
    if (curr >= slides.length) { curr = 0 }
    if (curr < 0) { curr = slides.length - 1 }
    for (i = 0; i < slides.length; i++){
        slides[i].classList.remove("activeSlide");
        dots[i].classList.remove("activeDot");
    }
    slides[curr].classList.add("activeSlide");
    dots[curr].classList.add("activeDot");
}

function changeSlide(dir){
    curr += dir;
    showSlide();
}

function setSlide(n){
    curr = n;
    showSlide();
}