// take all carousels from page
const carousels = document.querySelectorAll('.js-carousel');

// init it one by one
carousels.forEach((carousel) => initCarousel(carousel));

function initCarousel(carouselElement) {
  // listen click on carousel wrap element
  carouselElement.addEventListener('click', (event) => {
    // don't do anything if clicked something instead of controls
    if (!event.target.classList.contains('js-carousel-control')) {
      return;
    }

    // check direction and go
    if (event.target.dataset.direction === 'next') {
      goNext(carouselElement);
    } else {
      goPrev(carouselElement);
    }
  })
}

function goPrev(carouselElement) {
  // current ACTIVE
  const activeSlide = carouselElement.querySelector('.js-carousel-slide.active');
  // current LAST-PREV
  const lastPrev = carouselElement.querySelector('.last-prev');
  // all other PREV elements (except LAST-PREV)
  const otherPrevs = carouselElement.querySelectorAll('.prev:not(.last-prev)');
  // last of all other PREV elements - new candidate for LAST-PREV
  const newLastPrev = otherPrevs.item(otherPrevs.length - 1);

  // mark new candidate as LAST-PREV if needed
  if (newLastPrev) {
    newLastPrev.classList.add('last-prev');
  }

  // mark old LAST-PREV as new ACTIVE by adding .active class and remove prev-s classes
  lastPrev.classList.add('active');
  lastPrev.classList.remove('prev', 'last-prev');

  // mark previous ACTIVE as NEXT
  activeSlide.classList.add('next');
  activeSlide.classList.remove('active');
}

function goNext(carouselElement) {
  // current LAST-PREV
  const lastPrev = carouselElement.querySelector('.last-prev');
  // current ACTIVE
  const activeSlide = carouselElement.querySelector('.js-carousel-slide.active');
  // first NEXT
  const firstNext = carouselElement.querySelector('.js-carousel-slide.next');

  // mark first NEXT as new ACTIVE
  firstNext.classList.add('active');
  firstNext.classList.remove('next');

  // mark ACTIVE as PREV and LAST-PREV
  activeSlide.classList.add('prev', 'last-prev');
  activeSlide.classList.remove('active');

  // if we already have previous LAST-PREV make it just PREV
  if (lastPrev) {
    lastPrev.classList.remove('last-prev');
  }
}
