const tentangKita = {
  async render() {
    return ` 
    <!-- <h2> Ini Adalah halaman Sign Up</h2> -->
    <br />

    <section class="signup-image">
      <div class="signup-container">
        <h1>SIGN UP</h1>

        <form action="" class="signup-container__signup-field">
          <input type="text" placeholder="Input your name" required>
          <input type="text" placeholder="Input ypur username" required>
          <input type="email" placeholder="Input your email" required>
          <input type="password" placeholder="Input your password" required>
          <div class="buttons">
            <button type="submit" class="login-btn">Login</button>
            <button type="button" class="signup-btn">Sign Up</button>
          </div>
        </form>

        <div class="signup-login">
          <p>Sudah memiliki akun? Silahkan <a href="#/login">Login</a></p>
        </div>
      </div>
  </section>
    `;
  },

  async afterRender() {
    const header = document.querySelector('.app-bar');
    if (header) {
      header.style.display = 'none';
    }
  },
};

export default tentangKita;
