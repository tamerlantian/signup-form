const inputValidator = (event) => {
    event.preventDefault()
    const inputs = form.querySelectorAll("input")
    for(let input of inputs) {
        isEmpty(input)
    } 
}

const isEmpty = (input) => {
    if (input.value === '') {
        if(input.nextElementSibling.nodeName !== 'I' || input.type === 'email') {
            if (input.nextElementSibling.nodeName === 'I') {
                removeNode(input)
            }
            const inputName = input.getAttribute('placeholder')
            const message = `${inputName} cannot be empty`
            appendErrorMessage(input, message)
        }
    } else {
        input.classList.remove('incorrect')
        if (input.nextElementSibling.nodeName === 'I') {
            removeNode(input)
        }
        if(input.type === 'email') {
            if(!isValidEmail(input)) {
                const message = "Looks like this is not an email"
                appendErrorMessage(input, message) 
            }
        }
    }
}

const createElement = (str, element) => {
    const tag = document.createElement(element) 
    tag.classList.add('incorrect-text')
    tag.textContent = str
    return tag
}

const appendErrorMessage = (input, message) => {
    const element = createElement(message, "i")    
    input.classList.add('incorrect')
    form.insertBefore(element, input.nextSibling)
}

const isValidEmail = (input) => {
    const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return regx.test(input.value)
}

const removeNode = (node) => { 
    node.nextElementSibling.remove()
}

const form = document.querySelector("form")

form.addEventListener('submit', inputValidator)
