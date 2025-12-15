import React from "react";
import assets, { dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="pb-12 px-8 md:px-0">
      <h3 className="text-xl font-medium text-gray-800">Testimonials</h3>
      <p className="md:text-base mt-3 text-gray-600">
        Here from our learners as they share their journeys of transformation,
        success, and how our <br /> platform has made a difference in their
        lives.
      </p>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-12  max-w-5xl">
        {dummyTestimonial.map((testimonial, i) => (
          <div
            key={i}
            className="text-sm rounded-lg text-left bg-white border border-gray-500/30 pb-5 shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-4 bg-gray-500/10">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg text-gray-800 font-medium">
                  {testimonial.name}
                </h2>
                <p className="text-gray-800/80">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-4 pb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-4"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-4">{testimonial.feedback}</p>
            </div>
            <a href="#" className="text-blue-500 hover:underline px-5">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
