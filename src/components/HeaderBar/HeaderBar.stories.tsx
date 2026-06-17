import type { Meta, StoryObj } from '@storybook/react'
import { HeaderBar } from './HeaderBar'
import { transformCase } from '../../lib/transformCase'

const { case: caseData } = transformCase()

const meta = {
  title: 'Patterns/HeaderBar',
  component: HeaderBar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HeaderBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { case: caseData },
}
