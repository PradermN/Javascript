/*********************************************************************************
 * 
 * Fonction to open and close 
 * all popups of the page 
 * 
 *********************************************************************************/


/**
 * Function to share the score 
 */
function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // The popup is hided als default (display:none), adding the class "active"
    // will change his display and make it visible. 
    popupBackground.classList.add("active")
}

/**
 * This function hide the popup to share the score 
 */
function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // The popup is hided als default (display:none), adding the class "active"
    // will change his display and make it visible. 
    popupBackground.classList.remove("active")
}


/**
 * This function initializes event listener, that concern
 * display of the popup 
 */
function initAddEventListenerPopup() {
    // We listen to the click on the btn "Share"
    btnPartage = document.querySelector(".zonePartage button")
    let popupBackground = document.querySelector(".popupBackground")
    btnPartage.addEventListener("click", () => {
        // When we have clicked on the btn share, we display the popup
        afficherPopup()
    })

    // We listen to the click on div "popupBackground"
    popupBackground.addEventListener("click", (event) => {
        // If we precisely clicked on the popubBackground 
        // (and not another element inside)
        if (event.target === popupBackground) {
            // Then we hide the popup
            cacherPopup()
        }
    })
}

