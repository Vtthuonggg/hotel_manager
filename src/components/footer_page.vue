<template>
  <footer class="footer">
    <div class="footer-content">
      <p>Hotline: <a href="tel:+0123445567">0865202584</a></p>
      <p>
        Email: <a href="mailto:info@hotelmanager.com">batehotel@gmail.com</a>
      </p>
      <p>
        Facebook:
        <a href="https://www.facebook.com/thanhthuongvu52" target="_blank">
          facebook.com/batehotel
        </a>
      </p>
      <p>&copy; 2023 Hotel Manager. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterPage",
};
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
  z-index: 1000; /* Đảm bảo footer luôn hiển thị trên các phần tử khác */
}
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}
.footer-content p {
  margin: 5px 0;
}
.footer-content a {
  color: #1db4f0;
  text-decoration: none;
}
.footer-content a:hover {
  text-decoration: underline;
}
</style>
