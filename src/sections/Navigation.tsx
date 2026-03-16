import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function Navigation() {
  const { content } = useContentStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { navigation } = content;
  
  // 动态获取 Logo 图标
  const LogoIcon = getIcon(navigation.logoIcon || 'Cpu');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <LogoIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">{navigation.logoText}</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Button & Admin Link */}
            <div className="hidden md:flex items-center gap-3">
              {/* <Link
                to="/admin"
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                title="进入后台管理"
              >
                <Settings className="w-5 h-5" />
              </Link> */}
              <Button 
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white"
              >
                {navigation.ctaText}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/5 p-4">
            <div className="flex flex-col gap-2">
              {navigation.navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-3 text-left text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
              {/*<Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-left text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                后台管理
              </Link>*/}
              <Button 
                className="mt-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white"
              >
                {navigation.ctaText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
