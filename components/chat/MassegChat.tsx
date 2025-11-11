"use client";

interface ChatMessageprops {
  messgage: string;
  sender: string;
  isOwnMasseg: boolean;
}
function MassegChat({ messgage, sender, isOwnMasseg }: ChatMessageprops) {
  const isSystemMessg = sender == "system";
  return (
    <div
      className={`flex ${
        isSystemMessg
          ? ` justify-center`
          : isOwnMasseg
          ? ` justify-end`
          : ` justify-start`
      } mb-3`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-sm ${
          isSystemMessg
            ? `bg-red-800 text-center text-xs`
            : isOwnMasseg
            ? `bg-blue-500 text-center text-xs`
            : `bg-white text-black`
        }`}
      >
        {isSystemMessg && <p className="text-sm font-bold">{sender}</p>}
        <p className="p-2 text-xs">{messgage}</p>
      </div>
    </div>
  );
}

export default MassegChat;
