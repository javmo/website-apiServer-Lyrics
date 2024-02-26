const express = require('express');
const router = express.Router();
const { createConfig, getAllConfigs, getConfigById, updateConfig, deleteConfig, getConfigByUrl } = require('../controllers/webConfigScrapper.controllers');

router.post('/configs', createConfig);
router.get('/configs', getAllConfigs);
router.get('/configs/:id', getConfigById);
router.put('/configs/:id', updateConfig);
router.delete('/configs/:id', deleteConfig);
router.get('/configs/url/:url', getConfigByUrl);

module.exports = router;
