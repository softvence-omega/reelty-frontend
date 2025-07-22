import PlanCard from "../../components/ui/PlanCard";

const ChoosePlan = () => {
  const cardData = [
    {
      price: "$0",
      time: "month",
      plan: "Free",
      description: "1-2 clips (or 2 mins total) per month",
      buttonText: "Try Now",
    },
    {
      price: "$49",
      plan: "Basic",
      time: "month",

      description: "5-10 clips (or 5-10 mins total) per month",
      buttonText: "Join Waitlist",
    },
    {
      price: "$97",
      plan: "Pro",
      time: "month",

      description: "Unlimited usage",
      buttonText: "Try Now",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center gap-4  ">
      <div className="flex flex-col justify-center items-center gap-2 pb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          Choose a plan{" "}
        </h2>
        <p className="text-white">Choose a plan that fits your goal</p>
      </div>
      <div className="space-y-15">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 justify-center items-center">
          {cardData.map((item, inx) => (
            <PlanCard
              key={inx}
              price={item.price}
              plan={item.plan}
              time={item.time}
              description={item.description}
              buttonText={item.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;
