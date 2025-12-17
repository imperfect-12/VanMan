import QuoteButton from "../components/QuoteButton";

const Home = () => {
  return (
    <div>
      <section>
        <h1>Van-Man</h1>
        <p>young and reliable</p>
        <p>
          From small parcels to full house moves — we help with everything.
          <br />
          Get a quote and get started today.
        </p>

        <QuoteButton />
      </section>
      <section>
        <h2>How We Work?</h2>
        <div>
          <h3>1. Request a Service</h3>
          <p>Tell us what you need - Transport, Moving help or Small Parcels</p>
        </div>
        <div>
          <h3>2. Student Step In</h3>
          <p>
            Our student helpers recieves your request and gets your job done
          </p>
        </div>
        <div>
          <h3>3. Everyone Benefites</h3>
          <ul>
            <li>You get our job done. fast and affordable</li>
            <li>
              You students by helping them finance their studies and gain
              experience
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2>Why choose us?</h2>
        <ul>
          <li>Affordable and transparent pricing</li>
          <li>Flexible student workforce</li>
          <li>Easy booking process</li>
          <li>By the community for the community</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
