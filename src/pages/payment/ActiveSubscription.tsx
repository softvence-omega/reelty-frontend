import { useActiveStatusQuery } from "../../features/auth/authApi";

const ActiveSubscription = () => {
  const { data, isLoading, isError } = useActiveStatusQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold animate-pulse">Loading subscription...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">No active subscription found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 flex justify-center">
      <div className="bg-black border border-red-600/40 rounded-xl p-8 max-w-md w-full text-center shadow-xl shadow-cyan-500/20 neon-glow">
        <h2 className="text-3xl font-bold text-red-600 mb-6 neon-text">Active Subscription</h2>

        <div className="space-y-3">
          <p className="text-white text-lg">
            <span className="font-semibold text-red-600">Plan:</span> {data.plan}
          </p>
          <p className="text-white text-lg">
            <span className="font-semibold text-red-600">Status:</span> {data.status}
          </p>
          <p className="text-white text-lg">
            <span className="font-semibold text-red-600">Billing Cycle:</span> {data.billingCycle}
          </p>
          <p className="text-white text-lg">
            <span className="font-semibold text-red-600">Credits:</span> {data.credits}
          </p>
          <p className="text-white text-lg">
            <span className="font-semibold text-red-600">Monthly Clip Limit:</span> {data.monthlyClipLimit}
          </p>
          <p className="text-white text-lg">
            <span className="font-semibold text-red-600">Monthly Minutes Limit:</span> {data.monthlyMinutesLimit}
          </p>
        </div>

        <p className="text-cyan-400 text-sm mt-6">
          Current Period:{" "}
          {new Date(data.currentPeriodStart).toLocaleDateString()} -{" "}
          {new Date(data.currentPeriodEnd).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ActiveSubscription;