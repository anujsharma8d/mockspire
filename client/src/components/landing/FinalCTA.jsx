const FinalCTA = () => {
  return (
    <section
      id="pricing"
      className="bg-[#162825] py-24 text-center"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-4xl font-bold mb-4 text-white">
          Ready to Ace Your Next Interview?
        </h2>

        <p className="text-[#e2e8f0] text-lg mb-8">
          Practice smarter, sharpen your skills, and build the confidence you need to succeed in your next interview.
        </p>

        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 bg-[#00a372] hover:bg-[#007a55] text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-all"
        >
          Start Your Free Mock Interview

          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M14 5l7 7m0 0l-7 7m7-7H3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </a>

      </div>
    </section>
  );
};

export default FinalCTA;