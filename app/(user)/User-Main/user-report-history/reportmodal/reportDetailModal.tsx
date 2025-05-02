// file: user-report-history/reportmodal/ReportDetailModal.tsx
'use client';

import React from 'react';

interface Report {
    id: string;
    title: string;
    description: string;
    type: string;
    location: string;
    date: string;
    status: string;
    image?: string;
}

interface ReportDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    report: Report;
}

export default function ReportDetailModal({ isOpen, onClose, report }: ReportDetailModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
                <p className="text-gray-700 mb-2"><strong>Type:</strong> {report.type}</p>
                <p className="text-gray-700 mb-2"><strong>Location:</strong> {report.location}</p>
                <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(report.date).toLocaleString()}</p>
                <p className="text-gray-700 mb-2"><strong>Status:</strong> {report.status}</p>
                <p className="text-gray-700"><strong>Description:</strong> {report.description}</p>
                {report.image && (
                    <img src={report.image} alt="Report" className="mt-4 rounded max-h-64 object-cover w-full" />
                )}
            </div>
        </div>
    );
}
