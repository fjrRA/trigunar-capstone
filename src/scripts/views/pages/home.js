const home = {
  async render() {
    try {
      const responseEvents = await fetch("http://localhost:3000/events");
      const events = await responseEvents.json();

      // Mendapatkan bulan saat ini
      const currentMonth = new Date().getMonth() + 1; // Menggunakan 1-12 untuk bulan

      // Memfilter acara berdasarkan bulan saat ini
      const filteredEvents = events.filter((event) => {
        const eventMonth = new Date(event.start_date).getMonth() + 1;
        return eventMonth === currentMonth;
      });

      const eventCards = filteredEvents
        .map((event) => {
          const eventDate = new Date(event.start_date).toLocaleDateString(
            "id-ID",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          );

          return `
          <div class="swiper-slide ">
            <div class="event-card">
              <div class="event-card__card-content">
                <h3>${eventDate}</h3>
                <a href="#/event/${event.id}">
                <div class="event__item">
                  <div class="event__date">
                    <p>${event.title}</p>
                  </div>
                  <div class="event__description">
                    <p>${event.city}</p>
                  </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        })
        .join("");

      const now = new Date();
      const promoEvent = events.find(
        (event) =>
          new Date(event.start_date) <= now && new Date(event.end_date) >= now
      );

      let promoSection = "";
      if (promoEvent) {
        const promoStartDate = new Date(
          promoEvent.start_date
        ).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const promoEndDate = new Date(promoEvent.end_date).toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );

        promoSection = `
            <!-- Promo Section -->
            <section id="promo" class="promo">
              <div class="promo__content">
                <div class="promo__text">
                  <h2>Promo Event: ${promoEvent.title}</h2>
                  <p class="promo__countdown">${promoStartDate} - ${promoEndDate}</p>
                  <p>${promoEvent.description}</p>
                </div>
                <div class="promo__card">
                  <img src="${promoEvent.image}" alt="${promoEvent.title}">
                  <div class="promo__card-details">
                    <h3>Lokasi</h3>
                    <h4>${promoEvent.city}</h4>
                    <p class="promo__card-price"><del>Rp.1.000.000,-</del> <span>Rp.300.000,-</span></p>
                  </div>
                </div>
              </div>
            </section>
          `;
      }

      // Ambil data destinasi dari endpoint destinations
      const responseDestinations = await fetch(
        "http://localhost:3000/destinations"
      );
      const destinations = await responseDestinations.json();

      // Urutkan destinasi berdasarkan ID secara descending (dari yang terbesar ke terkecil)
      destinations.sort((a, b) => b.id - a.id);

      // Ambil 4 data pertama setelah diurutkan
      const latestDestinations = destinations.slice(0, 5);

      // Membuat kartu destinasi untuk setiap destinasi yang dipilih
      const destinationCards = latestDestinations
        .map((destination) => {
          return `
          <div class="destination-card">
              <img src="${destination.image_url}" alt="${destination.name}" />
              <p>Destinasi</p>
               <a href="#/detail/${destination.id}">
              <h3>${destination.name}</h3>
              <div class="destination-card__desc">
                <div class="rating"><p> Rating: ${destination.rating}</p> </div>
                <div class="price"><p> Rp ${destination.price} </p> </div>
              </div>
            </a>
          </div>
        `;
        })
        .join("");

      return `
        <!-- Hero Section -->
        <div id="hero" class="hero">
          <div class="hero__title">
            <h1>Jelajah Keindahan Panorama Kota-Kota Pilihan dengan Trigunar.</h1>
            <button class="cta-button"><a href="#/kota">Daftar Kota</a></button>
          </div>
        </div>

       <!-- NEW SPOT Section -->
        <section id="new-spot" class="main-content__new-spot">
          <h2><i class="fas fa-solid fa-bullseye"></i> NEW SPOT</h2>
          <div class="main-content__new-spot__list-card">
            ${destinationCards}
          </div>
        </section>

        <!-- EVENT Section -->
        <section class="event-section">
          <h2><i class="fas fa-calendar-alt"></i> EVENT </h2>
          <div class="swiper mySwiper">
            <div class="swiper-wrapper content">
              ${eventCards}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>
        </section>


         ${promoSection}
      `;
    } catch (error) {
      console.error("Error fetching data:", error);
      return `
        <h1 class="kota">Lombok</h1>
        <p>Temukan Destinasi Impian Anda</p>
        <p>Error loading data. Please try again later.</p>
      `;
    }
  },

  async afterRender() {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      slidesPerGroup: 1,
      loop: true,
      grabCursor: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 2,
          spaceBetween: 5,
          slidesPerGroup: 1,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },
};

export default home;
