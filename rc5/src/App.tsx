import NotesList from "./components/NotesList";
import CollaboratorsList from "./components/CollaboratorList";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>CollabNotes</h1>
      <section>
        <h2>Notes</h2>
        <NotesList />
      </section>
      <section>
        <h2>Collaborators</h2>
        <CollaboratorsList />
      </section>
    </div>
  );
}

export default App;
