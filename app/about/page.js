import React from "react";

export const metadata = {
  title: "About - Github Finder",
  description:
    "Learn more about Github Finder - A React app to search GitHub profiles and see profile details. Designed by Karan Dhakad.",
};

function About() {
  return (
    <div
      className="flex flex-col items-start justify-center 
        bg-[hsl(220,17.647%,20%)] text-white p-10"
    >
      <h1 className="text-6xl font-bold mb-4 text-[#a6adbb]">Github Finder</h1>
      <h3 className="text-xl mb-2 text-[#a6adbb]">
        A React app to search GitHub profiles and see profile details.
      </h3>
      <h3 className="text-lg text-[#9ca3af]">
        Designed By:{" "}
        <span className="font-semibold text-[#eee] ml-2">Karan Dhakad</span>
      </h3>
    </div>
  );
}

export default About;
