import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { list } from 'postcss';

export default function Todos({ todoList }) {

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitile] = useState('');


  const { data, setData, post, reset } = useForm({ title: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/todos', {
      onSuccess: () => reset(),
    })
  }

  const handleDelete = (id) => {

    router.delete(`/todos/${id}`, {
      preserveScroll: true //this will prevents page from scrolling back to the top after a request.
    })

  }
  const handleEditSubmit = (id) => {
    if (editTitle.trim() === '') return;

    router.put(`/todos/${id}`, { title: editTitle }, {
      onSuccess: () => {
        setEditId(null);
        setEditTitile('');
      }
    })
  }

  const handleEdit = (id, title) => {
    setEditId(id);
    setEditTitile(title);

  }

  const handleBulkDelete = () => {
    router.delete('/todos/bulk-delete', {
      preserveScroll: true
    })
  }
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-700 to-purple-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-6">

        {/* <!-- Header with gradient text --> */}
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text tracking-widest">
          My Day
        </h1>

        {/* <!-- Mini quote --> */}
        <p className="text-center text-sm text-purple-200 italic mb-4">"Small steps every day!"</p>

        {/* <!-- Todo Input --> */}
        <div className="bg-white/10 rounded-md mb-4 shadow-inner">
          <form onSubmit={handleSubmit}>
            <input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              type="text"
              placeholder="What's on your mind today?"
              className="w-full bg-transparent text-white placeholder-purple-300 px-5 py-3 rounded-md focus:outline-none"
            />

          </form>
        </div>

        {/* <!-- Todo List --> */}
        <ul className="bg-white/5 rounded-lg divide-y divide-purple-700 shadow-md text-white">
          {
            todoList.length !== 0 ? todoList.map((list) => (
              editId !== list.id ?

                <li key={list.id} className="flex justify-between items-center px-5 py-4">

                  <span className="text-base cursor-pointer" onClick={() => handleEdit(list.id, list.title)}>🧠 {list.title}</span>


                  <span
                    onClick={() => handleDelete(list.id)}
                    className="w-5 h-5 border-2 border-purple-400 rounded-full hover:bg-purple-600 transition cursor-pointer flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>

                </li>
                :
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitile(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit(list.id)}
                  autoFocus
                  type="text"
                  placeholder="What's on your mind today?"
                  className="w-full bg-transparent text-white placeholder-purple-300 px-5 py-3 rounded-md focus:outline-none"
                />

            )) : <div className="mt-4 p-4 border border-[#5E936C] bg-[#E8FFD7] text-[#3E5F44] rounded-lg shadow-sm text-center">
              📝 Nothing here yet! Add your first todo.
            </div>


          }
        </ul>

        {/* <!-- Footer Actions --> */}
        <div className="flex justify-between items-center text-sm text-purple-300 mt-4 px-2">
          <span>{todoList.length} tasks left</span>

          <button className="hover:text-white" onClick={handleBulkDelete}>Clear</button>
        </div>

        {/* <!-- Drag Note --> */}
        <p className="text-center text-xs text-purple-400 mt-6">🖱️ Drag to reorder your tasks</p>
      </div>
    </div >

  );
}
