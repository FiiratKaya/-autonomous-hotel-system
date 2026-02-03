document.getElementById("rezervasyonForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const data = {
        isim: document.getElementById("isim").value,
        kisi_sayisi: parseInt(document.getElementById("kisi_sayisi").value),
        bekleyebilir_mi: document.getElementById("bekleyebilir_mi").value === "true"
    };

    // Uygun odaları sorgula
    const response = await fetch("/api/uygun_odalar", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const result = await response.json();
    const odalarListesi = document.getElementById("odalarListesi");
    odalarListesi.innerHTML = "";

    if(result.uygun.length === 0){
        odalarListesi.innerHTML = "<li>Uygun oda bulunamadı.</li>";
        return;
    }

    // Odaları listele
    result.uygun.forEach(oda => {
        const li = document.createElement("li");
        li.textContent = `Oda ${oda.oda_no} - Tip: ${oda.oda_tipi} - Max Kişi: ${oda.max_kisi}`;
        odalarListesi.appendChild(li);
    });
});
