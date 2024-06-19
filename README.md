# hydrohero
Panduan Penggunaan Repository
Berikut adalah panduan lengkap untuk mengkloning dan menjalankan repository ini di lingkungan lokal Anda.

## Prasyarat

Pastikan Anda memiliki:
- **Node.js** dan **npm** (Node Package Manager) terinstal di sistem Anda. Anda dapat mengunduh dan menginstal Node.js dan npm dari [situs resmi Node.js](https://nodejs.org/).
- **MySQL** terinstal dan berjalan di sistem Anda.

## Langkah 1: Kloning Repository
Untuk mengkloning repository ini, buka terminal atau command prompt dan jalankan perintah berikut:

```bash
git clone <URL_REPOSITORY>
```

Gantikan `<URL_REPOSITORY>` dengan URL repository GitHub.

## Langkah 2: Instalasi Dependensi
Setelah mengkloning repository, masuk ke direktori project:

```bash
cd nama-folder-repository
```

Instal semua dependensi yang diperlukan dengan menjalankan:

```bash
npm install
```

## Langkah 3: Konfigurasi Database
Pastikan MySQL berjalan dan buat database yang diperlukan. Salin file `config/dbConfig.example.js` menjadi `config/dbConfig.js` dan sesuaikan dengan pengaturan MySQL Anda:

```bash
cp config/dbConfig.example.js config/dbConfig.js
```

Edit file `config/dbConfig.js` dan gantikan `NAMA_DATABASE`, `USERNAME_DATABASE`, dan `PASSWORD_DATABASE` dengan detail yang sesuai.

## Langkah 4: Menjalankan Aplikasi
Untuk menjalankan server, gunakan perintah berikut di terminal:

```bash
npm start
```

Ini akan menjalankan server di port yang ditentukan di file `server.js`. Secara default, aplikasi akan berjalan di port 3000.

## Langkah 5: Akses Aplikasi
Buka browser dan akses aplikasi melalui:

[http://localhost:3000/](http://localhost:3000/)

Anda sekarang dapat berinteraksi dengan API sesuai dengan rute yang telah ditentukan di dalam aplikasi.

## Cara Menggunakan Login dan Register di Postman

### Register
Untuk mendaftarkan pengguna baru, Anda perlu mengirimkan permintaan POST ke endpoint `/api/register` dengan data pengguna.

1. Buka Postman dan pilih metode POST.
2. Masukkan URL endpoint untuk register: [http://localhost:3000/api/register](http://localhost:3000/api/register)
3. Pada tab Body, pilih raw dan set format ke JSON.
4. Masukkan data pengguna seperti berikut:
   ```json
   {
     "username": "nama_pengguna",
     "email": "email@contoh.com",
     "password": "passwordkuat"
   }
   ```
5. Klik Send. Jika berhasil, Anda akan menerima respons yang menunjukkan bahwa pengguna telah terdaftar.

### Login
Setelah mendaftar, pengguna dapat login dengan mengirimkan permintaan POST ke endpoint `/api/login`.

1. Buka Postman dan pilih metode POST.
2. Masukkan URL endpoint untuk login: [http://localhost:3000/api/login](http://localhost:3000/api/login)
3. Pada tab Body, pilih raw dan set format ke JSON.
4. Masukkan kredensial pengguna:
   ```json
   {
     "email": "email@contoh.com",
     "password": "passwordkuat"
   }
   ```
5. Klik Send. Jika kredensial benar, Anda akan menerima respons yang menunjukkan bahwa pengguna telah berhasil login.

## Fitur yang Tersedia

### Profil Pengguna
- **Membuat Profil**: Endpoint untuk membuat profil pengguna baru.
- **Mengupdate Profil**: Endpoint untuk mengupdate profil pengguna yang sudah ada.
- **Mengambil Profil**: Endpoint untuk mengambil data profil pengguna.

### Pencatatan Asupan Air
- **Menambahkan Asupan Air**: Endpoint untuk menambahkan catatan asupan air harian pengguna.

### Prediksi Dehidrasi
- **Prediksi Dehidrasi**: Endpoint untuk memprediksi tingkat dehidrasi berdasarkan data yang diberikan.

### Logout
- **Logout**: Endpoint untuk logout dan mencabut token autentikasi pengguna.

### Rute yang Dilindungi
- **Rute Dilindungi**: Endpoint yang hanya bisa diakses jika pengguna sudah login dan memiliki token yang valid.

### Contoh Penggunaan API di Postman
- **Register**: Mengirim permintaan POST ke `/api/register` dengan data pengguna.
- **Login**: Mengirim permintaan POST ke `/api/login` dengan kredensial pengguna.
- **Membuat Profil**: Mengirim permintaan POST ke `/api/profile/create` dengan data profil.
- **Mengupdate Profil**: Mengirim permintaan PUT ke `/api/profile/profiles/:id` dengan data yang diupdate.
- **Mengambil Profil**: Mengirim permintaan GET ke `/api/profile/profiles/:id`.
- **Menambahkan Asupan Air**: Mengirim permintaan POST ke `/api/profile/profiles/:id/water-intake` dengan data asupan air.
- **Prediksi Dehidrasi**: Mengirim permintaan POST ke `/api/predict` dengan data yang diperlukan.
- **Logout**: Mengirim permintaan POST ke `/api/logout`.

Dengan panduan ini, pengguna akan lebih mudah mengikuti langkah-langkah untuk mengatur dan menjalankan aplikasi serta memahami fitur-fitur yang tersedia.
