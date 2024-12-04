"use strict";

const findBtn = document.getElementById("find-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

// Hiển thị toàn bộ dữ liệu thú cưng
renderTableData(petArr);

// Hàm tìm kiếm các thú cưng
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;
  // Dùng filter lọc các dữ liệu thỏa mãn trong includes
  // petArr.includes.value;petArrFind= pettArr.filter(petArr.includes.value)
  // Lọc xong thì hiển thị bảng petArrFind
  // => rendertableArrFind(petArrFind)
  // Điều này không làm thay đổi find petArr
  // Kiểm tra trường Input
  if (idInput.value) {
    petArrFind = petArrFind.filter((petItem) =>
      petItem.id.includes(idInput.value)
    );
  }
  if (nameInput.value) {
    petArrFind = petArrFind.filter((petItem) =>
      petItem.name.includes(nameInput.value)
    );
  }
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter(
      (petItem) => petItem.type === typeInput.value
    );
  }
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter(
      (petItem) => petItem.breed === breedInput.value
    );
  }

  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((petItem) => petItem.vaccinated === true);
  }
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((petItem) => petItem.dewormed === true);
  }
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((petItem) => petItem.sterilized === true);
  }
  // Sau tìm kiếm xong, hiển thị lại dữ liệu thú cưng đã tìm
  renderTableData(petArrFind);
});

// Hàm hiển thị mảng thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr"); //Tao 1 the tr
    row.innerHTML = `
                <th scope="row">${petArr[i].id}</th>
                <td>${petArr[i].name}</td>
                <td>${petArr[i].age}</td>
                <td>${petArr[i].type}</td>
                <td>${petArr[i].weight} kg</td>
                <td>${petArr[i].length}</td>
                <td>${petArr[i].breed}</td>
                <td>
                  <i class="bi bi-square-fill" style="color: ${
                    petArr[i].color
                  }"></i>
                </td>
                <td><i class="bi ${
                  petArr[i].vaccinated
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].dewormed
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].sterilized
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td>
                ${displayTime(petArr[i].date).slice(8, 10)}
                /${displayTime(petArr[i].date).slice(5, 7)}
                /${displayTime(petArr[i].date).slice(0, 4)}
                </td>
                `;
    tableBodyEl.appendChild(row);
  }
}

// Hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

// Hàm để chọn các loại giống trong input Breed
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  petArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
renderBreed();
