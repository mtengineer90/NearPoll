set -e
if [ -z "$CONTRACT" ];
then echo "No \$CONTRACT info" && exit 1
fi
if [ -z "$OWNER" ];
then echo "No \$CONTRACT info" && exit 1
fi
if [ -z "$NEAR_ENV" ];
then echo "No \$CONTRACT info" && exit 1
fi
echo "CONTRACT is [ $CONTRACT ]"
echo "OWNER is [ $OWNER ]"
echo
echo 'Transferring...'
echo near call \$CONTRACT transfer --account_id \$OWNER
echo
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo
near call $CONTRACT transfer --account_id $OWNER
