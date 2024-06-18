const contact = {
  async render() {
    return `
          <div class="contact-page">
            <h2>Contact Us</h2>
            <p>Jika Anda mempunyai pertanyaan, jangan ragu untuk menghubungi kami menggunakan formulir di bawah ini:</p>
            <form id="contact-form">
              <div class="form-group-contact">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
              </div>
              <div class="form-group-contact">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
              </div>
              <div class="form-group-contact">
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button class="button-submit-contact" type="submit">Submit</button>
            </form>
            <div id="form-response"></div>
          </div>
        `;
  },

  async afterRender() {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      };

      try {
        const response = await fetch("http://localhost:3000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          // Hapus teks pada form
          form.reset();

          // Tampilkan pesan respons
          document.getElementById("form-response").innerText = result.message;
        } else {
          // Tampilkan pesan error jika terjadi kesalahan
          document.getElementById("form-response").innerText =
            result.error || "An error occurred. Please try again.";
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        document.getElementById("form-response").innerText =
          "An error occurred. Please try again.";
      }
    });
  },
};

export default contact;
