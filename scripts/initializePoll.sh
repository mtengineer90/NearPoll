set -e
if [ -z "$CONTRACT" ];
then echo "No \$CONTRACT info" && exit 1
fi
if [ -z "$POLLER" ];
then echo "No \$POLLER info" && exit 1
fi
if [ -z "$NEAR_ENV" ];
then echo "No \$NEAR_ENV info" && exit 1
fi
echo "CONTRACT is [ $CONTRACT ]"
echo "OWNER is [ $OWNER ]"
echo
echo 'Poll initialization...'
echo near call \$CONTRACT initializePoll '' --account_id \$POLLER --amount \$1
echo
echo \$CONTRACT is $CONTRACT
echo \$POLLER is $POLLER
echo \$1 is [ $1 NEAR ] 
echo
near call $CONTRACT initializePoll '' --account_id $POLLER --amount $1
