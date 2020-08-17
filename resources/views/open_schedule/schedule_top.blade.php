@extends('base')

@section('head')
<meta name="csrf_token" content="{{csrf_token()}}"> 
@endsection

@section('content')
<div id="open-schedule-root" data-password-required="{{ $password_required }}" data-hash-digest="{{ $hash_digest }}">
</div>
<script src="{{ asset('js/app.js')}}"></script>
@endsection