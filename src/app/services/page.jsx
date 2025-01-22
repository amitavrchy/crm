import Vendors from "@/components/vendors";
import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import img1 from "../../../public/about-us-wte/1.jpg";
import img2 from "../../../public/about-us-wte/2.jpg";
import img3 from "../../../public/about-us-wte/3.jpg";
import img4 from "../../../public/about-us/about-2.jpg";

function Services() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white py-24 text-center">
        <div className="absolute inset-0 bg-opacity-40 bg-black"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            What We Offer
          </h1>
          <p className="mt-6 text-lg md:text-2xl font-light max-w-2xl mx-auto">
            Discover a wide range of recruitment solutions tailored to meet your
            needs.
          </p>
        </div>
      </div>

      {/* Services Cards Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            title: "Tailored Recruitment Solutions",
            img: img1,
            description:
              "We connect you with the best candidates to meet your unique requirements.",
          },
          {
            title: "HR Consultancy",
            img: img2,
            description:
              "Providing expert HR advice to streamline your recruitment process.",
          },
          {
            title: "Skill Assessment",
            img: img3,
            description:
              "Ensuring top-notch talent with precise skill evaluation and testing.",
          },
        ].map((service, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition"
          >
            <Image
              src={service.img}
              alt={service.title}
              className="w-full h-60 object-cover"
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition"></div>
            <div className="absolute bottom-6 left-6 z-10 text-white">
              <h3 className="text-2xl font-bold">{service.title}</h3>
              <p className="mt-2 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Connecting Talent Section */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              Connecting Top Talent with Leading Companies
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our services ensure successful matches between exceptional talent
              and companies, driving growth and long-term success.
            </p>
          </div>
          <div>
            <Image
              src={img4}
              alt="Connecting Talent"
              className="rounded-2xl shadow-2xl"
              placeholder="blur"
            />
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600">What to Expect</h2>
          <p className="mt-4 text-gray-600">
            Here's what you can expect when working with us:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {[
              { title: "Dedicated Support", description: "24/7 client assistance" },
              {
                title: "Exceptional Talent",
                description: "Connecting you with top-tier professionals.",
              },
              {
                title: "Streamlined Process",
                description: "Efficient and hassle-free recruitment solutions.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-bold text-blue-600">{item.title}</h3>
                <p className="mt-4 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="bg-gradient-to-tr from-pink-50 to-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-600">
            Our Services
          </h2>
          <p className="mt-4 text-center text-gray-600">
            We offer a wide range of recruitment solutions to help you find the
            perfect candidate or your dream job.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {[
              { title: "Candidate Sourcing", description: "Identify top talent." },
              {
                title: "Job Placement",
                description: "Match candidates with ideal roles.",
              },
              {
                title: "Career Counseling",
                description: "Provide guidance for career advancement.",
              },
              { title: "Training Programs", description: "Upskill professionals." },
              { title: "Resume Review", description: "Optimize your resume." },
              {
                title: "Mock Interviews",
                description: "Prepare candidates for job interviews.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-bold text-blue-600">{service.title}</h3>
                <p className="mt-4 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendors Section */}
      <Vendors />
    </div>
  );
}

export default Services;
