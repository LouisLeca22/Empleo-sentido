import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Por favor, añade una empresa"],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "Por favor, añade un puesto"]
    },
    status: {
        type: String,
        enum: ["entrevista", "rechazado", "pendiente"],
        maxlength: 100,
        default: "pendiente"
    },
    jobType: {
        type: String,
        enum: ["tiempo completo", "tiempo parcial", "remoto", "prácticas"],
        default: "tiempo completo"
    },
    jobLocation: {
        type: String,
        default: "mi ciudad",
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Por favor, proporcione un usuario"]
    }
}, {timestamps: true})


export default mongoose.model("Job", JobSchema)