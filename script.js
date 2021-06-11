
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

const mouseCircleFn = (x,y) => {
    mouseCircle.style.cssText=`top: ${y}px; left: ${x}px; opacity: 1`;
    mouseDot.style.cssText=`top: ${y}px; left: ${x}px; opacity: 1`;
};

const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

let mX = 0;
let mY = 0;
let z  = 100;

const animatedCircles = (e,x,y) => {
    if (x < mX) {
        //console.log("moved to left");
        circles.forEach((circle) => {
            circle.style.left=`${z}px`;
        });
        mainImg.style.left=`${z}px`;
    } else if(x>mX) {
        circles.forEach((circle) => {
            circle.style.left=`-${z}px`;
        });
        mainImg.style.left=`-${z}px`;

    }
    if (y < mY) {
        //console.log("moved upwards");
        circles.forEach((circle) => {
            circle.style.top="100px";
        });
        mainImg.style.top=`100px`;
    } else if (y>mY) {
        circles.forEach((circle) => {
            circle.style.top="-100px";
        });
        mainImg.style.top=`-100px`;

    }
    mX = e.clientX;
    mY = e.clientY;
};

document.body.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    let y = e.clientY;
    mouseCircleFn(x,y);
    animatedCircles(e,x,y);
});

document.body.addEventListener('mouseleave', (e) => {
    mouseCircle.style.opacity = '0';
    mouseDot.style.opacity = '0';
});


const mainBtns = document.querySelectorAll(".main-btn");
mainBtns.forEach((btn) => {
    let ripple;
    btn.addEventListener('mouseenter', e => {
        //console.log(e.target.getBoundingClientRect());
        const left = e.clientX - e.target.getBoundingClientRect().left;
        const top  = e.clientY - e.target.getBoundingClientRect().top;
        ripple=document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left= `${left}px`;
        ripple.style.top=`${top}px`;
        btn.prepend(ripple);
    });
    btn.addEventListener('mouseleave', () => {
        btn.removeChild(ripple);
    });
});



const aboutMeText = document.querySelector('.about-me-text');
const aboutMeTextContent = "Hi! Welcome to my professional profile. After getting my college degree in Electrical Engineering in 1984 started working with computer technology in several and different areas. \
As a Jr Engineer started working as an Assembly and C programmer on Unix-like platforms such as SCO Unix and others. After couple of years, moved to \
Systems Integration and Network Engineering having collected a solid foundation on script-based languages and developed a couple of DevOps network-centric based solutions for complex datacenter-based IT applications running under \
Microsoft, FreeBSD, OpenBSD and Linux platforms. Jumped to WEB development using LAMP, Bootstrap, Java and Spring Boot technologies. Currently, developing and mantaining \
a bunch of web-based payment applications using Docker, Kubernetes, PHP, JS, Spring Boot, MySQL, Nginx and others as Senior Software Architect. Want to know more about my challenging career as a \
solutions-oriented Sr Engineer? Just contact me...:)";

//console.log(Array.from(aboutMeTextContent));
Array.from(aboutMeTextContent).forEach(char => {
    const span = document.createElement('span');
    span.textContent= char;
    aboutMeText.appendChild(span);
    span.addEventListener('mouseenter', (e) => {
        //e.target.style.animation="aboutMeTextAnim 10s infinite"
    });
});


