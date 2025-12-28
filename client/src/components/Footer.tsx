import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-white">BrightSmile Dental</h3>
            <p className="text-slate-400 leading-relaxed">
              Providing exceptional dental care with a gentle touch. Your smile is our top priority.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/services"><span className="hover:text-primary transition-colors cursor-pointer">Our Services</span></Link></li>
              <li><Link href="/team"><span className="hover:text-primary transition-colors cursor-pointer">Meet the Team</span></Link></li>
              <li><Link href="/promotions"><span className="hover:text-primary transition-colors cursor-pointer">Special Offers</span></Link></li>
              <li><Link href="/gallery"><span className="hover:text-primary transition-colors cursor-pointer">Smile Gallery</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-primary transition-colors cursor-pointer">Contact Us</span></Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>123 Dental Avenue, Suite 100<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@brightsmile.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Mon - Fri</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Saturday</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Sunday</span>
                <span className="text-slate-500">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BrightSmile Dental. All rights reserved.</p>
          <Link href="/admin-login">
            <span className="hover:text-primary transition-colors cursor-pointer underline underline-offset-4 decoration-slate-700 hover:decoration-primary">
              Admin Login
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
