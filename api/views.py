from django.http import JsonResponse 
from rest_framework.decorators import api_view
from service import downloader
import json

@api_view(['GET'])
def get_music_by_viewkey(request, viewkey: str):
    downloader.download_by_viewkey(viewkey)
    return JsonResponse({
        'status': True
    })


@api_view(['GET'])
def get_search_results(request, search_string: str):
    videos = downloader.query_by_search(search_string)
    serialized_videos = json.dumps(videos)

    return JsonResponse({'data': serialized_videos})
