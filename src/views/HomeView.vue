<template>
  <v-container class="mt-2">
    <!-- Übersetzung von “welcome” und “intro” -->
    <h2>{{ i18n.t('welcome') }}</h2>
    <p>{{ i18n.t('intro') }}</p>
  </v-container>

  <!-- Daten-Tabelle mit Filter -->
  <v-container fluid class="mt-6">
    <v-row no-gutters>
      <!-- Linke Spalte: Filter -->
      <v-col cols="12" md="3" class="pr-4">
        <h3 class="mb-4">{{ i18n.t('filter.title') }}</h3>

        <!-- Länder-Filter -->
        <v-autocomplete
          v-model="selectedCountries"
          :items="countryOptions"
          :label="i18n.t('filter.country')"
          multiple
          clearable
          variant="solo"
          hide-details="auto"
          class="filter-dropdown mb-4"
          close-menu-on-select="false"
          clear-search-on-select
          :menu-props="menuProps"
        >
          <template #prepend-item>
            <v-list-item @click="toggleAllCountries">
              <template #prepend>
                <v-checkbox
                  :model-value="likesAllCountries"
                  :indeterminate="likesSomeCountries && !likesAllCountries"
                />
              </template>
              <v-list-item-title>
                {{
                  likesAllCountries
                    ? i18n.t('filter.unselectAll')
                    : i18n.t('filter.selectAll')
                }}
              </v-list-item-title>
            </v-list-item>
            <v-divider class="mt-2" />
          </template>
        </v-autocomplete>

        <!-- Unternehmens-Filter -->
        <v-autocomplete
          v-model="selectedCompanies"
          :items="companyOptions"
          :label="i18n.t('filter.company')"
          multiple
          clearable
          variant="solo"
          hide-details="auto"
          class="filter-dropdown mb-4"
          close-menu-on-select="false"
          clear-search-on-select
          :menu-props="menuProps"
        >
          <template #prepend-item>
            <v-list-item @click="toggleAllCompanies">
              <template #prepend>
                <v-checkbox
                  :model-value="likesAllCompanies"
                  :indeterminate="likesSomeCompanies && !likesAllCompanies"
                />
              </template>
              <v-list-item-title>
                {{
                  likesAllCompanies
                    ? i18n.t('filter.unselectAll')
                    : i18n.t('filter.selectAll')
                }}
              </v-list-item-title>
            </v-list-item>
            <v-divider class="mt-2" />
          </template>
        </v-autocomplete>

        <!-- Emissionen-Filter -->
        <v-menu
          v-model="showEmissionFilter"
          :close-on-content-click="false"
          offset-y
          max-width="300"
          class="filter-dropdown mb-4"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              text
              block
              height="56"
              class="d-flex justify-space-between"
              append-icon="mdi-menu-down"
            >
              <span>{{ i18n.t('filter.emissions') }}</span>
              <template v-slot:append>
                <v-icon size="24" color="black"></v-icon>
              </template>
            </v-btn>
          </template>

          <v-card class="pa-4">
            <v-range-slider
              v-model="emissionRange"
              :min="minEmission"
              :max="maxEmission"
              step="1000"
              strict
              hide-details
            />
            <div class="text-center mt-2">
              {{ emissionRange[0] }} – {{ emissionRange[1] }} t/Jahr
            </div>
            <v-card-actions>
              <v-spacer />
              <v-btn text small @click="resetEmissionFilter">
                {{ i18n.t('filter.reset') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-col>

      <!-- Rechte Spalte: Tabelle -->
      <v-col cols="12" md="9">
        <v-data-table
          :headers="translatedHeaders"
          :items="computedRows"
          :items-per-page="perPage"
          class="fixed-table text-left"
        >
          <template #item.id="{ index }">
            {{ index + 1 }}
          </template>
          <template #no-data>
            <div class="text-center pa-4">
              {{ i18n.t('table.noData') }}
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

// Rohdaten
const rawRows = [
  { country: 'Deutschland', company: 'Auto AG', emissions: 1200000 },
  { country: 'USA', company: 'Energy Corp', emissions: 2500000 },
  { country: 'China', company: 'Steel Ltd.', emissions: 3900000 },
  { country: 'Frankreich', company: 'Wine Co.', emissions: 450000 },
  { country: 'Brasilien', company: 'Agro S.A.', emissions: 800000 },
  { country: 'Indien', company: 'Tech Solutions', emissions: 600000 },
  { country: 'Kanada', company: 'Maple Works', emissions: 200000 },
  { country: 'Deutschland', company: 'Mustermann GmbH', emissions: 40000 },
  { country: 'USA', company: 'Technology LLC', emissions: 1750000 },
  { country: 'China', company: 'Tech Ltd.', emissions: 3000000 },
  { country: 'Frankreich', company: 'Supplygood SE', emissions: 450000 },
  { country: 'Brasilien', company: 'Brasilian Trade SA', emissions: 7600000 },
  { country: 'Indien', company: 'Consulting Pvt. Ltd.', emissions: 120000 },
  { country: 'Kanada', company: 'Canadian Trade LLC', emissions: 2200000 },
]

// Filter-Optionen
const countryOptions = Array.from(new Set(rawRows.map((r) => r.country))).sort()
const companyOptions = Array.from(new Set(rawRows.map((r) => r.company))).sort()

// Emissionswerte
const emissionsValues = rawRows.map((r) => r.emissions)
const minEmission = Math.min(...emissionsValues)
const maxEmission = Math.max(...emissionsValues)

// Reaktive Filterzustände
const selectedCountries = ref<string[]>([])
const selectedCompanies = ref<string[]>([])
const emissionRange = ref<[number, number]>([minEmission, maxEmission])
const showEmissionFilter = ref(false)

// “Alle auswählen” Checkbox-Logik (Länder)
const likesAllCountries = computed(
  () => selectedCountries.value.length === countryOptions.length,
)
const likesSomeCountries = computed(
  () => selectedCountries.value.length > 0 && !likesAllCountries.value,
)
function toggleAllCountries() {
  selectedCountries.value = likesAllCountries.value ? [] : [...countryOptions]
}

// “Alle auswählen” Checkbox-Logik (Unternehmen)
const likesAllCompanies = computed(
  () => selectedCompanies.value.length === companyOptions.length,
)
const likesSomeCompanies = computed(
  () => selectedCompanies.value.length > 0 && !likesAllCompanies.value,
)
function toggleAllCompanies() {
  selectedCompanies.value = likesAllCompanies.value ? [] : [...companyOptions]
}

// Gefilterte Zeilen
const computedRows = computed(() =>
  rawRows.filter(
    (r) =>
      (selectedCountries.value.length === 0 ||
        selectedCountries.value.includes(r.country)) &&
      (selectedCompanies.value.length === 0 ||
        selectedCompanies.value.includes(r.company)) &&
      r.emissions >= emissionRange.value[0] &&
      r.emissions <= emissionRange.value[1],
  ),
)

// i18n im globalen Scope
const i18n = useI18n({ useScope: 'global' })

// Übersetzte Header-Spaltendefinition
const translatedHeaders = computed(() => [
  { title: '#', key: 'id', width: '20px', align: 'start', sortable: false },
  { title: i18n.t('table.country'), key: 'country' },
  { title: i18n.t('table.company'), key: 'company' },
  { title: i18n.t('table.emissions'), key: 'emissions', align: 'end' },
])

// Paginierung
const perPage = ref(10)

// Menü-Props
const menuProps = {
  offsetY: true,
  contentClass: 'my-select-menu',
  closeOnContentClick: false,
}

// Filter-Reset
function resetEmissionFilter() {
  emissionRange.value = [minEmission, maxEmission]
}
</script>

<style scoped>
.v-container {
  width: 100%;
}
.filter-dropdown {
  width: 100%;
}
.fixed-table {
  width: 100%;
}
.fixed-table table {
  table-layout: fixed;
}
.my-select-menu {
  max-height: 200px;
  overflow-y: auto;
}

/* Icon-Farbe-Override */
:deep(.v-field__append-inner .v-icon) {
  color: black !important;
  font-size: 24px !important;
}

:deep(.filter-dropdown .v-field__label),
:deep(.filter-dropdown .v-field-label) {
  font-size: 14.5px !important;
}

:deep(.filter-dropdown .v-field__label),
:deep(.filter-dropdown .v-field-label),
:deep(.filter-dropdown .v-field__append-inner > .v-icon),
:deep(.filter-dropdown .v-field__prepend-inner > .v-icon),
:deep(.filter-dropdown .v-field__clearable > .v-icon) {
  opacity: 1 !important;
}
</style>
