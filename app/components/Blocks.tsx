"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import { Block } from "@/types";
import Card from "./Card";

const Blocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [clauses, setClauses] = useState<number[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchBlocks = async () => {
        await axios
          .get<Block>("https://de.node.vechain.energy/blocks/best")
          .then((res) => {
            if (blocks.length < 4) {
              setBlocks([res.data, ...blocks]);
            } else {
              setBlocks([res.data, ...blocks.slice(0, blocks.length - 1)]);
            }
          })
          .catch((err) => console.log(err));
      };
      fetchBlocks();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [blocks, clauses]);

  return (
    <>
      {blocks.length === 0 ? (
        <p className="animate-pulse">Waiting for the next Block...</p>
      ) : (
        blocks.map((block) => (
          <Card key={block.id} block={block} clauses={clauses} />
        ))
      )}
    </>
  );
};

export default Blocks;
