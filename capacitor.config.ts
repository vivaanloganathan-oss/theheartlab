import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  // Reverse of the youngheartz.com domain; must stay unique in the App Store and Google Play.
  appId: "com.youngheartz.app",
  appName: "YoungHeartz",
  webDir: "out",
  backgroundColor: "#071426",
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: "#071426",
      showSpinner: false,
    },
    SystemBars: {
      insetsHandling: "css",
      initialViewportFitValueHint: "cover",
    },
  },
};

export default config;
