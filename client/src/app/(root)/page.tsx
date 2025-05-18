import Navbar from "@/components/common/nav-bar";
import CategorizedProducts from "@/components/dashboard/categorized-products";
import CategoryMenu from "@/components/dashboard/category-menu";

import DashboardCarousel from "@/components/dashboard/dashboard-carousel";

export default function Home() {
  return (
    <div className="relative">
      <nav className="w-full h-16 sticky top-0 left-0 z-50 backdrop-blur-md bg-white/30 border-b  px-6">
        <Navbar />
      </nav>

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

        <div className="h-screen">Hi there</div>
      </div>
    </div>
  );
}
