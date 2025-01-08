import Footer from "@/components/LandingPage/Footer";
import LoginButton from "@/components/LandingPage/LoginButton";

export default function Home() {
  return (
    <>
      <div className="font-ibmPlexMono flex flex-col items-center flex-1 justify-evenly">
        <div className="flex flex-col items-center justify-center md:gap-y-6 gap-y-4">
          <p className="lg:text-7xl md:text-6xl text-3xl text-center text-white font-bold">
            Development Quiz
          </p>
          <p className="lg:text-xl md:text-lg text-base text-center md:w-[30rem] md:max-w-[30rem] w-[80vw] max-w-[15rem] text-[#FFFFFF95]">
            your go-to quiz app to sharpen your knowledge of web development
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <p className="lg:text-2xl md:text-xl text-lg md:text-start text-center">
            Start practicing today!
          </p>
          <LoginButton />
        </div>
      </div>
      <Footer />
    </>
  );
}
