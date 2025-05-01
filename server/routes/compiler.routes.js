const express = require('express');
const router = express.Router();
const compilerController = require('../controllers/compiler.controller');

// Route to compile and run code
router.post('/run', compilerController.compileAndRun);

// Route to debug code
router.post('/debug', compilerController.debugCode);

module.exports = router;