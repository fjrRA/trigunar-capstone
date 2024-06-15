const kota = {
  async render() {
    return `
    <h1>Kota</h1>
    <p>Temukan destinasi impian Anda</p>

    <div class="card-container">
        <div class="card">
        <div class="image">
        <img src="./Lombok/desa-sade-2.jpeg" alt="Jambi">
        </div>
            <div class="card-content">
                <h2>Jambi</h2>
                <p>Lorem ipsum dolor sit amet consectetur. Euismod feugiat eros at convallis et vel leo lacus.</p>
                <a href="/#/jambi"><button>Explore</button></a>
            </div>
        </div>

        <div class="card">
        <img src="./lombok/sembalun-1.jpg" alt="banyumas">
            <div class="card-content">
              <h2>Banyumas</h2>
              <p>Lorem ipsum dolor sit amet consectetur. Euismod feugiat eros at convallis et vel leo lacus.</p>
              <a href="/#/banyumas"><button>Explore</button></a>
            </div>
        </div>

        <div class="card">
        <div class="image">
        <img src="./lombok/gili-trawangn3.jpg" alt="Lombok">
        </div>
            <div class="card-content">
                <h2>Lombok</h2>
                <p>Lorem ipsum dolor sit amet consectetur. Euismod feugiat eros at convallis et vel leo lacus.</p>
                <a href="/#/lombok"><button>Explore</button></a>
            </div>
        </div>
    </div>
        `;
  },

  async afterRender() {},
};

export default kota;
