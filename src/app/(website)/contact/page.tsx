import Banner from "../_components/re-usable/banner";
import GetInTouch from "./_components/get-in-touch";

export default function Contact() {
  return (
    <div className="space-y-24">
      <Banner
        bannerURL="/images/contact/contact-banner.jpg"
        title="Contact Us"
        desc="Have questions? We would love to hear from you."
        buttonTitle="Join Tournament"
        buttonPath="/tournaments"
      />

      <div className="container mx-auto space-y-24">
        <GetInTouch />
      </div>
    </div>
  );
}
