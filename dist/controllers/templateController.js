"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateById = exports.getTemplates = void 0;
const Template_js_1 = require("../models/Template.js");
const getTemplates = async (req, res) => {
    try {
        const { occasion } = req.query;
        const query = { isActive: true };
        if (occasion) {
            query.occasionType = occasion;
        }
        const templates = await Template_js_1.Template.find(query);
        res.status(200).json(templates);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getTemplates = getTemplates;
const getTemplateById = async (req, res) => {
    try {
        const template = await Template_js_1.Template.findById(req.params.id);
        if (!template) {
            res.status(404).json({ message: 'Template not found' });
            return;
        }
        res.status(200).json(template);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getTemplateById = getTemplateById;
