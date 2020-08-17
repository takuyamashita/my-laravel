@extends('base')

@section('head')
<meta name="csrf_token" content="{{csrf_token()}}">
@endsection

@section('content')
<div id="user-schedule-root" data-csrf="{{ csrf_token() }}"></div>
<script src="{{ asset('js/app.js')}}"></script>
@endsection