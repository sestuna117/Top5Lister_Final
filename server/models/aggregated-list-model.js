const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AggregatedTop5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [{ name: String, points: Number }], required: true },
        comments: { type: [[String, String]], required: true },
        views: { type: Number, required: true },
        likes: { type: [String], required: true },
        dislikes: { type: [String], required: true },
        updated: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('AggregatedTop5List', AggregatedTop5ListSchema)
