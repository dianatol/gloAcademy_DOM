'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementById('start');
const buttonPlus = document.querySelector('button.screen-btn');
const rollbackRange = document.querySelector('div.main-controls__range input');
const rollbackRangeValue = document.querySelector('div.main-controls__range span');

const totalCountEl = document.getElementById('total-count');
const totalRollbackEl = document.getElementById('total-count-rollback');
const totalFullEl = document.getElementById('total-full-count');
const totalPriceEl = document.getElementById('total');
const totalOtherEl = document.getElementById('total-count-other');

const bindScreenListeners = (validator) => {
    const selects = document.querySelectorAll('.main-controls__item.screen select');
    const inputs = document.querySelectorAll('.main-controls__item.screen input');

    selects.forEach(select => {
        select.removeEventListener('change', validator);
        select.addEventListener('change', validator);
    });

    inputs.forEach(input => {
        input.removeEventListener('input', validator);
        input.removeEventListener('change', validator);
        input.addEventListener('input', validator);
        input.addEventListener('change', validator);
    });
};

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    screenCount: 0,
    adaptive: true,
    rollback: 0,
    services: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,

    init: function () {
        this.addTitle();

        rollbackRangeValue.textContent = rollbackRange.value + '%';
        this.rollback = +rollbackRange.value;

        startBtn.addEventListener('click', this.start.bind(this));
        buttonPlus.addEventListener('click', this.addScreen.bind(this));

        bindScreenListeners(this.validateScreens.bind(this));

        this.validateScreens();
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    validateScreens: function () {
        const selects = document.querySelectorAll('.main-controls__item.screen select');
        const inputs = document.querySelectorAll('.main-controls__item.screen input');
        let allFilled = true;

        selects.forEach((select, i) => {
            const input = inputs[i];
            const okSelect = select.value !== '';
            const okInput = input.value.trim() !== ''
                && this.isNumber(input.value)
                && +input.value > 0;

            if (!okSelect || !okInput) allFilled = false;
        });

        startBtn.disabled = !allFilled;
    },

    addScreen: function () {
    const firstScreen = document.querySelector('.main-controls__item.screen');
    const newScreen = firstScreen.cloneNode(true);

    const clonedBtn = newScreen.querySelector('.screen-btn');
    if (clonedBtn) clonedBtn.remove();

    newScreen.querySelector('select').value = '';
    newScreen.querySelector('input').value = '';

    buttonPlus.before(newScreen);

    bindScreenListeners(this.validateScreens.bind(this));
    this.validateScreens();
},

    addScreens: function () {
        const selects = document.querySelectorAll('.main-controls__item.screen select');
        const inputs = document.querySelectorAll('.main-controls__item.screen input');

        this.screens = [];

    
        selects.forEach((select, i) => {
            const input = inputs[i];
            const okInput = input.value.trim() !== '' && this.isNumber(input.value);

            if (select.value !== '' && okInput) {
                this.screens.push({
                    id: i,
                    name: select.options[select.selectedIndex].text,
                    price: +select.value,
                    count: +input.value
                });
            }
        });
    },

    addPrices: function () {
        this.screenPrice = 0;
        this.allServicePrices = 0;

        let totalCount = 0;

        for (let screen of this.screens) {
            this.screenPrice += screen.price * screen.count;
            totalCount += screen.count;
        }
        this.screenCount = totalCount;

        for (let key in this.services) {
            this.allServicePrices += this.services[key];
        }

        this.fullPrice = +this.screenPrice + +this.allServicePrices;

        this.servicePercentPrice =
            this.fullPrice - (this.fullPrice * (this.rollback / 100));

        totalPriceEl.value = this.screenPrice;
        totalOtherEl.value = this.allServicePrices;
        totalFullEl.value = this.fullPrice;
        totalCountEl.value = this.screenCount;
        totalRollbackEl.value = Math.round(this.servicePercentPrice);
    },

    lockControls: function () {
        const selects = document.querySelectorAll('.main-controls__item.screen select');
        const inputs = document.querySelectorAll('.main-controls__item.screen input');

        selects.forEach(select => select.disabled = true);
        inputs.forEach(input => input.disabled = true);
    },

    showResetButton: function () {
        if (document.getElementById('reset')) return;

        const resetBtn = document.createElement('button');
        resetBtn.id = 'reset';
        resetBtn.textContent = 'Сброс';
        resetBtn.className = startBtn.className;

        startBtn.parentNode.insertBefore(resetBtn, startBtn);

        startBtn.style.display = 'none';

        resetBtn.addEventListener('click', this.reset.bind(this));
    },

    start: function () {
        this.addScreens();
        this.addPrices();
        this.lockControls();
        this.showResetButton();
    },

    reset: function () {
        const resetBtn = document.getElementById('reset');
        if (resetBtn) resetBtn.remove();
        startBtn.style.display = '';

        const allScreens = document.querySelectorAll('.main-controls__item.screen');
        allScreens.forEach((screen, i) => {
            if (i > 0) screen.remove();
        });

        const firstScreen = document.querySelector('.main-controls__item.screen');
        if (firstScreen) {
            firstScreen.querySelector('select').value = '';
            firstScreen.querySelector('input').value = '';
        }
        const selects = document.querySelectorAll('.main-controls__item.screen select');
        const inputs = document.querySelectorAll('.main-controls__item.screen input');
        selects.forEach(select => select.disabled = false);
        inputs.forEach(input => input.disabled = false);

        totalPriceEl.value = 0;
        totalOtherEl.value = 0;
        totalFullEl.value = 0;
        totalCountEl.value = 0;
        totalRollbackEl.value = 0;

        this.screens = [];
        this.screenPrice = 0;
        this.screenCount = 0;
        this.allServicePrices = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;

        rollbackRange.value = 0;
        rollbackRangeValue.textContent = '0%';
        this.rollback = 0;

        this.validateScreens();
    }
};

rollbackRange.addEventListener('input', function () {
    const value = this.value;
    rollbackRangeValue.textContent = value + '%';
    appData.rollback = +value;
});

appData.init();