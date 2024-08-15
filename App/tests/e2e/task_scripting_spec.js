/// <reference types="cypress" />

describe('Task Scripting', () => {
    beforeEach(() => {
      // Visit the home page before each test
      cy.visit('/');
    });
  
    it('should navigate to Task Scripting view', () => {
      // Click on the Task Scripting button
      cy.contains('Task Scripting').click();
  
      // Verify that the Task Scripting view is displayed
      cy.url().should('include', '/task-scripting');
      cy.contains('Drop Tools Here to Create a Task').should('be.visible');
    });
  
    it('should add a task to the canvas', () => {
      // Navigate to Task Scripting view
      cy.contains('Task Scripting').click();
  
      // Drag and drop a tool onto the canvas
      cy.get('.toolbox li').first().trigger('dragstart');
      cy.get('.canvas').trigger('drop');
  
      // Verify that the task appears on the canvas
      cy.get('.task').should('have.length', 1);
      cy.get('.task').first().should('contain.text', 'AI Tool Name'); // Replace with actual tool name
    });
  
    it('should remove a task from the canvas', () => {
      // Navigate to Task Scripting view and add a task
      cy.contains('Task Scripting').click();
      cy.get('.toolbox li').first().trigger('dragstart');
      cy.get('.canvas').trigger('drop');
  
      // Remove the task
      cy.get('.task button').first().click();
  
      // Verify that the task is removed from the canvas
      cy.get('.task').should('have.length', 0);
    });
  
    it('should save a workflow', () => {
      // Navigate to Task Scripting view and add a task
      cy.contains('Task Scripting').click();
      cy.get('.toolbox li').first().trigger('dragstart');
      cy.get('.canvas').trigger('drop');
  
      // Save the workflow
      cy.contains('Save Workflow').click();
      cy.get('.workflow-actions input').type('Test Workflow');
      cy.contains('OK').click(); // Simulate saving, ensure there's a confirmation button
  
      // Verify that the workflow is saved
      cy.get('select').should('contain.text', 'Test Workflow');
    });
  
    it('should load an existing workflow', () => {
      // Navigate to Task Scripting view and select a saved workflow
      cy.contains('Task Scripting').click();
      cy.get('select').select('Test Workflow'); // Assuming the workflow was previously saved
  
      // Verify that the tasks are loaded
      cy.get('.task').should('have.length', 1); // Adjust the length based on expected tasks
    });
  });
  