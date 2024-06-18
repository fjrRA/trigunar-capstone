const paketWisata = {
  async render() {
    return `
      <header>
        <h1>Paket Wisata Tri Kota</h1>
        <p>Jelajahi keindahan Lombok, Banyumas, dan Jambi dengan paket wisata eksklusif kami.</p>
      </header>
      <main>
        <div class="paket-container">
          <div class="paket">
             <img src="./icon/icon-lombok.jpeg" alt="Lombok">
            <h2>Paket 1 | Rp. 1.700.000</h2>
            <h3>Lombok</h3>
            <ul>
              <li>Hotel</li>
              <li>Transportasi</li>
              <li>Makan 1 Kali Dalam 1 Hari</li>
              <li>Tiket Wisata</li>
              <li>Pemandu Wisata</li>
              <li>Dokumentasi Perjalanan</li>
            </ul>
          </div>
          <div class="paket">
            <img src="./icon/icon-banyumas.jpeg" alt="banyumas">
            <h2>Paket 2 | Rp. 2.000.000</h2>
            <h3>Banyumas</h3>
            <ul>
              <li>Hotel</li>
              <li>Transportasi</li>
              <li>Makan 3 Kali Dalam 1 Hari</li>
              <li>Tiket Wisata</li>
              <li>Pemandu Wisata</li>
              <li>Dokumentasi Perjalanan</li>
            </ul>
          </div>
          <div class="paket">
             <img src="./icon/icon-jambi.jpeg" alt="Jambi">
            <h2>Paket 3 | Rp. 2.500.000</h2>
            <h3>Jambi</h3>
            <ul>
              <li>Hotel</li>
              <li>Transportasi</li>
              <li>Makan 3 Kali Dalam 1 Hari</li>
              <li>Tiket Wisata</li>
              <li>Pemandu Wisata</li>
              <li>Dokumentasi Perjalanan</li>
              <li>Snorkeling</li>
            </ul>
          </div>
        </div>
      </main>
    `;
  },

  async afterRender() {},
};

export default paketWisata;
