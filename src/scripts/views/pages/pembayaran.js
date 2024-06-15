const pembayaran = {
    async render() {
        return `
    <section class="login-image">
        <div class="login-container">
            <img src="./Login/logo-login.png" alt="Travel Icon" class="login-icon">
            <h1 class="login-title">LOGIN</h1>

            <form class="login-form">
                <input type="text" placeholder="Username or email" required>
                <input type="password" placeholder="Password" required>
                <div class="buttons">
                    <button type="submit" class="login-btn">Login</button>
                    <a href="/#/signup" class="signup-btn">Sign Up</a>
                </div>
            </form>

            <div class="login-google">
                <p>Login as</p>
                <a href=""><img src="./Login/devicon_google.png" alt="Login with Google"></a>
            </div>
        </div>
    </section>
          `;
    },

    async afterRender() { },
};

export default pembayaran;
