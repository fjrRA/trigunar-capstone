const detail = {
  async render() {
    const id = window.location.hash.split("/")[2];
    const response = await fetch(`http://16.171.208.155:3000/destinations/${id}`);
    const destination = await response.json();

    // Ambil data event dari endpoint events
    const responseDestinations = await fetch(
      "http://16.171.208.155:3000/destinations"
    );
    const destinations = await responseDestinations.json();

    // Urutkan destinasi berdasarkan ID secara descending (dari yang terbesar ke terkecil)
    destinations.sort((a, b) => b.id - a.id);

    // Ambil 5 data pertama setelah diurutkan
    const latestDestinations = destinations.slice(0, 3);

    // Buat HTML untuk destinasi terbaru
    const latestDestinationsHTML = latestDestinations
      .map(
        (destination) => `
          <div class="card">
          <a href="#/detail/${destination.id}">
            <img src="http://16.171.208.155:3000/${destination.image_url}" alt="${destination.name}">
            <h3 class="card-title">${destination.name}</h3>
            <span class="card-price">Rp. ${destination.price},-</span>
            </a>
          </div>
        `
      )
      .join("");

    return `
          <div class="content" id="content">
            <div class="section main-image-section">
              <h2>${destination.name}</h2>
              <br>
              <img src="http://16.171.208.155:3000/${destination.image_url}" alt="Main Image" class="main-image">
            </div>
    
            <div class="section">
              <div class="price-button">
                <span class="price">Rp. ${destination.price},-</span>
                <a href="#/booking" class="button">Booking</a>
              </div>
            </div>
    
            <div class="section description">
              <h2>Deskripsi</h2>
              <p>${destination.description}</p>
            </div>
    
            <div class="location">
              <h2>Lokasi</h2>
              <iframe src="${destination.location}" width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
    
            <div class="section other-destinations">
              <h2>Temukan Destinasi Lain</h2>
              <div class="cards">
                ${latestDestinationsHTML}
              </div>
            </div>
          </div>
        `;
  },

  async afterRender() { },
};

export default detail;
