/*********************************************************************************
 * 
 * Here we have all necessary function for the game to work. 
 * 
 *********************************************************************************/

/**
 * This function displays the user's score on the console
 * @param {number} score : User's score
 * @param {number} nbMotsProposes : number of words offered to the user
 */
function afficherResultat(score, nbMotsProposes) {
    // Recovery of the area in which we will write the score
    let spanScore = document.querySelector(".zoneScore span")
    // Writting of the text
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // we place the text inside of the span 
    spanScore.innerText = affichageScore
}

/**
 * This function displays a proposition, that the player should recopy
 * in the area "zoneProposition"
 * @param {string} proposition : The proposition to display
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * This function construct and dislay the email 
 * @param {string} nom : The name of the player
 * @param {string} email : Email of the person who he wants to share the score with.
 * @param {string} score : The score
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Sharing of score QwertyType&body=Hi, I'm ${nom} and I've just made the score ${score} on the site QwertyType !`
    location.href = mailto
}

/**
 * This function takes a name as parameter and validates that it has the correct format
 * here : Two characters minimum
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("The name is too short. ")
    }
    
}

/**
 * This function takes an email as parameter and validates that it has the correct format.
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("The email is not valid.")
    }
    
}

/**
 * This function displays the error message passed as a parameter. 
 * If the span already exists, then it is reused so as not to multiply
 * error messages. 
 * @param {string} message 
 */
function afficherMessageErreur(message) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }
    
    spanErreurMessage.innerText = message
}

/**
 * This function allows you to retrieve the information in the sharing popup form and
 * call up the display of the email with the correct parameters
 * @param {string} scoreEmail 
 */
function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)
    
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)

    } catch(erreur) {
        afficherMessageErreur(erreur.message)
    }
    
}

/**
 * This function launches the game. 
 * It asks the user to choose between "words" and "sentences" and launches the corresponding game loop
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    afficherProposition(listeProposition[i])

    // Management of the click event on the submit button
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("The game is over")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }
    })

    // Event management changes on the radio buttons. 
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            //If it's the first item that was changed, then we want to play with the Wordlist. 
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                //Otherwise we want to play with the list of sentences
                listeProposition = listePhrases
            }
            // And we modify the live display. 
            afficherProposition(listeProposition[i])
        })
    }

    // Management of the submit event on the sharing form 
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        gererFormulaire(scoreEmail)
    })

    afficherResultat(score, i)
}