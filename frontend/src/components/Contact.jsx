import React from "react";
import GitHubProfile from "./GitHubProfile";

const ContactSection = () => {
  const githubUsernames = ["devTejaSrinivas", "Kaushik-2802", "sohamchitimali"]; // Replace with actual GitHub usernames

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Our Team
      </h2>
      <div className="flex justify-center space-x-8">
        {githubUsernames.map((username) => (
          <GitHubProfile key={username} username={username} />
        ))}
      </div>
    </div>
  );
};

export default ContactSection;
