export default function StatsBar() {
  return (
    <section className="border-b border-neutral-border bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200 border-x border-neutral-200">
          <div className="p-6 text-center">
            <p className="text-heading-2 text-brand-600">50+</p>
            <p className="text-caption text-neutral-500 uppercase tracking-widest mt-1">
              Courses
            </p>
          </div>
          <div className="p-6 text-center">
            <p className="text-heading-2 text-neutral-900">40h</p>
            <p className="text-caption text-neutral-500 uppercase tracking-widest mt-1">
              Video Content
            </p>
          </div>
          <div className="p-6 text-center">
            <p className="text-heading-2 text-neutral-900">Zero</p>
            <p className="text-caption text-neutral-500 uppercase tracking-widest mt-1">
              Fluff
            </p>
          </div>
          <div className="p-6 text-center">
            <p className="text-heading-2 text-neutral-900">24/7</p>
            <p className="text-caption text-neutral-500 uppercase tracking-widest mt-1">
              Access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
