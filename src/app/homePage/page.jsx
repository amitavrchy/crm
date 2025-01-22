import React from 'react'
import AboutUs from "@/components/About_Us";
import Banner from "@/components/Banner";
import Services from "@/components/Services";
import Vendors from "@/components/vendors";

function HomePage() {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Services />
      <Vendors />
    </div>
  )
}

export default HomePage