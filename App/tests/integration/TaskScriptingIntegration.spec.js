import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import TaskScripting from '@/components/TaskScripting/TaskScripting.vue';
import AIToolInterface from '@/plugins/AIToolInterface';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TaskScripting.vue Integration Test', () => {
  let store;
  let actions;
  let state;

  beforeEach(() => {
    state = {
      aiTools: [
        new AIToolInterface('Tool 1', {}, (input) => `Tool 1 processed ${input}`),
        new AIToolInterface('Tool 2', {}, (input) => `Tool 2 processed ${input}`)
      ],
      tasks: []
    };

    actions = {
      addTask: jest.fn(),
      removeTask: jest.fn(),
      saveWorkflow: jest.fn(),
      loadWorkflows: jest.fn(),
      clearWorkflows: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        tasks: {
          namespaced: true,
          state,
          actions
        },
        workflows: {
          namespaced: true,
          actions
        }
      }
    });
  });

  it('adds a task to the tasks list when a tool is dropped onto the canvas', async () => {
    const wrapper = shallowMount(TaskScripting, { store, localVue });

    // Simulate adding a task
    wrapper.vm.addTask(state.aiTools[0].getMetadata());
    await wrapper.vm.$nextTick();

    expect(actions.addTask).toHaveBeenCalled();
    expect(wrapper.vm.tasks).toHaveLength(1);
    expect(wrapper.vm.tasks[0].getMetadata().name).toBe('Tool 1');
  });

  it('removes a task from the tasks list when removeTask is called', async () => {
    const wrapper = shallowMount(TaskScripting, { store, localVue });

    // Simulate adding and then removing a task
    wrapper.vm.addTask(state.aiTools[0].getMetadata());
    wrapper.vm.removeTask(0);
    await wrapper.vm.$nextTick();

    expect(actions.removeTask).toHaveBeenCalled();
    expect(wrapper.vm.tasks).toHaveLength(0);
  });

  it('saves a workflow correctly', async () => {
    const wrapper = shallowMount(TaskScripting, { store, localVue });

    // Simulate saving a workflow
    wrapper.vm.addTask(state.aiTools[0].getMetadata());
    wrapper.vm.saveWorkflow();
    await wrapper.vm.$nextTick();

    expect(actions.saveWorkflow).toHaveBeenCalled();
    expect(actions.saveWorkflow.mock.calls[0][1].name).toBeDefined();
  });

  it('loads workflows on component creation', async () => {
    shallowMount(TaskScripting, { store, localVue });
    expect(actions.loadWorkflows).toHaveBeenCalled();
  });

  it('clears workflows correctly', async () => {
    const wrapper = shallowMount(TaskScripting, { store, localVue });

    // Simulate clearing workflows
    wrapper.vm.clearWorkflows();
    await wrapper.vm.$nextTick();

    expect(actions.clearWorkflows).toHaveBeenCalled();
  });
});
