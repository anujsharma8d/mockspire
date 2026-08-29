import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoveRight,Check } from "lucide-react";
import heroimg from "../../assets/MockspireDashboard.png"

const Hero = () => {
    const navigate = useNavigate()

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-32 overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(0,163,114,0.15)_0%,rgba(13,26,24,0)_50%)] bg-[#0d1a18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">


        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 leading-tight text-white">
          Master the Interview,
          <br />
          <span className="bg-gradient-to-r from-[#00d293] to-[#00a372] bg-clip-text text-transparent">
            Secure
          </span>{" "}
          the Offer.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[#e2e8f0] max-w-2xl mx-auto mb-5 leading-relaxed">
          Practice realistic interviews tailored to your role with AI-generated
          questions, instant feedback, and personalized insights.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <button
            onClick={()=>navigate("/login")}
            className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 bg-[#00a372] hover:bg-[#007a55] text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-all shadow-[0_0_20px_rgba(0,163,114,0.3)] hover:shadow-[0_0_30px_rgba(0,163,114,0.4)]"
          >
            Start Your Free Mock Interview

            <MoveRight/>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#94a3b8] font-medium mb-8">
          {[
            "No credit card required",
            "Instant setup",
            "Practice anytime",
          ].map((text) => (
            <div key={text} className="flex items-center gap-1">
              <Check className="text-green-600"/>

              {text}
            </div>
          ))}
        </div>

        {/* Dashboard */}
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#1e3833]/50 bg-white p-2">

          {/* Dashboard Image */}
          <img
            src={heroimg}
            alt="Mockspire Dashboard"
            className="w-full h-auto rounded-b-xl"
            style={{
              objectPosition: "center 25%",
              objectFit: "cover",
              maxHeight: "600px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;