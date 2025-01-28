import React from 'react'
import AboutUs from "@/components/About_Us";
import Banner from "@/components/Banner";
import Services from "@/components/Services";
import Vendors from "@/components/vendors";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AllJobsHomePage from '@/components/allJobsHomePage';
import ContactUsHomePage from '@/components/ContactHomePage';

function HomePage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <AllJobsHomePage />
      <AboutUs />
      <Services />
      <ContactUsHomePage />
      <Vendors />
      <Footer />
    </div>
  )
}

export default HomePage