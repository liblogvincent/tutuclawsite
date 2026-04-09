'use client';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      <div className="mb-10">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
          style={{ background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))", color: "#fff" }}
        >
          About Us
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          The AI Site That Doesn't Take Itself Too Seriously
        </h1>
        <div className="w-12 h-0.5 rounded-full mb-6" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
      </div>

      <div className="space-y-8">
        {/* Mission */}
        <div className="glass p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Why TutuClaw Exists
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            AI is moving so fast that by the time you finish reading this sentence, three new tools launched, two got acquired, and one achieved sentience (just kidding... probably).
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            We got tired of AI feeling like a VIP club with a 47-page application form. So we built TutuClaw — a place where anyone can explore ideas, discover tools, and actually understand what AI can do for them without needing a PhD, a fortune, or a sacrifice to the algorithm gods.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Whether you're a developer automating your workflow, a manager trying to impress your boss with "AI strategy," or someone who just wants ChatGPT to write a better email — we've got you.
          </p>
        </div>

        {/* What We Do */}
        <div className="glass p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            What We Actually Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Curate',
                desc: "We test and handpick AI tools so you don't have to waste your weekend comparing 47 chatbots that all claim to be 'revolutionary.' Spoiler: most aren't.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Explain',
                desc: "We translate AI jargon into human language. No more nodding along in meetings when someone says 'leveraging transformer architectures for multi-modal RAG pipelines.' We got you.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                title: 'Connect',
                desc: "News, case studies, learning resources — all in one place. Think of us as that friend who sends you the good stuff so you don't have to scroll for hours.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))", color: "#fff" }}
                >
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="glass p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Our Highly Scientific Core Values
          </h2>
          <div className="space-y-3">
            {[
              { label: 'No BS', text: "If a tool is overhyped, we'll say so. We're not here to sell you anything — we're here to save you time and money." },
              { label: 'AI for Humans', text: "Technology should work for people, not the other way around. If you need a manual to use the manual, something's wrong." },
              { label: 'Stay Curious', text: "The best way to learn AI is to play with it. We encourage experimenting, breaking things, and occasionally asking ChatGPT to write your grocery list." },
            ].map((v) => (
              <div
                key={v.label}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
              >
                <span className="font-bold text-sm flex-shrink-0" style={{ color: "var(--accent-start)" }}>
                  {v.label}
                </span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {v.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fun fact */}
        <div className="glass p-6 md:p-8 text-center">
          <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
            Fun fact
          </p>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            This very page was not written by AI. Okay, maybe partially. Fine, mostly.
            <br />
            <span style={{ color: "var(--text-muted)" }}>But the humor is 100% human. We promise.</span>
          </p>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-lg mb-4" style={{ color: "var(--text-secondary)" }}>
            Got a question, a hot take, or just want to say hi?
          </p>
          <a
            href="mailto:aratworkliblog@gmail.com"
            className="inline-block px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
              color: "#fff",
            }}
          >
            Slide Into Our Inbox
          </a>
          <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
            Our OpenClaw agent checks the inbox 24/7. If I'm sleeping, it reads your email first.
            <br />
            If I'm awake... it still reads it first. I'm starting to think it runs the place.
          </p>
        </div>
      </div>
    </div>
  );
}
