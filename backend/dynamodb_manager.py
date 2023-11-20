import boto3
from botocore.exceptions import ClientError


class DynamoDBManager:
    """ "Manages the DynamoDB table"""

    def __init__(
        self, table_name, region="us-west-1", create_table=False, table_schema=None
    ):
        self.dynamodb = boto3.resource("dynamodb", region_name=region)
        self.table_name = table_name

        # Check if the table exists, create it if it does not
        if create_table and table_schema is not None:
            self.create_table_if_not_exists(table_schema)

        self.table = self.dynamodb.Table(table_name)

    def create_table_if_not_exists(self, table_schema):
        """Creates a DynamoDB table if it does not exist"""
        try:
            table = self.dynamodb.create_table(**table_schema)
            # Wait until the table exists, this will block the call until table is created
            table.wait_until_exists()
        except ClientError as e:
            if e.response["Error"]["Code"] == "ResourceInUseException":
                print(f"Table {self.table_name} already exists.")
            else:
                raise

    def put_item(self, item):
        """
        Inserts an item into the DynamoDB table.
        :param item: dict, The item to insert.
        :return: dict, The response from DynamoDB.
        """
        try:
            response = self.table.put_item(Item=item)
            return response
        except ClientError as e:
            print(f"Failed to put item in DynamoDB: {e.response['Error']['Message']}")
            return None

    def put_items(self, items):
        """
        Inserts multiple items into the DynamoDB table using batch write.
        :param items: list, A list of dictionaries, each representing an item.
        :return: None
        """
        with self.table.batch_writer() as batch:
            for item in items:
                batch.put_item(Item=item)

    def get_item(self, key):
        """
        Retrieves an item from the DynamoDB table.
        :param key: dict, The primary key of the item to retrieve.
        :return: dict, The retrieved item, or None if not found.
        """
        try:
            response = self.table.get_item(Key=key)
            item = response.get("Item")
            if item:
                return item
            else:
                print("Item not found.")
                return None
        except ClientError as e:
            print(f"Failed to get item from DynamoDB: {e.response['Error']['Message']}")
            return None

    def scan_table(
        self,
        page_size: int = 100,
    ):
        """Retrieve the last 100 or desired items from the table"""

        response = self.table.scan()

        # Assuming 'timestamp' is the attribute to sort by
        items = response["Items"]

        # Sort the items by timestamp (replace 'timestamp' with your attribute name)
        sorted_items = sorted(items, key=lambda x: x["timestamp"], reverse=True)

        # Get the last 100 items
        last_n_items = sorted_items[:page_size]

        print(last_n_items)

        return last_n_items
