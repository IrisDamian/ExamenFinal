import mongoose from "mongoose";

const MedicalRecordSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    edad: {
      type: Number,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    diagnostico: {
      type: String,
      required: true,
    },
    observaciones: {
      type: String,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MedicalRecord", MedicalRecordSchema);
