import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { MdDescription } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import Parser from "html-react-parser";

const DescriptionEditor = () => {
  const [displayEditor, setDisplayEditor] = useState(false);
  const [editorKey, setEditorKey] = useState(2);
  const [editorContent, setEditorContent] = useState("");

  const editorRef: React.MutableRefObject<any> = useRef();

  const toggleDisplayEditor = () => {
    if (displayEditor) {
      const newKey = editorKey * 3;
      setEditorKey(newKey);
    }
    setDisplayEditor((prevState) => !prevState);
  };

  const saveEditorTextHandler = (e: { preventDefault: Function }) => {
    e.preventDefault();
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log(typeof content);
      setEditorContent(content);
      setDisplayEditor((prevState) => !prevState);
    }
  };

  return (
    <div className="w-full mt-6">
      <div className="flex items-cente">
        <p className="flex text-[#bdbdbd] items-center">
          <MdDescription className="text-current w-2.5 h-2.5" />
          <span className=" text-xs font-semibold ml-1">Description</span>
        </p>
        {editorContent && (
          <button
            type="button"
            className="ml-3 border px-2.5 py-1 rounded-lg  text-xs flex items-center text-color-grey-3 border-color-border"
            onClick={toggleDisplayEditor}
          >
            <RiPencilFill className="text-current w-2.5 h-2.5 mr-2" />
            Edit
          </button>
        )}
      </div>

      <p
        className={`w-full text-sm py-1 px-2 my-1 hover:bg-color-grey hover:cursor-text ${
          displayEditor ? "hidden" : editorContent ? "hidden" : "block"
        }`}
        onClick={toggleDisplayEditor}
      >
        Add a description...
      </p>
      {!displayEditor && (
        <div className="mt-1 w-full">{Parser(editorContent)}</div>
      )}
      <form
        className={`w-full mt-2 ${displayEditor ? "block" : "hidden"}`}
        onSubmit={saveEditorTextHandler}
      >
        <Editor
          key={editorKey}
          apiKey="1cemjhmu0v1ckwaa30f24d5u0e5bhi03n3llz92rbzs781w7"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={`${editorContent}`}
          init={{
            width: "100%",
            height: 200,
            menubar: false,
            plugins: "link image code lists emoticons casechange ",
            toolbar:
              "bold italic | alignleft aligncenter alignright | numlist bullist | forecolor backcolor | emoticons | fontfamily | fontsize | lineheight | blocks | casechange ",
          }}
        />
        <div className="mt-2">
          <button
            type="submit"
            className="bg-color-btn text-color-white text-base py-1 px-2 border border-color-btn hover:bg-color-white hover:text-color-btn transition-all duration-300 ease-linear rounded-lg"
          >
            Save
          </button>
          <button
            type="button"
            onClick={toggleDisplayEditor}
            className=" hover:bg-color-white hover:text-color-grey-4 hover:border-color-grey-4 text-base py-1 px-2 text-color-grey-3 bg-color-grey border border-color-grey  ml-3 rounded-lg transition-all duration-300 ease-linear"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DescriptionEditor;
