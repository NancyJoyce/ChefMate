import mongoose, { Schema, Document } from 'mongoose';

export interface IFavourite extends Document {
  recipeId: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  savedAt: Date;
}

const FavouriteSchema = new Schema<IFavourite>({
  recipeId:       { type: Number, required: true, unique: true },
  title:          { type: String, required: true },
  image:          { type: String },
  readyInMinutes: { type: Number },
  servings:       { type: Number },
  cuisines:       { type: [String], default: [] },
  savedAt:        { type: Date, default: Date.now },
});

export default mongoose.model<IFavourite>('Favourite', FavouriteSchema);