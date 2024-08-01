'use client';

import React, { useState } from 'react';

import {
  CalendarIcon,
  FilterIcon,
  PlayIcon,
  PlusCircleIcon,
  ShareIcon,
} from '@heroicons/react/outline';

import SearchBar from './searchBar';
import TaskModal from './taskModal';

const Ribbon: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="flex justify-around items-center mx-6  bg-gray-100 rounded-lg shadow flex-col md:flex-row  my-2">
        <SearchBar />
        <button className="flex items-center space-x-2 p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-300 transition">
          <span>Calendar View</span>
          <CalendarIcon className="h-5 w-5" />
        </button>

        <button className="flex items-center space-x-2 p-2  bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-300  transition">
          <span>Filter</span>
          <FilterIcon className="h-5 w-5" />
        </button>
        <button className="flex items-center space-x-2 p-2  bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-300  transition">
          <span>Automation</span>
          <PlayIcon className="h-5 w-5" />
        </button>
        <button className="flex items-center space-x-2 p-2  bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-300  transition">
          <span>Share</span>
          <ShareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={openModal}
          className="flex items-center space-x-2 p-2 bg-[#4C38C2] text-white rounded-lg hover:bg-[#3a23c2]   transition delay-150 duration-300"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>Create New</span>
        </button>
      </div>
      <TaskModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Ribbon;
