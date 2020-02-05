import server from '../../src/server'
import request from 'supertest'

// テストが終了したら、サーバをクローズする
afterAll(() => {
  server.close()
})

// 各WebAPIの疎通テスト
describe('/todosのテスト', () => {
  it('正常なリクエストでTodoの一覧を取得できるか', async () => {
    const response = await request(server).get('/todos')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      'items': [
           {
            'id': 1,
            'kinkyu': 'いそぐ',
            'naiyo': 'プログラミングする',
          },
          {
            'id': 2,
            'kinkyu': '気が向いたら',
            'naiyo': 'テストする',
          },
          {
            'id': 3,
            'kinkyu': 'そのうち',
            'naiyo': '納品する',
          },
        ],
    })
  })

  it('正常なリクエストでTodoを追加できるか', async () => {
    // 追加するデータのIDをランダムに生成する
    const maxId = 10000
    const randomId = Math.floor(Math.random() * Math.floor(maxId))
    // 追加するデータをPOSTで送るためにsend関数を使用する
    const response = await request(server).post('/todos').send(
        {id: randomId, naiyo: 'TODO no.' + randomId , kinkyu: 'hurry' }
    )
    expect(response.status).toBe(201)
  })

  it('存在しないIDでのリクエストが404エラーとなるか', async () => {
    const id = 0.1 // 存在しないIDを設定
    const response = await request(server).get('/todos/' + id)
    expect(response.status).toBe(404)
  })

})