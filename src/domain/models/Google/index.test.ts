import { extractVideoIdByURL, extractYouTubeActiveLive } from "."

describe("extractVideoIdByURL", () => {
  it("exact", () => {
    expect.hasAssertions()
    expect(
      extractVideoIdByURL("https://www.youtube.com/watch?v=FKDaZjN4UJ0")
    ).toStrictEqual("FKDaZjN4UJ0")
    expect(
      extractVideoIdByURL("https://www.youtube.com/watch?v=x")
    ).toStrictEqual("x")
  })
})

describe("extractYouTubeActiveLive", () => {
  it("exact", () => {
    expect.hasAssertions()
    expect(
      extractYouTubeActiveLive({
        kind: "youtube#videoListResponse",
        etag: '"eee_eee/eee"',
        pageInfo: {
          totalResults: 1,
          resultsPerPage: 1,
        },
        items: [
          {
            kind: "youtube#video",
            etag: '"eee_eee/xxx"',
            id: "ccc",
            snippet: {
              publishedAt: "2019-09-03T00:00:00.000Z",
              channelId: "ccc",
              title: "any title",
              description: "any desc",
              thumbnails: {
                default: {
                  url: "https://i.ytimg.com/vi/xxx/default.jpg",
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: "https://i.ytimg.com/vi/xxx/mqdefault.jpg",
                  width: 320,
                  height: 180,
                },
                high: {
                  url: "https://i.ytimg.com/vi/xxx/hqdefault.jpg",
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: "c title",
              categoryId: "20",
              liveBroadcastContent: "none",
              localized: {
                title: "any title",
                description: "any desc",
              },
              defaultAudioLanguage: "ja",
            },
            contentDetails: {
              duration: "PT1H22M57S",
              dimension: "2d",
              definition: "hd",
              caption: "false",
              licensedContent: false,
              projection: "rectangular",
            },
            statistics: {
              viewCount: "100",
              likeCount: "100",
              dislikeCount: "0",
              favoriteCount: "0",
              commentCount: "0",
            },
            liveStreamingDetails: {
              actualStartTime: "2019-09-03T00:00:00.000Z",
              actualEndTime: "2019-09-03T00:00:00.000Z",
              scheduledStartTime: "2019-09-03T00:00:00.000Z",
              concurrentViewers: "100",
              activeLiveChatId: "active live chat id",
            },
          },
        ],
      })
    ).toStrictEqual({
      title: "any title",
      description: "any desc",
      activeLiveChatId: "active live chat id",
      thumbnailUrl: "https://i.ytimg.com/vi/xxx/hqdefault.jpg",
    })
  })
})
