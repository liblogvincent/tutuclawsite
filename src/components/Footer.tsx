'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--glass-border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: "#fff" }}>
                  <path d="M7.5 2C6.12 2 5 3.5 5 5.5S6.12 9 7.5 9 10 7.5 10 5.5 8.88 2 7.5 2zm4.5 0c-1.38 0-2.5 1.5-2.5 3.5S10.62 9 12 9s2.5-1.5 2.5-3.5S13.38 2 12 2zm4.5 0C15.12 2 14 3.5 14 5.5S15.12 9 16.5 9 19 7.5 19 5.5 17.88 2 16.5 2zM5.5 10C4.12 10 3 11.22 3 12.5 3 14.78 5 17 7 17c.73 0 1.41-.25 2-.67V20c0 1.1.9 2 2 2s2-.9 2-2v-3.67c.59.42 1.27.67 2 .67 2 0 4-2.22 4-4.5C19 11.22 17.88 10 16.5 10c-1.1 0-2.04.59-2.5 1.5-.46-.91-1.4-1.5-2.5-1.5s-2.04.59-2.5 1.5C8.54 10.59 7.6 10 5.5 10z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                TutuClaw
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Your go-to AI news platform — latest industry updates, tech breakthroughs, and analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: "var(--text-secondary)" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/category/Cases', label: 'Cases' },
                { href: '/category/Projects', label: 'Projects' },
                { href: '/category/Learning', label: 'Learning' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "var(--accent-start)";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "var(--text-muted)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: "var(--text-secondary)" }}>
              Contact
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-start)" }} />
                Coded by Claude Code with GLM5.1
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-end)" }} />
                Hosted by Railway via Github 
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-mid)" }} />
                Contact@ liblogvincet@outlook.com
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: "var(--text-secondary)" }}>
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[
                <svg key="twitter" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>,
                <svg key="linkedin" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>,
                <svg key="github" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>,
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border-hover)";
                    e.currentTarget.style.color = "var(--accent-start)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="section-divider mt-12 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 A TutuClaw Site. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs transition-colors duration-300"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-secondary)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-muted)";
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
