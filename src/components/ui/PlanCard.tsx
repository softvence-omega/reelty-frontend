import { useEffect, useRef, useState } from "react";
import { usePaymentMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router";

const PlanCard = ({
  price,
  plan,
  time,
  credit,
  buttonText,

}: any) => {
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const topGlowRef = useRef<HTMLDivElement>(null);
  const bottomGlowRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const [payment] = usePaymentMutation()
  const [loading, setLoading] = useState(false)
  const handlePayment = async () => {
    setLoading(true)
    try {
      let response: any;

      if (plan === "FREE") {
        // 🆓 Free plan
        response = await payment({ plan, billingCycle: time }).unwrap();

      } else if (plan === "BASIC") {
        // 💡 Basic plan pricing
        let price;
        if (time === "monthly") {

          price = import.meta.env.VITE_BASIC_MONTHLY;
        } else {
          price = import.meta.env.VITE_BASIC_YEARLY;
        }

        response = await payment({ plan, billingCycle: time, price }).unwrap();

      } else if (plan === "PRO") {
        // 🚀 Pro plan pricing
        let price;
        if (time === "monthly") {
          price = import.meta.env.VITE_PRO_MONTHLY;
        } else {
          price = import.meta.env.VITE_PRO_YEARLY;
        }
        response = await payment({ plan, billingCycle: time, price }).unwrap();
      }

      if (response.checkoutUrl) {
        setLoading(false)
        window.location.href = response.checkoutUrl;
      }
    } catch (error) {
      console.error("❌ Payment Error:", error);
    }
  };



  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTargetPos({ x, y });
    };

    const handlePointerLeave = () => {
      setTargetPos(null);
    };

    const card = cardRef.current;
    card?.addEventListener("pointermove", handlePointerMove);
    card?.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      card?.removeEventListener("pointermove", handlePointerMove);
      card?.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animationRef.current!);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (targetPos) {
        setCurrentPos((prev) => {
          const lerp = (a: number, b: number) => a + (b - a) * 0.1;
          const newX = lerp(prev.x, targetPos.x);
          const newY = lerp(prev.y, targetPos.y + 30); // Lower glow
          if (topGlowRef.current) {
            topGlowRef.current.style.left = `${newX}px`;
            topGlowRef.current.style.top = `${newY - 80}px`; // slightly above
          }

          if (bottomGlowRef.current) {
            bottomGlowRef.current.style.left = `${newX}px`;
            bottomGlowRef.current.style.top = `${newY + 80}px`; // slightly below
          }

          return { x: newX, y: newY };
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, [targetPos]);

  const showBottomHighlight = currentPos.y > 180;

  return (
    <div className="group relative w-full border-1 min-w-3xs border-red-500 transparent  p-[1.5px] rounded-3xl ∂∂ßßßß transition-all duration-300">
      {/* 🔴 Red glow on top */}
      <div className="absolute inset-0 z-0 bg-transparent pointer-events-none rounded-3xl">
        <div
          ref={topGlowRef}
          className="absolute w-[300px] h-[200px] rounded-full bg-red-500 opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-300"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* 🔴 Red glow on bottom */}
      <div className="absolute inset-0 z-0 bg-transparent pointer-events-none rounded-3xl">
        <div
          ref={bottomGlowRef}
          className="absolute w-[300px] h-[200px] rounded-full bg-red-500 opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-300"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Card Content */}
      <div
        ref={cardRef}
        onClick={() => handlePayment()}

        className="relative z-10 bg-black rounded-3xl p-4 flex flex-col gap-4 items-start transition-all duration-300"
      >
        {/* Bottom white glow when mouse is low */}
        {showBottomHighlight && (
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-white opacity-10 blur-2xl z-0" />
        )}

        <div className="w-full flex flex-col gap-4">
          <div className="border-[7px] border-red-500 w-8 rounded-full p-1">
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
            <p className="opacity-50">Credit: {credit}</p>
          </div>
          <button className="w-full py-2 px-4 rounded-3xl text-black bg-white group-hover:bg-red-500 group-hover:text-white transition duration-300">
            {loading ? "Loading" : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
