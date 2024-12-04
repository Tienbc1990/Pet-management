"use strict";

const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

submitBtn.addEventListener("click", function () {
  // lưu dữ liệu nhập từ input vào biến data
  const data = {
    breed: inputBreed.value,
    type: inputType.value,
  };

  // validate thành công thì đẩy dữ liệu vào mảng breedArr, sau đó lưu trên Storage và hiển thị mảng breedArr
  const validate = validateBreedData(data);
  if (validate) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    renderBreedTable(breedArr);
    clearInput();
  }

  // Hàm validate dữ liệu breed
  function validateBreedData(data) {
    let validate = true;
    for (let i = 0; i < breedArr.length; i++) {
      if (data.breed.trim() === "") {
        alert(`Type any breed!`);
        validate = false;
        break;
      }
      if (data.type === "Select Type") {
        alert(`Please select type Dog or Cat!`);
        validate = false;
        break;
      }
      // Khi thêm Breed, nếu trùng lặp thì hiện thông báo
      for (let j = 0; j < breedArr.length; j++) {
        if (
          data.breed.trim() === breedArr[i].breed &&
          data.type === breedArr[i].type
        ) {
          alert(`This breed has already existed!`);
          validate = false;
          break;
        }
      }
    }

    return validate;
  }
});

// Hiển thị mảng breedArr
renderBreedTable(breedArr);
function renderBreedTable() {
  tableBodyEl.innerHTML = "";
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${index + 1}</td>
    <td scope="col">${breedItem.breed}</td> 
    <td scope="col">${breedItem.type}</td>
    <td>
    <button type="button" onclick="deleteBreed('${
      breedItem.breed
    }')" class="btn btn-danger">Delete</button>
    </td>
    `;

    tableBodyEl.appendChild(row);
  });
}

// Xoá dữ liệu nhập trên trường form Input
function clearInput() {
  inputBreed.value = "";
  inputType.value = "Select Type";
}

//// Xoá breed

function deleteBreed(br) {
  const isDeleted = confirm("Are you sure?");
  if (isDeleted) {
    // Dùng forEach
    breedArr.forEach(function (breedItem, index) {
      if (br === breedItem.breed) {
        breedArr.splice(index, 1);
        renderBreedTable(breedArr);
      }
      saveToStorage("breedArr", breedArr);
    });

    // // Dùng for
    // for (let i = 0; i < breedArr.length; i++) {
    //   if (breed === breedArr[i].breed) {
    //     breedArr.splice(i, 1);
    //     renderBreedTable(breedArr);
    //   }
    // }
  }
}
