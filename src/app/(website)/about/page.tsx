import NewsLetterSubscription from "../_components/landing-page/newsletter-Subscription";
import SportsArticles from "../_components/landing-page/sports-articles";
import Banner from "../_components/re-usable/banner";
import MissionVision from "./_components/mission-vision";

export default function Home() {
  return (
    <div className="space-y-24">
      <Banner
        bannerURL="/images/landing-page/hero.jpg"
        title="ABOUT GOLF KNOCKOUT"
        desc="Revolutionizing the way golf tournaments are organized and played"
        buttonTitle="Join Tournament"
        buttonPath="/tournaments"
      />

      <div className="container mx-auto space-y-24">
        <MissionVision />
        <SportsArticles />
        <NewsLetterSubscription />
      </div>
    </div>
  );
}
