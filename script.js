
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

const mouseCircleFn = (x,y) => {
    mouseCircle.style.cssText=`top: ${y}px; left: ${x}px; opacity: 1`;
    mouseDot.style.cssText=`top: ${y}px; left: ${x}px; opacity: 1`;
};

/*const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");*/

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
            circle.style.top="50px";
        });
        mainImg.style.top=`50px`;
    } else if (y>mY) {
        circles.forEach((circle) => {
            circle.style.top="-50px";
        });
        mainImg.style.top=`-50px`;

    }
    mX = e.clientX;
    mY = e.clientY;
};

let hoveredElPosition = [];
document.body.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    let y = e.clientY;
    mouseCircleFn(x,y);
    animatedCircles(e,x,y);

    //Sticky Element
    const hoveredEl = document.elementFromPoint(x,y);
    console.log(hoveredEl);
    if(hoveredEl.classList.contains("sticky")) {
        /*console.log("Sticky");*/
        if(hoveredElPosition.length < 1) {
            hoveredElPosition=[hoveredEl.offsetTop, hoveredEl.offsetLeft];
                console.log(hoveredElPosition);
        }
        hoveredEl.style.cssText = `top:${y}px;left:${x}px`;
        if(hoveredEl.offsetTop <= hoveredElPosition[0]-100 || hoveredEl.offsetTop >= hoveredElPosition[0] + 100 || hoveredEl.offsetLeft <= hoveredElPosition[1]-100 || hoveredElPosition.offsetLeft >= hoveredElPosition[1] + 100) {
            hoveredEl.style.cssText="";
            hoveredElPosition = [];
        }
        hoveredEl.onmouseleave = () => {
            hoveredEl.style.cssText="";
            hoveredElPosition = [];
        }
    }
    //End of Sticky Element
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
// Progress Bar
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector('.progress-bar');
const halfCircles = document.querySelectorAll('.half-circle');
const halfCircleTop = document.querySelector('.half-circle-top');
const progressBarCircle = document.querySelector('.progress-bar-circle');

const progressBarFn = () => {
    const pageViewportHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const scrolledPortion = window.pageYOffset;
    const scrolledPortionDegree = (scrolledPortion /(pageHeight - pageViewportHeight)) * 360;
    //console.log(scrolledPortionDegree);
    halfCircles.forEach(el => {
        el.style.transform = `rotate(${scrolledPortionDegree}deg)`;
        if(scrolledPortionDegree >= 180) {
            halfCircles[0].style.transform = "rotate(180deg)";
            halfCircleTop.style.opacity = '0';
        } else {
            halfCircleTop.style.opacity = '1';
        }
    });

    const scrollBool = scrolledPortion + pageViewportHeight === pageHeight;

    progressBar.onclick = (e) => {
        e.preventDefault();
        const sectionPositions = Array.from(sections).map((section) => scrolledPortion + section.getBoundingClientRect().top);
        /*console.log(sectionPositions);*/
        const position = sectionPositions.find (sectionPosition => {
            return sectionPosition > scrolledPortion;
        })
        scrollBool ? window.scrollTo(0,0) : window.scrollTo(0, position);
    };
    // Arrow Rotation
    if (scrollBool) {
        progressBarCircle.style.transform = "rotate(180deg)";
    } else {
        progressBarCircle.style.transform = "rotate(0deg)";
    }
};
progressBarFn();
// End of Progress Bar

// Navigation
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

document.addEventListener('scroll',() => {
    menuIcon.classList.add('show-menu-icon');
    navbar.classList.add('hide-navbar');
    if(window.scrollY=== 0) {
        menuIcon.classList.remove('show-menu-icon');
        navbar.classList.remove('hide-navbar');
    }
    progressBarFn();
})

menuIcon.addEventListener('click', () => {
    menuIcon.classList.remove('show-menu-icon');
    navbar.classList.remove('hide-navbar');
})
//End of Progress Bar Click


//End navigation


const aboutMeText = document.querySelector('.about-me-text');
const aboutMeTextContent = "Hi! Welcome! Thanks for touching down at my personal page to learn about my professional skills. Let's get started! After getting my college degree in EE* in 1984, I started working with computer technology in several and different areas over time. \
As Jr started working with Assembly and C programming on Unix-like platforms such as SCO Unix and others. After couple of years, moved to \
Systems Integration and Network Engineering having collected a solid foundation on script-based languages and developed a couple of DevOps network-centric based solutions for complex datacenter-based IT applications running under \
Microsoft, FreeBSD, OpenBSD and Linux platforms. Jumped to WEB development using LAMP, Bootstrap, Java and Spring Boot technologies. Currently, developing and mantaining \
a bunch of web-based payment applications using Docker, Kubernetes, PHP, JS, Spring Boot, MySQL, Nginx and others as Senior Software Architect. Want to know more about my challenging career as a \
solutions-oriented Sr Engineer? Just keep reading...";

//console.log(Array.from(aboutMeTextContent));
Array.from(aboutMeTextContent).forEach(char => {
    const span = document.createElement('span');
    span.textContent= char;
    aboutMeText.appendChild(span);
    span.addEventListener('mouseenter', (e) => {
        //e.target.style.animation="aboutMeTextAnim 10s infinite"
    });
});


