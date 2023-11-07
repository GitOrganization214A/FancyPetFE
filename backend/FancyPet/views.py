from django.shortcuts import render
from django.http import JsonResponse
from .models import User
import requests


def changeInfo(request):
    openid = request.GET.get('openid')
    nickname = request.GET.get('nickname')
    avatar = request.GET.get('avatar')

    user = User.objects.filter(openid=openid)
    if user:
        user = user[0]
        user.nickname = nickname
        user.avatar = avatar
        user.save()
    else:
        user = User.objects.create(
            openid=openid, nickname=nickname, avatar=avatar)
    return JsonResponse({'status': 'success'})


def login(request):
    print(request.GET)
    code = request.GET.get('code')  # 从请求中获取code
    # 获取session_key和openid
    url = "https://api.weixin.qq.com/sns/jscode2session"  # 微信服务器的URL

    params = {
        "appid": "wx17396561c08eee6a",  # 你的微信AppID
        "secret": "1553b8c2bdf47f280ffeb61c989e0f50",  # 你的微信AppSecret
        "js_code": code,
        "grant_type": "authorization_code"
    }

    response = requests.get(url, params=params)  # 发送请求
    data = response.json()  # 解析响应
    # session_key = data.get('session_key')
    openid = data.get('openid')
    print(data)

    # # 获取access_token
    # url = "https://api.weixin.qq.com/cgi-bin/token"
    # params = {
    #     "grant_type": "client_credential",
    #     "appid": "wx17396561c08eee6a",
    #     "secret": "1553b8c2bdf47f280ffeb61c989e0f50"
    # }
    # response = requests.get(url, params=params)
    # data = response.json()
    # access_token = data.get('access_token')

    return JsonResponse(data)  # 返回响应
