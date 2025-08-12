import { useEffect, useState } from "react";

const stages = [
  { text: "Chopping veggies...", icon: "🧅" },
  { text: "Simmering sauce...", icon: "🍅" },
  { text: "Plating...", icon: "🍽️" },
  { text: "Ready to serve!", icon: "🥂" },
];

export default function MenuLoading() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % stages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-40">
      <div className="text-4xl animate-bounce">{stages[stage].icon}</div>
      <p className="mt-2 text-lg font-semibold">{stages[stage].text}</p>
      <div className="w-64 h-3 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-orange-500 transition-all duration-500"
          style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
