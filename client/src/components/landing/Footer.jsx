import Logo from "../Logo";

const Footer = () => {
  return (
    <footer
      className="bg-[#0d1a18] border-t border-[#1e3833] pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">

            <a
              href="/"
              className="flex items-center gap-2 mb-4"
            >
              <Logo/>

              <span className="text-xl font-bold tracking-tight text-white">
                Mockspire
              </span>
            </a>

            <p className="text-[#94a3b8] text-sm mb-6">
              Practice smart. Get hired.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 text-[#94a3b8]">

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/anujsharma8d"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/anujsharma8d"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Product
            </h4>

            <ul className="space-y-3 text-sm text-[#94a3b8]">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a href="#howitworks" className="hover:text-white">
                  How It Works
                </a>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Company
            </h4>

            <ul className="space-y-3 text-sm text-[#94a3b8]">

              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1e3833] pt-8 text-center text-sm text-[#94a3b8]">
          © 2026 Mockspire. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;