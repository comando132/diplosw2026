<?php

use App\Http\Controllers\Api\ContactoController;
use App\Http\Controllers\Api\PortafolioController;
use App\Http\Controllers\Api\ProyectoController;
use Illuminate\Support\Facades\Route;

Route::prefix('proyectos')->group(function () {
    Route::get('/', [ProyectoController::class, 'index']);
    Route::get('{slug}', [ProyectoController::class, 'show']);
});

Route::get('clientes', [PortafolioController::class, 'clientes']);
Route::get('tecnologias', [PortafolioController::class, 'tecnologias']);

Route::post('contacto', [ContactoController::class, 'contacto']);
Route::post('cotizaciones', [ContactoController::class, 'cotizacion']);