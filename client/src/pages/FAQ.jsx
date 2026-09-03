import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Activity,
    ArrowLeft,
    ArrowRight,
    BarChart3,
    Brain,
    CheckCircle,
    ChevronDown,
    Code2,
    Database,
    FileText,
    Lightbulb,
    MessageCircle,
    Mic,
    Search,
    SearchX,
    ShieldCheck,
    Target,
    Timer,
    UserRound,
} from "lucide-react";

/* =========================================================
   FAQ DATA
   ========================================================= */

const faqs = [
    {
        id: 1,
        category: "getting-started",
        icon: Brain,
        label: "Getting Started",
        question: "What is Mockspire?",
        content: (
            <>
                <p className="mb-3">
                    Mockspire is an AI-powered mock interview platform that helps you
                    practice interviews in a realistic environment.
                </p>

                <p className="mb-3">
                    You can select your interview role and type, answer AI-generated
                    interview questions, and receive feedback on your performance.
                </p>

                <div className="flex items-center gap-2 mt-4 text-[#006c49] text-xs font-semibold">
                    <CheckCircle size={16} />
                    <span>Practice, evaluate, improve, and repeat.</span>
                </div>
            </>
        ),
        searchable:
            "getting started Mockspire AI mock interview interview preparation practice platform",
    },

    {
        id: 2,
        category: "getting-started",
        icon: Target,
        label: "Getting Started",
        question: "How does a Mockspire interview work?",
        content: (
            <>
                <p className="mb-3">
                    A Mockspire interview follows a simple process:
                </p>

                <div className="space-y-2">
                    <div className="flex gap-3 p-3 rounded-lg bg-[#eff4ff]">
                        <span className="font-bold text-[#006c49]">01</span>
                        <span>Select your interview role and interview type.</span>
                    </div>

                    <div className="flex gap-3 p-3 rounded-lg bg-[#eff4ff]">
                        <span className="font-bold text-[#006c49]">02</span>
                        <span>Start your interview session.</span>
                    </div>

                    <div className="flex gap-3 p-3 rounded-lg bg-[#eff4ff]">
                        <span className="font-bold text-[#006c49]">03</span>
                        <span>Answer the questions presented by the interviewer.</span>
                    </div>

                    <div className="flex gap-3 p-3 rounded-lg bg-[#eff4ff]">
                        <span className="font-bold text-[#006c49]">04</span>
                        <span>Submit the interview to generate your results.</span>
                    </div>

                    <div className="flex gap-3 p-3 rounded-lg bg-[#eff4ff]">
                        <span className="font-bold text-[#006c49]">05</span>
                        <span>Review your performance and insights.</span>
                    </div>
                </div>
            </>
        ),
        searchable:
            "how Mockspire interview works start session role questions submit results insights",
    },

    {
        id: 3,
        category: "interviews",
        icon: Code2,
        label: "Interviews",
        question: "What types of interviews can I practice?",
        content: (
            <>
                <p className="mb-3">
                    Mockspire currently offers four interview types designed to help you
                    prepare for different stages and styles of the hiring process.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Behavioral */}
                    <div className="p-3 rounded-lg bg-[#eff4ff] flex items-center gap-2">
                        <UserRound
                            size={17}
                            className="text-[#006c49] shrink-0"
                        />
                        <div>
                            <div className="font-semibold text-[#0b1c30]">
                                Behavioral
                            </div>
                            <div className="text-xs text-[#424846] mt-0.5">
                                Leadership, teamwork, experiences, and conflict resolution.
                            </div>
                        </div>
                    </div>

                    {/* Technical */}
                    <div className="p-3 rounded-lg bg-[#eff4ff] flex items-center gap-2">
                        <Code2
                            size={17}
                            className="text-[#006c49] shrink-0"
                        />
                        <div>
                            <div className="font-semibold text-[#0b1c30]">
                                Technical
                            </div>
                            <div className="text-xs text-[#424846] mt-0.5">
                                Technical knowledge, problem-solving, and coding concepts.
                            </div>
                        </div>
                    </div>

                    {/* HR */}
                    <div className="p-3 rounded-lg bg-[#eff4ff] flex items-center gap-2">
                        <MessageCircle
                            size={17}
                            className="text-[#006c49] shrink-0"
                        />
                        <div>
                            <div className="font-semibold text-[#0b1c30]">
                                HR
                            </div>
                            <div className="text-xs text-[#424846] mt-0.5">
                                Communication, career goals, and workplace-related questions.
                            </div>
                        </div>
                    </div>

                    {/* System Design */}
                    <div className="p-3 rounded-lg bg-[#eff4ff] flex items-center gap-2">
                        <Database
                            size={17}
                            className="text-[#006c49] shrink-0"
                        />
                        <div>
                            <div className="font-semibold text-[#0b1c30]">
                                System Design
                            </div>
                            <div className="text-xs text-[#424846] mt-0.5">
                                Architecture, scalability, and real-world system design.
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-3">
                    Choose the interview type that matches the area you want to practice
                    and start your Mockspire session.
                </p>
            </>
        ),
        searchable:
            "interviews behavioral technical HR system design interview types mock interview practice",

    },

    {
        id: 4,
        category: "interviews",
        icon: Brain,
        label: "AI Interviews",
        question: "How are interview questions generated?",
        content: (
            <>
                <p className="mb-3">
                    Mockspire uses AI to generate interview questions based on the
                    interview configuration selected for your session.
                </p>

                <p className="mb-3">
                    Instead of manually preparing a fixed list of questions, the
                    platform can generate questions relevant to the selected role and
                    interview type.
                </p>

                <div className="flex items-center gap-2 mt-4 text-[#006c49] text-xs font-semibold">
                    <Lightbulb size={16} />
                    <span>Questions are designed around your selected interview context.</span>
                </div>
            </>
        ),
        searchable:
            "AI generate questions role interview type dynamic questions artificial intelligence",
    },

    {
        id: 5,
        category: "answers",
        icon: Mic,
        label: "Answering Questions",
        question: "Can I answer interview questions using my voice?",
        content: (
            <>
                <p className="mb-3">
                    Yes. Mockspire supports speech-to-text for interview answers.
                </p>

                <p className="mb-3">
                    You can use the microphone button during an interview to speak your
                    answer. Your speech is converted into text and placed into the answer
                    field.
                </p>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#eff4ff] text-[#0b1c30]">
                    <Mic size={18} className="text-[#006c49]" />
                    <span>
                        You can also edit the generated transcript before continuing.
                    </span>
                </div>
            </>
        ),
        searchable:
            "voice speech to text microphone answer interview audio transcript speak",
    },

    {
        id: 6,
        category: "answers",
        icon: FileText,
        label: "Answering Questions",
        question: "Can I type my answers instead of speaking?",
        content: (
            <>
                <p className="mb-3">
                    Yes. You can type your answer directly into the answer box during the
                    interview.
                </p>

                <p>
                    This gives you the flexibility to choose between typing your response
                    and using the speech-to-text microphone feature.
                </p>

                <div className="flex items-center gap-2 mt-4 text-[#006c49] text-xs font-semibold">
                    <CheckCircle size={16} />
                    <span>Choose the answering method that works best for you.</span>
                </div>
            </>
        ),
        searchable:
            "type text answer textarea typing written response speech microphone answer",
    },

    {
        id: 7,
        category: "evaluation",
        icon: BarChart3,
        label: "Evaluation",
        question: "How is my interview performance evaluated?",
        content: (
            <>
                <p className="mb-3">
                    After you submit your interview, Mockspire processes your answers to
                    generate a performance evaluation.
                </p>

                <p className="mb-3">
                    The evaluation is based on the answers you provide during the
                    interview and is designed to help you understand where you performed
                    well and where you can improve.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-3 rounded-lg bg-[#eff4ff]">
                        <div className="font-semibold text-[#051916]">
                            Answer Quality
                        </div>
                        <div className="text-xs mt-1">
                            Understand the quality of your responses.
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#eff4ff]">
                        <div className="font-semibold text-[#051916]">
                            Performance
                        </div>
                        <div className="text-xs mt-1">
                            Review your overall interview performance.
                        </div>
                    </div>
                </div>
            </>
        ),
        searchable:
            "evaluation AI evaluate answers performance score interview feedback answer quality",
    },

    {
        id: 8,
        category: "results",
        icon: BarChart3,
        label: "Results",
        question: "What happens after I submit an interview?",
        content: (
            <>
                <p className="mb-3">
                    Once you finish and submit your interview, Mockspire saves your
                    answers and generates your interview result.
                </p>

                <p className="mb-3">
                    You are then taken to the results page where you can review the
                    outcome of your interview.
                </p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#eff4ff]">
                        <BarChart3 size={17} className="text-[#006c49]" />
                        <span>Review your interview performance.</span>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#eff4ff]">
                        <Lightbulb size={17} className="text-[#006c49]" />
                        <span>View generated insights and improvement areas.</span>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#eff4ff]">
                        <Target size={17} className="text-[#006c49]" />
                        <span>Use the feedback to prepare for your next attempt.</span>
                    </div>
                </div>
            </>
        ),
        searchable:
            "submit interview after results result page performance insights feedback",
    },

    {
        id: 9,
        category: "results",
        icon: Lightbulb,
        label: "Insights",
        question: "What are interview insights?",
        content: (
            <>
                <p className="mb-3">
                    Insights help you understand the strengths and weaknesses identified
                    from your interview performance.
                </p>

                <p>
                    Instead of only looking at a final result, you can use these insights
                    to identify areas that need more practice and prepare more
                    effectively for future interviews.
                </p>

                <div className="flex items-center gap-2 mt-4 text-[#006c49] text-xs font-semibold">
                    <Lightbulb size={16} />
                    <span>Use every interview as feedback for your next attempt.</span>
                </div>
            </>
        ),
        searchable:
            "insights improvement strengths weaknesses interview analytics feedback preparation",
    },

    {
        id: 10,
        category: "interviews",
        icon: ArrowRight,
        label: "Interview Navigation",
        question: "Can I go back to a previous interview question?",
        content: (
            <>
                <p className="mb-3">
                    During an interview, you can use the navigation controls to move
                    between questions.
                </p>

                <p>
                    Your answers are maintained for the questions in the current
                    interview session so that you can continue working through the
                    interview before submitting it.
                </p>
            </>
        ),
        searchable:
            "previous next question navigation interview answer move back forward",
    },

    {
        id: 11,
        category: "account",
        icon: UserRound,
        label: "Account",
        question: "Do I need an account to use Mockspire?",
        content: (
            <>
                <p className="mb-3">
                    Mockspire uses authenticated accounts so that your interview sessions,
                    answers, results, and related data can be associated with your
                    account.
                </p>

                <p>
                    After signing in, you can access the parts of Mockspire that require
                    authentication, including your dashboard and interview sessions.
                </p>

                <div className="flex items-center gap-2 mt-4 text-[#006c49] text-xs font-semibold">
                    <ShieldCheck size={16} />
                    <span>Your interview experience is tied to your account.</span>
                </div>
            </>
        ),
        searchable:
            "account login signup authentication dashboard user interview sessions",
    },

    {
        id: 12,
        category: "privacy",
        icon: ShieldCheck,
        label: "Privacy",
        question: "Is my interview information associated with my account?",
        content: (
            <>
                <p className="mb-3">
                    Interview sessions and their associated answers are stored so that
                    Mockspire can generate results and allow you to access your interview
                    experience.
                </p>

                <p>
                    Your authenticated account is used to associate your interview data
                    with the correct user.
                </p>

                <div className="flex items-center gap-2 mt-4 text-[#006c49] text-xs font-semibold">
                    <ShieldCheck size={16} />
                    <span>Authentication helps protect access to your interview data.</span>
                </div>
            </>
        ),
        searchable:
            "privacy account interview data answers sessions authentication security",
    },
];

