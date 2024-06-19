const booking = {
  async render() {
    let destinations = [];
    try {
      const response = await fetch("http://13.51.121.56:3000/destinations");
      destinations = await response.json();

      // Cek apakah data yang diambil adalah array
      if (!Array.isArray(destinations)) {
        throw new Error("Data fetched is not an array");
      }
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
      return `<p>Failed to load destinations. Please try again later.</p>`;
    }

    // Buat opsi untuk pilihan tempat
    const destiOptions = destinations
      .map(
        (destination) =>
          `<option value="${destination.id}">${destination.name}</option>`
      )
      .join("");

    return ` 
    <br />
    <section class="signup-image">
      <div class="signup-container">
        <h1>BOOKING</h1>
        <p>Di atas input name itu nanti ada field id_booking-nya langsung muncul</p>

        <form action="" id="form-booking" class="signup-container__signup-field">
          <select id="id" name="id" required>
            ${destiOptions}
          </select>
          <input type="text" id="user_name" name="user_name" placeholder="Input your name" required>
          <input type="email" id="user_email" name="user_email" placeholder="Input your email" required>
          <input type="text" id="No_hp" name="No_hp" placeholder="Input your phone number" required>
          <input type="date" id="booking_date" name="booking_date" required>
          <div class="buttons">
            <button type="submit" class="login-btn">Booking</button>
            <button type="button" class="signup-btn">Cancel</button>
          </div>
        </form>
        <div id="form-response" style="color:#f1f1f1;"></div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const header = document.querySelector(".app-bar");
    if (header) {
      header.style.display = "none";
    }

    const form = document.getElementById("form-booking");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formElements = event.target.elements;
      // console.log((formElements.id).value);

      const formData = {
        id: formElements.id.value,
        user_name: formElements.user_name.value,
        user_email: formElements.user_email.value,
        No_hp: formElements.No_hp.value,
        booking_date: formElements.booking_date.value,
      };

      try {
        const response = await fetch("http://13.51.121.56:3000/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          form.reset();
          document.getElementById("form-response").innerText = result.message;
        } else {
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

export default booking;
