import { FaIndustry, FaTools, FaHandshake } from "react-icons/fa";
import amirHanza from "../../assets/owners/amir.jpg";
import maruf from "../../assets/owners/maruf.jpg";
import arafa from "../../assets/owners/araf.png";
import fuad from "../../assets/owners/fuad.png";
import arefin from "../../assets/owners/arefin.jpg";
import Title from "../../Shared/Title/Title";
const AboutUs = () => {
  return (
    <div className="py-8 overflow-hidden">
      {/* Header */}

      <Title
        title={"About MMAW"}
        subTitle={`Mollah Metal Aluminium Works (MMAW) is a trusted name in metal &
          aluminium fabrication, delivering quality, strength, and reliability.`}
      />
      {/* Company Info */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div
          data-aos="fade-right"
          className="bg-black/50 p-6 rounded-xl shadow"
        >
          <FaIndustry className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Who We Are</h3>
          <p className="text-sm text-gray-300">
            We are a metal & aluminium manufacturing company specializing in toy
            hari, dhama, selonchi, ghora, korai dhakna, hary dhakna, and custom
            fabrication solutions.
          </p>
        </div>

        <div data-aos="fade-up" className="bg-black/50 p-6 rounded-xl shadow">
          <FaTools className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">What We Do</h3>
          <p className="text-sm text-gray-300">
            From raw materials to finished products, we ensure precision,
            durability, and modern design in every project.
          </p>
        </div>

        <div data-aos="fade-left" className="bg-black/50 p-6 rounded-xl shadow">
          <FaHandshake className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">
            Why Choose Us
          </h3>
          <p className="text-sm text-gray-300">
            Skilled workers, quality materials, fair pricing, and customer
            satisfaction are our core values.
          </p>
        </div>
      </div>

      {/* Owner & Developer Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Owner */}
        <div
          data-aos="fade-right"
          className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center"
        >
          <img
            src={amirHanza}
            alt="Owner"
            className="w-24 h-24 rounded-full object-cover border bg-white"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-400">
              Company Owner
            </h3>
            <p className="text-gray-300 mt-1">
              <b className="text-orange-500">Md Amir Hamza</b> - Founder & Owner
              of Mollah Metal Aluminium Works. With years of experience in
              aluminium kitchen utensils manufacturing.
            </p>
          </div>
        </div>
        {/* partner */}
        <div
          data-aos="fade-left"
          className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center"
        >
          <img
            src={arefin}
            alt="Company Partner"
            className="w-24 h-24 rounded-full object-cover border bg-white"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-400">
              Company Partner
            </h3>
            <p className="text-gray-300 mt-1">
              <b className="text-orange-500">Arefin Kalam</b> Partner of Mollah
              Metal Aluminium Works, involved in business development, financial
              planning, and partnership management to support the growth and
              stability of the company.
            </p>
          </div>
        </div>

        {/* adviser */}
        <div
          data-aos="fade-right"
          className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center"
        >
          <img
            src={maruf}
            alt="Adviser"
            className="w-24 h-24 rounded-full object-cover border bg-white"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-400">
              Company Adviser
            </h3>
            <p className="text-gray-300 mt-1">
              <b className="text-orange-500">Maruf Hasan</b> - Company Adviser
              of Mollah Metal Aluminium Works, providing strategic guidance,
              business direction, and long-term planning support based on
              industry experience.
            </p>
          </div>
        </div>
        {/* Managing Director */}
        <div
          data-aos="fade-left"
          className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center"
        >
          <img
            src={arafa}
            alt="Managing Director"
            className="w-24 h-24 rounded-full object-cover border bg-white"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-400">
              Company Managing Director
            </h3>
            <p className="text-gray-300 mt-1">
              <b className="text-orange-500">Shahriar Arafa</b> - Managing
              Director of Mollah Metal Aluminium Works, responsible for overall
              factory operations, production management, quality control, and
              ensuring timely delivery of aluminium kitchen products.
            </p>
          </div>
        </div>
      </div>
      {/* Developer */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
        className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center w-full md:w-1/2 mt-10 mx-auto"
      >
        <img
          src={fuad}
          alt="Developer"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-400">
            Project Developer
          </h3>
          <p className="text-gray-300 mt-1">
            <b className="text-orange-500">Md Fuad</b> – MERN Stack Developer.
            Designed and developed the full-stack e-commerce platform for MMAW.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

// Managing Director
// adviser
