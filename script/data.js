"use strict";
const inputFile = document.getElementById("input-file");
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");

// Bắt sự kiện nhấn vào nút Export
exportBtn.addEventListener("click", function () {
  const isExport = confirm(`Are you sure to Export Data?`);
  if (isExport) {
    saveStaticDataToFile();
  }
});

function saveStaticDataToFile() {
  var blob = new Blob([JSON.stringify(getFromStorage("petArr"))], {
    type: "application/json",
  });
  saveAs(blob, "petData.json");
}

// Bắt sự kiện nhấn vào nút Import
importBtn.addEventListener("click", function () {
  if (!inputFile.value) {
    alert(`Please click Choose File to import file!`);
  } else {
    const isImport = confirm(`Are you sure to Import Data?`);
    if (isImport) {
      const reader = new FileReader();
      const file = inputFile.files[0];
      reader.addEventListener(
        "load",
        () => {
          saveToStorage("petArr", JSON.parse(reader.result));
          alert(`Import successfully!`);
        },
        false
      );
      if (file) {
        reader.readAsText(file);
      }
    }
  }
});

// Tìm hiểu thêm /////////////////////////////////////////////

// function saveStaticDataToFile() {
//   var blob = new Blob([JSON.stringify(getFromStorage("petArr"))], {
//     type: "text/plain;charset=utf-8",
//   });
//   saveAs(blob, "petData.json");
// }

// // Khởi tạo đối tượng FileReader
// const reader = new FileReader();

// // Lắng nghe trạng thái đăng tải tệp
// fileUpload.addEventListener("change", (event) => {
//   // Lấy thông tin tập tin được đăng tải
//   const files = event.target.files;

//   // Đọc thông tin tập tin đã được đăng tải
//   reader.readAsDataURL(files[0]);

//   // Lắng nghe quá trình đọc tập tin hoàn thành
//   reader.addEventListener("load", (event) => {
//     // Lấy chuỗi Binary thông tin hình ảnh
//     const img = event.target.result;

//     // Thực hiện hành động gì đó, có thể append chuỗi giá trị này vào thẻ IMG
//     console.log(img); // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAA........
//   });
// });

// function previewFile() {
//   const content = document.querySelector(".content");
//   const [file] = document.querySelector("input[type=file]").files;
//   const reader = new FileReader();

//   reader.addEventListener(
//     "load",
//     () => {
//       // this will then display a text file
//       content.innerText = reader.result;
//     },
//     false
//   );

//   if (file) {
//     reader.readAsText(file);
//   }
// }
