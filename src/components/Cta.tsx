import FlickeringGrid from "./ui/flickering-grid";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";
export function FlickeringGridList() {
  return (
    <div className="relative h-[300px] my-12 flex justify-center items-center rounded-lg w-full bg-background overflow-hidden border-none max-w-6xl mx-auto ">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full w-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={1300}
      />
      <Button
        className="w-fit text-lg py-6 bg-white text-black hover:bg-gray-200 transition-colors group z-[9999999] "
        onClick={() => {
          window.location.href = "/getstarted";
        }}
      >
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
    </div>
  );
}
