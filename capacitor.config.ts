import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  // Must be unique in the App Store / Google Play. Change before publishing if you own a domain.
  appId: "com.theheartlab.app",
  appName: "The Heart Lab",
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
