import { jsPDF } from "jspdf";

/**
 * Generates and downloads a clean, professional PDF evaluation report for Mockspire.
 *
 * @param {Object} params
 * @param {Object} params.result - Evaluation result data
 * @param {string} params.role - Interview role title
 * @param {string} params.formattedDate - Formatted interview date
 */
export const generateEvaluationReportPdf = ({ result, role, formattedDate }) => {
  if (!result) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2; // 178mm
  const bottomLimit = 275;
  let y = 16;

  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > bottomLimit) {
      doc.addPage();
      y = 20;
      return true;
    }
    return false;
  };

  const renderWrappedText = (text, x, currentY, maxWidth, lineHeight) => {
    if (!text) return currentY;
    const lines = doc.splitTextToSize(String(text).trim(), maxWidth);
    let curY = currentY;
    for (let i = 0; i < lines.length; i++) {
      if (curY + lineHeight > bottomLimit) {
        doc.addPage();
        curY = 20;
      }
      doc.text(lines[i], x, curY);
      curY += lineHeight;
    }
    return curY;
  };

  // ==========================================
  // TOP ACCENT & HEADER
  // ==========================================
  doc.setFillColor(0, 108, 73); // #006c49
  doc.rect(marginX, y, contentWidth, 2, "F");
  y += 8;

  // Brand Name & Tagline
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(5, 25, 22); // #051916
  doc.text("Mockspire", marginX, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(114, 120, 118); // #727876
  doc.text("AI-Powered Interview Practice & Feedback", marginX + 48, y);
  y += 7;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(5, 25, 22);
  doc.text("Interview Evaluation Report", marginX, y);
  y += 5;

  // ==========================================
  // METADATA BAR
  // ==========================================
  const metaHeight = 12;
  doc.setFillColor(248, 249, 255); // #f8f9ff
  doc.roundedRect(marginX, y, contentWidth, metaHeight, 1.5, 1.5, "F");
  doc.setDrawColor(194, 200, 197); // #c2c8c5
  doc.setLineWidth(0.2);
  doc.roundedRect(marginX, y, contentWidth, metaHeight, 1.5, 1.5, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(5, 25, 22);

  const col1X = marginX + 4;
  const col2X = marginX + 68;
  const col3X = marginX + 130;
  const metaTextY = y + 7.5;

  doc.text("Role:", col1X, metaTextY);
  doc.setFont("helvetica", "normal");
  doc.text(role || "Software Engineer", col1X + 11, metaTextY);

  doc.setFont("helvetica", "bold");
  doc.text("Date:", col2X, metaTextY);
  doc.setFont("helvetica", "normal");
  doc.text(formattedDate || "Recent", col2X + 11, metaTextY);

  doc.setFont("helvetica", "bold");
  doc.text("Duration:", col3X, metaTextY);
  doc.setFont("helvetica", "normal");
  doc.text(result.duration || "—", col3X + 17, metaTextY);

  y += metaHeight + 8;

  // ==========================================
  // OVERALL SCORE & EXECUTIVE SUMMARY
  // ==========================================
  const score = result.overallScore || 0;
  const scoreMessage =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Good"
      : score >= 40
      ? "Needs Improvement"
      : "Needs Work";

  const scoreBoxWidth = 52;
  const summaryBoxWidth = contentWidth - scoreBoxWidth - 6; // 120mm
  const summaryBoxX = marginX + scoreBoxWidth + 6;

  // Executive summary text calculation
  const summaryText = result.overallFeedback || "No executive summary available for this interview.";
  const summaryLines = doc.splitTextToSize(summaryText, summaryBoxWidth - 8);
  const calculatedSummaryHeight = Math.max(34, 14 + summaryLines.length * 4.5);
  const cardHeight = calculatedSummaryHeight;

  // Score Card
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(marginX, y, scoreBoxWidth, cardHeight, 2, 2, "F");
  doc.setDrawColor(194, 200, 197);
  doc.roundedRect(marginX, y, scoreBoxWidth, cardHeight, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(5, 25, 22);
  doc.text("Overall Score", marginX + 5, y + 8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(186, 26, 26); // #ba1a1a
  doc.text(`${score}`, marginX + 5, y + 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(66, 72, 70);
  doc.text(" / 100", marginX + 5 + doc.getTextWidth(`${score}`), y + 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(0, 108, 73);
  doc.text(scoreMessage.toUpperCase(), marginX + 5, y + 27);

  // Summary Card
  doc.setFillColor(248, 249, 255);
  doc.roundedRect(summaryBoxX, y, summaryBoxWidth, cardHeight, 2, 2, "F");
  doc.setDrawColor(194, 200, 197);
  doc.roundedRect(summaryBoxX, y, summaryBoxWidth, cardHeight, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(0, 108, 73);
  doc.text("AI Executive Summary", summaryBoxX + 5, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(66, 72, 70);

  let summaryY = y + 14;
  for (let i = 0; i < summaryLines.length; i++) {
    doc.text(summaryLines[i], summaryBoxX + 5, summaryY);
    summaryY += 4.5;
  }

  y += cardHeight + 10;

  // ==========================================
  // DETAILED BREAKDOWN
  // ==========================================
  checkPageBreak(25);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(5, 25, 22);
  doc.text("Detailed Breakdown", marginX, y);
  y += 6;

  const questions = result.questions || [];

  questions.forEach((item, index) => {
    checkPageBreak(35);

    // Question Header Box
    const qHeaderY = y;
    doc.setFillColor(240, 244, 255);
    doc.roundedRect(marginX, qHeaderY, contentWidth, 8, 1, 1, "F");
    doc.setDrawColor(194, 200, 197);
    doc.roundedRect(marginX, qHeaderY, contentWidth, 8, 1, 1, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(5, 25, 22);
    doc.text(`Question ${index + 1}`, marginX + 4, qHeaderY + 5.5);

    const qScoreText = `Score: ${item.score || 0}/10`;
    doc.setTextColor(147, 0, 10);
    doc.text(qScoreText, marginX + contentWidth - 4, qHeaderY + 5.5, { align: "right" });

    y += 12;

    // Question Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(5, 25, 22);
    y = renderWrappedText(item.question, marginX + 2, y, contentWidth - 4, 4.8);
    y += 4;

    // User Answer Block
    checkPageBreak(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(114, 120, 118);
    doc.text("YOUR ANSWER", marginX + 2, y);
    y += 4.5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(11, 28, 48);
    const userAnswerText = item.answer ? `"${item.answer}"` : "No answer provided.";
    y = renderWrappedText(userAnswerText, marginX + 4, y, contentWidth - 8, 4.5);
    y += 4;

    // AI Feedback Block
    checkPageBreak(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(114, 120, 118);
    doc.text("AI FEEDBACK", marginX + 2, y);
    y += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(66, 72, 70);
    const feedbackText = item.feedback || "No feedback available.";
    y = renderWrappedText(feedbackText, marginX + 4, y, contentWidth - 8, 4.5);
    y += 4;

    // Ideal Answer Block
    checkPageBreak(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(0, 108, 73);
    doc.text("IDEAL ANSWER", marginX + 2, y);
    y += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(66, 72, 70);
    const idealText = item.idealAnswer || "No ideal answer provided.";
    y = renderWrappedText(idealText, marginX + 4, y, contentWidth - 8, 4.5);
    y += 6;

    // Divider line between questions (except last)
    if (index < questions.length - 1) {
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 6;
    }
  });

  // ==========================================
  // FOOTER ON ALL PAGES
  // ==========================================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 14, marginX + contentWidth, pageHeight - 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(114, 120, 118);
    doc.text("Mockspire • Evaluation Report", marginX, pageHeight - 9);
    doc.text(`Page ${i} of ${totalPages}`, marginX + contentWidth, pageHeight - 9, {
      align: "right",
    });
  }

  // ==========================================
  // MEANINGFUL FILENAME & DOWNLOAD
  // ==========================================
  const sanitizedRole = (role || "interview")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const safeDate = formattedDate
    ? formattedDate.replace(/[^a-zA-Z0-9]+/g, "-")
    : "report";

  const filename = `Mockspire-Evaluation-${sanitizedRole}-${safeDate}.pdf`;
  doc.save(filename);
};
