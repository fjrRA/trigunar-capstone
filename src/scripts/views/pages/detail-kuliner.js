const kuliner = {
    async render() {
        const id = window.location.hash.split("/")[2];
        const response = await fetch(`https://trigunar-capstone.vercel.app/#/kuliner_admin${id}`);
        const kuliner = await response.json();

        return `
           <div class="content" id="content">
           <h2>Laut-lautan</h2>
    <div class="section main-image-section">
        <img src="${kuliner.image}" alt="Main Image" class="main-image">
    </div>

    <div class="section">
        
        <div class="price-button">
            <span class="price">Rp.${kuliner.price},-</span>
            <a href="#" class="button">Buy Ticket</a>
        </div>
    </div>

    <div class="section description">
        <h2>Deskripsi</h2>
        <p>${kuliner.description}</p>
    </div>

    <div class="location">
        <h2>Lokasi</h2>
        <br>
        <iframe src="${kuliner.location}" width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <div class="section other-destinations">
        <h2>Temukan Destinasi Lain</h2>
        <div class="cards">
            <div class="card">
                <img src="https://via.placeholder.com/300x200" alt="Destination 1">
                <h3 class="card-title">Mojo Savanna</h3>
                <span class="card-price">Rp. 30.000,-</span>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/300x200" alt="Destination 2">
                <h3 class="card-title">Rinaldi Beef Noodle</h3>
                <span class="card-price">Rp. 30.000,-</span>
            </div>
        </div>
    </div>
</div>
          `;
    },

    async afterRender() { },
};

export default kuliner;