/* =========================================================
   CATEGORIES
   ========================================================= */

const categories = [
    {
        id: "all",
        label: "All Questions",
    },
    {
        id: "getting-started",
        label: "Getting Started",
    },
    {
        id: "interviews",
        label: "AI Interviews",
    },
    {
        id: "answers",
        label: "Answering",
    },
    {
        id: "evaluation",
        label: "Evaluation",
    },
    {
        id: "results",
        label: "Results & Insights",
    },
    {
        id: "account",
        label: "Account",
    },
    {
        id: "privacy",
        label: "Privacy",
    },
];

/* =========================================================
   POPULAR TAGS
   ========================================================= */

const popularTags = [
    {
        label: "AI Interviews",
        value: "AI interview",
    },
    {
        label: "Speech-to-Text",
        value: "speech to text",
    },
    {
        label: "Results",
        value: "results",
    },
    {
        label: "Evaluation",
        value: "evaluation",
    },
    {
        label: "Insights",
        value: "insights",
    },
];

/* =========================================================
   FAQ ITEM
   ========================================================= */

function FAQItem({ faq, isOpen, onToggle }) {
    const Icon = faq.icon;

    return (
        <div
            className={`flex flex-col rounded-xl bg-white shadow-sm transition-all duration-200 overflow-hidden ${isOpen ? "bg-[#eff4ff]/40" : ""
                }`}
        >
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => onToggle(faq.id)}
                className="w-full flex items-start justify-between text-left p-6 focus:outline-none"
            >
                <div className="flex items-start gap-3 pr-2">
                    <Icon
                        size={22}
                        strokeWidth={1.8}
                        className="text-[#006c49] mt-0.5 shrink-0"
                    />

                    <div>
                        <span className="inline-block text-[11px] uppercase tracking-wider text-[#727876] mb-1">
                            {faq.label}
                        </span>

                        <h3 className="text-[18px] text-[#051916] leading-snug font-semibold">
                            {faq.question}
                        </h3>
                    </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#051916] shrink-0">
                    <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </div>
            </button>

            {isOpen && (
                <div className="px-6 pb-6 pt-0 text-[#424846] text-sm leading-relaxed">
                    {faq.content}
                </div>
            )}
        </div>
    );
}

