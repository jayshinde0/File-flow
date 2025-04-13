import { motion } from 'framer-motion';
import { UploadCloud, ShieldCheck, Zap, Users } from 'lucide-react';

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="bg-gradient-to-b from-purple-50 to-white py-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={item} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              About <span className="text-indigo-600">FileFlow</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              FileFlow is your go-to solution for transferring large files quickly, securely, and effortlessly — with no size limits.
            </p>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={container}
          >
            {/* Card 1 */}
            <motion.div
              variants={item}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out space-y-4"
            >
              <UploadCloud className="w-10 h-10 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">Unlimited File Transfers</h3>
              <p className="text-gray-600">
                No restrictions on file sizes. Share gigabytes with a click.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={item}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out space-y-4"
            >
              <ShieldCheck className="w-10 h-10 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">Secure & Encrypted</h3>
              <p className="text-gray-600">
                Military-grade AES-256 encryption ensures complete privacy.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={item}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out space-y-4"
            >
              <Zap className="w-10 h-10 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">Blazing Fast Speed</h3>
              <p className="text-gray-600">
                Powered by a global CDN, transfers are lightning quick.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              variants={item}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out space-y-4"
            >
              <Users className="w-10 h-10 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">Built for Everyone</h3>
              <p className="text-gray-600">
                Whether you're a student, professional, or business, FileFlow works seamlessly for all.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
