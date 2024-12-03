import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex items-center flex-col max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold  my-7">Profile</h1>
      {currentUser.avatar ? (
        <img
          src={currentUser.avatar}
          alt="profile-image"
          className="rounded-full h-24 w-24 object-cover cursor-pointer"
        />
      ) : (
        <CgProfile className="rounded-full h-14 w-14 object-cover cursor-pointer" />
      )}

      <form action="" className="flex flex-col w-full mt-7 gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          value={currentUser.username}
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          value={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          value={currentUser.password}
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5 w-full">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-blue-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
