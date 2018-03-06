var express = require('express');
var router = express.Router();
var item_controller = require('../controllers/itemController');
var Item = require('../models/item');

router.get('/statistic/:page', item_controller.items_statistic);
router.get('/:page', item_controller.items_list);
router.post('/add', item_controller.item_post);
router.get('/:id', item_controller.item_edit_get);
router.post('/:id', item_controller.item_edit_post);
router.delete('/:id', item_controller.item_delete);

module.exports = router;