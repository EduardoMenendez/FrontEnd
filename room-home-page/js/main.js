const buttonRight = document.getElementById("buttonR");
const imgContainer = document.getElementById("img-container");
let actualHero = 0;

const imgs = {
    desktop: [
        "url(../img/desktop-image-hero-1.jpg)",
        "url(../img/desktop-image-hero-2.jpg)",
        "url(../img/desktop-image-hero-3.jpg)",
    ],
    mobile: [
        "url(../img/mobile-image-hero-1.jpg)",
        "url(../img/mobile-image-hero-2.jpg)",
        "url(../img/mobile-image-hero-3.jpg)",
    ]
}

console.log(imgContainer)

function changeImg(forward){
    if(forward){
        actualHero = (actualHero!==2)?actualHero+1:0;
    }else{
        actualHero = (actualHero!==0)?actualHero-1:2;
    }
    imgContainer.style.backgroundImage = imgs.desktop[actualHero];
}