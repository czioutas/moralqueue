read -r -p "Please enter the number of requests : " c

DATE=`date +%Y-%m-%d:%H:%M:%S`
SECONDS=0
COUNTER=0
echo '=== Starting get requests ====' $DATE
while [  $COUNTER -lt $c ]; do
  NUMBER=$RANDOM
  response=$(echo curl --silent --data "SKU$NUMBER=ENTERDATA" 127.0.0.1:8000/ | bash)
  echo $response

  let COUNTER=COUNTER+1
done
echo '=== End get reuqests =========' `date +%Y-%m-%d:%H:%M:%S`
echo '===' $SECONDS '================='

exit 1
