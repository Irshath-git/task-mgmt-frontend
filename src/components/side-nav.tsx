'use client';

import { Fragment, useEffect, useState } from 'react';

import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { NavItems } from '@/config';
import { cn } from '@/lib/utils';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import TaskModal from './taskModal';
import { ThemeToggle } from './theme-toggle';

export default function SideNav() {
  const navItems = NavItems();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('sidebarExpanded');
      if (saved === null) {
        return true;
      }
      return JSON.parse(saved);
    }
    return true;
  });

  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'sidebarExpanded',
        JSON.stringify(isSidebarExpanded),
      );
    }
  }, [isSidebarExpanded]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="pr-2">
        <div
          className={cn(
            isSidebarExpanded ? 'w-[200px]' : 'w-[68px]',
            'border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-full bg-accent z-10',
          )}
        >
          <aside className="flex h-full flex-col w-full break-words px-4 overflow-x-hidden columns-1">
            {/* Top */}
            <div className="mt-4 relative pb-2">
              <div className="flex flex-col space-y-1">
                {navItems.map((item, idx) => {
                  if (item.position === 'top') {
                    return (
                      <Fragment key={idx}>
                        <div className="space-y-1">
                          <SideNavItem
                            label={item.name}
                            icon={item.icon}
                            path={item.href}
                            active={item.active}
                            isSidebarExpanded={isSidebarExpanded}
                          />
                        </div>
                      </Fragment>
                    );
                  }
                })}

                {isButtonVisible && (
                  <button
                    onClick={openModal}
                    className={`flex items-center space-x-2 p-2 bg-[#4C38C2] text-white rounded-lg hover:bg-[#3a23c2] transition delay-150 duration-300`}
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    <span
                      className={`${isSidebarExpanded ? 'visible' : 'hidden'}`}
                    >
                      Create New
                    </span>
                  </button>
                )}
              </div>
            </div>
            {/* Bottom */}
            <div className="sticky bottom-0 mt-auto whitespace-nowrap mb-4 transition duration-200 block">
              <ThemeToggle isDropDown={true} />
              {navItems.map((item, idx) => {
                if (item.position === 'bottom') {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1">
                        <SideNavItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                        />
                      </div>
                    </Fragment>
                  );
                }

                <button
                  onClick={openModal}
                  className={`flex items-center space-x-2 p-2 bg-[#4C38C2] text-white rounded-lg hover:bg-[#3a23c2] transition delay-150 duration-300`}
                >
                  <PlusCircleIcon className="h-5 w-5" />
                  <span className="">Create New</span>
                </button>;
              })}
            </div>
          </aside>
          <div className="mt-[calc(calc(90vh)-40px)] relative">
            <button
              type="button"
              className="absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center border border-muted-foreground/20 rounded-full bg-accent shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              onClick={toggleSidebar}
            >
              {isSidebarExpanded ? (
                <ChevronLeft size={16} className="stroke-foreground" />
              ) : (
                <ChevronRight size={16} className="stroke-foreground" />
              )}
            </button>
          </div>
        </div>
        <TaskModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
}

export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
  return (
    <>
      {isSidebarExpanded ? (
        <Link
          href={path}
          className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
            active
              ? 'font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white'
              : 'hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
          }`}
        >
          <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
            {icon}
            <span>{label}</span>
          </div>
        </Link>
      ) : (
        <TooltipProvider delayDuration={70}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={path}
                className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                  active
                    ? 'font-base text-sm bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-white'
                    : 'hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                }`}
              >
                <div className="relative font-base text-sm p-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                  {icon}
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="px-3 py-1.5 text-xs"
              sideOffset={10}
            >
              <span>{label}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
