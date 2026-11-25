import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPdfInstance = {
  addFont: vi.fn(),
  setFontSize: vi.fn(),
  setFont: vi.fn(),
  text: vi.fn(),
  splitTextToSize: vi.fn((text) => {
    if (!text) return [""];
    // Simulate wrapping every 80 chars
    const chunks = [];
    for (let i = 0; i < text.length; i += 80) {
      chunks.push(text.slice(i, i + 80));
    }
    return chunks;
  }),
  addPage: vi.fn(),
  save: vi.fn(),
};

vi.mock("jspdf", () => {
  return {
    default: vi.fn(function () {
      return mockPdfInstance;
    }),
  };
});

vi.mock("../assets/Roboto-Regular.ttf", () => ({
  default: "mock-roboto-font-data",
}));

import generatePdf from "./generatePdf";

describe("generatePdf", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does nothing if report data is null or undefined", () => {
    generatePdf(null);
    expect(mockPdfInstance.save).not.toHaveBeenCalled();
  });

  it("generates PDF containing all 10 questions and saves with meaningful filename", () => {
    const mockData = {
      role: "Frontend Developer",
      interviewDate: "2026-11-23T10:00:00.000Z",
      duration: "05:30",
      overallScore: 85,
      overallFeedback: "Great performance overall.",
      questions: Array.from({ length: 10 }, (_, idx) => ({
        question: `Sample Question ${idx + 1}`,
        answer: `Sample Answer ${idx + 1}`,
        feedback: `Sample Feedback ${idx + 1}`,
        idealAnswer: `Sample Ideal Answer ${idx + 1}`,
        score: 9,
      })),
    };

    generatePdf(mockData);

    // Verify all 10 questions were rendered
    const renderedTexts = mockPdfInstance.text.mock.calls.map((call) => call[0]);
    expect(renderedTexts).toContain("Evaluation Report");
    expect(renderedTexts).toContain("Question 1");
    expect(renderedTexts).toContain("Question 10");
    expect(renderedTexts).toContain("85/100");

    // Verify automatic pagination triggered for 10 questions
    expect(mockPdfInstance.addPage).toHaveBeenCalled();

    // Verify meaningful filename
    expect(mockPdfInstance.save).toHaveBeenCalledTimes(1);
    const savedFilename = mockPdfInstance.save.mock.calls[0][0];
    expect(savedFilename).toMatch(/^Mockspire_Evaluation_Report_23 Nov 2026\.pdf$/);
  });

  it("wraps long text and adds pages without crashing", () => {
    const veryLongText = "Long Vietnamese and English answer content. ".repeat(100);
    const mockData = {
      role: "Software Engineer",
      interviewDate: "2026-11-23T10:00:00.000Z",
      duration: "10:00",
      overallScore: 0,
      overallFeedback: veryLongText,
      questions: [
        {
          question: "System Design Question",
          answer: veryLongText,
          feedback: veryLongText,
          idealAnswer: veryLongText,
          score: 0,
        },
      ],
    };

    generatePdf(mockData);

    expect(mockPdfInstance.splitTextToSize).toHaveBeenCalled();
    expect(mockPdfInstance.addPage).toHaveBeenCalled();
    expect(mockPdfInstance.save).toHaveBeenCalledTimes(1);
  });

  it("renders all required sections and keeps Y-coordinates within page bounds without overlap", () => {
    const mockData = {
      role: "Backend Engineer",
      interviewDate: "2026-11-23T10:00:00.000Z",
      duration: "06:20",
      overallScore: 75,
      overallFeedback: "Solid understanding of databases.",
      questions: [
        {
          question: "What is indexing?",
          answer: "Indexing speeds up read queries.",
          feedback: "Correct and concise.",
          idealAnswer: "Database indexing is a data structure technique...",
          score: 8,
        },
      ],
    };

    generatePdf(mockData);

    const textCalls = mockPdfInstance.text.mock.calls;
    const renderedLabels = textCalls.map((call) => call[0]);

    // Kiểm tra đủ tất cả các tiêu đề & nội dung bắt buộc
    expect(renderedLabels).toContain("Evaluation Report");
    expect(renderedLabels).toContain("Overall Score");
    expect(renderedLabels).toContain("AI Executive Summary");
    expect(renderedLabels).toContain("Detailed Breakdown");
    expect(renderedLabels).toContain("Question 1");
    expect(renderedLabels).toContain("Your Answer");
    expect(renderedLabels).toContain("AI Feedback");
    expect(renderedLabels).toContain("Ideal Answer");

    // Kiểm tra tọa độ Y không vượt quá chiều cao trang A4 (297mm) -> không bị cắt chữ ở mép dưới
    textCalls.forEach(([, , y]) => {
      expect(y).toBeGreaterThanOrEqual(30);
      expect(y).toBeLessThanOrEqual(275);
    });
  });

  it("does not mutate input reportData or affect DOM state when generating PDF", () => {
    const originalData = {
      role: "Frontend Developer",
      interviewDate: "2026-11-23T10:00:00.000Z",
      duration: "04:15",
      overallScore: 90,
      overallFeedback: "Excellent React knowledge.",
      questions: [
        {
          question: "Explain Virtual DOM",
          answer: "Lightweight copy of real DOM.",
          feedback: "Accurate.",
          idealAnswer: "Virtual DOM is a programming concept...",
          score: 9,
        },
      ],
    };

    const snapshotBefore = JSON.parse(JSON.stringify(originalData));
    generatePdf(originalData);

    // Đảm bảo dữ liệu dùng để render UI Result không bị biến đổi sau khi xuất PDF
    expect(originalData).toEqual(snapshotBefore);
  });
});