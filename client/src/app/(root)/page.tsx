import Navbar from "@/components/common/nav-bar";
import CategoryProducts from "@/components/dashboard/category-products";

import DashboardCarousel from "@/components/dashboard/dashboard-carousel";

export default function Home() {
  return (
    <div>
      <nav className="w-full h-16 sticky top-0 left-0 z-50 backdrop-blur-md bg-white/30 border-b  px-6">
        <Navbar />
      </nav>

      <section className="h-8 text-sm overflow-x-auto whitespace-nowrap">
        <CategoryProducts />
      </section>

      <section>
        <DashboardCarousel />
      </section>

      <section className="h-screen"></section>
    </div>
  );
}
