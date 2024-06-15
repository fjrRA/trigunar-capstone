const event_admin = {
  async render() {
    return `
        <main>
          <div class="main-content-admin">
              <aside>
                  <ul>
                      <li><a href="/#/admin">Home</a></li>
                      <span></span>
                      <li>user</li>
                      <li><a href="/#/event_admin">Event</a></li>
                      <li>destination</li>
                      <li>Tri Kota</li>
                      <li><a href="/#/kuiner_admin">Kuliner</a></li>
                  </ul>
              </aside>
  
              <div class="content-dasboard">
                  <section class="form-section">
                      <h2>Tambahkan data & Edit data</h2>
                      <form id="package-form-event" enctype="multipart/form-data">
                          <div class="form-group">
                              <label for="title">Name</label>
                              <input type="text" id="title" name="title" required>
                          </div>
                          <div class="form-group">
                              <label for="description">Description</label>
                              <textarea id="description" name="description" required></textarea>
                          </div>
                          <div class="form-group">
                              <label for="location">Location</label>
                              <input type="text" id="location" name="location" required>
                          </div>
                          <div class="form-group">
                             <label for="city">City</label>
                             <select id="city" name="city" required>
                                <option value="">Pilih Kota</option>
                                <option value="Lombok">Lombok</option>
                                <option value="Banyumas">Banyumas</option>
                                <option value="Jambi">Jambi</option>
                            </select>
                        </div>
                          <div class="form-group">
                              <label for="price">Price</label>
                              <input type="number" id="price" name="price" required>
                          </div>
                          <div class="form-group">
                              <label for="start_date">Start Date</label>
                              <input type="date" id="start_date" name="start_date" required>
                          </div>
                          <div class="form-group">
                              <label for="end_date">End Date</label>
                              <input type="date" id="end_date" name="end_date" required>
                          </div>
                          <div class="form-group">
                              <label for="image">Gambar</label>
                              <input id="image" name="image" type="file" required>
                          </div>
                          <button type="submit">Save</button>
                      </form>
                  </section>
  
                  <section class="table-section">
                      <h2>Event</h2>
                      <table>
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Description</th>
                                  <th>Location</th>
                                  <th>City</th>
                                  <th>Price</th>
                                  <th>Start Date</th>
                                  <th>End Date</th>
                                  <th>Gambar</th>
                                  <th>Actions</th>
                              </tr>
                          </thead>
                          <tbody id="package-list-event">
                              <!-- Event packages will be populated here -->
                          </tbody>
                      </table>
                  </section>
              </div>
          </div>
      </main>
      `;
  },

  async afterRender() {
    const packageForm = document.getElementById("package-form-event");
    const packageList = document.getElementById("package-list-event");
    let editingPackageId = null;

    // Fetch data from server
    async function fetchPackages() {
      try {
        const response = await fetch("http://localhost:3000/events");
        const events = await response.json();
        packageList.innerHTML = "";
        events.forEach((pkg) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                  <td>${pkg.title}</td>
                  <td>${pkg.description}</td>
                  <td><iframe src="${
                    pkg.location
                  }" width="100" height="150" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></td>
                  <td>${pkg.city}</td>
                  <td>${pkg.price}</td>
                  <td>${pkg.start_date.split("T")[0]}</td>
                  <td>${pkg.end_date.split("T")[0]}</td>
                  <td><img src="${pkg.image}" alt="${pkg.image
            }" width="100"></td>
                  <td class="action">
                      <button class="edit" onclick="editPackage(${pkg.id
            })">Edit</button>
                      <button class="delete" onclick="deletePackage(${pkg.id
            })">Delete</button>
                </td>
            `;
          packageList.appendChild(row);
        });
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    }

    // Add or update data
    packageForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(packageForm);
      const method = editingPackageId ? "PUT" : "POST";
      const url = editingPackageId
        ? `http://localhost:3000/events/${editingPackageId}`
        : "http://localhost:3000/events";

      try {
        const response = await fetch(url, {
          method,
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        packageForm.reset();
        editingPackageId = null;
        fetchPackages();
      } catch (error) {
        console.error("Error adding/updating package:", error);
      }
    });

    // Edit package
    window.editPackage = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`);
        const pkg = await response.json();

        document.getElementById("title").value = pkg.title;
        document.getElementById("description").value = pkg.description;
        document.getElementById("location").value = pkg.location;
        document.getElementById("city").value = pkg.city;
        document.getElementById("price").value = pkg.price;
        document.getElementById("start_date").value =
          pkg.start_date.split("T")[0];
        document.getElementById("end_date").value = pkg.end_date.split("T")[0];
        document.getElementById("image").value = "";

        editingPackageId = id;
      } catch (error) {
        console.error("Error editing package:", error);
      }
    };

    // Delete package
    window.deletePackage = async (id) => {
      const isConfirmed = window.confirm(
        "Apakah anda yakin ingin menghapus Event ini?"
      );
      if (isConfirmed) {
        try {
          await fetch(`http://localhost:3000/events/${id}`, {
            method: "DELETE",
          });
          fetchPackages();
        } catch (error) {
          console.error("Error deleting package:", error);
        }
      }
    };

    fetchPackages();
  },
};

export default event_admin;
