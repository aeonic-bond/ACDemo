import type { Meta, StoryObj } from '@storybook/react'
import { CaseWorkspace } from './CaseWorkspace'
import { transformCase } from '../../lib/transformCase'

const data = transformCase()

const meta = {
  title: 'Patterns/CaseWorkspace',
  component: CaseWorkspace,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ background: 'var(--color-grey-100)', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CaseWorkspace>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { data },
}
