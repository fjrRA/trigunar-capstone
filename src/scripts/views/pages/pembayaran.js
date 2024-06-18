const pembayaran = {
  async render() {
    return `
       <section class="checkout-section">
      <div class="checkout-section__container">
        <h1 class="checkout-section__title">PEMBAYARAN</h1>
  
        <form class="checkout-section__form">
          <input type="text" placeholder="Masukan kode booking" required>
          <input type="text" placeholder="Masukan nama" required>
          <input type="email" placeholder="Masukan email" required>
          <input type="number" placeholder="Masukan Nomer HP" required>
          <div class="buttons">
            <button type="submit" class="submit-btn">Bayar</button>
            <a href="/#/home" class="cancel-btn">Cancel</a>
          </div>
        </form>
      </div>
    </section>
            `;
  },

  async afterRender() {},
};

export default pembayaran;
