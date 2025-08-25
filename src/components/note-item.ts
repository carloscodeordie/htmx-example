import { Note } from "../models/interfaces";

export function createNoteItem(note: Note) {
  return `<div class="notes-list-item" id="note-${note.id}">
          <span>${note.value}</span>
          <button
            hx-delete="/notes/${note.id}"
            hx-target="#note-${note.id}"
            hx-swap="outerHTML"
          >Delete</button>
        </div>`;
}
