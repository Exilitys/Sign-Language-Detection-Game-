import React from "react";
import Navigation from "./component/Navigation";
import { AnimatedTestimonials } from "./component/animated-testimonials";
import fotoCarlo from "./assets/fotoCarlo.jpg";

const AboutUs = () => {
  const testimonials = [
    {
      quote:
        "Contributes in AI model development, Web App Development, Proposal Creation, Data Collection.",
      name: "Jonathan Carlo",
      designation: "Undergraduate Computer Science Student at Binus University",
      src: fotoCarlo,
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Clariant Benedictus Tan",
      designation: "Undergraduate Computer Science Student at Binus University",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Hubertus Kenneth",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Natha Budi",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className=' min-h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center '>
      <Navigation classNames='mt-10' Y />
      <div className='font-bold text-5xl mt-20'>Our Team</div>
      <div className='mt-0'>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </div>
  );
};

export default AboutUs;
