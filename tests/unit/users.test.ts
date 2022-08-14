import server from '../../src/server'
import request from 'supertest'

// テストが終了したら、サーバをクローズする
afterAll(() => {
  server.close()
})

// 各WebAPIの疎通テスト
describe('/usersのテスト', () => {
  it('正常なリクエストでUserの一覧を取得できるか', async () => {
    const response = await request(server).get('/users')
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

  it('正常なリクエストでUserを追加できるか', async () => {
    // 追加するデータのIDをランダムに生成する
    const maxId = 10000
    const randomId = Math.floor(Math.random() * Math.floor(maxId))
    // 追加するデータをPOSTで送るためにsend関数を使用する
    const response = await request(server).post('/users').send(
        {id: randomId, naiyo: 'user no.' + randomId , kinkyu: 'hurry' }
    )
    expect(response.status).toBe(201)
  })

  it('存在しないIDでのリクエストが404エラーとなるか', async () => {
    const id = 0.1 // 存在しないIDを設定
    const response = await request(server).get('/users/' + id)
    expect(response.status).toBe(404)
  })

})