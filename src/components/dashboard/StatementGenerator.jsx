'use client';

import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const StatementGenerator = ({ transactions, userName, accountId }) => {

    const generatePDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(0, 255, 136); // #00ff88
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(22);
        doc.text('NATURAL BANK', 20, 25);
        doc.setFontSize(12);
        doc.text('Premium Account Statement', 140, 25);

        // User Details
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(`Account Holder: ${userName}`, 20, 50);
        doc.text(`Account Number: ${accountId}`, 20, 56);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 50);

        // Table
        const tableColumn = ["Date", "Description", "Type", "Amount (INR)"];
        const tableRows = [];

        transactions.forEach(txn => {
            const txnData = [
                new Date(txn.createdAt).toLocaleDateString(),
                txn.description,
                txn.type.toUpperCase(),
                txn.amount.toLocaleString()
            ];
            tableRows.push(txnData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 65,
            theme: 'grid',
            headStyles: { fillColor: [0, 0, 0], textColor: [0, 255, 136] },
            alternateRowStyles: { fillColor: [240, 240, 240] }
        });

        // Footer
        doc.setFontSize(10);
        doc.text('Thank you for banking with Natural Bank.', 20, doc.lastAutoTable.finalY + 20);

        doc.save(`statement_${accountId}.pdf`);
    };

    return (
        <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-[#00ff88] transition-colors border border-[#00ff88]/20"
        >
            <span>📄</span> Download Statement
        </button>
    );
};

export default StatementGenerator;
