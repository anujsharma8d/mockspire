/**
 * Utility to execute Gemini API calls with exponential backoff and jitter.
 * Automatically retries on rate limits (429), model overload (503), and transient network errors.
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Determines if an error is transient/retryable
 * @param {Error} err
 * @returns {boolean}
 */
const isRetryableError = (err) => {
    if (!err) return false;

    const status = err.status || err.statusCode || (err.response && err.response.status);
    const message = (err.message || "").toLowerCase();

    // 429: Too Many Requests / Quota Exceeded / Resource Exhausted
    if (status === 429 || message.includes("429") || message.includes("quota") || message.includes("resource_exhausted") || message.includes("rate limit")) {
        return true;
    }

    // 503 / 500 / Overloaded
    if (status === 503 || status === 502 || status === 500 || message.includes("503") || message.includes("overloaded") || message.includes("unavailable") || message.includes("internal error")) {
        return true;
    }

    // Network / Socket issues
    if (message.includes("timeout") || message.includes("econnreset") || message.includes("econnrefused") || message.includes("fetch failed") || message.includes("socket hang up")) {
        return true;
    }

    return false;
};

/**
 * Calls a Gemini API function with exponential backoff retry
 * @param {Function} apiCallFn - Async function returning the API response
 * @param {Object} options - Retry configuration
 * @returns {Promise<any>}
 */
const callGeminiWithRetry = async (apiCallFn, options = {}) => {
    const {
        maxRetries = 3,
        baseDelayMs = 1000,
        maxDelayMs = 5000,
        label = "Gemini API"
    } = options;

    let lastError;

    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
        try {
            return await apiCallFn();
        } catch (err) {
            lastError = err;
            const retryable = isRetryableError(err);

            if (!retryable || attempt > maxRetries) {
                console.error(`[${label}] Failed on attempt ${attempt}/${maxRetries + 1} (retryable: ${retryable}):`, err.message);
                throw err;
            }

            // Exponential backoff with random jitter: baseDelay * 2^(attempt-1) + jitter
            const exponentialDelay = baseDelayMs * Math.pow(2, attempt - 1);
            const jitter = Math.floor(Math.random() * 400);
            const delay = Math.min(maxDelayMs, exponentialDelay) + jitter;

            console.warn(`[${label}] High traffic / rate limit encountered (${err.message.slice(0, 80)}...). Retrying attempt ${attempt}/${maxRetries} in ${delay}ms...`);
            await sleep(delay);
        }
    }

    throw lastError;
};

module.exports = {
    callGeminiWithRetry,
    isRetryableError
};
