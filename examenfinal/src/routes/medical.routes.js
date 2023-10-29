import { Router } from "express";
import {
  renderMedicalRecordForm,
  createNewMedicalRecord,
  renderMedicalRecords,
  renderEditForm,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "../controllers/medical.controllers.js"; 
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// Nueva ficha médica
router.get("/medical/add", isAuthenticated, renderMedicalRecordForm);
router.post("/medical/new-medical-record", isAuthenticated, createNewMedicalRecord);

// Obtener todas las fichas médicas
router.get("/medical-records", isAuthenticated, renderMedicalRecords);

// Editar ficha médica
router.get("/medical/edit/:id", isAuthenticated, renderEditForm);
router.put("/medical/edit-medical-record/:id", isAuthenticated, updateMedicalRecord);

// Eliminar ficha médica
router.delete("/medical/delete/:id", isAuthenticated, deleteMedicalRecord);

export default router;
