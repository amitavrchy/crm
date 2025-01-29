import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import breadCrumb from '../../../public/singleJob.jpg';

// Import images
import img1 from '../../../public/about-us/about-1.jpg';
import img2 from '../../../public/about-us/about-2.jpg';
import img3 from '../../../public/about-us/about-3.jpg';
import img5 from '../../../public/about-us-wte/2.jpg';
import img6 from '../../../public/about-us-wte/3.jpg';
import img7 from '../../../public/about-us-wte/4.jpg';

const images = [
    { src: img1, text: 'Collaborative Spaces' },
    { src: img2, text: 'Modern Interiors' },
    { src: img3, text: 'Creative Work Environment' },
    { src: img5, text: 'Breakout Zones' },
    { src: img6, text: 'Conference Rooms' },
    { src: img7, text: 'Lounge Areas' },
];

function Gallery() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            
            {/* Banner Section */}
            <div className="relative w-full h-64 md:h-80 lg:h-96">
                <Image src={breadCrumb} alt="Gallery Banner" layout="fill" objectFit="cover" className="opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                    <h1 className="text-5xl font-bold drop-shadow-lg">Our Modern Office Space</h1>
                    <p className="text-lg mt-2 max-w-2xl px-4">
                        Explore our beautifully designed workspaces that inspire creativity and collaboration.
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {images.map((img, index) => (
                    <div key={index} className="relative group rounded-2xl overflow-hidden shadow-xl">
                        <Image src={img.src} alt={`Gallery Image ${index + 1}`} layout="responsive" width={600} height={400} className="transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-center p-4">
                            <FaSearch className="text-4xl mb-2" />
                            <p className="text-lg font-semibold">{img.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <Footer />
        </div>
    );
}

export default Gallery;