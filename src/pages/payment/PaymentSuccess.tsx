
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { useVerifyPaymentMutation } from "../../features/auth/authApi";

interface PaymentData {
  plan?: string;
  billingCycle?: string;
  amountTotal?: number;
  currency?: string;
  customerName?: string;
  customerEmail?: string;
  sessionId?: string;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verifyPayment] = useVerifyPaymentMutation();

  // 'idle' = not started, 'pending' = verifying, 'success' = verified, 'failed' = verification failed
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "failed">("idle");
  const [paymentData, setPaymentData] = useState<PaymentData>({});

  useEffect(() => {
    const handleVerify = async () => {
      if (!sessionId) {
        toast.error("No session ID found!");
        setStatus("failed");
        return;
      }

      setStatus("pending"); // start loading

      try {
        const res = await verifyPayment({ sessionId }).unwrap();

        if (res?.success) {
          setStatus("success");
          const session = res.session;
          setPaymentData({
            plan: session?.metadata?.plan,
            billingCycle: session?.metadata?.billingCycle,
            amountTotal: session?.amount_total,
            currency: session?.currency,
            customerName: session?.customer_details?.name,
            customerEmail: session?.customer_details?.email,
            sessionId: session?.id,
          });
        } else {
          setStatus("failed");
        }
      } catch (error) {
        setStatus("failed");
        toast.error("Payment verification failed!");
      }
    };

    handleVerify();
  }, [sessionId, verifyPayment]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 ">
      <div className="border border-gray-200/20 text-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          {status === "success" ? (
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
              />
            </svg>
          ) : status === "failed" ? (
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <div className="w-16 h-16 border-4 border-gray-600 border-t-red-500 rounded-full animate-spin"></div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">
          {status === "success"
            ? "Payment Verified ✅"
            : status === "failed"
            ? "Payment Failed ❌"
            : "Verifying Payment... ⏳"}
        </h1>

        {/* Message */}
        {status === "success" && (
          <div className="text-gray-300 mb-6 space-y-2">
            <p>Thank you! Your payment was successful.</p>
            <p><strong>Plan:</strong> {paymentData.plan}</p>
            <p><strong>Billing Cycle:</strong> {paymentData.billingCycle}</p>
            <p><strong>Amount:</strong> {paymentData.amountTotal} {paymentData.currency?.toUpperCase()}</p>
            <p><strong>Customer:</strong> {paymentData.customerName} ({paymentData.customerEmail})</p>
          </div>
        )}

        {status === "failed" && (
          <p className="text-gray-300 mb-6">
            We could not verify your payment. Please contact support.
          </p>
        )}

        {/* Dashboard button */}
        <a
          href="/dashboard"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
