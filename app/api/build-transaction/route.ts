import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipient, amount } = body;

    // Validate required fields
    if (!recipient || amount === undefined) {
      return NextResponse.json(
        { success: false, error: 'Recipient address and amount are required' },
        { status: 400 }
      );
    }

    // Validate amount is a positive number
    if (typeof amount !== 'number' || amount < 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be a positive number in atomic units' },
        { status: 400 }
      );
    }

    // Build transaction object for Amadeus Wallet extension
    // The wallet extension expects: { contract, method, args, description }
    // Args must be strings as per the wallet extension API
    const transaction = {
      contract: 'Coin',
      method: 'transfer',
      args: [
        recipient,              // Recipient address as string
        amount.toString(),      // Amount in atomic units as string
        'AMA'                   // Symbol as string
      ],
      description: `Transfer ${(amount / 1_000_000_000).toFixed(2)} AMA for agent purchase`,
    };

    console.log('Built transaction for wallet signing:', transaction);

    return NextResponse.json(
      {
        success: true,
        transaction,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error building transaction:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to build transaction',
      },
      { status: 500 }
    );
  }
}
