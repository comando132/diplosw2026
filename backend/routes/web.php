<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/email', function () {
    $isProd = app()->environment('production');
    abort_if($isProd, 404);
    Mail::raw('Este es un correo de prueba enviado desde la aplicación.', function ($message) {
        $message->to('prueba@correo.mx')->subject('Prueba de correo');
    });
    return response()->json(['message' => 'Correo de prueba enviado correctamente.']);
})->middleware('throttle:10,1');
