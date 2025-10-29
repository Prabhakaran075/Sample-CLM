import { Schema, model, Document, Types } from 'mongoose';

// Corresponds to UserRole enum on the frontend
export enum UserRole {
  SUPER_ADMIN = 'Super Admin',
  ORG_ADMIN = 'Org Admin',
  CONTRIBUTOR = 'Contributor',
  VIEWER = 'Viewer',
  LEGAL = 'Legal',
  FINANCE = 'Finance',
  REVIEWER = 'Reviewer',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Password will be selected: false
  avatarUrl: string;
  tenants: {
    tenant: Types.ObjectId;
    role: UserRole;
  }[];
  activeTenant: Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Don't return password by default
  },
  avatarUrl: {
    type: String,
    default: 'https://i.pravatar.cc/150'
  },
  tenants: [{
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.VIEWER
    }
  }],
  activeTenant: {
    type: Schema.Types.ObjectId,
    ref: 'Tenant',
  }
}, {
  timestamps: true,
});

// TODO: Add pre-save hook for password hashing (e.g., with bcrypt)

export default model<IUser>('User', UserSchema);
