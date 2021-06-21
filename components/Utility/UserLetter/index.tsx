import React from "react";

// const Sizes = {
//   Small: "h-12 w-12",
//   Regular: "h-16 w-16",
//   Medium: "h-20 w-20",
//   Large: "h-24 w-24",
//   ExtraLarge: "h-32 w-32",
// } as const;

// type Sizes = typeof Sizes[keyof typeof Sizes];

export enum Sizes {
  ExtraSmall = "h-10 w-10 text-2xl",
  Small = "h-12 w-12 text-2xl",
  Regular = "h-16 w-16 text-3xl",
  Medium = "h-20 w-20 text-4xl",
  Large = "h-24 w-24 text-5xl",
  ExtraLarge = "h-32 w-32 text-6xl",
}

export interface IUserLetter {
  username: string;
  size?: Sizes;
}

const UserLetter = ({ username, size = Sizes.Regular }: IUserLetter) => {
  return (
    <div
      className={`rounded-full bg-secondary-main ${size}  relative flex justify-center items-center`}
    >
      <div className="absolute text-white font-black uppercase ">
        {username[0]}
      </div>
    </div>
  );
};

export default UserLetter;
