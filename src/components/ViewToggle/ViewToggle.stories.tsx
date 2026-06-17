import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ViewToggle } from './ViewToggle'

const meta = {
  title: 'Components/ViewToggle',
  component: ViewToggle,
  tags: ['autodocs'],
  args: {
    value: 'grid',
    onChange: () => {},
  },
} satisfies Meta<typeof ViewToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Grid: Story = {}

export const List: Story = {
  args: { value: 'list' },
}

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return <ViewToggle value={value} onChange={setValue} />
  },
}
