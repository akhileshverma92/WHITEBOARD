import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Hari Om",
      role: "Frontend Developer",
      description:
        "UI/UX Design Create responsive layouts (e.g., toolbar, drawing area) using Tailwind or Material-UI.",
      image: "https://avatars.githubusercontent.com/u/153184642?v=4", // Replace with actual image
    },
    {
      name: "Raunak Singh",
      role: "Backend Developer",
      description:
        "Set up Firestore for session and Build server for real-time drawing data broadcasting.",
      image: "https://via.placeholder.com/150", // Replace with actual image
    },
    {
      name: "Akhilesh Verma",
      role: "Full Stack Developer ",
      description:
        "Ensure smooth frontend-backend communication and live user updates. and Deployment of the project.",
      image:
        "https://avatars.githubusercontent.com/u/146834811?s=400&u=1e0b4eec0e9a7f3d8b7e4bba96942178d8069a3d&v=4", // Replace with actual image
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr pt-20 from-blue-900 via-purple-700 to-pink-600 p-10 text-white">
      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400">
          About Us
        </h1>
        <p className="mt-4 text-lg font-light max-w-3xl mx-auto">
          We’re a passionate group of three college students on a mission to
          revolutionize teamwork with our <span className="font-bold">real-time whiteboard app</span>.{" "}
          <span className="font-medium">
            Collaborate, create, and innovate like never before.
          </span>
        </p>
      </motion.div>

      {/* Story Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-16 bg-gradient-to-br from-purple-800 to-blue-700 rounded-3xl p-10 shadow-2xl"
      >
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-300 mb-6">
          Our Journey
        </h2>
        <p className="text-lg leading-relaxed">
          It all started with late-night brainstorming sessions in our dorm. Our
          shared love for technology and design led us to create this app—a
          platform where creativity and productivity thrive together. We believe
          in the power of collaboration, and we’re here to make it effortless for
          everyone.
        </p>

      </motion.div>
<motion.div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 z-0 ">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative mb-16 bg-gradient-to-br from-purple-800 to-blue-700 rounded-3xl p-10 shadow-2xl"
          >
            {/* Badge for Team Lead */}
            {member.name.includes("Akhilesh Verma") && (
              <span className="absolute top-3 right-3 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                TEAM LEAD
              </span>
            )}
            {/* Decorative Background Shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-30 -z-10"></div>
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md mb-4"
            />
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
              {member.name}
            </h3>
            <p className="text-sm uppercase text-blue-200 mb-3">{member.role}</p>
            <p className="text-base">{member.description}</p>
          </motion.div>
        ))}
      </div>
</motion.div>
      {/* Team Members Section */}
      
    </div>
  );
};

export default AboutUs;
