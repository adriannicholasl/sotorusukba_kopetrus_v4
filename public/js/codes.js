document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("Menunggu Firebase siap...");
    await window.firebaseReady;

    if (!window.db) {
      console.error("❌ window.db belum siap!");
      alert("Firebase Database belum siap. Periksa koneksi.");
      return;
    }

    console.log("✅ Firebase siap");
    loadCodes();

    // Load ulang setiap 10 menit
    setInterval(loadCodes, 600000);
  } catch (err) {
    console.error("❌ Firebase tidak siap:", err);
    alert("Firebase tidak siap. Periksa koneksi.");
  }
});

// SAVE CODE
window.saveCode = async function () {
  const code = document.getElementById("codeInput").value.trim();
  const hours = parseInt(document.getElementById("expireHours").value) || 24;

  if (!/^[0-9]{6}$/.test(code)) {
    alert("Kode harus 6 digit angka!");
    return;
  }

  if (!window.db) {
    alert("Firebase Database belum siap.");
    return;
  }

  const now = Date.now();
  const expiredAt = now + hours * 60 * 60 * 1000;

  try {
    await window.db.ref("access_codes/" + code).set({
      code,
      status: "Tersedia",
      created_at: now,
      expired_at: expiredAt,
    });
    alert("Kode berhasil disimpan!");
    document.getElementById("codeInput").value = "";
    loadCodes();
  } catch (err) {
    console.error(err);
    alert("Gagal menyimpan kode.");
  }
};

async function loadCodes() {
  const table = document.getElementById("codesTableBody");
  table.innerHTML = `<tr><td colspan="5">Memuat data...</td></tr>`;

  if (!window.db) {
    table.innerHTML = `<tr><td colspan="5">Firebase Database belum siap.</td></tr>`;
    return;
  }

  try {
    const snap = await window.db.ref("access_codes").once("value");
    const data = snap.val() || {};
    table.innerHTML = "";

    const now = Date.now();

    if (Object.keys(data).length === 0) {
      table.innerHTML = `<tr><td colspan="5">Belum ada kode.</td></tr>`;
      return;
    }

    Object.values(data).forEach(async (item) => {
      let status = item.status;

      // Auto expire
      if (now > item.expired_at && item.status !== "Terpakai") {
        status = "Kadaluwarsa";
        await window.db.ref("access_codes/" + item.code).update({ status: "Kadaluwarsa" });
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.code}</td>
        <td>${statusBadge(status)}</td>
        <td>${formatDate(item.created_at)}</td>
        <td>${formatDate(item.expired_at)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteCode('${item.code}')">
          <i class="fa fa-trash"></i>
        </button></td>
      `;
      table.appendChild(row);
    });
  } catch (err) {
    console.error("❌ Gagal load codes:", err);
    table.innerHTML = `<tr><td colspan="5">Gagal memuat data.</td></tr>`;
  }
}

// DELETE CODE
window.deleteCode = async function (code) {
  if (!confirm("Yakin ingin menghapus kode: " + code + " ?")) return;

  if (!window.db) {
    alert("Firebase Database belum siap.");
    return;
  }

  try {
    await window.db.ref("access_codes/" + code).remove();
    loadCodes();
  } catch (err) {
    console.error(err);
    alert("Gagal menghapus kode.");
  }
};

// STATUS BADGE
function statusBadge(status) {
  if (status === "Tersedia") return `<span class="status-badge status-available">Tersedia</span>`;
  if (status === "Terpakai") return `<span class="status-badge status-used">Terpakai</span>`;
  return `<span class="status-badge status-expired">Kadaluwarsa</span>`;
}

// FORMAT DATE
function formatDate(t) {
  return new Date(t).toLocaleString("id-ID");
}

// DOWNLOAD JSON
window.downloadCodesJSON = async function () {
  if (!window.db) return alert("Firebase Database belum siap.");

  const snap = await window.db.ref("access_codes").once("value");
  const data = snap.val() || {};
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "access_codes.json";
  a.click();
  URL.revokeObjectURL(url);
};

// DOWNLOAD CSV / EXCEL
window.downloadCodesCSV = async function () {
  if (!window.db) return alert("Firebase Database belum siap.");

  const snap = await window.db.ref("access_codes").once("value");
  const data = snap.val() || {};
  if (!data || Object.keys(data).length === 0) return alert("Belum ada data kode.");

  const rows = [["Kode", "Status", "Dibuat", "Expired"]];
  Object.values(data).forEach((d) => {
    rows.push([d.code, d.status, formatDate(d.created_at), formatDate(d.expired_at)]);
  });

  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "access_codes.csv";
  a.click();
  URL.revokeObjectURL(a.href);
};

// DOWNLOAD PDF
window.downloadCodesPDF = async function () {
  if (!window.db) return alert("Firebase Database belum siap.");

  const snap = await window.db.ref("access_codes").once("value");
  const data = snap.val() || {};
  if (!data || Object.keys(data).length === 0) return alert("Belum ada data kode.");

  const body = [["Kode", "Status", "Dibuat", "Expired"]];
  Object.values(data).forEach((d) => {
    body.push([d.code, d.status, formatDate(d.created_at), formatDate(d.expired_at)]);
  });

  const docDefinition = {
    content: [{ text: "Daftar Kode Akses", style: "header" }, { table: { headerRows: 1, widths: ["*", "*", "*", "*"], body: body } }],
    styles: { header: { fontSize: 16, bold: true, marginBottom: 10 } },
  };

  pdfMake.createPdf(docDefinition).download("access_codes.pdf");
};
