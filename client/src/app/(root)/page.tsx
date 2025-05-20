import Navbar from "@/components/common/nav-bar";
import CategorizedProducts from "@/components/dashboard/categorized-products";
import CategoryMenu from "@/components/dashboard/category-menu";

import DashboardCarousel from "@/components/dashboard/dashboard-carousel";
import FeaturedProducts from "@/components/dashboard/feature-products";

export default function Home() {
  return (
    <div className="relative">
      <section className="h-8 text-sm overflow-x-auto whitespace-nowrap">
        <CategoryMenu />
      </section>

      <section>
        <DashboardCarousel />
      </section>

      <div className="absolute w-full top-[300px] z-10">
        <section>
          <CategorizedProducts />
        </section>

        <div className="h-screen">
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
}
