import { describe, it, expect } from "vitest";
import buildReportData from "./buildReportData";

describe("buildReportData", () => {
  it("maps complete interview result with all 10 questions", () => {
    const mockQuestions = Array.from({ length: 10 }, (_, idx) => ({
      question: `Question ${idx + 1}`,
      answer: `User answer ${idx + 1}`,
      feedback: `AI feedback ${idx + 1}`,
      idealAnswer: `Ideal answer ${idx + 1}`,
      score: 8,
    }));

    const mockResult = {
      createdAt: "2026-11-23T10:00:00.000Z",
      duration: "04:15",
      overallScore: 80,
      overallFeedback: "Strong technical foundation.",
      questions: mockQuestions,
    };

    const report = buildReportData(mockResult, "Frontend Developer");

    expect(report.role).toBe("Frontend Developer");
    expect(report.interviewDate).toBe("2026-11-23T10:00:00.000Z");
    expect(report.duration).toBe("04:15");
    expect(report.overallScore).toBe(80);
    expect(report.overallFeedback).toBe("Strong technical foundation.");
    expect(report.questions).toHaveLength(10);
    expect(report.questions[9].question).toBe("Question 10");
  });

  it("preserves zero scores without falling back to default values", () => {
    const mockResult = {
      overallScore: 0,
      questions: [
        {
          question: "Explain closures",
          answer: "",
          feedback: "No answer given",
          idealAnswer: "A closure is...",
          score: 0,
        },
      ],
    };

    const report = buildReportData(mockResult, "Backend Developer");

    expect(report.overallScore).toBe(0);
    expect(report.questions[0].score).toBe(0);
  });

  it("handles missing or empty data gracefully", () => {
    const report = buildReportData(null, "   ");

    expect(report.role).toBe("Not specified");
    expect(report.interviewDate).toBeNull();
    expect(report.duration).toBeNull();
    expect(report.overallScore).toBe(0);
    expect(report.overallFeedback).toBe("");
    expect(report.questions).toEqual([]);
  });

  it("handles missing idealAnswer and long user answers", () => {
    const longAnswer = "A".repeat(1500);
    const mockResult = {
      overallScore: 65,
      questions: [
        {
          question: "Describe REST APIs",
          answer: longAnswer,
          feedback: "Good explanation",
        },
      ],
    };

    const report = buildReportData(mockResult, "Fullstack Engineer");

    expect(report.questions[0].answer).toBe(longAnswer);
    expect(report.questions[0].idealAnswer).toBe("");
  });
});