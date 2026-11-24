import jsPDF from "jspdf";
import Roboto_Regular from "../assets/Roboto-Regular.ttf";

/* Create a new page if the content is not fit in a single page. */
const createNewPage = (pdf, yPosition) => {
    if (yPosition > 260) {
        pdf.addPage();
        yPosition = 40;
    }
    return yPosition;
};

/* Generate a new PDF file. */
const generatePdf = (data) => {
    if (!data) return;

    const pdf = new jsPDF({
        format: "a4",
        unit: "mm",
    });

    // Formatting the value of the Interview Date data
    const formattedDate = data.interviewDate
        ? new Date(data.interviewDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "N/A";

    pdf.addFont(Roboto_Regular, "roboto", "normal");
    const LINE_HEIGHT = 8;
    const QUESTION_DISTANCE = 10;

    /* App Name */
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Mockspire", 160, 40);

    /* Title */
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Evaluation Report", 20, 40);

    /* Interview Role, Date & Duration */
    pdf.setFontSize(14);
    pdf.setFont("roboto", "normal");
    pdf.text(`${data.role || "Not specified"} . ${formattedDate} . ${data.duration || "—"}`, 20, 50);

    /* Overall Score & AI Executive Summary title */
    pdf.setFont("helvetica", "bold");
    pdf.text("Overall Score", 20, 70);
    pdf.text("AI Executive Summary", 60, 70);

    /* Overall Score */
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`${data.overallScore ?? 0}/100`, 20, 80);

    /* AI Executive Summary */
    let yPosition = 80;
    pdf.setFont("roboto", "normal");
    const overallFeedbackMaxWidth = 130;
    const overallFeedbackSplitText = pdf.splitTextToSize(
        data.overallFeedback || "",
        overallFeedbackMaxWidth
    );
    overallFeedbackSplitText.forEach((line) => {
        yPosition = createNewPage(pdf, yPosition);
        pdf.text(line, 60, yPosition);
        yPosition += LINE_HEIGHT;
    });

    /* Detailed Breakdown title */
    yPosition = Math.max(yPosition + 10, 140);
    yPosition = createNewPage(pdf, yPosition);
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Detailed Breakdown", 20, yPosition);

    /* For each question, display it on PDF with the same template. */
    const questionMaxWidth = 170;
    yPosition += 10;
    const questions = Array.isArray(data.questions) ? data.questions : [];

    questions.forEach((quest, index) => {
        /* Question number & score */
        yPosition = createNewPage(pdf, yPosition);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Question ${index + 1}`, 20, yPosition);
        pdf.text(`${quest.score ?? 0}/10`, 180, yPosition);
        yPosition += LINE_HEIGHT;

        /* Question content */
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        const questionSplitText = pdf.splitTextToSize(`${quest.question || ""}`, questionMaxWidth);
        questionSplitText.forEach((line) => {
            yPosition = createNewPage(pdf, yPosition);
            pdf.text(line, 20, yPosition);
            yPosition += LINE_HEIGHT;
        });

        yPosition += LINE_HEIGHT;
        /* Your Answer */
        // Title
        yPosition = createNewPage(pdf, yPosition);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Your Answer", 20, yPosition);
        yPosition += LINE_HEIGHT;

        // Content
        pdf.setFontSize(12);
        pdf.setFont("roboto", "normal");
        const yourAnswerSplitText = pdf.splitTextToSize(`${quest.answer || ""}`, questionMaxWidth);
        yourAnswerSplitText.forEach((line) => {
            yPosition = createNewPage(pdf, yPosition);
            pdf.text(line, 20, yPosition);
            yPosition += LINE_HEIGHT;
        });

        yPosition += LINE_HEIGHT;
        /* AI Feedback */
        // Title
        yPosition = createNewPage(pdf, yPosition);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("AI Feedback", 20, yPosition);
        yPosition += LINE_HEIGHT;

        // Content
        pdf.setFontSize(12);
        pdf.setFont("roboto", "normal");
        const aiFeedbackSplitText = pdf.splitTextToSize(`${quest.feedback || ""}`, questionMaxWidth);
        aiFeedbackSplitText.forEach((line) => {
            yPosition = createNewPage(pdf, yPosition);
            pdf.text(line, 20, yPosition);
            yPosition += LINE_HEIGHT;
        });

        yPosition += LINE_HEIGHT;
        /* Ideal Answer */
        // Title
        yPosition = createNewPage(pdf, yPosition);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Ideal Answer", 20, yPosition);
        yPosition += LINE_HEIGHT;

        // Content
        pdf.setFontSize(12);
        pdf.setFont("roboto", "normal");
        const idealAnswerSplitText = pdf.splitTextToSize(`${quest.idealAnswer || ""}`, questionMaxWidth);
        idealAnswerSplitText.forEach((line) => {
            yPosition = createNewPage(pdf, yPosition);
            pdf.text(line, 20, yPosition, { align: "justify" });
            yPosition += LINE_HEIGHT;
        });
        yPosition += QUESTION_DISTANCE;
    });

    pdf.save(`Mockspire_Evaluation_Report_${formattedDate}.pdf`);
};

export default generatePdf;