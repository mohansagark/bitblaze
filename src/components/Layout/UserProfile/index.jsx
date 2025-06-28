import React from "react";
import { MdClose } from "react-icons/md";

import { userProfileData } from "../../../helpers/config";
import avatar from "../../../data/avatag.jpeg";
import Button from "../../common/Button";

const UserProfile = ({ closeUserProfile }) => {
  return (
    <div className="nav-item right-1 top-16 bg-surface opacity-95 p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-surface-text">User Profile</p>
        <MdClose
          onClick={closeUserProfile}
          size={24}
          className="text-surface-text cursor-pointer"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl text-surface-text">
            Mohan Sagar Killamsetty
          </p>
          <p className="text-sm text-neutral-400">Administrator</p>
          <p className="text-neutral-400 text-sm font-semibold">
            contact@devmohan.in
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold text-surface-text">{item.title}</p>
              <p className="text-neutral-400 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button
          className="text-primary-text"
          bgColor="bg-primary"
          text="Logout"
          borderRadius="10px"
        />
      </div>
    </div>
  );
};

export default UserProfile;
