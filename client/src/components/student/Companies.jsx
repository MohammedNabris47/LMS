import assets from "../../assets/assets";

const Companies = () => {
  return (
    <div className="pt-12">
      <p className="text-base text-gray-600">Trusted by learners from</p>
      <div className="flex items-center justify-center flex-wrap gap-5 md:gap-16 mt-5 md:mt-8">
        <img
          src={assets.microsoft_logo}
          alt="microsoft"
          className="w-20 md:w-24"
        />
        <img src={assets.adobe_logo} alt="adobe" className="w-20 md:w-24" />
        <img src={assets.walmart_logo} alt="walmart" className="w-20 md:w-24" />
        <img
          src={assets.accenture_logo}
          alt="accenture"
          className="w-20 md:w-24"
        />
        <img src={assets.paypal_logo} alt="paypal" className="w-20 md:w-24" />
      </div>
    </div>
  );
};

export default Companies;
