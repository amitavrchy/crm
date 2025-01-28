"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import img from "../../../../public/singleJob.jpg";

function SingleBlog() {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <div className="relative h-96">
          <Image
            src={img}
            alt="Blog Banner"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white py-32">
            <h1 className="text-4xl md:text-5xl font-extrabold">Mastering Global Workforce Development</h1>
            <p className="mt-4 text-lg">January 28, 2025</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">10 Steps for Success</h2>
            <p className="text-gray-600 text-base mb-8">
              Published on January 28, 2025 by Admin
            </p>
            <div className="space-y-6 text-gray-800 leading-relaxed">
              <p>
                In today’s interconnected world, global workforce development has become a cornerstone for business success. Companies must adapt to evolving technologies, cultural nuances, and emerging markets to remain competitive.
              </p>
              <p>
                Here are some actionable steps:
                <ol className="list-decimal pl-5">
                  <li>Embrace technology to streamline operations and improve collaboration.</li>
                  <li>Invest in continuous upskilling programs for employees.</li>
                  <li>Foster a culture of inclusion and diversity to drive innovation.</li>
                  <li>Ensure compliance with global labor laws and standards.</li>
                  <li>Utilize data-driven approaches to make informed decisions.</li>
                  <li>Build resilient leadership teams equipped for cross-cultural management.</li>
                  <li>Prioritize employee well-being and mental health support.</li>
                  <li>Address language and communication barriers effectively.</li>
                  <li>Set clear goals and expectations for global teams.</li>
                  <li>Measure progress regularly to adapt and improve strategies.</li>
                </ol>
              </p>
              <p>
                By following these principles, organizations can create a robust and adaptable workforce prepared to face global challenges and seize new opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Section */}
        <div className="bg-gray-100 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold mb-4">Key Takeaways</h3>
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>Leverage technology to stay ahead in the competitive landscape.</li>
              <li>Foster inclusivity and diversity to unlock creativity and innovation.</li>
              <li>Ensure compliance to minimize risks and build trust with employees.</li>
              <li>Continuously measure, adapt, and optimize strategies for sustainable growth.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SingleBlog;