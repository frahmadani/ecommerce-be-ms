const productEventHandler = require('../api/handler/event_handler');
// const logger = require('../helpers/utils/logger');

const init = () => {
    // logger.log('info','Observer is Running...','myEmitter.init');
    initEventListener();
};
const initEventListener = () => {
    productEventHandler.addOrder();
};

module.exports = {
    init: init
};
