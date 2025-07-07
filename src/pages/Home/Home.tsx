import PageWrapper from "@components/Layout/PageWrapper";

const Home = () => {
  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-4">Welcome to MyApp</h1>
      <p className="mb-4">
        Empowering communities through smart, simple, and impactful technology.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">🌍 Our Mission</h2>
      <p>
        We aim to build solutions that connect people and improve lives — starting from the grassroots.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">📱 Technology for All</h2>
      <p>
        From mobile access to rural innovations, our work ensures no one is left behind.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">🚀 Join the Movement</h2>
      <p>
        Discover how you can support or partner with us to make lasting change.
      </p>
    </PageWrapper>
  );
};

export default Home;
