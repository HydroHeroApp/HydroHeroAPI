function hitungDehidrasi() {
    // Menerima input dari pengguna
    var jenisKelamin = prompt("Masukkan Jenis Kelamin (M/F):").trim().toUpperCase();
    var umur = parseInt(prompt("Masukkan Umur:").trim());
    var beratAwal = parseFloat(prompt("Masukkan Berat Badan Awal (kg):").trim());
    var tinggi = parseFloat(prompt("Masukkan Tinggi (cm):").trim());
    
    // Menerima input berat badan setelah kehilangan cairan
    var beratSetelah = parseFloat(prompt("Masukkan Berat Badan Setelah Kehilangan Cairan (kg):").trim());
    
    // Menghitung kehilangan berat badan
    var kehilanganBerat = beratAwal - beratSetelah;
    
    // Menghitung kehilangan TBW
    var kehilanganTBW;
    if (jenisKelamin === 'M') {
        kehilanganTBW = kehilanganBerat * 0.6;
    } else if (jenisKelamin === 'F') {
        kehilanganTBW = kehilanganBerat * 0.5;
    } else {
        throw new Error("Jenis kelamin harus 'M' untuk laki-laki atau 'F' untuk perempuan");
    }
    
    // Menentukan ambang batas untuk dehidrasi
    var ambangRingan = 0.5; // Ambang batas untuk dehidrasi ringan (misalnya, 0.5 kg)
    var ambangBerat = 1.0; // Ambang batas untuk dehidrasi berat (misalnya, 1.0 kg)
    
    // Menentukan kelas dehidrasi
    var kelasDehidrasi;
    if (kehilanganTBW >= ambangBerat) {
        kelasDehidrasi = "Dehidrasi Berat";
    } else if (kehilanganTBW >= ambangRingan) {
        kelasDehidrasi = "Dehidrasi Ringan";
    } else {
        kelasDehidrasi = "Tidak Dehidrasi";
    }
    
    console.log("Kehilangan Total Air Tubuh: " + kehilanganTBW + " kg");
    console.log("Kelas Dehidrasi: " + kelasDehidrasi);
}

// Menjalankan fungsi
hitungDehidrasi();
