
if [ -z "$OWNER" ];
then echo "No \$OWNER info"
fi
if [ -z "$CONTRACT" ]; 
then echo "No \$CONTRACT info"
fi
echo "Clean $CONTRACT"
echo
near delete $CONTRACT $OWNER
echo "Remove prebuild /neardev"
echo
rm -rf ./neardev
echo "throw error if not ok"
set -e
echo
echo "build release"
echo
yarn build:release
echo
echo "deploy poll"
echo
echo near dev-deploy ./build/release/poll.wasm
echo please initialize your contract as 'export CONTRACT=<dev-123-456>' and owner as 'export OWNER=<your own account>'
echo and "near call \$CONTRACT init '{\"owner\":\"'\$OWNER'\"}' --accountId \$CONTRACT"
echo
exit 0
