import React from 'react';
import { Hospital } from 'lucide-react';
import { ClinicSettings } from '../../types';

interface AppointmentTicketProps {
    appointment: any;
    clinicSettings: ClinicSettings;
}

const InfoRow: React.FC<{ label: string; value: string | number | undefined }> = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b border-slate-200">
        <span className="font-semibold text-slate-600">{label}:</span>
        <span className="text-slate-800 text-right">{value}</span>
    </div>
);

const AppointmentTicket: React.FC<AppointmentTicketProps> = ({ appointment, clinicSettings }) => {
    const fee = appointment.consultationFee || 0;
    const gstRate = clinicSettings.gstRate || 0;
    const gstAmount = (fee * gstRate) / 100;
    const totalAmount = fee + gstAmount;

    return (
        <div id="print-area">
            <div className="p-8 border-2 border-slate-300 rounded-lg max-w-2xl mx-auto my-10 font-sans bg-white shadow-lg">
                <header className="flex justify-between items-start pb-4 border-b-2 border-slate-300">
                    <div className="flex items-center">
                         {clinicSettings.logo ? (
                           <img src={clinicSettings.logo} alt="Clinic Logo" className="h-14 w-auto mr-4" />
                        ) : (
                           <Hospital size={40} className="text-blue-600 mr-3" />
                        )}
                        <div>
                            <h1 className="font-heading text-3xl font-bold text-slate-800">{clinicSettings.name}</h1>
                            <p className="text-xs text-slate-500 max-w-xs">{clinicSettings.address}</p>
                            <p className="text-xs text-slate-500">GSTIN: {clinicSettings.gstNumber}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="font-heading text-xl font-bold text-slate-600">APPOINTMENT</h2>
                        <p className="text-sm text-slate-500 font-mono">#{appointment.appointmentNumber}</p>
                    </div>
                </header>

                <section className="my-6">
                    <h3 className="font-semibold text-slate-500 uppercase text-sm mb-2">Appointment Details</h3>
                    <div className="space-y-1 text-sm">
                        <InfoRow label="Patient Name" value={appointment.patientName} />
                        <InfoRow label="Age" value={appointment.patientAge} />
                        <InfoRow label="Doctor" value={appointment.doctorName} />
                        <InfoRow label="Department" value={appointment.departmentName} />
                        <InfoRow label="Date & Time" value={`${appointment.date} at ${appointment.time}`} />
                        <InfoRow label="Reason" value={appointment.reason || 'Not specified'} />
                    </div>
                </section>
                
                <section className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="font-semibold text-slate-500 uppercase text-sm mb-2">Billing Details</h3>
                    <div className="max-w-xs ml-auto space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Consultation Fee:</span>
                            <span className="font-medium text-slate-800">₹{fee.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-slate-600">GST ({gstRate}%):</span>
                            <span className="font-medium text-slate-800">₹{gstAmount.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between border-t-2 border-slate-300 pt-2 mt-2 font-bold text-base">
                            <span className="text-slate-800">Total Amount:</span>
                            <span className="text-blue-600">₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </section>

                <footer className="mt-12 pt-6 border-t border-slate-300 text-center">
                     <p className="text-sm text-slate-600">Thank you for choosing {clinicSettings.name}!</p>
                     <p className="text-xs text-slate-400 mt-1">
                        {clinicSettings.phone} | {clinicSettings.email}
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default AppointmentTicket;
