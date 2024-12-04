"use strict";
const submitBtn = document.getElementById("submit-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

// Hiển thị danh sách thú cưng
renderTableData(petArr);

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
                petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
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
              <td>
                <button class="btn btn-warning" onclick="startEditPet('${
                  petArr[i].id
                }')">
                  Edit
                 </button>
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

//7. Edit một thú cưng
// Khi người dùng nhập vào nút Edit sẽ chạy hàm startEditPet();
function startEditPet(petId) {
  formEl.classList.remove("hide");
  petArr.forEach(function (item) {
    if (petId === item.id) {
      idInput.value = item.id;
      nameInput.value = item.name;
      ageInput.value = item.age;
      typeInput.value = item.type;
      weightInput.value = item.weight;
      lengthInput.value = item.length;
      colorInput.value = item.color;
      vaccinatedInput.checked = item.vaccinated;
      dewormedInput.checked = item.dewormed;
      sterilizedInput.checked = item.sterilized;
      // Hiển thị breed theo từng loại thú cưng
      renderBreed();
      // Hiển thị dữ liệu loại breed ban đầu trước khi edit
      breedInput.value = `${item.breed}`;
    }
  });
}

function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  // Nếu type là Dog
  if (typeInput.value === "Dog") {
    // Lọc mảng chứa các loài Dog
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
  // Nếu type là Cat
  else if (typeInput.value === "Cat") {
    // Lọc mảng chứa các loài Cat
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // Lấy dữ liệu từ các Form Input,gán tất cả vào một Object tên là data
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    // date: new Date(),
  };

  // Validate dữ liệu

  const validate = validateData(data);

  if (validate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);

    // Giữ nguyên ngày thêm thú cưng
    data.date = petArr[index].date;

    //Cập nhật lại dữ liệu thú cưng
    petArr[index] = data;

    // Lưu dữ liệu mới trên Storage
    saveToStorage("petArr", petArr);

    // Ẩn form chỉnh sửa thông tin thú cưng
    formEl.classList.add("hide");

    // Hiển thị lại bảng dữ liệu thú cưng
    renderTableData(petArr);
  }
});

// validate theo các yêu cầu:
function validateData(data) {
  let isValidate = true;
  for (let i = 0; i < petArr.length; i++) {
    //****Không có trường nào bị nhập thiếu dữ liệu *****
    // Name không được để trống
    if (data.name.trim() === "") {
      alert(`Please type a Name!`);
      isValidate = false;
      break;
    }

    // Age không được để trống
    if (isNaN(data.age)) {
      alert(`Please type Age!`);
      isValidate = false;
      break;
    }

    // kiểm tra weight phải ở trong khoảng 1 đến 15
    if (data.age < 1 || data.age > 15) {
      alert(`Age must be between 1 and 15!`);
      isValidate = false;
      break;
    }

    if (data.type.trim() === "Select Type") {
      alert(`Please choose Type!`);
      isValidate = false;
      break;
    }

    // Không nhập thiếu w
    if (isNaN(data.weight)) {
      alert(`Please type weight!`);
      isValidate = false;
      break;
    }

    // kiểm tra weight phải ở trong khoảng 1 đến 15
    if (data.weight < 1 || data.weight > 15) {
      alert(`Weight must be between 1 and 15!`);
      isValidate = false;
      break;
    }

    // không nhập thiếu length
    if (isNaN(data.length)) {
      alert(`Please type length`);
      isValidate = false;
      break;
    }

    // kiểm tra weight phải ở trong khoảng 1 đến 100
    if (data.length < 1 || data.length > 100) {
      alert(`Length must be between 1 and 100!`);
      isValidate = false;
      break;
    }

    // Kiem tra Breed
    if (data.breed === "Select Breed") {
      alert(`Please select Breed!`);
      isValidate = false;
      break;
    }
  }
  return isValidate;
}
