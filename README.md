# NearPoll - Digital Poll platform for Near Protocol
Create a Poll and collect tokens for it...

Other users can vote for polls by contributions - attaching NEAR tokens 

Most contributed/voted wins and the creator of it get funded

[Video](https://www.loom.com/share/0ef23e989d93404098da77950e702e35)

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
