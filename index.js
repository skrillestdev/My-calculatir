class calculator {
  constructor(previousInputTextElement, currentInputTextElement) {
    this.previousInputTextElement = previousInputTextElement
    this.currentInputTextElement = currentInputTextElement
    this.clear()
  }
  clear() {
    this.currentInput = ''
    this.previousInput = ''
    this.operation = undefined  
  }
  delete() {
    this.currentInput =  this.currentInput.toString().slice(0, -1)
  }

  appendNumber(number){
    if (number === '.' && this.currentInput.includes('.')) return
    this.currentInput = this.currentInput.toString() + 
    number.toString()
  }
  chooseOperation(operation){
    if (this.currentInput === '') return
      if (this.previousInput !== '') {
        this.compute()
      }
    this.operation = operation
    this.previousInput = this.currentInput
    this.currentInput = ''
  }
  compute() {
    let computation
    const prev = parseFloat(this.previousInput)
    const current = parseFloat(this.currentInput)
    if (isNaN(prev) || isNaN(current)) return
      switch(this.operation) {
      case '+': 
        computation = prev + current
        break
      case '-': 
        computation = prev - current
        break
      case '*': 
        computation = prev * current
        break
      case '÷': 
        computation = prev / current
        break
        default:
        return
      }
    this.currentInput = computation
    this.operation = undefined
    this.previousInput = ''

  }

  updateDisplay() {
    this.currentInputTextElement.innerText = this.currentInput
     this.previousInputTextElement.innerText = this.previousInput
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButtons = document.querySelector('[data-all-clear]')
const deleteButtons = document.querySelector('[data-delete]')
const equalButtons = document.querySelector('[data-equal]')
const previousInputTextElement = document.querySelector('[data-previous-input]')
const currentInputTextElement = document.querySelector('[data-current-input]')


const calc = new calculator(previousInputTextElement,
 currentInputTextElement)
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.appendNumber(button.innerText) 
    calc.updateDisplay() 
  }) 
})


operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.chooseOperation(button.innerText) 
    calc.updateDisplay() 
  }) 
})

equalButtons.addEventListener('click', button => {
  calc.compute()
  calc.updateDisplay()

})

allClearButtons.addEventListener('click', button => {
  calc.clear() 
  calc.updateDisplay()
}) 

deleteButtons.addEventListener('click', button => {
  calc.delete() 
  calc.updateDisplay()
})



// <!-- to be sincere ;  Festus it wasnt easy   -->