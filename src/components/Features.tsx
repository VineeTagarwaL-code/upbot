import {
  Zap,
  Search,
  MessageCircle,
  Layout,
  Bookmark,
  Pen,
  Bell,
  Clock,
  Shield,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "One-step Setup",
      description:
        "Just add one URL, and you’re all set. No complex configurations, just quick and easy setup.",
    },
    {
      icon: Bell,
      title: "Flexible Notifications",
      description:
        "Get notified via Gmail or Discord – your choice. Add a Discord webhook link for Discord notifications, or we'll notify you via Gmail automatically.",
    },
    {
      icon: Bell,
      title: "Automatic Health Checks",
      description:
        "We ping your server or app every 10 minutes to ensure it’s up and running with a 200 OK response.",
    },
    {
      icon: Shield,
      title: "Reliability Monitoring",
      description:
        "Stay confident in your app’s uptime with real-time alerts and monitoring for maximum reliability.",
    },
  ];

  return (
    <div className=" p-6 md:p-12">
      {" "}
      <p className="text-3xl lg:text-5xl text-white font-semibold capitalize mb-10 ">
        What we offer
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
          >
            <div className="relative z-10">
              <div className="mb-4 inline-block rounded-full bg-purple-500/20 p-3">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
