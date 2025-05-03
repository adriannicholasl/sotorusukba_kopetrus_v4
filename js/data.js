// Menambahkan event listener pada tombol close
document.getElementById('closeSelfieModal').addEventListener('click', closeSelfieModal);

// Closing the selfie modal when the close button is clicked
document.getElementById('closeSelfieModal').addEventListener('click', function() {
    document.getElementById('selfieModal').style.display = 'none';
});

document.addEventListener("DOMContentLoaded", () => {
const tableBody = document.getElementById("winnerTableBody");
const downloadButton = document.getElementById('downloadAll');

// Fungsi untuk mengunduh data sebagai CSV
function downloadDataAsCSV(data) {
    const rows = [];
    const header = ['No', 'Nama', 'Instagram', 'Telp', 'Level', 'Reward', 'Timestamp'];
    rows.push(header);

    // Menambahkan baris data
    Object.entries(data).forEach(([key, d], i) => {
        const row = [
            i + 1,
            d.nama || '-',
            d.ig || '-',
            d.telp || '-',
            d.level || '-',
            d.reward || '-',
            new Date(d.timestamp).toLocaleString(),
        ];
        rows.push(row);
    });

    // Mengubah array menjadi CSV string
    const csvContent = rows.map(row => row.join(',')).join('\n');

    // Membuat file CSV dan mengunduhnya
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data_pemenang.csv';
    link.click();
}

// Fungsi untuk mengunduh data sebagai JSON
function downloadDataAsJSON(data) {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data_pemenang.json';
    link.click();
}

// Menambahkan event listener pada tombol download
downloadButton.addEventListener('click', () => {
    db.ref("winners").once("value", snapshot => {
        const data = snapshot.val();
        if (data) {
            // Pilih format download (CSV atau JSON)
            const fileFormat = prompt('Pilih format unduhan (CSV/JSON):').toLowerCase();
            if (fileFormat === 'csv') {
                downloadDataAsCSV(data);
            } else if (fileFormat === 'json') {
                downloadDataAsJSON(data);
            } else {
                alert('Format yang dipilih tidak valid!');
            }
        } else {
            alert('Tidak ada data untuk diunduh.');
        }
    });
});

function renderData(data) {
    tableBody.innerHTML = "";
    if (!data || Object.keys(data).length === 0) {
    tableBody.innerHTML = `
        <tr class="tr-shadow">
        <td colspan="10" class="empty-table">Belum ada data pemenang.</td>
        </tr>`;
    return;
    }

    Object.entries(data).forEach(([key, d], i) => {
    const row = document.createElement("tr");
    row.classList.add("tr-shadow");

    row.innerHTML = `
        <td>${i + 1}</td>
        <td>${d.nama || '-'}</td>
        <td><span class="block-email">${d.ig || '-'}</span></td>
        <td>${d.telp || '-'}</td>
        <td>${d.level || '-'}</td>
        <td>${d.reward || '-'}</td>
        <td>${new Date(d.timestamp).toLocaleString()}</td>
        <td>
        ${d.selfie ? `<img src="${d.selfie}" class="selfie-thumbnail" alt="Selfie" style="max-height: 60px; border-radius: 5px;">` : 'Tidak ada'}
        </td>
        <td>
    <div class="table-data-feature">
        ${d.selfie 
            ? `<a class="item" title="Download Selfie" href="${d.selfie}" download="selfie_${(d.ig || 'pemenang').replace(/\s+/g, '_')}.png">
                <i class="zmdi zmdi-download"></i>
            </a>` 
            : ''}
        ${d.selfie 
            ? `<button class="item btn-lihat" title="Lihat Selfie" data-selfie="${d.selfie}">
                <i class="zmdi zmdi-eye"></i>
            </button>` 
            : ''}
        <button class="item btn-hapus" data-id="${key}" title="Hapus">
            <i class="zmdi zmdi-delete"></i>
        </button>
        </div>
    </td>
    `;

    tableBody.appendChild(row);

    // Tambahkan spacer antar baris
    const spacer = document.createElement("tr");
    spacer.classList.add("spacer");
    tableBody.appendChild(spacer);
    });

    const viewButtons = document.querySelectorAll('.btn-lihat');
    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
        const src = this.getAttribute('data-selfie');
        const img = document.getElementById("selfieModalImage");
        img.src = src;
        document.getElementById('selfieModal').style.display = "flex";
        });
    });

    function showSelfieModal(url) {
        const img = document.getElementById("selfieModalImage");
        img.src = url;
        document.getElementById("selfieModal").style.display = "flex";
    }
        
    function closeSelfieModal() {
        document.getElementById("selfieModal").style.display = "none";
    }

    // Tambahkan event listener untuk tombol hapus
    const deleteButtons = document.querySelectorAll('.btn-hapus');
    deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const key = this.getAttribute('data-id');  // Ambil ID entri dari data-id
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        db.ref("winners/" + key).remove().then(() => {
            alert("Data dihapus!");
            renderDataAfterUpdate(); // Render ulang setelah update
        }).catch(error => {
            console.error("Error menghapus data:", error);
            alert("Terjadi kesalahan saat menghapus data.");
        });
        }
    });
    });
}

function renderDataAfterUpdate() {
    db.ref("winners").once("value", snapshot => {
    renderData(snapshot.val());
    });
}

// Tunggu Firebase siap
const waitFirebase = setInterval(() => {
    if (window.db) {
    clearInterval(waitFirebase);
    db.ref("winners").once("value", snapshot => {
        renderData(snapshot.val());
    });
    }
}, 300);
});
