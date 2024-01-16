const secim = document.querySelectorAll("select")
const button = document.querySelector(".button")
const yazi = document.querySelector(".from-text")
const ceviri = document.querySelector(".to-text")
const exchange = document.querySelector(".exchange")
const yazikopyasi = document.querySelector("#copy-first")
const cevirikopyasi = document.querySelector("#copy-second")
const yazisesi = document.querySelector('#voice-first')
const cevirisesi = document.querySelector('#voice-second')



secim.forEach((tag, id) => {
    for (const i in languages) {

        let selected;

        /* ! I wrote the selected value of the text to be translated with the if condition. */
        if (id == 0 && i == 'en-GB') {
            selected = "selected"
        }
        /* I created the second default value, which is Turkish, with else if */
        else if (id == 1 && i == 'tr-TR') {
            selected = "selected"
        }

        /* I added html elements and pulled them from the languages.js file */
        let option = `<option value="${i}" ${selected}>${languages[i]}</option>`
        tag.insertAdjacentHTML("beforeend", option)
    }
});

exchange.addEventListener("click", () => {
    /* replaces the entered text and its translation */
    let temptText = yazi.value;
    yazi.value = ceviri.value;
    ceviri.value = temptText;
    /* seçimleri değiştirir */
    let tempLang = secim[0].value;
    secim[0].value = secim[1].value;
    secim[1].value = tempLang;
})


button.addEventListener("click", () => {
    /* I assigned it to a variable to get the text written by the user. */
    let text = yazi.value;
    /* I got what language the user was typing in */
    translateForm = secim[0].value
    /* I got which language the user wanted to translate */
    translateTo = secim[1].value
    if (!text) return;
    ceviri.setAttribute("placeholder", "Please Wait...")
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateForm}|${translateTo}`
    /* Using fetch, I assign the information from the api address to the data. */
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        /* I wrote the translation text in the responseData in the incoming API to the value of the totex. */
        ceviri.value = data.responseData.translatedText
        ceviri.setAttribute("placeholder", "translation")

    })
})

/* copy to text */


yazikopyasi.addEventListener("click", ({ target }) => {
    navigator.clipboard.writeText(yazi.value)
})


/* copy to translate */


cevirikopyasi.addEventListener("click", ({ target }) => {
    navigator.clipboard.writeText(ceviri.value)
})

/* voice to text */

yazisesi.addEventListener("click", ({ target }) => {
    utterance = new SpeechSynthesisUtterance(yazi.value)
    utterance.lang = secim[0].value
    speechSynthesis.speak(utterance)
})

/* voice to translate */

cevirisesi.addEventListener("click", ({ target }) => {
    utterance = new SpeechSynthesisUtterance(ceviri.value)
    utterance.lang = secim[1].value
    speechSynthesis.speak(utterance)
})


document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert('You cannot access the codes of the project this way :)')
});


