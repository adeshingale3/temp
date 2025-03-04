import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.title || !input.content) return;

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, input);
        setEditId(null);
      } else {
        await axios.post(API_URL, input);
      }
      setInput({ title: '', content: '' });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (note) => {
    setInput({ title: note.title, content: note.content });
    setEditId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Notes App</h1>
        
        {/* Note Form */}
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
          <input
            type="text"
            placeholder="Note Title"
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Note Content"
            value={input.content}
            onChange={(e) => setInput({ ...input, content: e.target.value })}
            className="w-full mb-4 p-2 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {editId ? 'Update Note' : 'Add Note'}
          </button>
        </form>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div key={note._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{note.title}</h3>
                <p className="text-gray-600 flex-grow whitespace-pre-wrap">{note.content}</p>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;