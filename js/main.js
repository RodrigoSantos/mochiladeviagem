const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || [] // trasforma a string em JSON novamente

itens.forEach((element) => {
    criaElemento(element)    
});

form.addEventListener("submit", (evento) => { // Quando é clicado em emviar
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
       
    //console.log(evento)
    //console.log(",evento.target[0].value + ",", evento.target[1].value)
    //console.log(",evento.target.elements['nome'].value + ",", evento.target.elements['quantidade'].value)
    //console.log(quantidade)
    
    const existe = itens.find(elemento => elemento.nome ===nome.value)//olhando todos os elementos da minha lista e verificando se existe
    console.log(existe)
    const itemAtual = {
        "nome": nome.value,
        "quantidade":quantidade.value
    }
    if(existe){        
        itemAtual.id=existe.id
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento =>elemento.id===existe.id)] = itemAtual
    }else{
        //Operador ternario, se exitir item na lista pega o ultimo item e soma 1 caso não, recebe 0
        itemAtual.id= itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0 
        console.log(itemAtual)
        criaElemento(itemAtual)
        itens.push(itemAtual)
        

    }
    escreveLocalStorage(itens)
    //localStorage.setItem("itens", JSON.stringify(itens)) // Trsforma em uma String o Json

    nome.value = ""
    quantidade.value=""    
})  
function criaElemento(item){
    
    //<li class="item"><strong>7</strong>Camisas</li>
    //console.log(nome,quantidade)
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")//adiciona na classe item
    
    const numeroItem = document.createElement('strong')  
    numeroItem.innerHTML = item.quantidade  
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))

    
    lista.appendChild(novoItem)
      //console.log(numeroItem)  
}
function atualizaElemento(item){
   document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}
function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText="x"
    elementoBotao.addEventListener("click",function() {
        deletaElemento(this.parentNode,id)//this.parentNode pega todo o conjunto 
    })

    return elementoBotao

}
function deletaElemento(tag,id){
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id===id),1) //Essa função recebe como parametro a posição e remove 1 item depois daquela posição
    escreveLocalStorage(itens)
}

function escreveLocalStorage(itens){
    localStorage.setItem("itens",JSON.stringify(itens))
}