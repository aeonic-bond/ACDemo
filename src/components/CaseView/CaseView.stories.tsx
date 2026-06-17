import type { Meta, StoryObj } from '@storybook/react'
import { CaseView } from './CaseView'
import { transformCase } from '../../lib/transformCase'

const data = transformCase()

const meta = {
  title: 'Patterns/CaseView',
  component: CaseView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '16px', background: 'var(--color-grey-200)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CaseView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { data },
}
