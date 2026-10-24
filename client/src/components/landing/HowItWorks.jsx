import {
    ClipboardList,
    Sparkles,
    CirclePlay,
    ChartNoAxesCombined,
    Trophy,
} from "lucide-react";

const steps = [
    {
        number: 1,
        title: "CHOOSE INTERVIEW",
        description: "Select role, type, and difficulty.",
        icon: ClipboardList,
    },
    {
        number: 2,
        title: "AI GENERATES",
        description: "We create personalized questions for you.",
        icon: Sparkles,
    },
    {
        number: 3,
        title: "TAKE INTERVIEW",
        description: "Answer questions in a real interview format.",
        icon: CirclePlay,
    },
    {
        number: 4,
        title: "GET ANALYZED",
        description: "AI evaluates your answers in real-time.",
        icon: ChartNoAxesCombined,
    },
    {
        number: 5,
        title: "IMPROVE & SUCCEED",
        description: "Get insights and improve for your next interview.",
        icon: Trophy,
    },
];

const HowItWorks = () => {
    return (
        <section
            id="howitworks"
            className="bg-white py-24 text-gray-900"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        How Mockspire Works
                    </h2>
                </div>


                {/* =========================================
                    MOBILE VERSION 
                ========================================= */}
                <div className="md:hidden max-w-md mx-auto">

                    <div className="flex flex-col gap-6">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className="flex items-start gap-3"
                                >
                                    {/* Icon */}
                                    <div
                                        className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${
                                            index === 2
                                                ? "bg-emerald-600 text-white"
                                                : "bg-emerald-50 text-emerald-600"
                                        }`}
                                    >
                                        <Icon
                                            className="w-4 h-4"
                                            strokeWidth={2}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0">

                                        {/* Step Number + Title */}
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <span className="text-sm text-gray-400 font-medium">
                                                {step.number}.
                                            </span>

                                            <h4
                                                className={`text-sm font-medium tracking-wide ${
                                                    index === 2
                                                        ? "text-emerald-600"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {step.title}
                                            </h4>
                                        </div>

                                        {/* Description */}
                                        <p className="text-[16px] leading-relaxed text-gray-800">
                                            {step.description}
                                        </p>

                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>


                {/* =========================================
                    DESKTOP VERSION 
                ========================================= */}
                <div className="hidden md:flex flex-col md:flex-row justify-between items-start gap-8 relative">

                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-8 left-12 right-12 h-[2px] bg-gray-200 border-dashed border-t-2 border-gray-300 z-0" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                className="relative z-10 flex flex-col items-center flex-1"
                            >
                                {/* Icon */}
                                <div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm ${
                                        index === 2
                                            ? "bg-emerald-600 text-white"
                                            : "bg-emerald-50 text-emerald-600"
                                    }`}
                                >
                                    <Icon
                                        className="w-8 h-8"
                                        strokeWidth={2}
                                    />
                                </div>

                                {/* Title */}
                                <h4 className="font-bold mb-2 text-sm text-center">
                                    {step.number}. {step.title}
                                </h4>

                                {/* Description */}
                                <p className="text-xs text-gray-500 px-4 text-center">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
};

export default HowItWorks;