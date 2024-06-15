const banyumas = {
  async render() {
    try {
      const responseDestinations = await fetch(
        "http://localhost:3000/destinations"
      );
      const destinations = await responseDestinations.json();
      const banyumasDestinations = destinations.filter(
        (destination) => destination.city === "Banyumas"
      );

      const responseEvents = await fetch("http://localhost:3000/events");
      const events = await responseEvents.json();
      const banyumasEvent = events.filter((event) => event.city === "Banyumas");

      const responseKuliners = await fetch("http://localhost:3000/kuliners");
      const kuliners = await responseKuliners.json();
      const banyumasKuliner = kuliners.filter(
        (kuliner) => kuliner.city === "Banyumas"
      );

      return `
          <h1 class="kota">Banyumas</h1>
          <p>Temukan Destinasi Impian Anda</p>
  
          <h2 class="title">Wisata</h2>
          <div class="wisata">
            <div class="container-wisata">
              ${banyumasDestinations
                .map(
                  (destination) => `
                <div class="image-wisata">
                  <a href="#/detail/${destination.id}">
                    <img src="${
                      destination.image_url || "./default-image.jpg"
                    }" alt="${destination.name}" />
                  </a>
                  <h3>${destination.name}</h3>
                  <p tabindex="0">${destination.description.slice(
                    0,
                    150
                  )}...</p>
                  <div class="rating">Rating: ${destination.rating}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
  
          <h2 class="title">Kuliner</h2>
          <div class="wisata">
            <div class="container-wisata">
              ${banyumasKuliner
                .map(
                  (kuliner) => `
                <div class="image-wisata">
                 <a href="#/kuliner/${kuliner.id}">
                    <img src="${kuliner.image || "./default-image.jpg"}"
                     alt="${kuliner.name}" />
                  </a>
                  <h3>${kuliner.name}</h3>
                 <p tabindex="0">${kuliner.description.slice(0, 150)}...</p>
                  <div class="rating">Rating: ${kuliner.rating}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
  
          <h2 class="title">Event</h2>
          <div class="wisata">
            <div class="container-wisata">
              ${banyumasEvent
                .map(
                  (event) => `
                <div class="image-wisata">
                  <a href="#/event/${event.id}">
                    <img src="${event.image || "./default-image.jpg"}"
                     alt="${event.title}" />
                  </a>
                  <h3>${event.title}</h3>
                  <p tabindex="0">${event.description.slice(0, 150)}...</p>
                  <div class="price">RP. ${event.price}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
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
    // Implementasi logika setelah render
    console.log("Rendering Lombok page completed.");
  },
};

export default banyumas;
