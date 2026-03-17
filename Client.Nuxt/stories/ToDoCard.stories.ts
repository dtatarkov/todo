import type { Meta, StoryObj } from '@storybook-vue/nuxt';
import ToDoCard from '../app/components/ToDoCard.vue';
import { ToDoViewModel, type ToDoViewModelData } from "#shared/interfaces/todoViewModel";
import { fn } from "storybook/test";

function getToDoViewModelData(data: Partial<ToDoViewModelData>) {
  return {
    id                   : '',
    title                : '',
    description          : '',
    completionDatePlanned: '',
    completionDateActual : '',
    
    ...data
  }
}

const meta: Meta<typeof ToDoCard> = {
  title    : 'Components/ToDoCard',
  component: ToDoCard,
  argTypes : {
    todoId: {
      control: 'text'
    }
  },

  beforeEach: () =>
  {
    useServiceLocator();

    registerServiceFactory(ToDoViewModel, () =>
    {
      let todoId = '';

      return ({
        setToDoId: (newTodoId: string) =>
        {
          todoId = newTodoId;
        },

        handleEditButtonClick: fn(),

        init     : fn(),
        destroy  : fn(),
        subscribe: fn(),

        getData: (): ToDoViewModelData =>
        {
          switch (todoId)
          {
            case 'planned':
              return getToDoViewModelData({
                title                : 'Запланированная задача',
                description          : 'Описание задачи',
                completionDatePlanned: '01.12.2023, 15:31'
              })
            case 'completed':
              return getToDoViewModelData({
                title                : 'Завершенная задача',
                description          : 'Описание завершенной задачи',
                completionDatePlanned: '01.11.2023, 12:17',
                completionDateActual : '05.11.2023, 09:03'
              });

            default:
              return getToDoViewModelData({
                title      : 'Задача 1',
                description: 'Описание задачи',
              });
          }
        }
      }) satisfies Partial<ToDoViewModel>;
    });
  }
}

export default meta;
type Story = StoryObj<typeof ToDoCard>;

export const Default: Story = {
  args: {
    todoId: 'default'
  }
};

export const Planned: Story = {
  args: {
    todoId: 'planned'
  }
};

export const Completed: Story = {
  args: {
    todoId: 'completed'
  }
};