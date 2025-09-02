import { useState } from "react";
import { Phone, MapPin, MessageCircleHeartIcon } from "lucide-react";

export const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative w-full min-h-screen 0">
      {/* <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        // style={{ backgroundImage: `url(${contactBg})` }}
      ></div> */}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Get in Touch
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-lg text-forground">
              We’d love to hear from you! Whether you have questions about our
              collections, need styling advice, or want to share feedback, we’re
              here to help.
            </p>

            <div className="flex items-center gap-4 text-gray-800">
              <MapPin className="w-6 h-6 text-primary" />
              <span>123 Fashion Ave, Amman, Jordan</span>
            </div>
            <div className="flex items-center gap-4 text-gray-800">
              <Phone className="w-6 h-6 text-primary" />
              <span>+962 7 1234 5678</span>
            </div>
            <div className="flex items-center gap-4 text-gray-800">
              <MessageCircleHeartIcon className="w-6 h-6 text-primary" />
              <span>hello@modimal.com</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-primary/50 p-8 shadow-lg flex flex-col gap-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none transition"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-primary outline-none transition resize-none"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-primary text-white font-semibold py-3 hover:bg-primary/90 transition"
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>

        <div className="mt-16 h-60 w-full overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            title="Modimal Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.1234567890!2d35.930000!3d31.950000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5af2f3b12345%3A0xabcdef123456789!2sFashion%20Ave%2C%20Amman%2C%20Jordan!5e0!3m2!1sen!2sjo!4v1693632000000!5m2!1sen!2sjo"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
