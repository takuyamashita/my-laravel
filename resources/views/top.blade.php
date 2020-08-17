@extends('base')

@section('head')

@endsection

@section('content')
<div class="flex-center position-ref full-height">
    <div class="container-md">
        <div class="card bg-transparent my-5">
            <div class="card-body" style="background:#ffffff74">
                <div class="input-group input-group-lg my-5">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">コードまたはURL</span>
                    </div>
                    <input type="text" class="form-control bg-transparent" id="code-input" aria-describedby="basic-addon3">
                </div>
                <button class="btn btn-primary center-block mx-auto d-block" onClick="clickEvent()">送信</button>
                <script>
                    const clickEvent = () =>{
                        const code = document.getElementById('code-input').value.replace(/\s/gi,'');
                        if(code.length === 64){
                            location.href = `/${code}`;
                        }else{
                            location.href = code;
                        }
                    };
                </script>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row pt-4">
            <div class="col-md-6 text-white bg-dark text-center">
                <h1 class="display-5 my-5">よりシンプルな予約管理</h1>
                <h1 class="display-5 my-5">柔軟な設計</h1>
                <h1 class="display-5 my-5">スマホ対応</h1>
                <h1 class="display-5 my-5">快適なスピード</h1>
                <h1 class="display-5 my-5"><p>Reser View はこれら全てを実現する予約管理サービスです</p></h1>
            </div>
            <div class="col-md-6 bg-dark">
                <svg class="center-block mx-auto d-block" viewBox="0 0 100 100" width="80%">
                    <rect x="10" y="10" rx="1" ry="1" width="80" height="80" stroke="#ccc" stroke-width="0.2" fill="none"/>

                    <line x1="20" y1="10" x2="20" y2="90" stroke-width="0.08" stroke="#ccc" />
                    <line x1="30" y1="10" x2="30" y2="90" stroke-width="0.08" stroke="#ccc" />
                    <line x1="40" y1="10" x2="40" y2="90" stroke-width="0.08" stroke="#ccc" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke-width="0.08" stroke="#ccc" />
                    <line x1="60" y1="10" x2="60" y2="90" stroke-width="0.08" stroke="#ccc" />
                    <line x1="70" y1="10" x2="70" y2="90" stroke-width="0.08" stroke="#ccc" />
                    <line x1="80" y1="10" x2="80" y2="90" stroke-width="0.08" stroke="#ccc" />

                    <!-- #007bff #6c757d #28a745 #dc3545 #ffc107 #17a2b8 #f8f9fa #343a40 -->

                    <rect x="12" y="40" rx="1" ry="1" width="6" height="30" stroke="none" stroke-width="0.05" fill="#28a745"/>
                    <rect x="12" y="75" rx="1" ry="1" width="6" height="14" stroke="none" stroke-width="0.05" fill="#6c757d"/>

                    <rect x="22" y="23" rx="1" ry="1" width="6" height="13" stroke="none" stroke-width="0.05" fill="#28a745"/>
                    <rect x="22" y="38" rx="1" ry="1" width="6" height="13" stroke="none" stroke-width="0.05" fill="#17a2b8"/>
                    <rect x="22" y="58" rx="1" ry="1" width="6" height="20" stroke="none" stroke-width="0.05" fill="#007bff"/>

                    <rect x="32" y="15" rx="1" ry="1" width="6" height="30" stroke="none" stroke-width="0.05" fill="#dc3545"/>
                    <rect x="32" y="60" rx="1" ry="1" width="6" height="26" stroke="none" stroke-width="0.05" fill="#343a40"/>

                    <rect x="42" y="40" rx="1" ry="1" width="6" height="30" stroke="none" stroke-width="0.05" fill="#ffc107"/>

                    
                    <rect x="52" y="13" rx="1" ry="1" width="6" height="25" stroke="none" stroke-width="0.05" fill="#343a40"/>
                    <rect x="52" y="50" rx="1" ry="1" width="6" height="13" stroke="none" stroke-width="0.05" fill="#6c757d"/>
                    <rect x="52" y="70" rx="1" ry="1" width="6" height="10" stroke="none" stroke-width="0.05" fill="#007bff"/>

                    <rect x="62" y="18" rx="1" ry="1" width="6" height="13" stroke="none" stroke-width="0.05" fill="#ffc107"/>
                    <rect x="62" y="40" rx="1" ry="1" width="6" height="40" stroke="none" stroke-width="0.05" fill="#17a2b8"/>
                    
                    <rect x="72" y="58" rx="1" ry="1" width="6" height="20" stroke="none" stroke-width="0.05" fill="#007bff"/>

                    <rect x="82" y="30" rx="1" ry="1" width="6" height="30" stroke="none" stroke-width="0.05" fill="#ffc107"/>

                </svg>
            </div>
        </div>
    </div>
</div>
@endsection