import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NotificationSettings, NotificationTemplate } from '@/shared/types/notifications'

const defaultSettings: NotificationSettings = {
  enabled: false,
  vapid_public_key: '',
  vapid_private_key: '',
  default_icon: '/wp-content/plugins/swift-pwa/assets/icon-192x192.png',
  default_badge: '/wp-content/plugins/swift-pwa/assets/badge-72x72.png',
  show_on_focus: true,
  renotify: false,
  require_interaction: false,
  silent: false,
  vibrate: [200, 100, 200],
}

const defaultTemplates: NotificationTemplate[] = [
  {
    id: 'new-post',
    name: 'Новая запись',
    title: 'Новая запись в блоге',
    body: 'Опубликована новая интересная статья!',
    tag: 'new-post',
  },
  {
    id: 'comment-reply',
    name: 'Ответ на комментарий',
    title: 'Ответ на ваш комментарий',
    body: 'Кто-то ответил на ваш комментарий',
    tag: 'comment-reply',
    actions: [
      { action: 'view', title: 'Посмотреть' },
      { action: 'reply', title: 'Ответить' },
    ],
  },
]

export const useNotificationsStore = defineStore('notifications', () => {
  const settings = ref<NotificationSettings>({ ...defaultSettings })
  const templates = ref<NotificationTemplate[]>([...defaultTemplates])

  const isEnabled = computed(() => settings.value.enabled)
  const hasVapidKeys = computed(
    () => settings.value.vapid_public_key.length > 0 && settings.value.vapid_private_key.length > 0,
  )

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    settings.value = { ...settings.value, ...newSettings }
  }

  const updateTemplates = (newTemplates: NotificationTemplate[]) => {
    templates.value = newTemplates
  }

  const addTemplate = (template: Omit<NotificationTemplate, 'id'>) => {
    const newTemplate: NotificationTemplate = {
      ...template,
      id: Date.now().toString(),
    }
    templates.value.push(newTemplate)
  }

  const removeTemplate = (id: string) => {
    const index = templates.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      templates.value.splice(index, 1)
    }
  }

  const updateTemplate = (id: string, updates: Partial<NotificationTemplate>) => {
    const index = templates.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      templates.value[index] = { ...templates.value[index], ...updates }
    }
  }

  return {
    settings,
    templates,
    isEnabled,
    hasVapidKeys,
    updateSettings,
    updateTemplates,
    addTemplate,
    removeTemplate,
    updateTemplate,
  }
})
