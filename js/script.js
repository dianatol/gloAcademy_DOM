'use strict'

const title1 = document.getElementsByTagName('h1') 
const button = document.getElementsByClassName('handler_btn')
const buttonPlus = document.querySelector('button.screen-btn') 
const percent = document.querySelectorAll('div.main-controls__item.other-items.percent')
const number = document.querySelectorAll('div.main-controls__item.other-items.number')
const rollbackRange = document.querySelector('div.main-controls__range input')
const rollbackRangeValue = document.querySelector('div.main-controls__range span')
const input = document.getElementsByClassName('total-input')
let screen = document.querySelectorAll('div.main-controls__item.screen')

for(let i = 0; i < input.length; i ++) {
    console.log(input[i])
}


// const appData = {
//     title: '',
//     screens: [], 
//     screenPrice: 0,
//     adaptive: true,
//     rollback: 50,
//     services: {}, 
//     allServicePrices: 0,
//     fullPrice: 0,
//     servicePercentPrice: 0,
//     servicePrice: 0,
//     price: 0,

//     isNumber(num) {
//         return !isNaN(parseFloat(num)) && isFinite(num)
//     },

//     asking: function() {

//         do {
//             appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки")
//         } while (!isNaN(appData.title));
        
    
//     for (let i = 0; i < 2; i++) {
//         let price = 0
//         let name; 
        
//         do {
//             name = prompt("Какие типы экранов нужно разработать?")
//         } while (!isNaN(name))
        
        
//         do{
//             price = prompt("Сколько будет стоить данная работа?")
//         } while (!appData.isNumber(price))

//         appData.screens.push({id: i, name: name, price: price}) 
//     }       
            
//     for (let i = 0; i < 2; i++) {
//         let price = 0
//         let name;
//         do {
//             name = prompt("Какой дополнительный тип услуги нужен?");
//         } while(!isNaN(name))

//         do {
//             price = prompt("Сколько это будет стоить?")
//         } while (!appData.isNumber(price))

//         appData.services[name] = +price
//     }
        
//     }, 

//     addPrices: function() {
//         for (let screen of appData.screens) {
//         appData.screenPrice += +screen.price
//     }
//     for (let key in appData.services) {
//         appData.allServicePrices += appData.services[key]
//         }

// },

//     showTypeOF: function(variable) {
//         console.log(variable, typeof variable)
//     }, 

//         getFullPrice: function() {
//         appData.fullPrice = +appData.screenPrice + +appData.allServicePrices
//     },

//     getTitle: function() {
//     appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase()
//     },

//     getServicePercentPrice: function() {
//         appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
//     },
//     getRollbackMessage: function(fullPrice) {
//         if(fullPrice > 30000) {
//         return "Даем скидку в 10%"
//     } else if(15000 <= fullPrice && fullPrice <= 30000) {
//         return "Даем скидку в 5%"
//     } else if (0 <= fullPrice && fullPrice < 15000) {
//         return "Скидка не предусмотрена"
//     } else if (fullPrice < 0) {
//         return "Что-то пошло не так"
//     }
//     }, 

//     logger () {
//         console.log(appData.fullPrice)
//         console.log(appData.servicePercentPrice)
//         console.log(appData.screens)

//     },

//     start() {
//         appData.asking();
//         appData.addPrices();
//         appData.getFullPrice();
//         appData.getServicePercentPrice();
//         appData.getTitle();
//         appData.logger();
//     }

// }


// appData.start()



console.log(title1[0])
console.log(button)
console.log(buttonPlus)
console.log(percent)
console.log(number)
console.log(rollbackRange)
console.log(rollbackRangeValue)
console.log(screen)












