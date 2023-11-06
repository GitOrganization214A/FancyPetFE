from django.shortcuts import render
from django.http import JsonResponse
import requests


def login(request):
    code = request.GET.get('code')  # 从请求中获取code
    url = "https://api.weixin.qq.com/sns/jscode2session"  # 微信服务器的URL

    params = {
        "appid": "your_app_id",  # 你的微信AppID
        "secret": "your_app_secret",  # 你的微信AppSecret
        "js_code": code,
        "grant_type": "authorization_code"
    }

    response = requests.get(url, params=params)  # 发送请求
    data = response.json()  # 解析响应

    return JsonResponse(data)  # 返回响应
