import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook to stream question text with a natural conversational typewriter effect.
 * Remembers viewed questions so navigating back with "Previous" displays immediately.
 * Allows clicking to skip/instant-reveal.
 *
 * @param {string} fullText - Full question string
 * @param {string|number} questionId - Unique ID of the question
 * @param {Object} options - Configuration options
 * @returns {{ displayedText: string, isStreaming: boolean, skipStreaming: () => void }}
 */
export const useQuestionStream = (fullText = "", questionId = null, options = {}) => {
  const { wordDelayMs = 28, enabled = true } = options;

  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // Track already streamed question IDs so we don't re-stream on "Previous" or back-navigation
  const streamedIds = useRef(new Set());
  const timerRef = useRef(null);

  const skipStreaming = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDisplayedText(fullText || "");
    setIsStreaming(false);
    if (questionId) {
      streamedIds.current.add(questionId);
    }
  }, [fullText, questionId]);

  useEffect(() => {
    // Clear any active timer on update
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!fullText) {
      setDisplayedText("");
      setIsStreaming(false);
      return;
    }

    // If disabled or already streamed in this session, show immediately
    if (!enabled || (questionId && streamedIds.current.has(questionId))) {
      setDisplayedText(fullText);
      setIsStreaming(false);
      return;
    }

    // Split into tokens preserving whitespace (e.g., words and spaces)
    const tokens = fullText.split(/(\s+)/);
    let index = 0;
    let accumulated = "";

    setIsStreaming(true);
    setDisplayedText("");

    const step = () => {
      if (index < tokens.length) {
        accumulated += tokens[index];
        setDisplayedText(accumulated);
        index++;

        // Add a slight micro-pause after punctuation for natural cadence
        const lastToken = tokens[index - 1] || "";
        const isPunctuation = /[.?!,]$/.test(lastToken.trim());
        const delay = isPunctuation ? wordDelayMs + 40 : wordDelayMs;

        timerRef.current = setTimeout(step, delay);
      } else {
        setIsStreaming(false);
        if (questionId) {
          streamedIds.current.add(questionId);
        }
        timerRef.current = null;
      }
    };

    timerRef.current = setTimeout(step, wordDelayMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [fullText, questionId, wordDelayMs, enabled]);

  return {
    displayedText: displayedText || (isStreaming ? "" : fullText),
    isStreaming,
    skipStreaming
  };
};

export default useQuestionStream;
