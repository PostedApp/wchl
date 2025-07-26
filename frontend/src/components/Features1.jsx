import { motion } from "framer-motion";
import feature1 from "../assets/images/social_bio.png";
import { CheckArrowIcon } from "../assets/icons/CheckArrowIcon";

export const Features1 = () => {
  return (
    <section
      className="w-full bg-customDarkBg2 mt-20 mb-8 sm:mt-16 sm:mb-16 xl:mt-0  xl:m pt-[2rem]  md:pt-[12vw] lg:pt-0"
      id="features"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-wrap items-center 2xl:w-[1450px] xl:w-[1300px] w-11/12 mx-auto md:pl-4 xl:pr-16 xl:pl-16">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <div className="mx-auto lg:mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-unset">
              <span className="custom-block-subtitle">LINK-IN-BIO</span>
              <h2 className="mt-6 mb-8 text-4xl lg:text-5xl custom-block-big-title">
                More Than Just A Bio
              </h2>
              <p className="mb-10 text-customGrayText leading-loose">
                All your important links and social media in one place. Never
                lose your audience.
              </p>
              <ul className="mb-6 text-white">
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Free</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Fully Customizable</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Verifiable and Unique To You</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-11/12 sm:w-3/4 mx-auto lg:w-1/2 flex flex-wrap lg:-mx-4 sm:pr-8 justify-center">
            <div className="mb-8 lg:mb-0 w-full px-2 lg:pl-16 flex flex-col justify-center md:pl-8">
              <div className="mb-4 py-3 md:pl-3 md:pr-20 lg:pr-12 rounded">
                <img
                  src={feature1}
                  alt="f1"
                  className="rounded-xl  custom-border-gray"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
