import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/lib/connectDb';
import Agent from '@/lib/models/Agent';
import UserOwnedAgent from '@/lib/models/UserOwnedAgent';

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();
    const { agentId, buyerAddress, transactionHash } = body;

    console.log('Purchase request received:', { agentId, buyerAddress, transactionHash });

    // Validate required fields
    if (!agentId || !buyerAddress) {
      console.error('Validation failed:', { agentId, buyerAddress });
      return NextResponse.json(
        { success: false, error: 'Agent ID and buyer address are required' },
        { status: 400 }
      );
    }

    // Validate agentId is a valid MongoDB ObjectId
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(agentId)) {
      console.error('Invalid ObjectId:', agentId);
      return NextResponse.json(
        { success: false, error: 'Invalid agent ID format' },
        { status: 400 }
      );
    }

    // Verify agent exists and is active
    const agent = await Agent.findById(agentId);
    console.log('Agent found:', agent ? { id: agent._id, name: agent.name, isActive: agent.isActive } : null);

    if (!agent) {
      return NextResponse.json(
        { success: false, error: 'Agent not found' },
        { status: 404 }
      );
    }

    if (!agent.isActive) {
      return NextResponse.json(
        { success: false, error: 'Agent is not available for purchase' },
        { status: 400 }
      );
    }

    // Check if user already owns this agent
    console.log('Checking existing purchase for:', { userId: buyerAddress, agentId });
    const existingPurchase = await UserOwnedAgent.findOne({
      userId: buyerAddress,
      agentId: agentId,
      isActive: true,
    });
    console.log('Existing purchase:', existingPurchase ? 'Found' : 'None');

    if (existingPurchase) {
      return NextResponse.json(
        { success: false, error: 'You already own this agent' },
        { status: 400 }
      );
    }

    // Create purchase record
    console.log('Creating purchase record...');
    const purchase = await UserOwnedAgent.create({
      userId: buyerAddress,
      agentId: agentId,
      purchasePrice: agent.pricing.amount,
      transactionHash: transactionHash || undefined,
      purchaseDate: new Date(),
      isActive: true,
    });
    console.log('Purchase created:', purchase._id);

    // Update agent statistics
    await Agent.findByIdAndUpdate(
      agentId,
      {
        $inc: {
          'stats.totalPurchases': 1,
          'stats.activeSubscribers': 1,
        },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        purchase: {
          _id: purchase._id,
          agentId: purchase.agentId,
          purchaseDate: purchase.purchaseDate,
          purchasePrice: purchase.purchasePrice,
          transactionHash: purchase.transactionHash,
        },
        message: agent.pricing.model === 'free'
          ? 'Agent successfully added to your collection'
          : 'Purchase successful',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error processing purchase:', error);

    // Handle duplicate purchase error (race condition)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'You already own this agent' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to process purchase',
      },
      { status: 500 }
    );
  }
}
