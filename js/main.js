let slideIndex = 1;

document.addEventListener("DOMContentLoaded",()=>{
  showSlides(slideIndex);
})

const plusSlides = (n) => {
  console.log(n);
  showSlides(slideIndex += n);
}

const showSlides = (n) => {
  let i;
  let slides = document.getElementsByClassName("imagenCarrusel");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}