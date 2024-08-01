'use client';

import { usePathname } from 'next/navigation';

import { BarChart, Home, Settings, SquareKanban, Users } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'Home',
      href: '/',
      icon: <Home size={20} />,
      active: pathname === '/',
      position: 'top',
      button: false,
    },
    {
      name: 'Boards',
      href: '/',
      icon: <SquareKanban size={20} />,
      position: 'top',
      button: false,
    },
    {
      name: 'Analytics',
      href: '/',
      icon: <BarChart size={20} />,
      position: 'top',
      button: false,
    },
    {
      name: 'Teams',
      href: '/',
      icon: <Users size={20} />,
      position: 'top',
      button: false,
    },
    {
      name: 'Settings',
      href: '/',
      icon: <Settings size={20} />,
      position: 'bottom',
      button: false,
    },
  ];
};
