import { Block } from "@/types";

const Card = ({ block, clauses }: { block: Block; clauses: number }) => {
  return (
    <div className="flex h-fit w-full sm:max-w-fit p-2 gap-1 shadow-lg bg-gray-100 border border-gray-200 rounded-md">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-stone-300 font-semibold">
            <td className="px-1">Block:</td>
            <td className="px-1 text-end">{block.number.toLocaleString()}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-1">TXs:</td>
            <td className="px-1 text-end">{block.transactions.length}</td>
          </tr>
          <tr>
            <td className="px-1">Clauses:</td>
            <td className="px-1 text-end">{clauses}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Card;
