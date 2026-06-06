import { IMAGES } from "../../../assets";

const ProfileCompleted = () => {
  return (
    <div className="min-h-56 flex flex-col items-center justify-center">
      <img
        src={IMAGES.profileCompleted}
        alt="Profile Completed"
        className="w-32 mx-auto"
      />
    </div>
  );
};

export default ProfileCompleted;
