import Banner from "./_components/re-usable/banner";

export default function Home() {
  return (
    <div>
      <Banner
        bannerURL="/images/landing-page/hero.jpg"
        title="Top scorer to the final match"
        desc="Experience the thrill of knockout golf tournaments. Track your progress, compete with the best, and claim victory."
        buttonTitle="Join Tournament"
        buttonPath="/brackets"
      />
    </div>
  );
}
