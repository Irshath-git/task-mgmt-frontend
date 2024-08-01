import React, { useState } from 'react';

import { ShareIcon, StarIcon, SunIcon, XIcon } from '@heroicons/react/outline';

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // onTaskCreated: () => void;
};

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Low');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          status,
          priority,
          deadline,
          description,
        }),
      });

      if (response.ok) {
        onClose();
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-10 flex items-start transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
            isOpen
              ? 'opacity-100 transition delay-200 ease-in-out'
              : 'opacity-0 pointer-events-none'
          } `}
        >
          <div
            className={`fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-lg transform transition-transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-3 flex justify-between items-center border-b border-gray-200">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XIcon className="h-5 w-5" />
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </button>
              <button className="flex items-center space-x-2 p-2  bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-300  transition">
                <span>Share</span>
                <ShareIcon className="h-5 w-5" />
              </button>
              <button className="flex items-center space-x-2 p-2  bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-300  transition">
                <span>Favorite</span>
                <StarIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-white w-3/4 md:w-full p-6 shadow-lg h-screen overflow-auto">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 ">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
                  >
                    <option>To do</option>
                    <option>In progress</option>
                    <option>Under review</option>
                    <option>Finished</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>Urgent</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#4C38C2] text-white py-2 px-4 rounded-md hover:bg-[#3a23c2]"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
            {/* <div className="p-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-4 border-b-2 border-gray-200 mb-4 text-3xl font-semibold focus:outline-none"
            />

            <div className="relative flex gap-2">
              <SunIcon className="w-5 m-2 stroke-slate-500" />
              <span className="mx-5 my-3">Status</span>
              <select
                id="countries"
                className="bg-gray-50 border-b-2 w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value="TD">
                  To do
                </option>
                <option value="IP">In progress</option>
                <option value="UR">Under review</option>
                <option value="FD">Finished</option>
              </select>
            </div>
            <div className="relative flex gap-2">
              <SunIcon className="w-5 m-2 stroke-slate-500" />
              <span className="mx-5 my-3">Priority</span>
              <select
                id="countries"
                className="bg-gray-50 border-b-2 w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value="TD">
                  To do
                </option>
                <option value="IP">In progress</option>
                <option value="UR">Under review</option>
                <option value="FD">Finished</option>
              </select>
            </div>
            <div className="relative flex gap-2">
              <SunIcon className="w-5 m-2 stroke-slate-500" />
              <span className="mx-5 my-3">Deadline</span>
              <select
                id="countries"
                className="bg-gray-50 border-b-2 w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value="TD">
                  To do
                </option>
                <option value="IP">In progress</option>
                <option value="UR">Under review</option>
                <option value="FD">Finished</option>
              </select>
            </div>
            <div className="relative flex gap-2">
              <SunIcon className="w-5 m-2 stroke-slate-500" />
              <span className="mx-5 my-3">Description</span>
              <select
                id="countries"
                className="bg-gray-50 border-b-2 w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value="TD">
                  To do
                </option>
                <option value="IP">In progress</option>
                <option value="UR">Under review</option>
                <option value="FD">Finished</option>
              </select>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
