export interface DeviceConfig {
  label: string
  value: string
  width: number
  height: number
  userAgent: string
  pixelRatio: number
}

export interface LighthouseResult {
  score: number
  title: string
  description: string
  status: 'pass' | 'fail' | 'warning'
}

export interface LighthouseReport {
  performance: LighthouseResult
  accessibility: LighthouseResult
  bestPractices: LighthouseResult
  seo: LighthouseResult
  pwa: LighthouseResult
  categories: {
    [key: string]: {
      score: number
      title: string
    }
  }
}

export interface InstallationTestResult {
  canInstall: boolean
  manifestValid: boolean
  serviceWorkerRegistered: boolean
  httpsEnabled: boolean
  issues: string[]
  warnings: string[]
}

export interface BrowserFeature {
  feature: string
  supported: boolean
  notes?: string
}

export interface BrowserSupport {
  browser: string
  version: string
  features: BrowserFeature[]
}
