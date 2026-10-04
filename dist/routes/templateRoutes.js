"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const templateController_js_1 = require("../controllers/templateController.js");
const router = (0, express_1.Router)();
router.get('/', templateController_js_1.getTemplates);
router.get('/:id', templateController_js_1.getTemplateById);
exports.default = router;
