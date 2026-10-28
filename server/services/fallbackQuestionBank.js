/**
 * High-quality fallback question bank used when LLM API is rate-limited,
 * overloaded (429/503), or experiencing excessive traffic spikes.
 */

const FALLBACK_BANK = {
    // -------------------------------------------------------------------------
    // FRONTEND DEVELOPER
    // -------------------------------------------------------------------------
    "Frontend Developer": {
        "Technical": {
            "Easy": [
                { question: "What is the difference between let, const, and var in modern JavaScript?", topic: "JavaScript Variables" },
                { question: "Can you explain the CSS box model and how box-sizing: border-box affects it?", topic: "CSS Box Model" },
                { question: "What are React props and how do they differ from state?", topic: "React Fundamentals" },
                { question: "How does event bubbling work in the DOM and how can you stop it?", topic: "DOM Events" },
                { question: "What is the purpose of semantic HTML tags like article, section, and nav?", topic: "HTML Semantics" }
            ],
            "Medium": [
                { question: "How does the virtual DOM work in React, and how does reconciliation optimize UI updates?", topic: "React Virtual DOM" },
                { question: "Explain the purpose of the useEffect dependency array and how to properly clean up side effects.", topic: "React Hooks" },
                { question: "What are closures in JavaScript, and what is a practical use case where you have used one?", topic: "JavaScript Closures" },
                { question: "How would you optimize the loading and rendering performance of a heavy React web application?", topic: "Web Performance" },
                { question: "Explain the difference between client-side rendering (CSR) and server-side rendering (SSR) in modern web frameworks.", topic: "Rendering Strategies" }
            ],
            "Hard": [
                { question: "How does React Fiber architecture work under the hood to enable concurrent rendering and prioritization?", topic: "React Internals" },
                { question: "How would you design a custom caching and state synchronization layer in a complex single-page application without third-party stores?", topic: "State Architecture" },
                { question: "Explain JavaScript microtasks vs macrotasks in the event loop, and how Promise execution differs from setTimeout.", topic: "Event Loop" },
                { question: "How do you detect, debug, and eliminate memory leaks caused by detached DOM nodes and event listeners in React apps?", topic: "Memory Management" },
                { question: "How would you implement micro-frontends in a large enterprise application and handle shared dependencies and cross-app communication?", topic: "Micro-frontends" }
            ]
        },
        "System Design": {
            "Easy": [
                { question: "How would you structure components and folders for a medium-sized React dashboard application?", topic: "Component Architecture" },
                { question: "How do you handle API error states and loading states consistently across a web application?", topic: "API Integration" }
            ],
            "Medium": [
                { question: "Design an infinite-scrolling image feed like Pinterest or Instagram, focusing on performance, DOM node recycling, and image lazy-loading.", topic: "Infinite Scroll Architecture" },
                { question: "How would you architect a real-time collaborative form where multiple users edit fields simultaneously?", topic: "Real-time Collaboration" },
                { question: "Design an autocomplete search component that handles debouncing, request cancellation, and local LRU caching.", topic: "Search Component Design" }
            ],
            "Hard": [
                { question: "Design a web-based code editor and live preview sandbox similar to CodeSandbox or CodePen, ensuring security and isolation.", topic: "Complex Web Apps" },
                { question: "Architect an offline-first Progressive Web Application with bidirectional background synchronization and conflict resolution.", topic: "Offline Architecture" }
            ]
        }
    },

    // -------------------------------------------------------------------------
    // BACKEND DEVELOPER
    // -------------------------------------------------------------------------
    "Backend Developer": {
        "Technical": {
            "Easy": [
                { question: "What is the difference between SQL and NoSQL databases, and when would you choose one over the other?", topic: "Databases" },
                { question: "Explain HTTP status codes 401 Unauthorized vs 403 Forbidden.", topic: "HTTP Protocol" },
                { question: "What is middleware in Express.js and how does the next() function work?", topic: "Express Middleware" },
                { question: "What is REST and what are the key principles of a RESTful API design?", topic: "REST APIs" },
                { question: "What is the purpose of database indexing and how does it speed up queries?", topic: "Database Indexing" }
            ],
            "Medium": [
                { question: "How do JSON Web Tokens (JWT) work, where should they be stored, and how do you handle token revocation?", topic: "Authentication & Security" },
                { question: "How do you handle database connection pooling and query optimization under high concurrent traffic?", topic: "Database Scaling" },
                { question: "Explain how Redis is used as an in-memory cache, and how you prevent cache stampede and stale cache issues.", topic: "Caching Strategies" },
                { question: "What are database transactions, and how does the ACID model guarantee consistency during failures?", topic: "ACID Transactions" },
                { question: "How does Node.js handle asynchronous I/O operations with the libuv thread pool?", topic: "Node.js Internals" }
            ],
            "Hard": [
                { question: "How would you design an event-driven microservices architecture using Apache Kafka or RabbitMQ with guaranteed at-least-once delivery?", topic: "Event-Driven Architecture" },
                { question: "How do you handle distributed transactions across microservices using the Saga pattern or two-phase commit?", topic: "Distributed Systems" },
                { question: "Explain the CAP theorem and the trade-offs between consistency and availability in distributed database clusters.", topic: "CAP Theorem" },
                { question: "How do you implement distributed rate limiting with sliding window logs across multiple API gateway nodes?", topic: "Rate Limiting" },
                { question: "How would you diagnose and resolve a severe memory leak or CPU spike in a production Node.js service under load?", topic: "Performance Profiling" }
            ]
        },
        "System Design": {
            "Easy": [
                { question: "How would you design a basic URL shortening service like Bitly with redirect tracking?", topic: "URL Shortener" },
                { question: "How do you design a secure user registration and login system with password hashing and email verification?", topic: "Auth System Design" }
            ],
            "Medium": [
                { question: "Design a notification system capable of sending millions of push, email, and SMS notifications daily with priority queues.", topic: "Notification System" },
                { question: "Design an API rate limiter to protect backend microservices from DDoS and scraping attacks.", topic: "API Gateway & Limiting" },
                { question: "Design a scalable file upload service that supports chunked uploads, resumable uploads, and virus scanning.", topic: "File Storage Service" }
            ],
            "Hard": [
                { question: "Design a distributed key-value store like DynamoDB, explaining partitioning, replication, quorum consensus, and conflict resolution.", topic: "Distributed Storage" },
                { question: "Design a scalable real-time chat application like WhatsApp or Slack, supporting 100M daily active users and end-to-end encryption.", topic: "Real-time Messaging" }
            ]
        }
    },

    // -------------------------------------------------------------------------
    // FULL STACK DEVELOPER
    // -------------------------------------------------------------------------
    "Full Stack Developer": {
        "Technical": {
            "Easy": [
                { question: "How does the client communicate with the server in a full-stack web application from HTTP request to database query?", topic: "Full Stack Architecture" },
                { question: "What is CORS (Cross-Origin Resource Sharing) and how do you configure it safely in a backend server?", topic: "CORS & Security" },
                { question: "What is the difference between synchronous and asynchronous operations in JavaScript?", topic: "Async JavaScript" },
                { question: "How do you validate user inputs on both the frontend and backend to protect against malicious data?", topic: "Data Validation" }
            ],
            "Medium": [
                { question: "Walk through how you implement end-to-end authentication in a MERN stack application, from login to protected API routes.", topic: "Full Stack Auth" },
                { question: "How do you manage state synchronization and optimistic UI updates when a user performs an action in the frontend?", topic: "Optimistic UI" },
                { question: "How do you handle database migrations safely in production without causing service downtime?", topic: "Database Migrations" },
                { question: "How do WebSockets differ from HTTP long polling, and when would you choose WebSockets for real-time features?", topic: "WebSockets" }
            ],
            "Hard": [
                { question: "How would you design an end-to-end checkout and payment flow with Stripe or PayPal, handling webhooks, idempotency, and network failures?", topic: "Payment Integration" },
                { question: "How do you architect a multi-tenant SaaS application where data isolation, role-based access, and custom tenant configs are required?", topic: "Multi-tenancy" },
                { question: "How would you architect a CI/CD pipeline with automated testing, zero-downtime blue-green deployments, and canary releases?", topic: "DevOps & CI/CD" }
            ]
        },
        "System Design": {
            "Easy": [
                { question: "How would you structure a full-stack blogging platform with user roles, markdown editing, and comments?", topic: "Blog Architecture" }
            ],
            "Medium": [
                { question: "Design an e-commerce platform with product catalogs, shopping cart persistence, inventory reservation, and order processing.", topic: "E-Commerce System" },
                { question: "Design a video streaming platform dashboard where creators can upload videos, track analytics, and viewers can stream content.", topic: "Video Platform" }
            ],
            "Hard": [
                { question: "Design a ride-sharing service like Uber or Lyft, focusing on driver-rider matching, real-time location tracking, and surge pricing.", topic: "Ride Sharing Architecture" },
                { question: "Design a collaborative document editor like Google Docs with operational transformation or CRDTs for concurrent editing.", topic: "Collaborative Systems" }
            ]
        }
    },

    // -------------------------------------------------------------------------
    // SOFTWARE ENGINEER
    // -------------------------------------------------------------------------
    "Software Engineer": {
        "Technical": {
            "Easy": [
                { question: "Explain the four core principles of Object-Oriented Programming (OOP) with practical examples.", topic: "OOP Principles" },
                { question: "What is Big O notation, and what are the time complexities of searching in an unsorted array vs a hash table?", topic: "Time Complexity" },
                { question: "What is recursion, and what is the importance of a base condition to avoid stack overflow?", topic: "Recursion" },
                { question: "What is the difference between a stack and a queue data structure, and where is each typically used?", topic: "Data Structures" }
            ],
            "Medium": [
                { question: "Explain the SOLID principles in software engineering and describe a scenario where you refactored code to follow one.", topic: "SOLID Principles" },
                { question: "How do you approach writing clean, testable code, and what is the role of unit tests, integration tests, and mocks?", topic: "Testing & Clean Code" },
                { question: "Explain how a HashMap handles hash collisions internally and what happens in the worst-case scenario.", topic: "Hash Maps & Collisions" },
                { question: "What are common design patterns you regularly use (e.g., Factory, Singleton, Observer), and what problems do they solve?", topic: "Design Patterns" }
            ],
            "Hard": [
                { question: "Explain how multithreading and concurrency work, and how race conditions, deadlocks, and thread safety are handled.", topic: "Concurrency & Deadlocks" },
                { question: "How would you implement an LRU (Least Recently Used) cache with O(1) get and put operations using data structures?", topic: "LRU Cache Design" },
                { question: "How do memory management and garbage collection work in modern managed runtimes, and what causes memory leaks?", topic: "Garbage Collection" }
            ]
        },
        "System Design": {
            "Medium": [
                { question: "Design a distributed logging and monitoring system that aggregates logs from hundreds of microservices.", topic: "Logging & Observability" },
                { question: "Design a web crawler that can traverse the web, store text, and avoid duplicate visits or circular links.", topic: "Web Crawler" }
            ],
            "Hard": [
                { question: "Design a globally distributed CDN (Content Delivery Network) with edge caching, DNS routing, and cache invalidation.", topic: "CDN Architecture" }
            ]
        }
    },

    // -------------------------------------------------------------------------
    // DATA SCIENTIST
    // -------------------------------------------------------------------------
    "Data Scientist": {
        "Technical": {
            "Easy": [
                { question: "What is the difference between supervised and unsupervised learning?", topic: "Machine Learning Basics" },
                { question: "Explain what overfitting and underfitting mean, and how train/test split helps identify them.", topic: "Model Evaluation" },
                { question: "What are precision, recall, and F1-score, and why is accuracy not always the best metric?", topic: "Classification Metrics" }
            ],
            "Medium": [
                { question: "How do you handle missing values, categorical features, and outliers in a raw real-world dataset?", topic: "Data Preprocessing" },
                { question: "Explain how random forests reduce variance compared to individual decision trees.", topic: "Ensemble Learning" },
                { question: "What is cross-validation and how does k-fold cross-validation help prevent data leakage?", topic: "Cross-Validation" },
                { question: "Explain the difference between L1 (Lasso) and L2 (Ridge) regularization and how they impact feature weights.", topic: "Regularization" }
            ],
            "Hard": [
                { question: "How does the self-attention mechanism in Transformers work mathematically, and why does it outperform RNNs?", topic: "Transformers & Attention" },
                { question: "How do you detect and handle concept drift and covariate shift in production machine learning models?", topic: "MLOps & Model Drift" },
                { question: "Explain how gradient boosting algorithms like XGBoost or LightGBM optimize tree building and loss minimization.", topic: "Gradient Boosting" }
            ]
        },
        "System Design": {
            "Medium": [
                { question: "Design an end-to-end recommendation system for an e-commerce website using collaborative filtering and content embeddings.", topic: "Recommendation Systems" },
                { question: "Design a fraud detection pipeline that scores financial transactions in real-time under 50ms latency.", topic: "Real-time ML Inference" }
            ],
            "Hard": [
                { question: "Design an enterprise feature store and MLOps deployment pipeline supporting continuous model training and A/B testing.", topic: "MLOps Architecture" }
            ]
        }
    },

    // -------------------------------------------------------------------------
    // GENERAL BEHAVIORAL & HR (For any role)
    // -------------------------------------------------------------------------
    "Behavioral": {
        "Easy": [
            { question: "Tell me about a challenging technical problem you solved recently and what your approach was.", topic: "Problem Solving" },
            { question: "Describe a time when you had to learn a new framework or technology quickly to complete a task.", topic: "Adaptability" },
            { question: "Can you share an experience where you had to work with a difficult team member or conflicting opinion?", topic: "Conflict Resolution" }
        ],
        "Medium": [
            { question: "Using the STAR method, describe a project where requirements changed significantly mid-way and how you managed the delivery.", topic: "Project Delivery" },
            { question: "Tell me about a time you made a technical mistake or introduced a production bug. How did you resolve it and what did you learn?", topic: "Accountability" },
            { question: "Describe a situation where you disagreed with a senior engineer or product manager's technical decision. How did you handle it?", topic: "Constructive Disagreement" }
        ],
        "Hard": [
            { question: "Describe a complex cross-functional initiative you led or influenced where you had no direct authority over team members.", topic: "Technical Leadership" },
            { question: "Tell me about a time you had to balance technical debt against immediate business deadlines. What trade-offs did you negotiate?", topic: "Strategic Trade-offs" }
        ]
    },

    "HR": {
        "Easy": [
            { question: "What motivates you as a developer, and what kind of work environment brings out your best performance?", topic: "Work Environment & Motivation" },
            { question: "Where do you see yourself technically and professionally in the next 2 to 3 years?", topic: "Career Goals" },
            { question: "Why are you interested in this role and what aspects of our tech stack excite you?", topic: "Role Alignment" }
        ],
        "Medium": [
            { question: "How do you prioritize multiple competing deadlines when high-priority tasks arrive simultaneously?", topic: "Time Management" },
            { question: "Can you describe how you give and receive constructive feedback during code reviews and retrospectives?", topic: "Communication & Feedback" }
        ],
        "Hard": [
            { question: "Describe how you contribute to building an inclusive, high-performing engineering culture in a remote or hybrid team.", topic: "Engineering Culture" },
            { question: "How do you handle prolonged high-pressure sprint cycles without succumbing to burnout?", topic: "Resilience & Work-Life Balance" }
        ]
    }
};

