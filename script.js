// Fungsi untuk memaksa musik jalan saat interaksi pertama
document.addEventListener('click', function() {
    const audio = document.getElementById("audioTrack");
    if (audio.paused) {
        audio.play().catch(error => {
            console.log("Autoplay dicegah oleh browser, menunggu interaksi.");
        });
    }
}, { once: true }); // 'once: true' memastikan kode ini hanya jalan sekali saat klik pertama

// Tambahan: Mencoba play saat loading selesai (beberapa browser mengizinkan)
window.addEventListener('load', () => {
    const audio = document.getElementById("audioTrack");
    audio.play().catch(() => {
        console.log("Klik layar untuk memulai musik");
    });
});

// Fungsi Fetch API Server
async function updateStats() {
    try {
        const response = await fetch('https://api.gtps.cloud/api/server/public/2934');
        const data = await response.json();
        
        const statusText = document.getElementById('status-text');
        const statusDot = document.getElementById('status-dot');
        const playerCount = document.getElementById('player-online');

        // Logika Status
        if(data.status === "online") {
            statusText.innerText = "Online";
            statusDot.className = "dot online";
        } else if (data.status === "maintenance") {
            statusText.innerText = "Maintenance";
            statusDot.className = "dot maintance";
        } else {
            statusText.innerText = "Offline";
            statusDot.className = "dot offline";
        }

        // Ambil data player dari API Main
        const mainRes = await fetch('https://api.gtps.cloud/api/server/public/2934');
        const mainData = await mainRes.json();
        playerCount.innerText = `${mainData.onlineCount} / ${mainData.maxPlayers || '1000'}`;

    } catch (error) {
        console.log("Error fetching API", error);
    }
}

// Fungsi Copy
function copyHost(text) {
    navigator.clipboard.writeText(text);
    alert("Host Copied!");
}

// Jalankan saat load
window.onload = () => {
    updateStats();
    // Auto play music (beberapa browser butuh interaksi user dulu)
    document.body.onclick = () => {
        document.getElementById('bgMusic').play();
    };
};
