/**
 * Shows the popup form by removing the "hidden" class.
 */
function showpopup() {
    var popup = document.getElementById("popup-form");
    popup.classList.remove("hidden");
    console.log("Hello");
}

/**
 * Hides the popup form by adding the "hidden" class.
 */
function hidepopup() {
    var popup = document.getElementById("popup-form");
    popup.classList.add("hidden");
    console.log("Hello");
}