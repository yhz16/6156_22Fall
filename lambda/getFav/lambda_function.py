import pymysql
import json

endpoint = 'onlinemuseum.cnbwnikf8zfu.us-east-1.rds.amazonaws.com'
username = 'onlinemuseum'
password = '12345678'
database_name = 'Online_Museum'


def lambda_handler(event, context):
    try:
        connection = pymysql.connect(host=endpoint, user=username,
                             passwd=password, db=database_name)
    except:
        print("getFav connection error")
        sys.exit()
    
    print(event)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM Img WHERE FAV = 1')
    rows = cursor.fetchall()
    ret_body = []
    for row in rows:
        ret_body.append({"img_id": row[0], "img_src": row[1]})
    
    # cursor.execute('SELECT * FROM Img')
    # rows = cursor.fetchall()
    # for row in rows:
    #     print("{0} {1} {2}".format(row[0], row[1], row[2]))

    return {
        'statusCode': 200,
        'body': ret_body
    }
