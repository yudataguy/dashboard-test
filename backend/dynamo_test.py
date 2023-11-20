from dynamodb_manager import DynamoDBManager
from datetime import datetime

# Create the DynamoDBManager object
db_manager = DynamoDBManager(
    table_name="instance-internal-dashboard",
    region="us-west-1",
    create_table=False,
    table_schema=None,
)

res = db_manager.put_item({"timestamp": str(datetime.now()), "value": "test_value"})

print(res)
