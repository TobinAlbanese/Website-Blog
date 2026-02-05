import React, { useCallback, useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export default function TiptapEditor({
  value = "",
  onChange,
  placeholder = "Write...",
  onUploadImage,
}) {
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [imgAlign, setImgAlign] = useState("center"); // center | float-left | float-right
  const [imgCaption, setImgCaption] = useState("");

  const CustomImage = Image.extend({
    name: "figureImage",
    addAttributes() {
      return {
        src: { default: null },
        alt: { default: "" },
        align: { default: "center" },
        caption: { default: "" },
      };
    },
    parseHTML() {
      return [{ tag: "figure" }, { tag: "img" }];
    },
    renderHTML({ HTMLAttributes }) {
      const { caption = "", align = "center", src, alt } = HTMLAttributes;
      const cls = `img--${align}`;
      return [
        "figure",
        { class: cls },
        ["img", { src, alt }],
        ["figcaption", {}, caption],
      ];
    },
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      CustomImage.configure({ inline: false, allowBase64: false }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "admin-tiptap",
        spellCheck: "true",
        "data-placeholder": placeholder,
      },
    },
  });

  const upload = useCallback(
    async (file) => {
      if (!file) return null;
      if (onUploadImage) return await onUploadImage(file);
      return URL.createObjectURL(file);
    },
    [onUploadImage]
  );

  const topAction = () => ({
    background: "transparent",
    border: "none",
    padding: 0,
    color: "#d62827",
    fontWeight: 900,
    cursor: "pointer",
  });

  const openImageModal = (file) => {
    setPendingFile(file);
    setImgAlign("center");
    setImgCaption("");
    setImgModalOpen(true);
  };

  const confirmInsertImage = async () => {
    if (!editor || !pendingFile) return;
    if (!imgCaption.trim()) return; // require caption
    const url = await upload(pendingFile);
    if (!url) return;

    editor
      .chain()
      .focus()
      .setNode("figureImage", {
        src: url,
        alt: pendingFile.name,
        caption: imgCaption.trim(),
        align: imgAlign,
      })
      .run();

    setImgModalOpen(false);
    setPendingFile(null);
  };

  const Toolbar = useMemo(() => {
    if (!editor) return null;

    const fileChange = (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      openImageModal(f);
      e.target.value = "";
    };

    return (
      <div className="tiptap-toolbar">
        <div className="tiptap-toolbar-left">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`tiptap-btn ${editor.isActive("bold") ? "is-active" : ""}`}
          >
            B
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`tiptap-btn ${editor.isActive("italic") ? "is-active" : ""}`}
          >
            I
          </button>
        </div>

        <div className="tiptap-toolbar-right">
          <label className="tiptap-btn tiptap-upload">
            Insert Image
            <input
              type="file"
              accept="image/*"
              onChange={fileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
    );
  }, [editor]);

  return (
    <div>
      {Toolbar}

      <div
        className="tiptap-wrapper"
        style={{
          background: "var(--c-bg-primary)",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {imgModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "grid",
            placeItems: "center",
            zIndex: 9999,
            padding: 16,
          }}
          onClick={() => setImgModalOpen(false)}
        >
          <div
            style={{
              width: "min(560px, 96vw)",
              background: "var(--c-bg-primary)",
              borderRadius: 14,
              padding: 16,
              boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 10 }}>
              Insert Image
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <div>
                <div className="admin-label">Alignment</div>
                <select
                  className="admin-select"
                  value={imgAlign}
                  onChange={(e) => setImgAlign(e.target.value)}
                >
                  <option value="center">Center</option>
                  <option value="float-left">Float Left</option>
                  <option value="float-right">Float Right</option>
                </select>
              </div>

              <div>
                <div className="admin-label">Caption (required)</div>
                <input
                  className="admin-input"
                  value={imgCaption}
                  onChange={(e) => setImgCaption(e.target.value)}
                  placeholder="Write a caption…"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 12,
                  marginTop: 6,
                }}
              >
                <button
                  className="admin-btn-soft"
                  type="button"
                  onClick={() => setImgModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="admin-btn"
                  type="button"
                  onClick={confirmInsertImage}
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
