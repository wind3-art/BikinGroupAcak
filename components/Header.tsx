
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-6 px-4 shadow-md rounded-b-3xl">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">GuruGroup</h1>
          <p className="text-blue-100 text-sm">Bagi kelompok jadi lebih mudah dan adil!</p>
        </div>
        <div className="bg-white p-2 rounded-full">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
           </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
