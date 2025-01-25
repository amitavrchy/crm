import React from 'react'
import AboutUs from "@/components/About_Us";
import Banner from "@/components/Banner";
import Services from "@/components/Services";
import Vendors from "@/components/vendors";
import Navbar from '@/components/Navbar';

function HomePage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <AboutUs />
      <Services />
      <Vendors />
    </div>
  )
}

export default HomePage