import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [description, setDescription] = useState("");
  const [prefix, setPrefix] = useState("");
  const [bodyElement, setBodyElement] = useState("");
  const [snippet, setSnippet] = useState("");

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

  return (
    <div className="bg-black text-white min-h-screen">
      <div>
      <h1 className="pt-8 mb-6 text-4xl text-center underline font-sedan capitalize">Snippet Generator</h1>
      </div>
      <div className="flex justify-around items-center h-full">
        <div className="w-[30vw] h-[55vh] gap-2">
          <div className="flex w-full justify-between">
          <div >
            <label className="block text-gray-500 text-sm font-bold mb-2">Description:</label>
            <input
              className="p-2 border border-gray-800 rounded-md bg-gray-900 text-gray-300"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm font-bold mb-2">Prefix:</label>
            <input
              className="w-full p-2 border border-gray-800 rounded-md bg-gray-900 text-gray-300"
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
          </div>
          </div>
          <div className="h-full">
            <label className="block text-gray-500 text-sm font-bold mb-2">Body Element:</label>
            <textarea
              className="w-full p-2 border border-gray-800 rounded-md bg-gray-900 text-gray-300 h-full"
              value={bodyElement}
              onChange={(e) => setBodyElement(e.target.value)}
            ></textarea>
          </div>
         
        </div>
        <div className="w-[35vw] h-[65vh] flex flex-col justify-center items-center">
        <textarea
            className="outline-none w-full p-4 border border-gray-800 rounded-md bg-gray-900 text-gray-300 h-full"
            placeholder="Snippet will appear here..."
            value={snippet}
            readOnly
          ></textarea>
          <ToastContainer />
          {snippet && (
            <button
              className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-800 hover:scale-105 duration-125 ease-in-out text-white rounded-md hover:bg-green-600"
              onClick={copySnippet}
            >
              Copy Snippet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
