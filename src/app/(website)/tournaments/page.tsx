import NewsLetterSubscription from "../_components/landing-page/newsletter-Subscription";
import SportsArticles from "../_components/landing-page/sports-articles";
import UpcomingTournaments from "../_components/landing-page/upcoming-tournaments";
import Banner from "../_components/re-usable/banner";

export default function Tournaments() {
  return (
    <div className="space-y-24">
      <Banner
        bannerURL="/images/landing-page/hero.jpg"
        title="LIVE TOURNAMENT BRACKET"
        desc="Spring Championship 2025 - Knockout Stage"
        buttonTitle="Join Tournament"
        buttonPath="/tournaments"
      />

      <div className="container mx-auto space-y-24">
        <UpcomingTournaments />
        <SportsArticles />
        <NewsLetterSubscription />
      </div>
    </div>
  );
}
