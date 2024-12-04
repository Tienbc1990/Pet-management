"use strict";

// nhập 2 dữ liệu mẫu
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 6,
  length: 50,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2022, 2, 1),
};
const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "green",
  breed: "Mixed breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(2022, 2, 2),
};

// Nhập 4 mẫu dữ liệu breed mẫu
const breed1 = {
  breed: "Mixed breed",
  type: "Dog",
};
const breed2 = {
  breed: "Tây tạng",
  type: "Dog",
};
const breed3 = {
  breed: "Lười",
  type: "Cat",
};
const breed4 = {
  breed: "Tabby",
  type: "Cat",
};

const sidebar = document.getElementById("sidebar");
// 1. Bắt sự kiện vào nút sidebar
sidebar.addEventListener("click", function () {
  this.classList.toggle("active");
  //   sidebar.classList.toggle("active");
});

// Kiểm tra trình duyệt có hỗ trợ lưu trữ localStorage và sessionStorage
if (typeof Storage !== "undefined") {
  console.log(`Trình duyệt hỗ trợ lưu trữ localStorage và sessionStorage`);
} else {
  console.log(
    `Trình duyệt KHÔNG hỗ trợ lưu trữ localStorage và sessionStorage`
  );
}

// Lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
let petArr = getFromStorage("petArr");

// Lấy dữ liệu breedArr
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}
let breedArr = getFromStorage("breedArr");

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
