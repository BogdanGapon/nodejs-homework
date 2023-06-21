const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { isValidId } = require('../../helpers/index');
router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', ctrl.addNewContact);

router.delete('/:id', isValidId, ctrl.deleteContact);

router.put('/:id', isValidId, ctrl.updateContact);

router.patch('/:id/favorite', isValidId, ctrl.updateFavorite);

module.exports = router;
