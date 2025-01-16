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

// Global variables
let employees = [];
let currentDataPage = 1;
let pageSize = document.getElementById("numpage-select").value;
let totalRecord = 0;
let totalPage = 0;
let searchName = "";
const baseURL = "http://localhost:5223/api/v1";
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

            //Button cat
            document.getElementById("form-submit-btn").addEventListener('click', this.submitEmployeeForm); 

            //Select số bản ghi/trang
            document.getElementById("numpage-select").selectedIndex = 0;
            
            document.getElementById("numpage-select").addEventListener('change', () => {
                pageSize = document.getElementById("numpage-select").value;
                currentDataPage = 1;
                this.loadData();    
            });

            //Button excel  
            document.getElementById("excel-btn").addEventListener('click', this.btnExcelOnClick);

            //Button thêm/sửa/xoá vị trí
            this.loadPositionDataToPositionForm();
            // document.getElementById("position").addEventListener('change', () => {
            //     const selectedValue = document.getElementById("position").value;
            //     if (selectedValue === "add-position") {
            //         this.btnCrudPositionOnClick();
            //     }
            // });
            document.getElementById("position-crud-btn").addEventListener('click', (e) => {
                console.log("Pos Clicked");
                e.preventDefault();
                employeePage.btnCrudPositionOnClick();
            });

            this.loadDeparmentDataToDepartmentForm();
            document.getElementById("department-crud-btn").addEventListener('click', (e) => {
                console.log("Dep Clicked");
                e.preventDefault();
                employeePage.btnCrudDepartmentOnClick();
            });

            //Button reload
            this.btnOnChangeReload();

    
            document.getElementById("close-simple-dlg-btn").addEventListener('click', () => {
                document.getElementById("msg-dialog-simple").classList.add("hidden");
                // document.getElementById("to-blur").classList.remove("blured");
                document.getElementById("popup-form").classList.remove("blured");
                var dlgBody = document.getElementById("dlgs-body");
                dlgBody.innerHTML = "";
                removeFormBlur();
            });
            document.getElementById("close-simple-dlg-btn-1").addEventListener('click', () => {
                document.getElementById("msg-dialog-simple").classList.add("hidden");
                // document.getElementById("to-blur").classList.remove("blured");
                document.getElementById("popup-form").classList.remove("blured");
                var dlgBody = document.getElementById("dlgs-body");
                dlgBody.innerHTML = "";
                removeFormBlur();
            });

            //Tim kiem
            // document.getElementById("search-input-icon").addEventListener('click', this.onSearch);
            // document.getElementById("search-input").addEventListener('cdocument.getElementById("search-input").addEventListener('keyup', this.onSearch);hange', this.onSearch);
            document.getElementById("search-input").addEventListener('keyup', function(e) {
                // if (e.key === "Enter") {
                    employeePage.onSearch(e);
                // }
            });
            document.getElementById("search-input").addEventListener('keydown', function(e) {
                // console.log(e.key);
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            });
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
        let url = baseURL + "/departments";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        employeePage.showSimpleDialog("Lỗi", "Không tìm thấy dữ liệu phòng ban");
                        throw new Error('Không tìm thấy dữ liệu phòng ban');
                    }
                    showSimpleDialog("Lỗi", "Đã có lỗi xảy ra");
                    throw new Error('Đã có lỗi xảy ra');
                }
                return response.json();
            })
            .then(data => {
                //display data
                // console.log("loaded dep");
                // console.log(data);
                var depForm = document.getElementById("department");
                if (document.querySelectorAll(".loaded-department") != null) {
                    try {
                        document.querySelectorAll("#department > .loaded-department").forEach((item) => {
                            if (depForm.contains(item)) depForm.removeChild(item);
                        });
                    } catch(e) {
                        console.log(e);
                    }
                }
                data.forEach((item) => {
                    var option = document.createElement("option");
                    option.innerHTML = item["DepartmentName"];
                    option.value =  item["DepartmentId"];
                    option.classList.add("loaded-department");
                    depForm.appendChild(option);
                    
                });
                // var option = document.createElement("option");
                // option.innerHTML = "Tất cả";
                // option.value =  "";
                
                // depForm.appendChild(option);
                // this.loadData();
                document.querySelector("#department-loader").classList.add("hidden");
                try {
                    var editForm = document.querySelector("#edit-form");
                    if (editForm !== null) {
                        var eDepForm = editForm.querySelector("#edit-form #department");
                        try {
                            editForm.querySelectorAll(".loaded-department").forEach((item) => {
                                if (eDepForm.contains(item)) eDepForm.removeChild(item);
                            });
                        } catch(e1) {
                            console.log(e1);
                        }
                        data.forEach((item) => {
                            var option = document.createElement("option");
                            option.innerHTML = item["DepartmentName"];
                            option.value =  item["DepartmentId"];
                            option.classList.add("loaded-department");
                            eDepForm.appendChild(option);
                            
                        });
                        editForm.querySelector("#department-loader").classList.add("hidden");
                    }
                } catch (e) {
                    console.log(e);
                }   
            })
            .catch(error => {
                console.log(error);
            });
        
       
    }

    /**
     * Chưa hoạt động được vì API trên CukCuk không có bảng position
     * Loads position data from the API and populates the position select form.
     * @method
     * @description Loads position data from the API and populates the position select form.
     * Author: Nghia (14/07/2024) 
    */
    loadPositionData(){
        let url = baseURL + "/positions";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        employeePage.showSimpleDialog("Lỗi", "Không tìm thấy dữ liệu vị trí");
                        throw new Error('Không tìm thấy dữ liệu vị trí');
                    }
                    showSimpleDialog("Lỗi", "Đã có lỗi xảy ra");
                    
                    throw new Error('Network response error');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var posForm = document.getElementById("position");
                if (document.querySelectorAll(".loaded-position") != null) {
                    try {
                        document.querySelectorAll("#position > .loaded-position").forEach((item) => {
                            if (posForm.contains(item)) posForm.removeChild(item);
                        });
                    } catch(e) {
                        console.log(e);
                    }
                }
                data.forEach((item) => {
                    var option = document.createElement("option");
                    option.innerHTML = item["PositionName"];
                    option.value =  item["PositionId"];
                    option.classList.add("loaded-position");
                    posForm.appendChild(option);
                    
                });
                
                document.querySelector("#position-loader").classList.add("hidden");
                try {
                    var editForm = document.querySelector("#edit-form");
                    if (editForm !== null) {
                        var ePosForm = editForm.querySelector("#edit-form #position");
                        try {
                            editForm.querySelectorAll(".loaded-position").forEach((item) => {
                                if (ePosForm.contains(item)) ePosForm.removeChild(item);
                            });
                        } catch(e1) {
                            console.log(e1);
                        }
                        data.forEach((item) => {
                            var option = document.createElement("option");
                            option.innerHTML = item["PositionName"];
                            option.value =  item["PositionId"];
                            option.classList.add("loaded-position");
                            ePosForm.appendChild(option);
                            
                        });
                        editForm.querySelector("#position-loader").classList.add("hidden");
                    }
                } catch (e) {
                    console.log(e);
                }    
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
        this.loadDepartmentData();
        this.loadPositionData();
        var depForm = document.getElementById("department-form-select");
        console.log(depForm.value);
        const header = new Headers({
        });
        var url = new URL(baseURL + "/employees/filter");
        url.searchParams.append("PageNumber", currentDataPage);
        url.searchParams.append("PageSize", document.getElementById("numpage-select").value);
        console.log("page:", currentDataPage, document.getElementById("numpage-select").value);
        const requestBody = {
            PageNumber: parseInt(currentDataPage),
            PageSize: parseInt(document.getElementById("numpage-select").value)
        }

        fetch(url, {
            method: "GET",
            head: header
            
            
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        employeePage.showSimpleDialog("Lỗi", "Không tìm thấy dữ liệu nhân viên");
                        throw new Error('Không tìm thấy dữ liệu nhân viên');
                    }
                    showSimpleDialog("Lỗi", "Đã có lỗi xảy ra, không thể tải dữ liệu");
                    throw new Error('Đã có lỗi xảy ra');
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
            })
            .finally(() => {

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

        const tableColSize = ["56px", "150px", "150px", "150px", "150px", "150px", "150px", "150px", "150px"];

        var pageDataLen = pageData.length
        // Assuming `employees` is your fetched data
        if (pageDataLen > 0) {
            document.getElementById("record-counts").innerHTML = totalRecord;
            // Extract column names from the first object's keys
            // const columnNames = Object.keys(employees[0]);
            var thead = document.querySelector("thead");
            const columnNames = ['STT', 'EmployeeCode', 'DepartmentName', 'PositionName', 'FullName', 'Gender', 'DateOfBirth', 'Email', 'Address'];
            // const tr = document.createElement('tr');
            // Populate the headers
            // var i = 0;
            // columnNames.forEach(colName => {
            //     const th = document.createElement('th');
            //     th.style.width = tableColSize[i]; // Set the width of the th element
            //     i++;
            //     th.textContent = tableHeadMap[colName]; // Set the column name as header text
            //     tr.appendChild(th); // Append the th to the row
            // });

            // thead.appendChild(tr); // Append the row to the thead
            // table.appendChild(thead); // Append the thead to the table
            var tbody = document.querySelector("tbody");
            // Iterate over pageData to populate tbody
            var len = columnNames.length;
           
            pageData.forEach((employee, i) => {
                const row = document.createElement('tr');
                var eid = employee['EmployeeId'];
                var iCol = 0;
                columnNames.forEach(colName => {
                    const cell = document.createElement('p');
                    if (colName === 'STT') {
                        cell.textContent = pageSize * (currentDataPage - 1) + i + 1; // Set cell text to the row number
                    } else
                    if (colName === 'Gender') {
                        cell.textContent = genderMap[employee[colName]];
                    } else 
                    if (colName === 'DateOfBirth') {
                        var dateDOB = new Date(employee[colName])
                        cell.textContent = getFormattedDate(dateDOB);
                    }else 
                    cell.textContent = employee[colName]; // Set cell text to employee data
                    // cell.style.width = tableColSize[iCol]; // Change the width of the td element
                    // console.log("size, ",  tableColSize[iCol]);
                    iCol++;
                    var td = document.createElement('td');
                    td.appendChild(cell);
                    row.appendChild(td); // Append the cell to the row
                    
                });
                row.addEventListener('click', (function(index, id) {
                    return function(event) {
                        highlightRow(event, row, eid, employee['EmployeeCode'], employee );
                        document.getElementById("position-crud-btn").addEventListener('click', (e) => {
                            console.log("Pos Clicked");
                            e.preventDefault();
                            employeePage.btnCrudPositionOnClick();
                        });
                        document.getElementById("department-crud-btn").addEventListener('click', (e) => {
                            console.log("Dep Clicked");
                            e.preventDefault();
                            employeePage.btnCrudDepartmentOnClick();
                        });
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
            var table = document.querySelector(".main-tbl-container-tbl table");
            var thead = document.querySelector(".main-tbl-container-tbl table thead");
            var tbody = document.querySelector(".main-tbl-container-tbl table tbody");
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    btnExcelOnClick(){
        try {
            var url = baseURL + "/employees/exportExcel";
            fetch(url)
                .then(response => {
                    if (!response.ok) {

                        employeePage.showSimpleDialog("Lỗi", "Không thể tải file Excel");
                        
                    }
                    return response.blob();
                })
                .then(data => {
                    //display data
                    console.log(data);
                    var url = window.URL.createObjectURL(data);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = 'employees.xlsx';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
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
            // employeePage.loadDepartmentData();
            // employeePage.loadPositionData();
            console.log("Form opened");
        } catch (error) {
            console.log(error);
        }
    }


    loadPositionDataToPositionForm(){
        document.getElementById("submit-position-crud").addEventListener('click', (e) => {
            employeePage.submitPosition(e);
        });
        var tbody = document.querySelector("#position-tbl-tbody");

        try {
            tbody.innerHTML = "";
        } catch (error) {   
            console.log(error);
        }
            let url = baseURL + "/positions";
            
            fetch(url,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
                .then(response => {
                    console.log("-------",response.status);
                    console.log(response.body.errors);
                    if (!response.ok) {
                        console.log(response.body.errors);
                        throw new Error(response.body.errors);
                    }
                    return response.text();
                })
                .then(positions => {
                    console.log(positions);
                    var positionsData = JSON.parse(positions);
                    console.log(positionsData);
                    positionsData.forEach((position) => {
                        var row = document.createElement("tr");
                        var cell = document.createElement("td");
                        cell.innerHTML = position['PositionName'];
                        
                        var groupButton = document.createElement("span");
                        groupButton.id = "crud-position-group-btn";
                        var editButton = document.createElement("button");
                        editButton.id = "edit-position-btn";
                        var editIcon = document.createElement("img");
                        editIcon.classList.add("smc-img");
                        editIcon.src = "assets\\icon\\pencil.png";
                        editButton.appendChild(editIcon);
                        editButton.classList.add("grey-button");
                        editButton.classList.add("small-icon-button");
                        
                        var deleteButton = document.createElement("button");
                        var deleteIcon = document.createElement("img");
                        deleteIcon.classList.add("smc-img");
                        deleteIcon.src = "assets\\icon\\delete-48.png";
                        deleteButton.appendChild(deleteIcon);
                        deleteButton.classList.add("grey-button");
                        deleteButton.classList.add("small-icon-button");
                        
                        deleteButton.addEventListener('click', () => {
                            console.log("Delete position", position);
                            onDeletePosition(position);
                        });

                        editButton.addEventListener('click', () => {
                            console.log("Edit position", position);
                            onEditPosition(position);
                        });
                        groupButton.appendChild(editButton);
                        groupButton.appendChild(deleteButton);
                        var cell2 = document.createElement("td");
                        cell2.appendChild(groupButton);

                        row.appendChild(cell);
                        row.appendChild(cell2);
                        tbody.appendChild(row);
                    });

                })
                .catch(error => {
                    console.log(error);
                    employeePage.showSimpleDialog("Lỗi", error);
                });
    }

    submitPosition(e) {
        e.preventDefault();
        console.log(
          "Submit position",
          document.getElementById("new-position-name").value
        );
        var positionData = {
          PositionName: document.getElementById("new-position-name").value,
        };
        let url = baseURL + "/positions";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(positionData),
        })
          .then((response) => {
            console.log("-------", response.status);
            console.log(response.body.errors);
            if (!response.ok && response.status !== 201) {
              console.log(response.body.errors);
              employeePage.showSimpleDialog("Lỗi", "Thêm không thành công");
              throw new Error(response.body.errors);
            }
            return response.text();
          })
          .then((data) => {
            //display data
            console.log(data);
            employeePage.loadData();
            employeePage.loadPositionDataToPositionForm();
            employeePage.showSimpleDialog(
              "Thành công",
              "Bạn đã thêm thành công vị trí: " + positionData["PositionName"]
            );
            document
              .getElementById("position-crud-dialog")
              .classList.add("hidden");
          })
          .catch((error) => {
            console.log(error);
            employeePage.showSimpleDialog("Lỗi", error);
          });
    }

    /**
     * Open crud dialog for position
     */
    btnCrudPositionOnClick(){
        try {
            document.getElementById("position-crud-dialog").classList.remove("hidden");
            document.getElementById("close-position-crud-dialog-btn").addEventListener('click', () => {
                document.getElementById("position-crud-dialog").classList.add("hidden");
            });

        } catch (error) {
            console.log(error);
        }
    }

    loadDeparmentDataToDepartmentForm(){
        document.getElementById("submit-department-crud").addEventListener('click', (e) => {
            employeePage.submitDepartment(e);
        });
        var tbody = document.querySelector("#department-tbl-tbody");
        
        try {
            tbody.innerHTML = "";
        } catch (error) {   
            console.log(error);
        }
    
        let url = baseURL + "/departments";

        fetch(url,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        .then(response => {
            console.log("-------", response.status);
            console.log(response.body.errors);
            if (!response.ok) {
              console.log(response.body.errors);
              throw new Error(response.body.errors);
            }
            return response.text();
        })
        .then(departments => {
            console.log(departments);
            var departmentsData = JSON.parse(departments);
            console.log(departmentsData);
            departmentsData.forEach((department) => {
                var row = document.createElement("tr");
                var cell = document.createElement("td");
                cell.innerHTML = department['DepartmentName'];
                
                var groupButton = document.createElement("span");
                groupButton.id = "crud-department-group-btn";
                var editButton = document.createElement("button");
                editButton.id = "edit-department-btn";
                var editIcon = document.createElement("img");
                editIcon.classList.add("smc-img");
                editIcon.src = "assets\\icon\\pencil.png";
                editButton.appendChild(editIcon);
                editButton.classList.add("grey-button");
                editButton.classList.add("small-icon-button");
                
                var deleteButton = document.createElement("button");
                var deleteIcon = document.createElement("img");
                deleteIcon.classList.add("smc-img");
                deleteIcon.src = "assets\\icon\\delete-48.png";
                deleteButton.appendChild(deleteIcon);
                deleteButton.classList.add("grey-button");
                deleteButton.classList.add("small-icon-button");
                
                deleteButton.addEventListener('click', () => {
                    console.log("Delete department", department);
                    onDeleteDepartment(department);
                });

                editButton.addEventListener('click', () => {
                    console.log("Edit department", department);
                    onEditDepartment(department);
                });
                groupButton.appendChild(editButton);
                groupButton.appendChild(deleteButton);
                var cell2 = document.createElement("td");
                cell2.appendChild(groupButton);

                row.appendChild(cell);
                row.appendChild(cell2);
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.log(error);
            employeePage.showSimpleDialog("Lỗi", error);
        });
    }



    submitDepartment(e) {
        e.preventDefault();
        console.log("Subitting department");
        var departmentData = {
          DepartmentName: document.getElementById("new-department-name").value,
        };
        let url = baseURL + "/departments";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(departmentData)
        })
        .then((response) => {
            console.log("-------", response.status);
            console.log(response.body.errors);
            if (!response.ok  && response.status !== 201) {
                console.log(response.body.errors);
                employeePage.showSimpleDialog("Lỗi", "Thêm không thành công");
                throw new Error("Thêm không thành công");
            }
            return response.text();
        })
        .then((data) => {
            //display data
            console.log(data);
            employeePage.loadData();
            employeePage.loadDeparmentDataToDepartmentForm();
            employeePage.showSimpleDialog(
                "Thành công",
                "Bạn đã thêm thành công phòng ban: " + departmentData["DepartmentName"]
            );
            document
                .getElementById("department-crud-dialog")
                .classList.add("hidden");
        })
        .catch((error) => {
            console.log(error);
            employeePage.showSimpleDialog("Lỗi", error);
        });
    }

    /**
     * Open crud dialog for department
     */
    btnCrudDepartmentOnClick(){
        try {
            document.getElementById("department-crud-dialog").classList.remove("hidden");
            document.getElementById("close-department-crud-dialog-btn").addEventListener('click', () => {
                document.getElementById("department-crud-dialog").classList.add("hidden");
            });

        } catch (error) {
            console.log(error);
        }

    }


    /**
     * Add click event for "Thêm mới"
     * Author: Nghia (14/07/2024)
     */
    openForm(){
        try {
            document.getElementById("popup-form").classList.remove("hidden");
            document.getElementById("to-blur").classList.add("blured");
            document.getElementById("employee-code").focus();
            

            // employeePage.loadDepartmentData();
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
            document.getElementById("msg-dlg-title").innerHTML = header;
            document.getElementById("msg-dlg-body").innerHTML = body;
            getNewEmployeeCode();
            console.log("Suure", body);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Open dialog
     * Author: Nghia (14/07/2024)
     */
    showSimpleDialog(header, body){
        try {
            document.getElementById("msg-dialog-simple").classList.remove("hidden");
            document.getElementById("to-blur").classList.add("blured");
            document.getElementById("popup-form").classList.add("blured");
            document.getElementById("dlgs-title").innerHTML = header;
            var dlgBody = document.getElementById("dlg-main-id");
            var dlgBodyContent = document.querySelectorAll(".dlgs-node-p");
            dlgBodyContent.forEach((item) => {
                dlgBody.removeChild(item);
            });
            console.log(dlgBodyContent);
            if (Array.isArray(body)) {
                
                body.forEach((item) => {
                    var p = document.createElement("p");
                    p.classList.add("dlgs-node-p");
                    p.innerHTML = item;
                    dlgBody.appendChild(p);
                });    
            } else {
                document.getElementById("dlgs-body").innerHTML = body;
                // getNewEmployeeCode();
            }
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
            console.log("Dialog closed");
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
                    "EmployeeCode": document.getElementById("employee-code").value,
                    "FullName": document.getElementById("employee-name").value,
                    
                    "PositionId": document.getElementById("position").value,
                    "DepartmentId": document.getElementById("department").value,
                    "NationalityId": document.getElementById("id-number").value,
                    
                    "NationalityIdPlace": document.getElementById("id-issue-place").value,
                    "Address": document.getElementById("address").value,
                    "MobilePhoneNumber": document.getElementById("mobile").value,
                    "TelephonePhoneNumber": document.getElementById("phone").value,
                    "Email": document.getElementById("email").value,
                    "BankAccount": document.getElementById("bank-account").value,
                    "BankName": document.getElementById("bank-name").value,
                    "BankBranch": document.getElementById("bank-branch").value,     
                };
            if (document.getElementById("male").checked) {
                employeeData["Gender"] = 0;
            } else if (document.getElementById("female").checked) {
                employeeData["Gender"] = 1;
            } else {
                employeeData["Gender"] = 2;
            }
            
            var dob = document.getElementById("dob").value;
            if (dob) {
                employeeData["DateOfBirth"] = dob;
            }
            var iddate = document.getElementById("id-issue-date").value;

            if (iddate) {
                employeeData["NationalityIdDate"] = iddate;
            }

            console.log("submiting", employeeData);
            console.log("checking", employeeData['fullName']);
            //Validate data
            var isValidated = true;
            var msg = [];
            if (employeeData['EmployeeCode'] === "" || employeeData['EmployeeCode'] === null) {
                console.log("Trống");
                isValidated = false;
                msg.push("Mã nhân viên không được để trống\n");
                 
            }
            if (employeeData['FullName'] === "" || employeeData['Fullname'] === null) {
                console.log("Trống");
                isValidated = false;
                msg.push("Họ và tên không được để trống\n");
            }
            if (employeeData['NationalityId'] === "" || employeeData['NationalityId'] === null) {
                isValidated = false;
                msg.push("Số CMTND không được để trống\n");
            }
            if (employeeData['MobilePhoneNumber'] === "" || employeeData['MobilePhoneNumber'] === null) {
                isValidated = false;
                msg.push("Số ĐT Di động không được để trống\n");
            } else {
                const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
                const isValidPhone = phoneRegex.test(employeeData['MobilePhoneNumber']);
                if (!isValidPhone) {
                    isValidated = false;
                    msg.push("Số ĐT Di động không hợp lệ\n");
                }
            }
            if (employeeData['Email'] === "" || employeeData['Email'] === null) {
                isValidated = false;
                msg.push("Email không được để trống\n");
            }
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const isValidEmail = regex.test(employeeData['Email']);
            if (!isValidEmail) {
                isValidated = false;
                msg.push("Email không hợp lệ\n");
            }

            const inputDate = new Date(employeeData['DateOfBirth']); 
            inputDate.setHours(0, 0, 0, 0); // Set time to start of the day

            console.log("Date", inputDate);

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to start of the day

            if (inputDate > today) {
                isValidated = false;
                msg.push("Ngày sinh không được vượt quá hiện tại\n");
            } 
            
            const inputDate1 = new Date(employeeData['NationalityIdDate']); // Example: employeeData['dateOfBirth']
            inputDate1.setHours(0, 0, 0, 0); // Set time to start of the day

            if (inputDate1 > today) {
                isValidated = false;
                msg.push("Ngày cấp CMTND không được vượt quá hiện tại\n");
            } 

            if (employeeData['PositionId'] === "" || employeeData['PositionId'] === null) {
                isValidated = false;
                msg.push("Nếu chưa có vị trí vui lòng chọn vị trí là \"Không\"\n");
            }

            if (employeeData['DepartmentId'] === "" || employeeData['DepartmentId'] === null) {
                isValidated = false;
                msg.push("Nếu chưa có phòng ban vui lòng chọn phòng ban là \"Không\"\n");
            }

            if (isValidated) {
                //Send data to server
                let url = baseURL + "/employees";
                fetch(url,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(employeeData)
                    }
                )
                    .then(response => {
                        console.log("-------",response.status);
                        console.log(response.body);
                        if (!response.ok  && response.status !== 201) {
                            if (response.status === 409) {
                                employeePage.showSimpleDialog("Lỗi", "Mã nhân viên đã tồn tại");
                               throw new Error("Mã nhân viên đã tồn tại");
                            }

                            if (response.status === 400) {
                                employeePage.showSimpleDialog("Lỗi", "Dữ liệu không hợp lệ");
                                throw new Error("Dữ liệu không hợp lệ");
                            }

                            if (response.status === 500) {
                                employeePage.showSimpleDialog("Lỗi", "Lỗi server");
                                throw new Error("Lỗi server");
                            }

                            employeePage.showSimpleDialog("Lỗi", "Lỗi server");
                            throw new Error('Đã có lỗi xảy ra');

                        }
                        return response.text();
                    })
                    .then(data => {
                        //display data

                        console.log(data);
                        employeePage.loadData();
                        employeePage.showSimpleDialog("Thành công", "Bạn đã thêm thành công nhân viên: " + employeeData['EmployeeCode']);
                        clearForm();
                        employeePage.closeForm();
                    })
                    .catch(error => {
                        console.log(error);
                        employeePage.showSimpleDialog("Lỗi", error);
                    });
               
                // 
                
            } else {
            
                console.log("Lỗi", msg);
                employeePage.showSimpleDialog("Lỗi", msg);
                msg = [];
            }
            
           
        } catch (error) {
            console.log(error);
            employeePage.showSimpleDialog("Lỗi", "Thêm không thành công do lỗi mạng");
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

    onSearch(ev) {
        try {
            searchName = document.getElementById("search-input").value;
            // console.log(employees);
            var filter = searchName.toUpperCase;
            var searchResults = [];
            employees.forEach((filter) => {
                if (filter['FullName'].toUpperCase().indexOf(searchName) > -1 || filter['EmployeeCode'].toUpperCase().indexOf(searchName) > -1) {
                    searchResults.push(filter);
                }
            });
            employeePage.displayData(searchResults);
            // this.loadData();
        } catch (error) {
            console.log(error);
        }
    }

    
    

}




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




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
        let url = baseURL + "/employees/newEmployeeCode";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.text();
            })
            .then(data => {
                //display data
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
function highlightRow(event, rowElement, eid, eCode, currentEmployee) {
    // Your logic here
    selectedList = document.querySelectorAll(".selected-row");
    selectedList.forEach((item) => {
        item.classList.remove("selected-row");
        var itemLastCell = item.lastChild;
        itemLastCell.removeChild(itemLastCell.lastChild);
    });
    rowElement.classList.add("selected-row");
    var lastCell = rowElement.lastChild;
    var groupButton = document.createElement("span");
    groupButton.id = "crud-group-btn";
    var editButton = document.createElement("button");
    editButton.id = "cgb-edit-btn";
    var editIcon = document.createElement("img");
    editIcon.classList.add("smc-img");
    editIcon.src = "assets\\icon\\pencil.png";
    editButton.appendChild(editIcon);
    editButton.classList.add("grey-button");
    editButton.classList.add("small-icon-button");
    // employeePage.loadDepartmentData();
    // employeePage.loadPositionData();
    editButton.addEventListener('click', () => {
        editEmployee(eid, eCode, currentEmployee);
    });
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
    lastCell.id = "last-selected-cell";
    
}

/**
 * Edits an employee's information.
 * 
 * @param {string} eid - The employee ID.
 * @param {string} eCode - The employee code.
 * @param {Object} currentEmployee - The current employee object containing the employee's information.
 */
function editEmployee(eid, eCode, currentEmployee) {
    try {
        console.log("Edit clicked");
        var form = document.querySelector("#popup-form");
        var editForm = form.cloneNode(true);
        editForm.id = "edit-form";
        // close2.addEventListener('click', closeEditForm);

        document.querySelector("body").insertBefore(editForm, form);
        editForm.querySelector("#close-form-btn").addEventListener('click', closeEditForm);
        editForm.querySelector("#hide-form-btn").addEventListener('click', closeEditForm);
        editForm.querySelector("#employee-code-loader").classList.add("hidden");
        editForm.querySelector("#employee-code").value = currentEmployee['EmployeeCode'];
        editForm.querySelector("#employee-name").value = currentEmployee['FullName'];
        var dateDOB = new Date(currentEmployee['DateOfBirth']);
        dateDOB = dateDOB.toISOString().split('T')[0];
        editForm.querySelector("#dob").value = dateDOB;
        editForm.querySelector("#department").value = currentEmployee['DepartmentId'];
        editForm.querySelector("#position").value = currentEmployee['PositionId'];
        editForm.querySelector("#id-number").value = currentEmployee['NationalityId'];
        var dateID = new Date(currentEmployee['NationalityIdDate']);
        dateID = dateID.toISOString().split('T')[0];
        editForm.querySelector("#id-issue-date").value = dateID;
        editForm.querySelector("#id-issue-place").value = currentEmployee['NationalityIdPlace'];
        editForm.querySelector("#address").value = currentEmployee['Address'];
        editForm.querySelector("#mobile").value = currentEmployee['MobilePhoneNumber'];
        editForm.querySelector("#phone").value = currentEmployee['TelephoneNumber'];
        editForm.querySelector("#email").value = currentEmployee['Email'];
        editForm.querySelector("#bank-account").value = currentEmployee['BankAccount'];
        editForm.querySelector("#bank-name").value = currentEmployee['BankName'];
        editForm.querySelector("#bank-branch").value = currentEmployee['BankBranch'];
        if (currentEmployee['Gender'] === 0) {
            editForm.querySelector("#male").checked = true;
        } else if (currentEmployee['Gender'] === 1) {
            editForm.querySelector("#female").checked = true;
        } else {
            editForm.querySelector("#other").checked = true
        }
        

        var depForm = editForm.querySelector("#department");
        var depList = editForm.querySelector("#department option");
        openEditForm();
        var employeeId = currentEmployee['EmployeeId'];
        editForm.querySelector("#form-submit-btn").addEventListener('click', () => {
            submitEdit(employeeId);
        })        


       

    } catch(e) {
        console.log(e);
    }
    
}

/**
 * Submits the edited employee data to the server.
 * 
 * @param {string} employeeId - The ID of the employee being edited.
 * @returns {void}
 */
function submitEdit(employeeId) {

    var employeeData = 
                {
                    "EmployeeId": employeeId,
                    "EmployeeCode": document.querySelector("#edit-form #employee-code").value,
                    "FullName": document.querySelector("#edit-form #employee-name").value,
                    //"DateOfBirth": document.querySelector("#edit-form #dob").value,
                    // "Gender": document.getElementById("employee-gender").value,
                    "PositionId": document.querySelector("#edit-form #position").value,
                    "DepartmentId": document.querySelector("#edit-form #department").value,
                    "NationalityId": document.querySelector("#edit-form #id-number").value,
                    //"NationalityIdDate": document.querySelector("#edit-form #id-issue-date").value,
                    "NationalityIdPlace": document.querySelector("#edit-form #id-issue-place").value,
                    "Address": document.querySelector("#edit-form #address").value,
                    "MobilePhoneNumber": document.querySelector("#edit-form #mobile").value,
                    "TelephonePhoneNumber": document.querySelector("#edit-form #phone").value,
                    "Email": document.querySelector("#edit-form #email").value,
                    "BankAccount": document.querySelector("#edit-form #bank-account").value,
                    "BankBranch": document.querySelector("#edit-form #bank-branch").value,     
                    "BankName": document.getElementById("bank-name").value
                };
    if (document.getElementById("male").checked) {
      employeeData["Gender"] = 0;
    } else if (document.getElementById("female").checked) {
      employeeData["Gender"] = 1;
    } else {
      employeeData["Gender"] = 2;
    }    

    var dob = document.getElementById("dob").value;
    if (dob) {
      employeeData["DateOfBirth"] = dob;
    }
    var iddate = document.getElementById("id-issue-date").value;

    if (iddate) {
      employeeData["NationalityIdDate"] = iddate;
    }

    console.log("submiting", employeeData);
    console.log("checking", employeeData["fullName"]);
    //Validate data
    var isValidated = true;
    var msg = [];
    if (
      employeeData["EmployeeCode"] === "" ||
      employeeData["EmployeeCode"] === null
    ) {
      console.log("Trống");
      isValidated = false;
      msg.push("Mã nhân viên không được để trống\n");
    }
    console.log(employeeData["FullName"]);
    if (employeeData["FullName"] === "" || employeeData["Fullname"] === null) {
      console.log("Trống");
      isValidated = false;
      msg.push("Họ và tên không được để trống\n");
    }
    if (
      employeeData["NationalityId"] === "" ||
      employeeData["NationalityId"] === null
    ) {
      isValidated = false;
      msg.push("Số CMTND không được để trống\n");
    }
    if (employeeData["MobilePhoneNumber"] === "" || employeeData["MobilePhoneNumber"] === null) {
      isValidated = false;
      msg.push("Số ĐT Di động không được để trống\n");
    } else {
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        const isValidPhone = phoneRegex.test(employeeData['MobilePhoneNumber']);
        if (!isValidPhone) {
            isValidated = false;
            msg.push("Số ĐT Di động không hợp lệ\n");
        }
    }
    if (employeeData["Email"] === "" || employeeData["Email"] === null) {
      isValidated = false;
      msg.push("Email không được để trống\n");
    }
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const isValidEmail = regex.test(employeeData['Email']);
            if (!isValidEmail) {
                isValidated = false;
                msg.push("Email không hợp lệ\n");
            }

    if (isValidated) {
        let url = baseURL + "/employees/";

        fetch(url,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            }
        )
            .then(response => {
                console.log(response.body);
                if (!response.ok) {
                    console.log(response.body.errors);
                    employeePage.showSimpleDialog("Lỗi", "Sửa không thành công.");
                    throw new Error(response.body.errors);
                }
                return response.text();
            })
            .then(data => {
                //display data
                console.log(data);
                employeePage.loadData();
                document.getElementById("edit-form").classList.add("blured");
                employeePage.showSimpleDialog("Thành công", "Bạn đã sửa thành công nhân viên: " + employeeData['EmployeeCode']);
                
            })
            .catch(error => {
                document.getElementById("edit-form").classList.add("blured");
                employeePage.showSimpleDialog("Đã có lỗi", error);
                console.log(error);
            });
       
    } else {
      console.log("Lỗi", msg);
      employeePage.showSimpleDialog("Lỗi", msg);
      msg = [];
    }                
    
}

/**
 * Removes the "blured" class from the edit form, if it exists in the body.
 */
function removeFormBlur() {
    try {
        console.log("adkjadklsajd");
        var body = document.querySelector("body");
        var editForm = document.querySelector("#edit-form");
        if (body.contains(editForm)) editForm.classList.remove("blured");
    }
    catch(e) {
        console.log(e);
    }
}

/**
 * Removes the blur effect from the specified element with the ID "to-blur".
 */
function removeMainBlur() {
    try {
        console.log("adkjadklsajd");
        document.querySelector("#to-blur").classList.remove("blured");
    }
    catch(e) {
        console.log(e);
    }
}

/**
 * Opens the edit form and loads department data.
 */
function openEditForm(){
    document.getElementById("to-blur").classList.add("blured");
    document.querySelector("#edit-form").classList.remove("hidden");
}

/**
 * Closes the edit form and performs necessary actions.
 */
function closeEditForm() {
    employeePage.closeForm();
    document.getElementById("edit-form").classList.add("hidden");
    document.getElementById("to-blur").classList.remove("blured");
    editForm = document.getElementById("edit-form");
    document.querySelector("body").removeChild(editForm);

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
            let url = "http://localhost:5223/api/v1/employees/" + eid;
            fetch(url,
                {
                    method: "DELETE"
                }
            )
                .then(response => {
                    console.log(response.body);
                    if (!response.ok) {
                        employeePage.showSimpleDialog("Lỗi", "Xoá không thành công.");
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

function confirmDeletePD(name) {
    var msg = "Bạn có chắc chắn muốn xoá: " + name;
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

function onDeletePosition(position) {
    try {
        confirmDeletePD(position.PositionName)
            .then((result) => {
                let url = baseURL + "/positions/" + position.PositionId;
                fetch(url,
                    {
                        method: "DELETE"
                    }
                )
                    .then(response => {
                        console.log(response.body);
                        if (!response.ok) {
                            employeePage.showSimpleDialog("Lỗi", "Xoá không thành công.");
                            throw new Error('Network response error');
                        }
                        return response.text();
                    })
                    .then(data => {
                        //display data
                        console.log(data);
                        employeePage.loadData();
                        employeePage.loadPositionDataToPositionForm();
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
    } catch (error) {
        console.log(error);
    }
}

function onEditPosition(position) {
    try {
        var input = document.querySelector("#new-position-name");
        input.value = position.PositionName;
        
        var submitButton = document.querySelector("#submit-position-edit");
        submitButton.addEventListener('click', () => {
            position.PositionName = input.value;
            submitEditPosition(position);
            input.value = "";
        });

    } catch(e) {
        console.log(e);
    }
}

function submitEditPosition(position) {
    try {
        var url = baseURL + "/positions";
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(position)
        })
        .then(response => {
            console.log("kdaslksdsalkdsa", response.body);
            if (!response.ok) {
                employeePage.showSimpleDialog("Lỗi", "Sửa không thành công");
                throw new Error('Network response error');
            }
            return response.text();
        })
        .then(data => {
            //display data
            console.log(data);
            employeePage.loadData();
            employeePage.loadPositionDataToPositionForm();
        })
        .catch(error => {
            console.log(error);
        });

    } catch (error) {
        console.log(error);
    }
}

function onDeleteDepartment(department) {
    try {
        confirmDeletePD(department.DepartmentName)
            .then((result) => {
                let url = baseURL + "/departments/" + department.DepartmentId;
                fetch(url, {
                    method: "DELETE"
                })
                .then (response => {
                    console.log(response.body);
                    if (!response.ok) {
                        employeePage.showSimpleDialog("Lỗi", "Xoá không thành công.");
                        throw new Error('Network response error');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    employeePage.loadData();
                    employeePage.loadDeparmentDataToDepartmentForm();
                })
                .catch(error => {
                    console.log(error);
                });
        
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                employeePage.hideDialog();
            });
    } catch (error) {
        console.log(error);
    }
}


function onEditDepartment(department) {
    try {
        var input = document.querySelector("#new-department-name");
        input.value = department.DepartmentName;
        
        var submitButton = document.querySelector("#submit-department-edit");
        submitButton.addEventListener('click', () => {
            department.DepartmentName = input.value;
            submitEditDepartment(department);
            input.value = "";
        });
    }
    catch(e) {
        console.log(e);
    }   
}

/**
 * Submits the edited department to the server.
 * 
 * @param {Object} department - The department object to be submitted.
 * @returns {void}
 */
function submitEditDepartment(department){
    try {
        var url = baseURL + "/departments";
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(department)
        })
        .then (response => {
            console.log("kdaslksdsalkdsa", response.body);
            if (!response.ok) {
                employeePage.showSimpleDialog("Lỗi", "Dữ liệu không hợp lệ");
                throw new Error('Network response error');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            employeePage.loadData();
            employeePage.loadDeparmentDataToDepartmentForm();
        })
        .catch(error => {
            console.log(error);
        });    
    } catch (error) {
        console.log(error);
    }
}


/**
 * Clears the form by resetting the input fields and generating a new employee code.
 */
function clearForm(){
    try {
        var form = document.querySelector("#popup-form");
        form.reset();
        getNewEmployeeCode();
    } catch (error) {
        console.log(error);
    }

}


/**
 * Formats a given date into a string in the format "MM/DD/YYYY".
 * 
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string.
 */
function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
}

