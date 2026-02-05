// pages/admin/notes.jsx
import React, { useEffect, useMemo, useState } from "react";
import NavbarMB from "../../components/Admin/AdminNavbar.jsx"; // your admin navbar
import Footer from "../../components/LandingPage/Footer.jsx";  // optional if you want it
import { supabase } from "../../lib/supabase/client";

function Card({ children }) {
  return (
    <div
      style={{
        background: "var(--c-bg-primary)",
        borderRadius: 12,
        padding: 18,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
  );
}

export default function AdminNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newBody, setNewBody] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editBody, setEditBody] = useState("");
  const [rowBusy, setRowBusy] = useState({}); // { [id]: true }

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_notes")
      .select("id,body,created_at,updated_at")
      .order("updated_at", { ascending: false });

    if (!error) setNotes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const startEdit = (n) => {
    setEditingId(n.id);
    setEditBody(n.body || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditBody("");
  };

  const createNote = async () => {
    const body = newBody.trim();
    if (!body) return;

    setSaving(true);
    const { error } = await supabase
      .from("admin_notes")
      .insert([{ body }]);

    setSaving(false);
    if (!error) {
      setNewBody("");
      fetchNotes();
    }
  };

  const saveEdit = async (id) => {
    const body = editBody.trim();
    if (!body) return;

    setRowBusy((m) => ({ ...m, [id]: true }));
    const { error } = await supabase
      .from("admin_notes")
      .update({ body, updated_at: new Date().toISOString() })
      .eq("id", id);

    setRowBusy((m) => ({ ...m, [id]: false }));
    if (!error) {
      setEditingId(null);
      setEditBody("");
      fetchNotes();
    }
  };

  const deleteNote = async (id) => {
    if (!confirm("Delete this note?")) return;

    setRowBusy((m) => ({ ...m, [id]: true }));
    const { error } = await supabase.from("admin_notes").delete().eq("id", id);
    setRowBusy((m) => ({ ...m, [id]: false }));
    if (!error) fetchNotes();
  };

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <NavbarMB />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 0.5 }}>
            Notes
          </div>
          <div style={{ opacity: 0.7, marginTop: 4 }}>
            Add quick reminders, edit them later, or delete when done.
          </div>
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          {/* Create */}
          <Card>
            <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 10 }}>
              New Note
            </div>

            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Write a note..."
              rows={4}
              style={{
                width: "100%",
                borderRadius: 10,
                padding: 12,
                border: "1px solid rgba(214,40,39,0.5)",
                background: "rgba(0,0,0,0.12)",
                color: "var(--c-text)",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                lineHeight: 1.6,
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <button
                type="button"
                onClick={createNote}
                disabled={saving || !newBody.trim()}
                style={{
                  background: "#d62827",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontWeight: 900,
                  border: "none",
                  cursor: saving || !newBody.trim() ? "not-allowed" : "pointer",
                  opacity: saving || !newBody.trim() ? 0.7 : 1,
                }}
              >
                {saving ? "Saving..." : "Add Note"}
              </button>
            </div>
          </Card>

          {/* List */}
          <Card>
            <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 12 }}>
              Your Notes
            </div>

            {loading ? (
              <div style={{ opacity: 0.7 }}>Loading…</div>
            ) : !notes.length ? (
              <div style={{ opacity: 0.7 }}>No notes yet.</div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {notes.map((n) => {
                  const isEditing = editingId === n.id;
                  const busy = !!rowBusy[n.id];

                  return (
                    <div
                      key={n.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: 12,
                        alignItems: "start",
                        padding: 12,
                        borderRadius: 10,
                        background: "rgba(0,0,0,0.12)",
                      }}
                    >
                      {/* larger cross */}
                      <span
                        aria-hidden="true"
                        style={{
                          color: "#d62827",
                          fontSize: 48,
                          fontWeight: 900,
                          lineHeight: 1,
                          transform: "translateY(2px)",
                        }}
                      >
                        ♱
                      </span>

                      {/* body / editor */}
                      <div style={{ minWidth: 0 }}>
                        {isEditing ? (
                          <textarea
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            rows={3}
                            style={{
                              width: "100%",
                              borderRadius: 10,
                              padding: 10,
                              border: "1px solid rgba(214,40,39,0.5)",
                              background: "rgba(0,0,0,0.14)",
                              color: "var(--c-text)",
                              outline: "none",
                              resize: "vertical",
                              fontFamily: "inherit",
                              lineHeight: 1.6,
                            }}
                          />
                        ) : (
                          <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                            {n.body}
                          </div>
                        )}

                        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
                          Updated:{" "}
                          {n.updated_at
                            ? new Date(n.updated_at).toDateString()
                            : n.created_at
                              ? new Date(n.created_at).toDateString()
                              : "—"}
                        </div>
                      </div>

                      {/* actions */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => saveEdit(n.id)}
                              disabled={busy || !editBody.trim()}
                              style={{
                                background: "#d62827",
                                color: "white",
                                padding: "8px 10px",
                                borderRadius: 10,
                                fontWeight: 900,
                                border: "none",
                                cursor: busy || !editBody.trim() ? "not-allowed" : "pointer",
                                opacity: busy || !editBody.trim() ? 0.7 : 1,
                              }}
                            >
                              {busy ? "Saving..." : "Save"}
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={busy}
                              style={{
                                background: "rgba(0,0,0,0.18)",
                                color: "var(--c-text)",
                                padding: "8px 10px",
                                borderRadius: 10,
                                fontWeight: 900,
                                border: "none",
                                cursor: busy ? "not-allowed" : "pointer",
                                opacity: busy ? 0.7 : 1,
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => startEdit(n)}
                              disabled={busy}
                              style={{
                                background: "rgba(0,0,0,0.18)",
                                color: "var(--c-text)",
                                padding: "8px 10px",
                                borderRadius: 10,
                                fontWeight: 900,
                                border: "none",
                                cursor: busy ? "not-allowed" : "pointer",
                                opacity: busy ? 0.7 : 1,
                              }}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteNote(n.id)}
                              disabled={busy}
                              style={{
                                background: "rgba(214,40,39,0.12)",
                                color: "#d62827",
                                padding: "8px 10px",
                                borderRadius: 10,
                                fontWeight: 900,
                                border: "1px solid rgba(214,40,39,0.35)",
                                cursor: busy ? "not-allowed" : "pointer",
                                opacity: busy ? 0.7 : 1,
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Optional */}
      <Footer />
    </div>
  );
}
