import React, { useMemo } from 'react';
import { Doctor, Appointment, Prescription, LabReport, PrescriptionStatus, LabReportStatus, PaymentStatus } from '../../types';
import { Stethoscope } from 'lucide-react';

interface DoctorPerformanceProps {
    doctors: Doctor[];
    appointments: Appointment[];
    prescriptions: Prescription[];
    labReports: LabReport[];
}

const DoctorPerformance: React.FC<DoctorPerformanceProps> = ({ doctors, appointments, prescriptions, labReports }) => {

    const performanceData = useMemo(() => {
        const data = doctors.map(doctor => {
            // Consultation Revenue (only from paid appointments)
            const doctorAppointments = appointments.filter(apt => apt.doctorId === doctor.id);
            const consultationRevenue = doctorAppointments
                .filter(apt => apt.paymentStatus === PaymentStatus.Paid)
                .reduce((sum, apt) => sum + apt.consultationFee, 0);
            
            // Prescription Revenue
            const rxRevenue = prescriptions
                .filter(p => p.doctorId === doctor.id && p.status === PrescriptionStatus.Fulfilled && p.paymentStatus === PaymentStatus.Paid)
                .reduce((sum, p) => sum + (p.totalAmount || 0), 0);

            // Lab Revenue
            const labRevenue = labReports
                .filter(r => r.doctorId === doctor.id && r.status === LabReportStatus.Completed && r.paymentStatus === PaymentStatus.Paid)
                .reduce((sum, r) => sum + (r.testFee || 0), 0);

            const totalRevenue = consultationRevenue + rxRevenue + labRevenue;

            return {
                ...doctor,
                appointmentCount: doctorAppointments.length, // Total appointments for workload metric
                consultationRevenue,
                rxRevenue,
                labRevenue,
                totalRevenue
            };
        });

        const maxRevenue = Math.max(...data.map(d => d.totalRevenue), 0);

        return data
            .sort((a, b) => b.totalRevenue - a.totalRevenue)
            .map(d => ({ ...d, performancePercent: maxRevenue > 0 ? (d.totalRevenue / maxRevenue) * 100 : 0 }));

    }, [doctors, appointments, prescriptions, labReports]);

    return (
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200/80 shadow-smooth">
            <h3 className="font-heading text-lg font-semibold text-slate-700 mb-4 flex items-center">
                <Stethoscope size={20} className="mr-2 text-blue-600" />
                Doctor Performance &amp; Revenue
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-sm text-slate-700 bg-slate-100">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-semibold">Doctor</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-center hidden sm:table-cell">Appointments</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-right">Consult.</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-right">Rx</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-right hidden md:table-cell">Lab</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-right">Total Revenue</th>
                            <th scope="col" className="px-6 py-4 font-semibold">Performance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {performanceData.map(doctor => (
                            <tr key={doctor.id} className="hover:bg-slate-50">
                                <td className="px-6 py-5 font-medium text-slate-900">
                                    <div className="flex flex-col">
                                        <span>{doctor.name}</span>
                                        <span className="text-xs text-slate-500">{doctor.specialty}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center font-semibold text-slate-700 hidden sm:table-cell">{doctor.appointmentCount}</td>
                                <td className="px-6 py-5 text-right text-slate-600">₹{doctor.consultationRevenue.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-5 text-right text-slate-600">₹{doctor.rxRevenue.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-5 text-right text-slate-600 hidden md:table-cell">₹{doctor.labRevenue.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-5 text-right font-semibold text-green-600">₹{doctor.totalRevenue.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-5">
                                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full" 
                                            style={{ width: `${doctor.performancePercent}%` }}
                                            title={`₹${doctor.totalRevenue.toLocaleString('en-IN')}`}
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorPerformance;