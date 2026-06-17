import type { Meta, StoryObj } from '@storybook/react'
import { AssigneeChip } from './AssigneeChip'

const meta = {
  title: 'Primitives/AssigneeChip',
  component: AssigneeChip,
  tags: ['autodocs'],
  args: {
    name: 'Jordan R.',
    count: 15,
    active: false,
    onClick: () => {},
  },
} satisfies Meta<typeof AssigneeChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Active: Story = {
  args: { active: true },
}

export const LowCount: Story = {
  args: { name: 'Priya S.', count: 3 },
}
