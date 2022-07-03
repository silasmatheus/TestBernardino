import mongoose from "../../database/index.js"

const CollaboratorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
    },
    salary: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean, 
        default: true
    },
    birthDate: {
        type: Date,
        required: false
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Areas",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Collaborator = mongoose.model("Collaborators", CollaboratorSchema);

export default Collaborator;