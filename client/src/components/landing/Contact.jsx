import {
    Mail,
    MessageSquarePlus,
} from "lucide-react";

import api from "../../api/axios";

const Contact = () => {

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData(e.target)

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try{
            const res = await api.post("api/contact",data)

            console.log(res.data);
            alert(res.data.message)
            e.target.reset();
        } catch(err){
            console.error("Failed to send message: ",err)
        }

    }
    

    return (
        <section
            id="contact"
            className="bg-gray-50 py-24 border-t border-gray-200 text-gray-900"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid md:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div className="flex flex-col justify-center">

                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                            Get in Touch
                        </h2>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Have a question, feedback, or suggestion about Mockspire? I'd love to hear from you. Send a message and I'll get back to you as soon as possible.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-6">

                            {/* Email */}
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-emerald-600 shadow-sm">
                                    <Mail className="w-5 h-5" />
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email us at
                                    </p>

                                    <p className="text-gray-900 font-medium">
                                        mockspireai@gmail.com
                                    </p>
                                </div>

                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-emerald-600 shadow-sm">
                                    <MessageSquarePlus className="w-5 h-5" />
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Feedback & Suggestions
                                    </p>

                                    <p className="text-gray-900 font-medium">
                                        Help us make Mockspire better
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Social Links */}
                        <div className="mt-12">

                            <p className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                                Follow Us
                            </p>

                            <div className="flex gap-4">

                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/in/anujsharma8d"
                                    className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    width="24"
                                    height="24"
                                    >
                                    <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3C3.64 3 2.75 3.89 2.75 5S3.64 7 4.75 7s2-.89 2-2S5.86 3 4.75 3ZM21 13.86C21 10.15 18.99 8.5 16.31 8.5c-1.73 0-2.89.95-3.37 1.85h-.05V8.5H9.5V21H13v-6.18c0-1.63.31-3.21 2.33-3.21 1.99 0 2.02 1.87 2.02 3.31V21H21v-7.14Z" />
                                    </svg>
                                </a>

                                {/* Github */}
                                <a
                                    href="https://github.com/anujsharma8d"
                                    className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    >
                                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.18c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.69 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.74 0-1.27.45-2.3 1.2-3.11-.12-.3-.52-1.47.11-3.06 0 0 .98-.31 3.16 1.19A10.9 10.9 0 0 1 12 5.91c.99 0 1.98.13 2.91.38 2.18-1.5 3.16-1.19 3.16-1.19.63 1.59.23 2.76.11 3.06.75.81 1.2 1.84 1.2 3.11 0 4.46-2.71 5.45-5.29 5.73.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/>
                                    </svg>
                                </a>

                            </div>

                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#162825] p-8 rounded-2xl border border-gray-200 shadow-sm">

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@example.com"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Message
                                </label>

                                <textarea
                                    rows="4"
                                    name="message"
                                    required
                                    placeholder="How can we help you?"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-emerald-600/20"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Contact;