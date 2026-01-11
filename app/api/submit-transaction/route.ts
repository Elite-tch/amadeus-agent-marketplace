import { NextRequest, NextResponse } from 'next/server';
import { AmadeusSDK } from '@amadeus-protocol/sdk';

const nodeUrl = process.env.NEXT_PUBLIC_TESTNET_NODE_URL || process.env.NEXT_PUBLIC_DEFAULT_NODE_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { txPacked } = body;

    // Validate required fields
    if (!txPacked) {
      return NextResponse.json(
        { success: false, error: 'Transaction data (txPacked) is required' },
        { status: 400 }
      );
    }

    if (!nodeUrl) {
      return NextResponse.json(
        { success: false, error: 'Node URL not configured' },
        { status: 500 }
      );
    }

    // Initialize SDK
    const sdk = new AmadeusSDK({
      baseUrl: nodeUrl,
    });

    // Convert txPacked to Uint8Array if it's an array
    let txData = txPacked;
    if (Array.isArray(txPacked)) {
      txData = new Uint8Array(txPacked);
      console.log('Converted txPacked array to Uint8Array');
    }

    // Submit transaction to the blockchain
    console.log('Submitting transaction to blockchain...');
    const result = await sdk.transaction.submit(txData);

    console.log('Transaction submitted:', result);

    return NextResponse.json(
      {
        success: true,
        txHash: result.hash,
        result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error submitting transaction:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to submit transaction',
      },
      { status: 500 }
    );
  }
}
