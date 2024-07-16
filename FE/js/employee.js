/**
 * Initiating Page
 * Author: Nghia (15/07/2024)
 */
let employeePage = null;
window.onload = function(){
    employeePage = new EmployeePage();
}

/**
 * Represents the normal Page.
 * @class
 * @description Represents a normal page in the application.
 * @constructor
 * @param {string} pageTitle - The title of the page.
 * Author: Nghia (14/07/2024)
 */
class NonePage {
    pageTitle = "Cukcuk - Quản lý nhân sự";
    constructor(){
        console.log('NonePage construct');
        this.nonePageInitEvents();
    }

    /**
     * Initializes the events for the NonePage class.
     * @method
     * @description Initializes the events for the NonePage class.
     * Author: Nghia (14/07/2024)
     */
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
 * @function
 * @description Closes the sidebar by adding appropriate classes and updating button functionality.
 * Author: Nghia (15/07/2024)
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
 * @function
 * @description Opens the sidebar by removing appropriate classes and updating button functionality.
 * Author: Nghia (15/07/2024)
 */
function openNav(){
    try {
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

/**
 * Retrieves a new employee code from the server and updates the employee code input field.
 * Author: Nghia (15/07/2024)
 */
function getNewEmployeeCode() {
    try {
        let url = "https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode";
        fetch(url)
            .then(response => {
                console.log(response.body);
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.text();
            })
            .then(data => {
                //display data
                console.log(data);
                document.getElementById("employee-code").value = data;
                document.querySelector("#employee-code-loader").classList.add("hidden");
            })
            .catch(error => {
                console.log(error);
            });
            console.log("Form opened");
    } catch (error) {
        console.log(error);
    }
}


/**
 * Highlights the selected row and adds buttons for editing and deleting.
 * @param {Event} event - The click event object.
 * @param {HTMLElement} rowElement - The row element to highlight.
 * @param {string} eid - The employee ID.
 * @param {string} eCode - The employee code.
 * Author: Nghia (15/07/2024)
 */
function highlightRow(event, rowElement, eid, eCode) {
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
    deleteButton.addEventListener('click', () => {
        onDeleteData(eid, eCode);
    });
    groupButton.appendChild(deleteButton);
    lastCell.appendChild(groupButton); 
    console.log("selected", eCode);
}

/**
 * Deletes employee data based on the provided employee ID and employee code.
 * @param {string} eid - The ID of the employee to be deleted.
 * @param {string} eCode - The code of the employee to be deleted.
 * Author: Nghia (15/07/2024)
 */  
function confirmDelete(eid, eCode) {
    var msg = "Bạn có chắc chắn muốn xoá nhân viên có mã nhân viên là: " + eCode;
    console.log(msg);
    employeePage.showDialog("Xác nhận xoá", msg);
    return new Promise(function(resolve, reject) {
        document.getElementById("dlg-submit-btn").addEventListener('click', () => {
            console.log("Confirmed");
            resolve("Deleted");
        });
        document.getElementById("hide-dlg-btn").addEventListener('click', () => {
            console.log("Canceled");
            reject("Canceled");
        });
        document.getElementById("close-dlg-btn").addEventListener('click', () => {
            console.log("Canceled");
            reject("Canceled");
        });
    });
    
}

/**
 * Deletes employee data based on the provided employee ID and employee code.
 * @param {string} eid - The ID of the employee to be deleted.
 * @param {string} eCode - The code of the employee to be deleted.
 * Author: Nghia (15/07/2024)
 */  
function onDeleteData(eid, eCode) {
    confirmDelete(eid, eCode)
        .then((result) => {
            let url = "https://cukcuk.manhnv.net/api/v1/Employees/" + eid;
            fetch(url,
                {
                    method: "DELETE"
                }
            )
                .then(response => {
                    console.log(response.body);
                    if (!response.ok) {
                        throw new Error('Network response error');
                    }
                    return response.text();
                })
                .then(data => {
                    //display data
                    console.log(data);
                    employeePage.loadData();
                })
                .catch(error => {
                    console.log(error);
                });
            console.log(result);
            
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            employeePage.hideDialog();
        });


}



let employees = [];
let currentDataPage = 1;
let pageSize = document.getElementById("numpage-select").value;
let totalRecord = 0;
let totalPage = 0;
let searchName = "";
/**
 * Represents the Employee Page.
 * @class
 * @description Represents the employee page in the application.
 * @extends NonePage
 * @constructor
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
     * @method
     * @description Adds event listeners to the buttons and selects on the employee page.
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

            // document.getElementById("close-dlg-btn").addEventListener('click', this.hideDialog);
            // document.getElementById("hide-dlg-btn").addEventListener('click', this.hideDialog);

            //Button cat
            document.getElementById("form-submit-btn").addEventListener('click', this.submitEmployeeForm); 

            //Select số bản ghi/trang
            document.getElementById("numpage-select").selectedIndex = 0;
            
            //Button reload
            this.btnOnChangeReload();

            //Button tim kiem
            


            console.log("Before", employees);
            //Load data
            this.loadData();
            
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Loads department data from the API and populates the department select form.
     * @method
     * @description Loads department data from the API and populates the department select form.
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
                    option.value =  item["DepartmentId"];
                    depForm.appendChild(option);
                    
                });
                var option = document.createElement("option");
                option.innerHTML = "Tất cả";
                option.value =  "";
                depForm.selectedIndex = 0;
                depForm.appendChild(option);
                // this.loadData();   
            })
            .catch(error => {
                console.log(error);
            });
        
       
    }

    /**
     * Loads data from the API and displays it.
     * @method
     * @description Loads data from the API and displays it.
     * Author: Nghia (14/07/2024)
     */
    loadData() {
        var depForm = document.getElementById("department-form-select");
        console.log(depForm.value);
        const header = new Headers();
        var url = new URL("https://cukcuk.manhnv.net/api/v1/Employees/filter");
        // url.searchParams.append("departmentId", depForm.value);
        url.searchParams.append("pageNumber", currentDataPage);
        url.searchParams.append("pageSize", document.getElementById("numpage-select").value);
        console.log(url);
        console.log(header.toString());
        fetch(url, {
            method: "GET",
            headers: header
            
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.json();
            })
            .then(data => {
                employees = data['Data'];
                totalRecord = data['TotalRecord'];
                totalPage = data['TotalPage'];
                this.displayData(employees);
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Display data to the table
     * @method
     * @description Displays the employee data in the table.
     * Author: Nghia (14/07/2024)
     */
    displayData(pageData) {
        this.clearData();
        document.querySelector("#main-loader").classList.add("hidden");
        var table = document.querySelector(".main-tbl-container-tbl table");
        // table.removeChild("tbody");
        // table.removeChild("thead");
        // var thead = document.querySelector(".main-tbl-container-tbl table thead");
        // var tbody = document.querySelector(".main-tbl-container-tbl table tbody");
        // var pageData = employees.slice(currentDataPage * pageSize, (currentDataPage + 1) * pageSize);;
        const genderMap = {
            0: 'Nam',
            1: 'Nữ',
            2: 'Khác'
        }
        const tableHeadMap = {
            STT: 'STT',
            EmployeeCode: 'Mã nhân viên',
            DepartmentName: 'Đơn vị',
            PositionName: 'Vị trí',
            FullName: 'Họ và tên',
            Gender: 'Giới tính',
            DateOfBirth: 'Ngày sinh',
            Email: 'Email',
            Address: 'Địa chỉ'
        }
        var pageDataLen = pageData.length
        // Assuming `employees` is your fetched data
        if (pageDataLen > 0) {
            document.getElementById("record-counts").innerHTML = totalRecord;
            // Extract column names from the first object's keys
            // const columnNames = Object.keys(employees[0]);
            var thead = document.createElement('thead');
            const columnNames = ['STT', 'EmployeeCode', 'DepartmentName', 'PositionName', 'FullName', 'Gender', 'DateOfBirth', 'Email', 'Address'];
            const tr = document.createElement('tr');
            // Populate the headers
            columnNames.forEach(colName => {
                const th = document.createElement('th');
                th.textContent = tableHeadMap[colName]; // Set the column name as header text
                tr.appendChild(th); // Append the th to the row
            });

            thead.appendChild(tr); // Append the row to the thead
            table.appendChild(thead); // Append the thead to the table
            var tbody = document.createElement('tbody');
            // Iterate over pageData to populate tbody
            var len = columnNames.length;
            pageData.forEach((employee, i) => {
                const row = document.createElement('tr');
                var eid = employee['EmployeeId'];
                columnNames.forEach(colName => {
                    const cell = document.createElement('td');
                    if (colName === 'STT') {
                        cell.textContent = pageSize * (currentDataPage-1) + i + 1; // Set cell text to the row number
                    } else
                    if (colName === 'Gender') {
                        cell.textContent = genderMap[employee[colName]];
                    } else 
                    cell.textContent = employee[colName]; // Set cell text to employee data
                    row.appendChild(cell); // Append the cell to the row
                    
                });
                row.addEventListener('click', (function(index, id) {
                    return function(event) {
                        highlightRow(event, row, eid, employee['EmployeeCode']);
                    };
                })(i));
            
                tbody.appendChild(row); // Append the row to the tbody
            });        
            table.appendChild(tbody);
        }
        
    
    }


    /**
     * Clears the table by removing the table header and table body.
     * Author: Nghia (15/07/2024)
     */
    clearData(){
        try {
            console.log("Clearing the table");
            var table = document.querySelector(".main-tbl-container-tbl table");
            var thead = document.querySelector(".main-tbl-container-tbl table thead");
            var tbody = document.querySelector(".main-tbl-container-tbl table tbody");
            if (tbody) 
                table.removeChild(thead);
            if (thead)
                table.removeChild(tbody);
        } catch (error) {
            console.log(error)
        }
    }
    /**
     * Add click event for "Thêm mới"
     * Author: Nghia (14/07/2024)
     */
    btnAddOnClick(){
        try {
            document.getElementById("popup-form").classList.remove("hidden");
            document.getElementById("to-blur").classList.add("blured");
            document.getElementById("employee-code").focus();
            getNewEmployeeCode();
            console.log("Form opened");
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Open dialog
     * Author: Nghia (14/07/2024)
     */
    showDialog(header, body){
        try {
            document.getElementById("msg-dialog").classList.remove("hidden");
            document.getElementById("to-blur").classList.add("blured");
            document.getElementById("employee-code").focus();
            document.getElementById("dlg-title").innerHTML = header;
            document.getElementById("dlg-body").innerHTML = body;
            getNewEmployeeCode();
            console.log("Form opened");
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Open dialog
     * Author: Nghia (14/07/2024)
     */
    hideDialog(){
        try {
            document.getElementById("msg-dialog").classList.add("hidden");
            document.getElementById("to-blur").classList.remove("blured");
            console.log("Dialog opened");
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
            document.getElementById("to-blur").classList.remove("blured");
            console.log("Dialog closed");
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Submits the employee form.
     * @returns {void}
     * Author: Nghia (15/07/2024)
     */
    submitEmployeeForm(){
        try {

            //Collect data
            var employeeData = 
                {
                    "employeeCode": document.getElementById("employee-code").value,
                    "fullName": document.getElementById("employee-name").value,
                    "dob": document.getElementById("dob").value,
                    // "Gender": document.getElementById("employee-gender").value,
                    "Position": document.getElementById("position").value,
                    "Department": document.getElementById("department").value,
                    "idNumber": document.getElementById("id-number").value,
                    "idNumberDate": document.getElementById("id-issue-date").value,
                    "idNumberPlace": document.getElementById("id-issue-place").value,
                    "address": document.getElementById("address").value,
                    "mobile": document.getElementById("mobile").value,
                    "phone": document.getElementById("phone").value,
                    "email": document.getElementById("email").value,
                    "bankAccount": document.getElementById("bank-account").value,
                    "bankName": document.getElementById("bank-name").value,
                    "bankBranch": document.getElementById("bank-branch").value,     
                };
            


            console.log("submiting", employeeData);
            //Validate data

            //Popup xac nhan
            
           
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Binds event listeners to the relevant elements and handles the corresponding actions.
     * Author: Nghia (15/07/2024)
     */
    btnOnChangeReload() {
        try {
            document.getElementById("numpage-select").addEventListener('change', () => {
                console.log("Changed");
                this.loadData();
            });
            // document.getElementById("department-form-select").addEventListener('change', () => {
            //     console.log("Department Changed");
            //     this.loadData();
            // });
            document.getElementById("refresh-btn").addEventListener('click', () => {
                console.log("Reloaded");
                this.loadData();
            });
            document.getElementById("prev-page-btn").addEventListener('click', () => {
                if (currentDataPage > 1) {
                    currentDataPage--;
                    this.loadData();
                } else {
                    console.log("Currently in Page 1");
                }
            });
            document.getElementById("next-page-btn").addEventListener('click', () => {
                if (currentDataPage < totalPage) {
                    currentDataPage++;
                    this.loadData();
                } else {
                    console.log("Currently in last page");
                }
                console.log(currentDataPage, "/", totalPage);
            });
        } catch (error) {
            console.log(error);
        }
    }

    searchReload() {
        try {
            document.getElementById("search-input").addEventListener('click', () => {
                console.log("Search");
                this.loadData();
            });
        } catch (error) {
            console.log(error);
        }
    }

    
    

}