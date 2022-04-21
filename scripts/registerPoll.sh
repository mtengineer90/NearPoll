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
echo 'Poll registering...'
echo near call \$CONTRACT vote '{"register":"$1"}' --account_id \$POLLER --amount \$2
echo
echo \$CONTRACT is $CONTRACT
echo \$POLLER is $POLLER
echo \$1 is [ $1 ] '(Register fee for poll)'
echo \$2 is [ $2 NEAR ]
echo near call $CONTRACT vote '{"register": '$1'}' --account_id $POLLER --amount $2
