import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { GroupByBar } from './GroupByBar'

const GROUP_BY_OPTIONS = [
  { label: 'Responsibility', value: 'responsibility' },
  { label: 'Status', value: 'status' },
  { label: 'Assignee', value: 'assignee' },
  { label: 'Category', value: 'category' },
]

const meta = {
  title: 'Components/GroupByBar',
  component: GroupByBar,
  tags: ['autodocs'],
  args: {
    options: GROUP_BY_OPTIONS,
    value: 'responsibility',
    onChange: () => {},
  },
} satisfies Meta<typeof GroupByBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('responsibility')
    return <GroupByBar {...args} value={value} onChange={setValue} />
  },
}
