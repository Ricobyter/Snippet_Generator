import React from "react";

const InstructionsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 font-montserrat">
      <div className="p-8 bg-gray-900 border-1 border-white rounded-lg">
        <h2 className="text-2xl mb-4">Instructions to make a snippet in VSCode</h2>
        <ul className="mb-4 list-disc pl-5">
          <li>Open Visual Studio Code.</li>
          <li>Click on the manage icon present at the bottom left of the screen.</li>
          <li>Choose "User Snippets".</li>
          <li>Select "Create Global User Snippet".</li>
          <li>Enter the snippet file name.</li>
          <li>Open the file to add the snippet.</li>
          <li>Paste the generated snippet code.</li>
          <li>Use the defined prefix to trigger the snippet.</li>
          <li>Save the file.</li>
          <p className="mt-2 text-lg font-semibold">
          Voila! You have just created a snippet. Happy coding 🫡🫡
          </p>
        </ul>
        <button
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-800 text-white rounded-md hover:bg-green-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InstructionsModal;
