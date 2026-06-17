import type { Meta, StoryObj } from '@storybook/react-vite'
import { RequestColumn } from './RequestColumn'
import { transformCase } from '../../lib/transformCase'

const { requests } = transformCase()

const narrow = [(Story: React.ComponentType) => (
  <div style={{ maxWidth: 400 }}>
    <Story />
  </div>
)]

const wide = [(Story: React.ComponentType) => (
  <div style={{ maxWidth: 900 }}>
    <Story />
  </div>
)]

const meta = {
  component: RequestColumn,
  args: {
    layout: 'card',
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RequestColumn>

export default meta
type Story = StoryObj<typeof meta>

export const AllRequests: Story = {
  decorators: narrow,
  args: {
    label: 'All Requests',
    requests,
  },
}

export const AllRequestsRow: Story = {
  decorators: wide,
  args: {
    label: 'All Requests',
    requests,
    layout: 'row',
  },
}

export const Internal: Story = {
  decorators: narrow,
  args: {
    label: 'Internal Action Required',
        requests: requests.filter(r => r.responsibility === 'internal'),
  },
}

export const External: Story = {
  decorators: narrow,
  args: {
    label: 'External Response Pending',
        requests: requests.filter(r => r.responsibility === 'external'),
  },
}

export const Terminal: Story = {
  decorators: narrow,
  args: {
    label: 'Received',
    requests: requests.filter(r => r.responsibility === 'terminal'),
  },
}
