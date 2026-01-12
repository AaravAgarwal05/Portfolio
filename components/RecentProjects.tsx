"use client";

import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer title={item.des}>
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-auto mb-10">
                <div className="relative w-full overflow-hidden lg:rounded-3xl bg-[#13162D]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={550}
                    height={350}
                    className="w-full h-full object-cover lg:rounded-3xl"
                  />
                </div>
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base ">
                {item.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {" "}
                Check Codebase:<br/>
                <a href={item.github} target="_blank" rel="noopener noreferrer">
                  {item.github.split("https://github.com/").pop()}
                </a>
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <Image
                        src={icon}
                        alt={`Technology icon ${index + 1}`}
                        width={24}
                        height={24}
                        className="p-2"
                      />
                    </div>
                  ))}
                </div>

                <div
                  className="flex justify-center items-center"
                  onClick={() => {
                    window.open(item.link, "_blank");
                  }}
                >
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Experience Live
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
