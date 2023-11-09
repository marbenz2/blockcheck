"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Block } from "@/types";
import Card from "./Card";

const Blocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [clauses, setClauses] = useState<number[]>([]);

  const updateBlocksAndClauses = useCallback(
    (newBlock: Block, newClauses: number) => {
      setBlocks((prevBlocks) =>
        prevBlocks.length < 4
          ? [newBlock, ...prevBlocks]
          : [newBlock, ...prevBlocks.slice(0, prevBlocks.length - 1)]
      );

      setClauses((prevClauses) =>
        prevClauses.length < 4
          ? [newClauses, ...prevClauses]
          : [newClauses, ...prevClauses.slice(0, prevClauses.length - 1)]
      );
    },
    []
  );

  const clausesAmount = useCallback(
    async (txs: string[], block: Block) => {
      const clauseAmount = await Promise.all(
        txs.map(async (tx: string) => {
          try {
            const res = await axios.get(
              "https://de.node.vechain.energy/transactions/" + tx
            );
            return res.data.clauses.length;
          } catch (err) {
            console.log(err);
            return 0;
          }
        })
      );

      const totalClauses = clauseAmount.reduce((acc, curr) => acc + curr, 0);
      updateBlocksAndClauses(block, totalClauses);
    },
    [updateBlocksAndClauses]
  );

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const res = await axios.get<Block>(
          "https://de.node.vechain.energy/blocks/best"
        );
        clausesAmount(res.data.transactions, res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBlocksAndTimeout = () => {
      fetchBlocks();
      const timeoutId = setTimeout(fetchBlocksAndTimeout, 10000);
      return () => clearTimeout(timeoutId);
    };

    fetchBlocksAndTimeout();

    return () => {}; // Leere Cleanup-Funktion, da clearTimeout bereits in fetchBlocksAndTimeout enthalten ist
  }, [clausesAmount]);

  return (
    <>
      {blocks.length === 0 ? (
        <p className="animate-pulse">Waiting for the next Block...</p>
      ) : (
        blocks.map((block, index) => (
          <Card key={block.id} block={block} clauses={clauses[index]} />
        ))
      )}
    </>
  );
};

export default Blocks;
