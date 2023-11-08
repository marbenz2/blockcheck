import { Block } from "@/types";

const Card = ({ block, clauses }: { block: Block; clauses: number[] }) => {
  return (
    <div className="flex flex-col flex-shrink-0 h-fit w-full sm:max-w-xs p-2 gap-1 shadow-lg bg-gray-100 border border-gray-200 rounded-md">
      <p className="flex justify-between font-semibold bg-stone-300 rounded-md px-1">
        Block: <span>{block.number.toLocaleString()}</span>
      </p>
      <p className="flex justify-between bg-stone-300 rounded-md px-1">
        TXs: <span>{block.transactions.length}</span>
      </p>
      <p className="flex justify-between bg-stone-300 rounded-md px-1">
        Clauses: <span>{clauses}</span>
      </p>
    </div>
  );
};

export default Card;
