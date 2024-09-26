function Employee() {
  var inp1 = document.querySelector("#emid").value;
  var inp2 = document.querySelector("#emname").value;
  var inp3 = document.querySelector("#email").value;
  var inp4 = document.querySelector("#emsalary").value;

  var err1 = document.querySelector("#err");
  var err2 = document.querySelector("#err1");
  var err3 = document.querySelector("#err2");
  var err4 = document.querySelector("#err3");

  // Validation for empty fields
  if (inp1 == '' || inp2 == '' || inp3 == '' || inp4 == '') {
    alert("Please fill all fields!");
    return;
  }

  // Regular expression patterns for validation
  var pattern = /^[0-9]+$/;
  var pattern1 = /^[a-zA-Z\s]+$/;
  var pattern2 = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  var pattern3 = /^[0-9]+(\.[0-9]{1,2})?$/;

  // ID validation
  if (!pattern.test(inp1)) {
    err1.innerHTML = "Please enter digits for Employee ID";
    return;
  } else {
    err1.innerHTML = '';
  }

  // Name validation
  if (!pattern1.test(inp2)) {
    err2.innerHTML = "Please enter valid name for Employee Name";
    return;
  } else {
    err2.innerHTML = '';
  }

  // Email validation
  if (!pattern2.test(inp3)) {
    err3.innerHTML = "Please enter valid email for Employee Email";
    return;
  } else {
    err3.innerHTML = '';
  }

  // Salary validation
  if (!pattern3.test(inp4)) {
    err4.innerHTML = "Please enter valid salary";
    return;
  } else {
    err4.innerHTML = '';
  }

  // Check for unique employee ID
  var employees = JSON.parse(localStorage.getItem('employees')) || [];
  var existeEmployees = employees.some(employee => employee.id === inp1);

  if (existeEmployees) {
    alert("Employee ID must be unique!");
    return;
  }

  // Add employee to local storage and update table
  employees.push({ id: inp1, name: inp2, email: inp3, salary: inp4 });
  localStorage.setItem('employees', JSON.stringify(employees));
  addEmployee(inp1, inp2, inp3, inp4);

  // Clear input fields
  document.getElementById("emid").value = '';
  document.getElementById("emname").value = '';
  document.getElementById("email").value = '';
  document.getElementById("emsalary").value = '';
}

function addEmployee(id, name, email, salary) {
  var tbody = document.getElementById("tbd");
  var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");

  td1.innerText = id;
  td2.innerText = name;
  td3.innerText = email;
  td4.innerText = salary;

  var btn = document.createElement("button");
  btn.innerText = 'Remove';
  btn.className = 'btn btn-danger';
  btn.style.color = 'white';

  td5.appendChild(btn);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tbody.appendChild(tr);

  // Remove employee on button click
  btn.addEventListener('click', () => {
    tr.remove();
    removeEmpfromlocalStorage(id);
  });
}

function removeEmpfromlocalStorage(id) {
  var employees = JSON.parse(localStorage.getItem('employees')) || [];
  var updateEmployee = employees.filter(employee => employee.id !== id);
  localStorage.setItem('employees', JSON.stringify(updateEmployee));
}

function loadEmpfromlocalStorage() {
  var employees = JSON.parse(localStorage.getItem('employees')) || [];
  employees.forEach(employee => addEmployee(employee.id, employee.name, employee.email, employee.salary));
}

document.getElementById("btn1").addEventListener('click', Employee);
window.onload = function () {
  loadEmpfromlocalStorage();
};