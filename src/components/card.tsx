'use client';

import React from 'react';

interface CardProps {
  title: string;
  sub: string;
  img: string;
}

const Card: React.FC<CardProps> = ({ title, sub, img }) => {
  return (
    <div className="max-w-md max-h-72 mx-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w-96 md:max-h-32">
      <div className="md:flex">
        <div className="md:shrink-0">
          {img && (
            <img
              className="h-28 object-scale-down md:w-24 p-2 sm:h-24 flex items-center mx-auto"
              src={img}
              alt={title}
            />
          )}
        </div>
        <div className="px-4 py-2">
          <div className=" tracking-wide text-lg sm:text-sm text-gray-500 font-bold">
            {title}
          </div>
          <p className="block mt-1 text-md sm:text-sm leading-snug font-medium text-gray-500 py-1">
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
