const event = {
    async render() {
        const id = window.location.hash.split("/")[2];
        const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxeHltaXp0bnh1c3N4ZmhtZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzNTY3MzgsImV4cCI6MjAzMzkzMjczOH0.wJYcYZq9i27v-mlwH4r3KsV0Pk0HjhJfPBeqYdzx14s';
        const response = await fetch(`https://iqxymiztnxussxfhmfra.supabase.co/rest/v1/events/${id}`, {
            headers: {
                'apikey': apiKey,
                'Authorization': `Bearer ${apiKey}` // Include the Authorization header if required
            }
        });
        const event = await response.json();

        return `
            <div class="content" id="content">
                <h2>Laut-lautan</h2>
                <div class="section main-image-section">
                    <img src="${event.image}" alt="Main Image" class="main-image">
                </div>

                <div class="section">
                    <div class="price-button">
                        <span class="price">Rp.${event.price},-</span>
                        <a href="#" class="button">Buy Ticket</a>
                    </div>
                </div>

                <div class="section description">
                    <h2>Deskripsi</h2>
                    <p>${event.description}</p>
                </div>

                <div class="location">
                    <h2>Lokasi</h2>
                    <br>
                    <iframe src="${event.location}" width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div class="section other-destinations">
                    <h2>Temukan Destinasi Lain</h2>
                    <div class="cards">
                        <div class="card">
                            <img src="https://via.placeholder.com/300x200" alt="Destination 1">
                            <h3 class="card-title">Mojo Savanna</h3>
                            <span class="card-price">Rp. 30.000,-</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() { },
};

export default event;
