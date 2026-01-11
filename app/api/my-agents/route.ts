import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/lib/connectDb';
import UserOwnedAgent from '@/lib/models/UserOwnedAgent';

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const userAddress = searchParams.get('userAddress');

    // Validate required parameter
    if (!userAddress) {
      return NextResponse.json(
        { success: false, error: 'User address is required' },
        { status: 400 }
      );
    }

    // Fetch user's owned agents with agent details populated
    const ownedAgents = await UserOwnedAgent.find({
      userId: userAddress,
      isActive: true,
    })
      .populate('agentId')
      .sort({ purchaseDate: -1 }) // Most recent first
      .lean();

    // Filter out any purchases where the agent no longer exists
    const validOwnedAgents = ownedAgents.filter(
      (purchase) => purchase.agentId !== null
    );

    return NextResponse.json(
      {
        success: true,
        data: validOwnedAgents.map((purchase) => ({
          purchase: {
            _id: purchase._id,
            purchaseDate: purchase.purchaseDate,
            purchasePrice: purchase.purchasePrice,
            transactionHash: purchase.transactionHash,
          },
          agent: purchase.agentId,
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching owned agents:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch owned agents',
      },
      { status: 500 }
    );
  }
}
