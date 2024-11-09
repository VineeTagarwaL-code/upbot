import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Twitter, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "./ui/HoverBorderGradient";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import GridPattern from "./ui/grid-pattern";
import { cn } from "@/lib/utils";

const Scale = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  whileInView: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.5,
    ease: "easeInOut",
  },
  viewport: { once: true },
};

export const Hero = () => {
  return (
    <section className="w-full py-2 md:py-24 lg:py-32 xl:py-38 relative select-none flex flex-col gap-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center space-y-8"
      >
        <a href="https://github.com/vineetagarwal-code/upbot" target="_blank">
          <HoverBorderGradient
            containerClassName="rounded-full"
            className="group/anchor z-20 pl-10 first-letter: flex items-center justify-center gap-4 rounded-full text-white/80 bg-black/50 py-2 text-sm"
          >
            <GitHubLogoIcon className="h-4 w-4" />
            <div className="flex items-center justify-center text-xl">
              Star us on Github
            </div>
          </HoverBorderGradient>
        </a>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl mx-auto ">
            Wake Up Your Sleepy Servers!
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
            Because even servers need a good poke now and then. We&apos;ll keep
            your cold starts hot and your downtime down.
          </p>
        </motion.div>
        <motion.div
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Button className="w-full text-lg py-6 bg-white text-black hover:bg-gray-200 transition-colors group">
            <motion.div
              className="mr-2 h-5 w-5"
              initial={{ y: 0 }}
              whileHover={{ y: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Zap className="h-5 w-5 " />
            </motion.div>
            Start Pinging Your Servers
          </Button>
          <p className="text-sm text-center text-gray-300">
            No credit card required. Start keeping your servers awake in
            seconds.
          </p>
        </motion.div>
        <motion.div
          className="flex items-center justify-center space-x-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-white" />
            <span className="text-sm font-medium">Lightning Fast</span>
          </div>
          <div className="flex items-center space-x-2">
            <Coffee className="h-5 w-5 text-white" />
            <span className="text-sm font-medium">Always Awake</span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5 text-white" />
            <span className="text-sm font-medium">Easy Setup</span>
          </div>
        </motion.div>
      </motion.div>
      <div className="relative z-50 ">
        <motion.img
          {...{
            ...Scale,
            transition: { ...Scale.transition, delay: 0.35 },
          }}
          src="/images/landing-hero.jpeg"
          alt="Landing page background"
          width={1512}
          height={1405}
          draggable="false"
          className="z-40 md:mt-[-40px] w-full hidden sm:block h-full max-w-[70vw] mx-auto md:w-full select-none px-5 !rounded-2xl"
          style={{
            borderRadius: "20px",
          }}
        />
        <motion.div
          {...{
            ...Scale,
            transition: { ...Scale.transition, delay: 0.15 },
          }}
          className="absolute -z-10 left-0 top-[10%] h-32 w-[90%] hidden md:block overflow-x-hidden bg-[rgba(255,255,255,.5)] bg-opacity-100  blur-[337.4px]"
          style={{ transform: "rotate(-30deg)" }}
        />
      </div>
    </section>
  );
};
