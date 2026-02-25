
"use client";

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { SIDEBAR_LINKS } from './utils/Constants';

const SideNav = () => {

  const router = useRouter();

  const [cItem, setCItem] = useState('Home');
  return (
    <div className="bg-[#181824] min-h-screen text-white border-r border-gray-50">
      <div className="flex flex-col justify-center items-center">
        <li className="list-none p-2 text-[#e91e63] text-2xl border-b border-gray-500 ">Task Manager</li>
        <ul>
          {SIDEBAR_LINKS.map(item => <li key={item.name} onClick={() => {
            router.push(item.path);
            setCItem(item.name)
          }}
            className={`${cItem === item.name && 'text-amber-400 transition-all duration-300'} m-6 cursor-pointer`}>{item.name}</li>)}
        </ul>

      </div>
    </div>
  )
}

export default SideNav;




