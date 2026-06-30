import QuoteButton from "../components/QuoteButton";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="surface-panel overflow-hidden rounded-lg px-6 py-12 md:px-12 md:py-16">
          <div className="max-w-3xl">
          <span className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 ring-1 ring-blue-200">
            Student-Powered Moving Services
          </span>

          <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
            VanMan
          </h1>

          <p className="mb-6 text-xl font-semibold text-blue-600">
            Young and Reliable
          </p>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
            From small parcels to full house moves — we help with everything.
            <br />
            Fast, affordable and powered by local students.
          </p>

          <div className="flex flex-wrap gap-4">
            <QuoteButton />
          </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            How We Work
          </h2>

          <p className="mt-3 text-slate-600">
            Three simple steps to get moving.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="soft-card rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 ring-1 ring-blue-200">
              1
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Request a Service
            </h3>

            <p className="text-slate-600">
              Tell us what you need — transport, moving help, or parcel
              delivery.
            </p>
          </div>

          <div className="soft-card rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 ring-1 ring-blue-200">
              2
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Students Step In
            </h3>

            <p className="text-slate-600">
              Our student helpers receive your request and handle the work.
            </p>
          </div>

          <div className="soft-card rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 ring-1 ring-blue-200">
              3
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Everyone Benefits
            </h3>

            <ul className="space-y-2 text-slate-600">
              <li>✓ Fast and affordable service</li>
              <li>✓ Students earn while studying</li>
              <li>✓ Local community helping local community</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="surface-panel rounded-lg p-8 md:p-12">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-slate-950">
            Why Choose Us?
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-slate-700">
                Affordable and transparent pricing
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-slate-700">Flexible student workforce</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-slate-700">Easy booking process</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-slate-700">
                By the community, for the community
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
