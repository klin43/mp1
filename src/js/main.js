/* Your JS here. */
console.log('Hello World!')

// resize navbar + scroll position indicator 
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const sections = Array.from(links).map(link => document.querySelector(link.getAttribute("href")));
    const header = document.querySelector("header");

    const setActiveLink = () => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect 
        const navBottom = header.getBoundingClientRect().bottom;
        let currIdx = 0;

        sections.forEach((section, idx) => {
            if (section.getBoundingClientRect().top <= navBottom) {
                currIdx = idx; 
            }
        });
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        if (atBottom) {
            currIdx = sections.length - 1;
        }
        links.forEach((link, idx) => {link.classList.toggle("active", idx === currIdx);});
    }
    window.addEventListener("scroll", setActiveLink);
    setActiveLink();

    const resizeHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", resizeHeader);
    resizeHeader();
});

// modals
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".category-card");
    const dialogs = document.querySelectorAll("dialog");

    cards.forEach(c => {
        c.addEventListener("click", () => {
            document.getElementById(c.dataset.modal).showModal();
        });
    });
    dialogs.forEach(d => {
        d.querySelector(".modal-close").addEventListener("click", () => {
            d.close();
        })
        d.addEventListener("click", e => {
            if (e.target === d) {d.close();}
        });
    });
});

// carousel 
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    const rightArr = document.querySelector(".right-arrow");
    const leftArr = document.querySelector(".left-arrow");
    let currSlide = 0;
    const showSlide = (idx) => {
        currSlide = idx;
        slides.forEach((s, i) => s.classList.toggle("active", i === currSlide));
        
        // https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
        rightArr.disabled = currSlide === slides.length - 1; 
        leftArr.disabled = currSlide === 0; 
    }

    rightArr.addEventListener("click", () => {
        showSlide(currSlide + 1)
    }); 
    leftArr.addEventListener("click", () => {
        showSlide(currSlide - 1)
    }); 
    showSlide(0);
});