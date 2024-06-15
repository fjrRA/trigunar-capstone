const admin = {
  async render() {
    return `
        <main>
          <div class="main-content-admin">
              <aside>
                  <ul>
                      <li>home</li>
                      <li><a href="/#/event_admin">Event</a></li>
                      <li><a href="/#/kuliner_admin">Kuliner</a></li>
                  </ul>
              </aside>
  
              <div class="content-dasboard">
                  <section class="form-section">
                      <h2>Tambahkan data & Edit data</h2>
                      <form id="package-form" enctype="multipart/form-data">
                          <div class="form-group">
                              <label for="name">Name</label>
                              <input type="text" id="name" name="name" required>
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
                              <label for="rating">Rating</label>
                              <input type="number" id="rating" name="rating" step="0.01" required>
                          </div>
                          <div class="form-group">
                              <label for="price">Price</label>
                              <input type="number" id="price" name="price" required>
                          </div>
                          <div class="form-group">
                              <label for="image_url">Gambar</label>
                              <input id="image_url" name="image_url" type="file" required>
                          </div>
                          <button class="submit" type="submit">Save</button>
                      </form>
                  </section>
  
                  <section class="table-section">
                      <h2>Destination</h2>
                      <table>
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Description</th>
                                  <th>Location</th>
                                  <th>City</th>
                                  <th>Rating</th>
                                  <th>Price</th>
                                  <th>Img</th>
                                  <th>Actions</th>
                              </tr>
                          </thead>
                          <tbody id="package-list">
                              <!-- Travel packages will be populated here -->
                          </tbody>
                      </table>
                  </section>
              </div>
          </div>
        </main>
      `;
  },

  async afterRender() {
    const packageForm = document.getElementById("package-form");
    const packageList = document.getElementById("package-list");
    let editingPackageId = null;

    // Ambil data dari server
    async function fetchPackages() {
      try {
        const response = await fetch("http://localhost:3000/destinations");
        const destinations = await response.json();
        packageList.innerHTML = "";
        destinations.forEach((pkg) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${pkg.name}</td>
              <td>${pkg.description}</td>
              <td>${pkg.location}</td>
              <td>${pkg.city}</td>
              <td>${pkg.rating}</td>
              <td>${pkg.price}</td>
              <td><img src="${pkg.image_url}" alt="${pkg.image_url}" width="100"></td>
              <td class="action">
                <button class="edit" onclick="editPackage(${pkg.id})">Edit</button>
                <button class="delete" onclick="deletePackage(${pkg.id})">Delete</button>
              </td>
            `;
          packageList.appendChild(row);
        });
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    }

    // Tambahkan atau update data
    packageForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(packageForm);
      const method = editingPackageId ? "PUT" : "POST";
      const url = editingPackageId
        ? `http://localhost:3000/destinations/${editingPackageId}`
        : "http://localhost:3000/destinations";

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
        const response = await fetch(
          `http://localhost:3000/destinations/${id}`
        );
        const pkg = await response.json();
        document.getElementById("name").value = pkg.name;
        document.getElementById("description").value = pkg.description;
        document.getElementById("location").value = pkg.location;
        document.getElementById("city").value = pkg.city;
        document.getElementById("rating").value = pkg.rating;
        document.getElementById("price").value = pkg.price;

        if (pkg.image_url.startsWith("http")) {
          document.getElementById("image_url").value = "";
        } else {
          document.getElementById("image_url").value = pkg.image_url;
        }
        editingPackageId = id;
      } catch (error) {
        console.error("Error editing package:", error);
      }
    };

    // Hapus package
    window.deletePackage = async (id) => {
      const isConfirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus destinasi ini?"
      );
      if (isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:3000/destinations/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          fetchPackages();
        } catch (error) {
          console.error("Error deleting package:", error);
        }
      }
    };

    fetchPackages();


    const header = document.querySelector('.app-bar');
    if (header) {
      header.style.display = 'none';
    }
  },

};

export default admin;
