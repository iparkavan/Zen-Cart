import { Types } from "mongoose";
import CartModel, { ICart } from "../models/cart.model";
import { NotFoundException } from "../utils/app-error";

export const addAndRemoveProductsToCartSevice = async (
  userId: string,
  body: {
    productId: string;
    quantity: number; // can be positive or negative
  }
) => {
  const { productId, quantity } = body;

  let cart: ICart | null = await CartModel.findOne({ userId });

  if (!cart) {
    if (quantity <= 0) {
      throw new NotFoundException(
        "Cannot add product with non-positive quantity"
      );
    }

    cart = await CartModel.create({
      userId: new Types.ObjectId(userId),
      items: [{ productId: new Types.ObjectId(productId), quantity }],
    });
  } else {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;

      if (existingItem.quantity <= 0) {
        // remove item if quantity goes to 0 or below
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );
      }
    } else {
      if (quantity > 0) {
        cart.items.push({
          productId: new Types.ObjectId(productId),
          quantity,
        });
      } else {
        throw new NotFoundException("Cannot decrement a non-existing item");
      }
    }
  }

  // If cart becomes empty, delete it
  if (cart.items.length === 0) {
    await CartModel.deleteOne({ _id: cart._id });
    return { cartItems: [] };
  }

  await cart.save();

  return { cartItems: cart.items };
};

export const getAllCartItemsService = async (userId: string) => {
  const cart: ICart | null = await CartModel.findOne({ userId }).populate(
    "items.productId"
  );

  // ✅ Return [] if cart doesn’t exist or has no items
  const cartItems = cart?.items?.length ? cart.items : [];

  return { cartItems };
};

export const deleteCartItemService = async (
  userId: string,
  productId: string
) => {
  const cart: ICart | null = await CartModel.findOne({ userId });
  console.log("cart", cart);

  if (!cart) {
    throw new NotFoundException("Cart not found for the user");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex === -1) {
    throw new NotFoundException("Product not found in the cart");
  }

  cart.items.splice(itemIndex, 1);

  await cart.save();

  return;
};
