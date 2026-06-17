import type { Meta, StoryObj } from '@storybook/react-vite'
import { RequestCard } from './RequestCard'
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
  component: RequestCard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RequestCard>

export default meta
type Story = StoryObj<typeof meta>

export const NeedsAction: Story = {
  decorators: narrow,
  args: { request: requests.find(r => r.status === 'needs_action')! },
}

export const InProgress: Story = {
  decorators: narrow,
  args: { request: requests.find(r => r.status === 'in_progress')! },
}

export const Requested: Story = {
  decorators: narrow,
  args: { request: requests.find(r => r.status === 'requested')! },
}

export const PartiallyReceived: Story = {
  decorators: narrow,
  args: { request: requests.find(r => r.status === 'partially_received')! },
}

export const Received: Story = {
  decorators: narrow,
  args: { request: requests.find(r => r.status === 'received')! },
}

export const Rejected: Story = {
  decorators: narrow,
  args: { request: requests.find(r => r.status === 'rejected')! },
}

export const OnHold: Story = {
  decorators: narrow,
  args: { request: requests.find(r => r.status === 'on_hold')! },
}

export const Draft: Story = {
  decorators: narrow,
  args: { request: requests.find(r => r.status === 'draft')! },
}

export const Canceled: Story = {
  decorators: narrow,
  args: { request: requests.find(r => r.status === 'canceled')! },
}

export const AllStates: Story = {
  decorators: narrow,
  args: { request: requests[0] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {requests.map(r => (
        <RequestCard key={r.id} request={r} />
      ))}
    </div>
  ),
}

export const RowLayout: Story = {
  decorators: wide,
  args: { request: requests[0] },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {requests.map(r => (
        <RequestCard key={r.id} request={r} layout="row" />
      ))}
    </div>
  ),
}
