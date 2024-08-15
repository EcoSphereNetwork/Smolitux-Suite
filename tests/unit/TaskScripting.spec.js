import { shallowMount } from '@vue/test-utils';
import TaskScripting from '@/components/TaskScripting/TaskScripting.vue';

describe('TaskScripting.vue Unit Test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TaskScripting, {
      propsData: {
        aiTools: [
          { name: 'Tool 1', execute: jest.fn((input) => `Tool 1 processed ${input}`) },
          { name: 'Tool 2', execute: jest.fn((input) => `Tool 2 processed ${input}`) }
        ]
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.toolbox').exists()).toBe(true);
    expect(wrapper.find('.canvas').exists()).toBe(true);
  });

  it('adds a task to the tasks array when addTask is called', async () => {
    wrapper.vm.addTask(wrapper.vm.aiTools[0]);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.tasks).toHaveLength(1);
    expect(wrapper.vm.tasks[0].name).toBe('Tool 1');
  });

  it('removes a task from the tasks array when removeTask is called', async () => {
    wrapper.vm.addTask(wrapper.vm.aiTools[0]);
    wrapper.vm.removeTask(0);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.tasks).toHaveLength(0);
  });

  it('runs tasks in sequence and returns the correct output', async () => {
    wrapper.vm.addTask(wrapper.vm.aiTools[0]);
    wrapper.vm.addTask(wrapper.vm.aiTools[1]);
    await wrapper.vm.$nextTick();

    const result = wrapper.vm.runTasks('initial input');

    expect(result).toBe('Tool 2 processed Tool 1 processed initial input');
  });

  it('emits an event when a task is added', async () => {
    wrapper.vm.addTask(wrapper.vm.aiTools[0]);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().addTask).toBeTruthy();
    expect(wrapper.emitted().addTask[0]).toEqual([wrapper.vm.aiTools[0]]);
  });

  it('emits an event when a task is removed', async () => {
    wrapper.vm.addTask(wrapper.vm.aiTools[0]);
    wrapper.vm.removeTask(0);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().removeTask).toBeTruthy();
    expect(wrapper.emitted().removeTask[0]).toEqual([0]);
  });
});
