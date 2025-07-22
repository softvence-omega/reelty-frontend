
const PlanCard = ({
  price,
  plan,
  time,
  description,
  buttonText,
  onClick,
}: any) => {
  return (
    <div className="border-1 border-red-500 p-4 rounded-3xl flex flex-col gap-4 items-start">
      <div className="border-[7px] border-red-500 rounded-full p-1">
        <div className="border-[4px] border-red-500 rounded-full"></div>
      </div>
      <div className="text-white">
        <p>
          <span className="text-2xl">{price}</span>
          <span className="opacity-50 text-sm">/{time}</span>
        </p>
      </div>
      <div className="text-white">
        <h6 className="text-2xl">{plan}</h6>
        <p className="opacity-50">{description}</p>
      </div>
      <button className="w-full py-2 px-4 rounded-3xl text-black bg-white transition duration-300 hover:text-white hover:bg-red-500">
        {buttonText}
      </button>
    </div>
  );
};

export default PlanCard;
