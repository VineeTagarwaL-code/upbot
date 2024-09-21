import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Zap } from "lucide-react";
import { motion } from "framer-motion";
export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative select-none">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-black/50" />{" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center space-y-8"
      >
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl mx-auto">
            Wake Up Your Sleepy Servers!
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
            UpBot: Because even servers need a good poke now and then.
            We&apos;ll keep your cold starts hot and your downtime down.
          </p>
        </motion.div>
        <motion.div
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Button
            className="w-full text-lg py-6 bg-white text-black hover:bg-gray-200 transition-colors group"
            onClick={() => {}}
          >
            <motion.div
              className="mr-2 h-5 w-5"
              initial={{ y: 0 }}
              whileHover={{ y: 5 }}
              transition={{ type: "spring", stiffness: 300 }} // Spring-like animation
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
    </section>
  );
};
