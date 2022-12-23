import json
import urllib.parse
import boto3
import email
import pymysql

endpoint = 'onlinemuseum.cnbwnikf8zfu.us-east-1.rds.amazonaws.com'
username = 'onlinemuseum'
password = '12345678'
database_name = 'Online_Museum'


def lambda_handler(event, context):
    try:
        connection = pymysql.connect(host=endpoint, user=username,
                                 passwd=password, db=database_name)
    except:
        print("SES connection error")
        sys.exit()
    
    print(event)
    img_id = event.get('img_id')

    cursor = connection.cursor()
    query = 'SELECT * FROM Img WHERE ID = \'' + img_id + '\';'
    cursor.execute(query)

    rows = cursor.fetchall()
    ret_body = []
    desc = ''
    herf = ''
    for row in rows:
        desc = row[4]
        herf = row[1]
        ret_body.append({"des": row[4],"img_src:":row[1]})

    print(ret_body)

    session = boto3.Session()
    ses = session.client('ses')
    
    message = "We received your request. Here is description for " + img_id + " : "+ desc + ".\n picture link: http://onlinemuseum1.s3-website-us-east-1.amazonaws.com/"+ herf## to be placed with descriptions
    print(message)
    recipient = event['email']
    response_email = ses.send_email(
        Destination={'ToAddresses': [recipient]},
        Message={
            'Body': {
                'Text': {
                    'Charset': 'UTF-8',
                    'Data': message,
                },
            },
            'Subject': {
                'Charset': 'UTF-8',
                'Data': 'Online Museum - Here is your art work!',
            },
        },
        Source = "jw4170@columbia.edu",
    )
    print(response_email)
    return {
        'statusCode': 200,
        'body': json.dumps('Email sent!')
    }
