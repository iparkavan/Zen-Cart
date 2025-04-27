import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentCategoryId?: Types.ObjectId;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const CategoryModel = model<ICategory>("Category", categorySchema);
export default CategoryModel;
