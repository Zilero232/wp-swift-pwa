<script setup lang="ts">
import { toValue } from "vue";

import { useManifestQuery } from "@/entities/manifest/model/useManifestQuery";
import AdvancedSettings from "@/entities/manifest/ui/AdvancedSettings.vue";
import BasicInfoSettings from "@/entities/manifest/ui/BasicInfoSettings.vue";
import CategoriesSettings from "@/entities/manifest/ui/CategoriesSettings.vue";
import DisplaySettings from "@/entities/manifest/ui/DisplaySettings.vue";
import IconsSettings from "@/entities/manifest/ui/IconsSettings.vue";
import RelatedAppsSettings from "@/entities/manifest/ui/RelatedAppsSettings.vue";
import ScreenshotsSettings from "@/entities/manifest/ui/ScreenshotsSettings.vue";
import ShortcutsSettings from "@/entities/manifest/ui/ShortcutsSettings.vue";
import CardSection from "@/shared/ui/CardSection.vue";
import LoadingSpinner from "@/shared/ui/LoadingSpinner.vue";
import PageHeader from "@/shared/ui/PageHeader.vue";

const { queryManifest } = useManifestQuery();
</script>

<template>
  <div class="tw:p-4 sm:tw:p-8">
    <PageHeader title="Manifest settings" description="Configuration of web application manifest" />

    <LoadingSpinner v-if="toValue(queryManifest.isPending)" />

    <div v-else class="tw:flex tw:flex-col tw:gap-8">
      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Basic information" icon="pi pi-info-circle">
          <BasicInfoSettings />
        </CardSection>

        <CardSection title="Display" icon="pi pi-desktop">
          <DisplaySettings />
        </CardSection>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Additional settings" icon="pi pi-cog">
          <AdvancedSettings />
        </CardSection>

        <CardSection title="Categories" icon="pi pi-tags">
          <CategoriesSettings />
        </CardSection>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Application shortcuts" icon="pi pi-bolt">
          <ShortcutsSettings />
        </CardSection>

        <CardSection title="Related applications" icon="pi pi-mobile">
          <RelatedAppsSettings />
        </CardSection>
      </div>

      <div class="tw:grid tw:grid-cols-1 tw:xl:grid-cols-2 tw:gap-8">
        <CardSection title="Application icons" icon="pi pi-image">
          <IconsSettings />
        </CardSection>

        <CardSection title="Application screenshots" icon="pi pi-camera">
          <ScreenshotsSettings />
        </CardSection>
      </div>
    </div>
  </div>
</template>
