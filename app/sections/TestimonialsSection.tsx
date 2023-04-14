import {FaQuoteLeft} from 'react-icons/fa';

const testimonials = [
  {
    message:
      "I bought a snowboard from Snow Devil and I couldn't be happier! The staff were knowledgeable and helped me choose the perfect board. Prices were unbeatable. I'll definitely be back!",
    author: 'Alex, avid snowboarder',
  },
  {
    message:
      'I found Snow Devil while looking for a new snowboarding jacket. I was blown away by their selection and ended up buying a whole outfit! Quality is top-notch and shipping was fast. Highly recommend!',
    author: 'Sarah, recreational snowboarder',
  },
  {
    message:
      "I'm a ski instructor and always recommend Snow Devil to my students. Their gear is durable, comfortable, and stylish. Whether you're a beginner or expert, they have what you need. I've used their products for years and they never disappoint!",
    author: 'Jake, ski instructor',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="app-container">
      <h3 className="text-2xl font-bold tracking-tight">
        What people are saying?
      </h3>
      <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
        {testimonials.map((testimonial) => (
          <blockquote className="sm:flex lg:block" key={testimonial.author}>
            <FaQuoteLeft className="flex-shrink-0 w-8 h-8 text-gray-300" />
            <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
              <p className="text-lg text-gray-600">{testimonial.message}</p>
              <cite className="block mt-4 not-italic font-semibold text-gray-900">
                {testimonial.author}
              </cite>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
