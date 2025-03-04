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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">My Notes</h1>
        <p className="text-gray-400 mb-8">Capture your thoughts and ideas</p>
        
        {/* Note Form */}
        <form onSubmit={handleSubmit} className="mb-12 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700">
          <input
            type="text"
            placeholder="Note Title"
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
            className="w-full mb-4 p-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            placeholder="Note Content"
            value={input.content}
            onChange={(e) => setInput({ ...input, content: e.target.value })}
            className="w-full mb-4 p-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent h-32"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold
                       transform transition duration-200 hover:scale-105 hover:bg-blue-600
                       shadow-lg hover:shadow-blue-500/50"
          >
            {editId ? '✏️ Update Note' : '📝 Add Note'}
          </button>
        </form>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note._id} 
                 className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 
                          p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all 
                          duration-300 hover:scale-105">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-3 text-white">{note.title}</h3>
                <p className="text-gray-300 flex-grow whitespace-pre-wrap mb-4">{note.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-4">
                  <span>
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="space-x-3">
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      🗑️ Delete
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