const kuliner = {
  async render() {
    const id = window.location.hash.split("/")[2];
    const response = await fetch(`http://16.171.208.155:3000/kuliners/${id}`);
    const kuliner = await response.json();

    // Ambil data event dari endpoint events
    const responseEvents = await fetch("http://16.171.208.155:3000/kuliners");
    const kuliners = await responseEvents.json();

    // Urutkan event berdasarkan ID secara descending (dari yang terbesar ke terkecil)
    kuliners.sort((a, b) => b.id - a.id);

    // Ambil 2 data pertama setelah diurutkan
    const latestkuliners = kuliners.slice(0, 2);

    const latestKulinersHTML = latestkuliners
      .map(
        (latestkuliners) => `
            <div class="card">
              <a href="#/kuliner/${latestkuliners.id}">
                <img src="http://16.171.208.155:3000/${latestkuliners.image}" alt="${latestkuliners.title}">
                <h3 class="card-title">${latestkuliners.name}</h3>
                <span class="card-price">Rp. ${latestkuliners.price},-</span>
              </a>
            </div>
          `
      )
      .join("");

    return `
            <div class="content" id="content">
              <div class="section main-image-section">
                <h2>${kuliner.name}</h2>
                <br>
                <img src="http://16.171.208.155:3000/${kuliner.image}" alt="Main Image" class="main-image">
              </div>
      
              <div class="section">
                <div class="price-button">
                  <span class="price">Rp. ${kuliner.price},-</span>
                  <a href="#/booking" class="button">Buy</a>
                </div>
              </div>
      
              <div class="section description">
                <h2>Deskripsi</h2>
                <p>${kuliner.description}</p>
              </div>
      
              <div class="location">
                <h2>Lokasi</h2>
                <iframe src="${kuliner.location}" width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
      
              <div class="section other-destinations">
                <h2>Event Terbaru</h2>
                <div class="cards">
                  ${latestKulinersHTML}
                </div>
              </div>
            </div>
          `;
  },

  async afterRender() { },
};

export default kuliner;
