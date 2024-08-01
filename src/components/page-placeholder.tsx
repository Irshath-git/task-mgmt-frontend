'use client';

import React from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/outline';

import { CardItems } from '../data/cardItems';
import Card from './card';
import Ribbon from './ribbon';
import TaskList from './taskList';

export default function PagePlaceholder({ pageName }: { pageName: string }) {
  return (
    <>
      <div className="flex flex-1 py-4 h-screen sm:h-fit flex-col px-0">
        <div className="w-full bg-none">
          <span className="font-bold text-3xl float-left">
            Good Morning Joe!
          </span>
          <a className="float-right flex cursor-pointer invisible sm:visible">
            Help & Feedback
            <QuestionMarkCircleIcon className="w-5" />
          </a>
        </div>
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CardItems.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              sub={item.sub}
              img={item.img}
            />
          ))}
        </div>
      </div>
      <Ribbon />
      <TaskList />
    </>
  );
}
