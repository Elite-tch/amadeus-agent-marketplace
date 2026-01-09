import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/lib/connectDb';
import Agent from '@/lib/models/Agent';

// POST /api/agent - Register new agent
export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const body = await request.json();

    // Extract owner from request
    const {
      name,
      description,
      category,
      tags,
      mcpConfig,
      pricing,
      owner,
      hosting,
      logoUrl,
      demoVideoUrl,
      screenshotUrls,
      documentationUrl,
      githubUrl,
      websiteUrl,
    } = body;

    // Validation
    if (!owner) {
      return NextResponse.json(
        { success: false, error: 'Owner wallet address is required' },
        { status: 401 }
      );
    }

    if (!name || !description || !category || !mcpConfig?.serverUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for duplicate agent name by same owner
    const existingAgent = await Agent.findOne({ name, owner });
    if (existingAgent) {
      return NextResponse.json(
        { success: false, error: 'Agent name already exists for this owner' },
        { status: 409 }
      );
    }

    // Create agent
    const agent = await Agent.create({
      name,
      description,
      category,
      tags: tags || [],
      mcpConfig: {
        serverUrl: mcpConfig.serverUrl,
        protocol: mcpConfig.protocol || 'sse',
        transport: mcpConfig.transport,
      },
      pricing: {
        model: pricing?.model || 'free',
        amount: pricing?.amount || 0,
        currency: pricing?.currency || 'AMA',
      },
      owner,
      hosting,
      logoUrl,
      demoVideoUrl,
      screenshotUrls,
      documentationUrl,
      githubUrl,
      websiteUrl,
      isVerified: false,
      isActive: true,
      stats: {
        totalPurchases: 0,
        activeSubscribers: 0,
        averageRating: 0,
        totalReviews: 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Agent registered successfully',
        data: {
          _id: agent._id,
          name: agent.name,
          owner: agent.owner,
          isActive: agent.isActive,
          isVerified: agent.isVerified,
          createdAt: agent.createdAt,
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Agent registration error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to register agent' },
      { status: 500 }
    );
  }
}

// GET /api/agent - Retrieve agents with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);

    // Query parameters
    const category = searchParams.get('category');
    const owner = searchParams.get('owner');
    const isVerified = searchParams.get('isVerified') === 'true';
    const isActive = searchParams.get('isActive') !== 'false'; // Default true
    const sort = searchParams.get('sort') || 'date';
    const order = searchParams.get('order') || 'desc';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const skip = parseInt(searchParams.get('skip') || '0');

    // Build query
    const query: any = {};

    if (category) {
      query.category = category.toLowerCase();
    }

    if (owner) {
      query.owner = owner;
    }

    if (isVerified) {
      query.isVerified = true;
    }

    query.isActive = isActive;

    // Build sort
    const sortField: any = {};
    switch (sort) {
      case 'rating':
        sortField['stats.averageRating'] = order === 'asc' ? 1 : -1;
        break;
      case 'purchases':
        sortField['stats.totalPurchases'] = order === 'asc' ? 1 : -1;
        break;
      case 'date':
      default:
        sortField.createdAt = order === 'asc' ? 1 : -1;
    }

    // Execute query
    const [agents, total] = await Promise.all([
      Agent.find(query)
        .sort(sortField)
        .skip(skip)
        .limit(limit)
        .lean(),
      Agent.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: agents,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total,
      },
    });

  } catch (error) {
    console.error('Agent retrieval error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve agents' },
      { status: 500 }
    );
  }
}
