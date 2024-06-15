import kota from "../views/pages/kota";
import paketWisata from "../views/pages/paket-wisata";
import tentangKita from "../views/pages/tentang-kita";
import pembayaran from "../views/pages/pembayaran";
import home from "../views/pages/home";

//untuk halaman Tri Kota
import jambi from "../views/pages/jambi";
import lombok from "../views/pages/lombok";
import banyumas from "../views/pages/banyumas";

//untuk halaman signUp
import signup from "../views/pages/signup";

// untuk halaman detail
import detail from "../views/pages/detail-wisata";
import kuliner from "../views/pages/detail-kuliner";
import event from "../views/pages/detail-event";

// untuk halaman admin
import admin from "../views/pages/admin/index";
import event_admin from "../views/pages/admin/event";
import kuliner_admin from "../views/pages/admin/kuliner";

// untuk komponen pendukung
import about from "../views/pages/komponen/about";
import contact from "../views/pages/komponen/contact";
import ourTeam from "../views/pages/komponen/our-team";

const routes = {
  "/": home,
  "/home": home,
  "/kota": kota,
  "/about": about,
  "/contact": contact,
  "/ourTeam": ourTeam,
  "/paket-wisata": paketWisata,
  "/tentang-kita": tentangKita,
  "/pembayaran": pembayaran,
  "/jambi": jambi,
  "/lombok": lombok,
  "/banyumas": banyumas,
  "/detail/:id": detail,
  "/kuliner/:id": kuliner,
  "/event/:id": event,
  "/signup": signup,
  "/admin": admin,
  "/event_admin": event_admin,
  "/kuliner_admin": kuliner_admin,
};

export default routes;
