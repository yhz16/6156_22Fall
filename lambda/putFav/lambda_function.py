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
        print("putFav connection error")
        sys.exit()

    print(event)
    img_id = event.get('img_id')
    cursor = connection.cursor()
    qry = 'UPDATE Img SET fav = 1 WHERE ID = \'' + img_id + '\';'
    print(qry)
    cursor.execute(qry)
    connection.commit()
    
    # cursor.execute('SELECT * FROM Img;')
    # rows = cursor.fetchall()
    # for row in rows:
    #     print("{0} {1} {2}".format(row[0], row[1], row[2]))

    return {
        'statusCode': 200,
        'body': json.dumps('Put favorite!')
    }
