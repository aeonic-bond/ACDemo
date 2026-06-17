import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FilterChip } from './FilterChip'

const meta = {
  title: 'Primitives/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  args: {
    label: 'Responsibility',
    active: false,
  },
} satisfies Meta<typeof FilterChip>

export default meta
type Story = StoryObj<typeof meta>

export const Inactive: Story = {}

export const Active: Story = {
  args: { active: true },
}

export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState(false)
    return <FilterChip {...args} active={active} onClick={() => setActive(a => !a)} />
  },
}
