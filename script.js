"use strict";

//Lấy ra các DOM elenment

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

const healthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("calculate-bmi-btn");

//1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // 2. Lấy dữ liệu từ các Form Input,gán tất cả vào một Object tên là data
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
    // bmi: "?",
    date: new Date(),
  };

  // 3. Validate dữ liệu
  // nếu hợp lệ thì thực hiện bước 4 (thêm thú cưng vào danh sách)
  //nếu KHÔNg hợp lệ, in ra thông báo lỗi

  const validate = validateData(data);

  // 4. Thêm thú cưng vào danh sách
  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
    clearInput();
  }
  // Luôn hiển thị "Show Healthy Pet" mỗi khi ấn nút Submit
  healthyBtn.textContent = "Show Healthy Pet";
});

// saveToStorage("petArr", [data1, data2]);
// validate theo các yêu cầu:
function validateData(data) {
  let isValidate = true;
  for (let i = 0; i < petArr.length; i++) {
    //****Không có trường nào bị nhập thiếu dữ liệu *****
    // Không để trống ID
    if (data.id.trim() === "") {
      alert(`ID cannot be blank!`);
      isValidate = false;
      break;
    }

    // Kiểm tra ID phải là duy nhất
    if (data.id === petArr[i].id) {
      alert(`ID must be unique`);
      isValidate = false;
      break;
    }

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

// 5. Hiển thị danh sách thú cưng
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
                <button class="btn btn-danger" onclick="deletePet('${
                  petArr[i].id
                }')">
                  Delete
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
// 6. Xóa các dữ liệu nhập trong Form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//7. Xóa một thú cưng
function deletePet(petId) {
  // Xác nhận trước khi xóa
  const isDeleted = confirm("Are you sure");
  if (isDeleted) {
    //Xóa hàng dữ liệu
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        //Xóa khỏi mảng
        petArr.splice(i, 1); //tại vị trí thứ i, xóa 1 phần tử
        // Gọi hàm để hiển thị lại mảng petArr
        renderTableData(petArr);
        saveToStorage("petArr", petArr);
        break;
      }
    }
  }
}

// 8. Hiển thị các thú cưng khỏe mạnh
let healthyCheck = false;
let healthyPetArr = [];
const showHealthyPet = function () {
  if (healthyCheck === false) {
    // lọc ra Pet khỏe mạnh
    healthyPetArr = petArr.filter(function (data) {
      return data.vaccinated && data.dewormed && data.sterilized;
      // return (
      //   data.vaccinated == true &&
      //   data.dewormed == true &&
      //   data.sterilized == true
      // );
    });
    // Hiển thị thú cưng khỏe mạnh
    renderTableData(healthyPetArr);
    // Đổi nút thành Show All Pet
    healthyBtn.textContent = "Show All Pet";
    // Đổi lại biến cờ hiệu
    healthyCheck = true;
  } else {
    healthyBtn.textContent = "Show Healthy Pet";
    // Hiển thị tất cả các thú cưng
    renderTableData(petArr);
    healthyCheck = false;
  }
};

// Bắt sự kiện click hiển thị thú cưng khỏe mạnh
healthyBtn.addEventListener("click", function () {
  showHealthyPet();
});

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
