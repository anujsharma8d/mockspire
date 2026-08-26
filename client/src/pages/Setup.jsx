import { useState } from "react";
import interviewApi from "../api/interviewapi";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../components/MobileBottomNav";

import {
  Tags,
  Users,
  Code,
  Search,
  TrendingUp,
  ListOrdered,
  Clock3,
  ArrowRight,
  CheckCircle,
  Network,
  MessageCircle,
  Monitor,
  Server,
  Layers,
  Brain,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const Setup = () => {
  const navigate = useNavigate();

  const [setup, setSetup] = useState({
    interviewType: "",
    role: "",
    difficulty: "",
    questionCount: "",
  });

  const selectOption = (name, value) => {
    setSetup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startInterviewHandler = async () => {
    if (
      !setup.difficulty ||
      !setup.interviewType ||
      !setup.role ||
      !setup.questionCount
    ) {
      alert("Please select all options");
      return;
    }

    try {
      console.log("Sending setup:", setup);

      const response = await interviewApi.startInterview(setup);

      const sessionId = response.data.sessionId;

      navigate(`/interview/${sessionId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const interviewTypes = [
    {
      id: "Behavioral",
      title: "Behavioral",
      description:
        "Focus on past experiences, leadership, teamwork, and conflict resolution using the STAR method.",
      icon: Users,
    },
    {
      id: "Technical",
      title: "Technical",
      description:
        "Assess coding skills, technical knowledge, problem-solving, and domain-specific concepts.",
      icon: Code,
    },
    {
      id: "HR",
      title: "HR",
      description:
        "Focus on communication, career goals, workplace preferences, and culture-fit questions.",
      icon: MessageCircle,
    },
    {
      id: "System Design",
      title: "System Design",
      description:
        "Evaluate your ability to design scalable systems, make architectural decisions, and solve real-world engineering challenges.",
      icon: Network,
    },
  ];

  const roles = [
  {
    id: "Software Engineer",
    title: "Software Engineer",
    description: "Build and maintain scalable software applications.",
    icon: Code,
  },
  {
    id: "Frontend Developer",
    title: "Frontend Developer",
    description: "Build responsive and interactive user interfaces.",
    icon: Monitor,
  },
  {
    id: "Backend Developer",
    title: "Backend Developer",
    description: "Design APIs, services, and scalable backend systems.",
    icon: Server,
  },
  {
    id: "Full Stack Developer",
    title: "Full Stack Developer",
    description: "Work across frontend, backend, and application architecture.",
    icon: Layers,
  },
  {
    id: "Data Scientist",
    title: "Data Scientist",
    description: "Analyze data and build machine learning solutions.",
    icon: Brain,
  },
];

  const difficulties = ["Easy", "Medium", "Hard"];

  const questionCounts = [5, 10, 15];

  return (
    <div className="flex min-h-screen bg-[#f8f9ff] text-[#0b1c30]">

      <Sidebar />
      <MobileBottomNav/>

      {/* Main */}
      <main className="flex min-h-screen flex-1 flex-col md:ml-64">

        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-[#c2c8c5]/50 bg-[#f8f9ff]/90 px-4 py-6 backdrop-blur-md md:px-16">

          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#006c49]">
            New Session Setup
          </p>

          <h1 className="text-2xl font-semibold text-[#0b1c30] md:text-3xl">
            Configure Interview
          </h1>

        </div>

        {/* Content */}
        <div className="mx-auto w-full max-w-[1120px] px-4 py-8 pb-50 md:pb-32 md:px-16">

          {/* ================= INTERVIEW TYPE ================= */}

          <section className="mb-8">

            <div className="mb-2 flex items-center gap-2">

              <Tags
                size={20}
                className="text-[#424846]"
              />

              <h2 className="text-xl font-semibold">
                Interview Type
              </h2>

            </div>

            <p className="mb-5 text-sm text-[#424846]">
              Select the primary focus of your practice session.
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {interviewTypes.map((item) => {
                const Icon = item.icon;

                const selected =
                  setup.interviewType === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      selectOption("interviewType", item.id)
                    }
                    className={`relative rounded-xl border p-6 text-left transition-all duration-200 ${
                      selected
                        ? "border-[#006c49] bg-[#eff4ff] shadow-md"
                        : "border-[#c2c8c5] bg-white hover:shadow-sm"
                    }`}
                  >

                    {/* Icon */}
                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full ${
                        selected
                          ? "border-2 border-[#006c49] text-[#006c49]"
                          : "bg-[#eff4ff] text-[#424846]"
                      }`}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-lg font-semibold text-[#0b1c30]">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-5 text-[#424846]">
                      {item.description}
                    </p>

                    {/* Selected */}
                    {selected && (
                      <CheckCircle
                        size={22}
                        fill="#006c49"
                        className="absolute right-5 top-5 text-white"
                      />
                    )}

                  </button>
                );
              })}

            </div>
          </section>

          <div className="my-8 h-px bg-[#c2c8c5]/40" />

          {/* ================= ROLE ================= */}

          <section className="mb-8">

  <div className="mb-2 flex items-center gap-2">
    <TrendingUp
      size={20}
      className="text-[#424846]"
    />

    <h2 className="text-xl font-semibold">
      Target Role
    </h2>
  </div>

  <p className="mb-5 text-sm text-[#424846]">
    Select the position you are preparing for.
  </p>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

    {roles.map((item) => {
      const Icon = item.icon;
      const selected = setup.role === item.id;

      return (
        <button
          key={item.id}
          type="button"
          onClick={() => selectOption("role", item.id)}
          className={`relative rounded-xl border p-5 text-left transition-all duration-200 ${
            selected
              ? "border-[#006c49] bg-[#eff4ff] shadow-md"
              : "border-[#c2c8c5] bg-white hover:shadow-sm"
          }`}
        >

          {/* Icon */}
          <div
            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${
              selected
                ? "border-2 border-[#006c49] text-[#006c49]"
                : "bg-[#eff4ff] text-[#424846]"
            }`}
          >
            <Icon size={22} />
          </div>

          {/* Title */}
          <h3 className="mb-1 text-base font-semibold text-[#0b1c30]">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-5 text-[#424846]">
            {item.description}
          </p>

          {/* Selected */}
          {selected && (
            <CheckCircle
              size={20}
              fill="#006c49"
              className="absolute right-4 top-4 text-white"
            />
          )}

        </button>
      );
    })}

  </div>

</section>

          <div className="my-8 h-px bg-[#c2c8c5]/40" />

          {/* ================= DIFFICULTY + QUESTIONS ================= */}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* Difficulty */}

            <section>

              <div className="mb-2 flex items-center gap-2">

                <TrendingUp
                  size={20}
                  className="text-[#424846]"
                />

                <h2 className="text-xl font-semibold">
                  Difficulty
                </h2>

              </div>

              <p className="mb-4 text-sm text-[#424846]">
                Set the difficulty level.
              </p>

              <div className="flex flex-wrap gap-2">

                {difficulties.map((level) => {

                  const selected =
                    setup.difficulty === level;

                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() =>
                        selectOption("difficulty", level)
                      }
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                        selected
                          ? "border-[#051916] bg-[#051916] text-white"
                          : "border-[#c2c8c5] bg-white text-[#424846] hover:bg-[#eff4ff]"
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}

              </div>

            </section>

            {/* Question Count */}

            <section>

              <div className="mb-2 flex items-center gap-2">

                <ListOrdered
                  size={20}
                  className="text-[#424846]"
                />

                <h2 className="text-xl font-semibold">
                  Number of Questions
                </h2>

              </div>

              <p className="mb-4 text-sm text-[#424846]">
                Choose how many questions you want.
              </p>

              <div className="flex w-fit rounded-lg border border-[#c2c8c5] bg-[#eff4ff] p-1">

                {questionCounts.map((count) => {

                  const selected =
                    setup.questionCount === count;

                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() =>
                        selectOption("questionCount", count)
                      }
                      className={`rounded-md px-5 py-2 text-sm font-semibold transition-all ${
                        selected
                          ? "bg-white text-[#051916] shadow-sm"
                          : "text-[#424846] hover:text-[#051916]"
                      }`}
                    >
                      {count}
                    </button>
                  );
                })}

              </div>

            </section>

          </div>

        </div>

        {/* ================= FOOTER ================= */}

        <div className="fixed bottom-20 md:bottom-0 left-0 right-0 z-20 border-t border-[#c2c8c5] bg-[#f8f9ff]/95 px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] backdrop-blur-md md:left-64 md:px-16">

          <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 ">

            {/* Duration */}

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6cf8bb]/30">

                <Clock3
                  size={20}
                  className="text-[#006c49]"
                />

              </div>

              <div>

                <p className="text-sm text-[#424846]">
                  Estimated Duration
                </p>

                <p className="text-lg font-semibold">
                  {
                    setup.difficulty==="Easy"? (setup.questionCount===5 ? "~10min": setup.questionCount===10? "~20min":"~30min") 
                    : setup.difficulty==="Medium"? (setup.questionCount===5 ? "~15min": setup.questionCount===10? "~30min":"~45min")
                    :  (setup.questionCount===5 ? "~20min": setup.questionCount===10? "~40min":"~60min")
                  }
                </p>

              </div>

            </div>

            {/* Start */}

            <button
              onClick={startInterviewHandler}
              className="flex items-center justify-center gap-3 rounded-lg bg-[#051916] px-12 py-3 font-semibold text-white shadow-md transition-all hover:bg-[#0b1c30] active:scale-95 md:w-auto"
            >
              Start Interview

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </main>
    </div>
  );
};

export default Setup;