import React from 'react';

const FeaturedOwner = () => {
  return (
    <section className="container mx-auto px-4 my-20">
      <div className="flex flex-col justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Top Categories</h2>
        <p className="text-gray-500 mt-1">
          Explore our wide range of vehicles by type
        </p>
      </div>
      <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600"
            alt="Host"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="w-full md:w-1/2 p-10 md:p-16 text-white">
          <span className="bg-[#FF7000] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Host Spotlight
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-4">
            Meet Robert, a Top-Rated Host
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            "I've been sharing my fleet on TravelEase for 2 years. The
            experience has been seamless, and I love meeting travelers from all
            over the world. My cars are always maintained to the highest
            standards."
          </p>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white">500+</span>
              <span className="text-xs text-gray-500 uppercase">
                Trips Completed
              </span>
            </div>
            <div className="h-8 w-[1px] bg-gray-700"></div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white">4.9/5</span>
              <span className="text-xs text-gray-500 uppercase">
                Host Rating
              </span>
            </div>
          </div>
          <button className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition-all">
            View Robert's Fleet
          </button>
        </div>
      </div>
    </section>
  );
};
export default FeaturedOwner;
