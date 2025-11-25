import React from 'react';
import { Hospital } from 'lucide-react';
import { ClinicSettings, Prescription, Patient, Doctor } from '../../types';

interface PrescriptionPDFProps {
    prescription: Prescription;
    patient: Patient;
    doctor: Doctor;
    clinicSettings: ClinicSettings;
}

const InfoRow: React.FC<{ label: string; value: string | number | undefined }> = ({ label, value }) => (
    <div className="flex items-start">
        <span className="font-semibold text-slate-600 w-24">{label}:</span>
        <span className="flex-1 text-slate-800">{value}</span>
    </div>
);

const PrescriptionPDF: React.FC<PrescriptionPDFProps> = ({ prescription, patient, doctor, clinicSettings }) => {
    return (
        <div id="print-area">
            <div className="p-8 max-w-2xl mx-auto my-10 font-serif bg-white shadow-lg border-t-4 border-blue-600" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                <header className="text-center mb-6 pb-4 border-b border-slate-300">
                    <div className="flex justify-center items-center mb-2">
                        {clinicSettings.logo ? (
                           <img src={clinicSettings.logo} alt="Clinic Logo" className="h-12 w-auto mr-3" />
                        ) : (
                           <Hospital size={32} className="text-blue-600 mr-2" />
                        )}
                        <h1 className="font-heading text-3xl font-bold text-slate-800" style={{fontFamily: "'Poppins', sans-serif"}}>{clinicSettings.name}</h1>
                    </div>
                    <p className="text-xs text-slate-600">{clinicSettings.address} | Phone: {clinicSettings.phone}</p>
                    <p className="text-sm font-semibold mt-4">{doctor.name}, {doctor.specialty}</p>
                </header>

                <section className="mb-6 border-b border-slate-300 pb-4 text-sm">
                     <div className="flex justify-between items-center">
                        <h2 className="text-base font-bold text-slate-700">Patient Details</h2>
                        <span className="text-sm text-slate-600">Date: {prescription.dateIssued}</span>
                     </div>
                    <div className="mt-2 space-y-1">
                        <InfoRow label="Patient Name" value={patient.name} />
                        <InfoRow label="Age / Gender" value={`${patient.age} / ${patient.gender}`} />
                    </div>
                </section>
                
                <section className="mt-2 min-h-[150px]">
                    <div className="text-6xl font-serif text-slate-700 -ml-2">
                        ℞
                    </div>
                    <div className="pl-8 space-y-4">
                        <div className="mt-2">
                            <p className="text-lg font-bold">{prescription.medicineName}</p>
                            <p className="text-base font-semibold text-slate-700">Quantity: {prescription.quantity}</p>
                        </div>

                        <div className="text-sm text-slate-800 space-y-2">
                           <p><span className="font-semibold">Dosage:</span> {prescription.dosage}</p>
                           <p><span className="font-semibold">Frequency:</span> {prescription.frequency}</p>
                           {prescription.instructions && (
                               <p><span className="font-semibold">Instructions:</span> {prescription.instructions}</p>
                           )}
                        </div>
                    </div>
                </section>
                
                <footer className="mt-12 pt-12">
                    <div className="flex justify-end">
                        <div className="w-2/5 text-center">
                            <div className="border-b-2 border-dotted border-slate-400 h-12"></div>
                            <p className="text-sm font-semibold text-slate-700 mt-2">
                                Dr. {doctor.name}'s Signature
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PrescriptionPDF;
