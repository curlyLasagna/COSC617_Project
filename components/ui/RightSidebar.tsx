import React from "react";
import { Input } from "@/components/ui/input";

const RightSidebar = () => {
  return (
    <aside className="w-72 p-4 border-l border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 hidden md:block h-screen sticky top-0">
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search Tumblr"
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Trending Topics Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Trending Topics
        </h3>
        <ul>
          {["#Ronaldo", "#Elden Ring", "#EPL", "#Arsenal"].map(
            (topic, index) => (
              <li
                key={index}
                className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer mb-1"
              >
                {topic}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Links at the Bottom */}
      <div className="mt-auto text-sm text-gray-500 dark:text-gray-400 border-t pt-4">
        <a href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition">
          About
        </a>
        <a href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition">
          Privacy Policy
        </a>
        <a href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition">
          Terms of Service
        </a>
      </div>
    </aside>
  );
};

export default RightSidebar;