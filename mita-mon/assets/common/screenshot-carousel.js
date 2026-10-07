document.querySelectorAll('[data-carousel]').forEach((carousel) => {
      const track = carousel.querySelector('.carousel-track');
      const slides = [...carousel.querySelectorAll('.carousel-slide')];
      const dots = [...carousel.querySelectorAll('.carousel-dot')];
      const label = carousel.querySelector('.carousel-current-label');
      const viewport = carousel.querySelector('.carousel-viewport');
      let index = 0;
      let touchStartX = null;

      const updateTrackPosition = () => {
        const firstSlideLeft = slides[0].getBoundingClientRect().left;
        const activeSlideLeft = slides[index].getBoundingClientRect().left;
        track.style.transform = `translateX(-${activeSlideLeft - firstSlideLeft}px)`;
      };

      const repositionTrack = () => {
        const previousTransition = track.style.transition;
        track.style.transition = 'none';
        updateTrackPosition();
        track.getBoundingClientRect();
        track.style.transition = previousTransition;
      };

      const show = (nextIndex) => {
        index = (nextIndex + slides.length) % slides.length;
        updateTrackPosition();

        slides.forEach((slide, slideIndex) => {
          slide.setAttribute('aria-hidden', slideIndex === index ? 'false' : 'true');
        });

        dots.forEach((dot, dotIndex) => {
          const active = dotIndex === index;
          dot.classList.toggle('is-active', active);
          if (active) {
            dot.setAttribute('aria-current', 'true');
          } else {
            dot.removeAttribute('aria-current');
          }
        });

        label.textContent = slides[index].dataset.label;
      };

      carousel.querySelector('.carousel-arrow-prev').addEventListener('click', () => show(index - 1));
      carousel.querySelector('.carousel-arrow-next').addEventListener('click', () => show(index + 1));

      dots.forEach((dot, dotIndex) => {
        dot.addEventListener('click', () => show(dotIndex));
      });

      viewport.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          show(index - 1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          show(index + 1);
        }
      });

      viewport.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
      }, { passive: true });

      viewport.addEventListener('touchend', (event) => {
        if (touchStartX === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(delta) < 45) return;
        show(index + (delta < 0 ? 1 : -1));
      }, { passive: true });

      window.addEventListener('resize', repositionTrack, { passive: true });

      show(0);
    });
