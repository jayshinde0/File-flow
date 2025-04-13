import { motion } from 'framer-motion';
import { UploadCloud, ArrowRight, ShieldCheck, Zap, Globe, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Button = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const variants = {
    default: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    ghost: 'text-indigo-600 hover:bg-indigo-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      {...props}
      className={`rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const featureVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  const handleNavigateToTransfer = () => {
    navigate('/transfer');
  };

  return (
    <section className="bg-gradient-to-b from-indigo-50 to-white py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Fast & Secure Transfers
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              variants={itemVariants}
            >
              Transfer Files <span className="text-indigo-600">Without Limits</span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600"
              variants={itemVariants}
            >
              Our secure platform lets you send files of any size with end-to-end encryption.
              Perfect for businesses and individuals who value speed and privacy.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button variant="default" size="lg" onClick={handleNavigateToTransfer}>
                Start Transferring <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Right Content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>

              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex justify-center mb-6">
                  <UploadCloud className="w-16 h-16 text-indigo-600" />
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4"
                    variants={featureVariants}
                    whileHover="hover"
                  >
                    <ShieldCheck className="w-6 h-6 text-indigo-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Military-Grade Encryption</h3>
                      <p className="text-gray-600">Your files are protected with AES-256 encryption</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    variants={featureVariants}
                    whileHover="hover"
                  >
                    <Globe className="w-6 h-6 text-indigo-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Global Infrastructure</h3>
                      <p className="text-gray-600">Fast transfers anywhere in the world</p>
                    </div>
                  </motion.div>

                  {/* ✅ New Feature Added Below */}
                  <motion.div
                    className="flex items-start gap-4"
                    variants={featureVariants}
                    whileHover="hover"
                  >
                    <Info className="w-6 h-6 text-indigo-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">No Signup Needed</h3>
                      <p className="text-gray-600">Send files instantly without creating an account</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
