import mongoose, { Schema, Document, Model } from 'mongoose';

// TypeScript Interface
export interface IAgent extends Document {
  // Basic Information
  name: string;
  description: string;
  category: string;
  tags: string[];

  // MCP Configuration
  mcpConfig: {
    serverUrl: string;
    protocol: 'stdio' | 'sse';
    transport?: 'http' | 'websocket';
  };

  // Pricing
  pricing: {
    model: 'free' | 'paid';
    amount: number;
    currency: string;
  };

  // Ownership
  owner: string;

  // Hosting (Optional - for future platform hosting)
  hosting?: {
    type: 'self-hosted' | 'platform-hosted';
    deploymentId?: string;
    status?: 'deploying' | 'running' | 'stopped' | 'failed';
    runtime?: 'nodejs' | 'python' | 'docker';
    sourceCodeUrl?: string;
    resourcePlan?: 'basic' | 'pro' | 'enterprise';
  };

  // Media & Documentation
  logoUrl?: string;
  demoVideoUrl?: string;
  screenshotUrls?: string[];
  documentationUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;

  // Verification & Trust
  isVerified: boolean;
  isActive: boolean;

  // Statistics
  stats: {
    totalPurchases: number;
    activeSubscribers: number;
    averageRating: number;
    totalReviews: number;
  };

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const AgentSchema = new Schema<IAgent>(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, 'Agent name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [100, 'Name must not exceed 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description must not exceed 1000 characters'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['trading', 'analysis', 'defi', 'nft', 'automation', 'gaming', 'social', 'research'],
        message: 'Invalid category',
      },
      lowercase: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.length <= 10 && tags.every(tag => tag.length >= 2 && tag.length <= 30);
        },
        message: 'Maximum 10 tags allowed, each 2-30 characters',
      },
    },

    // MCP Configuration
    mcpConfig: {
      serverUrl: {
        type: String,
        required: [true, 'MCP server URL is required'],
        validate: {
          validator: function (url: string) {
            return /^https?:\/\/.+/.test(url);
          },
          message: 'Invalid MCP server URL',
        },
      },
      protocol: {
        type: String,
        required: true,
        enum: ['stdio', 'sse'],
        default: 'sse',
      },
      transport: {
        type: String,
        enum: ['http', 'websocket'],
      },
    },

    // Pricing
    pricing: {
      model: {
        type: String,
        required: true,
        enum: ['free', 'paid'],
        default: 'free',
      },
      amount: {
        type: Number,
        required: true,
        min: [0, 'Amount cannot be negative'],
        default: 0,
      },
      currency: {
        type: String,
        default: 'AMA',
        uppercase: true,
      },
    },

    // Ownership
    owner: {
      type: String,
      required: [true, 'Owner wallet address is required'],
      validate: {
        validator: function (address: string) {
          return address.length > 20; // Basic validation for wallet address
        },
        message: 'Invalid wallet address',
      },
    },

    // Hosting
    hosting: {
      type: {
        type: String,
        enum: ['self-hosted', 'platform-hosted'],
        default: 'self-hosted',
      },
      deploymentId: String,
      status: {
        type: String,
        enum: ['deploying', 'running', 'stopped', 'failed'],
      },
      runtime: {
        type: String,
        enum: ['nodejs', 'python', 'docker'],
      },
      sourceCodeUrl: String,
      resourcePlan: {
        type: String,
        enum: ['basic', 'pro', 'enterprise'],
      },
    },

    // Media & Documentation
    logoUrl: String,
    demoVideoUrl: String,
    screenshotUrls: [String],
    documentationUrl: String,
    githubUrl: String,
    websiteUrl: String,

    // Verification & Trust
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // Statistics
    stats: {
      totalPurchases: {
        type: Number,
        default: 0,
        min: 0,
      },
      activeSubscribers: {
        type: Number,
        default: 0,
        min: 0,
      },
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalReviews: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for performance
AgentSchema.index({ owner: 1 });
AgentSchema.index({ category: 1 });
AgentSchema.index({ isActive: 1 });
AgentSchema.index({ 'stats.averageRating': -1 });
AgentSchema.index({ createdAt: -1 });
AgentSchema.index({ name: 1, owner: 1 }, { unique: true }); // Prevent duplicate names by same owner

// Model
const Agent: Model<IAgent> = mongoose.models.Agent || mongoose.model<IAgent>('Agent', AgentSchema);

export default Agent;
