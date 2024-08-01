'use client';

import { useEffect, useState } from 'react';

import { TrashIcon } from '@heroicons/react/outline';

import TaskModal from './taskModal';

type Task = {
  _id: string;
  title: string;
  status: string;
  priority: string;
  deadline: string;
  description: string;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks/');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      <div>
        <div className="flex p-4 my-4 items-start flex-col md:flex-row   md:w-full ">
          {['To do', 'In progress', 'Under review', 'Finished'].map(
            (status) => (
              <div
                key={status}
                className="w-1/4 bg-[#F9F9F9] p-3 mx-2 mb-4 rounded-lg shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                  />
                </svg>

                <h2 className="text-lg font-semibold mb-4 space-5 gap-4">
                  {status}
                </h2>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <div
                      key={task._id}
                      className="bg-neutral-200 p-2 rounded-xl shadow-md my-5"
                    >
                      <h3 className="text-md font-bold p-1">{task.title}</h3>
                      <p className="text-sm text-gray-600 p-1">{task.status}</p>
                      <p className="text-sm text-gray-600 p-1">
                        {task.description}
                      </p>
                      <p
                        className={`text-sm mt-2 bg-[#FFA235] w-20 p-1 rounded-xl ${
                          task.priority === 'Urgent'
                            ? 'bg-red-500'
                            : task.priority === 'Medium'
                              ? 'bg-orange-500'
                              : task.priority === 'Low'
                                ? 'bg-green-200'
                                : 'bg-white'
                        }`}
                      >
                        <span className="font-medium px-2">
                          {task.priority}
                        </span>
                      </p>
                      <p className="text-sm p-2">
                        <span className="font-medium">
                          {new Date(task.deadline).toLocaleDateString()}
                        </span>
                      </p>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="mt-2 bg-red-500 text-white py-2 px-3 rounded-xl hover:bg-red-700 transition"
                      >
                        <TrashIcon className="w-4" />
                      </button>
                    </div>
                  ))}
                <button
                  onClick={openModal}
                  className="mt-4 w-full bg-[#3A3A3A] text-white py-2 rounded-md hover:bg-[#0c0c0c] transition"
                >
                  Add new
                </button>
              </div>
            ),
          )}
        </div>
      </div>
      <TaskModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default TaskList;
