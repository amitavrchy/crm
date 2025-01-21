import React from 'react';

const services = [
  {
    title: 'Candidate Sourcing',
    description:
      'We use advanced search technologies to find the best-qualified candidates for your open positions.',
    icon: '✅',
  },
  {
    title: 'Job Placement',
    description:
      'We connect job seekers with top employers and help them find fulfilling careers.',
    icon: '📋',
  },
  {
    title: 'Career Counseling',
    description:
      'We provide expert guidance to help job seekers improve their resumes, interview skills, and career paths.',
    icon: '🎯',
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We offer a wide range of recruitment services to help you find the perfect candidate or land your dream job.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-2 text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
