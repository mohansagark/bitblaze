import Typewriter from "typewriter-effect";
import IntroSecDetails from "../../data/introSection.json";

const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col p-5 text-center h-[calc(100vh-100px)]">
      <p className="text-5 text-uppercase text-4xl text-primary ls-4 mb-2 mb-md-3">
        {IntroSecDetails.heading1}
      </p>
      <h2 className="text-17 fw-600 text-primary text-6xl mb-2 mb-md-3">
        <Typewriter
          options={{
            strings: IntroSecDetails.typeWritterHeadings,
            autoStart: true,
            loop: true,
            cursorClassName: "text-primary font-semibold",
            wrapperClassName: "text-primary font-semibold",
          }}
        />
      </h2>
      <h2 className="text-17 fw-600 text-primary mb-2 mb-md-3">
        <span className="typed" />
      </h2>
      <p className="text-primary text-xl">{IntroSecDetails.heading2}</p>
    </div>
  );
};

export default Home;
