import { Cpu, ExternalLink } from 'lucide-react';
import { useContentStore } from '@/hooks/useContentStore';
import { getIcon } from '@/lib/iconMap';

export function Footer() {
  const { content } = useContentStore();
  const { footer } = content;

  return (
    <footer className="relative bg-[#0a0f1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">{footer.brandName}</span>
                <span className="text-xs text-gray-500 block">{footer.brandSubname}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              {footer.description}
            </p>
            <div className="flex gap-3">
              {footer.socialLinks.map((social, index) => {
                const IconComponent = getIcon(social.icon);
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Links */}
          {footer.linkGroups.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-cyan-400 transition-colors flex items-center gap-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              {footer.copyright}
            </p>
            <div className="flex items-center gap-6">
              {footer.partnerLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 text-sm hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
