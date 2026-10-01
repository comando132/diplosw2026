<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cotizacion extends Model
{
    use HasFactory;

    protected $table = 'cotizaciones';

    protected $fillable = [
        'nombre', 'email', 'telefono', 'empresa', 'tipo_sitio',
        'presupuesto', 'plazo', 'funcionalidades', 'mensaje', 'estado',
    ];

    protected $casts = [
        'plazo' => 'date',
        'funcionalidades' => 'array',
    ];
}