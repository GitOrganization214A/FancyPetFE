##Django后端项目

####管理员账号
超级用户：214a
密码：fancy


####本地建立MySQL数据库
名称：fancypet
用户：214a
密码：fancy
```
-- 创建新的数据库
CREATE DATABASE fancypet;

-- 创建新的用户
CREATE USER '214a'@'localhost' IDENTIFIED BY 'fancy';

-- 给新用户授权访问新数据库的权限
GRANT ALL PRIVILEGES ON fancypet.* TO '214a'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;
```

####响应请求
1. 在urls.py文件中定义路由，将URL映射到对应的视图函数。
2. 在views.py文件中定义视图函数，处理前端请求并返回响应。
```
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
]

# views.py
from django.http import JsonResponse

def hello_world(request):
    return JsonResponse({"message": "Hello, world!"})
```