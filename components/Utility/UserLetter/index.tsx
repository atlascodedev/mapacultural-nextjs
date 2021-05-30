import React from "react";

export interface IUserLetter {
  username: string;
}

const UserLetter = ({ username }: IUserLetter) => {
  return (
    <div className="rounded-full bg-secondary-main h-16 w-16 relative flex justify-center items-center">
      <div className="absolute text-white font-black uppercase text-4xl">
        {username[0]}
      </div>
    </div>
  );
};

export default UserLetter;
