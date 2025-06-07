let records = JSON.parse(localStorage.getItem("records")) || [];

function renderRecords(filter = "") {
  const table = document.getElementById("recordList");
  table.innerHTML = "";

  records.forEach((rec, index) => {
    if (
      rec.name.toLowerCase().includes(filter.toLowerCase()) ||
      rec.email.toLowerCase().includes(filter.toLowerCase()) ||
      rec.phone.includes(filter)
    ) {
      table.innerHTML += `
        <tr>
          <td>${rec.name}</td>
          <td>${rec.email}</td>
          <td>${rec.phone}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" onclick="editRecord(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteRecord(${index})">Delete</button>
          </td>
        </tr>`;
    }
  });
}

function saveRecords() {
  localStorage.setItem("records", JSON.stringify(records));
}

document.getElementById("entryForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const index = document.getElementById("index").value;

  if (name && email && phone) {
    const record = { name, email, phone };
    if (index === "") {
      records.push(record);
    } else {
      records[index] = record;
      document.getElementById("index").value = "";
    }

    saveRecords();
    renderRecords();
    this.reset();
  }
});

function editRecord(index) {
  const rec = records[index];
  document.getElementById("name").value = rec.name;
  document.getElementById("email").value = rec.email;
  document.getElementById("phone").value = rec.phone;
  document.getElementById("index").value = index;
}

function deleteRecord(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    records.splice(index, 1);
    saveRecords();
    renderRecords();
  }
}

document.getElementById("searchInput").addEventListener("input", function () {
  renderRecords(this.value);
});

window.onload = renderRecords;

