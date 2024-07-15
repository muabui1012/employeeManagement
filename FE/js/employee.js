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
        this.initEvents();
    }

    initEvents(){
        try {
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

let employees = [];
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

    displayData() {
        var table = document.querySelector(".main-tbl-container-tbl table tbody");
        console.log(table);
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