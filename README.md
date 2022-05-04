# NearPoll - Digital Poll platform for Near Protocol
Create a Poll and collect tokens for it...

Other users can vote for polls by contributions - attaching NEAR tokens 

Most contributed/voted wins and the creator of it get funded

[Video](https://www.loom.com/share/0ef23e989d93404098da77950e702e35)

<details>
  <summary>Mobile Application MockUp - Design Phase for both Android and iOS Platform</summary>
  
  ## Screens
  1. ![screen1](https://user-images.githubusercontent.com/61827071/166820733-6de97074-56df-4595-9933-b3ecc5954267.PNG)
  2. ![screen2](https://user-images.githubusercontent.com/61827071/166820765-5478f63b-044d-4224-9b62-5333d0b171d6.PNG)
  3. ![screen3](https://user-images.githubusercontent.com/61827071/166820874-cad3e723-3608-4f43-a7f7-8370f9ebee08.PNG)
  4. ![screen4](https://user-images.githubusercontent.com/61827071/166820886-deccf444-02c6-4c30-9d67-9c555953b336.PNG)
  5. ![screen5](https://user-images.githubusercontent.com/61827071/166820902-6a460005-e4f7-499b-9cad-f9881344f435.PNG)

</details>

```ts
export CONTRACT=        # For Deployment
export OWNER=           # Your Account
```

```ts

//Initialization
function init(owner: AccountId, allow_anonymous: bool = true): void

//Poll initialization
function initializePoll(description: string): u32

//Vote for poll
function vote(registrant: u32): void

//List votes for the poll
function listVotes(registrant: u32): void

//List Polls
function listRegistrants(): Array<Registrant>

//Complete poll
function completePoll(): void

```

Please follow these steps:

1. clone

2. run `yarn` to install dependencies

3. run the scripts below for the project as `./scripts/scriptsBelow.sh` 

```sh
deployPoll.sh        # clean and deploy the contract

initializePoll.sh    # initialize the poll

registerPoll.sh      # register to the poll

completePoll.sh      # complete the poll

reportPoll.sh        # report of the poll

transferPoll.sh      # transfer funds for the poll
```
