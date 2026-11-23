import React from "react";
import jsPDF from "jspdf";
import Roboto_Regular from "../assets/Roboto-Regular.ttf"

/* Create a new page if the content is not fit in a single page. */
const createNewPage = (pdf, yPosition) => {
    if (yPosition > 260) {
        pdf.addPage();
        yPosition = 40;
    }
    return pdf, yPosition;
}

/* Generate a new PDF file. */
const generatePdf = (data) => {
    const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
    });

    // Formatting the value of the Interview Date data
    const formattedDate = new Date(data.interviewDate).toLocaleDateString(
        "en-IN",
        {
        day: "2-digit",
        month: "short",
        year: "numeric"
        }
    )

    pdf.addFont(Roboto_Regular, "roboto", "normal");
    const LINE_HEIGHT = 8;
    const QUESTION_DISTANCE = 10;

    /* App Name */
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Mockspire', 160, 40);
    
    /* Title */
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Evaluation Report', 20, 40);

    /* Interview Role, Date & Duration */
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${data.role} . ${formattedDate} . ${data.duration}`, 20, 50)
    
    /* Overall Score & AI Executive Summary title */
    pdf.setFont('helvetica', 'bold');
    pdf.text('Overall Score', 20, 70);
    pdf.text('AI Executive Summary', 60, 70);

    /* Overall Score */
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(`${data.overallScore}/100`, 20, 80);
    
    /* AI Executive Summary */
    let yPosition = 80;
    const overallFeedbackMaxWidth = 130;
    const overallFeedbackSplitText = pdf.splitTextToSize(data.overallFeedback, overallFeedbackMaxWidth);
    overallFeedbackSplitText.forEach((line) => {
        pdf, yPosition = createNewPage(pdf, yPosition)
        pdf.text(line, 60, yPosition);
        yPosition += LINE_HEIGHT;
    });

    /* Detailed Breakdown title */
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Detailed Breakdown', 20, 140);

    /* For each question, display it on PDF with the same template. */
    const questionMaxWidth = 170;
    yPosition = 150;
    data.questions.map((quest, index) => {
        /* Question number & score */
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Question ${index + 1}`, 20, yPosition);
        pdf.text(`${quest.score}/10`, 180, yPosition);
        yPosition += LINE_HEIGHT;

        /* Question content */
        pdf.setFontSize(12);
        pdf.setFont('roboto', 'normal');
        const questionSplitText = pdf.splitTextToSize(`${quest.question}`, questionMaxWidth);
        questionSplitText.forEach((line) => {
            pdf, yPosition = createNewPage(pdf, yPosition);
            pdf.text(line, 20, yPosition);
            yPosition += LINE_HEIGHT;
        })

        yPosition += LINE_HEIGHT;
        /* Your Answer */
        // Title
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Your Answer', 20, yPosition);
        yPosition += LINE_HEIGHT;

        // Content
        pdf.setFontSize(12);
        pdf.setFont('roboto', 'normal');
        const yourAnswerSplitText = pdf.splitTextToSize(`${quest.answer}`, questionMaxWidth);
        yourAnswerSplitText.forEach((line) => {
            pdf, yPosition = createNewPage(pdf, yPosition);
            pdf.text(line, 20, yPosition);
            yPosition += LINE_HEIGHT;
        })

        yPosition += LINE_HEIGHT;
        /* AI Feedback */
        // Title
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('AI Feedback', 20, yPosition);
        yPosition += LINE_HEIGHT;
        
        // Content
        pdf.setFontSize(12);
        pdf.setFont('roboto', 'normal');
        const aiFeedbackSplitText = pdf.splitTextToSize(`${quest.feedback}`, questionMaxWidth);
        aiFeedbackSplitText.forEach((line) => {
            pdf, yPosition = createNewPage(pdf, yPosition)
            pdf.text(line, 20, yPosition);
            yPosition += LINE_HEIGHT;
        })

        yPosition += LINE_HEIGHT;
        /* Ideal Answer */
        // Title
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Ideal Answer', 20, yPosition)
        yPosition += LINE_HEIGHT;

        // Content
        pdf.setFontSize(12);
        pdf.setFont('roboto', 'normal');
        const idealAnswerSplitText = pdf.splitTextToSize(`${quest.idealAnswer}`, questionMaxWidth);
        idealAnswerSplitText.forEach((line) => {
            pdf, yPosition = createNewPage(pdf, yPosition)
            pdf.text(line, 20, yPosition, {align: "justify"});
            yPosition += LINE_HEIGHT;
        })
        yPosition += QUESTION_DISTANCE;
    })

    pdf.save(`Mockspire_Evaluation_Report_${formattedDate}.pdf`);
}

export default generatePdf;