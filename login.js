//
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Mencegah reload halaman

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // 1.Pindahkan validasi input ke JavaScript:
    if (!username || !password) {
      // 2.Ganti error message agar aman dari XSS:
      errorMessage.textContent = "Username dan password wajib diisi!";
      return;
    }

    //3. Gunakan Fetch API untuk login request ke /api/login (simulasi backend).
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login berhasil!");
        window.location.href = "/dashboard.html"; // Redirect jika sukses
      } else {
        errorMessage.textContent = result.message; // Menampilkan error dengan aman
      }
    } catch (error) {
      errorMessage.textContent = "Terjadi kesalahan, coba lagi!";
    }
  });
});
