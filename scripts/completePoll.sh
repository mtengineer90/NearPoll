set -e
if [ -z "$CONTRACT" ];
then echo "No \$CONTRACT info" && exit 1
fi
if [ -z "$POLLER" ];
then echo "No \$CONTRACT info" && exit 1
fi
if [ -z "$NEAR_ENV" ];
then echo "No \$CONTRACT info" && exit 1
fi
echo "CONTRACT is [ $CONTRACT ]"
echo "OWNER is [ $OWNER ]"
echo
echo 'Poll is about to complete...'
echo near call \$CONTRACT completePoll --account_id \$POLLER --gas=300000000000000
echo
echo \$CONTRACT is $CONTRACT
echo \$POLLER is $POLLER
echo
near call $CONTRACT completePoll --account_id $POLLER --gas=300000000000000
