"""Возвращает прайс-лист из БД, сгруппированный по категориям."""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("""
        SELECT id, category, name, price, old_price, sort_order
        FROM t_p32889388_lesplit_landing_copy.price_items
        WHERE is_active = TRUE
        ORDER BY category, sort_order, id
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    result = {'osb': [], 'fanera': []}
    for row in rows:
        item = {
            'id':        row[0],
            'category':  row[1],
            'name':      row[2],
            'price':     row[3],
            'old_price': row[4],
        }
        cat = row[1]
        if cat in result:
            result[cat].append(item)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result, ensure_ascii=False),
    }
