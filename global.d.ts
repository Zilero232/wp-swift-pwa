// Get settings from WordPress
declare global {
  interface Window {
    swiftPwaSettings: {
      apiUrl: string;
      nonce: string;
    };
  }
}

export {};
