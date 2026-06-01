import QuoteButton from "../components/QuoteButton";

const Home = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 mb-6">
            Student-Powered Moving Services
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            VanMan
          </h1>

          <p className="text-xl text-blue-600 font-medium mb-6">
            Young and Reliable
          </p>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            From small parcels to full house moves — we help with everything.
            <br />
            Fast, affordable and powered by local students.
          </p>

          <div className="flex flex-wrap gap-4">
            <QuoteButton />
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">How We Work</h2>

          <p className="mt-3 text-slate-600">
            Three simple steps to get moving.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
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

          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Students Step In
            </h3>

            <p className="text-slate-600">
              Our student helpers receive your request and handle the work.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
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
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
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
