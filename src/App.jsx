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
        return `"${line}"`;// For correct spacing as written in input
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
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Prefix:</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Body Element:</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={bodyElement}
            onChange={(e) => setBodyElement(e.target.value)}
          ></textarea>
        </div>
        <textarea
          className="mt-4 w-full h-40 p-4 border border-gray-300 rounded-md"
          placeholder="Snippet will appear here..."
          value={snippet}
          readOnly
        ></textarea>
        <ToastContainer />
        {snippet && (
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={copySnippet}
          >
            Copy Snippet
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
