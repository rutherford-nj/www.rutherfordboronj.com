import { Carousel } from "bootstrap"

export function initHomepageCarousel() {
    document.querySelectorAll(".homepage-carousels .carousel").forEach(c => {
        let carousel = new Carousel(c);
        carousel.cycle();
    })
} 