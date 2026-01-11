import mongoose, { Schema, Document, Model } from 'mongoose';

// TypeScript Interface
export interface IUserOwnedAgent extends Document {
  userId: string;
  agentId: mongoose.Types.ObjectId;
  purchaseDate: Date;
  purchasePrice: number;
  transactionHash?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const UserOwnedAgentSchema = new Schema<IUserOwnedAgent>(
  {
    userId: {
      type: String,
      required: [true, 'User wallet address is required'],
      trim: true,
      index: true,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: [true, 'Agent ID is required'],
      index: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
      min: [0, 'Purchase price cannot be negative'],
    },
    transactionHash: {
      type: String,
      trim: true,
      sparse: true, // Allow null values but ensure uniqueness when present
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Compound index to prevent duplicate purchases and optimize queries
UserOwnedAgentSchema.index({ userId: 1, agentId: 1 }, { unique: true });

// Index for efficient lookup of user's owned agents
UserOwnedAgentSchema.index({ userId: 1, isActive: 1 });

// Index for transaction hash lookups
UserOwnedAgentSchema.index({ transactionHash: 1 }, { sparse: true });

// Model
const UserOwnedAgent: Model<IUserOwnedAgent> =
  mongoose.models.UserOwnedAgent || mongoose.model<IUserOwnedAgent>('UserOwnedAgent', UserOwnedAgentSchema);

export default UserOwnedAgent;
