import React from "react";
import { Zap } from "lucide-react";

interface HeroBannerProps {
  userName: string | undefined;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ userName }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-semibold">Flash Sale - Limited Time!</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
              Welcome back, <span className="text-yellow-300">{userName}!</span>
            </h2>
            <p className="text-lg lg:text-xl text-white/90">
              Discover amazing products at unbeatable prices. Shop the latest trends and exclusive deals!
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Shop Now
              </button>
              <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border-2 border-white/30">
                View Deals
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative w-full h-64 lg:h-80 bg-white/10 backdrop-blur-sm rounded-3xl border-2 border-white/20 flex items-center justify-center">
              <div className="text-6xl">🛍️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

