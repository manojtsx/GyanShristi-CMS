"use client";
import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
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

// Dynamically import FroalaEditorComponent to prevent SSR issues
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

const SpeechToTextEditor: React.FC = () => {
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const [editorInstance, setEditorInstance] = useState<any>(null);

  const startListening = () => {
    console.log("Starting speech recognition...");
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const stopListening = () => {
    console.log("Stopping speech recognition...");
    SpeechRecognition.stopListening();
    resetTranscript(); // Clear the transcript after stopping listening
  };

  useEffect(() => {
    if (editorInstance) {
      const currentContent = editorInstance.html.get();
      console.log("Current editor content:", currentContent);
      console.log("New transcript:", transcript);

      if (transcript) {
        const updatedContent = currentContent + transcript;
        editorInstance.html.set(updatedContent);
        console.log("Updated editor content:", updatedContent);
        setEditorInstance(updatedContent);
        resetTranscript(); //Clear the transcript after updating the editor
      }
    }
  }, [transcript, editorInstance]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Speech recognition is not supported in this browser.</p>;
  }

  return (
    <div>
      <h1>TextEditor</h1>
      <div>
        <FroalaEditorComponent
          tag="textarea"
          config={{
            placeholderText: "Start writing the content...",
            events: {
              initialized: function () {
                console.log("Froala Editor initialized");
                setEditorInstance(this);
              },
            },
          }}
        />
      </div>
      <div>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={stopListening}>Stop Listening</button>
      </div>
    </div>
  );
};

export default SpeechToTextEditor;
