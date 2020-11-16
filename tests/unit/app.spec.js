import { shallowMount } from '@vue/test-utils'
import Guest from '@/components/Guest.vue'

describe('Guest.vue', () => {
  it('renders props.name when passed', () => {
    const name = 'Jamie'
    const nightsStaying = [1,2]
    const totalOwed = 200
    const tripNights = 3
    const wrapper = shallowMount(Guest, {
      propsData: { name, totalOwed, tripNights, nightsStaying }
    })
    expect(wrapper.text()).toMatch(name)
  })


})
