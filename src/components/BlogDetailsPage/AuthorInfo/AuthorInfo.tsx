/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "../../Reusable/Button/Button";

const AuthorInfo = ({ author }: any) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">
        About the Author
      </h3>

      <div className="flex flex-col items-center text-center">
        <img
          src={author.image}
          alt={author.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-primary-5/30 mb-3"
        />
        <h4 className="font-semibold text-gray-900 text-lg">{author.name}</h4>
        <p className="text-xs text-gray-500 mt-1">
          {author.experience} experience
        </p>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed mb-4">
          {author.bio}
        </p>

        <Button label="Consult Now" />
      </div>
    </div>
  );
};

export default AuthorInfo;
