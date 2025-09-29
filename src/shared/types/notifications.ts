export interface NotificationSettings {
  enabled: boolean
  vapid_public_key: string
  vapid_private_key: string
  default_icon: string
  default_badge: string
  show_on_focus: boolean
  renotify: boolean
  require_interaction: boolean
  silent: boolean
  vibrate: number[]
}

export interface NotificationTemplate {
  id: string
  name: string
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  actions?: NotificationAction[]
}

export interface NotificationAction {
  action: string
  title: string
  icon?: string
}

export interface TestNotification {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  actions?: NotificationAction[]
  vibrate?: number[]
  silent?: boolean
  requireInteraction?: boolean
}
