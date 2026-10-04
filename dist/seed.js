"use strict";
//As noted in my task spec, since the admin panel UI is deferred, we will seed 2–3 initial Bangladeshi political poster templates via a seed script so my website immediately has templates to display.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = require("./config/db.js");
const Template_js_1 = require("./models/Template.js");
dotenv_1.default.config();
const seedTemplates = async () => {
    try {
        await (0, db_js_1.connectDB)();
        await Template_js_1.Template.deleteMany(); // Clear existing templates
        const sampleTemplates = [
            {
                title: 'মহান বিজয় দিবস স্পেশাল',
                occasionType: 'বিজয় দিবস',
                thumbnailUrl: 'https://via.placeholder.com/400x600.png?text=Bijoy+Dibosh+Template',
                layoutConfig: {
                    colorScheme: ['#006a4e', '#f42a41', '#ffffff'],
                    photoSlots: 2,
                    textSlots: ['headline', 'name', 'designation', 'party']
                },
                isActive: true
            },
            {
                title: 'নির্বাচনী প্রচারণামূলক পোস্টার',
                occasionType: 'নির্বাচনী প্রচার',
                thumbnailUrl: 'https://via.placeholder.com/400x600.png?text=Election+Campaign+Template',
                layoutConfig: {
                    colorScheme: ['#006a4e', '#d4a017', '#ffffff'],
                    photoSlots: 3,
                    textSlots: ['headline', 'name', 'designation', 'district']
                },
                isActive: true
            },
            {
                title: 'শোক ও স্মরণ সভা পোস্টার',
                occasionType: 'শোক/স্মরণ',
                thumbnailUrl: 'https://via.placeholder.com/400x600.png?text=Memorial+Template',
                layoutConfig: {
                    colorScheme: ['#343a40', '#6c757d', '#ffffff'],
                    photoSlots: 1,
                    textSlots: ['headline', 'name', 'designation']
                },
                isActive: true
            }
        ];
        await Template_js_1.Template.insertMany(sampleTemplates);
        console.log('Templates Seeded Successfully!');
        process.exit();
    }
    catch (error) {
        console.error('Error seeding templates:', error);
        process.exit(1);
    }
};
seedTemplates();
