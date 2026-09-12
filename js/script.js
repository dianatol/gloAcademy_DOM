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
        appData.addTitle();

        rollbackRangeValue.textContent = rollbackRange.value + '%';
        appData.rollback = +rollbackRange.value;

        startBtn.addEventListener('click', () => appData.start());

        bindScreenListeners(appData.validateScreens);

        buttonPlus.addEventListener('click', () => {
            const firstScreen = document.querySelector('.main-controls__item.screen');
            const newScreen = firstScreen.cloneNode(true);

            newScreen.querySelector('select').value = '';
            newScreen.querySelector('input').value = '';

            buttonPlus.before(newScreen);

            bindScreenListeners(appData.validateScreens);
            appData.validateScreens();
        });

        appData.validateScreens();
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    validateScreens: function () {
        const selects = document.querySelectorAll('.main-controls__item.screen select');
        const inputs  = document.querySelectorAll('.main-controls__item.screen input');
        let allFilled = true;

        selects.forEach((select, i) => {
            const input = inputs[i];
            const okSelect = select.value !== '';
            const okInput  = input.value.trim() !== ''
                          && appData.isNumber(input.value)
                          && +input.value > 0;

            if (!okSelect || !okInput) allFilled = false;
        });

        startBtn.disabled = !allFilled;
    },

    addScreens: function () {
        const selects = document.querySelectorAll('.main-controls__item.screen select');
        const inputs  = document.querySelectorAll('.main-controls__item.screen input');

        appData.screens = [];

        selects.forEach((select, i) => {
            const input = inputs[i];
            const okInput = input.value.trim() !== '' && appData.isNumber(input.value);

            if (select.value !== '' && okInput) {
                appData.screens.push({
                    id: i,
                    name: select.options[select.selectedIndex].text,
                    price: +select.value,
                    count: +input.value
                });
            }
        });
    },

    addPrices: function () {
        appData.screenPrice = 0;
        appData.allServicePrices = 0;

        let totalCount = 0;

        for (let screen of appData.screens) {
            appData.screenPrice += screen.price * screen.count;
            totalCount += screen.count;
        }
        appData.screenCount = totalCount;

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }

        appData.fullPrice = +appData.screenPrice + +appData.allServicePrices;

        appData.servicePercentPrice =
            appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

        totalPriceEl.value = appData.screenPrice;
        totalOtherEl.value = appData.allServicePrices;
        totalFullEl.value = appData.fullPrice;
        totalCountEl.value = appData.screenCount;
        totalRollbackEl.value = Math.round(appData.servicePercentPrice);
    },

    start: function () {
        appData.addScreens();
        appData.addPrices();
    }
};

rollbackRange.addEventListener('input', function () {
    const value = this.value;
    rollbackRangeValue.textContent = value + '%';
    appData.rollback = +value;
});

appData.init();