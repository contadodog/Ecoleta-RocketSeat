const buttonSearch = document.querySelector("#page-home main a") //procura dentro do page-home, main o botão que está representando por imagem
const modal = document.querySelector("#modal")

const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click",() => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})