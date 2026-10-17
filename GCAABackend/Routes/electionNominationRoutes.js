const express = require('express');
const router = express.Router();
const {
  submitNomination,
  getAllNominations,
  getNominationById,
  updateNominationStatus,
  deleteNomination,
} = require('../Controllers/electionNominationController');

router.post('/', submitNomination);
router.get('/', getAllNominations);
router.get('/:id', getNominationById);
router.put('/:id', updateNominationStatus);
router.delete('/:id', deleteNomination);

module.exports = router;
