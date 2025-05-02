'use client';

import { useState } from 'react';

import UserCard from "./current-user/page";
import UserAlert from "./user-home/user-alert/page";
import UserSubmitReport from "./user-home/user-submit-report/page";
import UserAnnouncement from "./user-home/user-announcement/page";
import { FaBullhorn, FaExclamationTriangle, FaRegEdit } from 'react-icons/fa';

export default function UserHome() {
  const [activeTab, setActiveTab] = useState<'submit' | 'alerts' | 'announcements'>('submit');

  return (
    <>
      <UserCard />
      <div className="w-[90%] min-h-screen mx-auto flex">
        <div className="w-[20%] mt-20">
          <h1 className="font-bold text-2xl">Navigate To:</h1>
          <ul className="py-5">
            <li
              className={`flex items-center gap-2 py-4 pl-2 rounded-2xl cursor-pointer ${activeTab === 'submit' ? 'bg-[#F3775C] text-white font-semibold' : 'hover:bg-gray-100 text-[#333]'
                }`}
              onClick={() => setActiveTab('submit')}
            >
              <FaRegEdit size={20} color={activeTab === 'submit' ? 'white' : '#333'} />
              Submit Report
            </li>

            <li
              className={`flex items-center gap-2 py-4 pl-2 rounded-2xl cursor-pointer ${activeTab === 'alerts' ? 'bg-[#F3775C] text-white font-semibold' : 'hover:bg-gray-100 text-[#333]'
                }`}
              onClick={() => setActiveTab('alerts')}
            >
              <FaExclamationTriangle size={20} color={activeTab === 'alerts' ? 'white' : '#333'} />
              Alerts
            </li>

            <li
              className={`flex items-center gap-2 py-4 pl-2 rounded-2xl cursor-pointer ${activeTab === 'announcements' ? 'bg-[#F3775C] text-white font-semibold' : 'hover:bg-gray-100 text-[#333]'
                }`}
              onClick={() => setActiveTab('announcements')}
            >
              <FaBullhorn size={20} color={activeTab === 'announcements' ? 'white' : '#333'} />
              Announcements
            </li>
          </ul>
        </div>

        <div className="w-[80%] mt-10">
          {activeTab === 'submit' && <UserSubmitReport />}
          {activeTab === 'alerts' && <UserAlert />}
          {activeTab === 'announcements' && <UserAnnouncement />}
        </div>
      </div>
    </>
  );
}