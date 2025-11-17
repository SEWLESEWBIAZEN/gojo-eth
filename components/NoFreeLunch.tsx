import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Coffee, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function NoFreeLunch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center w-full p-6"
    >
      <Card className="max-w-md w-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl rounded-2xl p-1">
        <CardContent className="p-6 space-y-4 bg-black/20 backdrop-blur-xl rounded-xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <h2 className="font-bold text-xl">Developer Reality Check</h2>
          </div>

          <p className="text-base leading-relaxed">
            "The developer has no free lunch." 🍽️
          </p>

          <p className="text-sm opacity-90">
            If something *looks* easy, it probably took your developer 47 tabs, 3 cups
            of coffee <Coffee className="inline w-4 h-4" /> and a mild existential crisis
            to make it look that way.
          </p>

          <div className="flex items-center gap-2 text-yellow-300 font-medium">
            <AlertTriangle className="w-5 h-5" />
            <span>Be kind. They debug for a living.</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
