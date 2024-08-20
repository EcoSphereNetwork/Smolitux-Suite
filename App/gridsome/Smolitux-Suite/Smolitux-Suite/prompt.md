# Smolitux-Suite Beschreibung

- Main Window
    - Content from Tabs

- NavigationBar
    - Tabs for Content from AI Tools

- SideBarRight
    - Chat window for Smolit-Assistant

- Sidebarleft 
    - App Menu for the UI Pages from the AI Tools:
        - LocalAI UI
        - LLM-Studio
        - LaVague WebAgent
        - Anything-LLM

        - TaskScripting (Suite Function Page)
            - Chart View
            - each AI Tool as Vue Node/Icon in the Chart View
                - By hoover over, show options for the AI Tool
                    - By single click, show options for Ai Tool permant and clickable
                        - By click on option Icon, show popup Window with input field for options
                    - By double click, show open window for AI Tool in NavigationBar as Tab
                - By press shift + click, show routing pipeline possibilities to other AI Tools in the Chart View
                - The Routing Pipeline should use API endpoints to send and recive the data to the AI Tool
                - The Routing Pipeline should be saved in the DB and can be loaded in the future
                - The Routing Pipeline should be drawn in the Chart View as a line with Arrows between the AI Tools
                - The Routing Pipeline should be draggable and droppable in the Chart View to change the order of the AI Tools



