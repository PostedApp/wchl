import { motion } from "framer-motion";
import { SiReddit, SiYoutube, SiX, SiInstagram, SiThreads, SiDiscord } from '@icons-pack/react-simple-icons';

export const Brands = () => (
  <section className="py-12 sm:py-24 bg-customDarkBg1 w-full mt-16 mb-16">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container px-4 mx-auto 2xl:w-[1200px] xl:w-[1100px] lg:w-[1000px] md:w-4/5">
        <div className="flex lg:flex-row flex-col items-center -mx-4 justify-center lg:text-left text-center">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <div className="flex flex-col">
              <h2 className="mb-2  text-4xl sm:text-5xl 2xl:text-6xl font-bold tracking-normal text-white">
                Supported
              </h2>
              <h2 className=" text-4xl  sm:text-5xl 2xl:text-6xl font-bold tracking-normal text-customSecondary">
                Platforms
              </h2>
            </div>
          </div>
          <div className="w-2/3 sm:w-[620px] lg:w-1/2 mx-auto lg:mx-0 lg:pl-10">
            <div className="flex flex-wrap -m-4">
              <div className="w-1/2 sm:w-1/3 py-6 flex justify-center">
                <SiReddit color='white' size={48} />
              </div>
              <div className="w-1/2 sm:w-1/3 py-6 flex  justify-center">
                <SiYoutube color='white' size={48}  />
              </div>
              <div className="w-1/2 sm:w-1/3 py-6 flex  justify-center">
                <SiX  color='white' size={48} />
              </div>
              <div className="w-1/2 sm:w-1/3 py-6 flex justify-center">
                <SiInstagram color='white' size={48}  />
              </div>
              <div className="w-1/2 sm:w-1/3 py-6 flex justify-center">
                <SiThreads color='white' size={48}  />
              </div>
              <div className="w-1/2 sm:w-1/3  py-6 flex  justify-center">
                <SiDiscord color='white' size={48}  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);
