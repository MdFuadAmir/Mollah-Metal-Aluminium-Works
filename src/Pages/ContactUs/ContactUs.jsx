import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Title from "../../Shared/Title/Title";

const ContactUs = () => {
  return (
    <div className="text-gray-800 dark:text-gray-100 py-8 overflow-hidden">
      {/* Header */}
      <Title title={`Contact Us`} subTitle={`Have questions or need custom metal solutions? Get in touch with MMAW.`}/>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <div data-aos="fade-right" className="flex items-center gap-4">
            <FaPhoneAlt className="text-2xl text-orange-500" />
            <p className="text-gray-300 font-mono">+880 1705470131</p>
          </div>

          <div data-aos="fade-right" className="flex items-center gap-4">
            <FaEnvelope className="text-2xl text-orange-500" />
            <p className="text-gray-300">mdfuadamir@gmail.com</p>
          </div>

          <div data-aos="fade-right" className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-2xl text-orange-500" />
            <p className="text-gray-300">Kushtia, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form */}
        <form data-aos="fade-left" className="bg-black/50 p-6 rounded-xl shadow space-y-4">
          <div>
            <label className="block mb-1 text-gray-400">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded border text-gray-400"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-400">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded border text-gray-400"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-400">Message</label>
            <textarea
              rows="4"
              className="w-full p-2 rounded border text-gray-400"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
