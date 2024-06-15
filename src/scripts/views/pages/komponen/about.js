const about = {
  async render() {
    return `
      <div class="about-page">
        <h2>Tentang Trigunar Travel</h2>
        <p>Selamat datang di Trigunar Travel! Kami berdedikasi untuk mempromosikan pariwisata berkelanjutan yang merayakan keragaman sosial, budaya, dan lingkungan. Misi kami adalah memberikan pengalaman perjalanan yang tak terlupakan sambil memastikan bahwa kegiatan kami memberikan kontribusi positif bagi komunitas dan ekosistem yang kami kunjungi.</p>
        
        <h3>Nilai-Nilai Kami</h3>
        <ul>
          <li><strong>Tanggung Jawab Sosial:</strong> Kami percaya dalam memberikan kembali kepada komunitas yang kami kunjungi. Tur kami dirancang untuk mendukung ekonomi lokal dan mempromosikan kesejahteraan sosial.</li>
          <li><strong>Penghormatan Budaya:</strong> Kami berkomitmen untuk menghormati dan melestarikan warisan budaya dari destinasi yang kami jelajahi. Kami mendorong para wisatawan kami untuk berinteraksi dengan tradisi dan kebiasaan lokal secara hormat.</li>
          <li><strong>Pariwisata Berkelanjutan:</strong> Kami berupaya untuk meminimalkan jejak lingkungan kami dengan mengadopsi praktik berkelanjutan dan mempromosikan pilihan perjalanan ramah lingkungan.</li>
        </ul>
        
        <h3>Misi Kami</h3>
        <p>Di Trigunar Travel, misi kami adalah menciptakan pengalaman perjalanan yang bermakna yang menumbuhkan apresiasi mendalam terhadap keanekaragaman budaya dan keindahan alam dunia kita. Kami berupaya menginspirasi para wisatawan kami untuk menjadi duta besar pariwisata berkelanjutan, mengadvokasi praktik perjalanan yang bertanggung jawab yang menguntungkan baik manusia maupun planet ini.</p>
        
        <h3>Hubungi Kami</h3>
        <p>Jika Anda memiliki pertanyaan atau ingin mempelajari lebih lanjut tentang tur dan layanan kami, jangan ragu untuk menghubungi kami. Kami siap membantu Anda merencanakan petualangan berikutnya!</p>
      </div>
    `;
  },

  async afterRender() {},
};

export default about;
