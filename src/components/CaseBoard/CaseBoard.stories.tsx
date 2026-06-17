import type { Meta, StoryObj } from '@storybook/react-vite'
import { CaseBoard } from './CaseBoard'
import { transformCase } from '../../lib/transformCase'

const { requests } = transformCase()

const meta = {
  component: CaseBoard,
  args: {
    layout: 'card',
    groupBy: 'responsibility',
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'platform' },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ minHeight: '100vh', background: 'var(--color-grey-100)', padding: 24 }}>
        <div style={{ background: 'var(--color-white)', borderRadius: 8, padding: 24 }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof CaseBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { requests },
}

export const RowLayout: Story = {
  args: {
    requests,
    layout: 'row',
  },
}
