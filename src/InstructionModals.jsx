// InstructionsModal.js

import React from "react";

const InstructionsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Instructions to make a snippet in VSCode</h2>
        <p className="mb-4">
          1. Open VSCode and navigate to the desired language snippet file.
        </p>
        <p className="mb-4">2. Add your snippet code in the appropriate format.</p>
        <p className="mb-4">3. Save the file.</p>
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
// const toggleInstructions = () => {
//     setShowInstructions(!showInstructions);
//   };
{/* <span className="ml-2 cursor-pointer" onClick={toggleInstructions}>!</span> */}
// {showInstructions && <InstructionsModal onClose={toggleInstructions} />}