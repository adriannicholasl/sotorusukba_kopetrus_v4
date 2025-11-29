// Event: Download CSV
document.getElementById("btnDownloadCSV")?.addEventListener("click", async () => {
    // Show "Sedang Mendownload" alert
    alert("Sedang Mendownload...");

    const snap = await window.db.ref("winners").once("value");
    const data = snap.val();
    if (!data) {
        alert("Data kosong");
        return;
    }

    const rows = [["No", "Nama", "Instagram", "Telepon", "Level", "Hadiah", "Waktu"]];
    Object.values(data).forEach((d, i) => {
        rows.push([
            i + 1,
            d.nama || "-",
            d.ig || "-",
            d.telp || "-",
            d.level || "-",
            d.reward || "-",
            new Date(d.timestamp).toLocaleString()
        ]);
    });

    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data_pemenang.csv";
    a.click();

    // Show success alert when download is complete
    alert("Data berhasil didownload");
});

// Event: Download JSON
document.getElementById("btnDownloadJSON")?.addEventListener("click", async () => {
    // Show "Sedang Mendownload" alert
    alert("Sedang Mendownload...");

    const snap = await window.db.ref("winners").once("value");
    const data = snap.val();
    if (!data) {
        alert("Data kosong");
        return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data_pemenang.json";
    a.click();

    // Show success alert when download is complete
    alert("Data berhasil didownload");
});

// Event: Download PDF
document.getElementById("btnDownloadPDF")?.addEventListener("click", async () => {
    // Show "Sedang Mendownload" alert
    alert("Sedang Mendownload...");

    const snap = await window.db.ref("winners").once("value");
    const data = snap.val();
    if (!data) {
        alert("Data kosong");
        return;
    }

    const body = [["No", "Nama", "Instagram", "Telepon", "Level", "Hadiah", "Waktu"]];
    Object.values(data).forEach((d, i) => {
        body.push([
            i + 1,
            d.nama || "-",
            d.ig || "-",
            d.telp || "-",
            d.level || "-",
            d.reward || "-",
            new Date(d.timestamp).toLocaleString()
        ]);
    });

    const docDefinition = {
        content: [
            { text: "Data Pemenang", style: "header" },
            {
                table: {
                    headerRows: 1,
                    widths: ["auto", "*", "*", "*", "auto", "*", "*"],
                    body: body
                }
            }
        ],
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                marginBottom: 10
            }
        }
    };

    pdfMake.createPdf(docDefinition).download("data_pemenang.pdf");

    // Show success alert when download is complete
    alert("Data berhasil didownload");
});