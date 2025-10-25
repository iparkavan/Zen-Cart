// "use client";

// import PaynowButton from "@/components/dummy/Paynow-button";
// import { useGetAllCartItems } from "@/hooks/cart-hooks";
// import { useOrderStore } from "@/stores/order-store";
// import React from "react";

// const page = () => {
//   const { data } = useGetAllCartItems();
//   const { orderSummary } = useOrderStore();

//   return (
//     <div>
//       <PaynowButton
//         cartItems={data?.cartItems || []}
//         totalAmount={orderSummary?.total || 0}
//       />
//     </div>
//   );
// };

// export default page;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Trash2, Plus, MapPin, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PaynowButton from "@/components/dummy/Paynow-button";
import { useGetAllCartItems } from "@/hooks/cart-hooks";
import { useOrderStore } from "@/stores/order-store";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

const Checkout = () => {
  // const { toast } = useToast();

  const { data } = useGetAllCartItems();
  const { orderSummary } = useOrderStore();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Headphones",
      price: 299.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 49.99,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 159.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
  ]);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "Home",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      phone: "+1234567890",
    },
    {
      id: 2,
      name: "Office",
      street: "456 Business Ave",
      city: "Boston",
      state: "MA",
      zip: "02101",
      phone: "+1234567891",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 15.0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    // toast({
    //   title: "Item removed",
    //   description: "The item has been removed from your cart.",
    // });
  };

  const handleAddAddress = () => {
    if (
      !newAddress.name ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zip ||
      !newAddress.phone
    ) {
      // toast({
      //   title: "Missing fields",
      //   description: "Please fill in all address fields.",
      //   variant: "destructive",
      // });
      return;
    }

    const address: Address = {
      id: addresses.length + 1,
      ...newAddress,
    };

    setAddresses([...addresses, address]);
    setSelectedAddress(address.id);
    setShowAddressForm(false);
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });

    // toast({
    //   title: "Address added",
    //   description: "Your new address has been saved.",
    // });
  };

  const handleConfirmAddress = () => {
    setIsAddressExpanded(false);
    setShowAddressForm(false);
    // toast({
    //   title: "Address confirmed",
    //   description: "Your delivery address has been updated.",
    // });
  };

  const currentAddress = addresses.find((a) => a.id === selectedAddress);

  // const handleCheckout = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const options = {
  //     key: "rzp_test_1234567890", // Replace with your Razorpay Key ID
  //     amount: Math.round(total * 100), // Amount in paise
  //     currency: "INR",
  //     name: "Your Store Name",
  //     description: "Order Payment",
  //     image: "/placeholder.svg",
  //     handler: function (response: any) {
  //       // toast({
  //       //   title: "Payment Successful!",
  //       //   description: `Payment ID: ${response.razorpay_payment_id}`,
  //       // });
  //     },
  //     prefill: {
  //       name: addresses.find((a) => a.id === selectedAddress)?.name || "",
  //       email: "",
  //       contact: addresses.find((a) => a.id === selectedAddress)?.phone || "",
  //     },
  //     notes: {
  //       order_items: cartItems
  //         .map((item) => `${item.name} x ${item.quantity}`)
  //         .join(", "),
  //     },
  //     theme: {
  //       color: "hsl(var(--primary))",
  //     },
  //     modal: {
  //       ondismiss: function () {
  //         // toast({
  //         //   title: "Payment Cancelled",
  //         //   description: "You cancelled the payment process.",
  //         //   variant: "destructive",
  //         // });
  //       },
  //     },
  //   };

  //   const rzp = new (window as any).Razorpay(options);
  //   rzp.open();
  // };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Address Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card className="animate-fade-in border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
                    1
                  </span>
                  Delivery Address
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {!isAddressExpanded
                    ? "Delivering to"
                    : "Select or add a delivery address"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 overflow-hidden">
                {/* Collapsed View - Show Selected Address */}
                {!isAddressExpanded && currentAddress && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="p-4 rounded-lg bg-primary/5 border-2 border-primary transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-lg">
                              {currentAddress.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs animate-in fade-in duration-700"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Selected
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {currentAddress.street}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {currentAddress.city}, {currentAddress.state}{" "}
                            {currentAddress.zip}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Phone: {currentAddress.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-primary underline hover:no-underline p-0 h-auto font-normal transition-all duration-200 hover:translate-x-1"
                      onClick={() => setIsAddressExpanded(true)}
                    >
                      Change
                    </Button>
                  </div>
                )}

                {/* Expanded View - Show All Addresses */}
                {isAddressExpanded && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <RadioGroup
                      value={selectedAddress.toString()}
                      onValueChange={(val) => setSelectedAddress(Number(val))}
                    >
                      <div className="space-y-3">
                        {addresses.map((address, index) => (
                          <div
                            key={address.id}
                            className={`relative flex items-start p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 animate-in fade-in slide-in-from-left-4 ${
                              selectedAddress === address.id
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border"
                            }`}
                            style={{
                              animationDelay: `${index * 100}ms`,
                              animationDuration: "400ms",
                            }}
                          >
                            <RadioGroupItem
                              value={address.id.toString()}
                              id={`address-${address.id}`}
                              className="mt-1 transition-all duration-200"
                            />
                            <Label
                              htmlFor={`address-${address.id}`}
                              className="flex-1 ml-3 cursor-pointer"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold transition-colors duration-200">
                                  {address.name}
                                </span>
                                {selectedAddress === address.id && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs animate-in zoom-in duration-300"
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    Selected
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {address.street}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {address.city}, {address.state} {address.zip}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Phone: {address.phone}
                              </p>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    {/* Add New Address Button */}
                    {!showAddressForm && (
                      <Button
                        variant="outline"
                        className="w-full transition-all duration-300 hover:bg-primary/5 hover:border-primary animate-in fade-in slide-in-from-bottom-2"
                        style={{
                          animationDelay: `${addresses.length * 100}ms`,
                          animationDuration: "400ms",
                        }}
                        onClick={() => setShowAddressForm(true)}
                      >
                        <Plus className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                        Add New Address
                      </Button>
                    )}

                    {/* New Address Form */}
                    {showAddressForm && (
                      <Card className="border-2 border-dashed border-primary/30 animate-in fade-in zoom-in-95 duration-500">
                        <CardHeader>
                          <CardTitle className="text-lg">New Address</CardTitle>
                          <CardDescription>
                            Enter your new delivery address
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="addressName">
                              Address Label (Home, Office, etc.)
                            </Label>
                            <Input
                              id="addressName"
                              placeholder="Home"
                              value={newAddress.name}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  name: e.target.value,
                                })
                              }
                              className="transition-all hover:border-primary/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                              id="street"
                              placeholder="123 Main Street"
                              value={newAddress.street}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  street: e.target.value,
                                })
                              }
                              className="transition-all hover:border-primary/50"
                            />
                          </div>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="newCity">City</Label>
                              <Input
                                id="newCity"
                                placeholder="New York"
                                value={newAddress.city}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    city: e.target.value,
                                  })
                                }
                                className="transition-all hover:border-primary/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newState">State</Label>
                              <Input
                                id="newState"
                                placeholder="NY"
                                value={newAddress.state}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    state: e.target.value,
                                  })
                                }
                                className="transition-all hover:border-primary/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newZip">ZIP Code</Label>
                              <Input
                                id="newZip"
                                placeholder="10001"
                                value={newAddress.zip}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    zip: e.target.value,
                                  })
                                }
                                className="transition-all hover:border-primary/50"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              placeholder="+1234567890"
                              value={newAddress.phone}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  phone: e.target.value,
                                })
                              }
                              className="transition-all hover:border-primary/50"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleAddAddress}
                              className="flex-1"
                            >
                              Save Address
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowAddressForm(false);
                                setNewAddress({
                                  name: "",
                                  street: "",
                                  city: "",
                                  state: "",
                                  zip: "",
                                  phone: "",
                                });
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Confirm Address Button */}
                    <Button
                      className="w-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                      size="lg"
                      onClick={handleConfirmAddress}
                    >
                      Deliver to this Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card
              className="animate-fade-in sticky top-24 border-border shadow-lg"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {cartItems.length} items in cart
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        // onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <Badge variant="secondary" className="mb-2">
                    FREE SHIPPING
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    You've qualified for free shipping on orders over $100!
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <PaynowButton
                  cartItems={data?.cartItems || []}
                  totalAmount={orderSummary?.total || 0}
                />
                {/* <Button
                  className="w-full hover-scale"
                  size="lg"
                  // onClick={handleCheckout}
                >
                  Complete Purchase
                </Button> */}
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { icon: "🔒", title: "Secure Payment", desc: "SSL Encrypted" },
            { icon: "📦", title: "Free Shipping", desc: "On orders over $100" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day guarantee" },
            { icon: "💬", title: "24/7 Support", desc: "Always here to help" },
          ].map((item, index) => (
            <Card
              key={index}
              className="text-center p-4 hover-scale border-border"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
