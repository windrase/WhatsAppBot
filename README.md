# WINTUNELING VPN Auto Order VPN 🚀

Bot WhatsApp otomatis canggih yang dibangun menggunakan library [Baileys](https://github.com/WhiskeySockets/Baileys). Bot ini dirancang untuk mempermudah penjualan dan manajemen akun VPN/SSH secara *real-time* dengan fitur lengkap mulai dari pembuatan akun hingga pembayaran otomatis via QRIS.

> **⚠️ INFO PENTING / LISENSI SCRIPT**
>
> Script ini adalah versi **Premium/Private**. Jika Anda tertarik untuk menggunakan source code ini sepenuhnya, membutuhkan lisensi, atau jasa instalasi terima beres, silakan hubungi kontak resmi developer di bawah ini:
>
> * 📱 **WhatsApp:** [0859-2164-5742](https://wa.me/6285921645742)
> * ✈️ **Telegram:** [@WintunelingVPNN](https://t.me/WintunelingVPNN)

## 🌟 Fitur Utama

Bot ini mengotomatiskan tugas-tugas seller VPN/SSH tanpa perlu login manual ke server VPS.

### 1. Multi-Protokol Support
Mendukung manajemen akun untuk berbagai jenis protokol tunneling populer:
* **SSH** (WS, SSL, UDP, OHP)
* **VMess**
* **VLess**
* **Trojan**
* **ZiVPN**

### 2. Manajemen Akun Lengkap
Fitur pengelolaan akun yang komprehensif:
* ✅ **Create Account:** Membuat akun baru secara instan.
* 🔄 **Renew Account:** Memperpanjang masa aktif akun user.
* 🗑️ **Delete Account:** Menghapus akun yang sudah expired atau tidak diinginkan.
* 🔒 **Lock/Unlock:** Mengunci dan membuka akses akun pengguna (kill user nakal).
* ⏱️ **Trial Mode:** Pembuatan akun uji coba (trial) otomatis dengan durasi terbatas.

### 3. Sistem Pembayaran & Reseller
* **QRIS Payment:** Integrasi pembayaran otomatis via QRIS.
* **Cek Mutasi Otomatis:** Pengecekan status pembayaran real-time menggunakan API (Orkut).
* **Reseller System:** Manajemen database reseller untuk penjual bawahan.

### 4. Utilitas Server
* **Manajemen Server Dinamis:** Tambah dan hapus server VPS tujuan langsung dari chat bot (Database SQLite).
* **Cek Port:** Monitoring status port server (80/443).

## 🛠️ Prasyarat (Requirements)

Sebelum menjalankan bot, pastikan lingkungan server Anda memenuhi syarat berikut:
* **Node.js** (Versi 16.x atau terbaru)
* **NPM** (Node Package Manager)
* **Curl** (Wajib terinstall untuk komunikasi API ke backend VPS)
* **SQLite3** (Untuk database penyimpanan data bot)

## 📦 Panduan Instalasi

1.  **Clone Repository**
    ```bash
    git clone https://github.com/windrase/WhatsAppBot.git
    cd WhatsAppBot
    ```

2.  **Install Dependencies**
    Install paket-paket yang diperlukan:
    ```bash
    npm install
    ```

3.  **Konfigurasi Bot**
    Edit file `.vars.json` untuk mengatur nomor owner dan data pembayaran:
    ```json
    {
      "USER_ID": ["6285921645742"],
      "DATA_QRIS": "STRING_QRIS_ANDA_DISINI",
      "API_QRIS_KEY": "API_KEY_ANDA"
    }
    ```
    *(Ganti `6285921645742` dengan nomor WhatsApp Anda)*

4.  **Jalankan Bot**
    ```bash
    npm start
    ```
    Atau:
    ```bash
    node wa_main.js
    ```

5.  **Tautkan WhatsApp**
    Scan QR Code yang muncul di terminal menggunakan aplikasi WhatsApp di HP Anda (Menu Perangkat Tertaut).

## ⚙️ Daftar Perintah (Commands)

### Menu User / Pembeli
* `.menu` - Menampilkan daftar layanan dan harga.
* `.buy [tipe]` - Membeli akun premium (contoh: `.buy ssh`).
* `.trial [tipe]` - Membuat akun trial gratis.
* `.cekport` - Mengecek status aktif port server.

### Menu Owner / Admin
* `.addserver` - Menambahkan server VPS baru ke database.
* `.delserver` - Menghapus server dari database.
* `.list` - Melihat daftar server yang aktif.
* `.addadmin` / `.deladmin` - Mengelola akses reseller.
* `.renew [tipe]` - Memperpanjang akun user secara manual.
* `.lock [tipe]` / `.unlock [tipe]` - Mengelola status akun user.
* `.addzivpn` - Menambahkan konfigurasi khusus ZiVPN.

## 🔗 Integrasi Backend VPS

Bot ini berfungsi sebagai **Frontend**. Agar fitur berjalan, VPS Backend Anda harus memiliki Script API yang sesuai untuk menangani request `curl` dari bot ke endpoint seperti:
* `/vps/sshvpn`
* `/vps/vmessall`
* `/vps/vlessall`
* `/vps/trojanall`
* `/create/zivpn`

---

## 📞 Kontak & Support

Script ini dikembangkan secara privat. Dukungan teknis, update fitur, dan pembelian full source code hanya dilayani melalui kontak resmi:

* **WhatsApp:** [0859-2164-5742](https://wa.me/6285921645742)
* **Telegram:** [@WintunelingVPNN](https://t.me/WintunelingVPNN)

---
*© 2024 Wintunneling VPN. Hak Cipta Dilindungi.*
