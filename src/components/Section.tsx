import { useEffect, useRef, useState, type ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

export function SectionTitle({
  children,
  subtitle,
}: {
  children: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 text-zinc-400 text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
