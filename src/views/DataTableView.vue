<template>
  <v-container fluid class="mt-6">
    <v-row no-gutters>
      <!-- Linke Spalte: Filter (25 % ab md) -->
      <v-col cols="12" md="3" class="pr-4">
      <h3 class="mb-4">Filter</h3>

        <!-- Länder-Filter -->
        <v-select
          v-model="selectedCountries"
          :items="countryOptions"
          label="Land"
          multiple
          clearable
          density="compact"
          class="filter-dropdown mb-4"
          :menu-props="menuProps"
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

<!-- Emissionen-Filter -->
        <v-menu
          v-model="showEmissionFilter"
          persistent
          :close-on-content-click="false"
          offset-y
          max-width="100%"
          class="filter-dropdown mb-4"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              text
              block
              class="d-flex justify-space-between align-center"
              append-icon="mdi-menu-down"
            >
              Emissionen
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
                    Zurücksetzen
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
      </v-col>

      <!-- Rechte Spalte: Tabelle -->
      <v-col cols="12" md="9">
        <v-data-table
          :headers="headers"
          :items="computedRows"
          :items-per-page="perPage"
          class="fixed-table text-left"
        >
          <template #item.id="{ index }">
            {{ index + 1 }}
          </template>
          <template #no-data>
            <div class="text-center pa-4">Keine Daten gefunden.</div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

// Rohdaten
const rawRows = [
  { country: 'Deutschland', company: 'Auto AG', emissions: 1200000 },
  { country: 'USA', company: 'Energy Corp', emissions: 2500000 },
  { country: 'China', company: 'Steel Ltd.', emissions: 3000000 },
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

const countryOptions = Array.from(new Set(rawRows.map(r => r.country))).sort()
const emissionsValues = rawRows.map(r => r.emissions)
const minEmission = Math.min(...emissionsValues)
const maxEmission = Math.max(...emissionsValues)

const selectedCountries = ref<string[]>([])
const emissionRange = ref<[number, number]>([minEmission, maxEmission])
const showEmissionFilter = ref(false)

const likesAllCountries = computed(() => selectedCountries.value.length === countryOptions.length)
const likesSomeCountries = computed(() => selectedCountries.value.length > 0 && !likesAllCountries.value)

function toggleAllCountries() {
  selectedCountries.value = likesAllCountries.value ? [] : [...countryOptions]
}

const computedRows = computed(() =>
  rawRows.filter(r =>
    (selectedCountries.value.length === 0 || selectedCountries.value.includes(r.country)) &&
    r.emissions >= emissionRange.value[0] && r.emissions <= emissionRange.value[1]
  )
)

const headers = ref([
  { title: 'ID', key: 'id', width: '20px', align: 'start' },
  { title: 'Land', key: 'country', width: '150px' },
  { title: 'Unternehmen', key: 'company', width: '200px', align: 'start' },
  { title: 'CO₂-Emissionen (t/Jahr)', key: 'emissions', width: '150px', align: 'start' },
])

const perPage = 5

// — Dropdown-Props
const menuProps = { offsetY: true, contentClass: 'my-select-menu' }

</script>

<style scoped>

/* Container-Breite auf 100 % */
.v-container {
  width: 100%;
}

/* Filter-Dropdowns füllen ihre Spalte */
.filter-dropdown {
  width: 100%;
}

/* Data-Table: Table-Layout fixed, füllt Spalte */
.fixed-table {
  width: 100%;
}
.fixed-table table {
  table-layout: fixed;
}

/* Begrenzung nur im Dropdown-Menü */
.my-select-menu {
  max-height: 200px;
  overflow-y: auto;
}
</style>
