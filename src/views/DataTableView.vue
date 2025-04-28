<template>
  <v-container fluid class="mt-6">
    <v-row>
      <!-- Linke Spalte: Filter -->
      <v-col cols="12" md="3">
        <h3 class="mb-4">Filter</h3>

        <!-- Länder-Filter -->
        <v-select
            v-model="selectedCountries"
            :items="countryOptions"
            label="Land"
            multiple
            chips
            closable-chips
            clearable
            density="compact"
            class="mb-1"
            :menu-props="{
            offsetY:            true,
            contentClass:      'my-select-menu'
            }"
        >
            <template #prepend-item>
            <v-list-item @click="toggleAllCountries">
                <template #prepend>
                <v-checkbox
                    :model-value="likesAllCountries"
                    :indeterminate="likesSomeCountries && !likesAllCountries"
                    hide-details
                />
                </template>
                <v-list-item-title>
                {{ likesAllCountries ? 'Alle abwählen' : 'Alle auswählen' }}
                </v-list-item-title>
            </v-list-item>
            <v-divider class="mt-2" />
            </template>
        </v-select>

        <!-- Emissionen-Filter als v-menu -->
        <v-menu
          v-model="showEmissionFilter"
          persistent
          :close-on-content-click="false"
          offset-y
          max-width="300"
        >
          <template #activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
              class="d-flex justify-space-between w-100"
            >
              <span>Emissionen</span>
              <v-icon right>
                {{ showEmissionFilter ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </v-icon>
            </v-btn>
          </template>

          <v-card class="pa-4">
            <v-range-slider
              v-model="emissionRange"
              :min="minEmission"
              :max="maxEmission"
              step=100
              hide-details
              strict
            />
            <div class="text-center mt-2">
              {{ emissionRange[0] }} – {{ emissionRange[1] }} t/Jahr
            </div>
            <v-card-actions>
              <v-spacer />
              <v-btn text small @click="resetEmissionFilter">
                Zurücksetzen
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-col>

      <!-- Rechte Spalte: Tabelle -->
      <v-col cols="12" md="9">
        <vue-good-table
          :columns="columns"
          :rows="paginatedRows"
          :total-rows="computedRows.length"
          :pagination-options="{ enabled: true, perPage: perPage }"
          :search-options="{ enabled: false }"
          :sort-options="{ enabled: true }"
          @page-change="onPageChange"
          @per-page-change="onPerPageChange"
          class="good-table"
        >
          <template #table-row="{ row, column, index }">
            <span v-if="column.field === 'id'">
              {{ (currentPage - 1) * perPage + index + 1 }}
            </span>
            <span v-else>
              {{ row[column.field] }}
            </span>
          </template>
          <template #emptystate>
            <div class="text-center pa-4">Keine Daten gefunden.</div>
          </template>
        </vue-good-table>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue'
import { VueGoodTable } from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'

// Rohdaten
const rawRows = [
  { country: 'Deutschland', company: 'Auto AG',            emissions: 1200000 },
  { country: 'USA',         company: 'Energy Corp',        emissions: 2500000 },
  { country: 'China',       company: 'Steel Ltd.',         emissions: 3000000 },
  { country: 'Frankreich',  company: 'Wine Co.',           emissions:  450000 },
  { country: 'Brasilien',   company: 'Agro S.A.',          emissions:  800000 },
  { country: 'Indien',      company: 'Tech Solutions',     emissions:  600000 },
  { country: 'Kanada',      company: 'Maple Works',        emissions:  200000 },
  { country: 'Deutschland', company: 'Mustermann GmbH',    emissions:   40000 },
  { country: 'USA',         company: 'Technology LLC',     emissions: 1750000 },
  { country: 'China',       company: 'Tech Ltd.',          emissions: 3000000 },
  { country: 'Frankreich',  company: 'Supplygood SE',      emissions:  450000 },
  { country: 'Brasilien',   company: 'Brasilian Trade SA', emissions: 7600000 },
  { country: 'Indien',      company: 'Consulting Pvt. Ltd.', emissions: 120000 },
  { country: 'Kanada',      company: 'Canadian Trade LLC', emissions: 2200000 },
]

// Dynamische Länder-Liste
const countryOptions = Array.from(new Set(rawRows.map(r => r.country))).sort()

// Emissions-Min / -Max
const emissionsValues = rawRows.map(r => r.emissions)
const minEmission = Math.min(...emissionsValues)
const maxEmission = Math.max(...emissionsValues)

// Reaktive Filter-Zustände
const selectedCountries = ref<string[]>([])
const emissionRange    = ref<[number, number]>([minEmission, maxEmission])

// Computed fürs „Select All“
const likesAllCountries  = computed(() => selectedCountries.value.length === countryOptions.length)
const likesSomeCountries = computed(() => selectedCountries.value.length > 0 && selectedCountries.value.length < countryOptions.length)

// Funktion, die je nach Zustand alle Länder auswählt oder abwählt:
function toggleAllCountries() {
  if (likesAllCountries.value) {
    selectedCountries.value = []
  } else {
    selectedCountries.value = [...countryOptions]
  }
}

// Zustände für Dropdowns
const showCountryFilter  = ref(false)
const showEmissionFilter = ref(false)

// Toggle-Funktion für Länder-Filter
function toggleCountry(country: string) {
  const idx = selectedCountries.value.indexOf(country)
  if (idx >= 0) {
    selectedCountries.value.splice(idx, 1)
  } else {
    selectedCountries.value.push(country)
  }
}

// Gefilterte Rows (ohne ID)
const computedRows = computed(() =>
  rawRows.filter(r => {
    if (selectedCountries.value.length && !selectedCountries.value.includes(r.country))
      return false
    const [min, max] = emissionRange.value
    if (r.emissions < min || r.emissions > max) return false
    return true
  })
)

// Pagination-State & -Slice
const perPage     = ref(5)
const currentPage = ref(1)
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return computedRows.value.slice(start, start + perPage.value)
})

// Spaltendefinition
const columns = [
  { label: 'ID',                        field: 'id',        sortable: false },
  { label: 'Land',                      field: 'country',   sortable: true  },
  { label: 'Unternehmen',               field: 'company',   sortable: true  },
  { label: 'CO₂-Emissionen (t/Jahr)',   field: 'emissions', type: 'number', sortable: true, },
]

// Pagination-Handler
function onPageChange(params: { currentPage: number }) {
  currentPage.value = params.currentPage
}
function onPerPageChange(params: { currentPerPage: number }) {
  perPage.value     = params.currentPerPage
  currentPage.value = 1
}

// Emissions-Filter zurücksetzen
function resetEmissionFilter() {
  emissionRange.value = [minEmission, maxEmission]
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
.good-Table {
    max-width: 600 px
}
.my-select-menu {
    max-width: 300px !important;
    min-hegith: 200px !important;
    overflow-y: auto;
}
.pa-4 {
  padding: 16px;
}
.grey.lighten-3 {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>
