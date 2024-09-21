import { ArrowRight, Coffee, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 md:px-6"
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">
          How UpBot Works
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-[700px] mx-auto">
          We keep your servers awake, so you can sleep soundly.
        </p>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="mb-4 p-2 bg-white/10 rounded-full">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Set Your Intervals</h3>
            <p className="text-gray-400">
              Choose how often you want us to ping your server. Every minute?
              Every hour? We&apos;re flexible!
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="mb-4 p-2 bg-white/10 rounded-full">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">We Keep &apos;Em Awake</h3>
            <p className="text-gray-400">
              Our bots will gently nudge your servers to keep them from dozing
              off. No coffee required!
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="mb-4 p-2 bg-white/10 rounded-full">
              <ArrowRight className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">You Stay Productive</h3>
            <p className="text-gray-400">
              Focus on building great things while we handle the tedious task of
              server-poking. Win-win!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
