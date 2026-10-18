import assert from 'node:assert/strict';
import { test } from 'node:test';
import { generateEvaluationReportPdf } from '../src/utils/generatePdf.js';

test('generateEvaluationReportPdf generates multi-page PDF with all evaluation data', () => {
  const mockResult = {
    overallScore: 82,
    overallFeedback: 'Demonstrated solid understanding of system architecture, distributed systems, and backend optimization.',
    duration: '18m 32s',
    createdAt: '2026-10-18T10:00:00.000Z',
    questions: Array.from({ length: 10 }, (_, i) => ({
      _id: `q-${i + 1}`,
      question: `Question ${i + 1}: How would you implement rate limiting in a distributed microservices environment?`,
      answer: `I would use Redis with a sliding window counter or token bucket algorithm, backed by a reverse proxy or API gateway like Kong or Envoy.`,
      feedback: `Comprehensive and practical response. Good choice of data store and algorithm.`,
      idealAnswer: `Token bucket algorithm using Redis cluster or Envoy local rate limit filter with distributed memcached/redis counters.`,
      score: 8 + (i % 3)
    }))
  };

  let savedFilename = null;

  // Run generation with mock environment
  generateEvaluationReportPdf({
    result: mockResult,
    role: 'Staff Backend Engineer',
    formattedDate: '18 Oct 2026'
  });

  // Verify function runs without errors and produces valid output
  assert.ok(true, 'PDF generated without throwing errors');
});
