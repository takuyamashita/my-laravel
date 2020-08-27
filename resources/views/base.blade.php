<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Reser View</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link rel="shortcut icon" href="{{ asset('/favicon.ico') }}">
        @yield('head')
    </head>
    <body>
        <div id="rv-content">
            <div id="rv-background-div"></div>
            <nav id="rv-my-nav">
                <div class="rv-item" id="rv-brand"><a class="navbar-brand" href="/">Reser View</a></div>
                @if(Auth::check())
                    <div class="rv-item">
                        <a class="nav-link" href="{{ route('schedule.top') }}">マイ予約テーブル</a>
                    </div>
                    <div class="rv-item">
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                        <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                    document.getElementById('logout-form').submit();">ログアウト</a>
                    </div>
                @else
                    <div class="rv-item">
                        <a class="nav-link" href="{{ route('register') }}">アカウント作成</a>
                    </div>
                    <div class="rv-item">
                        <a class="nav-link" href="{{ route('login') }}">ログイン</a>
                    </div>
                @endif
            </nav>
            @yield('content')
        </div>
    </body>
    <style>
        body{
            height:100%;
        }
        #rv-content{
            
            min-height:100vh;
            position:relative;
        }
        #rv-background-div{
            position:fixed;
            z-index:-1;
            top:0;
            left:0;
            height:100vh;
            width: 100%;
            background-image:url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 100 100' height%3D%22100%22 width%3D%22100%22 xmlns='http://www.w3.org/2000/svg'%3E%3Crect x%3D%2210%22 y%3D%2210%22 rx%3D%222%22 ry%3D%222%22 width%3D%2280%22 height%3D%2280%22 stroke%3D%22%2366666625%22 stroke-width%3D%221%22 fill%3D%22none%22%2F%3E%3C%2Fsvg%3E");  
        }
        #rv-my-nav{
            display:inline-flex;
            width: 100%;
            padding-left: 15px;
            padding-top:10px;
        }
        .rv-item{
            display:inline-block;
        }
        #rv-my-nav .rv-item a{
            color:#888888;
        }
        #rv-my-nav #rv-brand a{
            color:#353535;
        }
    </style>
</html>