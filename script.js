// Fungsi Update Data dari Satu API (2934)
async function updateStatus() {
    try {
        const response = await fetch('https://api.gtps.cloud/api/server/public/2934');
        const data = await response.json();

        // Mengambil elemen dari HTML
        const txt = document.getElementById('statusTxt'); 
        const online = document.getElementById('onlineVal'); 

        // Update Angka Pemain
        online.innerText = data.onlineCount || 0;

        // Update Status Online/Offline (Boolean logic)
        if (data.online === true) {
            txt.innerText = "SYSTEM ACTIVE";
            txt.style.color = "#00ff88"; 
        } else {
            txt.innerText = "SYSTEM OFFLINE";
            txt.style.color = "#ff1a1a"; 
        }

    } catch (error) {
        console.error("API Error:", error);
        document.getElementById('statusTxt').innerText = "OFFLINE";
    }
}

// Jalankan Update Real-time setiap 5 detik
setInterval(updateStatus, 5000);
updateStatus();

// --- KODE MUSIC AUTO PLAY ---
document.addEventListener('click', function() {
    const audio = document.getElementById("audioTrack");
    if (audio && audio.paused) {
        audio.play().catch(err => console.log("Music blocked"));
    }
}, { once: true });