/* =========================================================
   MAIN FAQ PAGE
   ========================================================= */

export default function FAQ() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentCategory, setCurrentCategory] = useState("all");
    const [openFaq, setOpenFaq] = useState(null);

    /* -------------------------------------------------------
       FILTER FAQS
    ------------------------------------------------------- */

    const filteredFaqs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return faqs.filter((faq) => {
            const matchesCategory =
                currentCategory === "all" ||
                faq.category === currentCategory;

            const matchesSearch =
                !query ||
                `${faq.question} ${faq.label} ${faq.searchable}`
                    .toLowerCase()
                    .includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [currentCategory, searchQuery]);

    /* -------------------------------------------------------
       CTRL + K / CMD + K SEARCH
    ------------------------------------------------------- */

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault();

                document
                    .getElementById("faq-search-input")
                    ?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    /* -------------------------------------------------------
       HANDLERS
    ------------------------------------------------------- */

    const handleToggle = (id) => {
        setOpenFaq((prev) => (prev === id ? null : id));
    };

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
        setOpenFaq(null);
    };

    const handleTagClick = (tag) => {
        setSearchQuery(tag);
        setOpenFaq(null);
    };

    const handleReset = () => {
        setSearchQuery("");
        setCurrentCategory("all");
        setOpenFaq(null);
    };

    /* -------------------------------------------------------
       JSX
    ------------------------------------------------------- */

    return (
        <main className="w-full pt-16 bg-[#f8f9ff] min-h-screen">

            {/* =================================================
          BACK TO DASHBOARD
      ================================================= */}

            <div className="max-w-[1120px] mx-auto px-6 pt-6">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#051916] shadow-sm transition-all hover:bg-[#eff4ff] hover:shadow-md"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Dashboard</span>
                </button>
            </div>

            {/* =================================================
          HERO
      ================================================= */}

            <div className="relative w-full overflow-hidden">

                <section className="max-w-[1120px] mx-auto px-6 pt-10 pb-12 w-full">
                    <div className="flex flex-col items-center text-center max-w-[820px] mx-auto">

                        {/* Badge */}

                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#eff4ff] shadow-sm mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse" />

                            <span className="text-xs text-[#006c49] uppercase tracking-widest font-semibold">
                                Knowledge Base • Mockspire
                            </span>
                        </div>

                        {/* Heading */}

                        <h1 className="text-[38px] md:text-[48px] leading-tight text-[#051916] tracking-tight mb-3 font-bold">
                            Everything you need to know about Mockspire.
                        </h1>

                        {/* Subtitle */}

                        <p className="text-lg leading-7 text-[#424846] max-w-[680px] mb-10">
                            Find answers about AI mock interviews, interview questions,
                            speech-to-text answers, performance evaluation, results, and
                            personalized insights.
                        </p>

                        {/* Search */}

                        <div className="w-full max-w-[640px] relative mb-3 group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-[#727876] group-focus-within:text-[#006c49] transition-colors">
                                <Search size={22} />
                            </div>

                            <input
                                id="faq-search-input"
                                type="text"
                                autoComplete="off"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search questions, topics, or keywords..."
                                className="w-full bg-white text-[#0b1c30] placeholder:text-[#727876] text-base pl-12 pr-28 py-4 rounded-xl shadow-sm focus:outline-none focus:shadow-md transition-all"
                            />

                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#424846] text-[11px] shadow-sm">
                                    ⌘K
                                </span>
                            </div>
                        </div>

                        {/* Popular Tags */}

                        <div className="flex flex-wrap items-center justify-center gap-1 text-[#424846]">
                            <span className="text-xs text-[#727876] mr-1">
                                Popular:
                            </span>

                            {popularTags.map((tag) => (
                                <button
                                    key={tag.value}
                                    type="button"
                                    onClick={() => handleTagClick(tag.value)}
                                    className="px-3 py-1 rounded-full bg-[#eff4ff] hover:bg-[#e5eeff] hover:text-[#051916] text-xs font-semibold transition-colors"
                                >
                                    {tag.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* =================================================
          FILTER BAR
      ================================================= */}

            <section className="w-full bg-[#eff4ff]/40 py-3 sticky top-16 z-30 backdrop-blur-md">
                <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-start md:justify-center overflow-x-auto gap-1">
                    {categories.map((category) => {
                        const active = currentCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() =>
                                    handleCategoryChange(category.id)
                                }
                                className={`px-5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${active
                                        ? "bg-[#051916] text-white shadow-sm"
                                        : "bg-white text-[#424846] hover:text-[#0b1c30] shadow-sm"
                                    }`}
                            >
                                {category.label}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* =================================================
          FAQ CONTENT
      ================================================= */}

            <section className="max-w-[1120px] mx-auto px-6 py-12 w-full">

                {filteredFaqs.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        {filteredFaqs.map((faq) => (
                            <FAQItem
                                key={faq.id}
                                faq={faq}
                                isOpen={openFaq === faq.id}
                                onToggle={handleToggle}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20">

                        <div className="w-12 h-12 rounded-xl bg-[#dce9ff] flex items-center justify-center text-[#727876] mb-3">
                            <SearchX size={28} />
                        </div>

                        <h4 className="text-2xl text-[#051916] mb-1 font-semibold">
                            No matching answers found
                        </h4>

                        <p className="text-base text-[#424846] max-w-[420px] mb-6">
                            Try searching for terms like "AI interview",
                            "speech to text", "results", or "evaluation".
                        </p>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold px-6 py-2 rounded-lg hover:bg-[#dce9ff] transition-colors"
                        >
                            Clear search filter
                        </button>
                    </div>
                )}
            </section>

            {/* =================================================
          RECOMMENDED PREP FLOW
      ================================================= */}

            <section className="max-w-[1120px] mx-auto px-6 mb-12 w-full">
                <div className="relative overflow-hidden rounded-xl bg-[#eff4ff] p-6 md:p-12">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                        <div className="md:col-span-8 space-y-2">

                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#006c49]/10 text-[#006c49] text-[11px] font-bold tracking-wide">
                                <Activity size={14} />
                                RECOMMENDED PREP FLOW
                            </div>

                            <h3 className="text-2xl md:text-[32px] leading-tight text-[#051916] font-semibold">
                                Ready to test your interview skills?
                            </h3>

                            <p className="text-base leading-6 text-[#424846] max-w-[580px]">
                                Start an AI-powered mock interview, answer realistic
                                questions, and review your performance when you finish.
                            </p>
                        </div>

                        <div className="md:col-span-4 flex md:justify-end items-center">
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="w-full md:w-auto bg-[#051916] text-white hover:bg-[#1a2e2a] text-xs font-semibold px-10 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                                <span>Start Interview</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* =================================================
          SUPPORT CTA
      ================================================= */}

            <section className="max-w-[1120px] mx-auto px-6 pb-20 w-full">
                <div className="relative rounded-xl overflow-hidden bg-[#051916] text-white p-10 md:p-16 shadow-xl">

                    <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#006c49]/20 blur-3xl pointer-events-none" />

                    <div className="absolute top-0 right-1/4 w-40 h-40 rounded-full bg-[#6cf8bb]/10 blur-2xl pointer-events-none" />

                    <div className="relative z-10 max-w-[720px] space-y-3">

                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1a2e2a] text-[#6cf8bb] text-[11px] tracking-wide">
                            <MessageCircle size={14} />
                            MOCKSPIRE SUPPORT
                        </div>

                        <h2 className="text-[32px] md:text-[44px] leading-tight text-white font-bold">
                            Still have questions?
                        </h2>

                        <p className="text-lg leading-7 text-[#809691]">
                            If you need help with your Mockspire interview experience,
                            account, results, or another feature, reach out to the
                            appropriate support channel.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6">

                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="bg-[#006c49] text-white hover:bg-[#00714d] text-xs font-semibold px-10 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
                            >
                                <ArrowLeft size={18} />
                                <span>Back to Dashboard</span>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById("faq-search-input")
                                        ?.focus()
                                }
                                className="bg-[#1a2e2a]/80 text-white hover:bg-[#1a2e2a] text-xs font-semibold px-10 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                <Search size={18} />
                                <span>Search FAQs</span>
                            </button>

                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}