const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.addNewContact);

router.delete('/:id', ctrl.deleteContact);

router.put('/:id', ctrl.updateContact);

module.exports = router;
