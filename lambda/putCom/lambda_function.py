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
        print("putCom connection error")
        sys.exit()
    
    print(event)
    img_id = event.get('img_id')
    img_com = event.get('comments')
    cursor = connection.cursor()
    qry = 'UPDATE Img SET com = \'' + img_com + '\' WHERE ID = \'' + img_id + '\''
    print(qry)
    cursor.execute(qry)
    connection.commit()
    
    # cursor.execute('SELECT * FROM Img WHERE com !=\'\'')
    # rows = cursor.fetchall()
    # for row in rows:
    #     print("{0} {1} {2} {3}".format(row[0], row[1], row[2], row[3]))

    return {
        'statusCode': 200,
        'body': json.dumps('Put comment!')
    }
