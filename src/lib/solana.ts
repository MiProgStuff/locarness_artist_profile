import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { CONTRACT_ADDRESS } from "@/config/token";

// $LCRN é um mint Token-2022 (confirmado via Jupiter), não SPL Token clássico.
// Detetamos o programa on-chain em vez de assumir, para o checkout funcionar
// com qualquer tipo de mint.
export async function getTokenProgramId(connection: Connection, mint: PublicKey) {
  const info = await connection.getAccountInfo(mint);
  if (!info) throw new Error("Mint do token não encontrado on-chain.");
  return info.owner.equals(TOKEN_2022_PROGRAM_ID)
    ? TOKEN_2022_PROGRAM_ID
    : TOKEN_PROGRAM_ID;
}

export async function getLcrnBalance(connection: Connection, owner: PublicKey) {
  const mint = new PublicKey(CONTRACT_ADDRESS);
  const { value } = await connection.getParsedTokenAccountsByOwner(owner, {
    mint,
  });

  return value.reduce((total, { account }) => {
    const parsed = account.data.parsed as {
      info: { tokenAmount: { uiAmount: number | null } };
    };
    return total + (parsed.info.tokenAmount.uiAmount ?? 0);
  }, 0);
}
