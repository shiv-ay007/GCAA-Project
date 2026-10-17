const express = require('express');
const router = express.Router();
const {
  getRegisteredMembers,
  getMemberStats,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  bulkSeedMembers,
  registerAlumni,
  verifyMembershipNumber,
} = require('../Controllers/registeredMemberController');

// Verification Endpoint
router.get('/verify/:membershipNo', verifyMembershipNumber);

// Public Alumni Registration Endpoint
router.post('/register', registerAlumni);

// List & Stats
router.get('/', getRegisteredMembers);
router.get('/stats', getMemberStats);

// Bulk Operations
router.post('/bulk-seed', bulkSeedMembers);

// CRUD
router.post('/', createMember);
router.get('/:id', getMemberById);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
