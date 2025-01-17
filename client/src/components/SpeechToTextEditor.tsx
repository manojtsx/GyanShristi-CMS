"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";  
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/link.min.js";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

// Dynamically import FroalaEditorComponent to prevent SSR issues
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

interface SpeechToTextEditorProps {
  value: string;
  onChange: (newContent: string) => void;
}

const SpeechToTextEditor: React.FC<SpeechToTextEditorProps> = ({value, onChange}) => {
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const updateEditorContent = useCallback(
    debounce((transcript: string) => {
      if (editorInstance) {
        editorInstance.html.insert(" " + transcript);
        resetTranscript();
      }
    }, 1000), // Adjust the debounce delay as needed
    [editorInstance, resetTranscript]
  );

  const insertTranscriptIntoEditor = useCallback(() => {
    if (editorInstance && transcript) {
      // Insert transcript into the editor
      editorInstance.html.insert(" " + transcript);
      resetTranscript();
    }
  }, [editorInstance, transcript, resetTranscript]);

  useEffect(() => {
    if (editorInstance) {
      const handleContentChanged = () => {
        const currentContent = editorInstance.html.get();
      };

      // Attach the contentChanged event handler
      editorInstance.events.on("contentChanged", handleContentChanged);

      // Cleanup event listener on component unmount
      return () => {
        if (editorInstance.events.off) {
          editorInstance.events.off("contentChanged", handleContentChanged);
        }
      };
    }
  }, [editorInstance]);

  useEffect(() => {
    if (transcript) {
      updateEditorContent(transcript);
    }
  }, [transcript, updateEditorContent]);

  const startListening = () => {
    if (navigator.onLine) {
      SpeechRecognition.startListening({ continuous: true , language : 'en-US'});
    } else {
      alert("You are offline. Please check your internet connection.");
    }
  };
  const stopListening = () => {
    if(transcript){
      insertTranscriptIntoEditor();
    }
    if(editorInstance){
      const currentContent = editorInstance.html.get();
      onChange(currentContent);
    }
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <div className=" flex gap-x-3 mb-3">
        <button
          onClick={startListening}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faMicrophone} className="mr-2" /> Start
          Listening
        </button>
        <button
          onClick={stopListening}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faMicrophoneSlash} className="mr-2" /> Stop
          Listening
        </button>
      </div>
      <div className="w-[650px] h-92 ">
        <FroalaEditorComponent
          tag="textarea"
          model={value}
          onModelChange={onChange}
          config={{
            placeholderText: "Start writing the content...",
            events: {
              initialized: function () {
                setEditorInstance(this);
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SpeechToTextEditor;