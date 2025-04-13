import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Sarah Johnson"
            role="CTO"
            company="TechSolutions Inc."
            content="This file transfer system has revolutionized how we share large design files with our remote teams. The speed and reliability are unmatched."
            rating={5}
            avatar="https://uifaces.co/our-content/donated/vIqzOH9T.jpg"
          />

          <TestimonialCard
            name="Michael Chen"
            role="Freelance Developer"
            company="Self-Employed"
            content="I use this daily to send project files to clients. The encryption gives me peace of mind when sharing sensitive documents."
            rating={4.5}
            avatar="https://uifaces.co/our-content/donated/6f6p85he.jpg"
          />

          <TestimonialCard
            name="Emma Rodriguez"
            role="Marketing Director"
            company="Creative Agency Co."
            content="The interface is so intuitive that we onboarded our entire team in minutes. Customer support is excellent too!"
            rating={5}
            avatar="https://uifaces.co/our-content/donated/NY9hnAbp.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
