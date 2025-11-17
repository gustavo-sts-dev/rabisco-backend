import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserDocument extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  role: Array<"consumer" | "creator">;
  plan: "free" | "plus";
  isTestUser?: boolean;
  expires?: string;
  posts: Array<mongoose.Types.ObjectId>;
  connections: Array<mongoose.Types.ObjectId>;
  comparePasswords(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  updatePassword(
    email: string,
    password: string,
    newPassword: string
  ): Promise<string>;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: [true, "O campo username é obrigatório."],
      unique: [true, "Já existe um usuário com este username."],
      maxLength: 24,
      match: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
    },
    name: {
      type: String,
      maxLength: 24,
    },
    email: {
      type: String,
      required: [true, "O campo email é obrigatório."],
      unique: [true, "Já existe alguém cadastrado com esse email."],
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: [true, "O campo senha é obrigatório."],
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    },
    role: {
      type: [String],
      enum: ["creator", "consumer"],
    },
    plan: {
      type: String,
      enum: ["free", "plus"],
      default: "free",
    },
    isTestUser: {
      type: Boolean,
      default: false,
    },
    expires: {
      type: String,
      default: null,
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Posts",
    },
    connections: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  if (this.isTestUser) {
    this.expires = "2h";
  }

  next();
});

userSchema.methods.comparePasswords = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.updatePassword = async function (
  _id: string,
  password: string,
  newPassword: string
) {
  const existingUser = await this.findById(_id);

  if (!existingUser) {
    const { UnauthorizedError } = await import("@shared/errors/AppError");
    throw new UnauthorizedError("Usuário não encontrado.");
  }

  const approved = await bcrypt.compare(password, existingUser.password);

  if (!approved) {
    const { UnauthorizedError } = await import("@shared/errors/AppError");
    throw new UnauthorizedError("Credenciais inválidas.");
  }

  await this.findByIdAndUpdate(_id, {
    password: await bcrypt.hash(newPassword, 12),
  });

  return "Senha alterada com sucesso.";
};

const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);
export default User;
