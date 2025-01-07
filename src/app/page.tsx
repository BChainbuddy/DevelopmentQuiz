import Footer from "@/components/LandingPage/Footer";
import LoginButton from "@/components/LandingPage/LoginButton";

export default function Home() {
  return (
    <>
      <div className="font-ibmPlexMono flex flex-col items-center flex-1 justify-evenly">
        <div className="flex flex-col items-center justify-center gap-y-6">
          <p className="text-7xl text-center text-white">Development Quiz</p>
          <p className="text-xl text-center w-[30rem] text-[#FFFFFF95]">
            your go-to quiz app to sharpen your knowledge of web development
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <p className="text-2xl">Start practicing today!</p>
          <LoginButton />
        </div>
      </div>
      <Footer />
    </>
  );
}
