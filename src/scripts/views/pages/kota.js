const kota = {
  async render() {
    return `
    <h1>Kota</h1>
    <p>Temukan destinasi impian Anda</p>

    <div class="card-container">
         <div class="card">
        <div class="image">
        <img src="./icon/icon-jambi.jpeg" alt="Jambi">
        </div>
            <div class="card-content">
                <h2>Jambi</h2>
                <p>Jambi merupakan provinsi yang kaya akan sumber daya alam dan warisan budaya, menjadikannya salah satu daerah penting di Sumatera dengan potensi besar untuk pengembangan lebih lanjut.</p>
                <a href="/#/jambi"><button>Explore</button></a>
            </div>
        </div>

         <div class="card">
        <img src="./icon/icon-banyumas.jpeg" alt="banyumas">
            <div class="card-content">
              <h2>Banyumas</h2>
              <p>Banyumas merupakan daerah yang memiliki keseimbangan antara keindahan alam, kekayaan budaya, dan perkembangan ekonomi yang menjadikannya daerah yang menarik untuk dikunjungi maupun untuk tinggal.</p>
              <a href="/#/banyumas"><button>Explore</button></a>
            </div>
        </div>

        <div class="card">
        <div class="image">
        <img src="./icon/icon-lombok.jpeg" alt="Lombok">
        </div>
            <div class="card-content">
                <h2>Lombok</h2>
                <p>Lombok menawarkan kombinasi unik antara keindahan alam, kekayaan budaya, dan berbagai aktivitas outdoor, menjadikannya destinasi yang menarik bagi wisatawan domestik maupun internasional.</p>
                <a href="/#/lombok"><button>Explore</button></a>
            </div>
        </div>
    </div>
        `;
  },

  async afterRender() {},
};

export default kota;
