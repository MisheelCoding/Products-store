<template>
  <div class="profile__addresses">
    <h2 class="profile__addresses-title mb-5">Адресса</h2>
    <div class="address mb-3" v-for="a in profile.addresses" :key="a._id">
      <!-- ?? Если режим редактирование  -->
      <Profile-Addresses-Form
        :address="localAddress"
        @save="saveAddress(a._id, $event)"
        @cancel="cancelAddress"
        mode="edit"
        v-if="editingId === a._id || (editingId === 'new' && a._id === '')"
      >
      </Profile-Addresses-Form>

      <!-- ??  режим обычный инлайн  -->
      <template v-else>
        <div class="flex justify-between">
          <div class="address__info flex flex-wrap">
            <span> {{ a.country }},</span>
            <span>{{ a.city }}</span
            >,
            <span>{{ a.addressLine }} | </span>
            <b>{{ a.phone }}</b>
            <span class="text-green-600 ml-3">
              {{ a.isDefault ? 'по умолчанию' : '' }}
            </span>
          </div>

          <div class="address__btns flex gap-2">
            <button
              class="btn address__btn--delete"
              title="Удалить"
              @click="profile.deleteAddress(a._id)"
            >
              <Icon
                icon="material-symbols-light:delete-outline-rounded"
                width="30px"
                height="30px"
                style="color: #000"
              />
            </button>
            <button
              class="btn address__btn--edit"
              title="Редактировать"
              type="button"
              @click="editAddress(a._id!)"
            >
              <Icon icon="iconamoon:edit-thin" width="30px" height="30px" style="color: #000" />
            </button>
          </div>
        </div>
      </template>
    </div>
    <ProfileAddressesForm
      v-if="editingId === 'new'"
      mode="new"
      @save="saveAddress('new', $event)"
      @cancel="cancelAddress"
      :address="localAddress"
    >
    </ProfileAddressesForm>
    <button class="btn mt-3 text-green-700" title="Новый адресс" type="button" @click="addAddress">
      + Новый адрес
    </button>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'
import type { Address } from '@/types/auth'
import { Icon } from '@iconify/vue'
import { onMounted, reactive, ref } from 'vue'

import ProfileAddressesForm from '@/components/profile/ProfileAddressesForm.vue'

const profile = useProfileStore()

// const props = withDefaults(
//   defineProps<{
//     addresses?: Address[]
//   }>(),
//   {
//     addresses: () => [],
//   },
// )
function emptyAddress(): Omit<Address, '_id'> {
  return {
    label: '',
    addressLine: '',
    city: '',
    country: '',
    phone: '',
    isDefault: false,
  }
}

const editingId = ref<string | null>(null)

const localAddress: Address = reactive({
  label: '',
  addressLine: '',
  city: '',
  country: '',
  phone: '',
  isDefault: false,
})

function editAddress(id: string) {
  const addr = profile.addresses.find((a) => a._id === id)
  if (addr) {
    Object.assign(localAddress, addr)
    editingId.value = id
  }
}
function cancelAddress() {
  editingId.value = null
  Object.assign(localAddress, emptyAddress())
}

function addAddress() {
  Object.assign(localAddress, emptyAddress())
  editingId.value = 'new'
}

async function saveAddress(id: string, data: Address) {
  try {
    if (id === 'new') {
      const { _id, ...cleandata } = data
      await profile.createAddress(cleandata)
    } else {
      await profile.updateAddress(id, data)
    }
    cancelAddress()
  } catch (e) {
    console.log('Ошибка при сохранении адреса')
    throw e
  }
}

onMounted(async () => {
  await profile.getAddresses()
})
</script>

<style scoped></style>
