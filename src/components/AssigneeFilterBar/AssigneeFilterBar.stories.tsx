import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AssigneeFilterBar } from './AssigneeFilterBar'

const ASSIGNEES = [
  { name: 'Jordan R.', count: 15 },
  { name: 'Priya S.', count: 3 },
]

const meta = {
  title: 'Components/AssigneeFilterBar',
  component: AssigneeFilterBar,
  tags: ['autodocs'],
  args: {
    assignees: ASSIGNEES,
    value: null,
    onChange: () => {},
    lead: 'Jordan Reyes',
  },
} satisfies Meta<typeof AssigneeFilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = {
  args: { value: 'Jordan R.' },
}

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null)
    return <AssigneeFilterBar {...args} value={value} onChange={setValue} />
  },
}
