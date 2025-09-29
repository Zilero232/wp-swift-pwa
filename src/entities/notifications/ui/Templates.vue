<template>
  <div class="notification-templates">
    <div class="templates-header">
      <h4>Шаблоны уведомлений</h4>
      <Button
        label="Добавить шаблон"
        icon="pi pi-plus"
        size="small"
        @click="showAddDialog = true"
      />
    </div>

    <div class="templates-list">
      <div v-for="template in templates" :key="template.id" class="template-item">
        <div class="template-content">
          <div class="template-header">
            <h5>{{ template.name }}</h5>
            <div class="template-actions">
              <Button icon="pi pi-pencil" text size="small" @click="editTemplate(template)" />
              <Button
                icon="pi pi-trash"
                text
                size="small"
                severity="danger"
                @click="removeTemplate(template.id)"
              />
            </div>
          </div>
          <div class="template-preview">
            <strong>{{ template.title }}</strong>
            <p>{{ template.body }}</p>
            <div v-if="template.actions?.length" class="template-actions-preview">
              <Tag
                v-for="action in template.actions"
                :key="action.action"
                :value="action.title"
                severity="info"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog для добавления/редактирования шаблона -->
    <Dialog
      v-model:visible="showAddDialog"
      :header="editingTemplate ? 'Редактировать шаблон' : 'Добавить шаблон'"
      modal
      class="template-dialog"
    >
      <div class="template-form">
        <FormField label="Название шаблона">
          <InputText
            v-model="formData.name"
            placeholder="Название для внутреннего использования"
            class="w-full"
          />
        </FormField>

        <FormField label="Заголовок уведомления">
          <InputText v-model="formData.title" placeholder="Заголовок уведомления" class="w-full" />
        </FormField>

        <FormField label="Текст уведомления">
          <Textarea
            v-model="formData.body"
            placeholder="Основной текст уведомления"
            rows="3"
            class="w-full"
          />
        </FormField>

        <div class="form-row">
          <FormField label="Тег уведомления">
            <InputText v-model="formData.tag" placeholder="unique-tag" class="w-full" />
          </FormField>

          <FormField label="Иконка (URL)">
            <InputText v-model="formData.icon" placeholder="/path/to/icon.png" class="w-full" />
          </FormField>
        </div>

        <FormField label="Действия">
          <div class="actions-list">
            <div v-for="(action, index) in formData.actions" :key="index" class="action-item">
              <InputText v-model="action.action" placeholder="action-id" class="action-input" />
              <InputText v-model="action.title" placeholder="Текст кнопки" class="action-input" />
              <Button
                icon="pi pi-trash"
                text
                size="small"
                severity="danger"
                @click="removeAction(index)"
              />
            </div>
            <Button
              label="Добавить действие"
              icon="pi pi-plus"
              text
              size="small"
              @click="addAction"
            />
          </div>
        </FormField>
      </div>

      <template #footer>
        <Button label="Отмена" text @click="closeDialog" />
        <Button
          :label="editingTemplate ? 'Сохранить' : 'Добавить'"
          @click="saveTemplate"
          :disabled="!formData.name || !formData.title || !formData.body"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Tag from 'primevue/tag'
import FormField from '@/shared/ui/FormField.vue'
import type { NotificationTemplate, NotificationAction } from '@/shared/types/notifications'

interface Props {
  templates: NotificationTemplate[]
}

interface Emits {
  (e: 'update:templates', templates: NotificationTemplate[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showAddDialog = ref(false)
const editingTemplate = ref<NotificationTemplate | null>(null)

const formData = reactive({
  name: '',
  title: '',
  body: '',
  tag: '',
  icon: '',
  actions: [] as NotificationAction[],
})

const editTemplate = (template: NotificationTemplate) => {
  editingTemplate.value = template
  formData.name = template.name
  formData.title = template.title
  formData.body = template.body
  formData.tag = template.tag || ''
  formData.icon = template.icon || ''
  formData.actions = template.actions ? [...template.actions] : []
  showAddDialog.value = true
}

const removeTemplate = (id: string) => {
  const updatedTemplates = props.templates.filter((t) => t.id !== id)
  emit('update:templates', updatedTemplates)
}

const addAction = () => {
  formData.actions.push({ action: '', title: '' })
}

const removeAction = (index: number) => {
  formData.actions.splice(index, 1)
}

const saveTemplate = () => {
  const templateData: Omit<NotificationTemplate, 'id'> = {
    name: formData.name,
    title: formData.title,
    body: formData.body,
    tag: formData.tag || undefined,
    icon: formData.icon || undefined,
    actions: formData.actions.filter((a) => a.action && a.title),
  }

  let updatedTemplates
  if (editingTemplate.value) {
    updatedTemplates = props.templates.map((t) =>
      t.id === editingTemplate.value!.id ? { ...templateData, id: t.id } : t,
    )
  } else {
    const newTemplate: NotificationTemplate = {
      ...templateData,
      id: Date.now().toString(),
    }
    updatedTemplates = [...props.templates, newTemplate]
  }

  emit('update:templates', updatedTemplates)
  closeDialog()
}

const closeDialog = () => {
  showAddDialog.value = false
  editingTemplate.value = null
  Object.assign(formData, {
    name: '',
    title: '',
    body: '',
    tag: '',
    icon: '',
    actions: [],
  })
}
</script>

<style scoped>
.notification-templates {
  padding: 1.5rem;
}

.templates-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.templates-header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
}

.templates-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.template-item {
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  padding: 1rem;
  background: var(--surface-ground);
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.template-header h5 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
}

.template-actions {
  display: flex;
  gap: 0.25rem;
}

.template-preview strong {
  font-size: 0.875rem;
  color: var(--text-color);
}

.template-preview p {
  margin: 0.25rem 0;
  font-size: 0.8rem;
  color: var(--text-color-secondary);
}

.template-actions-preview {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.template-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 500px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-input {
  flex: 1;
}

@media (max-width: 768px) {
  .template-form {
    min-width: auto;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .templates-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}
</style>
