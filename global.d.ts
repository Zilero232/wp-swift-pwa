declare global {
  interface SwiftPwaSettings {
    apiUrl: string;
    nonce: string;
    version: string;
  }

  interface Window {
    swiftPwaSettings: SwiftPwaSettings;
  }
}

export {};
