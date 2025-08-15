import React from "react";

function Banner() {
  return (
    <>
      <section
        className="w-full h-[500px] bg-no-repeat bg-cover bg-center relative"
        style={{ backgroundImage: `url("/heroBanner.jpg")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8c8dc]/50 to-[#cdb4db]/80 z-10"></div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-5xl xs:text-6xl md:text-7xl font-bold text-foreground drop-shadow-lg">
            Dil Se Likha
          </h1>
        </div>
      </section>
    </>
  );
}

export default Banner;
