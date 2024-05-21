import React from "react";

const Card = ({ imageSrc, title, content, img2, text,btn }) => {
  return (
    <div className="w-[370px] bg-white rounded-lg  ">
      <img className="w-full h-64 object-cover rounded object-center transition-transform duration-300 ease-in-out transform hover:scale-105" src={imageSrc} alt={title} />
      <div className="p-5">
      <h2 className="text-lg font-bold mb-2  border-purple-700 hover:underline" style={{ textDecorationColor: 'purple' ,}}>{title}</h2>
        <p className="text-gray-600 mb-4">{content}</p>
        <div className="flex items-center gap-3">
          <img className="w-8 h-8 rounded-full " src={img2} />
          <p className="text-gray-700 text-[15px]">{text}</p>
          <h2 className='bg-purple-100 rounded-xl w-[90px] text-purple-700 text-center p-1 '>{btn}</h2>
        </div>
.      </div>
    </div>
  );
};

export default Card;
