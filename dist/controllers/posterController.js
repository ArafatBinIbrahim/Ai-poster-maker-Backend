"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePoster = exports.regeneratePoster = exports.getPosterById = exports.getUserPosters = exports.createPoster = void 0;
const Poster_js_1 = require("../models/Poster.js");
const Template_js_1 = require("../models/Template.js");
const posterRenderer_js_1 = require("../utils/posterRenderer.js");
// Create a new poster
const createPoster = async (req, res) => {
    try {
        const { templateId, caption, name, designation, party, district, photoUrl } = req.body;
        const userId = req.user._id;
        const template = await Template_js_1.Template.findById(templateId);
        if (!template) {
            res.status(404).json({ message: 'Template not found' });
            return;
        }
        const generatedImageUrl = await (0, posterRenderer_js_1.generatePosterImage)({
            templateBgUrl: template.thumbnailUrl,
            caption,
            name,
            designation,
            party,
            district,
            photoUrl,
        });
        const poster = await Poster_js_1.Poster.create({
            userId,
            templateId,
            formData: { caption, name, designation, party, district },
            uploadedPhotoUrls: [photoUrl],
            generatedImageUrl,
            status: 'completed',
        });
        res.status(201).json({ message: 'Poster generated successfully', poster });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.createPoster = createPoster;
// Get user poster history
const getUserPosters = async (req, res) => {
    try {
        const { userId } = req.params;
        const posters = await Poster_js_1.Poster.find({ userId }).populate('templateId');
        res.status(200).json(posters);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getUserPosters = getUserPosters;
// Get poster by ID
const getPosterById = async (req, res) => {
    try {
        const poster = await Poster_js_1.Poster.findById(req.params.id).populate('templateId');
        if (!poster) {
            res.status(404).json({ message: 'Poster not found' });
            return;
        }
        res.status(200).json(poster);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getPosterById = getPosterById;
// Regenerate poster with tweaked data
const regeneratePoster = async (req, res) => {
    try {
        const { caption, name, designation, party, district, photoUrl } = req.body;
        const poster = await Poster_js_1.Poster.findById(req.params.id);
        if (!poster) {
            res.status(404).json({ message: 'Poster not found' });
            return;
        }
        const template = await Template_js_1.Template.findById(poster.templateId);
        if (!template) {
            res.status(404).json({ message: 'Template not found' });
            return;
        }
        const newImageUrl = await (0, posterRenderer_js_1.generatePosterImage)({
            templateBgUrl: template.thumbnailUrl,
            caption: caption || poster.formData.caption,
            name: name || poster.formData.name,
            designation: designation || poster.formData.designation,
            party: party || poster.formData.party,
            district: district || poster.formData.district,
            photoUrl: photoUrl || poster.uploadedPhotoUrls[0],
        });
        poster.formData = {
            caption: caption || poster.formData.caption,
            name: name || poster.formData.name,
            designation: designation || poster.formData.designation,
            party: party || poster.formData.party,
            district: district || poster.formData.district,
        };
        poster.generatedImageUrl = newImageUrl;
        await poster.save();
        res.status(200).json({ message: 'Poster regenerated successfully', poster });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.regeneratePoster = regeneratePoster;
// Delete poster from history
const deletePoster = async (req, res) => {
    try {
        const poster = await Poster_js_1.Poster.findById(req.params.id);
        if (!poster) {
            res.status(404).json({ message: 'Poster not found' });
            return;
        }
        await poster.deleteOne();
        res.status(200).json({ message: 'Poster deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.deletePoster = deletePoster;
