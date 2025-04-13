import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white mt-10"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

          {/* Branding */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">FileFlow</span>
            <span className="text-sm text-white/70">© {new Date().getFullYear()}</span>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:contact@fileflow.com" className="hover:text-white/80 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4 text-sm text-white/70 space-y-1"
        >
          <p>FileFlow is an open-source platform designed for smooth and secure file sharing.</p>
          <p>Optimized for speed, simplicity, and privacy — no data stored on external servers.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
