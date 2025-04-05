
document.addEventListener('DOMContentLoaded', () => {
    console.log("hello world");
    const toggles = document.querySelectorAll('.serviceToggle');

    toggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = this.closest('.services');
        parent.classList.toggle('active');
      });
    });
  });