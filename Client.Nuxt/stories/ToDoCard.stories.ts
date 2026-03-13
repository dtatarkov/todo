// stories/ToDoCard.stories.ts
import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import ToDoCard from '../app/components/ToDoCard.vue';
import { ToDo } from '#shared/entities/todo';

const meta: Meta<typeof ToDoCard> = {
  title: 'Components/ToDoCard',
  component: ToDoCard,
  argTypes: {
    todo: {
      control: 'object'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ToDoCard>;

export const Default: Story = {
  args: {
    todo: new ToDo({
      title: 'Задача 1',
      description: 'Описание задачи',
    })
  }
};

export const Planned: Story = {
  args: {
    todo: new ToDo({
      title: 'Задача 1',
      description: 'Описание задачи',
      completionDatePlanned: new Date('2023-12-01'),
      completionDateActual: undefined
    })
  }
};

export const Completed: Story = {
  args: {
    todo: new ToDo({
      title: 'Завершенная задача',
      description: 'Описание завершенной задачи',
      completionDatePlanned: new Date('2023-11-01'),
      completionDateActual: new Date('2023-11-05')
    })
  }
};