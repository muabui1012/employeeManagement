//Close the sidebar
function closeNav(){
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
}

//open the sidebar
function openNav(){
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
}