/**
 * Returns a high-quality fallback question matching role, type, and difficulty.
 * Guaranteed to never return null or empty question.
 *
 * @param {Object} options
 * @param {string} options.role
 * @param {string} options.interviewType
 * @param {string} options.difficulty
 * @param {string} [options.suggestedTopic]
 * @param {string[]} [options.excludeQuestions]
 * @returns {{ question: string, topic: string, difficulty: string, category: string }}
 */
const getFallbackQuestion = (options = {}) => {
    const {
        role = "Software Engineer",
        interviewType = "Technical",
        difficulty = "Medium",
        suggestedTopic = "",
        excludeQuestions = []
    } = options;

    const normalizedExcludes = (excludeQuestions || []).map(q => q.toLowerCase().trim());

    // 1. Determine the category pool
    let pool = [];

    // Check if interviewType is Behavioral or HR directly
    if (interviewType === "Behavioral" && FALLBACK_BANK["Behavioral"]) {
        const diffPool = FALLBACK_BANK["Behavioral"][difficulty] || FALLBACK_BANK["Behavioral"]["Medium"];
        pool = [...diffPool];
    } else if (interviewType === "HR" && FALLBACK_BANK["HR"]) {
        const diffPool = FALLBACK_BANK["HR"][difficulty] || FALLBACK_BANK["HR"]["Medium"];
        pool = [...diffPool];
    } else {
        // Look up by role
        const roleData = FALLBACK_BANK[role] || FALLBACK_BANK["Software Engineer"];
        const typeData = roleData[interviewType] || roleData["Technical"] || FALLBACK_BANK["Software Engineer"]["Technical"];
        const diffPool = typeData[difficulty] || typeData["Medium"] || typeData["Easy"] || [];
        pool = [...diffPool];
    }

    // If pool is empty, grab from general fallback
    if (pool.length === 0) {
        pool = [
            { question: "Can you explain the architectural structure and core technologies of your most impactful project?", topic: "Architecture" },
            { question: "How do you identify and address performance bottlenecks in production applications?", topic: "Performance" },
            { question: "What security considerations do you keep in mind when designing and implementing APIs?", topic: "API Security" },
            { question: "How do you handle automated testing and edge cases in critical business workflows?", topic: "Testing" }
        ];
    }

    // 2. Filter out already asked questions
    let candidates = pool.filter(item => {
        const qNorm = item.question.toLowerCase().trim();
        return !normalizedExcludes.some(ex => ex.includes(qNorm) || qNorm.includes(ex));
    });

    // If all in difficulty pool were asked, relax to any difficulty in that category
    if (candidates.length === 0) {
        candidates = pool;
    }

    // 3. If suggestedTopic was requested, prefer candidate with matching topic
    if (suggestedTopic) {
        const topicLower = suggestedTopic.toLowerCase();
        const topicMatch = candidates.find(item => 
            item.topic.toLowerCase().includes(topicLower) || 
            item.question.toLowerCase().includes(topicLower)
        );
        if (topicMatch) {
            return {
                question: topicMatch.question,
                topic: topicMatch.topic,
                difficulty,
                category: interviewType
            };
        }
    }

    // 4. Pick randomly from remaining candidates
    const selected = candidates[Math.floor(Math.random() * candidates.length)];

    return {
        question: selected.question,
        topic: selected.topic || interviewType,
        difficulty,
        category: interviewType
    };
};

module.exports = {
    FALLBACK_BANK,
    getFallbackQuestion
};
