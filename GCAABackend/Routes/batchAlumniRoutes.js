const express = require('express');
const router = express.Router();
const {
  getBatchAlumni,
  getBatchAlumniStats,
  getBatchAlumnusById,
  createBatchAlumnus,
  updateBatchAlumnus,
  deleteBatchAlumnus,
} = require('../Controllers/batchAlumniController');

router.get('/stats', getBatchAlumniStats);
router.get('/', getBatchAlumni);
router.post('/', createBatchAlumnus);
router.get('/:id', getBatchAlumnusById);
router.put('/:id', updateBatchAlumnus);
router.delete('/:id', deleteBatchAlumnus);

module.exports = router;
