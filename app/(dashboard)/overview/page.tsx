export default function DashboardPage() {
  return (
    <>
      {/* <!-- Main Content --> */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* <!-- Mobile Header --> */}
        <header className="h-16 bg-neutral-0 border-b border-neutral-200 flex items-center justify-between px-4 md:hidden sticky top-0 z-10">
          <span className="text-heading-3 text-neutral-900">DASHBOARD</span>
          <button className="text-neutral-500">
            <i data-lucide="menu" className="w-6 h-6"></i>
          </button>
        </header>

        {/* <!-- Page Content --> */}
        <div className="p-6 lg:p-10 space-y-8 bg-dash-grid">
          {/* <!-- Welcome Section --> */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-heading-1 text-neutral-900 mb-1">Overview</h1>
              <p className="text-body text-neutral-500">
                Track your progress and pick up where you left off.
              </p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-caption text-neutral-400">CURRENT STREAK</p>
              <div className="flex items-center justify-end gap-2 text-brand-600">
                <i data-lucide="flame" className="w-5 h-5 fill-current"></i>
                <span className="text-heading-2">12 Days</span>
              </div>
            </div>
          </div>

          {/* <!-- Stats Grid --> */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-neutral-0 border border-neutral-200 p-5">
              <p className="text-caption text-neutral-500 mb-2">IN PROGRESS</p>
              <p className="text-heading-1 text-neutral-900">3</p>
            </div>
            <div className="bg-neutral-0 border border-neutral-200 p-5">
              <p className="text-caption text-neutral-500 mb-2">COMPLETED</p>
              <p className="text-heading-1 text-neutral-900">12</p>
            </div>
            <div className="bg-neutral-0 border border-neutral-200 p-5">
              <p className="text-caption text-neutral-500 mb-2">TOTAL HOURS</p>
              <p className="text-heading-1 text-neutral-900">48h</p>
            </div>
            <div className="bg-neutral-0 border border-neutral-200 p-5 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-2 opacity-10">
                <i data-lucide="award" className="w-16 h-16 text-brand-600"></i>
              </div>
              <p className="text-caption text-neutral-500 mb-2">CERTIFICATES</p>
              <p className="text-heading-1 text-brand-600">2</p>
            </div>
          </div>

          {/* <!-- Continue Learning (Hero Card) --> */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading-2 text-neutral-900">
                Continue Learning
              </h2>
            </div>

            <div className="bg-neutral-900 text-neutral-0 border border-neutral-800 p-0 flex flex-col md:flex-row overflow-hidden group">
              {/* <!-- Left: Content Info --> */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-brand-600 text-white text-[10px] px-2 py-0.5 font-bold tracking-wider">
                      RESUME
                    </span>
                    <span className="text-caption text-neutral-400">
                      MODULE 4 / LESSON 2
                    </span>
                  </div>
                  <h3 className="text-heading-1 mb-2">
                    Next.js & Shopify Integration
                  </h3>
                  <p className="text-body text-neutral-400 mb-6 max-w-xl">
                    You are currently learning how to implement Shopify Webhooks
                    to handle subscription updates securely.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-caption text-neutral-400 mb-2">
                    <span>COURSE PROGRESS</span>
                    <span>42%</span>
                  </div>
                  {/* <!-- Progress Bar --> */}
                  <div className="w-full bg-neutral-800 h-2 mb-6">
                    <div className="bg-brand-500 h-2 w-[42%] relative">
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-50"></div>
                    </div>
                  </div>

                  <button className="bg-brand-600 text-white px-6 py-3 text-body font-medium hover:bg-brand-500 transition-colors flex items-center gap-2">
                    <i data-lucide="play-circle" className="w-4 h-4"></i>
                    Continue Lesson
                  </button>
                </div>
              </div>

              {/* <!-- Right: Visual Context (Code/Abstract) --> */}
              {/* <div className="bg-neutral-950 w-full md:w-1/3 border-l border-neutral-800 p-6 font-mono text-xs text-neutral-500 hidden md:block relative">
                        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
                        <div className="space-y-1 opacity-70">
                            <div className="text-brand-700">// webhook.ts</div>
                            <div><span className="text-brand-500">export async function</span> POST(req) {</div>
                            <div className="pl-4">const body = <span className="text-brand-300">await</span> req.text();</div>
                            <div className="pl-4">const topic = headers().get(<span className="text-brand-200">'x-shopify-topic'</span>);</div>
                            <div className="pl-4 text-neutral-700">...</div>
                            <div className="pl-4"><span className="text-brand-500">if</span> (topic === <span className="text-brand-200">'app/uninstalled'</span>) {</div>
                            <div className="pl-8">await prisma.user.update({...});</div>
                            <div className="pl-4">}</div>
                            <div>}</div>
                        </div>
                    </div> */}
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading-2 text-neutral-900">
                Enrolled Courses
              </h2>
              <a
                href="/courses"
                className="text-caption text-neutral-500 hover:text-neutral-900"
              >
                {"BROWSE CATALOG ->"}
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* <!-- Card 1 --> */}
              <div className="bg-neutral-0 border border-neutral-200 flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <i
                      data-lucide="database"
                      className="w-8 h-8 text-neutral-700"
                    ></i>
                    <div className="w-8 h-8 rounded-full border-2 border-neutral-200 flex items-center justify-center">
                      <i
                        data-lucide="more-horizontal"
                        className="w-4 h-4 text-neutral-400"
                      ></i>
                    </div>
                  </div>
                  <h3 className="text-heading-3 text-neutral-900 mb-1">
                    Serverless Postgres
                  </h3>
                  <p className="text-caption text-neutral-500 mb-4">
                    Last active: 2 days ago
                  </p>

                  <div className="space-y-2">
                    <div className="w-full bg-neutral-100 h-1">
                      <div className="bg-neutral-900 h-1 w-[15%]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-400 uppercase tracking-wide">
                      <span>1/8 Modules</span>
                      <span>15%</span>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="px-6 py-3 border-t border-neutral-100 bg-neutral-50 text-caption text-neutral-600 font-medium hover:bg-neutral-100 transition-colors flex items-center justify-between"
                >
                  Resume Course
                  <i data-lucide="arrow-right" className="w-3 h-3"></i>
                </a>
              </div>

              {/* <!-- Card 2 --> */}
              <div className="bg-neutral-0 border border-neutral-200 flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <i
                      data-lucide="container"
                      className="w-8 h-8 text-neutral-700"
                    ></i>
                  </div>
                  <h3 className="text-heading-3 text-neutral-900 mb-1">
                    Docker for Developers
                  </h3>
                  <p className="text-caption text-neutral-500 mb-4">
                    Last active: 5 days ago
                  </p>

                  <div className="space-y-2">
                    <div className="w-full bg-neutral-100 h-1">
                      <div className="bg-neutral-900 h-1 w-[85%]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-400 uppercase tracking-wide">
                      <span>9/10 Modules</span>
                      <span>85%</span>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="px-6 py-3 border-t border-neutral-100 bg-neutral-50 text-caption text-neutral-600 font-medium hover:bg-neutral-100 transition-colors flex items-center justify-between"
                >
                  Resume Course
                  <i data-lucide="arrow-right" className="w-3 h-3"></i>
                </a>
              </div>

              {/* <!-- Card 3 (Completed) --> */}
              <div className="bg-neutral-0 border border-neutral-200 flex flex-col opacity-75 hover:opacity-100 transition-opacity">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <i
                      data-lucide="shield"
                      className="w-8 h-8 text-brand-600"
                    ></i>
                    <div className="bg-brand-50 text-brand-700 text-[10px] px-2 py-0.5 border border-brand-200">
                      COMPLETED
                    </div>
                  </div>
                  <h3 className="text-heading-3 text-neutral-900 mb-1">
                    Web Security Fundamentals
                  </h3>
                  <p className="text-caption text-neutral-500 mb-4">
                    Finished: Oct 12, 2024
                  </p>

                  <div className="space-y-2">
                    <div className="w-full bg-brand-100 h-1">
                      <div className="bg-brand-500 h-1 w-full"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-brand-600 uppercase tracking-wide">
                      <span>14/14 Modules</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="px-6 py-3 border-t border-neutral-100 bg-neutral-50 text-caption text-neutral-600 font-medium hover:bg-neutral-100 transition-colors flex items-center justify-between"
                >
                  View Certificate
                  <i data-lucide="download" className="w-3 h-3"></i>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
