import React from "react";

export default function Page() {
  return (
    <section className="py-16 pt-28 h-full">
      <div className="containerBox flex flex-col items-center">
        <h2 className="mb-4 text-center text-3xl xs:text-4xl md:text-5xl  font-bold text-primary drop-shadow-lg">
          About Us
        </h2>
        <p className="text-lg md:w-[70%] leading-8 text-center md:text-left indent-10">
          Welcome to our space — a place where stories, thoughts, and emotions
          come alive. We believe that words have the power to connect hearts,
          spark ideas, and inspire change. Through our blogs, we share moments
          from life, reflections from the soul, and experiences that touch every
          corner of human emotion. Our vision is simple: to create a community
          where people can relate, learn, and feel understood. Whether it’s
          heartfelt confessions, imaginative worlds, or everyday musings, we
          write with authenticity and passion. Here, every post is more than
          just content — it’s a piece of us, shared with you.
        </p>
      </div>
    </section>
  );
}
