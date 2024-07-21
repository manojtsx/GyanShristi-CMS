"use client";
import React from "react";
import dynamic from "next/dynamic";
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

// Dynamically import FroalaEditorComponent to prevent SSR issues
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

function TextEditor() {
  return (
    <div>
      <h1>TextEditor</h1>
      <div>
        <FroalaEditorComponent
          config={{
            placeholderText: "Start writing the content...",
          }}
        />
      </div>
    </div>
  );
}

export default TextEditor;
