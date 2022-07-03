import mongoose from "../../database/index.js"

const AreaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Area = mongoose.model("Areas", AreaSchema);

export default Area;