import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0f] py-12 border-t border-white/5">
      <div className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600">
              <span className="text-white font-bold text-xs">APK</span>
            </div>
            <span className="font-display font-bold text-lg">APKify Builder</span>
          </div>
          
          <div className="flex gap-8 text-sm text-white/40">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/terms-and-condition" className="hover:text-white transition-colors">Terms & Condition</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-white/40 italic">
            Built with ❤️ by LPU Student
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} APKify Builder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
