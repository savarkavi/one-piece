"use client";

type FruitTypeProps = {
  title: string;
  content: string;
  idx: string;
  fruitIndex: string;
};

const FruitType = ({ title, content, idx, fruitIndex }: FruitTypeProps) => {
  return (
    <div
      id={`fruit-${idx}`}
      className={`flex flex-col gap-4 font-robert-regular ${
        fruitIndex === idx ? "text-black" : "text-black/40"
      }`}
    >
      <div className="flex items-center gap-8">
        <span>{idx}</span>
        <p
          className={`font-bold text-2xl ${
            fruitIndex !== idx && "uppercase text-base font-general font-normal"
          }`}
        >
          {title}
        </p>
      </div>
      <div
        className={`flex gap-4 overflow-hidden ${
          fruitIndex === idx ? "h-full" : "h-0"
        }`}
      >
        <div className="relative w-[2px]">
          <div className="w-[2px] h-full bg-black/40 absolute top-0 left-0" />
          <div
            id={`progress-bar${idx}`}
            className={`w-[2px] ${
              fruitIndex === idx && "bg-black"
            } absolute top-0 left-0`}
          />
        </div>
        <p className="max-w-[500px] text-sm">{content}</p>
      </div>
    </div>
  );
};

export default FruitType;
