const event = {
  async render() {
    const id = window.location.hash.split("/")[2];
    const response = await fetch(`http://16.171.208.155:3000/events/${id}`);
    const event = await response.json();

    // Ambil data event dari endpoint events
    const responseEvents = await fetch("http://16.171.208.155:3000/events");
    const events = await responseEvents.json();

    // Urutkan event berdasarkan ID secara descending (dari yang terbesar ke terkecil)
    events.sort((a, b) => b.id - a.id);

    // Ambil 2 data pertama setelah diurutkan
    const latestEvents = events.slice(0, 2);

    const latestEventsHTML = latestEvents
      .map(
        (latestEvent) => `
          <div class="card">
            <a href="#/event/${latestEvent.id}">
              <img src="http://16.171.208.155:3000/${latestEvent.image}" alt="${latestEvent.title}">
              <h3 class="card-title">${latestEvent.title}</h3>
              <span class="card-price">Rp. ${latestEvent.price},-</span>
            </a>
          </div>
        `
      )
      .join("");

    return `
          <div class="content" id="content">
            <div class="section main-image-section">
              <h2>${event.title}</h2>
              <br>
              <img src="http://16.171.208.155:3000/${event.image}" alt="Main Image" class="main-image">
            </div>
    
            <div class="section">
              <div class="price-button">
                <span class="price">Rp. ${event.price},-</span>
                <a href="#/booking" class="button">Booking</a>
              </div>
            </div>
    
            <div class="section description">
              <h2>Deskripsi</h2>
              <p>${event.description}</p>
            </div>
    
            <div class="location">
              <h2>Lokasi</h2>
              <iframe src="${event.location}" width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
    
            <div class="section other-destinations">
              <h2>Event Terbaru</h2>
              <div class="cards">
                ${latestEventsHTML}
              </div>
            </div>
          </div>
        `;
  },

  async afterRender() { },
};

export default event;
