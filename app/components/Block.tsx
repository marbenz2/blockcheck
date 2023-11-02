import { Framework } from "@vechain/connex-framework";
import { Driver, SimpleNet } from "@vechain/connex-driver";
import { useEffect, useState } from "react";
import { all } from "axios";

interface Block {
  id: string;
  number: number;
  size: number;
  parentID: string;
  timestamp: number;
  gasLimit: number;
  beneficiary: string;
  gasUsed: number;
  totalScore: number;
  txsRoot: string;
  txsFeatures?: number;
  stateRoot: string;
  receiptsRoot: string;
  signer: string;
  transactions: string[];
  com?: boolean;
  isFinalized?: boolean;
  isTrunk: boolean;
}

const Block = () => {
  const [block, setBlock] = useState<Connex.Thor.Block>();
  const [clauses, setClauses] = useState<number>(0);

  useEffect(() => {
    const getLatestBlock = async () => {
      try {
        const driver = await Driver.connect(
          new SimpleNet("https://mainnet.vecha.in/")
        );
        const connex = new Framework(driver);
        const ticker = connex.thor.ticker();
        ticker.next().then((head) => {
          const thisBlk = connex.thor.block(head.id);
          thisBlk.get().then((blk) => {
            setBlock(blk as Connex.Thor.Block);
            const transactions = blk?.transactions;
            if (transactions) {
              let clausesAmount = 0;
              for (const transactionId of transactions) {
                const clause = connex.thor.transaction(transactionId);
                clause.get().then((tx) => {
                  if (tx?.clauses) {
                    clausesAmount += tx?.clauses.length;
                    setClauses(clausesAmount);
                  }
                });
              }
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    getLatestBlock();
  }, [block]);

  return (
    <>
      <table className="w-full">
        <tbody>
          <tr>
            <td>Block:</td>
            <td>
              {block?.number && Intl.NumberFormat().format(block?.number)}
            </td>
          </tr>
          <tr>
            <td>ID:</td>
            <td>
              {block?.id.slice(0, 7)}...{block?.id.slice(60, 66)}
            </td>
          </tr>
          <tr>
            <td>TX:</td>
            <td>{block?.transactions.length}</td>
          </tr>
          <tr>
            <td>Clauses:</td>
            <td>{clauses}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Block;
