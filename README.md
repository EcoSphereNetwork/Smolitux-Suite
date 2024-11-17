# Smolitux-Suite


## ToDo to fix errors:

pull branch upgrade_not-finished
Check Upgrade status and which files have to modify.
Complete the upgrade
Update to Vue 3 and its ecosystem (vue-router 4, vuex 4, etc.) with a major rewrite.
Fix this errors and complete the upgrade:

Compiled with problems:
ERROR
Cannot find module 'vue2-transitions'
webpackMissingModule@webpack-internal:///./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/layout/dashboard/TopNavbar.vue?vue&type=script&lang=js:2:50
@webpack-internal:///./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/layout/dashboard/TopNavbar.vue?vue&type=script&lang=js:2:141
./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/layout/dashboard/TopNavbar.vue?vue&type=script&lang=js@http://localhost:8081/js/app.js:261:1
__webpack_require__@http://localhost:8081/js/app.js:2001:32
fn@http://localhost:8081/js/app.js:2252:21
@webpack-internal:///./src/layout/dashboard/TopNavbar.vue?vue&type=script&lang=js:5:231
./src/layout/dashboard/TopNavbar.vue?vue&type=script&lang=js@http://localhost:8081/js/app.js:1306:1
__webpack_require__@http://localhost:8081/js/app.js:2001:32
fn@http://localhost:8081/js/app.js:2252:21
@webpack-internal:///./src/layout/dashboard/TopNavbar.vue:3:115
./src/layout/dashboard/TopNavbar.vue@http://localhost:8081/js/app.js:1042:1
__webpack_require__@http://localhost:8081/js/app.js:2001:32
fn@http://localhost:8081/js/app.js:2252:21
@webpack-internal:///./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/layout/dashboard/DashboardLayout.vue?vue&type=script&lang=js:2:91
./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/layout/dashboard/DashboardLayout.vue?vue&type=script&lang=js@http://localhost:8081/js/app.js:239:1
__webpack_require__@http://localhost:8081/js/app.js:2001:32
fn@http://localhost:8081/js/app.js:2252:21
@webpack-internal:///./src/layout/dashboard/DashboardLayout.vue?vue&type=script&lang=js:5:237
./src/layout/dashboard/DashboardLayout.vue?vue&type=script&lang=js@http://localhost:8081/js/app.js:1284:1
__webpack_require__@http://localhost:8081/js/app.js:2001:32
fn@http://localhost:8081/js/app.js:2252:21
@webpack-internal:///./src/layout/dashboard/DashboardLayout.vue:3:121
./src/layout/dashboard/DashboardLayout.vue@http://localhost:8081/js/app.js:1020:1
__webpack_require__@http://localhost:8081/js/app.js:2001:32
fn@http://localhost:8081/js/app.js:2252:21
@webpack-internal:///./src/router/routes.js:2:114
./src/router/routes.js@http://localhost:8081/js/app.js:679:1
__webpack_require__@http://localhost:8081/js/app.js:2001:32
fn@http://localhost:8081/js/app.js:2252:21
@webpack-internal:///./src/router/index.js:3:84
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
ERROR in ./src/components/BaseAlert.vue?vue&type=script&lang=js (./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseAlert.vue?vue&type=script&lang=js) 1:0-50
Module not found: Error: Can't resolve 'vue2-transitions' in '/home/dev/Data/Suite_branch/Smolitux-Suite/src/components'
ERROR in ./src/components/Modal.vue?vue&type=script&lang=js (./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Modal.vue?vue&type=script&lang=js) 1:0-54
Module not found: Error: Can't resolve 'vue2-transitions' in '/home/dev/Data/Suite_branch/Smolitux-Suite/src/components'
ERROR in ./src/layout/dashboard/Content.vue?vue&type=script&lang=js (./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/layout/dashboard/Content.vue?vue&type=script&lang=js) 1:0-50
Module not found: Error: Can't resolve 'vue2-transitions' in '/home/dev/Data/Suite_branch/Smolitux-Suite/src/layout/dashboard'
ERROR in ./src/layout/dashboard/TopNavbar.vue?vue&type=script&lang=js (./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/layout/dashboard/TopNavbar.vue?vue&type=script&lang=js) 1:0-54
Module not found: Error: Can't resolve 'vue2-transitions' in '/home/dev/Data/Suite_branch/Smolitux-Suite/src/layout/dashboard'
ERROR in ./node_modules/vue-chartjs/dist/index.js 1:0-185
Module not found: Error: Package path ./dist/Chart.js is not exported from package /home/dev/Data/Suite_branch/Smolitux-Suite/node_modules/chart.js (see exports field in /home/dev/Data/Suite_branch/Smolitux-Suite/node_modules/chart.js/package.json) 

Commit and push.



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
