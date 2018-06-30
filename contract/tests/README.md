# Test contracts using web3js

## 0. Setup

### 0.0. Install node

***use latest version (require version > 8.0.0)***

Use nvm to manage the node version:

```
wget -qO- https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh
```

Then install the latest version:

```
nvm install --latest-npm
```

### 0.1. Install node modules

* [Install yarn](https://yarnpkg.com/lang/en/docs/install/)
    - configure the repository:
        ```
        curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
        echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
        ```
    - run:
        ```
        sudo apt-get update && sudo apt-get install yarn
        ```
* cd the `tests` dir, then run:

```
yarn install
```

## 1. Test

### 1.0 Run the cita

Use the script:

```
tests/integrate_test/cita_start.sh
```

Or other ways. 
Check the doc of CITA [getting_started](https://cryptape.github.io/cita/zh/getting_started/index.html).

### 1.1 Run the test

Use mocha framework:
[usage of mochajs](https://mochajs.org/#usage)

* To run all tests:

```
npm test
```

* To lint test directory:

```
npm run-script lint
```

Some options of mocha usage: 

* `-t 60s`: set test-case timeout
* `-g <pattern>`: only run tests matching <pattern>

## 2. Test Report

Open the mochawesome-report/mochawesome.html or you can check the json file.
