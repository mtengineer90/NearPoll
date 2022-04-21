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
echo Report for $CONTRACT
echo "near call \$CONTRACT list '{}' --accountId \$OWNER"
near call $CONTRACT list '{}' --accountId $OWNER
echo
echo "near call \$CONTRACT summarize '{}' --accountId \$OWNER"
near call $CONTRACT summarize '{}' --accountId $OWNER
echo
