import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ 
  name, 
  role, 
  company, 
  content, 
  rating, 
  avatar 
}) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start mb-4">
        <Quote className="w-6 h-6 text-indigo-500 opacity-70" />
      </div>
      
      <p className="text-gray-600 mb-6 italic">{content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            {avatar ? (
              <img 
                src={avatar} 
                alt={name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">
              {role} {company && `at ${company}`}
            </p>
          </div>
        </div>
        
        {rating && (
          <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Default props
TestimonialCard.defaultProps = {
  role: '',
  company: '',
  rating: null,
  avatar: null
};

export default TestimonialCard;