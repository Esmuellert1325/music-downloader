from pytube import Search
from pytube import YouTube
from os import getlogin

# Test URL - https://www.youtube.com/watch?v=ZyZtmR02acA
def download_by_viewkey(viewkey: str):
    user_name = getlogin()
    yt = YouTube(f"https://www.youtube.com/watch?v={viewkey}")
    streams = yt.streams.filter(only_audio=True)
    stream = streams.get_by_itag(streams[0].itag)
    stream.download(f"C:/Users/{user_name}/Downloads", f"{yt.title}.mp3")


def query_by_search(search_query: str):
    s = Search(search_query)
    results = s.results
    videos = []

    for stream in results:
        videos.append({
            'id': stream.watch_url,
            'cover': stream.thumbnail_url,
            'title': stream.title
        })

    return videos
