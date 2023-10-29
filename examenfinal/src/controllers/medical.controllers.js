import MedicalRecord from "../models/MedicalRecord.js";

export const renderMedicalRecordForm = (req, res) => res.render("medical/new-medical-record");

export const createNewMedicalRecord = async (req, res) => {
  const { nombre, edad, telefono, direccion, diagnostico, observaciones } = req.body;
  const errors = [];
  if (!nombre) {
    errors.push({ text: "Por favor, ingrese un nombre." });
  }
  if (!edad) {
    errors.push({ text: "Por favor, ingrese una edad." });
  }
  if (!telefono) {
    errors.push({ text: "Por favor, ingrese un número de teléfono." });
  }
  if (!direccion) {
    errors.push({ text: "Por favor, ingrese una dirección." });
  }
  if (!diagnostico) {
    errors.push({ text: "Por favor, ingrese un diagnóstico." });
  }
  if (errors.length > 0) {
    return res.render("medical/new-medical-record", {
      errors,
      nombre,
      edad,
      telefono,
      direccion,
      diagnostico,
      observaciones,
    });
  }

  const newMedicalRecord = new MedicalRecord({ nombre, edad, telefono, direccion, diagnostico, observaciones });
  newMedicalRecord.user = req.user.id;
  await newMedicalRecord.save();
  req.flash("success_msg", "Ficha médica agregada exitosamente");
  res.redirect("/medical-records");
};

export const renderMedicalRecords = async (req, res) => {
  const medicalRecords = await MedicalRecord.find({ user: req.user.id })
    .sort({ createdAt: "desc" })
    .lean();
  res.render("medical/all-medical-records", { medicalRecords });
};

export const renderEditForm = async (req, res) => {
  const medicalRecord = await MedicalRecord.findById(req.params.id).lean();
  if (medicalRecord.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/medical-records");
  }
  res.render("medical/edit-medical-record", { medicalRecord });
};


export const updateMedicalRecord = async (req, res) => {
  const { nombre, edad, telefono, direccion, diagnostico, observaciones } = req.body;
  await MedicalRecord.findByIdAndUpdate(req.params.id, { nombre, edad, telefono, direccion, diagnostico, observaciones });
  req.flash("success_msg", "Ficha médica actualizada exitosamente");
  res.redirect("/medical-records");
};

export const deleteMedicalRecord = async (req, res) => {
  await MedicalRecord.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Ficha médica eliminada exitosamente");
  res.redirect("/medical-records");
};
