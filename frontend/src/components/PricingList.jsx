import { check } from "../assets";
import { pricing } from "../constants";
import { FaReact, FaNode, FaAws, FaDocker } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiGraphql,
  SiFirebase,
  SiKubernetes,
  SiVite,
  SiPython,
  SiFlask,
  SiRender,
  SiGooglegemini,
  SiNetlify,
} from "react-icons/si";

const PricingList = () => {
  // Tech stack icons using react-icons
  const frontendTech = [
    { name: "React", icon: <FaReact className="w-6 h-6 text-blue-400" /> },

    {
      name: "Tailwind",
      icon: <SiTailwindcss className="w-6 h-6 text-cyan-500" />,
    },
    {
      name: "Vite",
      icon: <SiVite className="w-6 h-6  bg-purple-500" />,
    },
    {
      name: "Netlify",
      icon: <SiNetlify className="w-6 h-6 text-cyan-300" />,
    },
  ];

  const backendTech = [
    { name: "Node.js", icon: <FaNode className="w-6 h-6 text-green-500" /> },
    { name: "Express", icon: <SiExpress className="w-6 h-6 text-gray-600" /> },
    { name: "MongoDB", icon: <SiMongodb className="w-6 h-6 text-green-600" /> },
    {
      name: "Gemini API",
      icon: <SiGooglegemini className="w-6 h-6 text-violet-500" />,
    },
  ];

  const cloudTech = [
    {
      name: "Python",
      icon: (
        <SiPython
          className="w-6 h-6 text-yellow-400
      "
        />
      ),
    },
    {
      name: "Flask",
      icon: <SiFlask className="w-6 h-6 text-gray-500" />,
    },
    { name: "Render", icon: <SiRender className="w-6 h-6 text-white" /> },
  ];

  // Map tech stacks to pricing items
  const techStacks = [frontendTech, backendTech, cloudTech];

  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap">
      {pricing.map((item, itemIndex) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
        >
          <h4 className="h4 mb-4">{item.title}</h4>

          <div className="flex flex-wrap gap-4 mb-6">
            {techStacks[itemIndex % techStacks.length].map(
              (tech, techIndex) => (
                <div key={techIndex} className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-n-6 rounded-lg flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <span className="text-xs mt-1 text-n-4">{tech.name}</span>
                </div>
              )
            )}
          </div>

          <ul>
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6"
              >
                <img src={check} width={24} height={24} alt="Check" />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
