import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExclamation } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa6";
import InstructionsModal from "./InstructionModals";


const App = () => {
  const [description, setDescription] = useState("");
  const [prefix, setPrefix] = useState("");
  const [bodyElement, setBodyElement] = useState("");
  const [snippet, setSnippet] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    generateSnippet();
  }, [description, prefix, bodyElement]);

  const generateSnippet = () => {
    // Splitting multiline input into an array of lines
    const bodyLines = bodyElement.split("\n");

    const bodyFormatted = bodyLines.map((line) => {
      if (line.trim() === "") {
        return '""'; // Keeping empty lines
      } else {
        return `"${line}"`; // For correct spacing as written in input
      }
    }).join(",\n");

    // Generating the snippet format
    const snippetFormat = `
{
  "${description}": {
  "prefix": "${prefix}",
  "body": [
${bodyFormatted}
  ],
  "description": "${description}"
}
}`;

    // Setting the generated snippet
    setSnippet(snippetFormat);
  };

  const copySnippet = () => {
    navigator.clipboard.writeText(snippet);

    toast.success("Snippet copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="bg-black text-white min-h-screen relative">
      <div>
      <h1 className="pt-8 mb-6 text-4xl text-center underline underline-offset-4 font-sedan capitalize">Snippet Generator</h1>

      </div>
      <div className="relative">
      <span className="ml-2 cursor-pointer absolute right-4 lg:right-32 bg-gradient-to-r from-purple-800 to-pink-700 p-2 text-xl rounded-full" onClick={toggleInstructions}><FaRegLightbulb /></span>
       {showInstructions && <InstructionsModal onClose={toggleInstructions} />}
      </div>
      <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-around items-center h-full mt-20 font-montserrat">
        <div className=" w-[85vw] lg:w-[30vw] h-[50vh] lg:h-[55vh] flex flex-col gap-4">
          <div className="flex w-full gap-2 justify-between ">
          <div >
            <input
              className="focus:outline-none focus:ring focus:border-purple-700 p-2 border border-gray-800 rounded-md bg-gray-900 text-gray-300"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
            />
          </div>
          <div>
            <input
              className="focus:outline-none focus:ring focus:border-purple-700 w-full p-2 border border-gray-800 rounded-md bg-gray-900 text-gray-300"
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="Prefix..."
            />
          </div>
          </div>
          <div className="h-full">
            <textarea
              className="focus:outline-none focus:ring focus:border-purple-700 w-full p-2 border border-gray-800 rounded-md bg-gray-900 text-gray-300 h-full overflow-auto "
              value={bodyElement}
              onChange={(e) => setBodyElement(e.target.value)}
              placeholder="Body..."
            ></textarea>
          </div>
         
        </div>
        <div className="w-[85vw] lg:w-[30vw] h-[50vh] lg:h-[55vh] flex flex-col">
        <textarea
            className="focus:outline-none focus:ring focus:border-purple-700 w-full p-4 border border-gray-800 rounded-md bg-gray-900 text-gray-300 h-[55vh] overflow-auto"
            placeholder="Snippet will appear here..."
            value={snippet}
            readOnly
          ></textarea>
          <ToastContainer />
          <div className="w-full relative">
          {snippet && (
            <button
              className="mt-2 lg:mt-4 absolute right-0 py-2 px-1 lg:px-0 bg-gradient-to-r from-purple-600 to-pink-800 hover:scale-105 duration-125 ease-in-out text-white rounded-md  lg:w-[9vw]"
              onClick={copySnippet}
            >
              Copy Snippet
            </button>
          )}
          </div>
        </div>
      </div>
      <footer className="w-full font-montserrat text-md absolute bottom-3" >
        <p className="text-center">Made with 💖by <span className="bg-gradient-to-l from-[#ff49db] to-purple-500 bg-clip-text text-transparent font-semibold">Rico</span></p>
      </footer>
    </div>
  );
};

export default App;
