# Smolitux-Suite


## ToDo to fix errors:

pull branch upgrade_not-finished
Check Upgrade status and which files have to modify.
Complete the upgrade
Update to Vue 3 and its ecosystem (vue-router 4, vuex 4, etc.) with a major rewrite.
Fix this errors and complete the upgrade:
Compiled with problems:
ERROR
Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.
addRoute@webpack-internal:///./node_modules/vue-router/dist/vue-router.mjs:1500:23
createRouterMatcher/<@webpack-internal:///./node_modules/vue-router/dist/vue-router.mjs:1665:37
createRouterMatcher@webpack-internal:///./node_modules/vue-router/dist/vue-router.mjs:1665:12
createRouter@webpack-internal:///./node_modules/vue-router/dist/vue-router.mjs:3093:40
@webpack-internal:///./src/router/index.js:8:72
./src/router/index.js@http://localhost:8081/js/app.js:668:1
__webpack_require__@http://localhost:8081/js/app.js:2001:32
fn@http://localhost:8081/js/app.js:2252:21
@webpack-internal:///./src/main.js:4:90
./src/main.js@http://localhost:8081/js/app.js:602:1
__webpack_require__@http://localhost:8081/js/app.js:2001:32
__webpack_exports__<@http://localhost:8081/js/app.js:3172:109
__webpack_require__.O@http://localhost:8081/js/app.js:2043:23
@http://localhost:8081/js/app.js:3173:53
@http://localhost:8081/js/app.js:3175:12
ERROR in ./src/components/Charts/BarChart.js 2:0-108
Module not found: Error: Package path ./dist/Chart.js is not exported from package /home/dev/Data/Suite_branch/Smolitux-Suite/node_modules/chart.js (see exports field in /home/dev/Data/Suite_branch/Smolitux-Suite/node_modules/chart.js/package.json)
ERROR in ./src/components/Charts/LineChart.js 2:0-123
Module not found: Error: Package path ./dist/Chart.js is not exported from package /home/dev/Data/Suite_branch/Smolitux-Suite/node_modules/chart.js (see exports field in /home/dev/Data/Suite_branch/Smolitux-Suite/node_modules/chart.js/package.json)
ERROR in ./node_modules/vue-chartjs/dist/index.js 1:0-185
Module not found: Error: Package path ./dist/Chart.js is not exported from package /home/dev/Data/Suite_branch/Smolitux-Suite/node_modules/chart.js (see exports field in /home/dev/Data/Suite_branch/Smolitux-Suite/node_modules/chart.js/package.json)Commit and push.



##########################################################


### Installation
**Prerequisites**

Ensure you have the following installed:

    Node.js (v16 or higher)
    Vue CLI
    A modern web browser

Steps

Clone the repository:

    git clone https://github.com/EcoSphereNetwork/Smolitux-Suite.git
    cd Smolitux-Suite

Install dependencies:

    npm install

Run the application in development mode:

    npm run serve

    # Open your browser and navigate to http://localhost:8080.

For production builds, use:

    npm run build

## Usage

Once the application is running:

    Login/Authentication: Ensure appropriate access credentials for secure interaction.
    Navigation: Use the side menu to navigate between views, including network hierarchies, component statuses, and routes.
    Real-Time Updates: Observe live changes as data streams in via WebSocket.
    Configuration: Modify system parameters using the intuitive GUI.

### Contributing

Contributions are welcome! Follow these steps:

Fork the repository.
Create a feature branch:

    git checkout -b feature-name

Commit your changes:

    git commit -m "Description of feature"

Push the branch:

    git push origin feature-name

    # Open a Pull Request.

Refer to the CONTRIBUTING.md for more details.
License

Smolitux-Suite is licensed under the MIT License. You are free to use, modify, and distribute this project under the terms of the license.
Support and Feedback

For issues or feature requests, please create an issue in the GitHub repository.
