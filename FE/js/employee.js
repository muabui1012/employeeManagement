window.onload = function(){
    new EmployeePage();
}

/**
 * Represents the normal Page.
 * @class
 * Author: Nghia (14/07/2024)
 */
class NonePage {
    pageTitle = "Cukcuk - Quản lý nhân sự";
    constructor(){
        console.log('NonePage construct');
        this.nonePageInitEvents();
    }

    nonePageInitEvents(){
        try {
            console.log('NonePage init');
            //Button thu gon
            document.getElementById("close-nav-btn").onclick = closeNav;
        } catch (error) {
            console.log(error);
        }
    }


}

/**
 * Closes the sidebar by adding appropriate classes and updating button functionality.
 */
function closeNav(){
    try {
        nav = document.getElementsByClassName("sidebar");
        nav[0].classList.add("mini-sidebar");
        item = document.querySelectorAll(".sidebar-item");
        for (i = 0; i < item.length; i++) {
            item[i].classList.remove("sidebar-item"); 
            item[i].classList.add("sidebar-item-mini");
        }
        sidebar_btn = document.querySelectorAll(".sidebar-btn");
        for (i = 0; i < sidebar_btn.length; i++) {
            // sidebar_btn[i].classList.remove("sidebar-btn");
            sidebar_btn[i].classList.add("sidebar-btn-mini");
        }
        btn_text = document.querySelectorAll(".sidebar-btn-text");
        for (i = 0; i < btn_text.length; i++) {
            btn_text[i].classList.add("hidden");
        }
        footer_img = document.querySelector(".sidebar-footer button img");
        footer_img.src  = "assets\\icon\\btn-next-page.svg";
        footer_btn = document.querySelector(".sidebar-footer button");
        footer_btn.onclick = openNav;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Opens the sidebar by removing appropriate classes and updating button functionality.
 */
function openNav(){
    try {
        console.log("jfkafjakl");
        nav = document.getElementsByClassName("sidebar");
        nav[0].classList.remove("mini-sidebar");
        item = document.querySelectorAll(".sidebar-item-mini");
        for (i = 0; i < item.length; i++) {
            item[i].classList.add("sidebar-item"); 
            item[i].classList.remove("sidebar-item-mini");
        }
        sidebar_btn = document.querySelectorAll(".sidebar-btn");
        for (i = 0; i < sidebar_btn.length; i++) {
            // sidebar_btn[i].classList.remove("sidebar-btn");
            sidebar_btn[i].classList.remove("sidebar-btn-mini");
        }
        btn_text = document.querySelectorAll(".sidebar-btn-text");
        for (i = 0; i < btn_text.length; i++) {
            btn_text[i].classList.remove("hidden");
        }
        footer_img = document.querySelector(".sidebar-footer button img");
        footer_img.src  = "assets\\icon\\btn-prev-page.svg";
        footer_btn = document.querySelector(".sidebar-footer button");
        footer_btn.onclick = closeNav;
    } catch(error) {
        console.log(error);
    
    }
}

function highlightRow(event, rowElement) {
    // Your logic here
    console.log("Row element clicked:", rowElement.lastChild);
    selectedList = document.querySelectorAll(".selected-row");
    selectedList.forEach((item) => {
        item.classList.remove("selected-row");
        var itemLastCell = item.lastChild;
        console.log(itemLastCell);
        itemLastCell.removeChild(itemLastCell.lastChild);
    });
    rowElement.classList.add("selected-row");
    var lastCell = rowElement.lastChild;
    var groupButton = document.createElement("span");
    var editButton = document.createElement("button");
    var editIcon = document.createElement("img");
    editIcon.classList.add("smc-img");
    editIcon.src = "assets\\icon\\pencil.png";
    editButton.appendChild(editIcon);
    editButton.classList.add("grey-button");
    editButton.classList.add("small-icon-button");
    groupButton.appendChild(editButton);
    var deleteButton = document.createElement("button");
    var deleteIcon = document.createElement("img");
    deleteIcon.classList.add("smc-img");
    deleteIcon.src = "assets\\icon\\delete-48.png";
    deleteButton.appendChild(deleteIcon);
    deleteButton.classList.add("grey-button");
    deleteButton.classList.add("small-icon-button");
    groupButton.appendChild(deleteButton);
    lastCell.appendChild(groupButton); 
}


let employees = [];
let currentDataPage = 0;
/**
 * Represents the Employee Page.
 * @class
 * Author: Nghia (14/07/2024)
 */
class EmployeePage extends NonePage{
    pageTitle = "Danh mục nhân viên | Nhân viên | Cukcuk";
    
    
    /**
     * Construct employee page
     * @constructor
     */
    constructor(){
        super();
        this.initEvents();
    }
    
    

    /**
     * Add cac event listener
     * Author: Nghia (14/07/2024)
     */
    initEvents(){
        try {
            //Buton chi nhanh
            document.getElementById("department-form-select").addEventListener('change', this.loadData);

            //Button them moi
            document.getElementById("add-new-btn").addEventListener('click', this.btnAddOnClick);
            
            //Dong form
            document.getElementById("close-form-btn").addEventListener('click', this.closeForm);
            document.getElementById("hide-form-btn").addEventListener('click', this.closeForm);

            //Button cat
            document.getElementById("form-submit-btn").addEventListener('click', this.submitEmployeeForm); 

            //Select số bản ghi/trang
            document.getElementById("numpage-select").selectedIndex = 3;
            
            //Button reload

            //Button tim kiem



            console.log("Before", employees);
            //Load data
            this.loadDepartmentData();
            
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Loads department data from the API and populates the department select form.
     * Author: Nghia (14/07/2024) 
    */
    loadDepartmentData(){
        let url = "https://cukcuk.manhnv.net/api/v1/Departments";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.json();
            })
            .then(data => {
                //display data
                // console.log(data[0]);
                var depForm = document.getElementById("department-form-select");
                data.forEach((item) => {
                    var option = document.createElement("option");
                    option.innerHTML = item["DepartmentName"];
                    option.value =  item["DepartmentCode"];
                    depForm.appendChild(option);
                    
                });
                depForm.selectedIndex = 0;
                this.loadData();   
            })
            .catch(error => {
                console.log(error);
            });
        
       
    }

    /**
     * Loads data from the API and displays it.
     * Author: Nghia (14/07/2024)
     */
    loadData() {
        var depForm = document.getElementById("department-form-select");
        console.log(depForm.value);
        let url = "https://cukcuk.manhnv.net/api/v1/Employees";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.json();
            })
            .then(data => {
                employees = data;
                this.displayData();
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Display data to the table
     * Author: Nghia (14/07/2024)
     */
    displayData() {
        var pageSize = document.getElementById("numpage-select").value;
        var table = document.querySelector(".main-tbl-container-tbl table");
        var thead = document.querySelector(".main-tbl-container-tbl table thead");
        var tbody = document.querySelector(".main-tbl-container-tbl table tbody");
        var pageData = employees.slice(currentDataPage * pageSize, (currentDataPage + 1) * pageSize);
        const genderMap = {
            0: 'Nữ',
            1: 'Nam',
            2: 'Khác'
        }
        const tableHeadMap = {
            STT: 'STT',
            EmployeeCode: 'Mã nhân viên',
            FullName: 'Họ và tên',
            Gender: 'Giới tính',
            DateOfBirth: 'Ngày sinh',
            Email: 'Email',
            Address: 'Địa chỉ'
        }

        // Assuming `employees` is your fetched data
        if (employees.length > 0) {
            // Extract column names from the first object's keys
            // const columnNames = Object.keys(employees[0]);
            const columnNames = ['STT', 'EmployeeCode', 'FullName', 'Gender', 'DateOfBirth', 'Email', 'Address'];
            const tr = document.createElement('tr');
            // Populate the headers
            columnNames.forEach(colName => {
                const th = document.createElement('th');
                th.textContent = tableHeadMap[colName]; // Set the column name as header text
                tr.appendChild(th); // Append the th to the row
            });

            thead.appendChild(tr); // Append the row to the thead
            table.appendChild(thead); // Append the thead to the table
            // Clear existing rows in tbody
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            // Iterate over pageData to populate tbody
            var len = columnNames.length;
            pageData.forEach((employee, i) => {
                const row = document.createElement('tr');
                columnNames.forEach(colName => {
                    const cell = document.createElement('td');
                    if (colName === 'STT') {
                        cell.textContent = i + 1; // Set cell text to the row number
                    } else
                    if (colName === 'Gender') {
                        cell.textContent = genderMap[employee[colName]];
                    } else 
                    cell.textContent = employee[colName]; // Set cell text to employee data
                    row.appendChild(cell); // Append the cell to the row
                    
                });
                row.addEventListener('click', (function(index) {
                    return function(event) {
                        highlightRow(event, row);
                    };
                })(i));
            
                tbody.appendChild(row); // Append the row to the tbody
            });        
        }
        
    
    }

    /**
     * Add click event for "Thêm mới"
     * Author: Nghia (14/07/2024)
     */
    btnAddOnClick(){
        try {
            document.getElementById("popup-form").classList.remove("hidden");
            console.log("Form opened");
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Closes the form by adding the "hidden" class to the "popup-form" element.
     * Author: Nghia (14/07/2024)
    */
    closeForm(){
        try {
            document.getElementById("popup-form").classList.add("hidden");
            console.log("Form closed");
        } catch (error) {
            console.log(error);
        }
    }

    submitEmployeeForm(){
        try {
            console.log("submiting");
            //Validate data

            //Popup xac nhan
            
           
        } catch (error) {
            console.log(error);
        }
    }



}