import PlanCard from "../../components/ui/PlanCard";

const ChoosePlan = () => {
  const cardData = [
    {
      price: "$0",
      time: "monthly",
      credit: "20",
      plan: "FREE",
      buttonText: "Try Now",
      
    },
    {
      price: "$20",
      plan: "BASIC",
      time: "monthly",
      credit: "50",

      buttonText: "Purchase",
    },
    {
      price: "$200",
      plan: "PRO",
      credit: "300",
      time: "monthly",
      buttonText: "Purchase",
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
              credit={item.credit}
              buttonText={item.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;
