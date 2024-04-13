import mongoose from "mongoose";

const DetailsSchema = new mongoose.Schema({
        name: { type: String },
        clg: { type: String },
        branch: { type: String },
        password: { type: String, required: true },
        year: { type: String },
        tech: { type: String },
        activeDays: { type: Number, default: 0 },
        totalDays: { type: Number, default: 0 },
        currentStreak: { type: Number, default: 0 },
        bestStreak: { type: Number, default: 0 },
        highestStreak: { type: Number, default: 0 },
        totalProbs: { type: Number, default: 300 },
        solvedProbs: { type: Number, default: 0 },
        easyTotal: { type: Number, default: 150 },
        easySolved: { type: Number, default: 0 },
        mediumTotal: { type: Number, default: 100 },
        mediumSolved: { type: Number, default: 0 },
        hardTotal: { type: Number, default: 50 },
        hardSolved: { type: Number, default: 0 },
        calendarData: [
        {
                date: { type: String },
                count: { type: Number, default: 0 }
        }
        ],
        username: { type: String, required: true, unique: true }
})

export default mongoose.model('userData',DetailsSchema)

