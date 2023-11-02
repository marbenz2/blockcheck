"use client";

import Block from "./Block";

type BlockCardProps = {
  key: string;
  block: object;
};

const clickBlockCard = () => {
  const modal = document.getElementById("modal");
  modal?.classList.toggle("hidden");
  modal?.classList.toggle("flex");
};

const BlockCard = ({ key, block }: BlockCardProps) => {
  return (
    <>
      <div
        id={key}
        className="flex flex-grow flex-shrink-0 p-2 shadow-lg bg-gray-100 border border-gray-200 cursor-pointer"
/*         onClick={clickBlockCard} */
      >
        <Block />
      </div>
      <div
        id="modal"
        className="absolute flex-col bottom-0 left-0 w-full h-5/6 p-2 hidden justify-between bg-white border-t-2 border-gray-200"
      >
        <table className="w-full">
          <tbody>
            <tr>
              <td>Block</td>
              <td>213476174</td>
            </tr>
            <tr>
              <td>Timestamp</td>
              <td>2023-11-02 09:13:00</td>
            </tr>
            <tr>
              <td>TX</td>
              <td>43</td>
            </tr>
            <tr>
              <td>Clauses</td>
              <td>870</td>
            </tr>
          </tbody>
        </table>
        <button onClick={clickBlockCard} className="justify-self-center">
          close
        </button>
      </div>
    </>
  );
};

export default BlockCard;
