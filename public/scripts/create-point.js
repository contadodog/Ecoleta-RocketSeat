function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}`
        }

    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedSate = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedSate].text
    
    citySelect.innerHTML = "<option value>Selecione a cidade </option>"
    citySelect.disabled = true

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
    .then( res=> res.json() )
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}`
        }

        citySelect.disabled = false

    })

}

document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)


//Ítens de coleta
//pegar todos os li is
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classse com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //veriicar se existem itens selecionados, se sim 
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => { 
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })
    
    if (alreadySelected >= 0){
        //tirar da selecao

        const filteredItems = selectedItems.filter(item => {
            
            const itemsIsDifferent = item != itemId // false
            return itemsIsDifferent
        })

        selectedItems = filteredItems
    }else{
        //se não estiver selecionado, adicionar ao array
        selectedItems.push(itemId)
    }

    console.log(selectedItems)

    //atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}