import React from "react";

interface Props {}

const CardBase = (props: Props) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img
          src="https://via.placeholder.com/250"
          className="h-12 w-12"
          alt="Placeholder logo image"
        />
      </div>
      <div>
        <div className="text-xl font-medium text-gray-900">Chit chat</div>
        <p className="text-gray-500"> You have mail!</p>
      </div>
    </div>
  );
};

export default CardBase;
