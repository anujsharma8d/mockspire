const buildReportData = (result, role) => {
    const reportResult = result && typeof result === "object" ? result : {};
    const questions = Array.isArray(reportResult.questions) ? reportResult.questions : [];

    return {
        role: typeof role === "string" && role.trim() ? role.trim() : "Not specified",
        interviewDate: reportResult.createdAt ?? null,
        duration: reportResult.duration ?? null,
        overallScore: reportResult.overallScore ?? 0,
        overallFeedback: reportResult.overallFeedback ?? "",
        questions: questions.map((item) => ({
            question: item?.question ?? "",
            answer: item?.answer ?? "",
            feedback: item?.feedback ?? "",
            idealAnswer: item?.idealAnswer ?? "",
            score: item?.score ?? 0,
        })),
    };
};

export default buildReportData;